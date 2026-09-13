import {
  useEffect,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react";

import { Button, Typography } from "./components";
import { cx } from "./utils";

type QrMatrix = boolean[][];

interface QrBlockGroup {
  count: number;
  dataCodewords: number;
  totalCodewords: number;
}

interface QrVersionSpec {
  alignment: number[];
  blocks: QrBlockGroup[];
  dataCodewords: number;
  size: number;
  version: number;
}

/*
 * The first ten Version 1-L..10-L block layouts cover the short opaque
 * resource/deep-link values used by AAPM while keeping the package free of a
 * runtime encoder dependency. The component deliberately keeps error
 * correction policy internal; consumers own the payload and its meaning.
 */
const QR_VERSION_SPECS: QrVersionSpec[] = [
  {
    alignment: [],
    blocks: [{ count: 1, dataCodewords: 19, totalCodewords: 26 }],
    dataCodewords: 19,
    size: 21,
    version: 1,
  },
  {
    alignment: [6, 18],
    blocks: [{ count: 1, dataCodewords: 34, totalCodewords: 44 }],
    dataCodewords: 34,
    size: 25,
    version: 2,
  },
  {
    alignment: [6, 22],
    blocks: [{ count: 1, dataCodewords: 55, totalCodewords: 70 }],
    dataCodewords: 55,
    size: 29,
    version: 3,
  },
  {
    alignment: [6, 26],
    blocks: [{ count: 1, dataCodewords: 80, totalCodewords: 100 }],
    dataCodewords: 80,
    size: 33,
    version: 4,
  },
  {
    alignment: [6, 30],
    blocks: [{ count: 1, dataCodewords: 108, totalCodewords: 134 }],
    dataCodewords: 108,
    size: 37,
    version: 5,
  },
  {
    alignment: [6, 34],
    blocks: [{ count: 2, dataCodewords: 68, totalCodewords: 86 }],
    dataCodewords: 136,
    size: 41,
    version: 6,
  },
  {
    alignment: [6, 22, 38],
    blocks: [{ count: 2, dataCodewords: 78, totalCodewords: 98 }],
    dataCodewords: 156,
    size: 45,
    version: 7,
  },
  {
    alignment: [6, 24, 42],
    blocks: [{ count: 2, dataCodewords: 97, totalCodewords: 121 }],
    dataCodewords: 194,
    size: 49,
    version: 8,
  },
  {
    alignment: [6, 26, 46],
    blocks: [{ count: 2, dataCodewords: 116, totalCodewords: 146 }],
    dataCodewords: 232,
    size: 53,
    version: 9,
  },
  {
    alignment: [6, 28, 50],
    blocks: [
      { count: 2, dataCodewords: 68, totalCodewords: 86 },
      { count: 2, dataCodewords: 69, totalCodewords: 87 },
    ],
    dataCodewords: 274,
    size: 57,
    version: 10,
  },
];

function multiplyGalois(a: number, b: number): number {
  let product = 0;
  let left = a;
  let right = b;
  while (right > 0) {
    if ((right & 1) !== 0) product ^= left;
    right >>>= 1;
    left <<= 1;
    if ((left & 0x100) !== 0) left ^= 0x11d;
  }
  return product;
}

function reedSolomonDivisor(degree: number): number[] {
  const divisor = [1];
  let root = 1;
  for (let i = 0; i < degree; i += 1) {
    const next = Array.from({ length: divisor.length + 1 }, () => 0);
    for (let j = 0; j < divisor.length; j += 1) {
      next[j] ^= divisor[j];
      next[j + 1] ^= multiplyGalois(divisor[j], root);
    }
    divisor.splice(0, divisor.length, ...next);
    root = multiplyGalois(root, 2);
  }
  return divisor;
}

function reedSolomonRemainder(data: number[], degree: number): number[] {
  const divisor = reedSolomonDivisor(degree);
  const remainder = [...data, ...Array.from({ length: degree }, () => 0)];
  for (let i = 0; i < data.length; i += 1) {
    const factor = remainder[i];
    if (factor === 0) continue;
    for (let j = 0; j < divisor.length; j += 1) {
      remainder[i + j] ^= multiplyGalois(divisor[j], factor);
    }
  }
  return remainder.slice(data.length);
}

function encodeUtf8(value: string): number[] {
  if (typeof TextEncoder !== "undefined") {
    return Array.from(new TextEncoder().encode(value));
  }

  const bytes: number[] = [];
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    if (codePoint < 0x80) {
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      bytes.push(0xc0 | (codePoint >>> 6), 0x80 | (codePoint & 0x3f));
    } else if (codePoint < 0x10000) {
      bytes.push(
        0xe0 | (codePoint >>> 12),
        0x80 | ((codePoint >>> 6) & 0x3f),
        0x80 | (codePoint & 0x3f),
      );
    } else {
      bytes.push(
        0xf0 | (codePoint >>> 18),
        0x80 | ((codePoint >>> 12) & 0x3f),
        0x80 | ((codePoint >>> 6) & 0x3f),
        0x80 | (codePoint & 0x3f),
      );
    }
  }
  return bytes;
}

function appendBits(bits: number[], value: number, length: number) {
  for (let index = length - 1; index >= 0; index -= 1) {
    bits.push((value >>> index) & 1);
  }
}

function createDataCodewords(value: string, spec: QrVersionSpec): number[] {
  const bytes = encodeUtf8(value);
  const countBits = spec.version < 10 ? 8 : 16;
  const capacity = spec.dataCodewords * 8;
  const required = 4 + countBits + bytes.length * 8;
  if (required > capacity) {
    throw new RangeError(
      `QR value is too long for the supported Version 10-L encoder (${bytes.length} bytes).`,
    );
  }

  const bits: number[] = [];
  appendBits(bits, 0b0100, 4);
  appendBits(bits, bytes.length, countBits);
  for (const byte of bytes) appendBits(bits, byte, 8);
  for (let index = 0; index < Math.min(4, capacity - bits.length); index += 1)
    bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const codewords = Array.from({ length: spec.dataCodewords }, () => 0);
  for (let index = 0; index < bits.length; index += 8) {
    for (let bit = 0; bit < 8; bit += 1)
      codewords[index / 8] = (codewords[index / 8] << 1) | bits[index + bit];
  }
  let pad = 0xec;
  for (let index = bits.length / 8; index < codewords.length; index += 1) {
    codewords[index] = pad;
    pad ^= 0xfd;
  }
  return codewords;
}

function interleaveCodewords(dataCodewords: number[], spec: QrVersionSpec) {
  const dataBlocks: number[][] = [];
  const errorBlocks: number[][] = [];
  let offset = 0;

  for (const group of spec.blocks) {
    for (let index = 0; index < group.count; index += 1) {
      const data = dataCodewords.slice(offset, offset + group.dataCodewords);
      offset += group.dataCodewords;
      dataBlocks.push(data);
      errorBlocks.push(
        reedSolomonRemainder(data, group.totalCodewords - group.dataCodewords),
      );
    }
  }

  const result: number[] = [];
  const longestData = Math.max(...dataBlocks.map((block) => block.length));
  for (let index = 0; index < longestData; index += 1) {
    for (const block of dataBlocks) {
      if (index < block.length) result.push(block[index]);
    }
  }
  const longestError = Math.max(...errorBlocks.map((block) => block.length));
  for (let index = 0; index < longestError; index += 1) {
    for (const block of errorBlocks) {
      if (index < block.length) result.push(block[index]);
    }
  }
  return result;
}

function createFunctionPattern(spec: QrVersionSpec) {
  const modules: (boolean | null)[][] = Array.from({ length: spec.size }, () =>
    Array.from({ length: spec.size }, () => null),
  );
  const isFunction = Array.from({ length: spec.size }, () =>
    Array.from({ length: spec.size }, () => false),
  );

  function setFunction(row: number, column: number, value: boolean) {
    if (row >= 0 && row < spec.size && column >= 0 && column < spec.size) {
      modules[row][column] = value;
      isFunction[row][column] = true;
    }
  }

  function drawFinder(row: number, column: number) {
    for (let deltaRow = -1; deltaRow <= 7; deltaRow += 1) {
      for (let deltaColumn = -1; deltaColumn <= 7; deltaColumn += 1) {
        const inFinder =
          deltaRow >= 0 &&
          deltaRow <= 6 &&
          deltaColumn >= 0 &&
          deltaColumn <= 6;
        const dark =
          inFinder &&
          (deltaRow === 0 ||
            deltaRow === 6 ||
            deltaColumn === 0 ||
            deltaColumn === 6 ||
            (deltaRow >= 2 &&
              deltaRow <= 4 &&
              deltaColumn >= 2 &&
              deltaColumn <= 4));
        setFunction(row + deltaRow, column + deltaColumn, dark);
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(0, spec.size - 7);
  drawFinder(spec.size - 7, 0);

  for (let index = 8; index < spec.size - 8; index += 1) {
    if (!isFunction[6][index]) setFunction(6, index, index % 2 === 0);
    if (!isFunction[index][6]) setFunction(index, 6, index % 2 === 0);
  }

  for (const row of spec.alignment) {
    for (const column of spec.alignment) {
      if (isFunction[row][column]) continue;
      for (let deltaRow = -2; deltaRow <= 2; deltaRow += 1) {
        for (let deltaColumn = -2; deltaColumn <= 2; deltaColumn += 1) {
          setFunction(
            row + deltaRow,
            column + deltaColumn,
            Math.max(Math.abs(deltaRow), Math.abs(deltaColumn)) !== 1,
          );
        }
      }
    }
  }

  for (let index = 0; index < 15; index += 1) {
    const verticalRow =
      index < 6 ? index : index < 8 ? index + 1 : spec.size - 15 + index;
    const horizontalColumn =
      index < 8 ? spec.size - index - 1 : index === 8 ? 7 : 14 - index;
    setFunction(verticalRow, 8, false);
    setFunction(8, horizontalColumn, false);
  }
  setFunction(spec.size - 8, 8, true);
  return { isFunction, modules };
}

function maskApplies(mask: number, row: number, column: number) {
  switch (mask) {
    case 0:
      return (row + column) % 2 === 0;
    case 1:
      return row % 2 === 0;
    case 2:
      return column % 3 === 0;
    case 3:
      return (row + column) % 3 === 0;
    case 4:
      return (Math.floor(row / 2) + Math.floor(column / 3)) % 2 === 0;
    case 5:
      return ((row * column) % 2) + ((row * column) % 3) === 0;
    case 6:
      return (((row * column) % 2) + ((row * column) % 3)) % 2 === 0;
    default:
      return (((row * column) % 3) + ((row + column) % 2)) % 2 === 0;
  }
}

function formatBits(mask: number) {
  const data = (0b01 << 3) | mask;
  let remainder = data << 10;
  for (let bit = 14; bit >= 10; bit -= 1) {
    if (((remainder >>> bit) & 1) !== 0) remainder ^= 0x537 << (bit - 10);
  }
  return ((data << 10) | remainder) ^ 0x5412;
}

function drawCodewords(
  modules: (boolean | null)[][],
  isFunction: boolean[][],
  codewords: number[],
) {
  let bitIndex = 0;
  let upward = true;
  for (let right = modules.length - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let index = 0; index < modules.length; index += 1) {
      const row = upward ? modules.length - 1 - index : index;
      for (let columnOffset = 0; columnOffset < 2; columnOffset += 1) {
        const column = right - columnOffset;
        if (isFunction[row][column]) continue;
        const bit =
          bitIndex < codewords.length * 8 &&
          ((codewords[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1) !== 0;
        modules[row][column] = bit;
        bitIndex += 1;
      }
    }
    upward = !upward;
  }
}

function drawFormatInformation(modules: (boolean | null)[][], mask: number) {
  const bits = formatBits(mask);
  const size = modules.length;
  for (let index = 0; index < 15; index += 1) {
    const bit = ((bits >>> index) & 1) !== 0;
    const verticalRow =
      index < 6 ? index : index < 8 ? index + 1 : size - 15 + index;
    const horizontalColumn =
      index < 8 ? size - index - 1 : index === 8 ? 7 : 14 - index;
    modules[verticalRow][8] = bit;
    modules[8][horizontalColumn] = bit;
  }
  modules[size - 8][8] = true;
}

function penaltyScore(modules: QrMatrix) {
  const size = modules.length;
  let penalty = 0;
  const get = (row: number, column: number) => (modules[row][column] ? 1 : 0);

  for (let row = 0; row < size; row += 1) {
    let runColor = get(row, 0);
    let runLength = 1;
    for (let column = 1; column < size; column += 1) {
      const color = get(row, column);
      if (color === runColor) {
        runLength += 1;
      } else {
        if (runLength >= 5) penalty += runLength - 2;
        runColor = color;
        runLength = 1;
      }
    }
    if (runLength >= 5) penalty += runLength - 2;
  }

  for (let column = 0; column < size; column += 1) {
    let runColor = get(0, column);
    let runLength = 1;
    for (let row = 1; row < size; row += 1) {
      const color = get(row, column);
      if (color === runColor) {
        runLength += 1;
      } else {
        if (runLength >= 5) penalty += runLength - 2;
        runColor = color;
        runLength = 1;
      }
    }
    if (runLength >= 5) penalty += runLength - 2;
  }

  for (let row = 0; row < size - 1; row += 1) {
    for (let column = 0; column < size - 1; column += 1) {
      const value = get(row, column);
      if (
        value === get(row, column + 1) &&
        value === get(row + 1, column) &&
        value === get(row + 1, column + 1)
      )
        penalty += 3;
    }
  }

  function finderLike(row: number, column: number, horizontal: boolean) {
    const pattern = [1, 0, 1, 1, 1, 0, 1];
    for (let offset = 0; offset < pattern.length; offset += 1) {
      const current = horizontal
        ? get(row, column + offset)
        : get(row + offset, column);
      if (current !== pattern[offset]) return false;
    }
    const before = horizontal
      ? column >= 4 &&
        [1, 2, 3, 4].every((offset) => get(row, column - offset) === 0)
      : row >= 4 &&
        [1, 2, 3, 4].every((offset) => get(row - offset, column) === 0);
    const after = horizontal
      ? column + 11 <= size &&
        [7, 8, 9, 10].every((offset) => get(row, column + offset) === 0)
      : row + 11 <= size &&
        [7, 8, 9, 10].every((offset) => get(row + offset, column) === 0);
    return before || after;
  }

  for (let row = 0; row < size; row += 1)
    for (let column = 0; column <= size - 7; column += 1)
      if (finderLike(row, column, true)) penalty += 40;
  for (let column = 0; column < size; column += 1)
    for (let row = 0; row <= size - 7; row += 1)
      if (finderLike(row, column, false)) penalty += 40;

  let dark = 0;
  for (const row of modules) for (const module of row) if (module) dark += 1;
  penalty += Math.floor(Math.abs((dark * 100) / (size * size) - 50) / 5) * 10;
  return penalty;
}

function buildMaskedMatrix(
  spec: QrVersionSpec,
  codewords: number[],
  mask: number,
): QrMatrix {
  const { isFunction, modules } = createFunctionPattern(spec);
  drawCodewords(modules, isFunction, codewords);
  for (let row = 0; row < spec.size; row += 1) {
    for (let column = 0; column < spec.size; column += 1) {
      if (!isFunction[row][column] && maskApplies(mask, row, column))
        modules[row][column] = !modules[row][column];
    }
  }
  drawFormatInformation(modules, mask);
  return modules.map((row) => row.map((module) => module ?? false));
}

function encodeQr(value: string) {
  const bytes = encodeUtf8(value);
  const spec = QR_VERSION_SPECS.find(
    (candidate) =>
      4 + (candidate.version < 10 ? 8 : 16) + bytes.length * 8 <=
      candidate.dataCodewords * 8,
  );
  if (!spec) {
    throw new RangeError(
      `QR value is too long for the supported Version 10-L encoder (${bytes.length} bytes).`,
    );
  }
  const codewords = interleaveCodewords(createDataCodewords(value, spec), spec);
  let bestMatrix = buildMaskedMatrix(spec, codewords, 0);
  let bestPenalty = penaltyScore(bestMatrix);
  for (let mask = 1; mask < 8; mask += 1) {
    const candidate = buildMaskedMatrix(spec, codewords, mask);
    const penalty = penaltyScore(candidate);
    if (penalty < bestPenalty) {
      bestMatrix = candidate;
      bestPenalty = penalty;
    }
  }
  return { matrix: bestMatrix, version: spec.version };
}

function matrixPath(matrix: QrMatrix) {
  const quietZone = 4;
  let path = "";
  for (let row = 0; row < matrix.length; row += 1) {
    for (let column = 0; column < matrix.length; column += 1) {
      if (matrix[row][column])
        path += `M${column + quietZone} ${row + quietZone}h1v1h-1z`;
    }
  }
  return path;
}

export type QrCodeSize = "sm" | "md" | "lg";

export interface QrCodeProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> {
  /** Accessible description of what the encoded value represents. */
  description?: string;
  /** Show the opaque value below the QR mark for human verification. */
  displayValue?: boolean;
  /** Human-readable label or resource context shown with the mark. */
  label?: string;
  /** Keep the copy action visible; enabled by default. */
  copyable?: boolean;
  /** Keep the print action visible; enabled by default. */
  printable?: boolean;
  size?: QrCodeSize;
  /** Encoded opaque value; payload semantics stay with the consumer. */
  value: string;
  onCopy?: (copied: boolean) => void;
}

/**
 * Generic Web QR display. It renders a local byte-mode QR matrix and keeps
 * copy/print affordances separate from native camera/scanner workflows.
 */
export function QrCode({
  className,
  copyable = true,
  description,
  displayValue = true,
  label = "QR code",
  onCopy,
  printable = true,
  size = "md",
  value,
  ...props
}: QrCodeProps) {
  const titleId = useId();
  const descriptionId = useId();
  const svgDescriptionId = useId();
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "unavailable"
  >("idle");
  const [printing, setPrinting] = useState(false);
  const encoded = useMemo(() => {
    try {
      return { error: null, result: encodeQr(value) };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "QR value is invalid.",
        result: null,
      };
    }
  }, [value]);
  const resolvedDescription =
    description ?? `Encoded ${label.toLowerCase()}: ${value}`;

  useEffect(() => {
    if (!printing || typeof window === "undefined") return undefined;
    const handleAfterPrint = () => setPrinting(false);
    window.addEventListener("afterprint", handleAfterPrint, { once: true });
    const timer = window.setTimeout(() => window.print(), 0);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [printing]);

  async function copyValue() {
    let copied = false;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (!copied && typeof document !== "undefined") {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      textarea.remove();
    }
    setCopyStatus(copied ? "copied" : "unavailable");
    onCopy?.(copied);
  }

  return (
    <figure
      {...props}
      aria-describedby={descriptionId}
      className={cx("t7-qr-code", className)}
      data-printing={printing || undefined}
      data-size={size}
      data-qr-version={encoded.result?.version}
    >
      <figcaption className="t7-qr-code-caption">
        <Typography as="strong" typeRole="label">
          {label}
        </Typography>
        {displayValue ? <code>{value}</code> : null}
        <span className="t7-visually-hidden" id={descriptionId}>
          {resolvedDescription}
        </span>
      </figcaption>
      {encoded.result ? (
        <svg
          aria-labelledby={titleId}
          aria-describedby={svgDescriptionId}
          className="t7-qr-code-mark"
          role="img"
          shapeRendering="crispEdges"
          viewBox={`0 0 ${encoded.result.matrix.length + 8} ${encoded.result.matrix.length + 8}`}
        >
          <title id={titleId}>{label}</title>
          <desc id={svgDescriptionId}>{resolvedDescription}</desc>
          <rect
            className="t7-qr-code-background"
            height={encoded.result.matrix.length + 8}
            width={encoded.result.matrix.length + 8}
            x="0"
            y="0"
          />
          <path
            className="t7-qr-code-modules"
            d={matrixPath(encoded.result.matrix)}
          />
        </svg>
      ) : (
        <div aria-live="polite" className="t7-qr-code-error" role="alert">
          {encoded.error}
        </div>
      )}
      {encoded.result && (copyable || printable) ? (
        <div className="t7-qr-code-actions">
          {copyable ? (
            <Button intent="secondary" onClick={copyValue} size="sm">
              Copy value
            </Button>
          ) : null}
          {printable ? (
            <Button intent="quiet" onClick={() => setPrinting(true)} size="sm">
              Print QR
            </Button>
          ) : null}
          {copyStatus !== "idle" ? (
            <output aria-live="polite" className="t7-qr-code-status">
              {copyStatus === "copied" ? "Value copied" : "Copy unavailable"}
            </output>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}

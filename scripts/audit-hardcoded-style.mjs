import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(import.meta.dirname, "..");

export const activeRoots = [
  "packages/ui",
  "packages/tokens",
  "packages/contracts",
  "packages/native",
  "apps/playground",
  "apps/native-lab",
  "consumer-tests",
];

export const STYLE_CATEGORIES = [
  "T1 COLOR",
  "T2 SPACING",
  "T3 PADDING",
  "T4 MARGIN",
  "T5 GAP",
  "T6 WIDTH / HEIGHT",
  "T7 MIN / MAX SIZE",
  "T8 CONTROL SIZE",
  "T9 TYPOGRAPHY",
  "T10 RADIUS",
  "T11 BORDER",
  "T12 ELEVATION / SHADOW",
  "T13 OPACITY",
  "T14 MOTION",
  "T15 Z-LAYER",
  "T16 BREAKPOINT / RESPONSIVE",
  "T17 LAYOUT MEASURE",
  "T18 ICON / MEDIA SIZE",
  "T19 NATIVE STYLE CONSTANT",
  "T20 LEGITIMATE MECHANICAL EXCEPTION",
];

const sourceExtensions = new Set([
  ".css",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
]);
const excludedSegments = new Set([
  "node_modules",
  "dist",
  "build",
  "coverage",
  "playwright-report",
  "test-results",
  ".next",
  "generated",
]);

const tokenAuthorityPatterns = [
  /^packages\/tokens\/src\/theme\.ts$/,
  /^packages\/tokens\/src\/theme\.css$/,
  /^packages\/tokens\/src\/theme-recipes\.css$/,
  /^packages\/tokens\/generated\//,
  /^packages\/contracts\/src\//,
];
const canonicalWebPatterns = [
  /^packages\/ui\/src\//,
  /^packages\/tokens\/src\//,
];
const canonicalNativePatterns = [
  /^packages\/native\/src\//,
  /^apps\/native-lab\//,
];
const localThemePropertyPattern =
  /^--(?:playground|demo|farm-reference|ebook|operations|erp)(?:-|$)|^--studio-(?:color|role|recipe|theme|surface|token)/i;
const exceptionRegistry =
  JSON.parse(
    fs.readFileSync(
      path.join(repoRoot, "scripts/token-governance-allowlist.json"),
      "utf8",
    ),
  ).exceptionRegistry ?? [];

const cssProperties = new Map([
  ["padding", "T3 PADDING"],
  ["padding-block", "T3 PADDING"],
  ["padding-inline", "T3 PADDING"],
  ["padding-top", "T3 PADDING"],
  ["padding-right", "T3 PADDING"],
  ["padding-bottom", "T3 PADDING"],
  ["padding-left", "T3 PADDING"],
  ["margin", "T4 MARGIN"],
  ["margin-block", "T4 MARGIN"],
  ["margin-inline", "T4 MARGIN"],
  ["margin-top", "T4 MARGIN"],
  ["margin-right", "T4 MARGIN"],
  ["margin-bottom", "T4 MARGIN"],
  ["margin-left", "T4 MARGIN"],
  ["gap", "T5 GAP"],
  ["row-gap", "T5 GAP"],
  ["column-gap", "T5 GAP"],
  ["width", "T6 WIDTH / HEIGHT"],
  ["height", "T6 WIDTH / HEIGHT"],
  ["inline-size", "T17 LAYOUT MEASURE"],
  ["block-size", "T17 LAYOUT MEASURE"],
  ["min-width", "T7 MIN / MAX SIZE"],
  ["max-width", "T7 MIN / MAX SIZE"],
  ["min-height", "T7 MIN / MAX SIZE"],
  ["max-height", "T7 MIN / MAX SIZE"],
  ["font-size", "T9 TYPOGRAPHY"],
  ["line-height", "T9 TYPOGRAPHY"],
  ["letter-spacing", "T9 TYPOGRAPHY"],
  ["font-weight", "T9 TYPOGRAPHY"],
  ["border-radius", "T10 RADIUS"],
  ["border", "T11 BORDER"],
  ["border-width", "T11 BORDER"],
  ["border-top", "T11 BORDER"],
  ["border-right", "T11 BORDER"],
  ["border-bottom", "T11 BORDER"],
  ["border-left", "T11 BORDER"],
  ["outline", "T11 BORDER"],
  ["box-shadow", "T12 ELEVATION / SHADOW"],
  ["text-shadow", "T12 ELEVATION / SHADOW"],
  ["opacity", "T13 OPACITY"],
  ["transition", "T14 MOTION"],
  ["transition-duration", "T14 MOTION"],
  ["animation", "T14 MOTION"],
  ["animation-duration", "T14 MOTION"],
  ["z-index", "T15 Z-LAYER"],
]);

const nativeProperties = new Map([
  ["padding", "T3 PADDING"],
  ["paddingHorizontal", "T3 PADDING"],
  ["paddingVertical", "T3 PADDING"],
  ["paddingTop", "T3 PADDING"],
  ["paddingRight", "T3 PADDING"],
  ["paddingBottom", "T3 PADDING"],
  ["paddingLeft", "T3 PADDING"],
  ["margin", "T4 MARGIN"],
  ["marginHorizontal", "T4 MARGIN"],
  ["marginVertical", "T4 MARGIN"],
  ["marginTop", "T4 MARGIN"],
  ["marginRight", "T4 MARGIN"],
  ["marginBottom", "T4 MARGIN"],
  ["marginLeft", "T4 MARGIN"],
  ["gap", "T5 GAP"],
  ["rowGap", "T5 GAP"],
  ["columnGap", "T5 GAP"],
  ["width", "T6 WIDTH / HEIGHT"],
  ["height", "T6 WIDTH / HEIGHT"],
  ["minWidth", "T7 MIN / MAX SIZE"],
  ["maxWidth", "T7 MIN / MAX SIZE"],
  ["minHeight", "T7 MIN / MAX SIZE"],
  ["maxHeight", "T7 MIN / MAX SIZE"],
  ["fontSize", "T9 TYPOGRAPHY"],
  ["lineHeight", "T9 TYPOGRAPHY"],
  ["letterSpacing", "T9 TYPOGRAPHY"],
  ["fontWeight", "T9 TYPOGRAPHY"],
  ["borderRadius", "T10 RADIUS"],
  ["borderWidth", "T11 BORDER"],
  ["opacity", "T13 OPACITY"],
  ["elevation", "T12 ELEVATION / SHADOW"],
  ["shadowColor", "T12 ELEVATION / SHADOW"],
  ["shadowOpacity", "T12 ELEVATION / SHADOW"],
  ["shadowRadius", "T12 ELEVATION / SHADOW"],
  ["shadowOffset", "T12 ELEVATION / SHADOW"],
]);

const rawUnitPattern =
  /\d+(?:\.\d+)?(?:px|rem|em|ch|ex|vw|vh|vmin|vmax|cqw|cqh|ms|s|%|fr)\b/i;
const rawNumberPattern = /(?:^|[^\w.])-?\d+(?:\.\d+)?(?:[^\w.]|$)/;
const rawColorPattern =
  /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|color-mix)\s*\(/i;
const semanticColorWordPattern = /\b(?:white|black)\b/i;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (excludedSegments.has(entry.name)) return [];
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function relative(file) {
  return path.relative(repoRoot, file).replaceAll("\\", "/");
}
export function isTokenAuthority(file) {
  const filePath = relative(file);
  return tokenAuthorityPatterns.some((pattern) => pattern.test(filePath));
}
function isCanonicalWeb(filePath) {
  return canonicalWebPatterns.some((pattern) => pattern.test(filePath));
}
function isCanonicalNative(filePath) {
  return canonicalNativePatterns.some((pattern) => pattern.test(filePath));
}
function isSource(file) {
  return sourceExtensions.has(path.extname(file).toLowerCase());
}
function stripBlockComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\n]/g, " "),
  );
}
function lineNumberAt(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}
function hasTokenReference(value) {
  return /var\(\s*--t7-/i.test(value);
}
function withoutTokenReferences(value) {
  return value.replace(/var\([^()]*\)/g, "").replace(/var\([^)]*\)/g, "");
}
function isTestSurface(filePath) {
  return (
    /(?:^|\/)(?:tests?|__tests__)\//i.test(filePath) ||
    /\.(?:test|spec)\.[^.]+$/i.test(filePath)
  );
}
function isExternalBrandBoundary(filePath, literal) {
  return (
    filePath ===
      "consumer-tests/next-app-router-consumer/app/client-provider.tsx" &&
    (/#(?:d4451a|318139)/i.test(literal) || /exactColor\s*\(/i.test(literal))
  );
}

function isCanonicalColorProjection(filePath, category, property, literal) {
  if (category !== "T1 COLOR") return false;
  if (
    property === "color-literal" &&
    /^apps\/playground\/src\/(?:App|token-foundations)\.tsx$/.test(filePath)
  )
    return /^hsl\(/i.test(literal);
  return (
    filePath === "apps/playground/src/app.css" &&
    /var\(--(?:ebook-publishing-accent-hsl|studio-(?:role-color|recipe-color|aapm-profile-primary))\b/i.test(
      literal,
    )
  );
}

function isZeroOrIntrinsic(value) {
  const normalized = withoutTokenReferences(value)
    .replace(/!important\b/gi, "")
    .replace(/^['"]|['"]$/g, "")
    .replace(/[(),]/g, " ")
    .trim();
  if (!normalized) return true;
  if (
    /^(?:0(?:px|rem|em|%)?|1|100%|auto|inherit|initial|unset|none|normal|transparent)$/i.test(
      normalized,
    )
  )
    return true;
  const parts = normalized.split(/\s+/).filter(Boolean);
  return (
    parts.length > 0 &&
    parts.every((part) => /^-?0(?:\.0+)?(?:[a-z%]+)?$/i.test(part))
  );
}

function isMechanicalValue(property, value) {
  const normalized = withoutTokenReferences(value)
    .replace(/!important\b/gi, "")
    .replace(/^['"]|['"]$/g, "")
    .trim();
  if (!normalized || isZeroOrIntrinsic(normalized)) return true;
  if (property === "content" || property === "font-family") return true;
  if (property === "opacity" && /^(?:0|1|0\.0+|1\.0+)$/.test(normalized))
    return true;
  if (property === "shadowOffset" && /width\s*:\s*0/.test(normalized))
    return true;
  if (
    /^(?:viewBox|preserveAspectRatio|stroke(?:Width|Linecap|Linejoin))$/i.test(
      property,
    )
  )
    return true;
  if (/^(?:1px|0px)\s+(?:solid|dashed|dotted)\b/i.test(normalized)) return true;
  if (property === "z-index" && /^(?:0|1)$/.test(normalized)) return true;
  if (property === "border-radius" && /^(?:50%|9999?px)$/.test(normalized))
    return true;
  return false;
}

function hasRawColorValue(property, value) {
  if (!/(?:color|background|border|fill|stroke|shadow|outline)/i.test(property))
    return false;
  const withoutCanonical = value
    .replace(/hsl\(\s*var\(\s*--t7-[^)]+\)\s*(?:\/\s*[^)]*)?\)/gi, "")
    .replace(/var\([^)]*\)/g, "");
  return (
    rawColorPattern.test(withoutCanonical) ||
    semanticColorWordPattern.test(withoutCanonical)
  );
}

function hasRawGeometryValue(property, value) {
  if (hasTokenReference(value)) {
    const withoutTokens = withoutTokenReferences(value);
    return (
      rawUnitPattern.test(withoutTokens) || rawNumberPattern.test(withoutTokens)
    );
  }
  if (
    property === "font-weight" &&
    /^(?:normal|bold|bolder|lighter|\d{3})$/i.test(value.trim())
  )
    return true;
  if (
    /^(?:line-height|letter-spacing|font-size|border-radius|opacity|z-index|elevation)$/i.test(
      property,
    )
  )
    return rawNumberPattern.test(value) || rawUnitPattern.test(value);
  return rawUnitPattern.test(value) || rawNumberPattern.test(value);
}

function inferCustomPropertyCategory(property) {
  const name = property.toLowerCase();
  if (/(?:color|hsl|rgb|foreground|background|border|shadow)/.test(name))
    return "T1 COLOR";
  if (/(?:radius|round)/.test(name)) return "T10 RADIUS";
  if (/(?:duration|motion|transition|ease|timing)/.test(name))
    return "T14 MOTION";
  if (/(?:z-|layer|stack)/.test(name)) return "T15 Z-LAYER";
  if (/(?:font|type|line|tracking|weight)/.test(name)) return "T9 TYPOGRAPHY";
  if (
    /(?:gutter|measure|rail|width|height|size|inset|content|section|shell|panel|grid)/.test(
      name,
    )
  )
    return "T17 LAYOUT MEASURE";
  if (/(?:space|gap|padding|margin)/.test(name)) return "T2 SPACING";
  return "T20 LEGITIMATE MECHANICAL EXCEPTION";
}

function classify(
  filePath,
  category,
  property,
  value,
  isCustomProperty = false,
) {
  const authority = tokenAuthorityPatterns.some((pattern) =>
    pattern.test(filePath),
  );
  if (authority)
    return {
      ownership: "TOKEN_AUTHORITY",
      resolution: "AUTHORITY",
      authority: true,
    };
  if (isTestSurface(filePath))
    return {
      ownership: "TEST_FIXTURE",
      resolution: "REVIEWED_EXCEPTION",
      authority: false,
    };
  if (isExternalBrandBoundary(filePath, value))
    return {
      ownership: "EXTERNAL_API_REQUIREMENT",
      resolution: "REVIEWED_EXCEPTION",
      authority: false,
    };
  if (isCanonicalColorProjection(filePath, category, property, value))
    return {
      ownership: "TOKENIZE",
      resolution: "TOKENIZE",
      authority: false,
    };
  if (filePath === "packages/ui/src/motion.ts" && category === "T13 OPACITY")
    return {
      ownership: "MOTION_CHOREOGRAPHY",
      resolution: "REVIEWED_EXCEPTION",
      authority: false,
    };
  if (filePath === "packages/ui/src/overlay.ts" && property === "maxHeight")
    return {
      ownership: "RUNTIME_MEASURE",
      resolution: "REVIEWED_EXCEPTION",
      authority: false,
    };
  if (isMechanicalValue(property, value))
    return {
      ownership: "MECHANICAL_EXCEPTION",
      resolution: "MECHANICAL",
      authority: false,
    };
  if (
    category === "T14 MOTION" &&
    /(?:transition|animation)/i.test(property) &&
    !rawUnitPattern.test(value)
  )
    return {
      ownership: "CANONICAL_ROLE",
      resolution: "DERIVED",
      authority: false,
    };
  if (category === "T16 BREAKPOINT / RESPONSIVE")
    return {
      ownership: "BREAKPOINT_CONTRACT",
      resolution: "DERIVED",
      authority: false,
    };
  if (isCustomProperty && /^--(?:t7-)/i.test(property))
    return {
      ownership: "CANONICAL_ROLE",
      resolution: "DERIVED",
      authority: false,
    };
  if (isCanonicalNative(filePath) || isCanonicalWeb(filePath))
    return { ownership: "TOKENIZE", resolution: "TOKENIZE", authority: false };
  return {
    ownership: "COMPOSITION_LOCAL",
    resolution: "REVIEWED_EXCEPTION",
    authority: false,
  };
}

function addFinding(
  findings,
  file,
  line,
  category,
  property,
  literal,
  extra = {},
) {
  const filePath = relative(file);
  const classification = classify(
    filePath,
    category,
    property,
    literal,
    property.startsWith("--"),
  );
  findings.push({
    file: filePath,
    line,
    property,
    literal: literal.trim().slice(0, 220),
    category,
    ownership: classification.ownership,
    resolution: classification.resolution,
    authority: classification.authority,
    ...extra,
  });
}

function matchesException(finding, exception) {
  const matches = (pattern, value) =>
    !pattern || new RegExp(pattern, "i").test(value);
  return (
    matches(exception.filePattern, finding.file) &&
    matches(exception.categoryPattern, finding.category) &&
    matches(exception.propertyPattern, finding.property) &&
    matches(exception.valuePattern, finding.literal)
  );
}

function applyExceptionRegistry(findings) {
  return findings.map((finding) => {
    if (
      finding.resolution !== "TOKENIZE" &&
      finding.ownership !== "COMPOSITION_LOCAL"
    )
      return finding;
    const exception = exceptionRegistry.find((candidate) =>
      matchesException(finding, candidate),
    );
    return exception
      ? {
          ...finding,
          ownership: exception.class,
          resolution: "REVIEWED_EXCEPTION",
          exceptionId: exception.id,
        }
      : finding;
  });
}

function splitCssDeclarations(source) {
  const declarations = [];
  let depth = 0;
  let segmentStart = 0;
  let quote = null;
  let parentheses = 0;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === quote && source[index - 1] !== "\\") quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "(") {
      parentheses += 1;
      continue;
    }
    if (character === ")") {
      parentheses = Math.max(0, parentheses - 1);
      continue;
    }
    if (parentheses > 0) continue;
    if (character === "{") {
      depth += 1;
      segmentStart = index + 1;
      continue;
    }
    if (character === ";" && depth > 0) {
      declarations.push({ start: segmentStart, end: index, depth });
      segmentStart = index + 1;
      continue;
    }
    if (character === "}") {
      if (depth > 0) {
        declarations.push({ start: segmentStart, end: index, depth });
        depth -= 1;
      }
      segmentStart = index + 1;
    }
  }
  return declarations;
}

function parseCssDeclaration(source, range) {
  const text = source.slice(range.start, range.end).trim();
  const colon = text.indexOf(":");
  if (colon <= 0) return null;
  const property = text.slice(0, colon).trim();
  const value = text.slice(colon + 1).trim();
  if (!/^--[-\w]+$/.test(property) && !/^[-\w]+$/.test(property)) return null;
  if (!value || property.startsWith("@")) return null;
  return { property, value, literal: `${property}: ${value}` };
}

function inspectCss(findings, file, source) {
  const cleanSource = stripBlockComments(source);
  for (const range of splitCssDeclarations(cleanSource)) {
    const declaration = parseCssDeclaration(cleanSource, range);
    if (!declaration) continue;
    const { property, value, literal } = declaration;
    const line = lineNumberAt(cleanSource, range.start);
    const lowerProperty = property.toLowerCase();
    const standardCategory = cssProperties.get(lowerProperty);
    const customCategory = property.startsWith("--")
      ? inferCustomPropertyCategory(property)
      : null;
    if (!standardCategory && !customCategory) continue;
    const category = customCategory ?? standardCategory;
    if (hasRawColorValue(property, value))
      addFinding(findings, file, line, "T1 COLOR", property, literal);
    if (
      hasRawGeometryValue(lowerProperty, value) &&
      !isMechanicalValue(lowerProperty, value)
    )
      addFinding(findings, file, line, category, property, literal);
  }
  for (const match of cleanSource.matchAll(
    /@media\s*\([^)]*(?:width|height|resolution)\s*[:<]/gi,
  ))
    addFinding(
      findings,
      file,
      lineNumberAt(cleanSource, match.index ?? 0),
      "T16 BREAKPOINT / RESPONSIVE",
      "@media",
      match[0],
      { resolution: "DERIVED", ownership: "BREAKPOINT_CONTRACT" },
    );
}

function inspectTypeScript(findings, file, source) {
  const cleanSource = stripBlockComments(source);
  const filePath = relative(file);
  const isNativeSurface = isCanonicalNative(filePath);
  const lineStarts = [0];
  for (let index = 0; index < cleanSource.length; index += 1)
    if (cleanSource[index] === "\n") lineStarts.push(index + 1);
  const lineAt = (index) => {
    let low = 0;
    let high = lineStarts.length;
    while (low + 1 < high) {
      const middle = Math.floor((low + high) / 2);
      if (lineStarts[middle] <= index) low = middle;
      else high = middle;
    }
    return low + 1;
  };
  const objectProperty =
    /(?:^|[{,]\s*)([A-Za-z][A-Za-z0-9]*)\s*:\s*([^,}\n]+)/g;
  for (const match of cleanSource.matchAll(objectProperty)) {
    const property = match[1];
    const value = match[2].trim();
    const category = nativeProperties.get(property);
    if (
      !category ||
      !hasRawGeometryValue(property, value) ||
      isMechanicalValue(property, value)
    )
      continue;
    if (
      isNativeSurface &&
      /(?:theme\.|insets\.|edges\.|props\.|pressed\?|disabled\?|bounded\b|StyleSheet\.|spacing\.|radius\.|marks\.|resolvedSize\b)/.test(
        value,
      )
    )
      continue;
    addFinding(
      findings,
      file,
      lineAt(match.index ?? 0),
      isNativeSurface ? "T19 NATIVE STYLE CONSTANT" : category,
      property,
      match[0],
    );
  }
  const colorSource = cleanSource.replace(
    /hsl\(\s*var\(\s*--t7-[^)]+\)\s*(?:\/\s*[^)]*)?\)/gi,
    "",
  );
  for (const match of colorSource.matchAll(
    /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|color-mix)\s*\(/gi,
  ))
    addFinding(
      findings,
      file,
      lineAt(match.index ?? 0),
      "T1 COLOR",
      "color-literal",
      match[0],
    );
  for (const match of cleanSource.matchAll(
    /(?:duration|delay|transition|animation)\s*[:=][^\n,}]*\b\d+(?:\.\d+)?(?:ms|s)\b/gi,
  ))
    addFinding(
      findings,
      file,
      lineAt(match.index ?? 0),
      "T14 MOTION",
      "motion",
      match[0],
      { resolution: "DERIVED", ownership: "CANONICAL_ROLE" },
    );
}

export function buildInventory() {
  const findings = [];
  for (const root of activeRoots) {
    const absoluteRoot = path.join(repoRoot, root);
    for (const file of walk(absoluteRoot).filter(isSource)) {
      const source = fs.readFileSync(file, "utf8");
      if (path.extname(file).toLowerCase() === ".css")
        inspectCss(findings, file, source);
      else inspectTypeScript(findings, file, source);
    }
  }
  return applyExceptionRegistry(findings);
}

export function countBy(findings, key) {
  const values =
    key === "category"
      ? STYLE_CATEGORIES
      : [...new Set(findings.map((finding) => finding[key]))].sort();
  return Object.fromEntries(
    values.map((value) => [
      value,
      findings.filter((finding) => finding[key] === value).length,
    ]),
  );
}

export function getInventoryMetrics(findings) {
  const metricCategories = {
    rawColorLiterals: "T1 COLOR",
    rawSpacingLiterals: "T2 SPACING",
    rawPadding: "T3 PADDING",
    rawMargin: "T4 MARGIN",
    rawGap: "T5 GAP",
    rawSize: "T6 WIDTH / HEIGHT",
    rawControlSize: "T8 CONTROL SIZE",
    rawRadius: "T10 RADIUS",
    rawTypography: "T9 TYPOGRAPHY",
    rawShadowElevation: "T12 ELEVATION / SHADOW",
    rawOpacity: "T13 OPACITY",
    rawMotion: "T14 MOTION",
    rawZLayer: "T15 Z-LAYER",
    rawIconMediaSize: "T18 ICON / MEDIA SIZE",
    rawNativeStyleLiterals: "T19 NATIVE STYLE CONSTANT",
  };
  const metrics = Object.fromEntries(
    Object.entries(metricCategories).map(([key, category]) => [
      key,
      findings.filter((finding) => finding.category === category).length,
    ]),
  );
  metrics.demoReferenceHardcodedDesignLiterals = findings.filter(
    (finding) =>
      /^(apps\/playground|consumer-tests)\//.test(finding.file) &&
      finding.resolution !== "AUTHORITY",
  ).length;
  metrics.approvedExceptions = findings.filter((finding) =>
    ["MECHANICAL", "REVIEWED_EXCEPTION", "DERIVED"].includes(
      finding.resolution,
    ),
  ).length;
  metrics.tokenizableUnresolved = findings.filter(
    (finding) => finding.resolution === "TOKENIZE",
  ).length;
  metrics.demoLocalThemeSystems = findings.filter(
    (finding) =>
      /^(apps\/playground|consumer-tests)\//.test(finding.file) &&
      localThemePropertyPattern.test(finding.property) &&
      !hasTokenReference(finding.literal),
  ).length;
  metrics.nativeParallelThemeSystems = findings.filter(
    (finding) =>
      /^(packages\/native|apps\/native-lab)\//.test(finding.file) &&
      finding.property.startsWith("--"),
  ).length;
  metrics.duplicateGlobalTokenAuthorities =
    countNonCanonicalGlobalTokenBlocks();
  return metrics;
}

function countNonCanonicalGlobalTokenBlocks() {
  let count = 0;
  for (const root of activeRoots) {
    const absoluteRoot = path.join(repoRoot, root);
    for (const file of walk(absoluteRoot).filter(
      (candidate) => path.extname(candidate).toLowerCase() === ".css",
    )) {
      if (isTokenAuthority(file)) continue;
      const source = stripBlockComments(fs.readFileSync(file, "utf8"));
      for (const match of source.matchAll(
        /(?:^|\n)\s*:root(?:\s*,[^\{]+)?\s*\{([^{}]*)\}/g,
      ))
        if (/--t7-[-\w]+\s*:/.test(match[1])) count += 1;
    }
  }
  return count;
}

export function renderSummary(findings) {
  const active = findings.filter((finding) => !finding.authority);
  const authorities = findings.filter((finding) => finding.authority);
  const categories = STYLE_CATEGORIES;
  const rows = categories
    .map((category) => {
      const total = findings.filter(
        (finding) => finding.category === category,
      ).length;
      const authority = authorities.filter(
        (finding) => finding.category === category,
      ).length;
      const tokenizable = active.filter(
        (finding) =>
          finding.category === category && finding.resolution === "TOKENIZE",
      ).length;
      const exceptions = active.filter(
        (finding) =>
          finding.category === category && finding.resolution !== "TOKENIZE",
      ).length;
      return `| ${category} | ${total} | ${authority} | ${tokenizable} | ${exceptions} |`;
    })
    .join("\n");
  const activeFiles = Object.entries(
    active.reduce((accumulator, finding) => {
      accumulator[finding.file] = (accumulator[finding.file] ?? 0) + 1;
      return accumulator;
    }, {}),
  )
    .sort(([, left], [, right]) => right - left)
    .slice(0, 30)
    .map(([file, count]) => `- ${file}: ${count}`);
  const metrics = getInventoryMetrics(findings);
  return [
    "# Hardcoded style inventory",
    "",
    `Scanned ${findings.length} declaration findings across ${new Set(findings.map((finding) => finding.file)).size} files in active Web, Native, contract, playground, and consumer surfaces.`,
    "",
    "| Category | Total findings | Token authority | Tokenizable unresolved | Reviewed/derived exceptions |",
    "| --- | ---: | ---: | ---: | ---: |",
    rows,
    "",
    `Active findings: ${active.length}`,
    `Token-authority findings: ${authorities.length}`,
    `TOKENIZABLE_UNRESOLVED: ${metrics.tokenizableUnresolved}`,
    `DEMO_LOCAL_THEME_SYSTEMS: ${metrics.demoLocalThemeSystems}`,
    `NATIVE_PARALLEL_THEME_SYSTEMS: ${metrics.nativeParallelThemeSystems}`,
    `DUPLICATE_GLOBAL_TOKEN_AUTHORITIES: ${metrics.duplicateGlobalTokenAuthorities}`,
    "",
    "## Highest-frequency active files",
    "",
    ...activeFiles,
  ].join("\n");
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const findings = buildInventory();
  if (process.argv.includes("--json"))
    process.stdout.write(
      `${JSON.stringify({ findings, counts: countBy(findings, "category"), metrics: getInventoryMetrics(findings) }, null, 2)}\n`,
    );
  else if (process.argv.includes("--findings"))
    process.stdout.write(
      `${findings
        .filter((finding) => !finding.authority)
        .map(
          (finding) =>
            `${finding.file}:${finding.line} | ${finding.category} | ${finding.resolution} | ${finding.ownership} | ${finding.property} | ${finding.literal}`,
        )
        .join("\n")}\n`,
    );
  else process.stdout.write(`${renderSummary(findings)}\n`);
}

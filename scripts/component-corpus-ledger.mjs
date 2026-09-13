import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveComponentPlatformContract } from "../packages/contracts/src/component-platform.ts";

export const COMPONENT_CORPUS_SOURCE_FILES = Object.freeze([
  "01_COMPONENTS_CORE.md",
  "02_PUBLIC_SHELL_BLOCKS.md",
  "03_ADMIN_PANEL_BLOCKS.md",
  "04_HERO_BLOCKS.md",
]);

const CURRENT_CATALOG_PATH = "packages/ai/catalog/components.json";
const BLOCK_CATALOG_PATH = "packages/ai/catalog/blocks.json";
const RECIPE_CATALOG_PATH = "packages/ai/catalog/recipes.json";
const U12_EVIDENCE_PATH =
  "docs/aapm/T7-UNIVERSAL-HARDENING-U12-NATIVE-EXPO-PARITY-EVIDENCE.md";

const DECISIONS = Object.freeze([
  "FOUNDATION",
  "CANONICAL_COMPONENT",
  "COMPONENT_VARIANT",
  "UTILITY_OR_PROVIDER",
  "COMPOSITE_BLOCK",
  "RECIPE_OR_PATTERN",
  "ENGINE_ADAPTER",
  "DOMAIN_COMPOSITION",
  "ALIAS",
  "WEB_ONLY",
  "NATIVE_ONLY",
  "ADAPTIVE",
  "DEFERRED",
  "REJECTED_DUPLICATE",
]);

const PLATFORM_STRATEGIES = Object.freeze([
  "SAME_INTENT",
  "NATIVE_RENDERER",
  "ALTERNATE_PATTERN",
  "NOT_APPLICABLE",
]);

const CONDITIONAL_CANDIDATES = Object.freeze({
  menubar: {
    family: "navigation",
    normalizedIntent: "desktop hierarchical menu navigation",
    complexity: "L3",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    currentT7Equivalent: "NavigationMenu",
    reason:
      "Potentially distinct roving-focus and submenu behavior, but its public contract and multi-surface demand are not approved separately from NavigationMenu and DropdownMenu.",
  },
  knob: {
    family: "form",
    normalizedIntent: "continuous rotary value input",
    complexity: "L3",
    platform: "BOTH",
    nativeStrategy: "NATIVE_RENDERER",
    currentT7Equivalent: "Slider",
    reason:
      "May be a Slider or RangeSlider presentation variant; a separate value, keyboard, screen-reader, and touch contract has not been approved.",
  },
  gaugechart: {
    family: "chart",
    normalizedIntent: "bounded gauge visualization",
    complexity: "L4",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    currentT7Equivalent: "Progress",
    reason:
      "May be a composition of Progress, DonutChart, or a future visualization engine; data, summary, bundle, and Native boundaries remain unresolved.",
  },
});

const EXPLICIT_ALIASES = Object.freeze({
  dropzone: "FileUpload",
  snackbar: "Toast",
  loader: "Spinner",
  transferlist: "Transfer",
});

const NEAREST_CANONICAL_RULES = Object.freeze([
  { pattern: /\bpin\b|otp|one.?time|verification code/, target: "OtpInput" },
  {
    pattern: /\bsearch\b|autocomplete|typeahead|suggestion/,
    target: "SearchInput",
  },
  { pattern: /\bpassword\b/, target: "PasswordInput" },
  { pattern: /\bnumber\b|numeric|quantity|scrubber/, target: "NumberInput" },
  { pattern: /percentage|percent/, target: "PercentInput" },
  { pattern: /currency|money|price/, target: "CurrencyInput" },
  { pattern: /\bselect\b|listbox|picker/, target: "Select" },
  { pattern: /checkbox|checklist/, target: "Checkbox" },
  { pattern: /radio/, target: "Radio" },
  { pattern: /toggle|switch/, target: "Switch" },
  { pattern: /range|slider|scrub/, target: "Slider" },
  { pattern: /upload|drop.?zone|attachment|file input/, target: "FileUpload" },
  { pattern: /\binput\b|field|textarea|text field/, target: "Input" },
  { pattern: /button|action|trigger/, target: "Button" },
  { pattern: /breadcrumb/, target: "Breadcrumb" },
  {
    pattern: /sidebar|side bar|nav(igation)?|navbar|menu/,
    target: "NavigationMenu",
  },
  { pattern: /table|matrix|data grid|grid/, target: "DataTable" },
  { pattern: /\blist\b|collection/, target: "List" },
  { pattern: /calendar|date|time|agenda/, target: "Calendar" },
  { pattern: /progress|meter|loading|spinner/, target: "Progress" },
  {
    pattern: /status|alert|notification|message|callout/,
    target: "StatusChip",
  },
  { pattern: /timeline|roadmap|milestone/, target: "ActivityFeed" },
  { pattern: /image|media|photo/, target: "Image" },
  { pattern: /card/, target: "Card" },
  { pattern: /panel|surface|paper/, target: "Panel" },
  { pattern: /separator|divider/, target: "Separator" },
  { pattern: /carousel|slider/, target: "Carousel" },
]);

const DOMAIN_PATTERN =
  /farm|invoice|warehouse|inventory|shipment|shipping|delivery|route|fleet|load|receiving|purchase|cash|journal|ledger|finance|accounting|customer|tenant|organization|branch|role|permission|entitlement|subscription|billing|order|refund|checkout|cart|product|catalog|pricing|author|publisher|ebook|course|lesson|patient|clinical|medical|employee|team|sales|crm|campaign|marketing|project|task|approval|exception|audit|compliance|resource|shift|event|venue|booking|registration|support/i;

const ENGINE_PATTERN =
  /rich.?text|markdown|code editor|json editor|sql|spreadsheet|pivot|data.?grid|grid|virtual|infinite|masonry|scheduler|calendar|gantt|map|geo|diagram|graph|flow|whiteboard|canvas|resize|resizable|drag.?and.?drop|signature|audio|video|crop|zoom|heatmap|treemap|sankey|radar|funnel|waterfall|chart/i;

const RECIPE_PATTERN =
  /\b(page|screen|workspace|wizard|flow|shell|dashboard|onboarding|checkout|registration|login|recovery|settings|import|review|approval|queue|journey|roadmap|process|workflow|builder|form)\b/i;

const BLOCK_PATTERN =
  /hero|navbar|navigation|header|footer|section|bar|strip|cloud|showcase|feature|testimonial|pricing|cta|card|grid|rail|drawer|panel|timeline|roadmap|carousel|table|summary|matrix|list|step|selector|gallery|banner|proof|mockup|wall|marquee|comparison|recommendation/i;

const VARIANT_PATTERN =
  /primary|secondary|tertiary|ghost|outline|danger|destructive|loading|submit|save|download|upload|copy|edit|delete|close|more|back|favorite|like|follow|subscribe|expand|collapse|dropdown|split|action|icon|floating|small|large|compact|dense|responsive|mobile|desktop|sticky|transparent|centered|full.?width|animated|static|dark|light|monochrome|vertical|horizontal|inline|async|searchable|editable|sortable|selectable|nested|grouped|filtered|server.?side|column|row/i;

const UTILITY_PATTERN =
  /accessible|visually.?hidden|portal|slot|provider|focus|scroll.?lock|transition|motion|animate presence|theme icon|^icon$|absolute center|bleed|^box$|^center$|^flex$|^grid$|^group$|simple grid|^spacer$|^wrap$|^sticky$|^affix$|^main$|^header$|^footer$|^description$|^text$|^code$|^highlight$|^indicator$/i;

function readJson(repoRoot, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function normalizeExactText(value) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fold punctuation that is explicitly called out by the owner normalization
 * rules, while retaining word boundaries so Listbox/List Box and Dropzone/
 * Drop Zone remain searchable alias evidence rather than disappearing.
 */
export function normalizeCorpusKey(value) {
  return normalizeExactText(value)
    .replace(/[‐‑‒–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchKey(value) {
  return normalizeCorpusKey(value).replace(/[^a-z0-9]/g, "");
}

function relativeSourcePath(file) {
  return `owner-corpus/${file}`;
}

function parseSourceFile(corpusRoot, file) {
  const absolutePath = path.join(corpusRoot, file);
  if (!fs.existsSync(absolutePath))
    throw new Error(
      `Missing owner corpus source ${absolutePath}. Set T7_COMPONENT_CORPUS_ROOT to the corpus directory.`,
    );
  const text = fs.readFileSync(absolutePath, "utf8");
  const lines = text.split(/\r?\n/);
  const entries = [];
  for (const [index, line] of lines.entries()) {
    const match = line.match(/^\s*-\s+(.+?)\s*$/);
    if (!match) continue;
    entries.push({
      name: match[1],
      sourceFile: relativeSourcePath(file),
      sourceLine: index + 1,
    });
  }
  return {
    file: relativeSourcePath(file),
    absolutePath,
    bytes: Buffer.byteLength(text),
    sha256: crypto.createHash("sha256").update(text).digest("hex"),
    rawEntries: entries.length,
    entries,
  };
}

function buildCurrentIndex(repoRoot) {
  const catalog = readJson(repoRoot, CURRENT_CATALOG_PATH);
  const byKey = new Map();
  const bySearchKey = new Map();
  const platforms = {};
  const add = (map, key, value) => {
    const values = map.get(key) ?? new Set();
    values.add(value);
    map.set(key, values);
  };
  for (const [name, entry] of Object.entries(catalog)) {
    const platform = resolveComponentPlatformContract(name, entry);
    platforms[name] = platform;
    for (const label of [name, entry.displayName].filter(Boolean)) {
      add(byKey, normalizeCorpusKey(label), name);
      add(bySearchKey, searchKey(label), name);
    }
  }
  return { catalog, byKey, bySearchKey, platforms };
}

function resolveCurrent(name, current) {
  const exact = current.byKey.get(normalizeCorpusKey(name));
  const exactNames = exact ? [...exact] : [];
  if (exactNames.length === 1) return exactNames[0];
  const compact = current.bySearchKey.get(searchKey(name));
  const compactNames = compact ? [...compact] : [];
  return compactNames.length === 1 ? compactNames[0] : undefined;
}

function resolveExplicitAlias(name, current) {
  const target = EXPLICIT_ALIASES[searchKey(name)];
  return target && current.catalog[target] ? target : undefined;
}

function nearestCanonical(name, current) {
  const lower = name.toLowerCase();
  for (const rule of NEAREST_CANONICAL_RULES) {
    if (rule.pattern.test(lower) && current.catalog[rule.target])
      return rule.target;
  }
  return undefined;
}

function familyForName(name, currentTarget, current) {
  if (currentTarget) return current.platforms[currentTarget].family;
  const lower = name.toLowerCase();
  if (/button|action|trigger|dial|handle/.test(lower)) return "action";
  if (
    /input|field|select|checkbox|radio|switch|slider|picker|form|otp|tag/.test(
      lower,
    )
  )
    return "form";
  if (/nav|menu|sidebar|breadcrumb|tab|step|tree/.test(lower))
    return "navigation";
  if (/table|grid|pivot|row|column/.test(lower)) return "table";
  if (/list|feed|summary|metric|status|notification|alert|message/.test(lower))
    return "data";
  if (/chart|graph|gauge|spark|trend|heatmap|plot/.test(lower)) return "chart";
  if (/calendar|date|time|schedule|agenda|timeline/.test(lower))
    return "date-time";
  if (/file|upload|attachment|document/.test(lower)) return "file";
  if (/image|media|video|audio|gallery|lightbox/.test(lower)) return "media";
  if (/cart|product|price|order|commerce|checkout|quantity/.test(lower))
    return "commerce";
  if (/card|panel|surface|paper/.test(lower)) return "surface";
  if (/hero|section|shell|layout|container|stack|split|workspace/.test(lower))
    return "layout";
  return "pattern";
}

function platformForCurrent(target, current) {
  if (!target) return { platform: null, nativeStrategy: null };
  const contract = current.platforms[target];
  return {
    platform: contract.platform,
    nativeStrategy: contract.rendererStrategy,
  };
}

function platformForDeferred(name) {
  const lower = name.toLowerCase();
  if (
    /editor|spreadsheet|pivot|diagram|whiteboard|canvas|code|markdown/.test(
      lower,
    )
  )
    return { platform: "WEB", nativeStrategy: "NOT_APPLICABLE" };
  if (
    /map|geo|calendar|scheduler|gantt|grid|table|virtual|chart|media|audio|video/.test(
      lower,
    )
  )
    return { platform: "ADAPTIVE", nativeStrategy: "ALTERNATE_PATTERN" };
  return { platform: null, nativeStrategy: null };
}

function classifyRecord(record, current) {
  const representativeName = record.rawNames[0];
  const currentTarget = resolveCurrent(representativeName, current);
  const currentEntry = currentTarget
    ? current.catalog[currentTarget]
    : undefined;
  if (currentTarget) {
    const resolved = platformForCurrent(currentTarget, current);
    const alias = Boolean(currentEntry.aliasOf);
    return {
      decision: alias ? "ALIAS" : "CANONICAL_COMPONENT",
      classification: alias ? "ALIAS" : "CANONICAL_COMPONENT",
      currentT7Equivalent: currentEntry.aliasOf ?? currentTarget,
      complexity:
        currentEntry.level === "foundation"
          ? "L0"
          : currentEntry.level === "primitive"
            ? "L1"
            : currentEntry.level === "pattern"
              ? "L5"
              : "L2",
      family: current.platforms[currentTarget].family,
      ...resolved,
      implementationStatus: alias
        ? "compatibility-alias"
        : "existing-canonical",
      normalizedIntent: currentEntry.purpose,
      reason: alias
        ? "The source terminology resolves to a compatibility alias; the canonical target owns the public contract."
        : "The source name resolves to an existing implemented Ten4Seven catalog contract; no net-new component is admitted.",
      accessibility: currentEntry.accessibility ?? [],
      tokens: currentEntry.tokens ?? [],
      donorConcepts: [representativeName],
    };
  }

  const conditional = CONDITIONAL_CANDIDATES[searchKey(representativeName)];
  if (conditional) {
    return {
      decision: "DEFERRED",
      classification: "DEFERRED",
      currentT7Equivalent: conditional.currentT7Equivalent,
      complexity: conditional.complexity,
      family: conditional.family,
      platform: conditional.platform,
      nativeStrategy: conditional.nativeStrategy,
      implementationStatus: "conditional-unapproved",
      normalizedIntent: conditional.normalizedIntent,
      reason: conditional.reason,
      accessibility: [
        "accessible-name",
        "keyboard-navigation",
        "focus-or-press-feedback",
      ],
      tokens: ["color", "spacing", "focus", "motion"],
      donorConcepts: [representativeName],
      conditional: true,
    };
  }

  const explicitAlias = resolveExplicitAlias(representativeName, current);
  if (explicitAlias) {
    const resolved = platformForCurrent(explicitAlias, current);
    return {
      decision: "ALIAS",
      classification: "ALIAS",
      currentT7Equivalent: explicitAlias,
      complexity: "L1",
      family: current.platforms[explicitAlias].family,
      ...resolved,
      implementationStatus: "compatibility-alias",
      normalizedIntent: current.catalog[explicitAlias].purpose,
      reason:
        "The source is a spelling or common-term alias explicitly normalized to an existing Ten4Seven contract.",
      accessibility: current.catalog[explicitAlias].accessibility ?? [],
      tokens: current.catalog[explicitAlias].tokens ?? [],
      donorConcepts: [representativeName],
    };
  }

  const lower = representativeName.toLowerCase();
  const family = familyForName(representativeName, undefined, current);
  if (DOMAIN_PATTERN.test(lower)) {
    return {
      decision: "DOMAIN_COMPOSITION",
      classification: "DOMAIN_COMPOSITION",
      currentT7Equivalent:
        nearestCanonical(representativeName, current) ?? null,
      complexity: "L6",
      family,
      platform: null,
      nativeStrategy: null,
      implementationStatus: "consumer-owned",
      normalizedIntent: "domain-shaped product composition",
      reason:
        "Business nouns or product-specific workflow meaning are present; shared Ten4Seven owns presentation contracts, while consumers own data, permissions, persistence, and calculations.",
      accessibility: ["structure-order", "non-color-status"],
      tokens: ["color", "typography", "spacing", "surface"],
      donorConcepts: [representativeName],
    };
  }

  if (ENGINE_PATTERN.test(lower)) {
    const resolved = platformForDeferred(representativeName);
    return {
      decision: "DEFERRED",
      classification: "DEFERRED",
      currentT7Equivalent:
        nearestCanonical(representativeName, current) ?? null,
      complexity: /editor|spreadsheet|pivot|diagram|canvas|whiteboard/.test(
        lower,
      )
        ? "L5"
        : "L4",
      family,
      ...resolved,
      implementationStatus: "not-started",
      normalizedIntent: "dependency-heavy or performance-sensitive interaction",
      reason:
        "The corpus names an engine-scale capability. No U13 package, license, performance, accessibility, or Native adapter boundary is approved, so it remains deferred rather than becoming a shallow wrapper.",
      accessibility: ["accessible-name", "keyboard-navigation", "data-summary"],
      tokens: ["color", "spacing", "focus", "motion", "measure"],
      donorConcepts: [representativeName],
      engineBoundary: "consumer-engine",
    };
  }

  if (
    record.sourceFiles.some((file) => !file.endsWith("01_COMPONENTS_CORE.md"))
  ) {
    const recipe = RECIPE_PATTERN.test(lower) && !BLOCK_PATTERN.test(lower);
    return {
      decision: recipe ? "RECIPE_OR_PATTERN" : "COMPOSITE_BLOCK",
      classification: recipe ? "RECIPE_OR_PATTERN" : "COMPOSITE_BLOCK",
      currentT7Equivalent:
        nearestCanonical(representativeName, current) ?? null,
      complexity: "L5",
      family,
      platform: "ADAPTIVE",
      nativeStrategy: "ALTERNATE_PATTERN",
      implementationStatus: "composition-layer",
      normalizedIntent: recipe
        ? "reusable page or workflow arrangement"
        : "reusable multi-component section",
      reason: recipe
        ? "The source describes a page, workflow, shell, or arrangement; it belongs in recipes/patterns rather than the primitive component layer."
        : "The source describes a multi-component public or application section; it belongs in the block layer rather than a new primitive.",
      accessibility: ["structure-order", "accessible-name", "non-color-status"],
      tokens: ["color", "typography", "spacing", "surface", "measure"],
      donorConcepts: [representativeName],
    };
  }

  if (VARIANT_PATTERN.test(lower)) {
    const target = nearestCanonical(representativeName, current);
    const resolved = platformForCurrent(target, current);
    return {
      decision: "COMPONENT_VARIANT",
      classification: "COMPONENT_VARIANT",
      currentT7Equivalent: target ?? null,
      complexity: "L1",
      family,
      ...resolved,
      implementationStatus: "variant-of-existing",
      normalizedIntent:
        "presentation, action, state, size, density, or responsive variant",
      reason:
        "The source changes presentation or state axes without proving a distinct interaction contract; it should remain a variant or composition choice.",
      accessibility: [
        "accessible-name",
        "focus-or-press-feedback",
        "disabled-state",
      ],
      tokens: ["color", "spacing", "radius", "focus", "motion"],
      donorConcepts: [representativeName],
    };
  }

  if (UTILITY_PATTERN.test(lower)) {
    return {
      decision: "UTILITY_OR_PROVIDER",
      classification: "UTILITY_OR_PROVIDER",
      currentT7Equivalent:
        nearestCanonical(representativeName, current) ?? null,
      complexity: "L0",
      family,
      platform: "BOTH",
      nativeStrategy: "NATIVE_RENDERER",
      implementationStatus: "utility-or-provider",
      normalizedIntent:
        "shared layout, accessibility, icon, or behavior utility",
      reason:
        "The source is a helper/provider/layout primitive rather than a standalone end-user component contract.",
      accessibility: ["structure-order"],
      tokens: ["spacing", "sizing", "focus"],
      donorConcepts: [representativeName],
    };
  }

  return {
    decision: "REJECTED_DUPLICATE",
    classification: "REJECTED_DUPLICATE",
    currentT7Equivalent: nearestCanonical(representativeName, current) ?? null,
    complexity: "L1",
    family,
    platform: null,
    nativeStrategy: null,
    implementationStatus: "not-admitted",
    normalizedIntent: "unproven generic UI name",
    reason:
      "The corpus supplies a name but not a distinct public typed API, interaction model, accessibility contract, responsive behavior, and multi-surface value required for canonical admission.",
    accessibility: [],
    tokens: [],
    donorConcepts: [representativeName],
  };
}

function readU12Gate(repoRoot) {
  const absolutePath = path.join(repoRoot, U12_EVIDENCE_PATH);
  if (!fs.existsSync(absolutePath)) return "UNVERIFIED";
  const text = fs.readFileSync(absolutePath, "utf8");
  const match = text.match(
    /##\s+29\.\s+Gate\s+\r?\n\s*(PASS FOR U13|FAIL \/ BLOCKED)/,
  );
  return match?.[1] ?? "UNVERIFIED";
}

function sortObject(value) {
  return Object.fromEntries(
    Object.entries(value).sort(([left], [right]) => left.localeCompare(right)),
  );
}

export function buildComponentCorpusLedger(repoRoot, corpusRoot) {
  const current = buildCurrentIndex(repoRoot);
  const sourceFiles = COMPONENT_CORPUS_SOURCE_FILES.map((file) =>
    parseSourceFile(corpusRoot, file),
  );
  const rawEntries = sourceFiles.flatMap((source) => source.entries);
  const exactGroups = new Map();
  for (const entry of rawEntries) {
    const key = normalizeExactText(entry.name);
    const group = exactGroups.get(key) ?? {
      rawNames: new Set(),
      sourceFiles: new Set(),
      sourceLines: [],
    };
    group.rawNames.add(entry.name);
    group.sourceFiles.add(entry.sourceFile);
    group.sourceLines.push(`${entry.sourceFile}:${entry.sourceLine}`);
    exactGroups.set(key, group);
  }

  const normalizedGroups = new Map();
  for (const group of exactGroups.values()) {
    const representative = [...group.rawNames][0];
    const key = normalizeCorpusKey(representative);
    const currentGroup = normalizedGroups.get(key) ?? {
      rawNames: new Set(),
      sourceFiles: new Set(),
      sourceLines: [],
    };
    for (const name of group.rawNames) currentGroup.rawNames.add(name);
    for (const file of group.sourceFiles) currentGroup.sourceFiles.add(file);
    currentGroup.sourceLines.push(...group.sourceLines);
    normalizedGroups.set(key, currentGroup);
  }

  const candidateLedger = [...normalizedGroups.entries()]
    .map(([normalizedKey, group]) => {
      const record = {
        normalizedKey,
        rawNames: [...group.rawNames].sort((left, right) =>
          left.localeCompare(right),
        ),
        sourceFiles: [...group.sourceFiles].sort(),
        sourceLines: [...new Set(group.sourceLines)].sort(),
      };
      const classification = classifyRecord(record, current);
      return {
        candidate: record.rawNames[0],
        ...record,
        ...classification,
        donorSourceNames: record.rawNames,
      };
    })
    .sort((left, right) =>
      left.normalizedKey.localeCompare(right.normalizedKey),
    );

  const dispositionCounts = candidateLedger.reduce((counts, candidate) => {
    counts[candidate.decision] = (counts[candidate.decision] ?? 0) + 1;
    return counts;
  }, {});
  const conditionalCandidates = candidateLedger.filter(
    (candidate) => candidate.conditional,
  );
  const currentCanonical = Object.entries(current.catalog).filter(
    ([, entry]) => !entry.aliasOf,
  );
  const currentAliases = Object.entries(current.catalog).filter(([, entry]) =>
    Boolean(entry.aliasOf),
  );
  const canonicalPlatformCounts = currentCanonical.reduce((counts, [name]) => {
    const platform = current.platforms[name].platform;
    counts[platform] = (counts[platform] ?? 0) + 1;
    return counts;
  }, {});
  const catalogPlatformCounts = Object.keys(current.catalog).reduce(
    (counts, name) => {
      const platform = current.platforms[name].platform;
      counts[platform] = (counts[platform] ?? 0) + 1;
      return counts;
    },
    {},
  );
  const existingEngineBoundaries = Object.entries(current.platforms)
    .filter(
      ([, contract]) =>
        contract.engineBoundary !== "none" &&
        contract.engineBoundary !== "renderer-implementation",
    )
    .map(([name, contract]) => ({
      component: name,
      engineBoundary: contract.engineBoundary,
      platform: contract.platform,
    }))
    .sort((left, right) => left.component.localeCompare(right.component));

  const normalizedDuplicateGroups = candidateLedger
    .filter((candidate) => candidate.rawNames.length > 1)
    .map((candidate) => ({
      normalizedKey: candidate.normalizedKey,
      rawNames: candidate.rawNames,
      sourceFiles: candidate.sourceFiles,
    }));

  const legitimateGaps = candidateLedger.filter(
    (candidate) =>
      candidate.decision === "CANONICAL_COMPONENT" &&
      candidate.implementationStatus === "new",
  );
  const targetStatus =
    legitimateGaps.length >= 100
      ? "TARGET MET"
      : "TARGET NOT JUSTIFIABLE FROM CORPUS";
  const u12Gate = readU12Gate(repoRoot);

  return {
    schemaVersion: "0.1",
    id: "component-corpus-ledger",
    purpose:
      "Generated U13-A normalization view. It is an analysis projection from the owner corpus and current Ten4Seven registry, not a component decision manifest.",
    sourceOfTruth: {
      typedContracts: "packages/contracts/src",
      componentRegistry: CURRENT_CATALOG_PATH,
      blockRegistry: BLOCK_CATALOG_PATH,
      recipeRegistry: RECIPE_CATALOG_PATH,
      generator: "scripts/component-corpus-ledger.mjs",
      generatedCopies: [
        "generated/component-corpus-ledger.json",
        "packages/agent/generated/component-corpus-ledger.json",
      ],
    },
    corpusSources: sourceFiles.map((source) => ({
      file: source.file,
      bytes: source.bytes,
      sha256: source.sha256,
      rawEntries: source.rawEntries,
    })),
    donorPolicy: {
      sourceConcepts: [
        "Radix UI",
        "shadcn/ui",
        "Material UI / MUI X",
        "Ant Design",
        "HeroUI",
        "Flowbite / Blocks",
        "Tailwind Plus",
        "Tremor-style analytics",
      ],
      adoptedAs: "coverage evidence and interaction vocabulary only",
      intentionallyNotCopied: [
        "donor CSS",
        "donor theme or brand",
        "donor colors, radius, spacing, typography, or elevation",
        "donor public API without Ten4Seven normalization",
        "donor runtime dependency in consumer features",
      ],
    },
    normalization: {
      rawEntryPattern:
        "Markdown unordered list item in the four owner source lists",
      exactFold: "NFKC, lowercase, repeated whitespace folding",
      normalizedFold:
        "exact fold plus dash punctuation folding while retaining word boundaries",
      canonicalAdmission: [
        "distinct reusable user intent",
        "distinct interaction semantics",
        "reusable public typed contract",
        "accessibility contract",
        "useful across multiple product or screen contexts",
      ],
      resolutionOrder: [
        "existing catalog canonical or alias",
        "explicit terminology alias",
        "conditional review candidate",
        "domain composition",
        "complex engine deferral",
        "block or recipe separation",
        "component variant",
        "utility or provider",
        "rejected duplicate",
      ],
      classificationVocabulary: DECISIONS,
      platformStrategies: PLATFORM_STRATEGIES,
    },
    counts: {
      rawCandidates: rawEntries.length,
      exactUniqueCandidates: exactGroups.size,
      normalizedCandidates: normalizedGroups.size,
      historicalQ03NormalizedCandidates: 2073,
      normalizedDeltaFromHistoricalQ03: normalizedGroups.size - 2073,
      normalizedDuplicateGroups: normalizedDuplicateGroups.length,
      currentCatalogEntries: Object.keys(current.catalog).length,
      canonicalBeforeU13: currentCanonical.length,
      aliases: currentAliases.length,
      blocks: Object.keys(readJson(repoRoot, BLOCK_CATALOG_PATH)).length,
      recipes: Object.keys(readJson(repoRoot, RECIPE_CATALOG_PATH)).length,
      netNewCanonicalImplemented: 0,
      hardenedExisting: 0,
      legitimateGapCount: legitimateGaps.length,
      conditionalGapCount: conditionalCandidates.length,
      dispositionCounts: sortObject(dispositionCounts),
      canonicalAfterU13: currentCanonical.length,
      platformCounts: {
        canonical: sortObject(canonicalPlatformCounts),
        catalogIncludingAliases: sortObject(catalogPlatformCounts),
      },
      existingEngineBoundaries: existingEngineBoundaries.length,
    },
    assessment: {
      u13A: targetStatus,
      hardTarget: ">=100 legitimate net-new canonical components",
      targetException:
        "When fewer than 100 candidates satisfy the admission test, stop rather than manufacture primitives.",
      legitimateGaps: legitimateGaps.map((candidate) => candidate.candidate),
      conditionalCandidates: conditionalCandidates.map((candidate) => ({
        candidate: candidate.candidate,
        currentT7Equivalent: candidate.currentT7Equivalent,
        reason: candidate.reason,
      })),
      u12PrerequisiteGate: u12Gate,
      u13Gate: u12Gate === "PASS FOR U13" ? "PASS FOR U14" : "FAIL / BLOCKED",
      stopReason:
        u12Gate === "PASS FOR U13"
          ? `${targetStatus}; no U13-B through U13-H implementation batches were started.`
          : `U12 prerequisite is ${u12Gate}; U13-B through U13-H cannot start. ${targetStatus}.`,
    },
    normalizedDuplicateGroups,
    existingEngineBoundaries,
    candidateLedger,
  };
}

export function defaultCorpusRoot() {
  return (
    process.env.T7_COMPONENT_CORPUS_ROOT ??
    path.join(os.homedir(), "Downloads", "CORPUS")
  );
}

export function writeComponentCorpusLedger(repoRoot, corpusRoot) {
  const ledger = buildComponentCorpusLedger(repoRoot, corpusRoot);
  const serialized = `${JSON.stringify(ledger, null, 2)}\n`;
  const outputPaths = [
    "generated/component-corpus-ledger.json",
    "packages/agent/generated/component-corpus-ledger.json",
  ];
  for (const relativePath of outputPaths) {
    const target = path.join(repoRoot, relativePath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, serialized);
  }
  return { ledger, outputPaths };
}

const repoRoot = path.resolve(import.meta.dirname, "..");
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const { ledger, outputPaths } = writeComponentCorpusLedger(
    repoRoot,
    defaultCorpusRoot(),
  );
  console.log(
    `Generated ${outputPaths.length} component corpus ledgers: ${ledger.counts.normalizedCandidates} normalized candidates, ${ledger.counts.legitimateGapCount} legitimate gaps, U13-A ${ledger.assessment.u13A}.`,
  );
}

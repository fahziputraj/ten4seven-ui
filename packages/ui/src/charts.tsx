import {
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { T7Icon } from "@ten4seven/icons";
import { chartGeometry } from "@ten4seven/tokens";

import {
  observeT7InView,
  t7AnimateChart,
  type T7ChartMotionKind,
} from "./motion";
import {
  FloatingPortal,
  type FloatingPositionResult,
  useFloatingPosition,
} from "./overlay";
import { cx } from "./utils";

export interface TrendIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Direction controls the glyph only. Use `sentiment` when an increase or
   * decrease does not map to the usual good/bad meaning (for example, a lower
   * bounce rate is positive).
   */
  direction: "down" | "flat" | "up";
  /** Optional comparison window or other compact qualifier. */
  context?: ReactNode;
  label?: string;
  sentiment?: "negative" | "neutral" | "positive" | "warning";
  value: ReactNode;
  variant?: "plain" | "soft";
}

export function TrendIndicator({
  className,
  context,
  direction,
  label,
  sentiment,
  value,
  variant = "plain",
  ...props
}: TrendIndicatorProps) {
  const resolvedSentiment =
    sentiment ??
    (direction === "up"
      ? "positive"
      : direction === "down"
        ? "negative"
        : "neutral");
  const icon =
    direction === "up"
      ? "trendUp"
      : direction === "down"
        ? "trendDown"
        : undefined;
  return (
    <span
      {...props}
      aria-label={label}
      className={cx("t7-trend-indicator", className)}
      data-direction={direction}
      data-sentiment={resolvedSentiment}
      data-variant={variant}
    >
      {!label ? (
        <span className="t7-visually-hidden">
          {direction === "up"
            ? "Increased: "
            : direction === "down"
              ? "Decreased: "
              : "Unchanged: "}
        </span>
      ) : null}
      {icon ? (
        <T7Icon aria-hidden="true" name={icon} size={15} />
      ) : (
        <span aria-hidden="true" className="t7-trend-flat" />
      )}
      <span className="t7-trend-value">{value}</span>
      {context ? <span className="t7-trend-context">{context}</span> : null}
    </span>
  );
}

function valueRange(values: number[]) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length === 0) return { max: 1, min: 0 };
  const minimum = Math.min(...finiteValues);
  const maximum = Math.max(...finiteValues);
  const padding =
    maximum === minimum
      ? Math.max(Math.abs(maximum) * 0.05, 1)
      : (maximum - minimum) * 0.1;
  return { max: maximum + padding, min: minimum - padding };
}

function formatChartValue(value: number) {
  if (!Number.isFinite(value)) return "0";
  return String(Number(value.toFixed(4)));
}

function niceStep(range: number, targetIntervals: number) {
  const rawStep = Math.max(range / Math.max(targetIntervals, 1), 1e-6);
  const exponent = Math.floor(Math.log10(rawStep));
  const magnitude = 10 ** exponent;
  const fraction = rawStep / magnitude;
  const niceFraction =
    fraction <= 1
      ? 1
      : fraction <= 2
        ? 2
        : fraction <= 2.5
          ? 2.5
          : fraction <= 5
            ? 5
            : 10;
  return niceFraction * magnitude;
}

function chartScale(values: number[], targetTicks = 5) {
  const finiteValues = values.filter(Number.isFinite);
  const minimum = Math.min(...(finiteValues.length ? finiteValues : [0]), 0);
  const maximum = Math.max(...(finiteValues.length ? finiteValues : [0]), 0);
  const step = niceStep(Math.max(maximum - minimum, 1), targetTicks - 1);
  const min = minimum >= 0 ? 0 : Math.floor(minimum / step) * step;
  const max = maximum <= 0 ? 0 : Math.ceil(maximum / step) * step;
  const safeMax = max === min ? min + step : max;
  const intervalCount = Math.max(1, Math.round((safeMax - min) / step));
  const ticks = Array.from({ length: intervalCount + 1 }, (_, index) =>
    Number((min + index * step).toFixed(4)),
  );
  return { max: safeMax, min, ticks };
}

interface ChartPoint {
  x: number;
  y: number;
}

function pointFromClient(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): ChartPoint | null {
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;

  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const projected = point.matrixTransform(matrix.inverse());
  return { x: projected.x, y: projected.y };
}

function pointAnchorInParent(
  svg: SVGSVGElement,
  point: ChartPoint,
): ChartPoint | null {
  const matrix = svg.getScreenCTM();
  const parent = svg.parentElement;
  if (!matrix || !parent) return null;

  const svgPoint = svg.createSVGPoint();
  svgPoint.x = point.x;
  svgPoint.y = point.y;
  const projected = svgPoint.matrixTransform(matrix);
  const parentBounds = parent.getBoundingClientRect();
  return {
    x: projected.x - parentBounds.left,
    y: projected.y - parentBounds.top,
  };
}

function pointAnchorInSvgViewport(
  svg: SVGSVGElement,
  point: ChartPoint,
): ChartPoint | null {
  const viewBox = svg.viewBox.baseVal;
  if (!viewBox.width || !viewBox.height) return null;

  return {
    x: ((point.x - viewBox.x) / viewBox.width) * svg.clientWidth,
    y: ((point.y - viewBox.y) / viewBox.height) * svg.clientHeight,
  };
}

function pointsFor(
  values: number[],
  width: number,
  height: number,
  paddingX = 3,
  paddingY = paddingX,
) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length === 0) return [];
  const { min, max } = valueRange(finiteValues);
  return finiteValues.map((value, index) => {
    const x =
      paddingX +
      (index / Math.max(finiteValues.length - 1, 1)) * (width - paddingX * 2);
    const y =
      height -
      paddingY -
      ((value - min) / Math.max(max - min, 1)) * (height - paddingY * 2);
    return { x, y };
  });
}

function smoothPathFor(points: ChartPoint[]) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const midpoint = (previous.x + point.x) / 2;
    return `${path} C ${midpoint} ${previous.y}, ${midpoint} ${point.y}, ${point.x} ${point.y}`;
  }, "");
}

function areaPathFor(points: ChartPoint[], baseline: number) {
  if (points.length === 0) return "";
  const line = smoothPathFor(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
}

interface ChartVisibility<T extends HTMLElement | SVGSVGElement> {
  ref: RefObject<T | null>;
  visible: boolean;
}

function useChartVisibility<T extends HTMLElement | SVGSVGElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return observeT7InView(element, () => setVisible(true), {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.15,
    });
  }, []);

  return { ref, visible };
}

function useChartMotion<T extends HTMLElement | SVGSVGElement>(
  chartVisibility: ChartVisibility<T>,
  kind: T7ChartMotionKind,
) {
  const { ref, visible } = chartVisibility;

  useEffect(() => {
    if (!visible) return;
    const element = ref.current;
    if (!element) return;
    const motion = t7AnimateChart(element, kind);
    return () => motion.revert();
  }, [kind, ref, visible]);
}

type ChartColorway = 1 | 2 | 3 | 4 | 5;
type SparklineTone =
  "chart" | "current" | "danger" | "info" | "success" | "warning";

function chartColorwayFor(index: number): ChartColorway {
  return ((index % 5) + 1) as ChartColorway;
}

function sparklineSwatchStyle(
  colorway: ChartColorway | undefined,
  tone: SparklineTone,
): CSSProperties {
  if (colorway) {
    return { background: `hsl(var(--t7-chart-${colorway}-hsl))` };
  }
  if (tone === "current") return { background: "currentColor" };
  if (tone === "chart") {
    return { background: "hsl(var(--t7-chart-1-hsl))" };
  }
  return { background: `hsl(var(--t7-${tone}-hsl))` };
}

interface ChartTooltipProps {
  className?: string;
  colorway?: ChartColorway;
  contentRef?: (node: HTMLDivElement | null) => void;
  context?: ReactNode;
  id?: string;
  label: ReactNode;
  placement?: FloatingPositionResult["placement"];
  style?: CSSProperties;
  swatchStyle?: CSSProperties;
  value: ReactNode;
}

interface ChartTooltipAnchorProps {
  anchorRef: RefObject<HTMLSpanElement | null>;
  style?: CSSProperties;
}

function ChartTooltipAnchor({
  anchorRef,
  style,
}: ChartTooltipAnchorProps) {
  return (
    <span
      aria-hidden="true"
      className="t7-chart-tooltip-anchor"
      ref={anchorRef}
      style={style}
    />
  );
}

function useChartTooltipPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  positionKey?: number | string | null,
) {
  return useFloatingPosition(anchorRef, open, {
    align: "center",
    offset: Number.parseFloat(chartGeometry.tooltipOffsetY),
    positionKey,
    side: "top",
    widthStrategy: "content",
  });
}

function ChartTooltip({
  className,
  colorway,
  contentRef,
  context,
  id,
  label,
  placement,
  style,
  swatchStyle,
  value,
}: ChartTooltipProps) {
  return (
    <div
      aria-live="polite"
      className={cx("t7-chart-tooltip", "t7-floating-content", className)}
      data-floating-placement={placement}
      data-side={placement}
      id={id}
      ref={contentRef}
      role="tooltip"
      style={style}
    >
      <div className="t7-chart-tooltip-legend">
        <span
          aria-hidden="true"
          className="t7-chart-tooltip-swatch"
          style={{
            background: colorway
              ? `hsl(var(--t7-chart-${colorway}-hsl))`
              : undefined,
            ...swatchStyle,
          }}
        />
        <span className="t7-chart-tooltip-variable">{label}</span>
      </div>
      {context ? (
        <span className="t7-chart-tooltip-context">{context}</span>
      ) : null}
      <div className="t7-chart-tooltip-value">
        <span>Value</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

interface FloatingChartTooltipProps extends ChartTooltipProps {
  anchorRef: RefObject<HTMLSpanElement | null>;
  floating: FloatingPositionResult;
}

function FloatingChartTooltip({
  anchorRef,
  floating,
  style,
  ...props
}: FloatingChartTooltipProps) {
  return (
    <FloatingPortal anchorRef={anchorRef}>
      <ChartTooltip
        {...props}
        contentRef={floating.setContentRef}
        placement={floating.placement}
        style={{ ...floating.style, ...style }}
      />
    </FloatingPortal>
  );
}

export interface SparklineProps extends Omit<
  HTMLAttributes<SVGSVGElement>,
  "children"
> {
  /** Select one series hue from the active Theme Studio chart family. */
  colorway?: ChartColorway;
  label: string;
  /** Semantic colour, or `current` to inherit from an emphasized surface. */
  tone?: SparklineTone;
  /** Formats the value shown when a point is inspected. */
  valueFormatter?: (value: number) => string;
  values: number[];
}

/** A compact SVG signal. The parent component must supply the business context. */
export function Sparkline({
  className,
  colorway,
  label,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseLeave,
  onMouseMove,
  tone = "chart",
  valueFormatter = formatChartValue,
  values,
  ...props
}: SparklineProps) {
  const width = 96;
  const height = 28;
  const gradientId = useId().replace(/:/g, "");
  const revealId = `${gradientId}-sparkline-reveal`;
  const tooltipId = `${gradientId}-sparkline-tooltip`;
  const pointValues = values.filter(Number.isFinite);
  const points = pointsFor(values, width, height, 4);
  const lastPoint = points[points.length - 1];
  const lastValue = pointValues[pointValues.length - 1];
  const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);
  const tooltipAnchorRef = useRef<HTMLSpanElement | null>(null);
  const chartVisibility = useChartVisibility<SVGSVGElement>();
  useChartMotion(chartVisibility, "sparkline");

  const inspectPoint = (index: number) => {
    if (
      !points[index] ||
      typeof pointValues[index] !== "number" ||
      !Number.isFinite(pointValues[index])
    ) {
      return;
    }
    setInspectedIndex((current) => (current === index ? current : index));
  };
  const inspected =
    inspectedIndex !== null &&
    points[inspectedIndex] &&
    typeof pointValues[inspectedIndex] === "number"
      ? {
          index: inspectedIndex,
          point: points[inspectedIndex],
          value: pointValues[inspectedIndex],
        }
      : null;
  const tooltipPosition = useChartTooltipPosition(
    tooltipAnchorRef,
    inspected !== null,
    inspected?.index,
  );
  const markerPoint = inspected?.point ?? lastPoint;
  const markerValue = inspected?.value ?? lastValue;
  const markerLabel =
    inspected && inspected.index !== points.length - 1
      ? `Point ${inspected.index + 1}`
      : "Latest";
  const accessibleLabel =
    typeof markerValue === "number" && Number.isFinite(markerValue)
      ? `${label}. ${markerLabel} value: ${valueFormatter(markerValue)}. Use left and right arrow keys to inspect values.`
      : label;
  const inspectNearestPoint = (event: ReactMouseEvent<SVGSVGElement>) => {
    const pointer = pointFromClient(
      event.currentTarget,
      event.clientX,
      event.clientY,
    );
    if (!pointer || points.length === 0) return;

    const nearestIndex = points.reduce(
      (closest, point, index) =>
        Math.abs(point.x - pointer.x) < Math.abs(points[closest].x - pointer.x)
          ? index
          : closest,
      0,
    );
    inspectPoint(nearestIndex);
  };
  const inspectWithKeyboard = (event: ReactKeyboardEvent<SVGSVGElement>) => {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      points.length === 0 ||
      !["ArrowLeft", "ArrowRight", "End", "Home"].includes(event.key)
    ) {
      return;
    }

    event.preventDefault();
    const currentIndex = inspected?.index ?? points.length - 1;
    const nextIndex =
      event.key === "ArrowLeft"
        ? Math.max(0, currentIndex - 1)
        : event.key === "ArrowRight"
          ? Math.min(points.length - 1, currentIndex + 1)
          : event.key === "Home"
            ? 0
            : points.length - 1;
    inspectPoint(nextIndex);
  };

  const hasInspectableValue =
    typeof lastValue === "number" && Number.isFinite(lastValue) ? true : false;

  return (
    <div
      className="t7-sparkline-wrap"
    >
      <svg
        {...props}
        aria-describedby={inspected ? tooltipId : undefined}
        aria-label={accessibleLabel}
        className={cx("t7-sparkline", className)}
        data-colorway={colorway}
        data-chart-visible={chartVisibility.visible ? "true" : "false"}
        data-tone={tone}
        onBlur={(event) => {
          onBlur?.(event);
          setInspectedIndex(null);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          inspectPoint(points.length - 1);
        }}
        onKeyDown={inspectWithKeyboard}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          setInspectedIndex(null);
        }}
        onMouseMove={(event) => {
          onMouseMove?.(event);
          if (!event.defaultPrevented) inspectNearestPoint(event);
        }}
        preserveAspectRatio="none"
        role="img"
        ref={chartVisibility.ref}
        tabIndex={hasInspectableValue ? 0 : -1}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient
            id={`${gradientId}-sparkline-line`}
            x1="0"
            x2="1"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--t7-sparkline-color)"
              stopOpacity="var(--t7-chart-gradient-start-alpha, 0.835)"
            />
            <stop
              offset={chartGeometry.depth.gradientStop}
              stopColor="var(--t7-sparkline-color)"
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor="var(--t7-sparkline-color)"
              stopOpacity="var(--t7-chart-gradient-end-alpha, 0.909)"
            />
          </linearGradient>
          <linearGradient
            id={`${gradientId}-sparkline-fill`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--t7-sparkline-color)"
              stopOpacity="0.24"
            />
            <stop
              offset="100%"
              stopColor="var(--t7-sparkline-color)"
              stopOpacity="0"
            />
          </linearGradient>
          <clipPath id={revealId} clipPathUnits="userSpaceOnUse">
            <rect
              className="t7-sparkline-reveal"
              height={height}
              width={width}
              x="0"
              y="0"
            />
          </clipPath>
        </defs>
        {points.length ? (
          <g clipPath={`url(#${revealId})`}>
            <path
              aria-hidden="true"
              className="t7-sparkline-area"
              d={areaPathFor(points, height - 4)}
              fill={`url(#${gradientId}-sparkline-fill)`}
            />
            <path
              aria-hidden="true"
              className="t7-sparkline-line"
              d={smoothPathFor(points)}
              style={
                {
                  "--t7-sparkline-stroke": `url(#${gradientId}-sparkline-line)`,
                } as CSSProperties
              }
            />
            {/*
              A near-zero line with a round, non-scaling stroke stays circular
              when the responsive SVG stretches horizontally.
            */}
            <line
              aria-hidden="true"
              className="t7-sparkline-point"
              x1={markerPoint.x}
              x2={markerPoint.x + 0.001}
              y1={markerPoint.y}
              y2={markerPoint.y}
            />
          </g>
        ) : null}
      </svg>
      {inspected ? (
        <>
          <ChartTooltipAnchor
            anchorRef={tooltipAnchorRef}
            style={{
              left: `${(inspected.point.x / width) * 100}%`,
              top: `${(inspected.point.y / height) * 100}%`,
            }}
          />
          <FloatingChartTooltip
            anchorRef={tooltipAnchorRef}
            className="t7-sparkline-tooltip"
            context={markerLabel}
            floating={tooltipPosition}
            id={tooltipId}
            label={label}
            swatchStyle={sparklineSwatchStyle(colorway, tone)}
            value={valueFormatter(inspected.value)}
          />
        </>
      ) : null}
    </div>
  );
}

export interface ChartSeries {
  id: string;
  label: string;
  values: number[];
}

export interface LineChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  ariaLabel?: string;
  height?: number;
  labels: string[];
  series: ChartSeries[];
  summary?: ReactNode;
  title?: ReactNode;
  valueFormatter?: (value: number) => string;
}

export function LineChart({
  ariaLabel = "Line chart",
  className,
  height = 220,
  labels,
  series,
  summary,
  title,
  valueFormatter = formatChartValue,
  ...props
}: LineChartProps) {
  const width = 640;
  const horizontalPadding = 34;
  const verticalPadding = 18;
  const gradientId = useId().replace(/:/g, "");
  const allValues = series.flatMap((item) => item.values);
  const { max, min, ticks } = chartScale(allValues.length ? allValues : [0]);
  const scaleY = (value: number) =>
    height -
    verticalPadding -
    ((value - min) / Math.max(max - min, 1)) * (height - verticalPadding * 2);
  const scaleX = (index: number, count: number) =>
    horizontalPadding +
    (index / Math.max(count - 1, 1)) * (width - horizontalPadding - 12);
  const [hovered, setHovered] = useState<{
    anchorX: number;
    anchorY: number;
    colorway: ChartColorway;
    label: string;
    series: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const tooltipAnchorRef = useRef<HTMLSpanElement | null>(null);
  const hoverablePoints = series.flatMap((item, seriesIndex) =>
    item.values
      .map((value, index) => ({
        colorway: chartColorwayFor(seriesIndex),
        label: labels[index] ?? "Point",
        series: item.label,
        value,
        x: scaleX(index, item.values.length),
        y: scaleY(value),
      }))
      .filter((point) => Number.isFinite(point.value)),
  );
  const chartVisibility = useChartVisibility<HTMLDivElement>();
  const tooltipPosition = useChartTooltipPosition(
    tooltipAnchorRef,
    hovered !== null,
    hovered ? `${hovered.anchorX}:${hovered.anchorY}` : null,
  );
  useChartMotion(chartVisibility, "line");
  const inspectPoint = (
    point: (typeof hoverablePoints)[number],
    svg: SVGSVGElement,
  ) => {
    const anchor = pointAnchorInParent(svg, point);
    if (!anchor) return;
    setHovered({ ...point, anchorX: anchor.x, anchorY: anchor.y });
  };
  const inspectNearestPoint = (event: ReactMouseEvent<SVGSVGElement>) => {
    const pointer = pointFromClient(
      event.currentTarget,
      event.clientX,
      event.clientY,
    );
    if (!pointer || hoverablePoints.length === 0) return;

    const nearest = hoverablePoints.reduce((closest, point) =>
      Math.hypot(point.x - pointer.x, point.y - pointer.y) <
      Math.hypot(closest.x - pointer.x, closest.y - pointer.y)
        ? point
        : closest,
    );
    inspectPoint(nearest, event.currentTarget);
  };
  return (
    <div
      {...props}
      className={cx("t7-chart", className)}
      data-chart-visible={chartVisibility.visible ? "true" : "false"}
      ref={chartVisibility.ref}
    >
      {title ? <div className="t7-chart-title">{title}</div> : null}
      {summary ? <p className="t7-chart-summary">{summary}</p> : null}
      <div className="t7-chart-plot" onMouseLeave={() => setHovered(null)}>
        <svg
          aria-label={ariaLabel}
          onMouseMove={inspectNearestPoint}
          role="img"
          style={{ height }}
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            {series.map((_, index) => {
              const seriesNumber = (index % 5) + 1;
              return (
                <g key={index}>
                  <linearGradient
                    id={`${gradientId}-line-${index}`}
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="var(--t7-chart-gradient-start-alpha, 0.835)"
                    />
                    <stop
                      offset={chartGeometry.depth.gradientStop}
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="1"
                    />
                    <stop
                      offset="100%"
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="var(--t7-chart-gradient-end-alpha, 0.909)"
                    />
                  </linearGradient>
                  <linearGradient
                    id={`${gradientId}-area-${index}`}
                    key={`${index}-area`}
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="0.14"
                    />
                    <stop
                      offset="100%"
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="0"
                    />
                  </linearGradient>
                </g>
              );
            })}
          </defs>
          {ticks.map((tick) => {
            const y = scaleY(tick);
            return (
              <g className="t7-chart-gridline" key={tick}>
                <line x1={horizontalPadding} x2={width - 12} y1={y} y2={y} />
                <text x={0} y={y + 4}>
                  {valueFormatter(tick)}
                </text>
              </g>
            );
          })}
          {hovered ? (
            <line
              className="t7-chart-hover-line"
              x1={hovered.x}
              x2={hovered.x}
              y1={verticalPadding}
              y2={height - verticalPadding}
            />
          ) : null}
          {series.map((item, seriesIndex) => {
            const colorway = chartColorwayFor(seriesIndex);
            const points = item.values.map((value, index) => ({
              x: scaleX(index, item.values.length),
              y: scaleY(value),
            }));
            return (
              <g key={item.id}>
                <path
                  aria-hidden="true"
                  className={`t7-chart-area t7-chart-series-${colorway}`}
                  d={areaPathFor(points, height - verticalPadding)}
                  fill={`url(#${gradientId}-area-${seriesIndex})`}
                />
                <path
                  aria-hidden="true"
                  className={`t7-chart-line t7-chart-series-${colorway}`}
                  d={smoothPathFor(points)}
                  fill="none"
                  pathLength={1}
                  style={
                    {
                      "--t7-chart-line-stroke": `url(#${gradientId}-line-${seriesIndex})`,
                    } as CSSProperties
                  }
                />
                {item.values.map((value, index) => {
                  const x = scaleX(index, item.values.length);
                  const y = scaleY(value);
                  const point = {
                    colorway,
                    label: labels[index] ?? "Point",
                    series: item.label,
                    value,
                    x,
                    y,
                  };
                  return (
                    <circle
                      aria-label={`${item.label}, ${labels[index] ?? "point"}: ${valueFormatter(value)}`}
                      className={`t7-chart-point t7-chart-series-${colorway}`}
                      cx={x}
                      cy={y}
                      key={`${item.id}-${index}`}
                      onFocus={(event) => {
                        const svg = event.currentTarget.ownerSVGElement;
                        if (svg) inspectPoint(point, svg);
                      }}
                      onMouseEnter={(event) => {
                        const svg = event.currentTarget.ownerSVGElement;
                        if (svg) inspectPoint(point, svg);
                      }}
                      r={chartGeometry.pointRadius}
                      tabIndex={0}
                    >
                      <title>{`${item.label}, ${labels[index] ?? "Point"}: ${valueFormatter(value)}`}</title>
                    </circle>
                  );
                })}
              </g>
            );
          })}
          {labels.map((label, index) => (
            <text
              className="t7-chart-axis-label"
              key={`${label}-${index}`}
              textAnchor="middle"
              x={scaleX(index, labels.length)}
              y={height - 2}
            >
              {label}
            </text>
          ))}
        </svg>
        {hovered ? (
          <>
            <ChartTooltipAnchor
              anchorRef={tooltipAnchorRef}
              style={{
                left: `${hovered.anchorX}px`,
                top: `${hovered.anchorY}px`,
              }}
            />
            <FloatingChartTooltip
              anchorRef={tooltipAnchorRef}
              colorway={hovered.colorway}
              context={hovered.label}
              floating={tooltipPosition}
              label={hovered.series}
              value={valueFormatter(hovered.value)}
            />
          </>
        ) : null}
      </div>
      <ChartLegend series={series} />
    </div>
  );
}

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  ariaLabel?: string;
  data: BarChartDatum[];
  height?: number;
  summary?: ReactNode;
  title?: ReactNode;
  valueFormatter?: (value: number) => string;
}

export function BarChart({
  ariaLabel = "Bar chart",
  className,
  data,
  height = 220,
  summary,
  title,
  valueFormatter = formatChartValue,
  ...props
}: BarChartProps) {
  const width = 640;
  const left = 44;
  const bottom = 28;
  const top = 14;
  const gradientId = useId().replace(/:/g, "");
  const { max, min, ticks } = chartScale(
    data.length ? data.map((item) => item.value) : [0],
  );
  const scaleY = (value: number) =>
    height -
    bottom -
    ((value - min) / Math.max(max - min, 1)) * (height - top - bottom);
  const baseline = scaleY(0);
  const barWidth = Math.max(
    12,
    (width - left - 14) / Math.max(data.length, 1) - 12,
  );
  const [hovered, setHovered] = useState<{
    anchorX: number;
    anchorY: number;
    colorway: ChartColorway;
    label: string;
    value: number;
  } | null>(null);
  const tooltipAnchorRef = useRef<HTMLSpanElement | null>(null);
  const chartVisibility = useChartVisibility<HTMLDivElement>();
  const tooltipPosition = useChartTooltipPosition(
    tooltipAnchorRef,
    hovered !== null,
    hovered ? `${hovered.anchorX}:${hovered.anchorY}` : null,
  );
  useChartMotion(chartVisibility, "bar");
  return (
    <div
      {...props}
      className={cx("t7-chart", className)}
      data-chart-visible={chartVisibility.visible ? "true" : "false"}
      ref={chartVisibility.ref}
    >
      {title ? <div className="t7-chart-title">{title}</div> : null}
      {summary ? <p className="t7-chart-summary">{summary}</p> : null}
      <div className="t7-chart-plot" onMouseLeave={() => setHovered(null)}>
        <svg
          aria-label={ariaLabel}
          role="img"
          style={{ height }}
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            {data.map((item, index) => {
              const seriesNumber = chartColorwayFor(index);
              return (
                <linearGradient
                  id={`${gradientId}-bar-${index}`}
                  key={item.label}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                    stopOpacity="var(--t7-chart-gradient-start-alpha, 0.835)"
                  />
                  <stop
                    offset={chartGeometry.depth.gradientStop}
                    stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                    stopOpacity="var(--t7-chart-gradient-end-alpha, 0.909)"
                  />
                </linearGradient>
              );
            })}
          </defs>
          {ticks.map((tick) => {
            const y = scaleY(tick);
            return (
              <g className="t7-chart-gridline" key={tick}>
                <line x1={left} x2={width - 12} y1={y} y2={y} />
                <text x={0} y={y + 4}>
                  {valueFormatter(tick)}
                </text>
              </g>
            );
          })}
          <line
            className="t7-chart-baseline"
            x1={left}
            x2={width - 12}
            y1={baseline}
            y2={baseline}
          />
          {data.map((item, index) => {
            const colorway = chartColorwayFor(index);
            const x =
              left +
              index * ((width - left - 14) / Math.max(data.length, 1)) +
              5;
            const valueY = scaleY(item.value);
            const barHeight = Math.max(1, Math.abs(baseline - valueY));
            const y = Math.min(baseline, valueY);
            return (
              <g key={item.label}>
                <rect
                  aria-label={`${item.label}: ${valueFormatter(item.value)}`}
                  className={`t7-chart-bar t7-chart-series-${colorway}`}
                  height={barHeight}
                  onFocus={(event) => {
                    const svg = event.currentTarget.ownerSVGElement;
                    const anchor = svg
                      ? pointAnchorInParent(svg, {
                          x: x + barWidth / 2,
                          y,
                        })
                      : null;
                    if (!anchor) return;
                    setHovered({
                      anchorX: anchor.x,
                      anchorY: anchor.y,
                      colorway,
                      label: item.label,
                      value: item.value,
                    });
                  }}
                  onMouseEnter={(event) => {
                    const svg = event.currentTarget.ownerSVGElement;
                    const anchor = svg
                      ? pointAnchorInParent(svg, {
                          x: x + barWidth / 2,
                          y,
                        })
                      : null;
                    if (!anchor) return;
                    setHovered({
                      anchorX: anchor.x,
                      anchorY: anchor.y,
                      colorway,
                      label: item.label,
                      value: item.value,
                    });
                  }}
                  role="img"
                  rx={chartGeometry.barRadius}
                  style={
                    {
                      "--t7-chart-bar-fill": `url(#${gradientId}-bar-${index})`,
                    } as CSSProperties
                  }
                  tabIndex={0}
                  width={barWidth}
                  x={x}
                  y={y}
                />
                <text
                  className="t7-chart-axis-label"
                  textAnchor="middle"
                  x={x + barWidth / 2}
                  y={height - 8}
                >
                  {item.label}
                </text>
                <title>{`${item.label}: ${valueFormatter(item.value)}`}</title>
              </g>
            );
          })}
        </svg>
        {hovered ? (
          <>
            <ChartTooltipAnchor
              anchorRef={tooltipAnchorRef}
              style={{
                left: `${hovered.anchorX}px`,
                top: `${hovered.anchorY}px`,
              }}
            />
            <FloatingChartTooltip
              anchorRef={tooltipAnchorRef}
              colorway={hovered.colorway}
              context="Category"
              floating={tooltipPosition}
              label={hovered.label}
              value={valueFormatter(hovered.value)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export interface DonutSegment {
  label: string;
  value: number;
}

export interface DonutChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  ariaLabel?: string;
  centerLabel?: ReactNode;
  segments: DonutSegment[];
  summary?: ReactNode;
  title?: ReactNode;
  valueFormatter?: (value: number) => string;
}

export function DonutChart({
  ariaLabel = "Donut chart",
  centerLabel,
  className,
  segments,
  summary,
  title,
  valueFormatter = formatChartValue,
  ...props
}: DonutChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = 36;
  const circumference = Math.PI * radius * 2;
  const gradientId = useId().replace(/:/g, "");
  const tooltipId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState<{
    anchor: ChartPoint;
    colorway: ChartColorway;
    label: string;
    value: number;
  } | null>(null);
  const tooltipAnchorRef = useRef<HTMLSpanElement | null>(null);
  const chartVisibility = useChartVisibility<HTMLDivElement>();
  const tooltipPosition = useChartTooltipPosition(
    tooltipAnchorRef,
    hovered !== null,
    hovered ? `${hovered.anchor.x}:${hovered.anchor.y}` : null,
  );
  useChartMotion(chartVisibility, "donut");
  const inspectSegment = (
    segment: DonutSegment,
    point: ChartPoint,
    svg: SVGSVGElement,
    colorway: ChartColorway,
  ) => {
    const anchor = pointAnchorInParent(svg, point);
    if (!anchor) return;
    setHovered({
      anchor,
      colorway,
      label: segment.label,
      value: segment.value,
    });
  };
  let offset = 0;
  return (
    <div
      {...props}
      className={cx("t7-donut-chart", className)}
      data-chart-visible={chartVisibility.visible ? "true" : "false"}
      ref={chartVisibility.ref}
    >
      {title ? <div className="t7-chart-title">{title}</div> : null}
      {summary ? <p className="t7-chart-summary">{summary}</p> : null}
      <div className="t7-donut-chart-body">
        <div
          className="t7-donut-chart-visual"
          onMouseLeave={() => setHovered(null)}
        >
          <svg aria-label={ariaLabel} role="img" viewBox="0 0 100 100">
            <defs>
              {segments.map((segment, index) => {
                const seriesNumber = chartColorwayFor(index);
                return (
                  <linearGradient
                    id={`${gradientId}-donut-${index}`}
                    key={segment.label}
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="var(--t7-chart-gradient-start-alpha, 0.835)"
                    />
                    <stop
                      offset={chartGeometry.depth.gradientStop}
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="1"
                    />
                    <stop
                      offset="100%"
                      stopColor={`hsl(var(--t7-chart-${seriesNumber}-hsl))`}
                      stopOpacity="var(--t7-chart-gradient-end-alpha, 0.909)"
                    />
                  </linearGradient>
                );
              })}
            </defs>
            <circle
              className="t7-donut-track"
              cx="50"
              cy="50"
              fill="none"
              r={radius}
            />
            {segments.map((segment, index) => {
              const length = total
                ? (segment.value / total) * circumference
                : 0;
              const gap = length > 0 ? 2 : 0;
              const visibleLength = Math.max(length - gap, 0);
              const dashOffset = -(offset + gap / 2);
              const seriesNumber = (index % 5) + 1;
              const centerAngle =
                (offset + gap / 2 + visibleLength / 2) / radius - Math.PI / 2;
              const anchorPoint = {
                x: 50 + radius * Math.cos(centerAngle),
                y: 50 + radius * Math.sin(centerAngle),
              };
              offset += length;
              return (
                <circle
                  aria-describedby={
                    hovered?.label === segment.label ? tooltipId : undefined
                  }
                  aria-label={`${segment.label}: ${valueFormatter(segment.value)}`}
                  className={`t7-donut-segment t7-chart-series-${seriesNumber}`}
                  cx="50"
                  cy="50"
                  fill="none"
                  key={segment.label}
                  onBlur={() => setHovered(null)}
                  onFocus={(event) => {
                    const svg = event.currentTarget.ownerSVGElement;
                    if (svg)
                      inspectSegment(
                        segment,
                        anchorPoint,
                        svg,
                        chartColorwayFor(index),
                      );
                  }}
                  onMouseEnter={(event) => {
                    const svg = event.currentTarget.ownerSVGElement;
                    if (svg)
                      inspectSegment(
                        segment,
                        anchorPoint,
                        svg,
                        chartColorwayFor(index),
                      );
                  }}
                  r={radius}
                  role="img"
                  strokeDasharray={`${visibleLength} ${circumference - visibleLength}`}
                  strokeDashoffset={dashOffset}
                  style={
                    {
                      "--t7-donut-segment-stroke": `url(#${gradientId}-donut-${index})`,
                    } as CSSProperties
                  }
                  tabIndex={visibleLength > 0 ? 0 : -1}
                >
                  <title>{`${segment.label}: ${valueFormatter(segment.value)}`}</title>
                </circle>
              );
            })}
          </svg>
          {centerLabel ? <span>{centerLabel}</span> : null}
          {hovered ? (
            <>
              <ChartTooltipAnchor
                anchorRef={tooltipAnchorRef}
                style={{
                  left: `${hovered.anchor.x}px`,
                  top: `${hovered.anchor.y}px`,
                }}
              />
              <FloatingChartTooltip
                anchorRef={tooltipAnchorRef}
                className="t7-donut-tooltip"
                colorway={hovered.colorway}
                context="State"
                floating={tooltipPosition}
                id={tooltipId}
                label={hovered.label}
                value={valueFormatter(hovered.value)}
              />
            </>
          ) : null}
        </div>
        <ul className="t7-chart-legend">
          {segments.map((segment, index) => (
            <li key={segment.label}>
              <span
                className={`t7-chart-legend-swatch t7-chart-series-${(index % 5) + 1}`}
              />
              <span>{segment.label}</span>
              <strong>{valueFormatter(segment.value)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ChartLegend({ series }: { series: ChartSeries[] }) {
  if (series.length < 2) return null;
  return (
    <ul className="t7-chart-legend">
      {series.map((item, index) => (
        <li key={item.id}>
          <span
            className={`t7-chart-legend-swatch t7-chart-series-${(index % 5) + 1}`}
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

import { type HTMLAttributes, type ReactNode } from "react";
import { useState } from "react";

import { T7Icon } from "@ten4seven/icons";

import { cx } from "./utils";

export interface TrendIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  direction: "down" | "flat" | "up";
  label?: string;
  value: ReactNode;
}

export function TrendIndicator({
  className,
  direction,
  label,
  value,
  ...props
}: TrendIndicatorProps) {
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
    >
      {icon ? (
        <T7Icon aria-hidden="true" name={icon} size={15} />
      ) : (
        <span aria-hidden="true" className="t7-trend-flat" />
      )}
      <span>{value}</span>
    </span>
  );
}

function valueRange(values: number[]) {
  const minimum = Math.min(...values, 0);
  const maximum = Math.max(...values, 0);
  const padding = maximum === minimum ? 1 : (maximum - minimum) * 0.1;
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

function pointsFor(
  values: number[],
  width: number,
  height: number,
  padding = 3,
) {
  if (values.length === 0) return "";
  const { min, max } = valueRange(values);
  return values
    .map((value, index) => {
      const x =
        padding +
        (index / Math.max(values.length - 1, 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((value - min) / Math.max(max - min, 1)) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");
}

export interface SparklineProps extends Omit<
  HTMLAttributes<SVGSVGElement>,
  "children"
> {
  label: string;
  values: number[];
}

/** A compact SVG signal. The parent component must supply the business context. */
export function Sparkline({
  className,
  label,
  values,
  ...props
}: SparklineProps) {
  const width = 96;
  const height = 28;
  return (
    <svg
      {...props}
      aria-label={label}
      className={cx("t7-sparkline", className)}
      role="img"
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline fill="none" points={pointsFor(values, width, height)} />
    </svg>
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
    label: string;
    series: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  return (
    <div {...props} className={cx("t7-chart", className)}>
      {title ? <div className="t7-chart-title">{title}</div> : null}
      {summary ? <p className="t7-chart-summary">{summary}</p> : null}
      <div className="t7-chart-plot" onMouseLeave={() => setHovered(null)}>
        <svg
          aria-label={ariaLabel}
          role="img"
          style={{ height }}
          viewBox={`0 0 ${width} ${height}`}
        >
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
          {series.map((item, seriesIndex) => {
            const points = item.values
              .map(
                (value, index) =>
                  `${scaleX(index, item.values.length)},${scaleY(value)}`,
              )
              .join(" ");
            return (
              <g key={item.id}>
                <polyline
                  className={`t7-chart-line t7-chart-series-${(seriesIndex % 5) + 1}`}
                  fill="none"
                  pathLength={1}
                  points={points}
                />
                {item.values.map((value, index) => {
                  const x = scaleX(index, item.values.length);
                  const y = scaleY(value);
                  return (
                    <circle
                      aria-label={`${item.label}, ${labels[index] ?? "point"}: ${valueFormatter(value)}`}
                      className={`t7-chart-point t7-chart-series-${(seriesIndex % 5) + 1}`}
                      cx={x}
                      cy={y}
                      key={`${item.id}-${index}`}
                      onFocus={() =>
                        setHovered({
                          label: labels[index] ?? "Point",
                          series: item.label,
                          value,
                          x,
                          y,
                        })
                      }
                      onMouseEnter={() =>
                        setHovered({
                          label: labels[index] ?? "Point",
                          series: item.label,
                          value,
                          x,
                          y,
                        })
                      }
                      r="3"
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
          <div
            aria-live="polite"
            className="t7-chart-tooltip"
            style={{
              left: `${Math.min(94, Math.max(6, (hovered.x / width) * 100))}%`,
              top: `${Math.max(8, (hovered.y / height) * 100)}%`,
            }}
          >
            <span>
              {hovered.series} · {hovered.label}
            </span>
            <strong>{valueFormatter(hovered.value)}</strong>
          </div>
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
  const left = 34;
  const bottom = 28;
  const top = 14;
  const max = Math.max(...data.map((item) => item.value), 1);
  const barWidth = Math.max(
    12,
    (width - left - 14) / Math.max(data.length, 1) - 10,
  );
  const [hovered, setHovered] = useState<{
    label: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  return (
    <div {...props} className={cx("t7-chart", className)}>
      {title ? <div className="t7-chart-title">{title}</div> : null}
      {summary ? <p className="t7-chart-summary">{summary}</p> : null}
      <div className="t7-chart-plot" onMouseLeave={() => setHovered(null)}>
        <svg
          aria-label={ariaLabel}
          role="img"
          style={{ height }}
          viewBox={`0 0 ${width} ${height}`}
        >
          <line
            className="t7-chart-baseline"
            x1={left}
            x2={width - 12}
            y1={height - bottom}
            y2={height - bottom}
          />
          {data.map((item, index) => {
            const x =
              left +
              index * ((width - left - 14) / Math.max(data.length, 1)) +
              5;
            const barHeight = (item.value / max) * (height - top - bottom);
            const y = height - bottom - barHeight;
            return (
              <g key={item.label}>
                <rect
                  aria-label={`${item.label}: ${valueFormatter(item.value)}`}
                  className={`t7-chart-bar t7-chart-series-${(index % 5) + 1}`}
                  height={barHeight}
                  onFocus={() =>
                    setHovered({
                      label: item.label,
                      value: item.value,
                      x: x + barWidth / 2,
                      y,
                    })
                  }
                  onMouseEnter={() =>
                    setHovered({
                      label: item.label,
                      value: item.value,
                      x: x + barWidth / 2,
                      y,
                    })
                  }
                  role="img"
                  rx="3"
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
          <div
            aria-live="polite"
            className="t7-chart-tooltip"
            style={{
              left: `${Math.min(94, Math.max(6, (hovered.x / width) * 100))}%`,
              top: `${Math.max(8, (hovered.y / height) * 100)}%`,
            }}
          >
            <span>{hovered.label}</span>
            <strong>{valueFormatter(hovered.value)}</strong>
          </div>
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
  let offset = 0;
  return (
    <div {...props} className={cx("t7-donut-chart", className)}>
      {title ? <div className="t7-chart-title">{title}</div> : null}
      {summary ? <p className="t7-chart-summary">{summary}</p> : null}
      <div className="t7-donut-chart-body">
        <div className="t7-donut-chart-visual">
          <svg aria-label={ariaLabel} role="img" viewBox="0 0 100 100">
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
              const dashOffset = -offset;
              offset += length;
              return (
                <circle
                  className={`t7-chart-series-${(index % 5) + 1}`}
                  cx="50"
                  cy="50"
                  fill="none"
                  key={segment.label}
                  r={radius}
                  style={{
                    strokeDasharray: `${length} ${circumference - length}`,
                    strokeDashoffset: dashOffset,
                  }}
                >
                  <title>{`${segment.label}: ${valueFormatter(segment.value)}`}</title>
                </circle>
              );
            })}
          </svg>
          {centerLabel ? <span>{centerLabel}</span> : null}
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

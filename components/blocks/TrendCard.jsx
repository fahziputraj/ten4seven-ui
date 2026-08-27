import React from "react";
import { MetricCard } from "../data/MetricCard.jsx";
import { Sparkline } from "../charts/Sparkline.jsx";

/** MetricCard recipe for a value, comparison and optional trend series. */
export function TrendCard({ data = [], trendTone = "green", target, visualization, ...rest }) {
  const chart = visualization || (data.length > 1
    ? <Sparkline data={data} tone={trendTone} target={target} />
    : null);
  return <MetricCard visualization={chart} {...rest} />;
}

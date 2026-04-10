"use client";

import { Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";

import { KPISeriesPoint, PhaseMarker } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatShortDate } from "@/lib/date";

const tooltipStyle = {
  background: "white",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  borderRadius: "8px",
  fontSize: "12px"
};

type ChartCardProps = {
  title: string;
  data: KPISeriesPoint[];
  unit: string;
  phaseMarkers?: PhaseMarker[];
  overlayRange?: { start: string; end: string } | null;
  showSecondary?: boolean;
  highlightLabel?: string;
  trendLabel?: string;
};

export const ChartCard = ({
  title,
  data,
  unit,
  phaseMarkers = [],
  overlayRange,
  showSecondary,
  highlightLabel,
  trendLabel
}: ChartCardProps) => {
  const latestValue = data[data.length - 1]?.value;
  return (
    <Card className="h-full border border-border/80 bg-white/80 p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">{title}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              {latestValue !== undefined ? latestValue.toFixed(1) : "--"}
            </span>
            <span className="text-xs text-muted-foreground">{unit}</span>
            {trendLabel && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                {trendLabel}
              </span>
            )}
          </div>
        </div>
        {highlightLabel && (
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
            {highlightLabel}
          </span>
        )}
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: -20, bottom: 8 }}>
            <XAxis
              dataKey="date"
              tickFormatter={(value) => formatShortDate(value)}
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={40}
              unit={unit === "%" ? "%" : undefined}
            />
            <Tooltip formatter={(value: number) => [value.toFixed(2), unit]} contentStyle={tooltipStyle} />
            {overlayRange && (
              <ReferenceArea
                x1={overlayRange.start}
                x2={overlayRange.end}
                fill="rgba(37, 99, 235, 0.08)"
                stroke="rgba(37, 99, 235, 0.2)"
              />
            )}
            {phaseMarkers.map((phase) => (
              <ReferenceLine
                key={phase.date}
                x={phase.date}
                stroke="rgba(59, 130, 246, 0.5)"
                strokeDasharray="4 4"
                label={{ value: phase.name, position: "top", fill: "#2563eb", fontSize: 10 }}
              />
            ))}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            {showSecondary && (
              <Line
                type="monotone"
                dataKey="secondary"
                stroke="#94a3b8"
                strokeWidth={1.5}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

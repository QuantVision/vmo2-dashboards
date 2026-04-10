"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

import { activities } from "@/data/activities";
import { kpiConfigsList, filterSeriesByDate, getKpiSeries } from "@/data/kpis";
import { useNetwork } from "@/context/NetworkContext";
import { KPIId } from "@/lib/types";
import { KPIStatCard } from "@/components/KPIStatCard";
import { ChartCard } from "@/components/ChartCard";
import { ActivityTable } from "@/components/ActivityTable";
import { FilterBar } from "@/components/FilterBar";
import { MiniMapCard } from "@/components/MiniMapCard";
import { SmartInsightWidget } from "@/components/SmartInsightWidget";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function OverviewPage() {
  const {
    selectedActivityId,
    setSelectedActivityId,
    dateRange,
    aggregation,
    overlayEnabled,
    activeInsight
  } = useNetwork();
  const [viewTab, setViewTab] = useState("Activity");

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? activities[0],
    [selectedActivityId]
  );

  const kpiCards = kpiConfigsList.slice(0, 5).map((config) => {
    const series = filterSeriesByDate(getKpiSeries(selectedActivityId, config.id), dateRange);
    const latest = series[series.length - 1]?.value ?? 0;
    const recent = series.slice(-7).reduce((acc, point) => acc + point.value, 0) / 7;
    const previous = series.slice(-14, -7).reduce((acc, point) => acc + point.value, 0) / 7;
    const delta = previous ? ((recent - previous) / previous) * 100 : 0;
    return {
      title: config.name,
      value: config.format(latest),
      delta: Number(delta.toFixed(1)),
      trendLabel: config.trendDirection === "down" ? "down" : "up"
    };
  });

  const overlayRange = (kpiId: KPIId) => {
    if (!overlayEnabled || !activeInsight?.kpis.includes(kpiId)) {
      return null;
    }
    return activeInsight.focusRange;
  };

  const chartData = {
    availability: filterSeriesByDate(getKpiSeries(selectedActivityId, "availability"), dateRange),
    voiceTraffic: filterSeriesByDate(getKpiSeries(selectedActivityId, "voiceTraffic"), dateRange),
    dlThroughput: filterSeriesByDate(getKpiSeries(selectedActivityId, "dlThroughput"), dateRange),
    mobility: filterSeriesByDate(getKpiSeries(selectedActivityId, "mobility"), dateRange)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span>{selectedActivity.region}</span>
          </div>
          <h1 className="text-xl font-semibold">Overview</h1>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Activity:</span>
            <span className="font-semibold text-foreground">{selectedActivity.name}</span>
            <Badge variant="secondary">{selectedActivity.status}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedActivityId} onValueChange={setSelectedActivityId}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select activity" />
            </SelectTrigger>
            <SelectContent>
              {activities.map((activity) => (
                <SelectItem key={activity.id} value={activity.id}>
                  {activity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="outline">Aggregation: {aggregation}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {kpiCards.map((card) => (
          <KPIStatCard key={card.title} {...card} />
        ))}
      </div>

      <FilterBar value={viewTab} onChange={setViewTab} />

      <div className="grid grid-cols-2 gap-6">
        <ChartCard
          title="Availability"
          data={chartData.availability}
          unit="%"
          phaseMarkers={selectedActivity.phases}
          overlayRange={overlayRange("availability")}
          showSecondary
          highlightLabel={aggregation}
          trendLabel="+1.2%"
        />
        <ChartCard
          title="Voice Traffic"
          data={chartData.voiceTraffic}
          unit="Erlang"
          phaseMarkers={selectedActivity.phases}
          overlayRange={overlayRange("voiceTraffic")}
          showSecondary
          highlightLabel={`${aggregation} ${selectedActivity.tac}`}
          trendLabel="-4.6%"
        />
        <ChartCard
          title="DL Cell Throughput"
          data={chartData.dlThroughput}
          unit="Mbps"
          phaseMarkers={selectedActivity.phases}
          overlayRange={overlayRange("dlThroughput")}
          showSecondary
          highlightLabel={`${selectedActivity.tech}`}
          trendLabel="+2.1%"
        />
        <ChartCard
          title="Mobility / NR HO SR"
          data={chartData.mobility}
          unit="%"
          phaseMarkers={selectedActivity.phases}
          overlayRange={overlayRange("mobility")}
          showSecondary
          highlightLabel={selectedActivity.vendor}
          trendLabel="-1.4%"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <ActivityTable
            activities={activities}
            selectedId={selectedActivityId}
            onSelect={setSelectedActivityId}
          />
        </div>
        <div className="col-span-5 space-y-6">
          <MiniMapCard />
          <SmartInsightWidget />
        </div>
      </div>
    </div>
  );
}

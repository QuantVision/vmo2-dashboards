"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { kpiConfigsList, filterSeriesByDate, getKpiSeries } from "@/data/kpis";
import { activities } from "@/data/activities";
import { useNetwork } from "@/context/NetworkContext";
import { ChartCard } from "@/components/ChartCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KPIId } from "@/lib/types";

export default function KPIExplorerPage() {
  const { selectedActivityId, setSelectedActivityId, dateRange, aggregation } = useNetwork();
  const [focusKpi, setFocusKpi] = useState<KPIId>(kpiConfigsList[0].id);

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? activities[0],
    [selectedActivityId]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">KPI Explorer</h1>
          <p className="text-xs text-muted-foreground">Deep dive into KPI clusters, phase markers, and aggregation groups.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedActivityId} onValueChange={setSelectedActivityId}>
            <SelectTrigger className="w-[240px]">
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
          <Select value={focusKpi} onValueChange={(value) => setFocusKpi(value as KPIId)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="KPI group" />
            </SelectTrigger>
            <SelectContent>
              {kpiConfigsList.map((kpi) => (
                <SelectItem key={kpi.id} value={kpi.id}>
                  {kpi.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {kpiConfigsList.map((config) => {
          const data = filterSeriesByDate(getKpiSeries(selectedActivityId, config.id), dateRange);
          return (
            <ChartCard
              key={config.id}
              title={config.name}
              data={data}
              unit={config.unit}
              phaseMarkers={selectedActivity.phases}
              showSecondary
              highlightLabel={aggregation}
              trendLabel={config.id === focusKpi ? "Focus" : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

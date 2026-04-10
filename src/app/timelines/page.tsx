"use client";

import { useMemo } from "react";
import { activities } from "@/data/activities";
import { toDate } from "@/lib/date";
import { TimelineCard } from "@/components/TimelineCard";
import { Badge } from "@/components/ui/badge";

export default function TimelinesPage() {
  const range = useMemo(() => {
    const timestamps = activities.flatMap((activity) => [toDate(activity.start), toDate(activity.end)]);
    const min = new Date(Math.min(...timestamps.map((date) => date.getTime())));
    const max = new Date(Math.max(...timestamps.map((date) => date.getTime())));
    return { min, max };
  }, []);

  const total = range.max.getTime() - range.min.getTime();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Activity Timelines</h1>
          <p className="text-xs text-muted-foreground">Gantt-style rollout view with phase milestones and status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Range: Feb - Apr 2026</Badge>
          <Badge variant="secondary">Phase markers enabled</Badge>
        </div>
      </div>

      <TimelineCard activities={activities.slice(0, 6)} title="Key rollouts" />

      <div className="rounded-xl border bg-white/80 p-4 shadow-soft">
        <div className="grid grid-cols-12 gap-3 text-xs text-muted-foreground">
          <div className="col-span-3 font-semibold">Activity</div>
          <div className="col-span-9 font-semibold">Timeline</div>
        </div>
        <div className="mt-4 space-y-3">
          {activities.map((activity) => {
            const start = toDate(activity.start).getTime();
            const end = toDate(activity.end).getTime();
            const left = ((start - range.min.getTime()) / total) * 100;
            const width = ((end - start) / total) * 100;
            return (
              <div key={activity.id} className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-3">
                  <p className="text-xs font-semibold">{activity.name}</p>
                  <p className="text-[11px] text-muted-foreground">{activity.vendor} - {activity.tech}</p>
                </div>
                <div className="col-span-9">
                  <div className="relative h-3 rounded-full bg-muted/70">
                    <div
                      className="absolute h-3 rounded-full bg-blue-500"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                    {activity.phases.map((phase) => {
                      const phasePosition = ((toDate(phase.date).getTime() - range.min.getTime()) / total) * 100;
                      return (
                        <span
                          key={phase.date}
                          className="absolute top-[-3px] h-5 w-[2px] rounded-full bg-amber-400"
                          style={{ left: `${phasePosition}%` }}
                          title={phase.name}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

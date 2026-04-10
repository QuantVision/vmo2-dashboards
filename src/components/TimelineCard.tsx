"use client";

import { Activity } from "@/lib/types";
import { toDate } from "@/lib/date";

import { Card } from "@/components/ui/card";

const statusColor: Record<Activity["status"], string> = {
  "In Progress": "bg-blue-500",
  Planned: "bg-amber-400",
  Completed: "bg-emerald-500"
};

type TimelineCardProps = {
  activities: Activity[];
  title?: string;
  compact?: boolean;
};

export const TimelineCard = ({ activities, title = "Activity timeline", compact }: TimelineCardProps) => {
  const dates = activities.flatMap((activity) => [toDate(activity.start), toDate(activity.end)]);
  const min = new Date(Math.min(...dates.map((date) => date.getTime())));
  const max = new Date(Math.max(...dates.map((date) => date.getTime())));
  const total = max.getTime() - min.getTime();

  return (
    <Card className="border border-border/80 bg-white/80 p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">{title}</p>
          <p className="text-sm font-semibold">Phase rollout coverage</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-blue-500" /> In Progress
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Planned
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed
        </div>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => {
          const start = toDate(activity.start).getTime();
          const end = toDate(activity.end).getTime();
          const left = ((start - min.getTime()) / total) * 100;
          const width = ((end - start) / total) * 100;
          return (
            <div key={activity.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">{activity.name}</span>
                {!compact && <span className="text-muted-foreground">{activity.start} - {activity.end}</span>}
              </div>
              <div className="relative h-3 rounded-full bg-muted/60">
                <div
                  className={`absolute h-3 rounded-full ${statusColor[activity.status]}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

"use client";

import { Activity } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<Activity["status"], string> = {
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Planned: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200"
};

type ActivityTableProps = {
  activities: Activity[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

export const ActivityTable = ({ activities, selectedId, onSelect }: ActivityTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white/80 shadow-soft">
      <div className="border-b px-4 py-3 text-sm font-semibold">Active activities this month</div>
      <div className="overflow-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/60 text-[11px] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Activity</th>
              <th className="px-2 py-2">Tech</th>
              <th className="px-2 py-2">Vendor</th>
              <th className="px-2 py-2">Start</th>
              <th className="px-2 py-2">End</th>
              <th className="px-2 py-2">Owner</th>
              <th className="px-4 py-2 text-right">Phases</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className={cn(
                  "border-t text-foreground transition hover:bg-muted/40 cursor-pointer",
                  selectedId === activity.id && "bg-blue-50/60"
                )}
                onClick={() => onSelect?.(activity.id)}
              >
                <td className="px-4 py-3">
                  <div className="font-semibold">{activity.name}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{activity.region}</div>
                </td>
                <td className="px-2 py-3">{activity.tech}</td>
                <td className="px-2 py-3">{activity.vendor}</td>
                <td className="px-2 py-3">{activity.start}</td>
                <td className="px-2 py-3">{activity.end}</td>
                <td className="px-2 py-3">{activity.owner}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Badge className={cn("border", statusStyles[activity.status])}>{activity.status}</Badge>
                    <Badge variant="outline">{activity.phases.length} phases</Badge>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SmartInsightWidget = () => {
  const items = [
    { label: "Beamforming sites", value: 312, delta: "+9%" },
    { label: "VoLTE mobility", value: 128, delta: "-3%" },
    { label: "DL throughput", value: 28.6, delta: "+4%" }
  ];

  return (
    <Card className="border border-border/80 bg-white/80 p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Smart activity pulse</p>
          <p className="text-sm font-semibold">Actionable signals</p>
        </div>
        <Badge variant="outline">Auto</Badge>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold">{item.label}</p>
              <p className="text-muted-foreground">Latest observed change</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{item.value}</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600">
                <ArrowUpRight className="h-3 w-3" /> {item.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

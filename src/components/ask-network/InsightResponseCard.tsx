import { ArrowUpRight } from "lucide-react";

import { AskResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const metricStyle = "rounded-lg border border-border/60 bg-white/70 px-3 py-2";

export type InsightResponseCardProps = {
  response: AskResponse;
  onPrimaryAction: (response: AskResponse) => void;
};

export const InsightResponseCard = ({ response, onPrimaryAction }: InsightResponseCardProps) => {
  return (
    <Card className="border border-border/70 bg-white/90 p-4 shadow-soft">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{response.title}</p>
          <p className="mt-2 text-xs text-muted-foreground">{response.summary}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {response.metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className={metricStyle}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{metric.label}</p>
              <p className="text-sm font-semibold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground">What stands out</p>
          <ul className="mt-2 space-y-1 text-xs text-foreground">
            {response.highlights.slice(0, 2).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground">Recommended next step</p>
          <ul className="mt-2 space-y-1 text-xs text-foreground">
            {response.nextSteps.slice(0, 2).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={() => onPrimaryAction(response)} className="w-full">
          <ArrowUpRight className="h-4 w-4" />
          {response.cta.label}
        </Button>
      </div>
    </Card>
  );
};

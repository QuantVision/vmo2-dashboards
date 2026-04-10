"use client";

import dynamic from "next/dynamic";

import { sitePoints } from "@/data/sites";
import { Card } from "@/components/ui/card";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap").then((mod) => mod.LeafletMap), {
  ssr: false
});

export const MiniMapCard = () => {
  return (
    <Card className="border border-border/80 bg-white/80 p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">UK activity map</p>
          <p className="text-sm font-semibold">Active sites & clusters</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">Live</span>
      </div>
      <LeafletMap points={sitePoints.slice(0, 12)} height={220} showLegend={false} />
    </Card>
  );
};

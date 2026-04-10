"use client";

import dynamic from "next/dynamic";
import { MapPin, SlidersHorizontal } from "lucide-react";

import { sitePoints } from "@/data/sites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap").then((mod) => mod.LeafletMap), {
  ssr: false
});

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Activities Map</h1>
          <p className="text-xs text-muted-foreground">UK network footprint with activity hotspots and site density.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
          <Button size="sm">
            <MapPin className="h-4 w-4" /> Focus cluster
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <LeafletMap points={sitePoints} height={520} showLegend />
        </div>
        <div className="col-span-3 space-y-4">
          <Card className="border border-border/80 bg-white/80 p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Activity clusters</p>
              <Badge variant="outline">4G + 5G</Badge>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              {sitePoints.slice(0, 5).map((point) => (
                <div key={point.id} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
                  <div>
                    <p className="font-semibold">{point.name}</p>
                    <p className="text-[11px] text-muted-foreground">{point.region}</p>
                  </div>
                  <Badge variant="secondary">{point.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border border-border/80 bg-white/80 p-4 shadow-soft">
            <p className="text-sm font-semibold">Legend</p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" /> Open
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> In Progress
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-400" /> Closed
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

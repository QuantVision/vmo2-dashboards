"use client";

import { Bookmark } from "lucide-react";

import { useNetwork } from "@/context/NetworkContext";
import { activities } from "@/data/activities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SavedViewsPage() {
  const { savedViews, applySavedView, saveCurrentView } = useNetwork();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Saved Views</h1>
          <p className="text-xs text-muted-foreground">Snapshot your filters, activity scope, and aggregation.</p>
        </div>
        <Button onClick={() => saveCurrentView()}>
          <Bookmark className="h-4 w-4" /> Save current view
        </Button>
      </div>

      {savedViews.length === 0 ? (
        <Card className="border border-border/80 bg-white/80 p-6 text-sm text-muted-foreground shadow-soft">
          No saved views yet. Use "Save current view" from the header or this page to store a snapshot.
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {savedViews.map((view) => {
            const activity = activities.find((item) => item.id === view.activityId);
            return (
              <Card key={view.id} className="border border-border/80 bg-white/80 p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{view.name}</p>
                  <Button size="sm" variant="outline" onClick={() => applySavedView(view)}>
                    Apply
                  </Button>
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p>Activity: <span className="font-semibold text-foreground">{activity?.name}</span></p>
                  <p>Date range: {view.dateRange.start} -> {view.dateRange.end}</p>
                  <p>Aggregation: {view.aggregation}</p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

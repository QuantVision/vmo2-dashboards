"use client";

import { useState } from "react";
import { Calendar, Download, RotateCcw, Save, Layers } from "lucide-react";

import { useNetwork } from "@/context/NetworkContext";
import { aggregations } from "@/data/filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const TopHeader = () => {
  const {
    dateRange,
    setDateRange,
    aggregation,
    setAggregation,
    saveCurrentView,
    savedViews,
    applySavedView,
    resetAll
  } = useNetwork();
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    window.setTimeout(() => setExported(false), 1500);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-6 border-b bg-white/80 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Network Performance Copilot</p>
          <p className="text-xs text-muted-foreground">UK Network Operations - Demo Workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white/70 px-2 py-1 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={dateRange.start}
            onChange={(event) => setDateRange({ ...dateRange, start: event.target.value })}
            className="h-7 border-0 bg-transparent px-1 text-xs"
          />
          <span className="text-xs text-muted-foreground">to</span>
          <Input
            type="date"
            value={dateRange.end}
            onChange={(event) => setDateRange({ ...dateRange, end: event.target.value })}
            className="h-7 border-0 bg-transparent px-1 text-xs"
          />
        </div>

        <Select value={aggregation} onValueChange={setAggregation}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Aggregation" />
          </SelectTrigger>
          <SelectContent>
            {aggregations.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4" />
          {exported ? "Exported" : "Export"}
        </Button>
        <Button variant="ghost" size="sm" onClick={resetAll}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4" />
              Saved Views
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Saved Views</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => saveCurrentView()}>
              Save current view
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {savedViews.length === 0 && (
              <DropdownMenuItem disabled>No saved views yet</DropdownMenuItem>
            )}
            {savedViews.map((view) => (
              <DropdownMenuItem key={view.id} onClick={() => applySavedView(view)}>
                {view.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 rounded-full border bg-white/70 px-2 py-1">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-semibold">
              JD
            </div>
          </div>
          <div className="text-xs">
            <p className="font-semibold">John Doe</p>
            <p className="text-muted-foreground">Core Ops</p>
          </div>
        </div>
      </div>
    </header>
  );
};

"use client";

import { useMemo, useState } from "react";
import { Filter, Plus, UploadCloud } from "lucide-react";

import { activities } from "@/data/activities";
import { technologies, vendors, owners } from "@/data/filters";
import { useNetwork } from "@/context/NetworkContext";
import { ActivityTable } from "@/components/ActivityTable";
import { TimelineCard } from "@/components/TimelineCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ActivitiesPage() {
  const { selectedActivityId, setSelectedActivityId } = useNetwork();
  const [tech, setTech] = useState("All");
  const [vendor, setVendor] = useState("All");
  const [owner, setOwner] = useState("All");

  const filtered = useMemo(() => {
    return activities.filter((activity) => {
      if (tech !== "All" && activity.tech !== tech) return false;
      if (vendor !== "All" && activity.vendor !== vendor) return false;
      if (owner !== "All" && activity.owner !== owner) return false;
      return true;
    });
  }, [tech, vendor, owner]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Network Activity Tracker</h1>
          <p className="text-xs text-muted-foreground">11 activities - 4G: 5 - 5G: 6</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UploadCloud className="h-4 w-4" />
            Export All
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Activity
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-white/80 p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Filter className="h-4 w-4" /> Filters
          </div>
          <Input type="date" className="w-[150px]" />
          <Input type="date" className="w-[150px]" />
          <Select value={tech} onValueChange={setTech}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {technologies.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={vendor} onValueChange={setVendor}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {vendors.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={owner} onValueChange={setOwner}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {owners.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ActivityTable
        activities={filtered}
        selectedId={selectedActivityId}
        onSelect={setSelectedActivityId}
      />

      <TimelineCard activities={filtered} title="Gantt preview" compact />
    </div>
  );
}

"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const defaultTabs = ["Activity", "Operator", "TAC", "Vendor", "Site ID"];

type FilterBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const FilterBar = ({ value, onChange }: FilterBarProps) => {
  return (
    <div className="rounded-xl border bg-white/80 p-3 shadow-soft">
      <Tabs value={value} onValueChange={onChange}>
        <TabsList className="bg-muted/60">
          {defaultTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

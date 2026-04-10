"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KPIStatCardProps = {
  title: string;
  value: string;
  delta: number;
  trendLabel: string;
};

export const KPIStatCard = ({ title, value, delta, trendLabel }: KPIStatCardProps) => {
  const isPositive = delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full border border-border/80 bg-white/80 p-4 shadow-soft">
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold text-muted-foreground">{title}</p>
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}
          >
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        </div>
        <div className="mt-3 text-2xl font-semibold text-foreground">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">Trending {trendLabel}</p>
      </Card>
    </motion.div>
  );
};

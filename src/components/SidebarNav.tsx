"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bookmark,
  LayoutDashboard,
  Map,
  PanelsTopLeft,
  Timer
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Route } from "next";

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Activities", href: "/activities", icon: Activity },
  { label: "KPI Explorer", href: "/kpi-explorer", icon: BarChart3 },
  { label: "Map", href: "/map", icon: Map },
  { label: "Timelines", href: "/timelines", icon: Timer },
  { label: "Saved Views", href: "/saved-views", icon: Bookmark }
];

export const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[88px] flex-col items-center justify-between border-r bg-white/70 py-6 backdrop-blur">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PanelsTopLeft className="h-5 w-5" />
        </div>
        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={cn(
                  "group flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium text-muted-foreground transition-all",
                  active
                    ? "bg-primary text-white shadow-md"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className={cn("text-[10px]", active && "text-white")}>{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-semibold">
            JD
          </div>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">John Doe</span>
      </div>
    </aside>
  );
};

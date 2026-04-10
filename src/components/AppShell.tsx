"use client";

import { ReactNode } from "react";

import { SidebarNav } from "@/components/SidebarNav";
import { TopHeader } from "@/components/TopHeader";
import { AskNetworkPanel } from "@/components/AskNetworkPanel";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full bg-background">
      <div className="flex h-full">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopHeader />
          <div className="flex min-h-0 flex-1">
            <main className="flex-1 overflow-auto px-6 py-6 scrollbar-thin">
              {children}
            </main>
            <aside className="w-[360px] border-l bg-white/80 px-4 py-6 backdrop-blur">
              <AskNetworkPanel />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import { activities, defaultActivity } from "@/data/activities";
import { kpiDateRange } from "@/data/kpis";
import { aggregations } from "@/data/filters";
import { AskResponse, SavedView } from "@/lib/types";

export type DateRange = { start: string; end: string };

type NetworkContextValue = {
  selectedActivityId: string;
  setSelectedActivityId: (id: string) => void;
  selectedActivityName: string;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  aggregation: string;
  setAggregation: (value: string) => void;
  overlayEnabled: boolean;
  setOverlayEnabled: (value: boolean) => void;
  activeInsight: AskResponse | null;
  setActiveInsight: (insight: AskResponse | null) => void;
  question: string;
  setQuestion: (value: string) => void;
  savedViews: SavedView[];
  saveCurrentView: (name?: string) => void;
  applySavedView: (view: SavedView) => void;
  resetAll: () => void;
};

const NetworkContext = createContext<NetworkContextValue | null>(null);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedActivityId, setSelectedActivityId] = useState(defaultActivity.id);
  const [dateRange, setDateRange] = useState<DateRange>(kpiDateRange);
  const [aggregation, setAggregation] = useState(aggregations[0]);
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [activeInsight, setActiveInsight] = useState<AskResponse | null>(null);
  const [question, setQuestion] = useState("");
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);

  const selectedActivityName =
    activities.find((activity) => activity.id === selectedActivityId)?.name ??
    defaultActivity.name;

  const saveCurrentView = (name?: string) => {
    const viewName = name ?? `View ${savedViews.length + 1}`;
    const newView: SavedView = {
      id: `view-${Date.now()}`,
      name: viewName,
      activityId: selectedActivityId,
      dateRange,
      aggregation
    };
    setSavedViews((prev) => [newView, ...prev]);
  };

  const applySavedView = (view: SavedView) => {
    setSelectedActivityId(view.activityId);
    setDateRange(view.dateRange);
    setAggregation(view.aggregation);
  };

  const resetAll = () => {
    setSelectedActivityId(defaultActivity.id);
    setDateRange(kpiDateRange);
    setAggregation(aggregations[0]);
    setOverlayEnabled(false);
    setActiveInsight(null);
    setQuestion("");
  };

  const value = useMemo(
    () => ({
      selectedActivityId,
      setSelectedActivityId,
      selectedActivityName,
      dateRange,
      setDateRange,
      aggregation,
      setAggregation,
      overlayEnabled,
      setOverlayEnabled,
      activeInsight,
      setActiveInsight,
      question,
      setQuestion,
      savedViews,
      saveCurrentView,
      applySavedView,
      resetAll
    }),
    [
      selectedActivityId,
      selectedActivityName,
      dateRange,
      aggregation,
      overlayEnabled,
      activeInsight,
      question,
      savedViews
    ]
  );

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within NetworkProvider");
  }
  return context;
};

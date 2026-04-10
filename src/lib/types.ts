export type PhaseMarker = {
  name: string;
  date: string;
};

export type Activity = {
  id: string;
  name: string;
  tech: string;
  vendor: string;
  type: string;
  owner: string;
  start: string;
  end: string;
  phases: PhaseMarker[];
  status: "In Progress" | "Planned" | "Completed";
  tac: string;
  region: string;
  sitesImpacted: number;
};

export type KPIId =
  | "availability"
  | "voiceTraffic"
  | "mobility"
  | "serviceDr"
  | "dlThroughput"
  | "nrHoSr";

export type KPISeriesPoint = {
  date: string;
  value: number;
  secondary?: number;
};

export type KPIConfig = {
  id: KPIId;
  name: string;
  unit: string;
  format: (value: number) => string;
  baseline: number;
  variance: number;
  trendDirection: "up" | "down";
};

export type AskResponse = {
  id: string;
  title: string;
  summary: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  nextSteps: string[];
  cta: { label: string; action: "overlay" | "tacs" | "compare" };
  focusRange: { start: string; end: string };
  kpis: KPIId[];
};

export type SitePoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: "Open" | "In Progress" | "Closed";
  activityId?: string;
};

export type SavedView = {
  id: string;
  name: string;
  activityId: string;
  dateRange: { start: string; end: string };
  aggregation: string;
};

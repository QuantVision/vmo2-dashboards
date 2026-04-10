import { AskResponse } from "@/lib/types";

export const suggestedQuestions = [
  "Why did Voice Traffic drop after Phase 5?",
  "Show me 4G availability degradation for Nokia sites related to this activity",
  "Compare before and after activity start date",
  "Which TACs were most impacted?",
  "Show impacted sites for the current activity",
  "What changed in Mobility after the last phase?"
];

type ResponseRule = {
  keywords: string[];
  response: AskResponse;
};

const voiceTrafficResponse: AskResponse = {
  id: "voice-phase-5",
  title: "Voice Traffic drop after Phase 5",
  summary:
    "The main drop appears immediately after the Phase 5 marker and is concentrated in the selected TAC scope. The pattern suggests a localized traffic shift rather than a network-wide demand collapse.",
  metrics: [
    { label: "Before", value: "16.4k Erlang" },
    { label: "After", value: "13.1k Erlang" },
    { label: "Delta", value: "-20.1%" }
  ],
  highlights: [
    "Availability softened slightly after the same marker",
    "Redirection to other RAT increased in the same window"
  ],
  nextSteps: ["Compare impacted TACs before and after the phase window"],
  cta: { label: "Overlay on charts", action: "overlay" },
  focusRange: { start: "2026-04-05", end: "2026-04-09" },
  kpis: ["voiceTraffic", "mobility", "availability"]
};

const availabilityResponse: AskResponse = {
  id: "availability-nokia",
  title: "Availability softening on Nokia clusters",
  summary:
    "Availability dipped across the Nokia TACs in scope during the last maintenance window but remains above 97%. The decline is localized to South East and Midlands sites, pointing to configuration impact rather than a widespread outage.",
  metrics: [
    { label: "Before", value: "98.2%" },
    { label: "After", value: "97.4%" },
    { label: "Delta", value: "-0.8%" }
  ],
  highlights: [
    "Nokia PMQAP change aligns with the drop",
    "Service DR stayed stable, suggesting localized impact"
  ],
  nextSteps: ["Inspect impacted TACs in the same phase window"],
  cta: { label: "Show impacted TACs", action: "tacs" },
  focusRange: { start: "2026-03-29", end: "2026-04-03" },
  kpis: ["availability", "serviceDr"]
};

const beforeAfterResponse: AskResponse = {
  id: "before-after",
  title: "Before vs After activity start",
  summary:
    "After the activity start, throughput improved while mobility softened slightly. Overall KPI mix suggests capacity gain with minor handover friction in the first week.",
  metrics: [
    { label: "Before", value: "27.8 Mbps" },
    { label: "After", value: "29.1 Mbps" },
    { label: "Delta", value: "+4.7%" }
  ],
  highlights: [
    "NR HO SR dipped 1.1% after the start date",
    "Voice Traffic remained flat within normal variance"
  ],
  nextSteps: ["Compare the top TACs with the largest gain"],
  cta: { label: "Compare before/after", action: "compare" },
  focusRange: { start: "2026-03-02", end: "2026-03-12" },
  kpis: ["dlThroughput", "nrHoSr", "voiceTraffic"]
};

const tacResponse: AskResponse = {
  id: "tac-impact",
  title: "Most impacted TACs in current scope",
  summary:
    "The top TACs show consistent dips after Phase 4, clustered around Greater London. This suggests a concentrated configuration or traffic routing change.",
  metrics: [
    { label: "Top TAC", value: "10720" },
    { label: "Delta", value: "-12%" },
    { label: "Sites", value: "38" }
  ],
  highlights: [
    "All three TACs share Nokia vendor settings",
    "Impacts align with Phase 4 and Phase 5 markers"
  ],
  nextSteps: ["Overlay TAC impact on Voice Traffic and Mobility charts"],
  cta: { label: "Show impacted TACs", action: "tacs" },
  focusRange: { start: "2026-04-01", end: "2026-04-07" },
  kpis: ["voiceTraffic", "mobility"]
};

const sitesResponse: AskResponse = {
  id: "impacted-sites",
  title: "Impacted sites overview",
  summary:
    "Sites with sustained degradation cluster around London Docklands and Birmingham East. The pattern indicates localized load shift rather than a broad failure.",
  metrics: [
    { label: "Sites", value: "24" },
    { label: "Region", value: "Greater London" },
    { label: "Delta", value: "-1.2%" }
  ],
  highlights: [
    "Most affected sites are mixed 4G/5G clusters",
    "Mobility decline precedes availability softening"
  ],
  nextSteps: ["Review site list for TAC 10720 before further rollout"],
  cta: { label: "Overlay on charts", action: "overlay" },
  focusRange: { start: "2026-04-02", end: "2026-04-08" },
  kpis: ["availability", "mobility"]
};

export const defaultResponse: AskResponse = {
  id: "general",
  title: "KPI summary for current scope",
  summary:
    "Recent KPI movement stays within expected variance for the selected activity window. Use the overlay action to highlight phase markers and focus on outliers.",
  metrics: [
    { label: "Availability", value: "98.0%" },
    { label: "Voice Traffic", value: "15.8k" },
    { label: "DL Throughput", value: "28.9 Mbps" }
  ],
  highlights: [
    "No critical anomalies detected in the last 72 hours",
    "Mobility stays slightly below baseline but stable"
  ],
  nextSteps: ["Overlay phase markers to inspect outliers"],
  cta: { label: "Overlay on charts", action: "overlay" },
  focusRange: { start: "2026-04-01", end: "2026-04-05" },
  kpis: ["availability", "voiceTraffic", "dlThroughput"]
};

export const responseRules: ResponseRule[] = [
  {
    keywords: ["voice traffic", "voice", "erlang", "phase 5", "phase five", "phase5"],
    response: voiceTrafficResponse
  },
  {
    keywords: ["availability", "degradation", "uptime"],
    response: availabilityResponse
  },
  {
    keywords: ["tac", "tacs", "tracking area"],
    response: tacResponse
  },
  {
    keywords: ["impacted sites", "impacted site", "sites", "site"],
    response: sitesResponse
  },
  {
    keywords: ["before", "after", "compare", "comparison"],
    response: beforeAfterResponse
  }
];

export const matchResponse = (question: string) => {
  const normalized = question.toLowerCase();
  let bestScore = 0;
  let bestResponse: AskResponse | null = null;

  responseRules.forEach((rule) => {
    const score = rule.keywords.reduce(
      (acc, keyword) => (normalized.includes(keyword) ? acc + 1 : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      bestResponse = rule.response;
    }
  });

  return bestResponse ?? defaultResponse;
};

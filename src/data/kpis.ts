import { KPIConfig, KPIId, KPISeriesPoint } from "@/lib/types";
import { getDatesBetween, isWithinRange } from "@/lib/date";

const kpiConfigs: KPIConfig[] = [
  {
    id: "availability",
    name: "Availability",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    baseline: 98.4,
    variance: 1.8,
    trendDirection: "down"
  },
  {
    id: "voiceTraffic",
    name: "Voice Traffic",
    unit: "Erlang",
    format: (value) => `${value.toFixed(1)}k`,
    baseline: 16.2,
    variance: 4.1,
    trendDirection: "down"
  },
  {
    id: "mobility",
    name: "Mobility",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    baseline: 95.1,
    variance: 2.7,
    trendDirection: "down"
  },
  {
    id: "serviceDr",
    name: "Service DR",
    unit: "%",
    format: (value) => `${value.toFixed(2)}%`,
    baseline: 99.3,
    variance: 0.6,
    trendDirection: "down"
  },
  {
    id: "dlThroughput",
    name: "DL Cell Throughput",
    unit: "Mbps",
    format: (value) => `${value.toFixed(1)}`,
    baseline: 28.6,
    variance: 7.8,
    trendDirection: "up"
  },
  {
    id: "nrHoSr",
    name: "NR HO SR",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    baseline: 97.2,
    variance: 1.4,
    trendDirection: "down"
  }
];

const defaultDateRange = { start: "2026-03-25", end: "2026-04-23" };
const dates = getDatesBetween(defaultDateRange.start, defaultDateRange.end);

const hashString = (value: string) =>
  value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const mulberry32 = (seed: number) => {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const applyShock = (
  values: number[],
  index: number,
  magnitude: number,
  length = 2
) => {
  for (let i = 0; i < length; i += 1) {
    const idx = index + i;
    if (idx >= 0 && idx < values.length) {
      values[idx] = values[idx] + magnitude * (1 - i * 0.35);
    }
  }
};

export const getKpiConfig = (id: KPIId) =>
  kpiConfigs.find((kpi) => kpi.id === id)!;

export const getKpiSeries = (activityId: string, kpiId: KPIId) => {
  const config = getKpiConfig(kpiId);
  const seed = hashString(`${activityId}-${kpiId}`);
  const rand = mulberry32(seed);

  const values = dates.map((_, index) => {
    const wave = Math.sin(index / 3.4) * (config.variance * 0.4);
    const noise = (rand() - 0.5) * config.variance * 0.4;
    return config.baseline + wave + noise;
  });

  const phaseShockIndex = Math.floor(values.length * 0.62);
  const drop = config.trendDirection === "down" ? -config.variance * 1.1 : config.variance * 0.9;
  applyShock(values, phaseShockIndex, drop, 3);

  const spikeIndex = Math.floor(values.length * 0.25);
  applyShock(values, spikeIndex, config.variance * 0.8, 2);

  const lastWave = Math.floor(values.length * 0.8);
  applyShock(values, lastWave, config.variance * -0.6, 1);

  return dates.map((date, index) => ({
    date,
    value: Number(values[index].toFixed(2)),
    secondary: Number((values[index] - config.variance * 0.4).toFixed(2))
  }));
};

export const filterSeriesByDate = (
  series: KPISeriesPoint[],
  range: { start: string; end: string }
) => series.filter((point) => isWithinRange(point.date, range));

export const getKpiSummary = (activityId: string, kpiId: KPIId) => {
  const series = getKpiSeries(activityId, kpiId);
  const latest = series[series.length - 1];
  const recent = series.slice(-7).reduce((acc, point) => acc + point.value, 0) / 7;
  const previous = series.slice(-14, -7).reduce((acc, point) => acc + point.value, 0) / 7;
  const delta = ((recent - previous) / previous) * 100;
  return {
    value: latest.value,
    delta: Number(delta.toFixed(1))
  };
};

export const kpiConfigsList = kpiConfigs;
export const kpiDateRange = defaultDateRange;

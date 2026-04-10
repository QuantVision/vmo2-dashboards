"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import type { SitePoint } from "@/lib/types";
import { mapLegend } from "@/data/sites";

const statusColors: Record<SitePoint["status"], string> = {
  "In Progress": "#f59e0b",
  Open: "#1d4ed8",
  Closed: "#94a3b8"
};

type LeafletMapProps = {
  points: SitePoint[];
  height: number;
  zoom?: number;
  showLegend?: boolean;
};

export const LeafletMap = ({ points, height, zoom = 6, showLegend = true }: LeafletMapProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-white/80">
      <MapContainer
        center={[54.5, -2.5]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height, width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {points.map((point) => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={5}
            pathOptions={{ color: statusColors[point.status], fillOpacity: 0.85 }}
          >
            <Tooltip direction="top" offset={[0, -4]}>
              <div className="text-xs font-semibold">{point.name}</div>
              <div className="text-[10px] text-muted-foreground">{point.region}</div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      {showLegend && (
        <div className="absolute left-3 bottom-3 rounded-lg border bg-white/90 px-3 py-2 text-xs shadow-soft">
          <p className="text-[10px] font-semibold text-muted-foreground">Activity status</p>
          <div className="mt-2 space-y-1">
            {mapLegend.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

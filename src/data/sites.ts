import { SitePoint } from "@/lib/types";

export const sitePoints: SitePoint[] = [
  { id: "LON-1021", name: "London City", lat: 51.5074, lng: -0.1278, region: "Greater London", status: "In Progress", activityId: "dl-srs-beamforming" },
  { id: "LON-1048", name: "Docklands", lat: 51.5007, lng: -0.0185, region: "Greater London", status: "In Progress", activityId: "dl-srs-beamforming" },
  { id: "MAN-2204", name: "Manchester Core", lat: 53.4808, lng: -2.2426, region: "North West", status: "Open" },
  { id: "LIV-1180", name: "Liverpool South", lat: 53.4084, lng: -2.9916, region: "North West", status: "Closed" },
  { id: "BHM-3302", name: "Birmingham East", lat: 52.4862, lng: -1.8904, region: "Midlands", status: "In Progress", activityId: "dl-triggered-volte" },
  { id: "NCL-4410", name: "Newcastle Gate", lat: 54.9783, lng: -1.6178, region: "North East", status: "Open" },
  { id: "LEE-2301", name: "Leeds South", lat: 53.8008, lng: -1.5491, region: "Yorkshire", status: "Open" },
  { id: "SHE-2112", name: "Sheffield East", lat: 53.3811, lng: -1.4701, region: "Yorkshire", status: "In Progress", activityId: "ul-triggered-volte" },
  { id: "BRI-4420", name: "Bristol West", lat: 51.4545, lng: -2.5879, region: "South West", status: "Closed" },
  { id: "CDF-1091", name: "Cardiff Bay", lat: 51.4816, lng: -3.1791, region: "Wales", status: "In Progress", activityId: "4g-rc3" },
  { id: "EDB-1203", name: "Edinburgh Central", lat: 55.9533, lng: -3.1883, region: "Scotland", status: "Open" },
  { id: "GLA-3301", name: "Glasgow North", lat: 55.8642, lng: -4.2518, region: "Scotland", status: "In Progress", activityId: "buffer-5g-ca" },
  { id: "ABR-5520", name: "Aberdeen Coast", lat: 57.1497, lng: -2.0943, region: "Scotland", status: "Open" },
  { id: "NOR-1880", name: "Norwich South", lat: 52.6309, lng: 1.2974, region: "East of England", status: "In Progress", activityId: "5g-rc3" },
  { id: "CAM-1132", name: "Cambridge Core", lat: 52.2053, lng: 0.1218, region: "East of England", status: "Open" },
  { id: "NOT-2811", name: "Nottingham East", lat: 52.9548, lng: -1.1581, region: "Midlands", status: "Open" },
  { id: "SOU-2205", name: "Southampton Dock", lat: 50.9097, lng: -1.4044, region: "South East", status: "In Progress", activityId: "nokia-pmqap" },
  { id: "POR-1198", name: "Portsmouth Harbour", lat: 50.8198, lng: -1.0880, region: "South East", status: "Open" },
  { id: "COV-2712", name: "Coventry North", lat: 52.4068, lng: -1.5197, region: "Midlands", status: "Closed" },
  { id: "DAR-2190", name: "Darlington East", lat: 54.5235, lng: -1.5539, region: "North East", status: "Open" }
];

export const mapLegend = [
  { label: "In Progress", color: "#f59e0b" },
  { label: "Open", color: "#1d4ed8" },
  { label: "Closed", color: "#94a3b8" }
];

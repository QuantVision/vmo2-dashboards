import { Activity } from "@/lib/types";

export const activities: Activity[] = [
  {
    id: "dl-srs-beamforming",
    name: "DL SRS Based Beamforming",
    tech: "4G/5G",
    vendor: "Nokia",
    type: "Feature",
    owner: "Pedro Assuncao",
    start: "2026-03-02",
    end: "2026-04-16",
    status: "In Progress",
    tac: "10720",
    region: "Greater London",
    sitesImpacted: 312,
    phases: [
      { name: "Phase 1", date: "2026-03-05" },
      { name: "Phase 2", date: "2026-03-12" },
      { name: "Phase 3", date: "2026-03-20" },
      { name: "Phase 4", date: "2026-03-28" },
      { name: "Phase 5", date: "2026-04-05" }
    ]
  },
  {
    id: "dl-triggered-volte",
    name: "DL-Triggered VoLTE Mobility",
    tech: "4G",
    vendor: "Ericsson",
    type: "Feature",
    owner: "Ruben Borralho",
    start: "2026-03-12",
    end: "2026-04-16",
    status: "In Progress",
    tac: "10072",
    region: "Midlands",
    sitesImpacted: 188,
    phases: [
      { name: "Phase 1", date: "2026-03-15" },
      { name: "Phase 2", date: "2026-03-22" },
      { name: "Phase 3", date: "2026-03-29" },
      { name: "Phase 4", date: "2026-04-08" }
    ]
  },
  {
    id: "ul-triggered-volte",
    name: "UL-Triggered VoLTE Mobility",
    tech: "4G",
    vendor: "Ericsson",
    type: "Feature",
    owner: "Ruben Borralho",
    start: "2026-03-17",
    end: "2026-04-21",
    status: "Planned",
    tac: "10276",
    region: "Yorkshire",
    sitesImpacted: 164,
    phases: [
      { name: "Phase 1", date: "2026-03-20" },
      { name: "Phase 2", date: "2026-03-28" },
      { name: "Phase 3", date: "2026-04-10" }
    ]
  },
  {
    id: "nokia-pmqap",
    name: "Nokia PMQAP configuration change",
    tech: "4G",
    vendor: "Nokia",
    type: "Maintenance",
    owner: "Ian Horne",
    start: "2026-03-25",
    end: "2026-04-15",
    status: "In Progress",
    tac: "10674",
    region: "South East",
    sitesImpacted: 91,
    phases: [
      { name: "Phase 1", date: "2026-03-29" }
    ]
  },
  {
    id: "5g-rc1",
    name: "5G i55B Mop-Up RC1",
    tech: "5G",
    vendor: "Nokia",
    type: "Maintenance",
    owner: "Bartlomiej Tracz",
    start: "2026-03-23",
    end: "2026-03-24",
    status: "Completed",
    tac: "11508",
    region: "North West",
    sitesImpacted: 42,
    phases: [
      { name: "Phase 1", date: "2026-03-23" }
    ]
  },
  {
    id: "4g-rc3",
    name: "4G v75BMop-Up RC3",
    tech: "4G",
    vendor: "Nokia",
    type: "Maintenance",
    owner: "Bartlomiej Tracz",
    start: "2026-03-24",
    end: "2026-03-26",
    status: "Completed",
    tac: "10834",
    region: "Wales",
    sitesImpacted: 53,
    phases: [
      { name: "Phase 1", date: "2026-03-24" },
      { name: "Phase 2", date: "2026-03-25" }
    ]
  },
  {
    id: "5g-rc3",
    name: "5G i55B Mop-Up RC3",
    tech: "5G",
    vendor: "Nokia",
    type: "Maintenance",
    owner: "Bartlomiej Tracz",
    start: "2026-03-24",
    end: "2026-03-26",
    status: "Completed",
    tac: "11588",
    region: "East of England",
    sitesImpacted: 67,
    phases: [
      { name: "Phase 1", date: "2026-03-24" },
      { name: "Phase 2", date: "2026-03-26" }
    ]
  },
  {
    id: "4g-rc4",
    name: "4G v75B Mop-Up RC4",
    tech: "4G",
    vendor: "Nokia",
    type: "Maintenance",
    owner: "Bartlomiej Tracz",
    start: "2026-03-26",
    end: "2026-03-27",
    status: "Completed",
    tac: "10944",
    region: "South West",
    sitesImpacted: 38,
    phases: [{ name: "Phase 1", date: "2026-03-26" }]
  },
  {
    id: "5g-rc4",
    name: "5G i55B Mop-Up RC4",
    tech: "5G",
    vendor: "Nokia",
    type: "Maintenance",
    owner: "Bartlomiej Tracz",
    start: "2026-03-26",
    end: "2026-03-27",
    status: "Completed",
    tac: "11596",
    region: "North East",
    sitesImpacted: 44,
    phases: [{ name: "Phase 1", date: "2026-03-26" }]
  },
  {
    id: "buffer-5g-ca",
    name: "Buffer based 5G CA Secondary Cell Release",
    tech: "5G",
    vendor: "Nokia",
    type: "Feature",
    owner: "Pedro Assuncao",
    start: "2026-02-25",
    end: "2026-04-01",
    status: "In Progress",
    tac: "10172",
    region: "Scotland",
    sitesImpacted: 203,
    phases: [
      { name: "Phase 1", date: "2026-03-02" },
      { name: "Phase 2", date: "2026-03-16" },
      { name: "Phase 3", date: "2026-03-26" }
    ]
  }
];

export const defaultActivity = activities[0];

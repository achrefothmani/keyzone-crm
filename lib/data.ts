// Static lookups + re-exports of API types.
// All dynamic data (properties, users) is fetched live from the FastAPI backend.

export type {
  Property,
  PropertyImage,
  PropertyType,
  PropertySubType,
  PropertyStatus,
  PropertyVocation,
  PropertyValidation,
  User,
  UserRole,
  Zone,
} from "./types";

import type { PropertyType, PropertySubType } from "./types";

export const cities: string[] = [
  "Tunis",
  "La Marsa",
  "Carthage",
  "Gammarth",
  "Sidi Bou Saïd",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Le Bardo",
  "La Goulette",
];

export const propertyTypes: PropertyType[] = ["Appartement", "Villa", "Terrain", "Local"];

export const propertySubTypes: Record<PropertyType, PropertySubType[]> = {
  Appartement: ["Studio", "S+1", "S+2", "S+3", "S+4", "S+5", "Duplex", "Penthouse"],
  Villa: ["Villa jumelée", "Villa individuelle"],
  Terrain: ["Terrain habitation", "Terrain agriculture", "Terrain promotion"],
  Local: ["Local commercial", "Local bureautique"],
};

export type TimelineEntry = {
  date: string;
  user: string;
  action: string;
  detail?: string;
};

export const sampleTimeline: TimelineEntry[] = [
  {
    date: "2026-04-28",
    user: "Achref O.",
    action: "Annonce créée",
    detail: "En attente de validation",
  },
  {
    date: "2026-04-26",
    user: "Yasmine K.",
    action: "Photos ajoutées",
    detail: "12 visuels haute définition",
  },
  {
    date: "2026-04-22",
    user: "Sami B.",
    action: "Visite organisée",
    detail: "Client : Famille Mansouri",
  },
  {
    date: "2026-04-18",
    user: "Mehdi T.",
    action: "Contact propriétaire",
    detail: "Mandat signé pour 6 mois",
  },
];

// Static lookups + re-exports of API types.
// All dynamic data (properties, users) is fetched live from the FastAPI backend.

export type {
  Property,
  PropertyImage,
  PropertyType,
  PropertyStatus,
  PropertyVocation,
  PropertyValidation,
  User,
  UserRole,
  Zone,
} from "./types";

import type { PropertyType } from "./types";

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

export const propertyTypes: PropertyType[] = [
  "Villa",
  "Appartement",
  "Studio",
  "Local commercial",
  "Terrain",
  "Bureau",
];

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

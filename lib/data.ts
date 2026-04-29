export type Property = {
  id: string;
  reference: string;
  title: string;
  type: "Villa" | "Appartement" | "Studio" | "Local commercial" | "Terrain" | "Bureau";
  vocation: "Vente" | "Location";
  status: "Disponible" | "Loué" | "Vendu" | "Réservé";
  validation: "Validée" | "En attente" | "Brouillon";
  city: string;
  neighborhood: string;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  floor: number | null;
  furnished: boolean;
  price: number;
  currency: "TND";
  manager: string;
  updatedAt: string;
  image: string;
};

export const properties: Property[] = [
  {
    id: "1",
    reference: "KZ-2401",
    title: "Villa S+4 avec piscine",
    type: "Villa",
    vocation: "Vente",
    status: "Disponible",
    validation: "Validée",
    city: "La Marsa",
    neighborhood: "Marsa Plage",
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    surface: 320,
    floor: null,
    furnished: false,
    price: 1850000,
    currency: "TND",
    manager: "Sami Bahri",
    updatedAt: "2026-04-25",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "2",
    reference: "KZ-2398",
    title: "Appartement haut standing S+3",
    type: "Appartement",
    vocation: "Location",
    status: "Disponible",
    validation: "Validée",
    city: "Tunis",
    neighborhood: "Les Berges du Lac",
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    surface: 175,
    floor: 4,
    furnished: true,
    price: 4200,
    currency: "TND",
    manager: "Yasmine Karoui",
    updatedAt: "2026-04-24",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "3",
    reference: "KZ-2390",
    title: "Duplex moderne vue mer",
    type: "Appartement",
    vocation: "Vente",
    status: "Réservé",
    validation: "En attente",
    city: "Gammarth",
    neighborhood: "Côte plage",
    rooms: 7,
    bedrooms: 5,
    bathrooms: 4,
    surface: 280,
    floor: 6,
    furnished: false,
    price: 1290000,
    currency: "TND",
    manager: "Mehdi Trabelsi",
    updatedAt: "2026-04-22",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "4",
    reference: "KZ-2385",
    title: "Bureau open-space lumineux",
    type: "Bureau",
    vocation: "Location",
    status: "Loué",
    validation: "Validée",
    city: "Tunis",
    neighborhood: "Centre Urbain Nord",
    rooms: 4,
    bedrooms: 0,
    bathrooms: 2,
    surface: 210,
    floor: 8,
    furnished: true,
    price: 5500,
    currency: "TND",
    manager: "Sami Bahri",
    updatedAt: "2026-04-19",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "5",
    reference: "KZ-2380",
    title: "Studio meublé proche métro",
    type: "Studio",
    vocation: "Location",
    status: "Disponible",
    validation: "Validée",
    city: "Tunis",
    neighborhood: "El Manar",
    rooms: 1,
    bedrooms: 1,
    bathrooms: 1,
    surface: 42,
    floor: 2,
    furnished: true,
    price: 950,
    currency: "TND",
    manager: "Yasmine Karoui",
    updatedAt: "2026-04-15",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "6",
    reference: "KZ-2375",
    title: "Villa contemporaine avec jardin",
    type: "Villa",
    vocation: "Vente",
    status: "Disponible",
    validation: "Validée",
    city: "Carthage",
    neighborhood: "Carthage Hannibal",
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    surface: 410,
    floor: null,
    furnished: false,
    price: 2450000,
    currency: "TND",
    manager: "Mehdi Trabelsi",
    updatedAt: "2026-04-12",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
  },
];

export const managers = ["Sami Bahri", "Yasmine Karoui", "Mehdi Trabelsi", "Leïla Ben Salah"];

export const cities = [
  "Tunis",
  "La Marsa",
  "Carthage",
  "Gammarth",
  "Sidi Bou Saïd",
  "Sousse",
  "Hammamet",
  "Sfax",
];

export const propertyTypes: Property["type"][] = [
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
    detail: "Brouillon initial enregistré",
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

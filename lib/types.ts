// Mirrors the Pydantic schemas in keyzone-api.

export type UserRole = "CHEF_AGENCE" | "AGENT" | "COORDINATEUR";

export type Zone =
  | "Tunis"
  | "La Marsa"
  | "Carthage"
  | "Gammarth"
  | "Sidi Bou Saïd"
  | "La Goulette"
  | "Le Bardo"
  | "Ariana"
  | "Ben Arous"
  | "Manouba";

export type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  zone: Zone | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PropertyType = "Appartement" | "Villa" | "Terrain" | "Local";

export type PropertySubType =
  | "Studio"
  | "S+1"
  | "S+2"
  | "S+3"
  | "S+4"
  | "S+5"
  | "Duplex"
  | "Penthouse"
  | "Villa jumelée"
  | "Villa individuelle"
  | "Terrain habitation"
  | "Terrain agriculture"
  | "Terrain promotion"
  | "Local commercial"
  | "Local bureautique";

export type PropertyStatus = "Disponible" | "Réservé" | "Vendu" | "Loué";
export type PropertyVocation = "Vente" | "Location";
export type PropertyValidation = "Validée" | "En attente de validation" | "Brouillon";

export type PropertyImage = {
  id: string;
  url: string;
  is_cover: boolean;
  created_at: string;
};

export type PropertyHistory = {
  id: string;
  property_id: string;
  user: PropertyResponsible | null;
  action: string;
  changes: Record<string, { old: any; new: any }> | null;
  created_at: string;
};

export type PropertyResponsible = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
};

export type Property = {
  id: string;
  reference: string;
  title: string;
  type: PropertyType;
  sub_type: PropertySubType | null;
  status: PropertyStatus;
  vocation: PropertyVocation;
  validation: PropertyValidation;
  price: number;
  currency: string;
  surface: number | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  furnished: boolean;
  description: string | null;
  address: string | null;
  city: string;
  neighborhood: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_email: string | null;
  responsible_id: string | null;
  responsible: PropertyResponsible | null;
  images: PropertyImage[];
  created_at: string;
  updated_at: string;
};

export type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type PropertyFilters = {
  reference?: string;
  type?: PropertyType;
  sub_type?: PropertySubType;
  vocation?: PropertyVocation;
  status?: PropertyStatus;
  city?: string;
  furnished?: boolean;
  min_price?: number;
  max_price?: number;
  responsible_id?: string;
  search?: string;
  sort_by?: "price" | "created_at" | "updated_at";
  sort_dir?: "asc" | "desc";
  limit?: number;
  offset?: number;
};

export type PropertyCreatePayload = {
  title: string;
  type: PropertyType;
  sub_type?: PropertySubType | null;
  status?: PropertyStatus;
  vocation: PropertyVocation;
  validation?: PropertyValidation;
  price: number;
  currency?: string;
  surface?: number | null;
  rooms?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floor?: number | null;
  furnished?: boolean;
  description?: string | null;
  address?: string | null;
  city: string;
  neighborhood?: string | null;
  postal_code?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  owner_name?: string | null;
  owner_phone?: string | null;
  owner_email?: string | null;
  responsible_id?: string | null;
  reference?: string | null;
  images?: { url: string; is_cover?: boolean }[];
};

export type UserCreatePayload = {
  nom: string;
  prenom: string;
  password: string;
  telephone?: string | null;
  zone?: Zone | null;
  role?: UserRole;
};

export type AuthToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type DashboardKPI = {
  value: number;
  trend_value?: string;
  trend_positive: boolean;
};

export type DashboardStats = {
  total_properties: DashboardKPI;
  pending_validation: DashboardKPI;
};

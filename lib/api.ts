import type {
  AuthToken,
  DashboardStats,
  Page,
  Property,
  PropertyCreatePayload,
  PropertyFilters,
  PropertyHistory,
  PropertyImage,
  User,
  UserCreatePayload,
  UserRole,
  VisitRequest,
  VisitRequestUpdate,
  Zone,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const TOKEN_KEY = "keyzone.token";

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  if (typeof window !== "undefined") {
    unauthorizedHandler = handler;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  /** Don't attach Authorization header. */
  anonymous?: boolean;
  signal?: AbortSignal;
};

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = new URL(API_URL + path);
  if (opts.query) {
    for (const [key, value] of Object.entries(opts.query)) {
      if (value === undefined || value === null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }

  const headers: Record<string, string> = {};
  if (!(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (!opts.anonymous) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), {
    method: opts.method ?? "GET",
    headers,
    body: opts.body instanceof FormData ? opts.body : (opts.body !== undefined ? JSON.stringify(opts.body) : undefined),
    signal: opts.signal,
    cache: "no-store",
  });

  if (res.status === 401 && !opts.anonymous && typeof window !== "undefined") {
    unauthorizedHandler?.();
  }

  if (res.status === 204) return undefined as T;

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "detail" in data && typeof (data as { detail: unknown }).detail === "string"
        ? (data as { detail: string }).detail
        : null) ?? `Request failed (${res.status})`;
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}

// ---------- Auth ----------

export const auth = {
  async login(email: string, password: string): Promise<AuthToken> {
    const token = await request<AuthToken>("/auth/login", {
      method: "POST",
      body: { email, password },
      anonymous: true,
    });
    setToken(token.access_token);
    return token;
  },
  async me(): Promise<User> {
    return request<User>("/auth/me");
  },
  async register(payload: {
    nom: string;
    prenom: string;
    password: string;
    role?: UserRole;
    telephone?: string;
    zone?: Zone;
  }): Promise<User> {
    return request<User>("/auth/register", {
      method: "POST",
      body: payload,
      anonymous: true,
    });
  },
  logout() {
    setToken(null);
  },
};

// ---------- Users ----------

export const usersApi = {
  list: (params?: {
    role?: UserRole;
    zone?: Zone;
    search?: string;
    limit?: number;
    offset?: number;
  }) => request<Page<User>>("/users", { query: params }),

  get: (id: string) => request<User>(`/users/${id}`),

  create: (payload: UserCreatePayload) =>
    request<User>("/users", { method: "POST", body: payload }),

  update: (id: string, payload: Partial<UserCreatePayload> & { is_active?: boolean }) =>
    request<User>(`/users/${id}`, { method: "PUT", body: payload }),

  remove: (id: string) =>
    request<void>(`/users/${id}`, { method: "DELETE" }),
};

// ---------- Properties ----------

export const propertiesApi = {
  list: (filters?: PropertyFilters) =>
    request<Page<Property>>("/properties", { query: filters }),

  get: (id: string) => request<Property>(`/properties/${id}`),

  create: (payload: PropertyCreatePayload) =>
    request<Property>("/properties", { method: "POST", body: payload }),

  update: (id: string, payload: Partial<PropertyCreatePayload>) =>
    request<Property>(`/properties/${id}`, { method: "PUT", body: payload }),

  remove: (id: string) =>
    request<void>(`/properties/${id}`, { method: "DELETE" }),

  listImages: (id: string) =>
    request<PropertyImage[]>(`/properties/${id}/images`),

  getHistory: (id: string) =>
    request<PropertyHistory[]>(`/properties/${id}/history`),

  addImage: (id: string, payload: { url: string; is_cover?: boolean }) =>
    request<PropertyImage>(`/properties/${id}/images`, {
      method: "POST",
      body: payload,
    }),

  uploadImage: (id: string, file: File, isCover?: boolean) => {
    const formData = new FormData();
    formData.append("file", file);
    if (isCover !== undefined) {
      formData.append("is_cover", String(isCover));
    }
    return request<PropertyImage>(`/properties/${id}/images/upload`, {
      method: "POST",
      body: formData,
    });
  },

  removeImage: (propertyId: string, imageId: string) =>
    request<void>(`/properties/${propertyId}/images/${imageId}`, { method: "DELETE" }),

  setCoverImage: (propertyId: string, imageId: string) =>
    request<PropertyImage>(`/properties/${propertyId}/images/${imageId}/set-cover`, {
      method: "PATCH",
    }),
};

// ---------- Visit Requests ----------

export const visitRequestsApi = {
  list: (params?: { limit?: number; offset?: number }) =>
    request<Page<VisitRequest>>("/visit-requests", { query: params }),

  update: (id: string, payload: VisitRequestUpdate) =>
    request<VisitRequest>(`/visit-requests/${id}`, {
      method: "PATCH",
      body: payload,
    }),
};

// ---------- Stats ----------

export const statsApi = {
  getDashboardStats: () => request<DashboardStats>("/stats/dashboard"),
};

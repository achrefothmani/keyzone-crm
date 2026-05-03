import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, currency: "TND" | "EUR" = "TND") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelative(value: string) {
  const diff = (Date.now() - new Date(value).getTime()) / 1000;
  const day = 86400;
  if (diff < day) return "aujourd’hui";
  if (diff < day * 2) return "hier";
  if (diff < day * 7) return `il y a ${Math.floor(diff / day)} jours`;
  return formatDate(value);
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("blob:") || url.startsWith("data:")) {
    return url;
  }
  // Base URL for uploads - adjusting to the user's example port 8009
  const base = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8009";
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

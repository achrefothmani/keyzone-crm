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
  const minute = 60;
  const hour = 3600;
  const day = 86400;

  if (diff < minute) return "à l'instant";
  if (diff < hour) return `il y a ${Math.floor(diff / minute)} min`;
  if (diff < day) return `il y a ${Math.floor(diff / hour)} h`;
  if (diff < day * 2) return "hier";
  if (diff < day * 7) return `il y a ${Math.floor(diff / day)} jours`;
  return formatDate(value);
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  
  let finalUrl = url;
  if (!url.startsWith("http") && !url.startsWith("blob:") && !url.startsWith("data:")) {
    // Base URL for uploads - preferring production HTTPS
    const base = process.env.NEXT_PUBLIC_MEDIA_URL || "https://api.keyzonestates.com";
    finalUrl = `${base}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  
  // Upgrade http to https for our domains and IP to avoid mixed content in production
  if (
    finalUrl.startsWith("http://api.keyzonestates.com") || 
    finalUrl.startsWith("http://keyzonestates.com") ||
    finalUrl.startsWith("http://www.keyzonestates.com") ||
    finalUrl.startsWith("http://crm.keyzonestates.com") ||
    finalUrl.startsWith("http://umami.keyzonestates.com") ||
    finalUrl.startsWith("http://162.19.228.222")
  ) {
    // Replace the entire origin with the secure API domain
    try {
      const parsed = new URL(finalUrl);
      return `https://api.keyzonestates.com${parsed.pathname}${parsed.search}`;
    } catch {
      return finalUrl.replace("http://", "https://");
    }
  }
  
  return finalUrl;
}

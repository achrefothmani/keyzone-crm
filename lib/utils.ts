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

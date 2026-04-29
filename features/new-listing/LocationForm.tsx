import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cities } from "@/lib/data";
import { MapPin, Crosshair, Search } from "lucide-react";

export function LocationForm() {
  return (
    <Card>
      <CardHeader
        title="Localisation"
        description="Adresse complète et positionnement sur la carte."
      />
      <CardBody className="space-y-6">
        <Field label="Adresse complète" required>
          <Input
            placeholder="ex. Avenue Habib Bourguiba, Résidence La Marina"
            iconLeft={<MapPin strokeWidth={1.75} />}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Ville" required>
            <Select
              placeholder="Choisir"
              options={cities.map((c) => ({ value: c, label: c }))}
            />
          </Field>
          <Field label="Code postal">
            <Input placeholder="2070" />
          </Field>
        </div>

        {/* Map placeholder */}
        <div className="relative overflow-hidden rounded-[12px] border border-line bg-elevated h-[260px]">
          {/* Decorative grid + roads */}
          <svg
            viewBox="0 0 800 260"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E5E7EB" strokeWidth="1" />
              </pattern>
              <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect width="800" height="260" fill="#FBFBFB" />
            <rect width="800" height="260" fill="url(#grid)" />
            {/* roads */}
            <path
              d="M0 130 Q 200 90 400 140 T 800 110"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M0 130 Q 200 90 400 140 T 800 110"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <path
              d="M150 0 L 230 260"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M520 0 L 460 260"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* parks */}
            <circle cx="650" cy="60" r="40" fill="#E7EFE5" />
            <circle cx="100" cy="220" r="55" fill="#E7EFE5" />
            <rect width="800" height="260" fill="url(#fade)" />
          </svg>

          {/* Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="relative flex flex-col items-center">
              <span className="absolute -bottom-2 w-12 h-3 rounded-full bg-gold/30 blur-md" />
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gold text-white shadow-gold animate-fade-up">
                <MapPin className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="mt-2 px-2.5 py-1 rounded-full bg-canvas border border-line shadow-card text-[11px] font-medium text-ink whitespace-nowrap">
                Position du bien
              </div>
            </div>
          </div>

          {/* Compass / search overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <button
              type="button"
              aria-label="Centrer"
              className="w-9 h-9 rounded-[8px] bg-canvas border border-line shadow-card flex items-center justify-center text-ink-muted hover:text-gold transition-colors"
            >
              <Crosshair className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Rechercher"
              className="w-9 h-9 rounded-[8px] bg-canvas border border-line shadow-card flex items-center justify-center text-ink-muted hover:text-gold transition-colors"
            >
              <Search className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Coordinates */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-md bg-canvas/90 backdrop-blur border border-line text-[11px] font-mono text-ink-muted tabular-nums">
            36.8783° N · 10.3247° E
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-[12px] text-ink-muted">
            Ajustez le marqueur pour préciser l’emplacement exact.
          </p>
          <Button variant="outline" iconLeft={<MapPin />}>
            Placer sur Google Maps
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

"use client";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cities } from "@/lib/data";
import { MapPin } from "lucide-react";
import { MapPicker } from "@/components/ui/MapPicker";

export type LocationInfo = {
  address: string;
  city: string;
  postal_code: string;
  neighborhood: string;
  latitude?: number | null;
  longitude?: number | null;
};

export function LocationForm({
  value,
  onChange,
}: {
  value: LocationInfo;
  onChange: (patch: Partial<LocationInfo>) => void;
}) {
  return (
    <Card>
      <CardHeader
        title="Localisation"
        description="Adresse complète et zone du bien."
      />
      <CardBody className="space-y-6">
        <Field label="Adresse complète" required>
          <Input
            placeholder="ex. Avenue Habib Bourguiba, Résidence La Marina"
            iconLeft={<MapPin strokeWidth={1.75} />}
            value={value.address}
            onChange={(e) => onChange({ address: e.target.value })}
            required
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          <Field label="Ville" required>
            <Select
              placeholder="Choisir"
              value={value.city}
              onChange={(e) => onChange({ city: e.target.value })}
              options={cities.map((c) => ({ value: c, label: c }))}
              required
            />
          </Field>
          <Field label="Quartier">
            <Input
              placeholder="ex. Marsa Plage"
              value={value.neighborhood}
              onChange={(e) => onChange({ neighborhood: e.target.value })}
            />
          </Field>
          <Field label="Code postal">
            <Input
              placeholder="2070"
              value={value.postal_code}
              onChange={(e) => onChange({ postal_code: e.target.value })}
            />
          </Field>
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-[13px] font-medium text-neutral-700">Position sur la carte</label>
          <MapPicker 
            latitude={value.latitude} 
            longitude={value.longitude} 
            onChange={(lat, lng) => onChange({ latitude: lat, longitude: lng })}
          />
          <p className="text-[12px] text-neutral-500 italic">
            {value.latitude != null && value.longitude != null 
              ? `Coordonnées : ${value.latitude.toFixed(6)}, ${value.longitude.toFixed(6)}`
              : "Cliquez sur la carte pour placer le bien."}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

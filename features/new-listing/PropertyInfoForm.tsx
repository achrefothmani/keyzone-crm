"use client";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { useAuth, canValidate } from "@/lib/auth";
import { propertyTypes, propertySubTypes } from "@/lib/data";
import type {
  PropertyStatus,
  PropertySubType,
  PropertyType,
  PropertyValidation,
  PropertyVocation,
  User,
} from "@/lib/types";

export type PropertyInfo = {
  title: string;
  type: PropertyType | "";
  sub_type: PropertySubType | "";
  vocation: PropertyVocation | "";
  status: PropertyStatus;
  validation: PropertyValidation;
  rooms: string;
  bedrooms: string;
  bathrooms: string;
  floor: string;
  surface: string;
  price: string;
  furnished: boolean;
  description: string;
  responsible_id: string;
};

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: "Disponible", label: "Disponible" },
  { value: "Réservé", label: "Réservé" },
  { value: "Vendu", label: "Vendu" },
  { value: "Loué", label: "Loué" },
];

const VALIDATION_OPTIONS: { value: PropertyValidation; label: string }[] = [
  { value: "En attente de validation", label: "En attente de validation" },
  { value: "Validée", label: "Validée" },
  { value: "Brouillon", label: "Brouillon" },
];

const VOCATION_OPTIONS: { value: PropertyVocation; label: string }[] = [
  { value: "Vente", label: "Vente" },
  { value: "Location", label: "Location" },
];

export function PropertyInfoForm({
  value,
  onChange,
  responsibles,
}: {
  value: PropertyInfo;
  onChange: (patch: Partial<PropertyInfo>) => void;
  responsibles: User[];
}) {
  const { user } = useAuth();
  const isAuthorized = canValidate(user);

  return (
    <Card>
      <CardHeader
        title="Informations immobilières"
        description="Caractéristiques principales du bien à publier."
      />
      <CardBody className="space-y-6">
        <Field label="Titre de l’annonce" required>
          <Input
            placeholder="ex. Villa S+4 avec piscine et jardin"
            value={value.title}
            onChange={(e) => onChange({ title: e.target.value })}
            required
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          <Field label="Type de bien" required>
            <Select
              placeholder="Sélectionner"
              value={value.type}
              onChange={(e) =>
                onChange({ type: e.target.value as PropertyType, sub_type: "" })
              }
              options={propertyTypes.map((t) => ({ value: t, label: t }))}
              required
            />
          </Field>
          {value.type && (
            <Field label="Sous-type de bien" required>
              <Select
                placeholder="Sélectionner"
                value={value.sub_type}
                onChange={(e) =>
                  onChange({ sub_type: e.target.value as PropertySubType })
                }
                options={propertySubTypes[value.type as PropertyType].map((t) => ({
                  value: t,
                  label: t,
                }))}
                required
              />
            </Field>
          )}
          <Field label="Vocation" required>
            <Select
              placeholder="Sélectionner"
              value={value.vocation}
              onChange={(e) =>
                onChange({ vocation: e.target.value as PropertyVocation })
              }
              options={VOCATION_OPTIONS}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          <Field label="Statut" required>
            <Select
              value={value.status}
              onChange={(e) =>
                onChange({ status: e.target.value as PropertyStatus })
              }
              options={STATUS_OPTIONS}
            />
          </Field>
          <Field label="Validation" required>
            <Select
              value={value.validation}
              onChange={(e) =>
                onChange({ validation: e.target.value as PropertyValidation })
              }
              options={VALIDATION_OPTIONS}
              disabled={!isAuthorized}
            />
          </Field>
          <Field
            label={value.vocation === "Location" ? "Loyer / mois (TND)" : "Prix (TND)"}
            required
          >
            <Input
              type="number"
              min={0}
              step="any"
              placeholder="0"
              value={value.price}
              onChange={(e) => onChange({ price: e.target.value })}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          <Field label="Pièces">
            <Input
              type="number"
              min={0}
              placeholder="5"
              value={value.rooms}
              onChange={(e) => onChange({ rooms: e.target.value })}
            />
          </Field>
          <Field label="Chambres">
            <Input
              type="number"
              min={0}
              placeholder="3"
              value={value.bedrooms}
              onChange={(e) => onChange({ bedrooms: e.target.value })}
            />
          </Field>
          <Field label="Salles d’eau">
            <Input
              type="number"
              min={0}
              placeholder="2"
              value={value.bathrooms}
              onChange={(e) => onChange({ bathrooms: e.target.value })}
            />
          </Field>
          <Field label="Étage">
            <Input
              type="number"
              placeholder="—"
              value={value.floor}
              onChange={(e) => onChange({ floor: e.target.value })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Surface">
            <Input
              type="number"
              min={0}
              step="any"
              placeholder="180"
              suffix="m²"
              value={value.surface}
              onChange={(e) => onChange({ surface: e.target.value })}
            />
          </Field>
          <Field label="Responsable">
            <Select
              placeholder="Aucun"
              value={value.responsible_id}
              onChange={(e) => onChange({ responsible_id: e.target.value })}
              options={[
                { value: "", label: "Aucun" },
                ...responsibles.map((u) => ({
                  value: u.id,
                  label: `${u.prenom} ${u.nom}`,
                })),
              ]}
            />
          </Field>
        </div>

        <label className="flex items-center gap-2.5 text-[13px] text-ink">
          <input
            type="checkbox"
            checked={value.furnished}
            onChange={(e) => onChange({ furnished: e.target.checked })}
            className="w-4 h-4 rounded border-line text-gold focus:ring-gold/40"
          />
          <span>Meublé</span>
        </label>

        <Field
          label="Description"
          hint="Mettez en avant les atouts du bien et la qualité du voisinage."
        >
          <RichTextEditor
            value={value.description}
            onChange={(html) => onChange({ description: html })}
            placeholder="Belle villa contemporaine avec piscine privée, idéalement située à 5 minutes de la plage…"
          />
        </Field>
      </CardBody>
    </Card>
  );
}

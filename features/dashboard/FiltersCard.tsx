import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { cities, propertyTypes, managers } from "@/lib/data";
import { Filter, RotateCcw, Hash, MapPin, Wallet } from "lucide-react";

export function FiltersCard() {
  return (
    <Card>
      <CardHeader
        title="Filtres avancés"
        description="Affinez la liste selon vos critères de recherche."
        action={
          <span className="inline-flex items-center gap-2 text-[12px] text-ink-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            7 filtres actifs
          </span>
        }
      />
      <CardBody className="space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
          <Field label="Référence">
            <Input placeholder="KZ-…" iconLeft={<Hash strokeWidth={1.75} />} />
          </Field>

          <Field label="Type">
            <Select
              placeholder="Sélectionner"
              options={propertyTypes.map((t) => ({ value: t, label: t }))}
            />
          </Field>

          <Field label="Vocation">
            <Select
              defaultValue="tous"
              options={[
                { value: "tous", label: "Tous" },
                { value: "vente", label: "Vente" },
                { value: "location", label: "Location" },
              ]}
            />
          </Field>

          <Field label="Zone">
            <Select
              placeholder="Choisir une zone"
              options={cities.map((c) => ({ value: c, label: c }))}
            />
          </Field>

          <Field label="Meublé">
            <Select
              defaultValue="tous"
              options={[
                { value: "tous", label: "Tous" },
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ]}
            />
          </Field>

          <Field label="Budget min">
            <Input
              type="number"
              placeholder="0"
              suffix="TND"
              iconLeft={<Wallet strokeWidth={1.75} />}
            />
          </Field>

          <Field label="Budget max">
            <Input
              type="number"
              placeholder="2 500 000"
              suffix="TND"
              iconLeft={<Wallet strokeWidth={1.75} />}
            />
          </Field>

          <Field label="Responsable">
            <Select
              placeholder="Tous les agents"
              options={managers.map((m) => ({ value: m, label: m }))}
            />
          </Field>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-line-soft">
          <p className="hidden sm:block text-[12px] text-ink-soft">
            <span className="inline-block w-1 h-1 rounded-full bg-gold mr-1.5 align-middle" />
            Conseil&nbsp;: combinez « Vocation » et « Zone » pour des résultats précis.
          </p>
          <div className="flex items-center gap-2.5 ml-auto">
            <Button variant="ghost" iconLeft={<RotateCcw />} size="md">
              Réinitialiser
            </Button>
            <Button variant="primary" iconLeft={<Filter />} size="md">
              Filtrer
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

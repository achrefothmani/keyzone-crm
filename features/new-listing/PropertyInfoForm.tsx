import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { managers, propertyTypes } from "@/lib/data";

export function PropertyInfoForm() {
  return (
    <Card>
      <CardHeader
        title="Informations immobilières"
        description="Caractéristiques principales du bien à publier."
      />
      <CardBody className="space-y-6">
        <Field label="Titre de l’annonce" required>
          <Input placeholder="ex. Villa S+4 avec piscine et jardin" />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Type de bien" required>
            <Select
              placeholder="Sélectionner"
              options={propertyTypes.map((t) => ({ value: t, label: t }))}
            />
          </Field>
          <Field label="Statut" required>
            <Select
              defaultValue="disponible"
              options={[
                { value: "disponible", label: "Disponible" },
                { value: "reserve", label: "Réservé" },
                { value: "vendu", label: "Vendu" },
                { value: "loue", label: "Loué" },
              ]}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          <Field label="Pièces">
            <Input type="number" placeholder="5" />
          </Field>
          <Field label="Chambres">
            <Input type="number" placeholder="3" />
          </Field>
          <Field label="Salles d’eau">
            <Input type="number" placeholder="2" />
          </Field>
          <Field label="Étage">
            <Input type="number" placeholder="—" />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Surface">
            <Input type="number" placeholder="180" suffix="m²" />
          </Field>
          <Field label="Responsable" required>
            <Select
              placeholder="Assigner un agent"
              options={managers.map((m) => ({ value: m, label: m }))}
            />
          </Field>
        </div>

        <Field label="Description" hint="Mettez en avant les atouts du bien et la qualité du voisinage.">
          <textarea
            rows={4}
            placeholder="Belle villa contemporaine avec piscine privée, idéalement située à 5 minutes de la plage…"
            className="w-full rounded-[10px] border border-line bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft outline-none transition-all duration-200 ease-smooth hover:border-ink/20 focus:border-gold focus:shadow-focus resize-none"
          />
        </Field>
      </CardBody>
    </Card>
  );
}

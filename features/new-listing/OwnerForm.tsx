import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { User, Phone, Mail } from "lucide-react";

export function OwnerForm() {
  return (
    <Card>
      <CardHeader
        title="Propriétaire"
        description="Coordonnées du contact principal."
      />
      <CardBody className="space-y-5">
        <Field label="Nom complet" required>
          <Input
            placeholder="Prénom Nom"
            iconLeft={<User strokeWidth={1.75} />}
          />
        </Field>
        <Field label="Téléphone" required>
          <Input
            placeholder="+216 22 123 456"
            iconLeft={<Phone strokeWidth={1.75} />}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="contact@exemple.tn"
            iconLeft={<Mail strokeWidth={1.75} />}
          />
        </Field>
      </CardBody>
    </Card>
  );
}

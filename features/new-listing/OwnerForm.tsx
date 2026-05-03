"use client";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { User, Phone, Mail } from "lucide-react";

export type OwnerInfo = {
  owner_name: string;
  owner_phone: string;
  owner_email: string;
};

export function OwnerForm({
  value,
  onChange,
}: {
  value: OwnerInfo;
  onChange: (patch: Partial<OwnerInfo>) => void;
}) {
  return (
    <Card>
      <CardHeader
        title="Propriétaire"
        description="Coordonnées du contact principal."
      />
      <CardBody className="space-y-5">
        <Field label="Nom complet">
          <Input
            placeholder="Prénom Nom"
            iconLeft={<User strokeWidth={1.75} />}
            value={value.owner_name}
            onChange={(e) => onChange({ owner_name: e.target.value })}
          />
        </Field>
        <Field label="Téléphone">
          <Input
            placeholder="+216 22 123 456"
            iconLeft={<Phone strokeWidth={1.75} />}
            value={value.owner_phone}
            onChange={(e) => onChange({ owner_phone: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="contact@exemple.tn"
            iconLeft={<Mail strokeWidth={1.75} />}
            value={value.owner_email}
            onChange={(e) => onChange({ owner_email: e.target.value })}
          />
        </Field>
      </CardBody>
    </Card>
  );
}

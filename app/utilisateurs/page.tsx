"use client";

import { useEffect, useState, type FormEvent } from "react";

import { PageHeading } from "@/features/dashboard/PageHeading";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { ApiError, usersApi } from "@/lib/api";
import type { User, UserRole, Zone } from "@/lib/types";
import { useAuth } from "@/lib/auth";
import { Plus, Search, Trash2, X } from "lucide-react";

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "AGENT", label: "Agent" },
  { value: "CHEF_AGENCE", label: "Chef d'agence" },
  { value: "COORDINATEUR", label: "Coordinateur" },
];

const ZONE_OPTIONS: { value: Zone; label: string }[] = [
  { value: "Tunis", label: "Tunis" },
  { value: "La Marsa", label: "La Marsa" },
  { value: "Carthage", label: "Carthage" },
  { value: "Gammarth", label: "Gammarth" },
  { value: "Sidi Bou Saïd", label: "Sidi Bou Saïd" },
  { value: "Ariana", label: "Ariana" },
  { value: "Ben Arous", label: "Ben Arous" },
  { value: "Manouba", label: "Manouba" },
  { value: "Le Bardo", label: "Le Bardo" },
  { value: "La Goulette", label: "La Goulette" },
];

const ROLE_TONE: Record<UserRole, "gold" | "info" | "neutral"> = {
  CHEF_AGENCE: "gold",
  COORDINATEUR: "info",
  AGENT: "neutral",
};

export default function UsersPage() {
  const { user: me } = useAuth();
  const canManage = me?.role === "CHEF_AGENCE" || me?.role === "COORDINATEUR";

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search), 250);
    return () => window.clearTimeout(id);
  }, [search]);

  async function refetch() {
    setLoading(true);
    setError(null);
    try {
      const res = await usersApi.list({
        search: debouncedSearch || undefined,
        role: roleFilter || undefined,
      });
      setUsers(res.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, roleFilter]);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await usersApi.remove(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Équipe"
        title="Utilisateurs"
        subtitle="Gérez les agents, leurs rôles et leurs zones de travail."
        action={
          canManage ? (
            <Button
              variant="primary"
              iconLeft={<Plus />}
              onClick={() => setShowCreate(true)}
            >
              Nouvel utilisateur
            </Button>
          ) : null
        }
      />

      <Card>
        <CardHeader
          title={`${users.length} membre${users.length > 1 ? "s" : ""}`}
          description="Liste des comptes connectés à l'agence."
          action={
            <div className="flex items-center gap-2.5">
              <Input
                placeholder="Rechercher par nom, email…"
                iconLeft={<Search strokeWidth={1.75} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72"
              />
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole | "")}
                placeholder="Tous les rôles"
                options={[{ value: "", label: "Tous les rôles" }, ...ROLE_OPTIONS]}
              />
            </div>
          }
        />
        <CardBody className="p-0">
          {error ? (
            <div className="px-7 py-5 text-[13px] text-red-700 bg-red-50 border-b border-red-200/60">
              {error}
            </div>
          ) : null}

          {loading && users.length === 0 ? (
            <div className="px-7 py-10 text-center text-[13px] text-ink-muted">
              Chargement…
            </div>
          ) : users.length === 0 ? (
            <div className="px-7 py-16 text-center">
              <p className="text-[15px] font-medium text-ink">Aucun utilisateur</p>
              <p className="mt-1 text-[13px] text-ink-muted">
                Ajustez la recherche ou créez un nouveau membre.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-line-soft">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="grid grid-cols-12 items-center gap-4 px-7 py-4 hover:bg-elevated/40 transition-colors"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-deep text-white text-[12px] font-medium flex items-center justify-center">
                      {(u.prenom[0] ?? "").toUpperCase()}
                      {(u.nom[0] ?? "").toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium text-ink truncate">
                        {u.prenom} {u.nom}
                      </div>
                      <div className="text-[12px] text-ink-muted truncate">
                        {u.email}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge tone={ROLE_TONE[u.role]}>{u.role}</Badge>
                  </div>
                  <div className="col-span-2 text-[13px] text-ink-muted">
                    {u.zone ?? "—"}
                  </div>
                  <div className="col-span-3 text-[13px] text-ink-muted tabular-nums">
                    {u.telephone ?? "—"}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {canManage && u.id !== me?.id ? (
                      <button
                        type="button"
                        aria-label="Supprimer"
                        onClick={() => handleDelete(u.id)}
                        className="flex items-center justify-center w-9 h-9 rounded-[8px] text-ink-muted hover:bg-canvas hover:text-danger hover:shadow-card transition-all"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.6} />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {showCreate ? (
        <CreateUserDialog
          onClose={() => setShowCreate(false)}
          onCreated={(u) => {
            setUsers((prev) => [u, ...prev]);
            setShowCreate(false);
          }}
        />
      ) : null}
    </div>
  );
}

function CreateUserDialog({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (u: User) => void;
}) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState<UserRole>("AGENT");
  const [zone, setZone] = useState<Zone | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const u = await usersApi.create({
        nom,
        prenom,
        password,
        telephone: telephone || null,
        role,
        zone: zone || null,
      });
      onCreated(u);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de la création");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-[14px] border border-line bg-canvas shadow-lift overflow-hidden">
        <div className="flex items-start justify-between gap-6 px-7 pt-6 pb-5 border-b border-line-soft">
          <div className="space-y-1">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink">
              Nouvel utilisateur
            </h3>
            <p className="text-[13px] text-ink-muted">
              L&rsquo;email sera généré automatiquement (prenom.nom@keyzonestates.tn).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-[8px] text-ink-muted hover:bg-surface hover:text-ink"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <Field label="Prénom" required>
              <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
            </Field>
            <Field label="Nom" required>
              <Input value={nom} onChange={(e) => setNom(e.target.value)} required />
            </Field>
            <Field label="Mot de passe" required>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </Field>
            <Field label="Téléphone">
              <Input
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="+216 …"
              />
            </Field>
            <Field label="Rôle" required>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                options={ROLE_OPTIONS}
              />
            </Field>
            <Field label="Zone">
              <Select
                value={zone}
                onChange={(e) => setZone(e.target.value as Zone | "")}
                placeholder="Aucune"
                options={[{ value: "", label: "Aucune" }, ...ZONE_OPTIONS]}
              />
            </Field>
          </div>

          {error ? (
            <p className="text-[13px] text-danger bg-red-50 border border-red-200/60 rounded-[10px] px-3.5 py-2.5">
              {error}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={submitting} iconLeft={<Plus />}>
              {submitting ? "Création…" : "Créer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

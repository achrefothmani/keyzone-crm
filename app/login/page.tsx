"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { Lock, LogIn, Mail } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/");
    } catch (err) {
      const msg =
        err instanceof ApiError ? err.message : "Connexion impossible. Réessayez.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-baseline gap-1 mb-2">
            <span className="font-display text-[34px] font-medium leading-none text-ink tracking-tight">
              Keyzone
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold mb-1.5" />
          </div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            CRM Immobilier
          </p>
        </div>

        <div className="rounded-[14px] border border-line bg-canvas shadow-card p-8 space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-display text-[22px] font-medium tracking-tight text-ink">
              Connexion
            </h1>
            <p className="text-[13px] text-ink-muted">
              Accédez à votre espace agent.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Email" required>
              <Input
                type="email"
                autoComplete="email"
                placeholder="prenom.nom@keyzonestates.tn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                iconLeft={<Mail strokeWidth={1.75} />}
              />
            </Field>
            <Field label="Mot de passe" required>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                iconLeft={<Lock strokeWidth={1.75} />}
              />
            </Field>

            {error ? (
              <p className="text-[13px] text-danger bg-red-50 border border-red-200/60 rounded-[10px] px-3.5 py-2.5">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              iconLeft={<LogIn />}
              className="w-full"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </Button>
          </form>

          <div className="pt-5 border-t border-line-soft">
            <p className="text-[12px] text-ink-muted text-center">
              Pas encore de compte ?{" "}
              <Link
                href="/login"
                className="text-gold-deep font-medium hover:underline underline-offset-4 decoration-gold/40"
              >
                Contactez votre chef d&apos;agence
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-ink-soft">
          API: <span className="font-mono">{process.env.NEXT_PUBLIC_API_URL ?? "non définie"}</span>
        </p>
      </div>
    </div>
  );
}

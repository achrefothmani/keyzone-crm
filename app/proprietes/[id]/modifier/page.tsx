"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Send, X, Loader2 } from "lucide-react";

import { PageHeading } from "@/features/dashboard/PageHeading";
import { PropertyInfoForm, type PropertyInfo } from "@/features/new-listing/PropertyInfoForm";
import { LocationForm, type LocationInfo } from "@/features/new-listing/LocationForm";
import { OwnerForm, type OwnerInfo } from "@/features/new-listing/OwnerForm";
import { PhotosUpload, type PhotoEntry } from "@/features/new-listing/PhotosUpload";
import { PropertyHistory } from "@/features/properties/PropertyHistory";
import { Button } from "@/components/ui/Button";
import { ApiError, propertiesApi, usersApi } from "@/lib/api";
import type { Property, PropertyCreatePayload, PropertyValidation, User } from "@/lib/types";

const initialInfo: PropertyInfo = {
  title: "",
  type: "",
  sub_type: "",
  vocation: "",
  status: "Disponible",
  validation: "En attente de validation",
  rooms: "",
  bedrooms: "",
  bathrooms: "",
  floor: "",
  surface: "",
  price: "",
  furnished: false,
  description: "",
  responsible_id: "",
};

const initialLocation: LocationInfo = {
  address: "",
  city: "",
  postal_code: "",
  neighborhood: "",
  latitude: null,
  longitude: null,
};

const initialOwner: OwnerInfo = {
  owner_name: "",
  owner_phone: "",
  owner_email: "",
};

function toNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export default function UpdatePropertyPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [info, setInfo] = useState<PropertyInfo>(initialInfo);
  const [location, setLocation] = useState<LocationInfo>(initialLocation);
  const [owner, setOwner] = useState<OwnerInfo>(initialOwner);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [responsibles, setResponsibles] = useState<User[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [property, resUsers] = await Promise.all([
          propertiesApi.get(id),
          usersApi.list({ limit: 200 })
        ]);

        setResponsibles(resUsers.items);

        // Mapping logic
        setInfo({
          title: property.title,
          type: property.type,
          sub_type: property.sub_type ?? "",
          vocation: property.vocation,
          status: property.status,
          validation: property.validation,
          rooms: String(property.rooms ?? ""),
          bedrooms: String(property.bedrooms ?? ""),
          bathrooms: String(property.bathrooms ?? ""),
          floor: String(property.floor ?? ""),
          surface: String(property.surface ?? ""),
          price: String(property.price),
          furnished: property.furnished,
          description: property.description ?? "",
          responsible_id: property.responsible_id ?? "",
        });

        setLocation({
          address: property.address ?? "",
          city: property.city,
          postal_code: property.postal_code ?? "",
          neighborhood: property.neighborhood ?? "",
          latitude: property.latitude,
          longitude: property.longitude,
        });

        setOwner({
          owner_name: property.owner_name ?? "",
          owner_phone: property.owner_phone ?? "",
          owner_email: property.owner_email ?? "",
        });

        setPhotos(property.images.map(img => ({
          id: img.id,
          url: img.url,
          is_cover: img.is_cover,
          status: 'done'
        })));

      } catch (err) {
        setError("Impossible de charger les données du bien.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  function buildPayload(): Partial<PropertyCreatePayload> | null {
    if (!info.type || !info.vocation || !info.title || !location.city || !info.price) {
      setError("Renseignez au minimum titre, type, vocation, ville et prix.");
      return null;
    }
    return {
      title: info.title.trim(),
      type: info.type as any,
      sub_type: info.sub_type || null,
      vocation: info.vocation as any,
      status: info.status as any,
      validation: info.validation,
      price: Number(info.price),
      furnished: info.furnished,
      surface: toNumber(info.surface),
      rooms: toNumber(info.rooms),
      bedrooms: toNumber(info.bedrooms),
      bathrooms: toNumber(info.bathrooms),
      floor: toNumber(info.floor),
      description: info.description.trim() || null,
      address: location.address.trim() || null,
      city: location.city,
      neighborhood: location.neighborhood.trim() || null,
      postal_code: location.postal_code.trim() || null,
      latitude: location.latitude,
      longitude: location.longitude,
      owner_name: owner.owner_name.trim() || null,
      owner_phone: owner.owner_phone.trim() || null,
      owner_email: owner.owner_email.trim() || null,
      responsible_id: info.responsible_id || null,
      images: photos
        .filter(p => p.status !== 'pending')
        .map((p) => ({ url: p.url, is_cover: p.is_cover })),
    };
  }

  async function submit() {
    setError(null);
    const payload = buildPayload();
    if (!payload) return;
    setSubmitting(true);
    try {
      await propertiesApi.update(id, payload);
      router.push(`/proprietes`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  }

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    void submit();
  }

  if (loading) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-neutral-500 font-medium">Chargement des données...</p>
      </div>
    );
  }

  return (
    <form onSubmit={onFormSubmit} className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Modification"
        title="Modifier l'annonce"
        subtitle="Mettez à jour les informations du bien, gérez les photos et publiez les changements."
        action={
          <>
            <Link href="/proprietes">
              <Button type="button" variant="ghost" iconLeft={<X />}>
                Annuler
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              iconLeft={<Save />}
              disabled={submitting}
              onClick={() => void submit()}
            >
              Enregistrer
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconLeft={<Send />}
              disabled={submitting}
            >
              {submitting ? "Mise à jour…" : "Mettre à jour"}
            </Button>
          </>
        }
      />

      {error ? (
        <div className="rounded-[12px] border border-red-200/60 bg-red-50 px-5 py-4 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <PropertyInfoForm
            value={info}
            onChange={(patch) => setInfo((prev) => ({ ...prev, ...patch }))}
            responsibles={responsibles}
          />
          <LocationForm
            value={location}
            onChange={(patch) => setLocation((prev) => ({ ...prev, ...patch }))}
          />
        </div>

        <aside className="space-y-6">
          <OwnerForm
            value={owner}
            onChange={(patch) => setOwner((prev) => ({ ...prev, ...patch }))}
          />
          <PhotosUpload value={photos} onChange={setPhotos} propertyId={id} />
          <div className="rounded-[14px] border border-line bg-canvas p-6 shadow-sm">
            <PropertyHistory propertyId={id} />
          </div>
        </aside>
      </div>

      <div className="xl:hidden sticky bottom-4 flex items-center justify-end gap-2.5 p-3 rounded-[14px] bg-canvas/90 backdrop-blur border border-line shadow-lift">
        <Link href="/proprietes">
          <Button type="button" variant="ghost">
            Annuler
          </Button>
        </Link>
        <Button
          type="submit"
          variant="primary"
          iconLeft={<Send />}
          disabled={submitting}
        >
          Mettre à jour
        </Button>
      </div>
    </form>
  );
}

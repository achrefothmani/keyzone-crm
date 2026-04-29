import { PageHeading } from "@/features/dashboard/PageHeading";
import { PropertyInfoForm } from "@/features/new-listing/PropertyInfoForm";
import { LocationForm } from "@/features/new-listing/LocationForm";
import { OwnerForm } from "@/features/new-listing/OwnerForm";
import { PhotosUpload } from "@/features/new-listing/PhotosUpload";
import { Timeline } from "@/features/new-listing/Timeline";
import { Button } from "@/components/ui/Button";
import { Send, X, Save } from "lucide-react";
import Link from "next/link";

export default function NewListingPage() {
  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Création"
        title="Nouvelle annonce"
        subtitle="Renseignez les informations du bien, ajoutez vos photos et publiez l’annonce sur le portail."
        action={
          <>
            <Link href="/proprietes">
              <Button variant="ghost" iconLeft={<X />}>
                Annuler
              </Button>
            </Link>
            <Button variant="outline" iconLeft={<Save />}>
              Enregistrer
            </Button>
            <Button variant="primary" iconLeft={<Send />}>
              Publier l’annonce
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">
          <PropertyInfoForm />
          <LocationForm />
        </div>

        {/* Right column */}
        <aside className="space-y-6">
          <OwnerForm />
          <PhotosUpload />
          <Timeline />
        </aside>
      </div>

      {/* Sticky footer for mobile */}
      <div className="xl:hidden sticky bottom-4 flex items-center justify-end gap-2.5 p-3 rounded-[14px] bg-canvas/90 backdrop-blur border border-line shadow-lift">
        <Button variant="ghost">Annuler</Button>
        <Button variant="primary" iconLeft={<Send />}>
          Publier
        </Button>
      </div>
    </div>
  );
}

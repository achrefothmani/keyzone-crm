import { PageHeading } from "@/features/dashboard/PageHeading";
import { PropertyRow } from "@/features/properties/PropertyRow";
import { PropertiesToolbar } from "@/features/properties/PropertiesToolbar";
import { properties } from "@/lib/data";

export default function PropertiesPage() {
  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Portefeuille"
        title="Gestion des propriétés"
        subtitle="Consultez, modifiez et publiez vos biens. Les statuts et validations sont mis à jour en temps réel."
      />

      <PropertiesToolbar count={properties.length} />

      <div className="space-y-4">
        {properties.map((p, i) => (
          <PropertyRow key={p.id} p={p} index={i} />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 text-[13px] text-ink-muted">
        <span>Affichage 1 – {properties.length} sur {properties.length}</span>
        <div className="flex items-center gap-1">
          <button className="h-9 px-3 rounded-[8px] border border-line bg-canvas hover:border-gold/40 transition-colors">Précédent</button>
          <span className="h-9 px-3.5 inline-flex items-center rounded-[8px] bg-ink text-white font-medium">1</span>
          <button className="h-9 px-3.5 rounded-[8px] hover:bg-surface transition-colors">2</button>
          <button className="h-9 px-3.5 rounded-[8px] hover:bg-surface transition-colors">3</button>
          <button className="h-9 px-3 rounded-[8px] border border-line bg-canvas hover:border-gold/40 transition-colors">Suivant</button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { PageHeading } from "@/features/dashboard/PageHeading";

export default function AnalyticsPage() {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL || "http://localhost:3004";

  return (
    <div className="px-10 py-10 space-y-8 max-w-[1400px] h-screen flex flex-col">
      <PageHeading
        eyebrow="Analytique"
        title="Analyses d'audience"
        subtitle="Suivez le trafic et le comportement des utilisateurs sur votre site web en temps réel."
      />
      <div className="flex-1 min-h-0 rounded-[14px] border border-line bg-canvas overflow-hidden">
        <iframe
          src={umamiUrl}
          className="w-full h-full border-none"
          title="Umami Analytics"
        />
      </div>
    </div>
  );
}

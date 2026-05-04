"use client";

import { X } from "lucide-react";
import { FiltersForm } from "./FiltersForm";
import type { PropertyFilters } from "@/lib/types";

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PropertyFilters;
  onApply: (filters: PropertyFilters) => void;
  onReset: () => void;
}

export function FiltersDrawer({ isOpen, onClose, filters, onApply, onReset }: FiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-canvas shadow-2xl z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <h2 className="text-[18px] font-medium text-ink">Filtres</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-full transition-colors">
            <X className="w-5 h-5 text-ink-muted" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <FiltersForm 
            initialFilters={filters} 
            onApply={(f) => { onApply(f); onClose(); }} 
            onReset={onReset} 
            columns={2}
          />
        </div>
      </div>
    </>
  );
}

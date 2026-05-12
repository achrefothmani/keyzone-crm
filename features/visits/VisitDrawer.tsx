"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { usersApi, visitRequestsApi } from "@/lib/api";
import type { VisitRequest, User, VisitRequestStatus } from "@/lib/types";

interface VisitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  visit: VisitRequest | null;
  onSuccess: () => void;
}

const STATUS_OPTIONS: { value: VisitRequestStatus; label: string }[] = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "completed", label: "Terminée" },
  { value: "cancelled", label: "Annulée" },
];

export function VisitDrawer({ isOpen, onClose, visit, onSuccess }: VisitDrawerProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [saving, setSaving] = useState(false);
  
  const [status, setStatus] = useState<VisitRequestStatus>("pending");
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [visitDate, setVisitDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await usersApi.list({ limit: 100 });
        setUsers(response.items);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (visit) {
      setStatus(visit.status);
      setAssignedUserId(visit.assigned_user_id || "");
      setVisitDate(visit.visit_date ? visit.visit_date.substring(0, 16) : "");
      setNotes(visit.notes || "");
    }
  }, [visit]);

  const handleSave = async () => {
    if (!visit) return;
    
    setSaving(true);
    try {
      await visitRequestsApi.update(visit.id, {
        status,
        assigned_user_id: assignedUserId || null,
        visit_date: visitDate ? new Date(visitDate).toISOString() : null,
        notes,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update visit request", error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !visit) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-canvas shadow-2xl z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div>
            <h2 className="text-[18px] font-medium text-ink">Détails de la visite</h2>
            <p className="text-[13px] text-ink-soft">
              {visit.full_name} • {visit.property_reference}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-full transition-colors">
            <X className="w-5 h-5 text-ink-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Statut">
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as VisitRequestStatus)}
                options={STATUS_OPTIONS}
              />
            </Field>

            <Field label="Agent">
              <Select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                options={users.map((u) => ({
                  value: u.id,
                  label: `${u.prenom} ${u.nom}`,
                }))}
                placeholder="Assigner un agent"
              />
            </Field>
          </div>

          <Field label="Date & Heure">
            <Input
              type="datetime-local"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
          </Field>

          <Field label="Notes">
            <RichTextEditor 
              value={notes} 
              onChange={setNotes} 
              placeholder="Ajouter des notes sur la visite..."
            />
          </Field>
        </div>

        <div className="px-6 py-4 border-t border-line bg-bone/50 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
}

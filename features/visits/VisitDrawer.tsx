"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Trash2, Calendar, Clock } from "lucide-react";
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
  const [deleting, setDeleting] = useState(false);
  
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

  const handleDelete = async () => {
    if (!visit || !window.confirm("Êtes-vous sûr de vouloir supprimer cette demande de visite ?")) return;
    
    setDeleting(true);
    try {
      await visitRequestsApi.remove(visit.id);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to delete visit request", error);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
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
          {/* Info section */}
          <div className="p-4 rounded-[12px] bg-surface border border-line-soft space-y-3">
            <div className="flex items-center gap-3 text-[13px] text-ink">
              <Calendar className="w-4 h-4 text-ink-muted" strokeWidth={1.6} />
              <span className="font-medium">Demandée le:</span>
              <span className="text-ink-muted">{formatDate(visit.created_at)}</span>
            </div>
            {visit.visit_date && (
              <div className="flex items-center gap-3 text-[13px] text-ink">
                <Clock className="w-4 h-4 text-gold-deep" strokeWidth={1.6} />
                <span className="font-medium">RDV prévu:</span>
                <span className="text-ink-muted">{formatDate(visit.visit_date)}</span>
              </div>
            )}
          </div>

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

          <Field label="Date & Heure du RDV">
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

        <div className="px-6 py-4 border-t border-line bg-bone/50 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
            disabled={saving || deleting}
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Supprimer
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClose} disabled={saving || deleting}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={saving || deleting}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

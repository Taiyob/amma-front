'use client';

import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pill, Plus, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  useAddMedicationPatientMutation,
  useDeleteMedicationsMutation,
} from '@/redux/api/patient.api';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface MedicationsEditTabContentProps {
  patientId: string;
  existingMedications: Medication[];
  onCancel: () => void;
}

export function MedicationsEditTabContent({
  patientId,
  existingMedications,
  onCancel,
}: MedicationsEditTabContentProps) {
  const [addMedication, { isLoading: isAdding }] = useAddMedicationPatientMutation();
  const [deleteMedication, { isLoading: isDeleting }] = useDeleteMedicationsMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '' });

  const handleAdd = async () => {
    if (!newMed.name || !newMed.dosage || !newMed.frequency) {
      toast.error('Please fill in all medication fields.');
      return;
    }
    try {
      await addMedication({
        id: patientId,
        data: newMed,
      }).unwrap();
      toast.success('Medication added successfully!');
      setNewMed({ name: '', dosage: '', frequency: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to add medication.');
    }
  };

  const handleDelete = async (medicationId: string) => {
    setDeletingId(medicationId);
    try {
      await deleteMedication(medicationId).unwrap();
      toast.success('Medication removed.');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to remove medication.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <TabsContent value="meds" className="p-6 space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Add Medication</h3>
        <div className="flex gap-3">
          <Input
            placeholder="Name (e.g. Metformin)"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          />
          <Input
            placeholder="Dosage (e.g. 500mg)"
            value={newMed.dosage}
            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
          />
          <Input
            placeholder="Frequency (e.g. Twice daily)"
            value={newMed.frequency}
            onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
          />
          <Button onClick={handleAdd} size="icon" disabled={isAdding}>
            {isAdding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {existingMedications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No medications added yet.
          </p>
        ) : (
          existingMedications.map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-center border p-4 rounded-lg">
              <div className="flex gap-3 items-center">
                <Pill className="text-primary shrink-0" />
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {m.dosage} • {m.frequency}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                disabled={isDeleting && deletingId === m.id}
                onClick={() => handleDelete(m.id)}>
                {isDeleting && deletingId === m.id ? (
                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </TabsContent>
  );
}

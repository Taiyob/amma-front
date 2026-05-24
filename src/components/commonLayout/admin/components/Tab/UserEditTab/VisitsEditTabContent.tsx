'use client';

import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  useScheduleVisitPatientMutation,
} from '@/redux/api/patient.api';
import { toast } from 'sonner';

interface VisitsEditTabContentProps {
  patientId: string;
  onCancel: () => void;
}

export function VisitsEditTabContent({
  patientId,
  onCancel,
}: VisitsEditTabContentProps) {
  const [scheduleVisit, { isLoading }] = useScheduleVisitPatientMutation();

  const [newVisit, setNewVisit] = useState({
    date: '',
    time: '',
    purpose: '',
    doctor: '',
  });

  const handleSchedule = async () => {
    if (!newVisit.date || !newVisit.time || !newVisit.purpose) {
      toast.error('Please fill in date, time, and purpose.');
      return;
    }
    try {
      await scheduleVisit({
        id: patientId,
        data: {
          date: newVisit.date,
          time: newVisit.time,
          purpose: newVisit.purpose,
          doctor: newVisit.doctor || undefined,
        },
      }).unwrap();
      toast.success('Visit scheduled successfully!');
      setNewVisit({ date: '', time: '', purpose: '', doctor: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to schedule visit.');
    }
  };

  return (
    <TabsContent value="visits" className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Schedule New Visit</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="date"
            value={newVisit.date}
            onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
          />
          <Input
            type="time"
            value={newVisit.time}
            onChange={(e) => setNewVisit({ ...newVisit, time: e.target.value })}
          />
          <Input
            placeholder="Purpose (e.g. Annual Checkup)"
            value={newVisit.purpose}
            onChange={(e) =>
              setNewVisit({ ...newVisit, purpose: e.target.value })
            }
          />
          <Input
            placeholder="Doctor (e.g. Dr. Smith)"
            value={newVisit.doctor}
            onChange={(e) =>
              setNewVisit({ ...newVisit, doctor: e.target.value })
            }
          />
        </div>

        <Button
          className="mt-4 gap-2 bg-secondary text-background hover:bg-secondary"
          onClick={handleSchedule}
          disabled={
            isLoading ||
            !newVisit.date ||
            !newVisit.time ||
            !newVisit.purpose
          }>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          Schedule Visit
        </Button>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button variant="outline" onClick={onCancel}>
          Close
        </Button>
      </div>
    </TabsContent>
  );
}

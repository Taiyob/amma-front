// components/AddMedicationDialog.tsx
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { toast } from 'sonner';

type TimingOption =
  | 'Morning'
  | 'Afternoon'
  | 'Evening'
  | 'Night'

export default function AddMedicationDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (med: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    times: TimingOption[];
    specialInstructions: string;
    prescribedBy: string;
  }) => void;
}) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [times, setTimes] = useState<TimingOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('');

  const toggleTime = (time: TimingOption) => {
    setTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
  };

  const handleSubmit = () => {
    if (!name || !dosage || !frequency || !prescribedBy) {
      toast.error('Please fill required fields.');
      return;
    }
    onAdd({
      name,
      dosage,
      frequency,
      duration,
      times,
      specialInstructions,
      prescribedBy,
    });
    // Reset form
    setName('');
    setDosage('');
    setFrequency('');
    setDuration('');
    setTimes([]);
    setSpecialInstructions('');
    setPrescribedBy('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Medication Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amlodipine"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dosage *</label>
              <Input
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 5mg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Frequency *
              </label>
              <Input
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="e.g. After meals"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 30 days, 3 months"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timing</label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  'Morning',
                  'Afternoon',
                  'Evening',
                  'Night',
                ] as TimingOption[]
              ).map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => toggleTime(time)}
                  className={`px-3 py-1 text-xs rounded-md transition ${times.includes(time)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Special Instructions
            </label>
            <Textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Take with food, avoid alcohol, may cause drowsiness..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Prescribed By *
            </label>
            <Input
              value={prescribedBy}
              onChange={(e) => setPrescribedBy(e.target.value)}
              placeholder="e.g. Dr. Oli Ullah"
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-secondary text-background hover:bg-secondary"
            onClick={handleSubmit}>
            Add Medication
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

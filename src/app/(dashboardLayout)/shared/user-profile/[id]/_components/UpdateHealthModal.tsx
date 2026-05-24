'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdatePatientAiInsightMutation } from '@/redux/api/patient.api';
import { toast } from 'sonner';
import { parseBloodGlucose } from '@/lib/vitalUtils';

interface UpdateHealthModalProps {
  current: {
    weight: string | number;
    systolic: string | number;
    diastolic: string | number;
    glucose: string | number;
  };
  patientId: string;
  insightsId?: string;
}

interface HealthFormInputs {
  weight?: string | number;
  systolic?: string | number;
  diastolic?: string | number;
  glucose: string | number;
}

export default function UpdateHealthModal({
  current,
  patientId,
  insightsId,
}: UpdateHealthModalProps) {
  const [open, setOpen] = useState(false);
  const [updateAiInsight, { isLoading }] = useUpdatePatientAiInsightMutation();

  const { register, handleSubmit, reset } = useForm<HealthFormInputs>({
    defaultValues: {
      weight: current.weight,
      systolic: current.systolic,
      diastolic: current.diastolic,
      glucose: current.glucose,
    },
  });

  const onSubmit: SubmitHandler<HealthFormInputs> = async (data) => {
    try {
      // if (!insightsId) {
      //   toast.error('Health insight record not found. Please ensure the patient has an AI insight generated.');
      //   return;
      // }
      await updateAiInsight({
        patientId,
        insightsId,
        data: {
          weight: data.weight,
          bloodPressure: `${data.systolic}/${data.diastolic}`,
          bloodGlucose: data.glucose ? (() => {
            const { numValue, isMmol } = parseBloodGlucose(data.glucose);
            return isMmol ? (numValue * 18.0182).toFixed(0) : numValue.toFixed(0);
          })() : 0,
        },
      }).unwrap();
      reset(data); // Reset form with new values
      setOpen(false);
      toast.success('Health details updated successfully');
    } catch (err) {
      console.error('Failed to update health details', err);
      toast.error('Failed to update health details');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary text-white px-6 py-2 rounded-lg">
          Update Health Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150 p-0 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 bg-white flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <DialogTitle className="text-base font-bold text-neutral-950">
                Update health details
              </DialogTitle>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-28 mr-4 bg-orange-400 hover:bg-orange-500 text-white font-medium">
                {isLoading ? 'Updating...' : 'Update'}
              </Button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Weight (KG)</Label>
                <Input {...register('weight')} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Blood Pressure - Diastolic (mmHg)
                </Label>
                <Input {...register('diastolic')} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Blood Pressure - Systolic (mmHg)
                </Label>
                <Input {...register('systolic')} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-600">
                  Blood Glucose (mmol/L)
                </Label>
                <Input
                  {...register('glucose')}
                  defaultValue={(() => {
                    const { numValue, isMmol } = parseBloodGlucose(current.glucose);
                    const mmolValue = isMmol ? numValue : numValue / 18.0182;
                    return numValue === 0 ? '' : mmolValue.toFixed(1);
                  })()}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

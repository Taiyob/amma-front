/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {TabsContent} from '@/components/ui/tabs';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {
  useGetSinglePatientAiInsightQuery,
  useUpdatePatientAiInsightMutation,
} from '@/redux/api/patient.api';
import {toast} from 'sonner';
import {Loader2, Activity} from 'lucide-react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {IVitals} from '@/components/commonLayout/staff/card/OngoingAppointmentCard';
import {parseBloodGlucose} from '@/lib/vitalUtils';

interface HealthInsightEditTabContentProps {
  patientId: string;
  onCancel: () => void;
  vitals?: IVitals;
}

interface HealthFormInputs {
  weight: string | number;
  systolic: string | number;
  diastolic: string | number;
  glucose: string | number;
}

export function HealthInsightEditTabContent({
  patientId,
  onCancel,
}: HealthInsightEditTabContentProps) {
  const {data: insightData, isLoading: isFetching} =
    useGetSinglePatientAiInsightQuery(patientId);
  const [updateAiInsight, {isLoading: isUpdating}] =
    useUpdatePatientAiInsightMutation();

  const {register, handleSubmit, reset} = useForm<HealthFormInputs>();

  useEffect(() => {
    if (insightData?.data) {
      const insight = insightData.data;
      reset({
        weight: insight.weight || '',
        systolic: insight.bloodPressure?.split('/')?.[0] || '',
        diastolic: insight.bloodPressure?.split('/')?.[1] || '',
        glucose: (() => {
          const {numValue, isMmol} = parseBloodGlucose(insight.bloodGlucose);
          const mmolValue = isMmol ? numValue : numValue / 18.0182;
          return numValue === 0 ? '' : mmolValue.toFixed(1);
        })(),
      });
    }
  }, [insightData, reset]);

  const onSubmit = async (formData: HealthFormInputs) => {
    try {
      const insightsId = insightData?.data?.id;
      if (!insightsId) {
        toast.error('Health insight record not found for this patient.');
        return;
      }

      await updateAiInsight({
        patientId,
        insightsId,
        data: {
          weight: formData.weight,
          bloodPressure: `${formData.systolic}/${formData.diastolic}`,
          bloodGlucose: formData.glucose ? (() => {
            const {numValue, isMmol} = parseBloodGlucose(formData.glucose);
            return isMmol ? (numValue * 18.0182).toFixed(0) : numValue.toFixed(0);
          })() : 0,
        },
      }).unwrap();

      toast.success('Health insights updated successfully!');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update health insights.');
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <TabsContent value="health" className="p-6 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-2 text-secondary">
          <Activity className="h-5 w-5" />
          <h3 className="text-lg font-medium">Update Health Metrics</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label>Weight (KG)</Label>
            <Input
              {...register('weight')}
              placeholder="e.g. 75"
              className="mt-1"
            />
          </div>

          <div className="space-y-1">
            <Label>Blood Glucose (mmol/L)</Label>
            <Input
              {...register('glucose')}
              placeholder="e.g. 6.1"
              className="mt-1"
            />
          </div>

          <div className="space-y-1">
            <Label>Blood Pressure - Systolic (mmHg)</Label>
            <Input
              {...register('systolic')}
              placeholder="e.g. 120"
              className="mt-1"
            />
          </div>

          <div className="space-y-1">
            <Label>Blood Pressure - Diastolic (mmHg)</Label>
            <Input
              {...register('diastolic')}
              placeholder="e.g. 80"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isUpdating}
            className="bg-secondary text-background hover:bg-secondary">
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Save Changes
          </Button>
        </div>
      </form>
    </TabsContent>
  );
}

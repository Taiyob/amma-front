/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {ArrowRightIcon, Loader} from 'lucide-react';

import {FormData} from '@/types/Register.types';
import {useGetAllServiceQuery} from '@/redux/api/services.api';
import Link from 'next/link';

interface Step3Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  errors: Partial<Record<keyof FormData, string>>;
  isLoading: boolean;
}

export default function Step3({
  formData,
  updateField,

  nextStep,
  errors,
  isLoading,
}: Step3Props) {
  const {data: servicesResponse, isLoading: isServiceLoading} =
    useGetAllServiceQuery({});

  const services =
    servicesResponse?.data.filter(
      (service: any) => service.category === 'SERVICE',
    ) || [];

  const handleNext = async () => {
    nextStep();
  };

  const handleTimeSlotButton = (slot: string) => {
    updateField('preferredTime', slot);
  };

  return (
    <div className="p-4">
      <div className="space-y-5">
        {/* Service */}
        <div className="space-y-2 w-full">
          <Label>Type of Service</Label>

          <Select
            value={formData.serviceType}
            onValueChange={(value) => updateField('serviceType', value)}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isServiceLoading ? 'Loading services...' : 'Select service'
                }
              />
            </SelectTrigger>

            <SelectContent>
              {services.map((service: any) => (
                <SelectItem key={service.id} value={service.id}>
                  <span>
                    <span className="text-secondary">
                      Price: ${service.basePrice}
                    </span>{' '}
                    - {service.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.serviceType && (
            <p className="text-destructive text-sm">{errors.serviceType}</p>
          )}
        </div>

        {/* Symptoms */}
        <div className="space-y-2">
          <Label>Brief Description of Symptoms</Label>

          <Textarea
            placeholder="Write your symptoms here"
            rows={3}
            value={formData.indication}
            onChange={(e) => updateField('indication', e.target.value)}
          />

          {errors.indication && (
            <p className="text-destructive text-sm">{errors.indication}</p>
          )}
        </div>

        {/* Preferred Date */}
        <div className="space-y-2 w-full">
          <Label>Preferred Date</Label>

          <input
            type="date"
            className="w-full rounded-md border px-3 py-2"
            value={formData.preferredDate}
            onChange={(e) => updateField('preferredDate', e.target.value)}
          />

          {errors.preferredDate && (
            <p className="text-destructive text-sm">{errors.preferredDate}</p>
          )}
        </div>

        {/* Preferred Time Slots */}
        <div className="space-y-2">
          <Label>Preferred Time</Label>

          <div className="flex gap-2 flex-wrap">
            {['Morning', 'Afternoon', 'Evening'].map((slot) => (
              <Button
                key={slot}
                type="button"
                className={`border hover:bg-secondary/80 min-w-24 ${
                  formData.preferredTime === slot
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-background'
                }`}
                onClick={() => handleTimeSlotButton(slot)}>
                {slot}
              </Button>
            ))}
          </div>

          {errors.preferredTime && (
            <p className="text-destructive text-sm">{errors.preferredTime}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3 pt-6">
        <Link href={'/patient/dashboard'}>
          <Button
            className="bg-secondary hover:bg-secondary text-background px-6 hover:text-white/80"
            type="button"
            variant="outline">
            Skip Now
          </Button>
        </Link>

        <Button type="button" onClick={handleNext} disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-1">
              <Loader className="animate-spin" />
              Booking...
            </span>
          ) : (
            <span className="flex gap-1 items-center">
              Next <ArrowRightIcon />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

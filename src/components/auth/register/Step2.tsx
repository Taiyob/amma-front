/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/auth/register/Step2.tsx
'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormData} from '@/types/Register.types';
import {LoaderIcon, Plus} from 'lucide-react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AvatarUpload from '@/components/commonLayout/patient/components/upload/AvatarUpload';
import Link from 'next/link';

interface Step2Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  errors: Partial<Record<keyof FormData, string>>;
  isLoading: boolean;
}

export default function Step2({
  formData,
  updateField,
  nextStep,
  errors,
  isLoading,
}: Step2Props) {
  console.log('Step2 component rendering. isLoading:', isLoading);

  return (
    <div className="w-full p-4">
      {/* Form Fields */}
      <div className="space-y-4 w-full">
        {/* Profile Photo */}
        <div className="flex justify-center w-full mb-6">
          <AvatarUpload
            value={formData.profilePhoto}
            onChange={(file: File | null) => updateField('profilePhoto', file)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Patient Name */}
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name *</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => updateField('patientName', e.target.value)}
              placeholder="Enter patient name"
              required
              className="w-full"
            />
            {errors.patientName && (
              <p className="text-destructive text-sm">{errors.patientName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>

            <div className="relative w-full h-10">
              <PhoneInput
                country={'gh'}
                value={formData.mobileNumber}
                onChange={(phone) => updateField('mobileNumber', `+${phone}`)}
                inputClass="!md:w-[80%] !w-[75%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
                buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
                dropdownClass="!text-sm"
              />
            </div>

            {errors.mobileNumber && (
              <p className="text-destructive text-sm">{errors.mobileNumber}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Relationship */}
          <div className="space-y-2 w-full">
            <Label>Relationship *</Label>
            <Select
              value={formData.relationship}
              onValueChange={(v) => updateField('relationship', v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Self">Self</SelectItem>
                <SelectItem value="Father">Father</SelectItem>
                <SelectItem value="Mother">Mother</SelectItem>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Child">Child</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            {errors.relationship && (
              <p className="text-destructive text-sm">{errors.relationship}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateField('dateOfBirth', e.target.value)}
              className="w-full"
            />

            {errors.dateOfBirth && (
              <p className="text-destructive text-sm">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {/* Gender & Blood Type */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(v) => updateField('gender', v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
                <SelectItem value="PREFER_NOT_TO_SAY">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.gender && (
              <p className="text-destructive text-sm">{errors.gender}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Blood Type</Label>
            <Select
              value={formData.bloodGroup}
              onValueChange={(v) => updateField('bloodGroup', v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>

              <SelectContent>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(
                  (type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Current Address */}
        <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
          <Label className="text-base text-muted-foreground">
            Current Location / Address
          </Label>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Street</Label>
              <Input
                value={formData.address?.street || ''}
                onChange={(e) =>
                  updateField('address', {
                    ...formData.address,
                    street: e.target.value,
                  })
                }
                placeholder="123 Rd"
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={formData.address?.city || ''}
                onChange={(e) =>
                  updateField('address', {
                    ...formData.address,
                    city: e.target.value,
                  })
                }
                placeholder="Accra..."
              />
            </div>
            <div className="space-y-2">
              <Label>Area</Label>
              <Input
                value={formData.address?.area || ''}
                onChange={(e) =>
                  updateField('address', {
                    ...formData.address,
                    area: e.target.value,
                  })
                }
                placeholder="East Legon..."
              />
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="space-y-2">
          <Label>Medical Conditions</Label>
          <Textarea
            value={formData.medicalConditions}
            onChange={(e) => updateField('medicalConditions', e.target.value)}
            placeholder="Conditions & symptoms"
            className="w-full resize-none"
          />
        </div>

        {/* Medical History */}
        <div className="space-y-2">
          <Label>Medical History</Label>
          <Textarea
            value={formData.medicalHistory}
            onChange={(e) => updateField('medicalHistory', e.target.value)}
            placeholder="Previous medical history"
            className="w-full resize-none"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <Link href={'/patient/dashboard'}>
          <Button
            className="bg-secondary hover:bg-secondary text-background px-6 hover:text-white/80"
            type="button"
            variant="outline">
            Skip Now
          </Button>
        </Link>

        <Button type="button" onClick={nextStep} disabled={isLoading}>
          {isLoading ? (
            <span className="flex gap-1 items-center">
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Adding Patient...
            </span>
          ) : (
            <span className="flex gap-2 items-center">
              <Plus /> Add Patient
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

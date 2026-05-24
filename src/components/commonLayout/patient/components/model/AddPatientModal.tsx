/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import UploadFile from '@/components/commonLayout/patient/components/upload/useUploade';
import AvatarUpload from '../upload/AvatarUpload';
import { useAddPatientProfileMutation } from '@/redux/api/patient.api';
import { toast } from 'sonner';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '@/schema/patient.schema';

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
}

type PatientFormValues = z.infer<typeof patientSchema>;

export default function AddPatientModal({ open, onClose }: AddPatientModalProps) {
  const [addPatient, { isLoading: isAddingPatient }] =
    useAddPatientProfileMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      mobileNumber: undefined,
      name: '',
      dateOfBirth: '',
      relationship: '',
      gender: '',
      bloodGroup: '',
      address: {
        street: '',
        city: '',
        area: '',
      },
      medicalConditions: '',
      medicalHistory: '',
      profilePhoto: null,
      medicalReports: [],
    },
  });

  if (!open) return null;

  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = (data as any)[key];

      if (
        key !== 'profilePhoto' &&
        key !== 'medicalReports' &&
        key !== 'address' &&
        value !== undefined &&
        value !== null &&
        value !== ''
      ) {
        formData.append(key, value);
      }
    });

    if (data.address) {
      formData.append('address', JSON.stringify(data.address));
    }

    if (data.profilePhoto) {
      formData.append('profilePhoto', data.profilePhoto);
    }

    if (data.medicalReports && Array.isArray(data.medicalReports)) {
      data.medicalReports.forEach((file: File) => {
        formData.append('medicalReports', file);
      });
    }

    const toastId = toast.loading('Adding patient profile...');

    try {
      await addPatient(formData).unwrap();
      toast.success('Patient profile added successfully!', { id: toastId });
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to add patient profile', {
        id: toastId,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-xl bg-background shadow-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">Add New Patient</h2>
            <p className="text-sm text-muted-foreground">
              Fill in the details to create a patient profile
            </p>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Body */}
        <form
          id="addPatientForm"
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-4 space-y-5 overflow-y-auto max-h-[65vh]">
          {/* Avatar */}
          <Controller
            name="profilePhoto"
            control={control}
            render={({ field }) => (
              <AvatarUpload value={field.value} onChange={field.onChange} />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Full Name *"
                  placeholder="Enter full name"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.name?.message}
                />
              )}
            />

            {/* contact*/}
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>

                  <div className="relative w-full h-10">
                    <PhoneInput
                      country={'gh'}
                      value={field.value}
                      onChange={(phone) => field.onChange(`+${phone}`)}
                      inputClass="!md:w-[85%] !w-[80%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
                      buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
                      dropdownClass="!text-sm"
                    />
                  </div>

                  {errors.mobileNumber && (
                    <p className="text-destructive text-sm">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Relationship & Date of Birth */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="relationship"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Relationship"
                  placeholder="Father / Mother / Self"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.relationship?.message}
                />
              )}
            />

            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Date of Birth *"
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.dateOfBirth?.message}
                />
              )}
            />
          </div>

          {/* Gender & Blood Type */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Gender *"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: '', label: 'Select gender' },
                    { value: 'MALE', label: 'Male' },
                    { value: 'FEMALE', label: 'Female' },
                    { value: 'OTHER', label: 'Other' },
                    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
                  ]}
                  error={errors.gender?.message} //
                />
              )}
            />

            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Blood Type"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: '', label: 'Select blood type' },
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' },
                  ]}
                />
              )}
            />
          </div>

          {/* Address */}
          <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
            <h3 className="text-sm font-medium">Current Location / Address</h3>
            <div className="grid grid-cols-3 gap-4">
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Street"
                    placeholder="123 Rd"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="City"
                    placeholder="Dhaka"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="address.area"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Area"
                    placeholder="Banani"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Medical Conditions */}
          <Controller
            name="medicalConditions"
            control={control}
            render={({ field }) => (
              <TextareaField
                label="Medical Conditions"
                placeholder="Conditions & symptoms"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {/* Medical History */}
          <Controller
            name="medicalHistory"
            control={control}
            render={({ field }) => (
              <TextareaField
                label="Medical History"
                placeholder="Previous medical history"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="medicalReports"
            control={control}
            render={({ field }) => (
              <UploadFile value={field.value} onChange={field.onChange} />
            )}
          />
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="addPatientForm"
            className="bg-secondary text-background hover:bg-secondary"
            disabled={isAddingPatient}>
            {isAddingPatient ? 'Adding...' : 'Add Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Fields */

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${error ? 'border-red-500' : ''
          }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function TextareaField({ label, placeholder, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none resize-none h-20 focus:ring-1"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, error }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${error ? 'border-red-500' : ''
          }`}>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

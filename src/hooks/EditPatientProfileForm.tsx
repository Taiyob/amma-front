/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {ArrowLeft} from 'lucide-react';
import AppButton from '@/components/ui/AppButton';
import {Button} from '@/components/ui/button';
import AvatarUpload from '@/components/commonLayout/patient/components/upload/AvatarUpload';
import {Label} from '@/components/ui/label';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import UploadFile from '@/components/commonLayout/patient/components/upload/useUploade';
import {
  useGetSinglePatientAiInsightQuery,
  useGetSinglePatientProfilesQuery,
  useUpdatePatientAiInsightMutation,
  useUpdatePatientMutation,
} from '@/redux/api/patient.api';
// import {patientSchema} from '@/schema/patient.schema';
import {z} from 'zod';
import {patientSchemaEdit} from '@/schema/patient.schema';

type PatientFormValues = z.infer<typeof patientSchemaEdit>;

export function EditPatientProfileForm() {
  const {id} = useParams();
  const router = useRouter();

  const {data, isLoading} = useGetSinglePatientProfilesQuery(id);
  const [updatePatient, {isLoading: isUpdating}] = useUpdatePatientMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchemaEdit),
    defaultValues: {
      name: '',
      relationship: '',
      mobileNumber: '',
      gender: '',
      bloodGroup: '',
      medicalConditions: '',
      medicalHistory: '',
      profilePhoto: null,
      medicalReports: [],
      weight: '',
      systolic: '',
      diastolic: '',
      glucose: '',
    },
  });

  const {data: insightData} = useGetSinglePatientAiInsightQuery(id);
  const [updateAiInsight] = useUpdatePatientAiInsightMutation();

  useEffect(() => {
    if (data?.data) {
      const patient = data.data;
      reset({
        name: patient.name || '',
        relationship: patient.relationship || '',
        mobileNumber: patient.mobileNumber || '',
        gender: patient.gender || '',
        bloodGroup: patient.bloodGroup || '',
        medicalConditions: patient.medicalConditions || '',
        medicalHistory: patient.medicalHistory || '',
        profilePhoto: patient.profilePhoto || null,
        medicalReports: [],
        weight: insightData?.data?.weight || '',
        systolic: insightData?.data?.bloodPressure?.split('/')?.[0] || '',
        diastolic: insightData?.data?.bloodPressure?.split('/')?.[1] || '',
        glucose: insightData?.data?.bloodGlucose || '',
      });
    }
  }, [data, insightData, reset]);

  const onSubmit: SubmitHandler<PatientFormValues> = async (formValues) => {
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (key === 'profilePhoto' && value) {
        formData.append('profilePhoto', value);
      } else if (key === 'medicalReports' && Array.isArray(value)) {
        value.forEach((file: File) => formData.append('medicalReports', file));
      } else if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !['weight', 'systolic', 'diastolic', 'glucose'].includes(key)
      ) {
        formData.append(key, value as string);
      }
    });

    const toastId = toast.loading('Updating patient profile...');

    try {
      await updatePatient({id, formData}).unwrap();

      if (insightData?.data?.id) {
        await updateAiInsight({
          patientId: id as string,
          insightsId: insightData.data.id,
          data: {
            weight: formValues.weight,
            bloodPressure: `${formValues.systolic}/${formValues.diastolic}`,
            bloodGlucose: formValues.glucose,
          },
        }).unwrap();
      }

      toast.success('Patient profile updated successfully!', {id: toastId});
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update profile', {
        id: toastId,
      });
    }
  };

  if (isLoading) return <p>Loading patient data...</p>;

  return (
    <div className="mx-auto p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 ">
        <AppButton
          label="Back to Patient profile"
          icon={<ArrowLeft />}
          textColor="text-background"
          onClick={() => router.back()}
          className="hover:bg-secondary/80"
        />
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            className="bg-secondary text-background hover:bg-secondary"
            onClick={handleSubmit(onSubmit)}
            disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Apply Changes'}
          </Button>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <Controller
          name="profilePhoto"
          control={control}
          render={({field}) => (
            <AvatarUpload value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({field}) => (
            <InputField
              label="Full Name *"
              placeholder="Enter full name"
              value={field.value}
              onChange={field.onChange}
              error={errors.name?.message}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="relationship"
            control={control}
            render={({field}) => (
              <InputField
                label="Relationship *"
                placeholder="Father / Mother / Self"
                value={field.value}
                onChange={field.onChange}
                error={errors.relationship?.message}
              />
            )}
          />
          <Controller
            name="mobileNumber"
            control={control}
            render={({field}) => (
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

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="gender"
            control={control}
            render={({field}) => (
              <SelectField
                label="Gender"
                value={field.value}
                onChange={field.onChange}
                options={['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']}
                error={errors.gender?.message}
              />
            )}
          />
          <Controller
            name="bloodGroup"
            control={control}
            render={({field}) => (
              <SelectField
                label="Blood Type"
                value={field.value}
                onChange={field.onChange}
                options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
                error={errors.bloodGroup?.message}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="weight"
            control={control}
            render={({field}) => (
              <InputField
                label="Weight (KG)"
                placeholder="Enter Weight"
                value={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="glucose"
            control={control}
            render={({field}) => (
              <InputField
                label="Blood Glucose (mmol/L)"
                placeholder="Enter Blood Glucose"
                value={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="systolic"
            control={control}
            render={({field}) => (
              <InputField
                label="Blood Pressure - Systolic"
                placeholder="e.g. 120"
                value={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="diastolic"
            control={control}
            render={({field}) => (
              <InputField
                label="Blood Pressure - Diastolic"
                placeholder="e.g. 80"
                value={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <Controller
          name="medicalConditions"
          control={control}
          render={({field}) => (
            <TextareaField
              label="Medical Conditions"
              placeholder="Conditions & symptoms"
              value={field.value}
              onChange={field.onChange}
              error={errors.medicalConditions?.message}
            />
          )}
        />

        <Controller
          name="medicalHistory"
          control={control}
          render={({field}) => (
            <TextareaField
              label="Medical History"
              placeholder="Previous medical history"
              value={field.value}
              onChange={field.onChange}
              error={errors.medicalHistory?.message}
            />
          )}
        />

        <Controller
          name="medicalReports"
          control={control}
          render={({field}) => (
            <UploadFile value={field.value} onChange={field.onChange} />
          )}
        />
      </form>
    </div>
  );
}

/* InputField, TextareaField, SelectField same as before */

/* Input Field */

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
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
          error ? 'border-red-500' : ''
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* Textarea */

function TextareaField({label, placeholder, value, onChange, error}: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <textarea
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none resize-none h-20 focus:ring-1 ${
          error ? 'border-red-500' : ''
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* Select */

function SelectField({label, value, onChange, options, error}: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
          error ? 'border-red-500' : ''
        }`}>
        <option value="">Select {label.toLowerCase()}</option>

        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

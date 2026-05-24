/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState} from 'react';
import {z} from 'zod';
import {Card, CardContent, CardTitle} from '@/components/ui/card';
import {toast} from 'sonner'; // or whatever toast lib you use
import {useRouter} from 'next/navigation';
import Image from 'next/image';

import {
  FormData as RegistrationData,
  FormStep,
  initialFormData,
} from '@/types/Register.types';
import {
  step1Schema,
  otpStepSchema,
  step2Schema,
  step3Schema,
} from '@/validation/register/register.validation';

import Step1 from '@/components/auth/register/Step1';
import Step2OTP from '@/components/auth/register/OtpStep';
import Step2 from '@/components/auth/register/Step2';
import Step3 from '@/components/auth/register/Step3';
import Step4 from '@/components/auth/register/Step4';
import {
  useRegisterMutation,
  useVerifyEmailMutation,
} from '@/redux/features/auth/auth.api';
import {useAddPatientProfileMutation} from '@/redux/api/patient.api';
import {useAddBookingMutation} from '@/redux/api/booking.api';
import {setUser, TUser} from '@/redux/features/auth/authSlice';
import {verifyToken} from '@/utils/verifyToken';
import {useAppDispatch} from '@/redux/hooks';

type Errors = Partial<Record<keyof RegistrationData, string>>;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<RegistrationData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});

  // API hooks
  const [register, {isLoading: isRegistering}] = useRegisterMutation();
  const [verifyEmail, {isLoading: isOtpLoading}] = useVerifyEmailMutation();
  const dispatch = useAppDispatch();

  const updateField = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({...prev, [field]: value}));
    // Clear error for this field when user types/selects
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const [addPatientProfile, {isLoading: isAddingPatient}] =
    useAddPatientProfileMutation();

  const [addBooking, {isLoading: isBooking}] = useAddBookingMutation();

  /** Step validation */
  const validateStep = () => {
    setErrors({});
    let schema: z.ZodSchema<any>;
    let partialData: Partial<RegistrationData> = {};

    switch (step) {
      case 1:
        schema = step1Schema;
        partialData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        break;

      case 2:
        schema = otpStepSchema;
        partialData = {otp: formData.otp};
        break;

      case 3:
        schema = step2Schema;
        partialData = {
          patientName: formData.patientName,
          relationship: formData.relationship,
          dateOfBirth: formData.dateOfBirth,
          mobileNumber: formData.mobileNumber,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          address: formData.address,
          medicalConditions: formData.medicalConditions,
          medicalHistory: formData.medicalHistory,
        };
        break;

      case 4:
        schema = step3Schema;
        partialData = {
          serviceType: formData.serviceType,
          indication: formData.indication,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
        };
        break;

      default:
        return true;
    }

    console.log('Validating step:', step);
    const result = schema.safeParse(partialData);
    if (!result.success) {
      console.log(
        'Validation failed for step:',
        step,
        result.error.flatten().fieldErrors,
      );
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Errors = {};
      Object.entries(fieldErrors).forEach(([key, val]) => {
        newErrors[key as keyof RegistrationData] = (val as string[])[0];
      });
      setErrors(newErrors);
      return false;
    }
    console.log('Validation success for step:', step);
    return true;
  };

  /** Step 1 API call: register account + send OTP */
  const handleStep1 = async () => {
    if (!validateStep()) return;

    const toastId = toast.loading('Creating account... Please wait.');
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      console.log(result);

      toast.success('Account created! OTP sent to your email.', {id: toastId});
      setStep(2);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || 'Registration failed', {
        id: toastId,
      });
    }
  };

  /** Step 2 API call: verify OTP */
  const handleVerifyOtp = async () => {
    if (!validateStep()) return;

    const toastId = toast.loading('Verifying OTP...');
    try {
      const result = await verifyEmail({
        email: formData.email,
        code: formData.otp!,
      }).unwrap();

      console.log(result);

      if (result?.success) {
        const user = verifyToken(result.data.token) as TUser;
        dispatch(setUser({user, token: result.data.token}));

        toast.success('OTP verified!', {id: toastId});
      }

      setStep(3);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.error?.message || 'OTP verification failed', {
        id: toastId,
      });
    }
  };

  // Create patient profile
  const handleStep3 = async () => {
    if (!validateStep()) return;

    const toastId = toast.loading('Saving patient details...');
    try {
      // Create FormData to match AddPatientModal pattern
      const payload = new FormData();
      payload.append('name', formData.patientName); // Mapping patientName to name
      payload.append('relationship', formData.relationship);
      payload.append('dateOfBirth', formData.dateOfBirth);
      if (formData.mobileNumber)
        payload.append('mobileNumber', formData.mobileNumber);
      payload.append('gender', formData.gender);
      if (formData.bloodGroup)
        payload.append('bloodGroup', formData.bloodGroup);
      if (formData.address)
        payload.append('address', JSON.stringify(formData.address));
      if (formData.medicalConditions)
        payload.append('medicalConditions', formData.medicalConditions);
      if (formData.medicalHistory)
        payload.append('medicalHistory', formData.medicalHistory);
      if (formData.profilePhoto)
        payload.append('profilePhoto', formData.profilePhoto);

      const result = await addPatientProfile(payload).unwrap();

      console.log('Step 3 API result:', result);
      if (result) {
        toast.success('Patient details saved successfully!', {id: toastId});

        setStep((s) => (s + 1) as FormStep);
      }

      // Move to Step 4
    } catch (err: any) {
      console.error('Step 3 API error:', err);
      toast.error(err?.data?.message || 'Failed to save patient details', {
        id: toastId,
      });
    }
  };

  const handleStep4 = async () => {
    console.log('Step 4: Starting handleStep4');
    if (!validateStep()) return;

    const toastId = toast.loading('Saving care details...');
    try {
      const payload = {
        serviceId: formData.serviceType,
        scheduledDate: new Date(formData.preferredDate).toISOString(),
        preferredTime: formData.preferredTime,
        symptomsDescription: formData.indication,
      };

      const res = await addBooking(payload).unwrap();
      const bookingId = res?.data?.id || res?.id; // adapt depending on API response structure
      console.log('Booking ID:', bookingId);

      toast.success('Booking details saved successfully!', {id: toastId});

      // Optionally, update the URL query param without reloading
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('bookingId', bookingId);
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);

      setStep((s) => (s + 1) as FormStep); // Move to Step 5
    } catch (err: any) {
      console.error('Step 4 API error:', err);
      toast.error(err?.data?.message || 'Failed to save care details', {
        id: toastId,
      });
    }
  };

  /** Step navigation for non-API steps */
  // const nextStep = () => {
  //   if (step === 1) return handleStep1();
  //   if (step === 2) return handleVerifyOtp();
  //   if (step === 3) return handleStep3();
  //   if (step === 4) return handleStep4();
  //   if (validateStep() && step < 5) setStep((s) => (s + 1) as FormStep);
  // };

  const nextStep = () => {
    console.log('Moving to next step. Current step:', step);
    switch (step) {
      case 1:
        console.log('Executing handleStep1');
        return handleStep1();

      case 2:
        console.log('Executing handleVerifyOtp');
        return handleVerifyOtp();

      case 3:
        console.log('Executing handleStep3');
        return handleStep3();

      case 4:
        console.log('Executing handleStep4');
        return handleStep4();

      default:
        console.log('Executing default nextStep logic');
        if (validateStep() && step < 5) {
          setStep((prev) => (prev + 1) as FormStep);
        }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as FormStep);
  };

  /** Final submission on Step 5 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    const toastId = toast.loading('Submitting registration...');
    try {
      // You can call a final API to save remaining data
      // const result = await register(formData).unwrap(); // or a final endpoint

      toast.success('Registration complete!', {id: toastId});
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Registration failed', {id: toastId});
    }
  };

  const steps = [
    'Fill Required Fields',
    'Email Verification',
    'Patient Details',
    'Care Details',
    'Confirm Details',
  ];

  const stepImages = [
    '/image/auth/register/step1.jpg',
    '/image/auth/register/step1.jpg',
    '/image/auth/register/step2.jpg',
    '/image/auth/register/step3.jpg',
    '/image/auth/register/step4.jpg',
  ];

  return (
    <section className="min-h-screen bg-gray-50/50 flex items-center justify-center">
      <Card className="w-full py-0 border shadow-xl overflow-hidden">
        {/* Hero image header */}
        <div className="w-full px-0">
          <Image
            src={stepImages[step - 1]}
            height={2000}
            width={2000}
            alt={`Step ${step} image`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Step indicator */}
          <div className="relative mb-12 flex justify-between">
            {/* Background line for steps */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 z-0" />

            {/* Active/Completed line overlay */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-500 ease-in-out z-0"
              style={{width: `${((step - 1) / (steps.length - 1)) * 100}%`}}
            />

            {steps.map((label, index) => {
              const num = index + 1;
              const isActive = num === step;
              const isCompleted = num < step;

              return (
                <div
                  key={num}
                  className="relative z-10 flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300
                      ${
                        isActive
                          ? 'bg-secondary border-secondary text-white scale-110 shadow-lg shadow-secondary/20'
                          : isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                    {isCompleted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      num
                    )}
                  </div>
                  <span
                    className={`hidden md:block text-xs mt-1 text-center transition-colors duration-300
                    ${isActive ? 'text-secondary font-semibold' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <CardTitle className="text-2xl md:text-3xl font-bold text-center mb-2">
            {steps[step - 1]}
          </CardTitle>

          <p className="text-center text-muted-foreground mb-8">
            {step === 1 && 'Tell us about yourself'}
            {step === 2 && 'Verify your email with the OTP sent to you'}
            {step === 3 && 'Details about who will receive care'}
            {step === 4 && 'What type of care is needed?'}
            {step === 5 && 'Confirm your details before submission'}
          </p>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <Step1
                  formData={formData}
                  updateField={updateField}
                  errors={errors}
                  nextStep={nextStep}
                  goToOtp={() => setStep(2)}
                  isRegistering={isRegistering}
                />
              )}
              {step === 2 && (
                <Step2OTP
                  formData={formData}
                  updateField={updateField}
                  errors={errors}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  isOtpLoading={isOtpLoading}
                />
              )}
              {step === 3 && (
                <Step2
                  formData={formData}
                  updateField={updateField}
                  errors={errors}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  isLoading={isAddingPatient}
                />
              )}
              {step === 4 && (
                <Step3
                  formData={formData}
                  updateField={updateField}
                  errors={errors}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  isLoading={isBooking}
                />
              )}
              {step === 5 && (
                <Step4
                  formData={formData}
                  updateField={updateField}
                  errors={errors}
                  prevStep={prevStep}
                  // handleSubmit={handleSubmit}
                />
              )}
            </form>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}

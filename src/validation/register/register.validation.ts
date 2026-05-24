// app/lib/validation/registerSchema.ts
import {z} from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),

  patientName: z.string().min(1, 'Patient name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  mobileNumber: z.string().optional(),
  gender: z.string().min(1, 'Gender is required'),
  bloodGroup: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      area: z.string().optional(),
    })
    .optional(),
  medicalConditions: z.string().optional(),
  medicalHistory: z.string().optional(),

  serviceType: z.string().min(1, 'Service type is required'),
  indication: z.string().min(1, 'Description of symptoms is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),

  paymentMethod: z.string().min(1, 'Payment method is required'),
});

// Step-wise schemas
export const step1Schema = registerSchema
  .pick({
    name: true,
    email: true,
    phone: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const otpStepSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must be numeric'),
});

export const step2Schema = registerSchema.pick({
  patientName: true,
  relationship: true,
  dateOfBirth: true,
  mobileNumber: true,
  gender: true,
  bloodGroup: true,
  address: true,
  medicalConditions: true,
  medicalHistory: true,
});

export const step3Schema = registerSchema.pick({
  serviceType: true,
  indication: true,
  preferredDate: true,
  preferredTime: true,
});

export const step4Schema = registerSchema.pick({
  paymentMethod: true,
});

import {z} from 'zod';

export const patientSchema = z.object({
  name: z.string().nonempty('Please enter full name'),
  relationship: z.string().nonempty('Please enter relationship'),
  dateOfBirth: z.string().nonempty('Please enter your date of birth'),
  mobileNumber: z.string().optional(),
  gender: z
    .string()
    .nonempty('Please select gender')
    .refine(
      (val) => ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'].includes(val),
      {message: 'Please select gender'},
    ),

  bloodGroup: z.string().optional(),
  medicalConditions: z.string().optional(),
  medicalHistory: z.string().optional(),
  profilePhoto: z.any().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      area: z.string().optional(),
    })
    .optional(),
  medicalReports: z.any().optional(),
});

export const patientSchemaEdit = z.object({
  name: z.string().nonempty('Please enter full name'),
  relationship: z.string().nonempty('Please enter relationship'),
  mobileNumber: z.string().optional(),
  gender: z
    .enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'], {
      message: 'Please select gender',
    })
    .or(z.literal(''))
    .optional(),
  bloodGroup: z.string().optional(),
  medicalConditions: z.string().optional(),
  medicalHistory: z.string().optional(),
  profilePhoto: z.any().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      area: z.string().optional(),
    })
    .optional(),
  medicalReports: z.any().optional(),
  weight: z.string().optional(),
  systolic: z.string().optional(),
  diastolic: z.string().optional(),
  glucose: z.string().optional(),
});

import {z} from 'zod';

export const bookingSchema = z.object({
  serviceId: z.string().nonempty('Service is required'),

  scheduledDate: z.string().nonempty('Date is required'),

  preferredTime: z.string().nonempty('Time is required'),

  symptomsDescription: z
    .string()
    .nonempty('Symptoms description is required')
    .min(5, 'Minimum 5 characters required'),
});

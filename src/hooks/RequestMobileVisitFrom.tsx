"use client"
import { Calendar, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitMobileVisitRequestMutation } from '@/redux/api/public.api';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  patientName: z.string().min(1, 'Patient/Group name is required'),
  location: z.string().min(1, 'Location is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  concern: z.string().min(1, 'Primary concern is required'),
})

type FormValues = z.infer<typeof formSchema>

const RequestMobileVisitFrom = () => {
  const [submitRequest, { isLoading }] = useSubmitMobileVisitRequestMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: '',
      location: '',
      preferredDate: '',
      timeSlot: '',
      concern: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await submitRequest(data).unwrap()
      if (res.success) {
        toast.success(res.message || "Request submitted successfully")
        form.reset()
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit request. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Patient Name & Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Patient/Group Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="e.g. John Doe or TechCorp Office"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Location</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="Enter Your Location"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Preferred Date & Time Slot Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Preferred Date</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="date"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Preferred Time Slot</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none appearance-none"
                  >
                    <option value="" disabled>Select time slot</option>
                    <option value="Morning">Morning (8:00 - 12:00)</option>
                    <option value="Afternoon">Afternoon (12:00 - 16:00)</option>
                    <option value="Evening">Evening (16:00 - 20:00)</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Primary Concern */}
        <FormField
          control={form.control}
          name="concern"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Primary Concern</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={4}
                  placeholder="Briefly describe your medical need..."
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-secondary hover:bg-secondary text-white font-bold text-base rounded-2xl transition-colors shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1)] flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Requesting...
            </>
          ) : (
            "Request Mobile Visit"
          )}
        </button>
      </form>
    </Form>
  );
};

export default RequestMobileVisitFrom;

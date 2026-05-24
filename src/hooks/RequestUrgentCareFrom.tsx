/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSubmitUrgentCareRequestMutation } from "@/redux/api/public.api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const formSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  phoneNumber: z.string()
    // .min(10, "Phone number must be at least 10 digits")
    // .max(15, "Phone number is too long")
    .regex(/^[0-9+]+$/, "Invalid phone number"),
  symptom: z.string().min(1, "Please select a symptom"),
  location: z.string().min(1, "Location is required"),
  urgency: z.enum(["as-soon-as-possible", "within-4-hours"]),
})

type FormValues = z.infer<typeof formSchema>

const RequestUrgentCareFrom = () => {
  const [submitRequest, { isLoading }] = useSubmitUrgentCareRequestMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      phoneNumber: "",
      symptom: "",
      location: "",
      urgency: "as-soon-as-possible",
    },
  })

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    try {
      const res = await submitRequest(data).unwrap()
      if (res.success) {
        toast.success("Urgent Care Request Submitted Successfully!")
        form.reset()
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit request. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name & Symptom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="patientName" className="text-gray-700 text-sm font-bold">
                  Patient Name
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    id="patientName"
                    placeholder="Who needs help?"
                    className="bg-slate-100 border-gray-200 rounded-2xl focus:ring-0 focus:border-gray-300 h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symptom"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="symptom" className="text-gray-700 text-sm font-bold">
                  Main Symptom / Chief Complaint
                </Label>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-slate-100 border-gray-200 rounded-2xl focus:ring-0 focus:border-gray-300 h-12">
                      <SelectValue placeholder="Select main symptom " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cough">Cough or Difficulty Breathing</SelectItem>
                    <SelectItem value="stomach">Stomach Pain, Diarrhea or Vomiting</SelectItem>
                    <SelectItem value="wound">Minor Cut, Wound or Injury</SelectItem>
                    <SelectItem value="headache">Headache or Dizziness</SelectItem>
                    <SelectItem value="skin">Skin Rash or Infection</SelectItem>
                    <SelectItem value="infection">General Infection / Body Weakness</SelectItem>
                    <SelectItem value="pain">General Body Pain or Back Pain</SelectItem>
                    <SelectItem value="other">Other / Not listed above</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-700 text-sm font-bold">
                Phone Number
              </Label>
              <FormControl>
                <div className="relative w-full h-12">
                  <PhoneInput
                    country={'gh'}
                    value={field.value}
                    onChange={(phone) => field.onChange(`+${phone}`)}
                    inputClass="!w-full !h-12 !text-base !rounded-2xl !border-gray-200 !bg-slate-100 !focus:ring-0 !focus:border-gray-300 !pl-14"
                    buttonClass="!border-gray-200 !rounded-l-2xl !bg-transparent !h-12 !border-r-0 !px-2"
                    containerClass="!w-full !h-12"
                    dropdownClass="!text-sm"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="location" className="text-gray-700 text-sm font-bold">
                Location
              </Label>
              <FormControl>
                <Input
                  {...field}
                  id="location"
                  placeholder="Street name, landmark, or city"
                  className="bg-slate-100 border-gray-200 rounded-2xl focus:ring-0 focus:border-gray-300 h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Urgency Level */}
        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label className="text-gray-700 text-sm font-bold">Urgency Level</Label>
              <FormControl>
                <div className="flex rounded-2xl bg-slate-100 overflow-hidden">
                  <Button
                    type="button"
                    variant={field.value === "as-soon-as-possible" ? "default" : "ghost"}
                    className={`flex-1 h-12 rounded-none text-sm font-bold ${field.value === "as-soon-as-possible"
                      ? "bg-white text-orange-400 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),_0_1px_3px_0_rgba(0,0,0,0.1)]"
                      : "text-gray-500 hover:bg-slate-200"
                      }`}
                    onClick={() => field.onChange("as-soon-as-possible")}
                  >
                    As soon as possible
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "within-4-hours" ? "default" : "ghost"}
                    className={`flex-1 h-12 rounded-none text-sm font-bold ${field.value === "within-4-hours"
                      ? "bg-white text-orange-400 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),_0_1px_3px_0_rgba(0,0,0,0.1)]"
                      : "text-gray-500 hover:bg-slate-200"
                      }`}
                    onClick={() => field.onChange("within-4-hours")}
                  >
                    Within 4 hours
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-orange-400 hover:bg-orange-500 text-white text-xl font-black rounded-2xl shadow-[0_8px_10px_-6px_rgba(28,57,142,0.2),_0_20px_25px_-5px_rgba(28,57,142,0.2)] transition-all flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request now"
          )}
        </Button>
      </form>
    </Form>
  )
}

export default RequestUrgentCareFrom
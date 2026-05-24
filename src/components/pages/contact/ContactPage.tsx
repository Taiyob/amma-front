"use client";

import { Mail, Phone } from "lucide-react";
import { useSubmitContactFormMutation } from "@/redux/api/public.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [submitContact, { isLoading }] = useSubmitContactFormMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading("Sending your message...");
    try {
      await submitContact(data).unwrap();
      toast.success("Message sent successfully!", { id: toastId });
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Headline + Contact Cards */}
          <div className="space-y-10">
            {/* Header */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-muted text-secondary text-xs font-bold uppercase tracking-wide">
                Get in Touch
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 font-inter leading-[1.2]">
                We’re here to help you, <br />
                whenever you need us.
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-inter leading-relaxed max-w-lg">
                Have questions about our care services? Our team is ready to provide the answers and support you need to make the best decisions for your family.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-900">Email Us</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Our team typically responds within 2 hours.
                  </p>
                  <a
                    href="mailto:info@mojacares.com"
                    className="mt-2 inline-block text-orange-500 font-medium hover:text-orange-600 transition-colors"
                  >
                    info@mojacares.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-900">Call Us</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Mon–Fri from 8am to 5pm.
                  </p>
                  {/* <a
                    href="tel:+15550000000"
                    className="mt-2 inline-block text-orange-500 font-medium hover:text-orange-600 transition-colors"
                  >
                    +1 (555) 000-0000
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-inter">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName", { required: "First name is required" })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName", { required: "Last name is required" })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", { 
                      required: "Message is required",
                      minLength: { value: 10, message: "Message must be at least 10 characters" }
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-secondary hover:bg-secondary/90 disabled:opacity-70 text-white font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
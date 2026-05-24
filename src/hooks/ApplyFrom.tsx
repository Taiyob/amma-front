/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAddApplyMutation } from "@/redux/api/apply.api";
import { useState } from "react";
import { toast } from "sonner";

const ApplyFrom = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        location: '',
        link: '',
        message: '',
        resume: '',
    });

    const [addApply, { isLoading }] = useAddApplyMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payLoad = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            roleOfInterest: formData.role,
            location: formData.location.trim(),
            cvUrl: formData.resume.trim() || undefined,
            linkedinOrPortfolioUrl: formData.link.trim() || undefined,
            aboutYourself: formData.message.trim(),
        }
        if (!payLoad.name || !payLoad.email || !payLoad.roleOfInterest) {
            toast.error('Please fill all the required fields');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payLoad.email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        try {
            const res = await addApply(payLoad).unwrap();
            if (res.success) {
                toast.success("Message Sent Successfully!");
                setFormData({
                    name: '',
                    email: '',
                    role: '',
                    location: '',
                    link: '',
                    message: '',
                    resume: '',
                });
            }
        } catch (error: any) {
            const errorMsg = error?.data?.message
                || error?.message
                || "Failed to submit application. Please try again.";

            toast.error(errorMsg);
            console.error("Apply error:", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="you@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">Role of interest</label>
                    <div className="relative">
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none pr-10"
                        >
                            <option value="">Select a role</option>
                            <option value="care-coordinator">Care Coordinator</option>
                            <option value="rn-nurse">RN / Nurse</option>
                            <option value="doctor">Doctor</option>
                            <option value="driver">Driver</option>
                            <option value="ops-lead">Clinical Ops Lead</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="City, State/Country"
                    />
                </div>

                <div>
                    <label htmlFor="link" className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn / Portfolio (optional)</label>
                    <input
                        id="link"
                        name="link"
                        type="url"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="https://linkedin.com/in/... or https://..."
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Tell us about you</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                        placeholder="Why are you interested in Mojacares? Include availability, service area, and home/mobile visit comfort."
                    />
                </div>

                <div>
                    <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-1">Resume / CV link (optional)</label>
                    <input
                        id="resume"
                        name="resume"
                        type="url"
                        value={formData.resume}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="Link to a PDF (Google Drive/Dropbox/etc.)"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full cursor-pointer py-3 font-semibold rounded-md transition-colors text-white
                        ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-secondary hover:bg-orange-600"
                        }`}
                >
                    {isLoading ? "Submitting..." : "Submit Application"}
                </button>

                <div className="pt-4 text-center text-xs text-gray-500">
                    Prefer email? Send your resume + note to{' '}
                    <a href="mailto:careers@mojacares.com" className="text-teal-700 font-medium underline">
                        careers@mojacares.com
                    </a>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-700">
                    <strong>Privacy note:</strong> Please do not include sensitive medical information in your application.
                </div>
            </form>
        </div>
    )
}

export default ApplyFrom
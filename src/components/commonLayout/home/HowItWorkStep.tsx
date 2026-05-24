import React from 'react';
import {Upload, Sparkles, Stethoscope, Bell} from 'lucide-react';
import SectionHeading from '@/components/reUseAbleComponents/SectionHeading';
import StepCard from '@/app/(commonLayout)/aiinsight/_components/StepCard';

const steps = [
  {
    title: 'Upload',
    description:
      "Send us lab results, medical reports, or doctor's notes via our secure portal. Take a photo, scan, or upload PDFs—we accept all formats.",
    icon: <Upload className="text-white w-6 h-6" />,
  },
  {
    title: 'Generate',
    description:
      'Our AI analyzes your documents, extracting key health data and comparing it against medical guidelines to identify what matters most.',
    icon: <Sparkles className="text-white w-6 h-6" />,
  },
  {
    title: 'Review',
    description:
      'A licensed medical professional reviews the AI insights to ensure accuracy and adds clinical context where needed.',
    icon: <Stethoscope className="text-white w-6 h-6" />,
  },
  {
    title: 'Monitor',
    description:
      'Receive ongoing alerts for follow-ups, trend changes, and important health milestones. Stay informed, stay ahead.',
    icon: <Bell className="text-white w-6 h-6" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F8F8F8] py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <SectionHeading
          title="How it works"
          subTitle="From upload to insight in minutes. Simple, fast, and secure."
        />
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

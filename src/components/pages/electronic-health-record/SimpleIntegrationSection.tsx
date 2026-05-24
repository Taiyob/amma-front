import { Upload, FolderSync, TrendingUp } from "lucide-react";
import Image from "next/image";

export function SimpleIntegrationSection() {
  const steps = [
    {
      number: 1,
      title: "Upload",
      description: "Take a photo or upload your PDF records.",
      icon: <Upload className="w-6 h-6 text-white" />,
    },
    {
      number: 2,
      title: "Organize",
      description: "Mojacares automatically categorizes them by date and type.",
      icon: <FolderSync className="w-6 h-6 text-white" />,
    },
    {
      number: 3,
      title: "Monitor",
      description: "Track your family’s health trends and share with your care team.",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text & Steps */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 leading-tight font-inter">
                Simple 3-Step<br />Integration
              </h2>
              <p className="text-lg text-slate-500 font-inter leading-relaxed">
                Getting started with Mojacares is as easy as 1-2-3. No technical knowledge required.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-6">
                  {/* Step Number + Icon Container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center">
                      {step.icon}
                    </div>
                    {/* White circle with number (floating top-right) */}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-slate-900"> {step.number} </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-slate-900 font-playfair-display leading-7 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-base text-slate-500 font-inter leading-6">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/image/pagesimage/electronic-health-record/ai-record.png" // ✅ Replace with your actual image
                alt="Mobile app showing health dashboard with graphs and metrics"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
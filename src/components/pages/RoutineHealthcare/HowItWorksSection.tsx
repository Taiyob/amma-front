import {  Calendar, Zap, User, FileText } from "lucide-react";

const steps = [
  {
    icon: <Calendar className="h-6 w-6 text-orange-400" />,
    title: "Request",
    description: "You book the service and provide patient details via our platform.",
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    title: "Coordination",
    description: "Our clinical team calls you to finalize the schedule and specific requirements.",
  },
  {
    icon: <User className="h-6 w-6 text-orange-400" />,
    title: "Home Visit",
    description: "A certified nurse or doctor visits the address at the scheduled time.",
  },
  {
    icon: <FileText className="h-6 w-6 text-orange-400" />,
    title: "Digital Report",
    description: "Access the full medical report instantly via your dashboard and email.",
  },
];

export function HowItWorksSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-sky-950 font-inter">How It Works</h2>
        <p className="mt-3 text-sm text-sky-950/70 max-w-xl mx-auto font-inter">
          Transparent and simple care process from booking to report.
        </p>
      </div>

      {/* Steps Timeline */}
      <ol className="relative space-y-12">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start">
            {/* Connector line (except last item) */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-8 h-full w-0.5 bg-orange-400/50" />
            )}

            {/* Step indicator */}
            <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 border-orange-400/50 flex items-center justify-center bg-white">
              {step.icon}
            </div>

            {/* Step content */}
            <div className="ml-8 flex-1">
              <h3 className="text-xl font-bold text-sky-950 mb-2 font-poppins">{step.title}</h3>
              <p className="text-sm text-sky-950/60 leading-relaxed font-inter">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
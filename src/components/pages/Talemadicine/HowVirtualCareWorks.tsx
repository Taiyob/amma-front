import { Stethoscope, CalendarDays, Video, Phone } from "lucide-react";

const steps = [
  {
    icon: <Stethoscope className="h-8 w-8 text-slate-900" />,
    title: "Select a Specialty",
    description: "Choose a doctor according to your health needs.",
    step: "01",
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-slate-900" />,
    title: "Pick a Time",
    description: "Book a slot that fits your schedule perfectly.",
    step: "02",
  },
  {
    icon: <Phone className="h-8 w-8 text-slate-900" />,
    title: "Start the Call",
    description: "Join via a secure link from any device.",
    step: "03",
  },
];

export function HowVirtualCareWorks() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            How Virtual Care Works
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Getting professional medical help is easier than ever.
            Connect with a specialist in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-slate-900/5 flex items-center justify-center mb-6 transition group-hover:bg-slate-900/10">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Step number */}
              <span className="text-foreground  font-bold text-base">
                {step.step}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
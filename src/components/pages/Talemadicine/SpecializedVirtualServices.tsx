import { 
  Stethoscope, 
  HeartPulse, 
  Brain, 
  Baby 
} from "lucide-react";

const services = [
  {
    icon: <Stethoscope className="h-6 w-6 text-slate-900" />,
    title: "General Consultation",
    description: "Cold, fever or general health issues.",
    linkText: "Learn More",
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-slate-900" />,
    title: "Chronic Management",
    description: "Diabetes or blood pressure follow-ups.",
    linkText: "Learn More",
  },
  {
    icon: <Brain className="h-6 w-6 text-slate-900" />,
    title: "Mental Health",
    description: "Professional stress and anxiety support.",
    linkText: "Learn More",
  },
  {
    icon: <Baby className="h-6 w-6 text-slate-900" />,
    title: "Pediatrics",
    description: "Healthcare advice for your children.",
    linkText: "Learn More",
  },
];

export function SpecializedVirtualServices() {
  return (
    <div className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 font-inter">
            Specialized Virtual Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Icon container */}
              <div className="p-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mb-6">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-inter">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 font-inter leading-relaxed">
                  {service.description}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { 
  HeartPulse,
  Stethoscope,
  Activity,
  Bandage,
  BookOpen,
} from "lucide-react";

const services = [
  {
    icon: <HeartPulse className="h-6 w-6 text-orange-500" />,
    title: "Basic Assessments",
    description: "Vital sign checks including BP, Pulse, and Blood Sugar monitoring.",
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-orange-500" />,
    title: "Sick Visits",
    description: "Prompt care for common fevers, colds, or acute infections.",
  },
  {
    icon: <Activity className="h-6 w-6 text-orange-500" />,
    title: "Chronic Monitoring",
    description: "Professional follow-up for diabetes and high blood pressure.",
  },
  {
    icon: <Bandage className="h-6 w-6 text-orange-500" />,
    title: "Wound Care",
    description: "Expert dressing and clinical treatment of minor injuries.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-orange-500" />,
    title: "Health Education",
    description: "Personalized lifestyle coaching and preventive care advice.",
  },
];

export function ServicesOnWheels() {
  return (
    <div className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-inter">
            Services Offered on Wheels
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl font-inter">
            Comprehensive clinical services delivered in our modern mobile units, ensuring quality care without the hospital queue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <article
              key={index}
              className="bg-background rounded-2xl border-2 
                         shadow-sm p-6 flex items-start gap-4 
                         hover:border-red-500 hover:shadow-xl hover:-translate-y-1 
                         transition-all duration-300 cursor-pointer group"
            >
              {/* Icon container */}
              <div className="p-3 bg-stone-50 rounded-lg shrink-0 
                              group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-zinc-900 mb-1 font-inter 
                                transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-inter leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
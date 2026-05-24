import { Card, CardContent } from "@/components/ui/card";
import {
  HeartPulse,
  Pill,
  TestTube,
  Activity,
} from "lucide-react";

const pillars = [
  {
    icon: <HeartPulse className="h-6 w-6 text-orange-400" />,
    title: "Wellness Checks",
    description: "Regular health check-ups and monitoring of vitals (BP, Sugar).",
  },
  {
    icon: <Pill className="h-6 w-6 text-orange-400" />,
    title: "Medication Refills",
    description: "Renewal of medication prescriptions and delivery coordination.",
  },
  {
    icon: <TestTube className="h-6 w-6 text-orange-400" />,
    title: "Lab Tests",
    description: "Blood or other test sample collection at home.",
  },
  {
    icon: <Activity className="h-6 w-6 text-orange-400" />,
    title: "Chronic Care",
    description: "Regular follow-up of chronic diseases like diabetes or heart problems.",
  },
];

export function FourPillarsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-sky-950 font-inter">The 4 Pillars of Routine Care</h2>
        <p className="mt-3 text-lg text-sky-950/70 max-w-2xl mx-auto font-poppins">
          Comprehensive solutions tailored for every aspect of your family’s health maintenance.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, index) => (
          <Card
            key={index}
            className="bg-white rounded-2xl   border   hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 group"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              {/* Icon container (white circle with shadow) */}
              <div className="w-14 h-14 rounded-full bg-orange-50   flex items-center justify-center mb-4">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-sky-950 mb-2 font-poppins">{pillar.title}</h3>

              {/* Description */}
              <p className="text-sm text-sky-950/60 leading-relaxed font-poppins">
                {pillar.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
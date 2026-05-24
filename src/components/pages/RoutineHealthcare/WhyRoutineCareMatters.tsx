import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Clock, Heart } from "lucide-react";

const reasons = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-orange-500" />,
    title: "Preventive Care",
    description:
      "Small problems are caught before they become big, expensive health crises.",
  },
  {
    icon: <Clock className="h-6 w-6 text-orange-500" />,
    title: "Zero Disruption",
    description:
      "You don’t have to wait in line for hours at the clinic. Keep earning and living without the commute.",
  },
  {
    icon: <Heart className="h-6 w-6 text-orange-500" />,
    title: "Peace of Mind",
    description:
      "Even if you are away, your parents are getting professional, regular medical care at home.",
  },
];

export function WhyRoutineCareMatters() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Why Routine Care Matters
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="group bg-white border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:border-red-500 hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="flex flex-col items-center text-center p-8">

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-6 transition group-hover:bg-orange-100">
                  {reason.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {reason.description}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
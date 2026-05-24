import {Card, CardContent} from '@/components/ui/card';
import {Phone, Zap, Home} from 'lucide-react';

const steps = [
  {
    icon: <Phone className="h-6 w-6 text-orange-500" />,
    title: 'Request',
    description: 'Fill out the quick form or call us directly.',
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-500" />,
    title: 'Coordinate',
    description: 'Our care coordinator routes a doctor or nurse to you.',
  },
  {
    icon: <Home className="h-6 w-6 text-orange-500" />,
    title: 'Care',
    description: 'Get treated at home or via video call within hours.',
  },
];

export function ThreeStepsToRelief() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Card className=" rounded-3xl p-8 shadow-none border-0">
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Request Care in 3 Steps
          </h2>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center md:items-start bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-transparent hover:border-red-500 transition-all duration-300">
                {/* Icon container */}
                <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-red-50 shadow flex items-center justify-center mb-4 transition">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 text-center md:text-left leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

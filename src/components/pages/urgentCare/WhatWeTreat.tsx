import { Card, CardContent } from "@/components/ui/card";
import {
  Thermometer,
  Scissors,
  Zap,
  HeartPulse,
  Bug,
  Bone,
} from "lucide-react";

const conditions = [
  {
    icon: <Thermometer className="h-5 w-5 text-orange-500" />,
    title: "Fever & Flu symptoms",
  },
  {
    icon: <Scissors className="h-5 w-5 text-orange-500" />,
    title: "Minor cuts or wounds",
  },
  {
    icon: <Zap className="h-5 w-5 text-orange-500" />,
    title: "Stomach pain or vomiting",
  },
  {
    icon: <HeartPulse className="h-5 w-5 text-orange-500" />,
    title: "High blood pressure spikes",
  },
  {
    icon: <Bug className="h-5 w-5 text-orange-500" />,
    title: "Malaria or infection concerns",
  },
  {
    icon: <Bone className="h-5 w-5 text-orange-500" />,
    title: "Sprains or minor fractures",
  },
];

export function WhatWeTreat() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">What We Treat</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Common conditions we can address quickly in your home or via video.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditions.map((item, index) => (
            <Card key={index} className="flex flex-row items-center p-4 border border-transparent rounded-sm shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mr-4">
                {item.icon}
              </div>
              <CardContent className="p-0">
                <h3 className="text-base font-semibold text-gray-800 leading-6">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
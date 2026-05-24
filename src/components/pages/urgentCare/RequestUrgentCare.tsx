"use client"
import { Card, CardContent } from "@/components/ui/card";
import RequestUrgentCareFrom from "@/hooks/RequestUrgentCareFrom";

export function RequestUrgentCare() {

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" id="request-urgent-care">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Headline & Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Request Urgent Care
            </h2>
            <p className="mt-3 text-gray-600 text-base leading-relaxed">
              Fill in these details and our medical dispatch team will contact you within minutes.
            </p>
          </div>

          {/* Highlighted Note */}
          <Card className="bg-orange-400/5 border-l-4 border-orange-400 rounded-tr-2xl rounded-br-2xl p-6">
            <div className="space-y-2">
              <p className="text-orange-400 text-sm font-bold uppercase tracking-wider">
                Available Everywhere
              </p>
              <p className="text-gray-900 text-base font-medium">
                “We provide reliable healthcare support wherever you are, ensuring your loved ones receive timely care and attention.”
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Form */}
        <Card className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(28,57,142,0.1)] border border-gray-200 overflow-hidden">
          <CardContent className="p-8">
               <RequestUrgentCareFrom/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
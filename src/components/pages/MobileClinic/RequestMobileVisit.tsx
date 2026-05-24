import RequestMobileVisitFrom from '@/hooks/RequestMobileVisitFrom';
import { Coffee, Zap, Shield, Map } from 'lucide-react';

export function RequestMobileVisit() {
  return (
    <div className="bg-gray-50 py-16 md:py-20" id="request-mobile-visit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <div className="bg-white rounded-3xl  p-8 md:p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 font-inter">
              Request Mobile Visit
            </h2>

            <RequestMobileVisitFrom />
          </div>

          {/* Right: Why Choose Mozacare? */}
          <div className=" flex flex-col justify-evenly h-full  ">
            <div>
              <h3 className="text-3xl font-bold text-zinc-900 mb-3 font-inter">
                Why choose Mojacares?
              </h3>
              <p className="text-gray-600 font-inter">
                We prioritize your health and your schedule, providing
                world-class medical attention without the typical stress of
                clinical visits.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 ">
              {[
                {
                  icon: <Coffee className="h-6 w-6 text-orange-500" />,
                  title: 'No Lost Work Time',
                  description: 'Maintain productivity while staying healthy.',
                },
                {
                  icon: <Zap className="h-6 w-6 text-orange-500" />,
                  title: 'No Travel Stress',
                  description:
                    'Forget traffic jams or long commutes to the clinic.',
                },
                {
                  icon: <Shield className="h-6 w-6 text-orange-500" />,
                  title: 'Maximum Comfort',
                  description:
                    'Treatment in a familiar, comfortable environment.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white rounded-2xl p-6  shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 mb-1 font-inter">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm font-inter">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}



            </div>

            {/* Service Coverage */}
            <div>
              <div className="bg-secondary rounded-2xl mt-6  p-6 shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-4 ">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Map className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-inter">
                      Service Coverage
                    </p>
                    <p className="text-white text-lg font-semibold font-poppins">
                      Greater Accra & Ashanti Regions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {Card, CardContent} from '@/components/ui/card';
import {Home} from 'lucide-react';

export function ImmediateCareCard() {
  return (
    <div className="mx-auto max-w-7xl pb-8">
      <Card className="relative bg-white rounded-2xl shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden border border-transparent shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 group">
        {/* Decorative semi-transparent circle (right top) */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/50 rounded-full blur-xl" />

        {/* Content */}
        <CardContent className="p-8 md:p-10 relative z-10 ">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Home className="h-7 w-7 text-orange-400" />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-gray-900 leading-8">
                Get immediate care
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-6">
                A nurse or doctor will arrive at your location with medical
                supplies, diagnostics, and hands-on treatment capability.
              </p>

              {/* CTA Link */}
              {/* <div className="mt-6 flex items-center gap-2">
                                <span className="text-orange-400 font-bold text-base">Book Dispatch</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-orange-400"
                                >
                                    <path
                                        d="M13.5 6L10.5 3L7.5 6"
                                        stroke="currentColor"
                                        strokeWidth="1.67"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.5 17V4"
                                        stroke="currentColor"
                                        strokeWidth="1.67"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

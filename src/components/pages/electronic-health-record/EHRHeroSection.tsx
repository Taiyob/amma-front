'use client';
import Image from 'next/image';
import Link from 'next/link';

export function EHRHeroSection() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text & CTAs */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-800 leading-tight font-inter">
                Your family’s health history,
                <br />
                organized
                <br />
                in one secure place.
              </h1>

              <p className="text-xl text-slate-500 max-w-2xl font-inter leading-relaxed">
                Mojacare’s EHR keeps all your lab results, prescriptions, and
                medical records accessible anytime, anywhere.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={'/login'}>
                <button className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Get Started
                </button>
              </Link>
              <button
                onClick={() => {
                  document
                    .getElementById('electric-details')
                    ?.scrollIntoView({behavior: 'smooth'});
                }}
                className="px-8 py-3.5 border-2 border-zinc-200 hover:border-zinc-300 text-zinc-800 font-bold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:ring-offset-2">
                Learn More
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                <span className="text-sm text-slate-500 font-inter">
                  HIPAA Compliant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                <span className="text-sm text-slate-500 font-inter">
                  Bank-Level Encryption
                </span>
              </div>
            </div>
          </div>

          {/* Right: Image + Floating Badge */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative w-full h-89.5 md:h-100 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/image/pagesimage/electronic-health-record/hero-image.png" // ✅ Replace with your actual image path
                alt="Family reviewing health records on tablet"
                fill
                className="object-cover"
                priority
              />
              {/* Optional subtle gradient overlay for depth (optional) */}
              <div className="absolute inset-0 bg-linear-to-l from-blue-950/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating "Health Trends" Badge */}
            <div className="absolute -bottom-6 md:-right-6 -right-4 bg-white rounded-xl shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-zinc-200 p-4 min-w-50">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 font-inter">
                    Health Trends
                  </h3>
                  <p className="text-xs text-slate-500 font-inter">
                    Updated in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

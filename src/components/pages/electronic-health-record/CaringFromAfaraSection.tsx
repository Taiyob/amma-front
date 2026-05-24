import Image from 'next/image';
import {Bell, Users} from 'lucide-react';

export function CaringFromAfaraSection() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative w-full h-125 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/image/commonLayout/landing/unknown1.jpg" // ✅ Replace with your actual image path
                alt="Doctor showing medical records on tablet to elderly patient and family member"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full">
              <div className="shrink-0 w-4 h-4">
                <div className="w-3.5 h-3.5 rounded-sm bg-blue-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
              </div>
              <span className="text-blue-900 text-sm font-medium font-inter">
                Diaspora Special
              </span>
            </div> */}

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 leading-tight font-inter">
              Caring From Afar
            </h2>

            {/* Subheading */}
            <p className="text-lg text-slate-500 font-inter leading-relaxed">
              When your parents visit a doctor in Ghana, you see the updates
              instantly. Review prescriptions and doctor reports the moment they
              are uploaded.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4">
              {/* Real-time Notifications */}
              <div className="p-4 bg-stone-100/50 rounded-xl flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900 font-playfair-display leading-6">
                    Real-time Notifications
                  </h3>
                  <p className="text-sm text-slate-500 font-inter leading-5 mt-1">
                    Get instant alerts when new records are added
                  </p>
                </div>
              </div>

              {/* Family Sharing */}
              <div className="p-4 bg-stone-100/50 rounded-xl flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900 font-playfair-display leading-6">
                    Family Sharing
                  </h3>
                  <p className="text-sm text-slate-500 font-inter leading-5 mt-1">
                    Securely share access with trusted family members
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

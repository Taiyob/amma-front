import { Video, Phone, User } from "lucide-react";
import Image from "next/image";

export function VirtualCareHero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
            <span className="text-emerald-700 text-xs font-bold uppercase">
              Doctors Online Now
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Consult a licensed doctor from the comfort of{" "}
            <span className="text-orange-400">your home.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Skip the waiting room. High-quality virtual care for you and your family in Ghana, available 24/7.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-orange-400 text-white rounded-2xl flex items-center gap-2">
              <Video className="h-5 w-5" />
              Book a Video Consultation
            </button>
            <button className="px-8 py-4 border-2 border-yellow-600 rounded-2xl flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call for Immediate Support
            </button>
          </div> */}
        </div>

        {/* Right Image Card */}
        <div className="relative">
          
          {/* Card */}
          <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border">
            
            {/* ✅ IMAGE FIX */}
            <Image
              src="/image/pagesimage/talemadicine.jpg"
              alt="Home Healthcare Service"
              fill
              priority
              className="object-cover"
            />

            {/* Doctor Status */}
            <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-white text-xs opacity-80">Currently in call with</p>
                <p className="text-white text-sm font-bold">Dr. Kwesi Mensah</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

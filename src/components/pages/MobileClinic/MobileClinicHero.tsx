"use client"
import { User } from "lucide-react";
import Image from "next/image";

// Mock doctor avatars (replace with real data or API)
const teamMembers = [
  { name: "Dr. Kwesi Mensah", role: "General Physician", image: "/image/pagesimage/team/doctor-1.jpg" },
  { name: "Nurse Ama Ofori", role: "Registered Nurse", image: "/image/pagesimage/team/doctor-2.jpg" },
  { name: "Dr. Esi Appiah", role: "Psychologist", image: "/image/pagesimage/team/doctor-3.jpg" },
];

export function MobileClinicHero() {
  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text & CTA */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight font-inter">
              Professional healthcare <br />
              <span className="text-slate-700">delivered to your doorstep.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl font-inter leading-relaxed">
              Our fully-equipped mobile clinics bring expert doctors and nurses to your workplace, school, or community in Ghana. Experience premium care where you are.
            </p>

            <button 
            onClick={() => {
    document
      .getElementById("request-mobile-visit")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Request a Mobile Clinic Visit"
            >
              Request a Mobile Clinic Visit
            </button>
          </div>

          {/* Right: Visual + Team Badge */}
          <div className="relative">
            {/* Main card (mobile clinic illustration placeholder) */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden h-80 md:h-[400px] w-full">
              <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <Image
                  src="/image/pagesimage/health-care.jpg"
                  alt="Mobile clinic delivering care at a community center in Ghana"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Expert Team Badge (bottom-right overlay) */}
            <div className="absolute -bottom-6 md:-right-6 -right-4 bg-white rounded-2xl shadow-md p-4 w-64 border border-gray-100">
              <div className="flex items-center gap-3">
                {/* Team avatars */}
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 3).map((member, idx) => (
                    <div
                      key={idx}
                      className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                      title={member.name}
                    >
                      <Image
                        src={member.image}
                        alt={`${member.name} – ${member.role}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Team info */}
                <div className="min-w-0">
                  <h3 className=" text-sm font-semibold text-slate-900 font-inter">Expert Medical Team</h3>
                  <p className=" text-xs text-slate-500 font-inter">Certified by GHS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Star, User } from "lucide-react";

// Define doctor type
type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  isOnline?: boolean;
  image?: string; // optional — use placeholder if not provided
};

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Kwesi Mensah",
    specialty: "General Physician",
    rating: 4.9,
    isOnline: true,
    image: "/image/our-doctors/doctor-1.jpg",
  },
  {
    id: 2,
    name: "Dr. Ama Serwaa",
    specialty: "Cardiologist",
    rating: 5.0,
    isOnline: true,
    image: "/image/our-doctors/doctor-2.jpg",
  },
  {
    id: 3,
    name: "Dr. Kofi Boateng",
    specialty: "Pediatrician",
    rating: 4.8,
    image: "/image/our-doctors/doctor-3.jpg",
  },
  {
    id: 4,
    name: "Dr. Esi Appiah",
    specialty: "Psychologist",
    rating: 4.9,
    isOnline: true,
    image: "/image/our-doctors/doctor-4.jpg",
  },
];

export function MeetOurDoctors() {
  return (
    <div className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 font-inter">Meet Our Doctors</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm font-inter">
            Connect with highly qualified, certified medical professionals vetted for quality care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),_0_1px_3px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image + Online Badge */}
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                {doctor.isOnline && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-[6px] px-3 py-1 rounded-full shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),_0_1px_3px_0_rgba(0,0,0,0.1)]">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-700 text-[10px] font-bold uppercase tracking-wide font-inter">
                      Online
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-yellow-600 text-xs font-bold font-inter">
                    {doctor.rating}
                  </span>
                </div>

                {/* Name & Specialty */}
                <h3 className="text-lg font-bold text-slate-900 mb-1 font-inter">
                  {doctor.name}
                </h3>
                <p className="text-gray-500 text-xs font-inter mb-4">
                  {doctor.specialty}
                </p>

                {/* CTA */}
                <button
                  className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold rounded-2xl transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
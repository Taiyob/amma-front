import { ShieldCheck, Lock, Eye, UserCircle } from "lucide-react";

export function PrivacyPrioritySection() {
  const badges = [
    { icon: <ShieldCheck className="w-5 h-5 text-blue-900" />, label: "HIPAA Compliant" },
    { icon: <Lock className="w-5 h-5 text-blue-900" />, label: "256-bit Encryption" },
    { icon: <Eye className="w-5 h-5 text-blue-900" />, label: "Secure Access" },
    { icon: <UserCircle className="w-5 h-5 text-blue-900" />, label: "Privacy First" },
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full border border-zinc-200">
            <div className="flex-shrink-0 w-5 h-5">
              <div className="w-3.5 h-4 rounded-sm bg-blue-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="text-blue-900 text-sm font-medium font-inter">Trust & Security</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 text-center leading-tight font-inter mb-6">
          Your Privacy is Our Priority
        </h2>

        {/* Subheading */}
        <p className="text-lg text-slate-500 text-center max-w-3xl mx-auto font-inter leading-relaxed mb-10">
          We use HIPAA-compliant standards to ensure your family’s data remains yours alone. Your medical records are protected with the same level of security used by banks.
        </p>

        {/* Badges Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="px-5 py-3 bg-white rounded-xl shadow-sm border  border-transparent rounded-xl shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300 group border-zinc-200 flex items-center gap-3 transition-all hover:shadow-md"
            >
              {badge.icon}
              <span className="text-sm text-slate-900 font-inter">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
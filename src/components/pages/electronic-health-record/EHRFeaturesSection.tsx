import { FileText, TrendingUp, Shield, Zap } from "lucide-react";

export function EHRFeaturesSection() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-900" />,
      title: "Centralized Records",
      description:
        "No more lost papers. Every lab result and doctor’s note is saved in your digital vault.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-900" />,
      title: "Visual Health Trends",
      description:
        "See your health evolve with clean graphs showing blood pressure, glucose, and more over time.",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-900" />,
      title: "Secure & Private",
      description:
        "Your data is protected with bank-level encryption. You control who sees what.",
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-900" />,
      title: "AI-Enhanced Insights",
      description:
        "Our AI summarizes complex reports into simple, easy-to-understand language.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-neutral-50" id="electric-details">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-800 leading-tight">
            What Makes Our EHR Special
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Designed with families in mind, our electronic health record system
            brings modern healthcare management to your fingertips.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-slate-100 mb-6 transition group-hover:bg-blue-50">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
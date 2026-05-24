const OurCommitment = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Heading + Intro */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Commitment
          </h2>

          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Healthcare is deeply personal, and we approach it with empathy, accountability, and respect for every family we serve.
          </p>
        </div>

        {/* Four Commitment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            { icon: "🌍", title: "Accessibility", text: "Making quality care available to every family, no matter where they are." },
            { icon: "⏰", title: "Responsiveness", text: "Quick, timely support when families need it most." },
            { icon: "👁️", title: "Transparency", text: "Clear communication and full visibility into every step of care." },
            { icon: "❤️", title: "Dignity", text: "Treating every individual and family with the utmost respect and compassion." },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-transparent shadow-md p-8 text-center
                         hover:border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center text-4xl
                              group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3  transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;
const HowWeMakeCareBetter = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Heading + Intro */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How We Make Care Better
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Mojacares combines local care coordination with technology and
            AI-powered insights to improve continuity and visibility.
          </p>
        </div>

        {/* Highlighted Quote Box */}
        <div className="bg-white border-l-4 border-orange-500 rounded-r-xl p-8 md:p-10 mb-12 md:mb-16 shadow-md max-w-4xl mx-auto hover:shadow-lg transition-shadow duration-300">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed italic">
            We don’t replace doctors or hospitals—we help families organize
            care, track progress over time, understand what’s happening, and
            respond faster when it matters.
          </p>
        </div>

        {/* Three Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Coordination */}
          <div
            className="bg-white rounded-2xl border border-transparent shadow-md p-8 text-center
                         hover:border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start cursor-pointer group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
              📋
            </div>
            <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">
              Coordination
            </h3>
            <p className="text-base leading-relaxed">
              Seamless organization of visits, records, and appointments.
            </p>
          </div>

          {/* Card 2: Technology */}
          <div
            className="bg-white rounded-2xl border border-transparent shadow-md p-8 text-center
                         hover:border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start cursor-pointer group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">
              Technology
            </h3>
            <p className="text-base leading-relaxed">
              AI-powered insights to predict needs and track progress.
            </p>
          </div>

          {/* Card 3: Real-time */}
          <div
            className="bg-white rounded-2xl border border-transparent shadow-md p-8 text-center
                         hover:border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start cursor-pointer group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
              ⏰
            </div>
            <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">
              Real-time
            </h3>
            <p className="text-base leading-relaxed">
              Instant updates so you&apos;re never left wondering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeMakeCareBetter;

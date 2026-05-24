const SupportSections = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Supporting Ghanaians in the Diaspora */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 lg:p-12 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <span className="text-3xl text-blue-600">🌍</span>
              {/* Replace emoji with SVG icon if preferred */}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Supporting Ghanaians in the Diaspora
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              For Ghanaians living outside the country, Mojacares provides a
              central hub to manage healthcare for family members back home.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With Mojacares, families can request care, receive real-time
              updates, review visit summaries, and understand next steps—all in
              one place.
            </p>

            <p className="text-lg font-medium text-gray-800">
              Our goal is simple: to help you care from afar with confidence and
              peace of mind.
            </p>
          </div>

          {/* Card 2: Supporting Ghanaians at Home */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 lg:p-12 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <span className="text-3xl text-green-600">🏠</span>
              {/* Replace emoji with SVG icon if preferred */}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Supporting Ghanaians at Home
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Mojacares is also built for people in Ghana—especially busy
              professionals caring for elderly parents, families managing
              chronic conditions, and parents balancing work, school-aged
              children, and healthcare needs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              On the local front, we help bridge the gap by bringing healthcare
              to people in their communities when they need help the
              most—whether at home, during a clinic visit, or in an emergency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSections;

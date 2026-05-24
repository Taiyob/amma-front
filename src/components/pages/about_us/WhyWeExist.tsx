const WhyWeExist = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12 space-y-12 lg:space-y-0">
          {/* LEFT - Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Why We Exist
              </h2>

              <div className="mt-8 space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  For many Ghanaians living abroad, caring for parents, grandparents, or children back home can feel overwhelming.
                </p>

                {/* Problem points with checkmark icons */}
                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">
                      Phone calls go unanswered and medical updates remain unclear.
                    </span>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">
                      Emergencies create panic and deep uncertainty for families.
                    </span>
                  </div>
                </div>

                {/* Strong orange highlight */}
                <p className="text-xl md:text-2xl font-semibold text-orange-600 mt-10 leading-relaxed">
                  Mojacares was built to change that experience.
                </p>

                <p className="mt-6">
                  We help families stay connected, informed, and confident about their loved ones’ health — through one trusted platform that coordinates routine care, physician access, and emergency support.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT - Image / Illustration */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-xl h-80 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Family connecting remotely with elderly loved one via video call - healthcare support"
                className="object-cover w-full h-full"
              />
              {/* Optional subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExist;
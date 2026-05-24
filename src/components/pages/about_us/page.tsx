const AboutUs = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 flex flex-col justify-center items-center md:px-12 lg:px-20 max-w-5xl">
        {/* Small mission badge */}
        <div className="flex justify-center md:justify-start mb-6">
          <span className="inline-block px-5 py-2 bg-orange-100 text-orange-600 font-semibold text-sm uppercase tracking-wider rounded-full shadow-sm">
            OUR MISSION
          </span>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center md:text-left mb-8 leading-tight">
          About Mojacares
        </h2>

        {/* Description paragraphs */}
        <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-center md:text-left">
          <p>
            Mojacares was created to serve Ghanaians in the diaspora and Ghanaians at home, with a clear purpose: to improve healthcare access by making care more
            reliable, responsive, and human.
          </p>

          {/* Highlighted / boxed paragraph */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-10 shadow-sm">
            <p className="text-gray-800">
              We understand the challenges families face when distance, busy schedules, or limited access make it difficult to be present for loved ones. Mojacares exists to remove that stress
              by making care coordination simple, transparent, and dependable.
            </p>
          </div>
        </div>

        {/* Optional: subtle decorative accent or illustration space */}
        {/* You can add a family/healthcare-related SVG or image here if desired */}
        {/* <div className="mt-12 flex justify-center">
          <img 
            src="/path-to/family-care-illustration.svg" 
            alt="Family care illustration" 
            className="max-w-md opacity-90"
          />
        </div> */}
      </div>
    </section>
  );
};

export default AboutUs;
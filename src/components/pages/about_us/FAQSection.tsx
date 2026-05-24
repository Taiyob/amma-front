import Faq from "./components/Faq";

const FAQSection = () => {
  return (
    <section className=" bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-8">
          {/* Tag */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Answers for families across borders
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-lg text-gray-600 max-w-3xl">
              Mojacares helps diaspora families and local Ghanaians connect loved
              ones to the right care—routine wellness, physician access, and
              emergency support—while keeping everyone informed every step of
              the way.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-orange-500">
              How to get started
            </button>
            <button className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400">
              Privacy & Security
            </button>
            <button className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400">
              AI Insights
            </button>
          </div>

          {/* Search */}
          <div className="mb-14">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search FAQs (e.g., transport, telehealth, privacy)"
                className="w-full pl-11 pr-36 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              />

              <button className="absolute right-0 top-0 h-full px-5 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 rounded-r-lg border-l border-gray-300 transition">
                Expand matches
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-500 italic">
              Tip: Type a keyword to highlight matching questions.
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className=" top-24 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              What people usually want to know
            </h3>

            <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
              {[
                "How fast can you respond—especially in an emergency?",
                "Can I join my loved one’s virtual visit from abroad?",
                "How do you work with hospitals, labs, and pharmacies?",
                "What does it cost and what’s included in each tier?",
                "How is sensitive health data protected?",
                "How do AI insights work—and what they are (and aren’t)?",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mt-2 w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                  <span className="ml-3">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </section>
  );
};

export default FAQSection;

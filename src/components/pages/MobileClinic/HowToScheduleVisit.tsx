export function HowToScheduleVisit() {
  const steps = [
    {
      number: "01",
      title: "Request",
      description: "Tell us your location and medical need via our simple form.",
    },
    {
      number: "02",
      title: "Route",
      description: "Our team organizes the best route and time for your area.",
    },
    {
      number: "03",
      title: "Arrival",
      description: "The medical team reaches your exact address in our van.",
    },
    {
      number: "04",
      title: "Care",
      description: "Receive professional treatment inside our state-of-the-art van.",
    },
  ];

  return (
    <div className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 font-inter">
            How to Schedule a Visit
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-base font-inter">
            Booking professional medical care has never been simpler.
          </p>
        </div>

        {/* Horizontal Steps */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full md:w-auto"
            >
              {/* Step Number Circle */}
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)] border-4 border-white mb-4">
                <span className="text-white text-xl font-bold font-inter leading-7">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-zinc-900 mb-2 font-inter text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 font-inter leading-relaxed text-center max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const LifeThreateningEmergencyAlert = () => {
  return (
    <div
      role="alert"
      className="p-6 bg-orange-400/5 max-w-7xl mx-auto rounded-2xl outline -outline-offset-2 outline-orange-400/50 flex items-start gap-4 md:gap-6">
      {/* Warning Icon */}
      <div className="shrink-0 w-16 h-16 bg-orange-400 rounded-2xl flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 text-white"
          aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v5z"
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-bold text-orange-400 uppercase tracking-wide font-poppins">
          Life-Threatening Emergency?
        </h3>
        <p className="mt-2 text-base font-normal text-orange-400 leading-relaxed font-poppins">
          If the patient has chest pain, difficulty breathing, or severe
          bleeding, call <span className="font-bold underline">999/112</span>{' '}
          (or your local emergency number in Ghana) immediately.
        </p>
      </div>
    </div>
  );
};

export default LifeThreateningEmergencyAlert;

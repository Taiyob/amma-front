import {ShieldAlert, Lock} from 'lucide-react';

const SafetyPrivacyCards = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <div className="container mx-auto py-6 md:py-20 px-4 md:px-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center">
          {/* Safety Note Card */}
          <div className="border-l-4 rounded-lg shadow-lg border-secondary bg-white p-10">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="p-3 bg-orange-50 rounded-full">
                  <ShieldAlert className="w-6 h-6 text-secondary" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-normal text-[#1A2E44ss] tracking-tight">
                  Safety Note
                </h3>
                <div className="text-sm text-[#57534D] leading-relaxed space-y-3">
                  <p>
                  AI insights are supportive tools designed to help you understand your health better and not a diagnosis. They should always be reviewed by licensed clinicians and should never replace professional medical advice.
                  </p>

                  <p>
                   For any medical concerns, consult with a qualified healthcare provider immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Matters Card */}
          <div className="border-l-4 rounded-lg shadow-lg border-[#1A2E44] bg-white p-10">
            {/* Left Accent Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A2E44]" />

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="p-3 bg-slate-100 rounded-full">
                  <Lock className="w-6 h-6 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
                  Your Privacy Matters
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Your data is encrypted and secure. We use bank-level
                  encryption to protect your health information. Your documents
                  are stored securely and only accessible to you and authorized
                  care team members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyPrivacyCards;

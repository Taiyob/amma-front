'use client';

import {CustomStepper} from '@/components/commonLayout/patient/components/pages/RequestCare/step/CustomStepper';
import {Step1} from '@/components/commonLayout/patient/components/pages/RequestCare/step/Step1';
import {Step2} from '@/components/commonLayout/patient/components/pages/RequestCare/step/Step2';
import {Step3} from '@/components/commonLayout/patient/components/pages/RequestCare/step/Step3';
import {Step4} from '@/components/commonLayout/patient/components/pages/RequestCare/step/Step4';
import {Step5} from '@/components/commonLayout/patient/components/pages/RequestCare/step/Step5';
import {useRequestCare} from '@/context/RequestCareContext';

export default function ClientContent() {
  const {currentStep, next, prev} = useRequestCare();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Request Care Service
        </h1>
        <p className="text-muted-foreground mt-2">
          Book healthcare services for your family members
        </p>
      </div>

      {/* Custom Stepper */}
      <CustomStepper currentStep={currentStep} />

      {/* Step content */}
      <div className="max-h-min-screen">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step4 />}
        {currentStep === 5 && <Step5 />}
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-between mt-12 pt-6">
        {currentStep > 1 && (
          <button
            onClick={prev}
            className="px-6 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary/5 hover:border-secondary/70 transition-colors">
            Back
          </button>
        )}

        {currentStep < 5 && (
          <button
            onClick={next}
            className="ml-auto px-6 py-2 bg-secondary text-background rounded-lg hover:bg-secondary/90 transition-colors">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

// components/commonLayout/patient/components/pages/RequestCare/step/CustomStepper.tsx
'use client';

import {Check} from 'lucide-react';

interface CustomStepperProps {
  currentStep: number;
}

const steps = [
  {id: 1, label: 'Choose Services'},
  {id: 2, label: 'Patient Profile'},
  {id: 3, label: 'Add Details'},
  {id: 4, label: 'Schedule'},
  {id: 5, label: 'Payment'},
];

export function CustomStepper({currentStep}: CustomStepperProps) {
  return (
    <div className="w-full">
      {/* ✅ NEW: Mobile-only step indicator (does not replace anything) */}
      <div className="sm:hidden mb-4 text-center">
        <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-500/10 rounded-full">
          <span className="text-orange-600 font-medium">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <p className="mt-2 text-lg font-semibold text-foreground">
          {steps[currentStep - 1]?.label}
        </p>
      </div>

      {/* 🔁 Keep your original stepper exactly as it is */}
      <div className="overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent md:block hidden ">
        <div className="mx-auto flex min-w-max items-center justify-between gap-3 px-2 sm:px-0 sm:justify-center">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.id}
                className="flex flex-1 items-center min-w-20 sm:min-w-35 md:min-w-40">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm font-medium transition-all
                      ${
                        isCompleted
                          ? 'bg-orange-500 text-white border-2 border-orange-500'
                          : isActive
                            ? 'bg-white border-2 border-orange-500 text-orange-500 ring-2 ring-orange-200'
                            : 'bg-gray-100 text-gray-500 border-2 border-gray-300'
                      }
                    `}>
                    {isCompleted ? (
                      <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      step.id
                    )}
                  </div>

                  <span
                    className={`
                      mt-2 hidden text-xs sm:block text-center font-medium whitespace-nowrap
                      ${isActive || isCompleted ? 'text-orange-600' : 'text-muted-foreground'}
                    `}>
                    {step.label}
                  </span>
                </div>

                {!isLast && (
                  <div className="relative -ml-1 -mr-1 h-0.5 flex-1 min-w-10 sm:min-w-20">
                    <div className="absolute inset-0 bg-gray-300" />
                    <div
                      className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ${
                        isCompleted
                          ? 'scale-x-100 bg-orange-500'
                          : 'bg-transparent'
                      }`}
                      style={{
                        transformOrigin: 'left',
                        transform: isCompleted ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

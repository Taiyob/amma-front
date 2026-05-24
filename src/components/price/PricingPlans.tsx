/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CheckCircle, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useGetPlansQuery } from '@/redux/api/plans.api';
import { useInitializeSubscriptionMutation } from '@/redux/api/subscriptions.api';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getPlanDisplayName } from '@/utils/planMapping';
import { motion, AnimatePresence } from 'framer-motion';

// Define visual properties for each plan level
const PLAN_STYLES: Record<
  string,
  { gradient: string; cta: string; highlightColor: string }
> = {
  starter: {
    cta: 'Choose This Plan',
    gradient: 'from-orange-200 to-orange-100',
    highlightColor: '',
  },
  business: {
    cta: 'Choose This Plan',
    gradient: 'from-teal-100 to-zinc-100',
    highlightColor: '',
  },
  enterprise: {
    cta: 'Choose This Plan',
    gradient: 'from-indigo-200 to-orange-100',
    highlightColor: '',
  },
};

export function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false);
  const router = useRouter();

  // Auth state
  const user = useAppSelector((state) => state.auth.user);

  // API Hooks
  const { data: plansData, isLoading: plansLoading } = useGetPlansQuery();
  const [initializeSub, { isLoading: isInitializing }] =
    useInitializeSubscriptionMutation();

  const allPlans = plansData?.data || [];

  // Group plans by name to ensure card stability
  const planNames = ['Starter', 'Business', 'Enterprise'];

  const planGroups = useMemo(() => {
    return planNames.map(name => {
      const monthly = allPlans.find(p => p.name === name && p.interval === 'Monthly' && p.isActive);
      const yearly = allPlans.find(p => p.name === name && p.interval === 'Yearly' && p.isActive);
      return { name, monthly, yearly };
    }).filter(group => group.monthly || group.yearly);
  }, [allPlans]);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error('Please login to subscribe to a plan');
      router.push('/login');
      return;
    }

    try {
      const res = await initializeSub({ planId }).unwrap();
      const redirectUrl = res.data.paymentUrl || res.data.authorizationUrl;

      if (redirectUrl) {
        toast.message('Redirecting to payment gateway...', {
          description: 'Please wait a moment.',
        });
        window.location.href = redirectUrl;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to initialize subscription');
    }
  };

  if (plansLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header content unchanged */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-stone-950 mb-4 font-poppins">
            Simple plans for real peace of mind.
          </h2>
          {/* <p className="text-base text-neutral-800 max-w-3xl mx-auto font-outfit leading-relaxed">
            Specify streamlines the distribution of your design tokens and
            assets, making life easier for both designers and developers.
          </p> */}

          {/* Toggle Switch */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <span
              className={`text-sm lg:text-base transition-colors duration-300 ${!isYearly ? 'font-bold text-black' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-zinc-200 border border-zinc-300 rounded-full transition-colors duration-300 cursor-pointer shadow-inner">
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-7' : ''}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm lg:text-base transition-colors duration-300 ${isYearly ? 'font-bold text-black' : 'text-gray-400'}`}>
                Yearly
              </span>
              {/* <Badge className="bg-orange-100 text-orange-600 border-none px-2 py-0.5 text-[10px]">
                Save 20%
              </Badge> */}
            </div>
          </div>
        </div>

        {/* Plans Grid with Stable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planGroups.map((group) => {
            const plan = isYearly ? group.yearly : group.monthly;
            if (!plan) return null; // Safety check

            const styles = PLAN_STYLES[group.name.toLowerCase()] || PLAN_STYLES.starter;
            const currentPrice = isYearly ? plan.perMonth : plan.price;
            const currentIntervalLabel = isYearly ? '/yearly' : '/monthly';

            return (
              <div
                key={group.name}
                className={`rounded-3xl p-6 shadow-lg bg-linear-to-b ${styles.gradient} transition-transform hover:scale-[1.02] border border-white/20 relative flex flex-col`}>

                <div className="flex-1">
                  {/* Plan Name - Stable */}
                  <h3 className="text-xl font-normal text-neutral-900 mb-6 font-outfit uppercase tracking-wider">
                    {getPlanDisplayName(group.name)}
                  </h3>

                  {/* Price Section with Animation */}
                  <div className="min-h-[80px]">
                    <div className="flex items-baseline gap-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isYearly ? 'yearly' : 'monthly'}
                          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex items-baseline gap-2"
                        >
                          <span className="text-5xl font-normal text-neutral-900 font-outfit">
                            ${currentPrice}
                          </span>
                          <span className="text-lg text-neutral-600 font-outfit font-medium">
                            {currentIntervalLabel}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Discount Badges with Animation */}
                    <AnimatePresence>
                      {plan.discount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex flex-wrap gap-2 mt-3"
                        >
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            Save {plan.discount}%
                          </Badge>
                          {isYearly && (
                            <Badge className="bg-orange-500 text-white border-none shadow-sm">
                              Discounted: ${plan.discountedPrice}
                            </Badge>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Description - Stable */}
                  <p className="text-sm text-neutral-700 mt-6 mb-6 line-clamp-2 min-h-[40px] font-medium leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="h-px bg-zinc-400/20 my-6" />

                  {/* Features - Stable */}
                  <ul className="space-y-4 mb-8">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
                        <span className="text-sm text-stone-900 font-outfit leading-relaxed font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA - Uses the specific plan ID for the interval */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isInitializing}
                  className="w-full py-4 bg-secondary text-white font-bold text-base rounded-2xl font-outfit hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer gap-3 mt-auto">
                  {isInitializing && <Loader2 className="h-4 w-4 animate-spin" />}
                  {styles.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border transition-all ${className}`}>
      {children}
    </span>
  );
}

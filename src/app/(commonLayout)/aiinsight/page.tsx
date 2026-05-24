import HowItWorks from '@/components/commonLayout/home/HowItWorkStep';
import AIInsightHero from './_components/AIInsightHero';
import WhatYouGet from './_components/WhatYouGet';
import InsightForm from './_components/InsightForm';
import SafetyPrivacyCards from './_components/SafetyPrivacyCards';
import HeroCTA from './_components/HeroCTA';

const AiInsight = () => {
  return (
    <section className="space-y-8">
      <AIInsightHero />
      <WhatYouGet />
      <HowItWorks />
      <InsightForm />
      <SafetyPrivacyCards />
      <HeroCTA />
    </section>
  );
};

export default AiInsight;

import SectionHeading from '@/components/reUseAbleComponents/SectionHeading';
import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  Globe,
  MessageSquare,
} from 'lucide-react';
import FeaturedCard from './FeaturedCard';

const features = [
  {
    title: 'Plain-language Summaries',
    description:
      "No more medical jargon. Get clear explanations of test results, doctor's notes, and treatment plans in words you understand.",
    icon: <FileText className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Trend Tracking',
    description:
      'Visualize blood pressure, glucose, cholesterol, and more over time. Spot patterns and improvements at a glance.',
    icon: <BarChart3 className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Follow-up Flags',
    description:
      'Never miss a repeat test or check-up. Our AI automatically identifies when follow-up care is needed.',
    icon: <Bell className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Visit-ready Questions',
    description:
      'Walk into doctor appointments prepared. Get AI-generated questions based on your health data and concerns.',
    icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Medication Insights',
    description:
      'Understand what each medication does, potential side effects, and how they work together in your care plan.',
    icon: <Activity className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Built for Diaspora Families',
    description:
      'Manage health from anywhere in the world. Share insights with family members abroad securely and instantly.',
    icon: <Globe className="w-6 h-6 text-orange-500" />,
  },
];

const WhatYouGet = () => {
  return (
    <section>
      <div className="container mx-auto py-6 md:py-20 px-4 md:px-12">
        <div className="mb-9">
          <SectionHeading
            title="What You Get"
            subTitle="Our AI technology transforms medical complexity into clarity so you and your family
can make informed decisions with confidence."
          />
        </div>

        <div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeaturedCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;

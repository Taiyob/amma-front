import React from 'react';
import {Heart, ShieldCheck, Clock, Users} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import SectionHeading from '@/components/reUseAbleComponents/SectionHeading';

const commitments = [
  {
    title: 'Dignity',
    description:
      'We treat every patient with the highest level of respect, honoring their legacy and autonomy.',
    icon: Heart,
  },
  {
    title: 'Transparency',
    description:
      "No hidden agendas. Real-time updates and clear billing ensure you're always in the loop.",
    icon: ShieldCheck,
  },
  {
    title: 'Responsiveness',
    description:
      'Our teams are local and available 24/7. When you need us, we are there immediately.',
    icon: Clock,
  },
  {
    title: 'Accessibility',
    description:
      'Breaking down barriers to high-quality specialist care regardless of your physical location.',
    icon: Users,
  },
];

const CommitmentSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto py-6 md:py-20 px-4 md:px-12">
        <div className="mb-12">
          <SectionHeading
            title="Our Commitment"
            subTitle="Healthcare is deeply personal, and we approach it with empathy,
            accountability, and respect."
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, index) => (
            <Card
              key={index}
              className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300 py-4">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-[#f8f5f2] flex items-center justify-center mb-2">
                  <item.icon
                    className="w-6 h-6 text-[#475569]"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#1e293b]">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;

import {ChevronRight} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const howItWorksCards = [
  {
    id: 1,
    title: 'Urgent Care Access',
    description:
      'Connect with qualified doctors anytime, anywhere for immediate medical assistance.',
    imageUrl: '/image/commonLayout/landing/urgent-care-service1.jpg',
    href: '/urgent-care',
  },
  {
    id: 2,
    title: 'Routine Care',
    description:
      'Schedule regular check-ups and wellness maintenance to stay proactive about your health.',
    imageUrl: '/image/commonLayout/landing/routine-care1.jpg',
    href: '/rouitine-care',
  },
  {
    id: 3,
    title: 'AI Health Insights',
    description:
      'Receive data-driven insights and health record monitoring through advanced AI analysis.',
    imageUrl: '/image/commonLayout/landing/ai-health.jpg',
    href: '/aiinsight',
  },
  {
    id: 4,
    title: 'Electronic Health Records',
    description:
      'Securely access and manage your medical history, prescriptions, and test results in one place.',
    imageUrl: '/image/commonLayout/landing/electronic-health.jpg',
    href: '/electronic-health-record',
  },
  // {
  //   id: 5,
  //   title: 'Telemedicine',
  //   description:
  //     'Virtual consultations with experienced medical professionals from the comfort of your home.',
  //   imageUrl: '/image/commonLayout/cardImage/image5.jpg',
  //   href: '/talemadicine',
  // },
  // {
  //   id: 6,
  //   title: 'Mobile Clinic',
  //   description:
  //     'Professional on-site medical care and diagnostics delivered directly to your location.',
  //   imageUrl: '/image/commonLayout/cardImage/image9.jpg',
  //   href: '/mobile-clinic',
  // },
] as const;

const HowItWorks = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          {/* <p className="text-secondary font-medium text-lg md:text-xl max-w-2xl mx-auto"> */}
          <p className="text-xl md:text-2xl font-semibold text-secondary max-w-3xl mx-auto">
            Comprehensive Care Coordination solutions tailored to your needs,
            delivered with care and expertise.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {howItWorksCards.map((card) => (
            <Link
              href={card.href}
              key={card.id}
              className="group flex flex-col bg-background rounded-[2rem] overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              {/* 🔥 Bigger Image */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 flex items-center justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Button */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-muted/50 group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-500">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

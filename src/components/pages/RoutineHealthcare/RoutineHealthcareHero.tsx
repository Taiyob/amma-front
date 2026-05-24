import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RoutineHealthcareHero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-16 text-sky-950">
            Routine healthcare designed for your family’s{' '}
            <span className="text-orange-400">long-term wellness.</span>
          </h1>

          <p className="text-lg text-sky-950/80 max-w-xl leading-relaxed">
            Manage checkups, prescriptions, and chronic conditions without the
            stress of clinic visits.
          </p>

          <Link href={'/register'}>
            <Button
              variant="default"
              size="lg"
              className="bg-secondary hover:bg-secondary text-white font-medium text-base px-8 py-5 rounded-full  transition-all flex items-center gap-3">
              Routine Checkup
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Right: Image Placeholder */}
        {/* Right: Image Placeholder */}
        <div className="relative h-105 md:h-130 rounded-3xl overflow-hidden">
          <Image
            src="/image/commonLayout/landing/routine-care-page1.jpg"
            alt="Home Healthcare Service"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RoutineHealthcareHero;

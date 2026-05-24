'use client';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Clock, Phone} from 'lucide-react'; // optional: add lucide-react icons
import Image from 'next/image';

export default function UrgentCareHero() {
  return (
    <div className="w-full max-w-7xl mx-auto  py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left - Text content */}
          <div className="flex-1 space-y-8 max-w-xl">
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider border-neutral-200">
              <span className="text-gray-900">Available </span>
              <span className="text-orange-500">24/7</span>
              <span className="text-gray-900"> in Ghana</span>
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Urgent care when
              <br />
              you <span className="text-orange-500">need it most.</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Fast, reliable medical support for non-life-threatening
              emergencies. Available at your home, workplace, or via virtual
              consult.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button
                onClick={() => {
                  document
                    .getElementById('request-urgent-care')
                    ?.scrollIntoView({behavior: 'smooth'});
                }}
                size="lg"
                className="h-14 px-10 text-base font-bold border border-transparent    transition-all duration-300 group rounded-2xl bg-white  text-black shadow-md"
                variant="outline">
                Request Urgent Care Now!
              </Button>

              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-base font-bold border border-transparent  transition-all duration-300 group rounded-2xl bg-gray-100  text-black shadow-md">
                <a href="tel:+183390445456">
                  <Phone className="mr-2 h-5 w-5" />
                  Call/Text{' '}
                  <span className="text-secondary">+233 53 702 3090</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Image + floating badge */}
          <div className="flex-1 relative ">
            {/* Soft glow background (optional) */}
            <div className="absolute inset-0 -left-4 -top-4 ] bg-amber-400/5 rounded-3xl blur-2xl" />

            <Image
              src="/image/commonLayout/landing/urgent-care-page.jpg"
              alt="Doctor / medical professional providing urgent care"
              className="relative w-full h-auto rounded-3xl shadow-2xl object-cover"
              width={584}
              height={500}
            />

            {/* Floating response time card */}
            <Card className="absolute -left-6 bottom-8  p-5 shadow-xl border border-gray-100 bg-white rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xl font-bold text-foreground">
                    Average Response
                  </p>
                  <p className="text-2xl font-black text-orange-500 leading-none">
                    &lt; 15 Mins
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import Link from 'next/link';

const HeroWithImage = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto py-6 md:py-10 pb-6 md:pb-20 px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="z-10 space-y-8  fade-in slide-in-from-left duration-1000">
              <div className="space-y-4">
                <p className="text-secondary font-bold text-xs tracking-widest uppercase">
                  PREMIUM HOME HEALTHCARE
                </p>
                <h1 className="text-4xl md:text-[64px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Caring for your <br />
                  loved ones, <br />
                  wherever you are.
                </h1>
                <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                  Mojacares was created to improve healthcare access by making
                  care more reliable, responsive, and human for families across
                  borders.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={'/login'}>
                  <Button className="bg-secondary hover:bg-secondary/80 text-white px-8! py-7  rounded-xl text-md font-semibold shadow-[0_10px_20px_rgba(255,152,77,0.3)] transition-all group">
                    Start Today
                    <ArrowRight className="ml-1 mt-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Button
                  onClick={() => {
                    document
                      .getElementById('our-mission')
                      ?.scrollIntoView({behavior: 'smooth'});
                  }}
                  variant="outline"
                  className="bg-white border-slate-200 text-slate-700 px-8 py-7 rounded-xl text-md font-semibold hover:bg-slate-50 transition-all">
                  Learn Our Process
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Image Area */}
          <div>
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Image Container */}
              <div className="relative w-full max-w-125 aspect-4/5 rounded-3xl overflow-hidden shadow-2xl z-0">
                <Image
                  src="/image/pagesimage/careing.jpg"
                  alt="Home Healthcare Service"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Real-time Update Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-sm shadow-xl border border-slate-100 max-w-70 z-20 animate-bounce-slow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-[#1A2E44] uppercase tracking-tighter">
                    Real-time Update
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &quot;Dr. Mensah has just completed the morning check-up. Your
                  father is stable and resting.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithImage;

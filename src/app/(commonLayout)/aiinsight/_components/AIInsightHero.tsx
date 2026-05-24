'use client';
import {Button} from '@/components/ui/button';
import {Sparkles, TrendingDown} from 'lucide-react';
import Image from 'next/image';

const AIInsightHero = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <div className="container mx-auto py-6 md:py-10 pb-6 md:pb-20 px-4 md:px-12">
        <div className="grid grid-cols-1  md:grid-cols-2 items-center gap-16 ">
          {/* Text content */}
          <div>
            <p className="text-[#C5A059] text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI-POWERED HEALTH INTELLIGENCE
            </p>
            <h2 className="py-6 font-bold text-2xl md:text-[64px] text-[#1A2E44]">
              Understand your health clearly and confidently.
            </h2>

            <p className="text-lg text-[#57534D]">
              Mojacares turns complex health information into simple,
              <br />
              actionable insights.
            </p>

            <Button
              onClick={() => {
                document
                  .getElementById('request-from')
                  ?.scrollIntoView({behavior: 'smooth'});
              }}
              className="bg-secondary hover:bg-secondary/80 text-white font-medium text-sm rounded-3xl my-6 px-10 py-6">
              Request Care
            </Button>
          </div>

          {/* Chart */}
          <div className="p-8 bg-white border-[#E7E5E4] border rounded-[6px] shadow-gray-350 shadow-xl duration-300 hover:shadow-2xl relative">
            <Button className="bg-secondary  hover:bg-secondary/80 px-4! text-white flex items-center gap-2 absolute -top-7 -right-4">
              <Sparkles className="w-4 h-4" /> AI INSIGHT
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-[#1A2E44]">Blood Pressure Trend</p>
                <p className="text-xs text-[#A6A09B]">6-Month Progress</p>
              </div>

              <span className="bg-[#F0FDF4] text-[#008236] text-xs font-semibold px-3 py-1 uppercase">
                Improving
              </span>
            </div>

            <div className="h-px mt-3 w-full bg-[#F5F5F4] "></div>

            <div className="my-6">
              <Image
                src={'/image/commonLayout/aiinsight/latest1.png'}
                height={1000}
                width={1000}
                alt="chart image"
                className="h-65 w-full"
              />
            </div>

            <div className="flex justify-center">
              <p className="flex items-center text-center gap-2 text-sm text-[#57534D] ">
                <TrendingDown className="w-4 text-[#00A63E]" /> Blood pressure
                <span className="font-bold text-gray-900">improving —</span>
                Continue current plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInsightHero;

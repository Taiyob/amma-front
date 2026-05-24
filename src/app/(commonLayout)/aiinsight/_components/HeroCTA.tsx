import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroCTA = () => {
  return (
    <section className="bg-[#4d4d4d] text-center">
      <div className="container mx-auto py-6 md:py-20 px-4 md:px-12">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to understand your family&apos;s health{' '}
          <br className="hidden md:block" /> with confidence?
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 mt-8 mb-12 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Schedule a consultation with our care coordination team to discuss how
          we can support your loved ones
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href={"/register"}>
          <Button className="bg-secondary hover:bg-secondary/80 text-white px-8 py-6 rounded-md text-base font-medium transition-all">
            Request Care
          </Button>
          </Link>

          <Link href={"/contact"}>
            <Button
              variant="outline"
              className="bg-transparent border-gray-500 text-white hover:bg-white/10 px-8 py-6 rounded-md text-base font-medium transition-all">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;

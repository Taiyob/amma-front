/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import SectionHeading from '@/components/reUseAbleComponents/SectionHeading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const InsightForm = () => {


  return (
    <section className="bg-white py-8 md:py-20 px-4 font-sans" id="request-from">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="flex justify-center items-center gap-2 text-secondary font-extrabold text-xs tracking-widest uppercase mb-3">

        </div>

        <SectionHeading
          title="Request Your First Insight"
          subTitle="See how easy it is to get clarity on your health data. This is what the upload
experience looks like."
        />
        <Link href={'/register'}>
          <Button

            className="bg-secondary hover:bg-secondary/80 text-white font-medium text-sm rounded my-6 px-10 py-6">
            Register now
          </Button>
        </Link>
      </div>


    </section>
  );
};

export default InsightForm;

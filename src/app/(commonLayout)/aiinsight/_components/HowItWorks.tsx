import SectionHeading from '@/components/reUseAbleComponents/SectionHeading';

const HowItWorks = () => {
  return (
    <section>
      <div className="container mx-auto py-6 md:py-20 px-4 md:px-12">
        <div className="mb-9">
          <SectionHeading
            title="How It Works"
            subTitle="From upload to insight in minutes. Simple, fast, and secure."
          />
        </div>

        <div></div>
      </div>
    </section>
  );
};

export default HowItWorks;

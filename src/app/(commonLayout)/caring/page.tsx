import CommitmentSection from './_components/CommitmentSection';
import CTA from './_components/CTA';
import HeroWithImage from './_components/HeroWithImage';
import MissionSection from './_components/OurMission';

const CaringPage = () => {
  return (
    <section className="space-y-8">
      <HeroWithImage />
      <MissionSection />
      <CommitmentSection />
      <CTA />
    </section>
  );
};

export default CaringPage;

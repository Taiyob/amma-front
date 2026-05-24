import TeamSection from '@/components/pages/about_us/components/OurTeams';
import Contact from '@/components/pages/about_us/Contact';
import HowWeMakeCareBetter from '@/components/pages/about_us/HowWeMakeCareBetter';
import OurCommitment from '@/components/pages/about_us/OurCommitment';
import AboutUs from '@/components/pages/about_us/page';
// import SupportSections from '@/components/pages/about_us/SupportSections';
import WhyWeExist from '@/components/pages/about_us/WhyWeExist';

const page = () => {
  return (
    <div className="space-y-10 ">
      <AboutUs />
      <WhyWeExist />
      {/* <SupportSections /> */}
      <TeamSection />

      <HowWeMakeCareBetter />
      <OurCommitment />
      <Contact />
    </div>
  );
};

export default page;

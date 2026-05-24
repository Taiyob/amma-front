import {HowToScheduleVisit} from '@/components/pages/MobileClinic/HowToScheduleVisit';
import {MobileClinicHero} from '@/components/pages/MobileClinic/MobileClinicHero';
import {RequestMobileVisit} from '@/components/pages/MobileClinic/RequestMobileVisit';
import {ServicesOnWheels} from '@/components/pages/MobileClinic/ServicesOnWheels';
import {WhereWeMeetYou} from '@/components/pages/MobileClinic/WhereWeMeetYou';

const page = () => {
  return (
    <div className="space-y-10">
      <MobileClinicHero />
      <WhereWeMeetYou />
      <ServicesOnWheels />
      <HowToScheduleVisit />
      <RequestMobileVisit />
    </div>
  );
};

export default page;

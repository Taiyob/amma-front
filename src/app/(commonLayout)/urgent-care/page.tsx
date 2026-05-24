import {ImmediateCareCard} from '@/components/pages/urgentCare/ImmediateCareCard';
import LifeThreateningEmergencyAlert from '@/components/pages/urgentCare/LifeThreateningEmergencyAlert';
import {RequestUrgentCare} from '@/components/pages/urgentCare/RequestUrgentCare';
import {ThreeStepsToRelief} from '@/components/pages/urgentCare/ThreeStepsToRelief';
import UrgentCareHero from '@/components/pages/urgentCare/urgentCareHero';
// import {WhatWeTreat} from '@/components/pages/urgentCare/WhatWeTreat';

const UrgentCare = () => {
  return (
    <div className="space-y-10">
      <UrgentCareHero />
      <LifeThreateningEmergencyAlert />
      {/* <WhatWeTreat /> */}
      <ThreeStepsToRelief />
      <RequestUrgentCare />
      <ImmediateCareCard />
    </div>
  );
};

export default UrgentCare;

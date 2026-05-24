import { CaringFromAfaraSection } from "@/components/pages/electronic-health-record/CaringFromAfaraSection"
import { EHRFeaturesSection } from "@/components/pages/electronic-health-record/EHRFeaturesSection"
import { EHRHeroSection } from "@/components/pages/electronic-health-record/EHRHeroSection"
import { HealthCTASection } from "@/components/pages/electronic-health-record/HealthCTASection"
import { PrivacyPrioritySection } from "@/components/pages/electronic-health-record/PrivacyPrioritySection"
import { SimpleIntegrationSection } from "@/components/pages/electronic-health-record/SimpleIntegrationSection"

const page = () => {
  return (
    <div>
        <EHRHeroSection/>
        <EHRFeaturesSection/>
        <CaringFromAfaraSection/>
        <SimpleIntegrationSection/>
        <PrivacyPrioritySection/>
        <HealthCTASection/>
    </div>
  )
}

export default page
import { FourPillarsSection } from "@/components/pages/RoutineHealthcare/FourPillarsSection"
import { HowItWorksSection } from "@/components/pages/RoutineHealthcare/HowItWorksSection"
import RoutineHealthcareHero from "@/components/pages/RoutineHealthcare/RoutineHealthcareHero"
import { WhyRoutineCareMatters } from "@/components/pages/RoutineHealthcare/WhyRoutineCareMatters"

const page = () => {
  return (
    <div className="space-y-10">
        <RoutineHealthcareHero/>
        <FourPillarsSection/>
        <WhyRoutineCareMatters/>
        <HowItWorksSection/>
    </div>
  )
}

export default page
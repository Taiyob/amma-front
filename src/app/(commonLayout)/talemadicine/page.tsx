import { HowVirtualCareWorks } from "@/components/pages/Talemadicine/HowVirtualCareWorks"
import { SpecializedVirtualServices } from "@/components/pages/Talemadicine/SpecializedVirtualServices"
import { VirtualCareHero } from "@/components/pages/Talemadicine/VirtualCareHero"

const page = () => {
  return (
    <div className="space-y-10">
        <VirtualCareHero/>
        <HowVirtualCareWorks/>
        <SpecializedVirtualServices/>
        {/* <MeetOurDoctors/> */}
    </div>
  )
}

export default page
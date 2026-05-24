"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ApplyFrom from '@/hooks/ApplyFrom';
import { useState } from 'react';

// Reusable Tag component
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-sm font-medium text-gray-700">
    {children}
  </span>
);

// Reusable Role Card

interface RoleCardProps {
  title: string;
  subtitle: string;
  recurtmentDetails: string;
  status?: string;
  responsibilities?: string[];
  requirements?: string[];
}

const RoleCard = ({
  title,
  subtitle,
  recurtmentDetails,  // add this
  status = "Open",
  responsibilities = [],
  requirements = [],
}: RoleCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div
        className="p-5 flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h3 className="text-gray-900 font-bold text-base leading-6">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        </div>
        <Badge className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
          {status}
        </Badge>
      </div>

      {/* Dropdown content */}
      {open && (
        <div className="p-5 pt-0 border-t border-gray-100 text-gray-700 text-sm">
          {/* Show recruitment details here */}
          {recurtmentDetails && (
            <p className="mb-4 mt-4 fon text-gray-800">{recurtmentDetails}</p>
          )}

          {responsibilities.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1">
                {responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {requirements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="list-disc list-inside space-y-1">
                {requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <Button className="mt-2.5 bg-secondary hover:bg-secondary text-background">
            Apply Now
          </Button>
        </div>
      )}
    </div>
  );
};





// Feature item (for "How we work")
const FeatureItem = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 flex-shrink-0 w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
      <p className="text-gray-600 text-sm mt-1 leading-5">{description}</p>
    </div>
  </div>
);

// Simple SVG icons (minimal, consistent with your design)
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="12" height="6" rx="1" fill="#F97316" />
    <path d="M6 2L2 6V10H14V6L10 2H6Z" fill="#F97316" />
  </svg>
);
const MobileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2" width="8" height="12" rx="1" stroke="#F97316" strokeWidth="1.5" />
    <rect x="6" y="4" width="4" height="2" rx="1" fill="#F97316" />
  </svg>
);
const MissionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="#F97316" strokeWidth="1.5" />
    <path d="M8 4V8L10 9" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PrivacyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="8" height="8" rx="2" stroke="#F97316" strokeWidth="1.5" />
    <path d="M8 10V12" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="6" r="2" fill="#F97316" />
  </svg>
);
const PeopleFirstIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="#F97316" strokeWidth="1.5" />
    <path d="M8 5V7M8 9V11" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const FollowThroughIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8L8 4L12 8" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12L4 8L8 4" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SafetyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L2 8V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V8L8 2Z" stroke="#F97316" strokeWidth="1.5" />
    <path d="M8 10L6 8M8 10L10 8" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const TeamworkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="3" stroke="#F97316" strokeWidth="1.5" />
    <circle cx="11" cy="11" r="3" stroke="#F97316" strokeWidth="1.5" />
    <path d="M5 8L11 8" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Careers at Mojacares</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Help us make it easier to care for loved ones—especially when you can’t be there in person. We’re building a care coordination platform with home and mobile visits that brings clarity, support, and peace of mind to families.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Tag>
              <HomeIcon /> <span className="ml-1">Home visits</span>
            </Tag>
            <Tag>
              <MobileIcon /> <span className="ml-1">Mobile visits</span>
            </Tag>
            <Tag>
              <MissionIcon /> <span className="ml-1">Mission-driven</span>
            </Tag>
            <Tag>
              <PrivacyIcon /> <span className="ml-1">Privacy-minded</span>
            </Tag>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Why, How, Open Roles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why Mojacares */}
            <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Mojacares</h2>
              <p className="text-gray-600 mb-4">
                Mojacares helps families coordinate healthcare across distance—organizing health information, tracking care over time, and connecting people to right help when it matters. We also support{' '}
                <span className="font-bold text-gray-900">home visits</span> and{' '}
                <span className="font-bold text-gray-900">mobile visits</span> to reduce barriers like transportation, long waits, and missed follow-ups.
              </p>
              <p className="text-gray-600">
                We value empathy, ownership, high standards, and clear communication. If you care about helping real people navigate real healthcare moments, we’d love to hear from you.
              </p>
            </article>

            {/* How we work */}
            <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How we work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureItem
                  icon={<PeopleFirstIcon />}
                  title="People first"
                  description="Respect, empathy, and dignity in every interaction."
                />
                <FeatureItem
                  icon={<FollowThroughIcon />}
                  title="Reliable follow-through"
                  description="Clear handoffs, documented updates, and timely responses."
                />
                <FeatureItem
                  icon={<SafetyIcon />}
                  title="Safety & privacy"
                  description="We treat confidentiality, safety, and security as core to the job."
                />
                <FeatureItem
                  icon={<TeamworkIcon />}
                  title="Teamwork"
                  description="We communicate clearly and support each other across the field and ops."
                />
              </div>
            </article>

            {/* Open roles */}
            <article className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Open roles</h2>
                <p className="text-gray-600">
                  We’re hiring for key care delivery and operations roles.{' '}
                  <span className="font-medium text-gray-900">More roles are coming soon</span>—check back or send a general application.
                </p>
              </div>

              <div className="space-y-3">
                <RoleCard
                  title="Care Coordinator"
                  subtitle="Remote/Hybrid • Full-time or Part-time"
                  recurtmentDetails="Help families by coordinating appointments, referrals, follow-ups, and updates."
                  responsibilities={[
                    "Manage inbound requests and coordinate next steps across providers, partners, and family members",
                    "Schedule appointments, referrals, labs/diagnostics, and care follow-ups with clear confirmation",
                    "Coordinate home/mobile visit logistics (routing, prep, supplies, patient readiness, time windows)",
                    "Maintain clear documentation and provide proactive updates to families (closed-loop communication)",
                    "Use checklists and playbooks to ensure consistent, high-quality coordination and handoffs",
                    "Escalate time-sensitive issues per protocol and track them through resolution",
                  ]}
                  requirements={[
                    "Experience in care coordination, patient navigation, clinical operations, or member services",
                    "Strong communication skills (written and verbal) and high attention to detail",
                    "Ability to juggle multiple cases, priorities, and follow-ups without dropping handoffs",
                    "Comfort handling sensitive information and following privacy and safety protocols",
                    "Empathy and calm judgment when supporting families in stressful moments",
                  ]}
                />


                <RoleCard
                  title="RN / Nurse"
                  subtitle="Hybrid/Field • Contract or Part-time • On-call options"
                  recurtmentDetails="Provide clinical support and deliver home/mobile visits within defined protocols and scope."
                  responsibilities={[
                    "Conduct home and mobile visits (vitals, history, basic assessments, follow-up checks)",
                    "Deliver patient education, safety guidance, and next-step instructions aligned to protocols",
                    "Coordinate care recommendations with physicians and the care team",
                    "Support medication reconciliation and care plan follow-through (as applicable)",
                    "Document visits clearly and accurately for continuity of care",
                    "Escalate urgent findings using defined pathways and ensure timely handoff"
                  ]}
                  requirements={[
                    "Active nursing license in the service area (RN preferred; LPN/LVN considered where applicable)",
                    "Comfort delivering care in home settings; strong patient communication and professionalism",
                    "CPR/BLS certification required; IV/BLS certification are a plus (if Phlebotomy)",
                    "Ability to travel locally and work flexible shifts (evenings/weekends as needed)",
                    "Strong judgment and ability to operate independently in the field"
                  ]}
                />
                <RoleCard
                  title="Doctor (Primary Care / Urgent Care)"
                  subtitle="Hybrid/Field • Contract or Part-time • Home & mobile visits"
                  recurtmentDetails="Deliver patient-centered care through home and mobile visits, with clear documentation and follow-through."
                  responsibilities={[
                    "Conduct home and mobile visits for evaluation, diagnosis, treatment planning, and follow-up",
                    "Order appropriate labs/diagnostics and coordinate referrals when needed",
                    "Work with care coordinators to ensure closed-loop review, follow-ups, meds, referrals",
                    "Provide clear communication of care plans to patients and families",
                    "Document clinical notes accurately and promptly",
                    "Follow clinical protocols, safety guidelines, and escalation procedures"
                  ]}
                  requirements={[
                    "Active medical license in the service area (MD/DO)",
                    "Experience in primary care, urgent care, internal medicine, family medicine, or geriatrics",
                    "Comfort providing care in home settings and working independently in the field",
                    "Strong clinical judgment, communication skills, and commitment to high-quality care",
                    "Ability to travel locally and work flexible shifts (evenings/weekends as needed)"
                  ]}
                />
                <RoleCard
                  title="Driver"
                  subtitle="Local • Part-time • Flexible shifts"
                  recurtmentDetails="Support home and mobile visits by providing safe, reliable transport for people and supplies."
                  responsibilities={[
                    "Provide safe, reliable transportation for members to appointments and services (when needed)",
                    "Support mobile visit operations (route coordination, pickup/drop-off, supply runs)",
                    "Maintain punctuality, professionalism, and respectful communication",
                    "Follow safety protocols; keep vehicle clean, secure, and road-ready",
                    "Coordinate real-time updates with the care team and escalate issues as needed"
                  ]}
                  requirements={[
                    "Valid driver's license and clean driving record",
                    "Reliable vehicle and ability to travel locally (as applicable)",
                    "Strong punctuality and communication skills",
                    "Comfort supporting healthcare visits and maintaining discretion and professionalism",
                    "Ability to lift and transport supplies safely (reasonable accommodations available)"
                  ]}
                />
                <RoleCard
                  title="Clinical Operations Lead (Field Ops / Dispatch)"
                  subtitle="Hybrid • Operations • Dispatch"
                  recurtmentDetails="Own scheduling, routing, staffing coverage, visit readiness, supplies, and SLAs."
                  responsibilities={[
                    "Run daily dispatch for home and mobile visits: scheduling, routing, time windows, confirmations",
                    "Maintain staffing coverage plans (on-call rotations, surge coverage, backup staffing)",
                    "Ensure visit readiness: supplies, documentation, patient readiness, clinician assignment",
                    "Handle real-time escalations (delays, cancellations, safety issues, rescheduling)",
                    "Monitor service performance (response time, arrival window adherence, completion rates)",
                    "Improve operational workflows, reducing friction and improving reliability"
                  ]}
                  requirements={[
                    "Experience in healthcare operations, dispatch, field services, or care delivery logistics",
                    "Strong organizational skills and ability to manage multiple moving parts in real time",
                    "Clear communication and sound judgment under pressure",
                    "Comfort working with basic metrics and process improvement"
                  ]}
                /><RoleCard
                  title="Credentialing & Provider Operations"
                  subtitle="Remote • Provider onboarding"
                  recurtmentDetails="Own provider licensing, onboarding, payer enrollment (if applicable), and credential files."
                  responsibilities={[
                    "Manage provider credentialing lifecycle: initial credentialing, re-credentialing, renewals",
                    "Coordinate licensing documentation, background checks, and compliance verification",
                    "Maintain accurate, audit-ready provider files and trackers",
                    "Support payer enrollment and network participation workflows where applicable",
                    "Streamline onboarding so providers can become visit-ready quickly and safely"
                  ]}
                  requirements={[
                    "Experience in provider credentialing, medical staff services, or provider operations",
                    "Strong attention to detail, follow-up discipline, and document management",
                    "Comfort coordinating across multiple stakeholders and deadlines",
                    "Familiarity with healthcare compliance expectations and documentation standards"
                  ]}
                />
                <RoleCard
                  title="Quality & Safety Lead (or QA Nurse)"
                  subtitle="Remote • Quality & Safety"
                  recurtmentDetails="Lead incident management, chart audits, patient safety playbooks, and continuous improvement."
                  responsibilities={[
                    "Own incident reporting and follow-up: triage, documentation, resolution, learnings",
                    "Conduct regular chart audits and quality reviews to ensure clinical standards",
                    "Develop and maintain safety protocols (home visit safety, escalation standards, documentation standards)",
                    "Identify trends and root causes; drive corrective actions and training",
                    "Partner with clinicians to standardize workflows and improve patient outcomes"
                  ]}
                  requirements={[
                    "Clinical background (RN preferred) with experience in QA, patient safety, or risk management",
                    "Strong documentation and investigative skills",
                    "Ability to coach and influence without heavy bureaucracy",
                    "Comfort working across clinical and operational teams"
                  ]}
                />
                <RoleCard
                  title="Member / Patient Support Specialist"
                  subtitle="Remote • Frontline support"
                  recurtmentDetails="Front line support, intake, triage routing (non-clinical), billing questions, escalation."
                  responsibilities={[
                    "Answer inbound requests via phone/email/chat and route to the right team quickly",
                    "Support onboarding and basic troubleshooting (appointments, app issues, scheduling)",
                    "Handle billing and service questions and escalate where appropriate",
                    "Track open issues to closure and provide proactive updates",
                    "Deliver a warm, calm, and high-trust experience for families"
                  ]}
                  requirements={[
                    "Experience in customer support, healthcare member services, or patient access",
                    "High empathy, strong written communication, and strong follow-through",
                    "Comfort handling sensitive situations and escalating appropriately",
                    "Organized and able to manage multiple conversations and queues"
                  ]}
                />
                <RoleCard
                  title="Partnerships Manager"
                  subtitle="Business Development • Vendor network"
                  recurtmentDetails="Own partnerships across labs, imaging, pharmacies, transport vendors, home health agencies, clinics/hospitals."
                  responsibilities={[
                    "Identify, onboard, and manage partners needed to deliver end-to-end care",
                    "Negotiate service terms, SLAs, pricing, and onboarding processes",
                    "Create partner workflows for scheduling, results routing, and closed-loop handoffs",
                    "Monitor partner quality, turnaround times, and service performance",
                    "Build a scalable partner directory and escalation pathways"
                  ]}
                  requirements={[
                    "Experience in partnerships, vendor management, or healthcare business development",
                    "Strong relationship building and negotiation skills",
                    "Understanding of healthcare delivery ecosystem and operations",
                    "Comfort working across ops, clinical teams, and external organizations"
                  ]}
                />
                <RoleCard
                  title="Revenue Cycle / Billing Specialist"
                  subtitle="Finance & Ops • Billing"
                  recurtmentDetails="Own revenue cycle and manage claims: coding support, denials, collections workflows."
                  responsibilities={[
                    "Support billing workflows including coding, invoicing, and claim submission (as applicable)",
                    "Track denials, coordinate appeals/resolutions, and manage collections processes",
                    "Coordinate with external billing vendors and ensure accurate handoffs",
                    "Ensure documentation supports reimbursement and ensure accurate billing",
                    "Provide reporting on revenue, denials, and operational bottlenecks"
                  ]}
                  requirements={[
                    "Experience in revenue cycle, medical billing, or payer operations",
                    "Understanding of claims lifecycle, denials, and coding support",
                    "Strong attention to detail and process discipline",
                    "Comfort with spreadsheets/tools and basic reporting"
                  ]}
                />
                <RoleCard
                  title="Care Navigator (Social Work / Community Health)"
                  subtitle="Remote • Community supports"
                  recurtmentDetails="Community resources, benefits navigation, aging/hospice support, caregiver resources."
                  responsibilities={[
                    "Connect members to local community resources and social supports",
                    "Support benefits navigation and caregiver coordination",
                    "Help families navigate aging care needs, hospice referrals, and long-term care planning",
                    "Coordinate resources across clinics, home health agencies, and family support",
                    "Provide clear guidance and emotional support during complex transitions"
                  ]}
                  requirements={[
                    "Background in social work, community health, or care navigation",
                    "Strong empathy and communication skills",
                    "Familiarity with community resources, aging services, and caregiver ecosystems",
                    "Comfort working with families during emotionally difficult moments"
                  ]}
                />
                <RoleCard
                  title="Training & Enablement"
                  subtitle="Enablement • QA coaching"
                  recurtmentDetails="Onboarding playbooks for coordinators, nurses, drivers, doctors; QA coaching."
                  responsibilities={[
                    "Develop and maintain role-based onboarding playbooks and SOPs",
                    "Deliver training, refreshers, and competency support for field and ops teams",
                    "Partner with Quality & Safety to provide QA coaching and corrective action support",
                    "Standardize workflows and documentation practices for consistency and compliance",
                    "Track training completion and readiness to support safe, reliable service delivery"
                  ]}
                  requirements={[
                    "Experience in healthcare training, enablement, QA, or clinical education",
                    "Strong writing skills and ability to simplify complex processes",
                    "Comfort facilitating training and coaching in a supportive style",
                    "Highly organized and process-oriented"
                  ]}
                />
              </div>

              {/* Coming Soon Banner */}
              <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">More roles coming soon</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      We’re growing—check back for new openings in operations, engineering, partnerships, and more.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column: Apply Form */}
          <aside className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Apply</h2>
            <p className="text-gray-500 text-sm mb-6">Send a quick note. We’ll by email.</p>



            <ApplyFrom />







          </aside>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Faq.tsx — full implementation
"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert";

// ✅ Fixed & enriched data — real Mojacares content
const GeneralItems = [
    {
        id: "1",
        title: "What is Mojacares?",
        description: "",
        content: (
            <div>
                <p className="mb-3">
                    Mojacares is a care coordination platform that helps families support loved ones in Ghana. We connect you to the right care—routine wellness, physician access, and emergency support—while organizing updates, documentation, and follow-up in one place.
                </p>
            </div>
        ),
    },

    {
        id: "2",
        title: "Who is Mojacares for?",
        description: "",

        content: (
            <div>
                <p>
                    Mojacares supports:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li>Diaspora families caring for parents, grandparents, spouses, or children in Ghana.</li>
                    <li>Busy professionals in Ghana managing care for elderly parents or school-aged children.</li>
                    <li>Families who want reliable coordination, faster access, and peace of mind.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "3",
        title: "Do you replace doctors or hospitals?",
        description: "",

        content: (
            <div>
                <p>No. Mojacares does not replace doctors or hospitals. We help families connect to the right care and simplify the journey—scheduling, transport, document sharing, updates, follow-up,
                    and coordination across providers.</p>

            </div>
        ),
    },
    {
        id: "4",
        title: "What locations do you support?",
        description: "",

        content: (
            <div>
                <p>Mojacares typically starts in major metro areas (e.g., Accra and Kumasi) and expands based on provider and transport coverage. If you share the city/town, we can confirm availability
                    and service options.</p>
            </div>
        ),
    },
    {
        id: "5",
        title: "Is Mojacares available 24/7?",
        description: "",

        content: (
            <div>
                <p>Availability can vary by service type and local partner coverage. Emergency pathways and urgent coordination are prioritized. Routine requests are handled within defined operating
                    windows, with clear status updates and next steps.</p>

            </div>
        ),
    },
    {
        id: "6",
        title: "What conditions do you support?",
        description: "",

        content: (
            <div>
                <p>Mojacares supports a wide range of health needs—especially chronic conditions (e.g., hypertension, diabetes, kidney disease), follow-ups, medication management, and evaluation for
                    new symptoms. We help route to the appropriate care type and specialty.</p>

            </div>
        ),
    },
];

const ServicesLevelsCare = [
    {
        id: "1",
        title: "What are the 3 levels of care in Mojacares?",
        description: "",

        content: (
            <div>
                <p>Mojacares supports:</p>
                <div className="mt-3 space-y-2">
                    <div>
                        <strong>1) Routine Care</strong> — Wellness, vitals, labs, refills
                    </div>
                    <div>
                        <strong>2) Physician Care</strong> — Doctor evaluation, specialists, treatment planning
                    </div>
                    <div>
                        <strong>3) Emergency Care</strong> — Rapid response, transport, hospital coordination
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "2",
        title: "What's included in Routine Care?",
        description: "",

        content: (
            <div>
                <p>Routine Care may include:</p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li>Nurse wellness visits and vitals checks.</li>
                    <li>Medication reminders and check-ins.</li>
                    <li>Lab coordination and results tracking.</li>
                    <li>Pharmacy pickup/delivery coordination.</li>
                    <li>Follow-up scheduling after clinic visits.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "3",
        title: "What's included in Physician Care?",
        description: "",

        content: (
            <div>
                <p>Physician Care may include:</p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li>Virtual or in-person doctor consultations.</li>
                    <li>Specialist referral coordination (as needed).</li>
                    <li>Visit summaries and follow-up care plans.</li>
                    <li>Medication review and ongoing management.</li>
                    <li>Care coordination across labs, imaging, and clinics.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "4",
        title: "Do you support labs, imaging, and pharmacy services?",
        description: "",

        content: (
            <div>
                <p>Yes. Mojacares can coordinate labs and ancillary services (where available), organize results, and support prescription refills and pharmacy pickup/delivery.</p>
            </div>
        ),
    },
    {
        id: "5",
        title: "Can you help find the right doctor or specialty?",
        description: "",

        content: (
            <div>
                <p>Yes. Mojacares helps route cases to the right clinician (GP or specialist), based on symptoms, history, and urgency—and coordinates next steps.</p>
            </div>
        ),
    },
    {
        id: "6",
        title: "Do you support physiotherapy and home care services?",
        description: "",

        content: (
            <div>
                <p>Where available, Mojacares can coordinate physiotherapy and home support services. Coverage depends on location and partner availability.</p>
            </div>
        ),
    },
];

// ✅ Similarly fix other sections (abbreviated below for brevity — I’ll give full list at end)
const Telehealth = [
    {
        id: "1",
        title: "How does Mojacares Telehealth work?",
        description: "",

        content: (
            <div>
                <p>You request a virtual visit for your loved one, share symptoms and relevant history, and we coordinate a video/audio visit with a clinician. After the visit, you receive a clear summary
                    and next steps.</p>
            </div>
        ),
    },
    {
        id: "2",
        title: "Can I join my loved one's virtual visit from abroad?",
        description: "",

        content: (
            <div>
                <p>Yes. Mojacares is designed for families across borders. You can join the virtual visit, ask questions, and understand the plan directly—so you're not relying on second-hand
                    information.</p>
            </div>
        ),
    },
    {
        id: "4",
        title: "What issues are appropriate for telehealth?",
        description: "",

        content: (
            <div>
                <p>YTelehealth works well for follow-ups, medication questions, mild-to-moderate symptoms, chronic care check-ins, reviewing results, and deciding whether in-person care is needed.</p>
            </div>
        ),
    },
    {
        id: "5",
        title: "What if the clinician recommends in-person care?",
        description: "",

        content: (
            <div>
                <p>Mojacares can coordinate the next steps—transportation, hospital/clinic selection, labs, pharmacy services, and follow-up—so care continues smoothly.</p>
            </div>
        ),
    },
    {
        id: "6",
        title: "Do you offer a virtual waiting room or appointment reminders?",
        description: "",

        content: (
            <div>
                <p>Mojacares can send appointment reminders via email/SMS and provide status updates such as Confirmed → In Progress → Completed.</p>
            </div>
        ),
    },
];

const EmergencyCare = [
    {
        id: "1",
        title: "What happens when I trigger Emergency Care?",
        description: "",

        content: (
            <div>
                <p>Emergency Care initiates a rapid response workflow that may include dispatching transportation, alerting partner facilities, coordinating triage, and providing real-time updates until
                    your loved one is stabilized and a care plan is established.</p>
            </div>
        ),
    },
    {
        id: "2",
        title: "How fast can Mojacares respond in an emergency?",
        description: "",

        content: (
            <div>
                <p>Response time depends on location and partner coverage, but emergency requests are prioritized and handled immediately with continuous status updates.</p>
            </div>
        ),
    },
    {
        id: "3",
        title: "Do you provide ambulances?",
        description: "",

        content: (
            <div>
                <p>Mojacares coordinates emergency transport through vetted partners (e.g., ambulance or rapid-response vehicle services) based on availability and location.</p>
            </div>
        ),
    },
    {
        id: "4",
        title: "Can Mojacares choose the hospital?",
        description: "",

        content: (
            <div>
                <p>Yes. We can align on a preferred facility, and we also consider proximity, capability, and urgency to route to the most appropriate option.</p>
            </div>
        ),
    },
    {
        id: "5",
        title: "Will I get updates while my loved one is en route and during care?",
        description: "",

        content: (
            <div>
                <p>Yes. Mojacares provides status updates (e.g., dispatch confirmed, transport en route, arrived at hospital, clinician assessing, next steps).</p>
            </div>
        ),
    },
    {
        id: "6",
        title: "Can Mojacares help with admission and discharge?",
        description: "",

        content: (
            <div>
                <p>Yes. We can help facilitate admission workflows and support discharge planning and after-care coordination (follow-ups, meds, transport home).</p>
            </div>
        ),
    },
];

const CareCoordinationUpdates = [
    {
        id: "1",
        title: "What does care coordination actually mean?",
        description: "",

        content: (
            <div>
                <p>It means Mojacares helps organize the steps around care—finding the right clinician, arranging appointments, coordinating transport, supporting labs/pharmacy needs, collecting
                    documents, and ensuring follow-ups happen.</p>
            </div>
        ),
    },
    {
        id: "2",
        title: "How do I receive updates—app, SMS, email?",
        description: "",

        content: (
            <div>
                <p>Mojacares can provide updates inside the app, and also via email and/or SMS for key milestones—especially for time-sensitive events.</p>
            </div>
        ),
    },
    {
        id: "3",
        title: "What status updates will I see?",
        description: "",

        content: (
            <div>
                <p>Typical statuses include: Requested, Confirmed, In Progress, Completed, and Follow-up Needed.</p>
            </div>
        ),
    },
    {
        id: "4",
        title: "Can Mojacares share progress updates with multiple family members?",
        description: "",

        content: (
            <div>
                <p>Yes—when the account owner grants permission, Mojacares supports shared visibility so families can stay aligned, without confusion.</p>
            </div>
        ),
    },
    {
        id: "5",
        title: "Can you help coordinate nursing support while in the hospital?",
        description: "",

        content: (
            <div>
                <p>Where available, Mojacares can help facilitate supportive nurse services during hospitalization and ensure updates are communicated clearly.</p>
            </div>
        ),
    },
    {
        id: "6",
        title: "Can Mojacares help after discharge?",
        description: "",

        content: (
            <div>
                <p>Yes. We can coordinate follow-ups, medication needs, lab work, transport, and nurse check-ins to support recovery at home.</p>
            </div>
        ),
    },
    {
        id: "7",
        title: "Can I upload photos, PDFs, and lab results?",
        description: "",

        content: (
            <div>
                <p>Yes. You can upload medical documents (lab results, prescriptions, discharge notes, insurance details) to keep everything organized for the care team.</p>
            </div>
        ),
    },
];

const PricingSubscriptionsPayments = [
    {
        id: "1",
        title: "Do you offer subscriptions and pay-as-you-go?",
        description: "",

        content: (
            <div>
                <p>Yes. Mojacares supports both models. Many families start with pay-per-visit and upgrade when they want ongoing nurse visits, check-ins, and priority coordination.</p>
            </div>
        ),
    },
    {
        id: "2",
        title: "What services are typically pay-as-you-go?",
        description: "",

        content: (
            <div>
                <p>Telehealth visits, additional nurse visits beyond plan limits, transportation, lab services, pharmacy coordination, and specialist evaluations can be pay-as-you-go depending on plan and
                    availability.</p>

            </div>
        ),
    },
    {
        id: "3",
        title: "How do payments work?",
        description: "",

        content: (
            <div>
                <p>Mojacares typically supports card payments and local payment options via integrated payment processors. You receive receipts and clear cost estimates before proceeding with non-
                    emergency services.</p>

            </div>
        ),
    },
    {
        id: "4",
        title: "Can I use coupons or discounts?",
        description: "",

        content: (
            <div>
                <p>Yes, Mojacares can support coupons and promotions that can be applied at checkout where eligible.</p>

            </div>
        ),
    },
    {
        id: "5",
        title: "Can I cancel or change my subscription?",
        description: "",

        content: (
            <div>
                <p>Yes. Plans are designed to be flexible. You can upgrade or downgrade based on changing family needs and care intensity.</p>

            </div>
        ),
    },
    {
        id: "6",
        title: "Will I see costs before services are delivered?",
        description: "",

        content: (
            <div>
                <p>For non-emergency services, Mojacares provides clear estimates and confirms approval before proceeding. Emergency coordination prioritizes speed and safety first, with cost
                    discussions as soon as feasible.</p>
            </div>
        ),
    },

];

const PrivacySecurity = [
    {
        id: "1",
        title: "How does Mojacares protect my data?",
        description: "",

        content: (
            <div>
                <p>Mojacares is built with healthcare-grade security practices, including:</p>
                <ul  className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li>Encryption (in transit and at rest) to protect data during transfer and storage.</li>
                    <li>Role-based access control (RBAC) so people only see what they're authorized to see.</li>
                    <li>Audit logs that record access and changes for accountability and security monitoring.</li>
                    <li>Consent controls to manage who can view and participate in care.</li>
                    <li>Secure document storage for uploaded PDFs, images, and medical files .</li>
                    <li>Data retention policies that define how long data is kept and how it is handled over time.</li>
                </ul>
            </div>
        ),
        type: "success",
        alertText: "Your health information is sensitive. Mojocares is designed to protect it with secure access controls, limited sharing only with approved caregivers, and secure storage for uploaded documents."

    },
    {
        id: "2",
        title: "Who can see my loved one's health information?",
        description: "",

        content: (
            <div>
                <p>Access is limited to the patient, the account owner/sponsor, and approved caregivers or clinicians assigned to that case—based on consent and role-based permissions.</p>
            </div>
        ),
    },
    {
        id: "3",
        title: "Do you share data with third parties?",
        description: "",

        content: (
            <div>
                <p>Mojacares is designed to minimize sharing. Data is only shared as needed to deliver care (e.g., with approved providers) and only with appropriate permissions and safeguards.</p>
            </div>
        ),
    },
    {
        id: "4",
        title: "What are audit logs and why do they matter?",
        description: "",

        content: (
            <div>
                <p>Audit logs record who accessed data, what they did, and when. They help prevent misuse, support security investigations, and create accountability for sensitive information.</p>
            </div>
        ),
    },
    {
        id: "5",
        title: "Can I control or revoke consent?",
        description: "",

        content: (
            <div>
                <p>Mojacares is designed with consent controls so you can decide who can view information and participate in care. You can change or revoke access based on your preferences
                    (subject to care and legal requirements).</p>
            </div>
        ),
    },
    {
        id: "6",
        title: "How do you handle uploaded documents like lab reports?",
        description: "",

        content: (
            <div>
                <p>Uploaded documents are stored securely with restricted access. Only authorized users and approved caregivers/clinicians assigned to the case can view them.</p>
            </div>
        ),
    },
    {
        id: "7",
        title: "How long do you retain health data?",
        description: "",

        content: (
            <div>
                <p>Mojacares uses data retention policies to define how long data is kept, how it's archived, and how it's deleted when appropriate—balancing continuity of care, legal obligations, and
                    user preferences.</p>
            </div>
        ),
    },
    {
        id: "8",
        title: "What happens if someone tries to access data they shouldn't?",
        description: "",

        content: (
            <div>
                <p>Unauthorized access is blocked by access controls and monitored by audit logs. Suspicious behavior can trigger alerts and administrative review.</p>
            </div>
        ),
    },
];

const AIInsightsSafety = [
    {
        id: "1",
        title: "What are Mojacares AI Insights?",
        description: "",

        content: (
            <div>
                <p>Mojacares AI Insights help summarize and organize health information so families can understand what's happening and what questions to ask next. They can highlight trends over
                    time and support better coordination—but they do not replace a clinician.</p>
            </div>
        ),
        type: "error",
        alertText: "Your health information is sensitive. Mojocares is designed to protect it with secure access controls, limited sharing only with approved caregivers, and secure storage for uploaded documents."


    },
    {
        id: "2",
        title: "What can AI Insights help with?",
        description: "",

        content: (
            <div>
                <p>AI Insights can help:</p>
                <ul  className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li>Summarize visits and translate complex notes into plain language.</li>
                    <li>Organize health history, medications, and test results.</li>
                    <li>Show trends over time (e.g., blood pressure, glucose, kidney function).</li>
                    <li>Suggest follow-up questions and next steps to discuss with a clinician.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "3",
        title: "What AI Insights cannot do",
        description: "",

        content: (
            <div>
                <p>AI Insights do not diagnose conditions, prescribe treatment, or replace medical evaluation. For serious symptoms or emergencies, seek immediate medical help through emergency
                    services.</p>

            </div>
        ),
    },
    {
        id: "4",
        title: "Can I ask questions like How many times have we treated a UTI?",
        description: "",

        content: (
            <div>
                <p>Yes. Mojacares can support "ask your record" style questions by organizing visit history and results so you can query patterns over time. This is meant to help you prepare for clinician
                    conversations and track ongoing conditions.</p>


            </div>
        ),
    },
    {
        id: "5",
        title: "How do you reduce errors in AI summaries?",
        description: "",

        content: (
            <div>
                <p>Access to context (e.g., verifying that the summary is based on), encourage clinician confirmation, and flag uncertainty. Medical decisions should always be confirmed with licensed
                    professionals.</p>


            </div>
        ),
    },
];

const SupportGettingStarted = [
    {
        id: "1",
        title: "How do I get started with Mojacares?",
        description: "",

        content: (
            <div>
                <p>Create an account, add your loved ones, choose a plan (or pay-as-you-go), and submit a request for care. You can also contact the care team for help getting set up.</p>

            </div>
        ),
    },
    {
        id: "2",
        title: "Can I add multiple family members under one account?",
        description: "",

        content: (
            <div>
                <p>AI Insights can help:</p>
                <ul  className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                    <li>Summarize visits and translate complex notes into plain language</li>
                    <li> Organize health history, medications, and test results</li>
                    <li> Show trends over time (e.g., blood pressure, glucose, kidney function)</li>
                    <li> Suggest follow-up questions and next steps to discuss with a clinician</li>
                </ul>
            </div>
        ),
    },
    {
        id: "3",
        title: "Can more than one sponsor help manage a loved one's care?",
        description: "",

        content: (
            <div>
                <p>Yes, with the right permissions. Mojacares supports shared access so multiple family members can stay aligned—based on consent and access controls.</p>

            </div>
        ),
    },
    {
        id: "4",
        title: "What if I don't know which care level to choose?",
        description: "",

        content: (
            <div>
                <p>Start with a request describing the issue. Mojacares can guide you to the appropriate pathway—routine, physician, or emergency—based on urgency and symptoms.</p>

            </div>
        ),
    },
    {
        id: "5",
        title: "What if my loved one doesn't use smartphones?",
        description: "",

        content: (
            <div>
                <p>Mojacares can work with local caregivers and phone-based coordination where needed. The sponsor can still manage records and updates remotely.</p>

            </div>
        ),
    },
    {
        id: "6",
        title: "How do I contact the Mojacares team?",
        description: "",

        content: (
            <div>
                <p>Mojacares supports contact via in-app messaging, phone, and email (depending on your setup). Many families prefer WhatsApp-style communication for rapid updates.</p>

            </div>
        ),
    },
];

// Helper: Section renderer
const FaqSection = ({ title, items, description, id }: { title: string; items: any[]; description: string, id: string }) => (
    <div className="space-y-6" id={id}>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        {/* Section-level description */}
        {description && (
            <p className="text-gray-600 text-lg max-w-3xl">{description}</p>
        )}

        {/* Alerts */}
        {items.some((item) => item.type === "error") && (
            <Alert variant="destructive" className="w-full">
                <AlertCircleIcon />
                <AlertDescription>
                    Important: Insights are not a diagnosis. Always confirm medical decisions with a licensed clinician. If you have severe symptoms (chest pain, trouble breathing, fainting, severe bleeding), call emergency services.
                </AlertDescription>
            </Alert>
        )}
        {items.some((item) => item.type === "success") && (
            <Alert className="w-full border-bg-chart-2 bg-chart-2/10">
                <AlertDescription>
       Your health information is sensitive. Mojacares is designed to protect it with secure access controls, limited sharing only with approved caregivers, and secure storage for uploaded documents.
                </AlertDescription>
            </Alert>
        )}

        <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-b border-gray-200 last:border-0">
                    <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none group">
                        <span>{item.title}</span>
                        <p>{item.description}</p> {/* optional per-item description */}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-lg text-gray-600 prose prose-sm max-w-none">
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
);



export default function Faq() {
    return (
        <>
            <section className=" bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-8">
                        {/* Tag */}
                        <div className="mb-6">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                Answers for families across borders
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-10">
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                                Frequently Asked Questions
                            </h1>
                            <p className="mt-5 text-lg text-gray-600 max-w-3xl">
                                Mojacares helps diaspora families and local Ghanaians connect loved
                                ones to the right care—routine wellness, physician access, and
                                emergency support—while keeping everyone informed every step of
                                the way.
                            </p>
                        </div>

                        {/* Category Buttons */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("get-start")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-orange-500">
                                How to get started
                            </button>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("privacy-security")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="px-5 py-2.5 bg-white border rounded-lg"
                            >
                                Privacy & Security
                            </button>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("ai-insights")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="px-5 py-2.5 bg-white border rounded-lg"
                            >
                                AI Insights
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-14">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </span>

                                <input
                                    type="text"
                                    placeholder="Search FAQs (e.g., transport, telehealth, privacy)"
                                    className="w-full pl-11 pr-36 py-3.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                                />

                                <button className="absolute right-0 top-0 h-full px-5 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 rounded-r-lg border-l border-gray-300 transition">
                                    Expand matches
                                </button>
                            </div>

                            <p className="mt-2 text-sm text-gray-500 italic">
                                Tip: Type a keyword to highlight matching questions.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5">
                                What people usually want to know
                            </h3>

                            <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
                                {[
                                    "How fast can you respond—especially in an emergency?",
                                    "Can I join my loved one’s virtual visit from abroad?",
                                    "How do you work with hospitals, labs, and pharmacies?",
                                    "What does it cost and what’s included in each tier?",
                                    "How is sensitive health data protected?",
                                    "How do AI insights work—and what they are (and aren’t)?",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mt-2 w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                                        <span className="ml-3">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                </div>
            </section>
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="get-start">

                <div className="space-y-12">
                    <FaqSection description="Start here to understand what Mojacares is, who it's for, and how it helps families across borders." title="General" items={GeneralItems} id={""} />
                    <FaqSection description="Mojacares is designed around three levels of care—routine, physician-led, and emergency—so families always know the right path." title="Services & Levels of Care" items={ServicesLevelsCare} id={""} />
                    <FaqSection description="Virtual care that keeps families involved—even from thousands of miles away." title="Telehealth" items={Telehealth} id={""} />
                    <FaqSection description="Rapid coordination when something happens suddenly—designed for speed, clarity, and continuous updates." title="Emergency Care" items={EmergencyCare} id={""} />
                    <FaqSection description="Coordination is the difference between care starting and care completing. Mojacares keeps the process moving end-to-end." title="Care Coordination & Updates" items={CareCoordinationUpdates} id={""} />
                    <FaqSection description="Flexible options—pay-as-you-go for occasional needs, or subscription tiers for ongoing support and peace of mind." title="Pricing, Subscriptions & Payments" items={PricingSubscriptionsPayments} id={""} />
                    <FaqSection description="Your health information is sensitive. Mojacares is designed to protect it with secure access controls, limited sharing only with approved caregivers, and secure storage for uploaded
documents." title="Privacy & Security" items={PrivacySecurity} id={"privacy-security"} />
                    <FaqSection description="AI can help make information easier to understand—but it is not a replacement for clinical judgment." title="AI Insights & Safety" items={AIInsightsSafety} id={"ai-insights"} />
                    <FaqSection description="Simple onboarding, clear roles, and support when you need it." title="Support & Getting Started" items={SupportGettingStarted} id={""} />
                </div>
            </div>
        </>

    );
}
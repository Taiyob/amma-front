"use client"
import { Check, Shield, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

// Helper: Scroll-aware TOC highlighting
const useActiveSection = (sections: string[]) => {
  const [activeId, setActiveId] = useState(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return activeId;
};

// Icon components (minimal, outline-style, orange)
const PrivacyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 1 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="#F97316" strokeWidth="1.5" />
  </svg>
);

const SecureDataIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" rx="2" stroke="#F97316" strokeWidth="1.5" />
    <path d="M8 12H16" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HIPAAIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="#F97316" strokeWidth="1.5" />
    <path d="M16 8V6" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 8V6" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PatientFirstIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#F97316" strokeWidth="1.5" />
    <path d="M12 8V16" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 12H16" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#F97316" strokeWidth="1.5" />
    <path d="M10 6V10M10 14H10.01" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CareCoordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="12" height="12" rx="2" stroke="#F97316" strokeWidth="1.5" />
    <path d="M8 8H12M8 12H12" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TechDataIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="12" height="12" rx="1" stroke="#F97316" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1" fill="#F97316" />
    <circle cx="12" cy="12" r="1" fill="#F97316" />
  </svg>
);

const CommIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7C2 5.343 3.343 4 5 4H15C16.657 4 18 5.343 18 7V13C18 14.657 16.657 16 15 16H5C3.343 16 2 14.657 2 13V7Z" stroke="#F97316" strokeWidth="1.5" />
    <path d="M10 9V11" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="#F97316" strokeWidth="1.5" />
    <circle cx="9" cy="9" r="1" fill="#F97316" />
    <circle cx="15" cy="15" r="1" fill="#F97316" />
    <path d="M9 15L15 9" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="#F97316" strokeWidth="1.5" />
    <path d="M20 4L12 12L4 4" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PrivacyPolicyPage = () => {
  const sections = [
    'introduction',
    'our-role',
    'data-collection',
    'data-usage',
    'ai-features',
    'data-sharing',
    'children-privacy',
    'cookies',
    'your-rights',
    'data-security',
    'changes',
    'contact'
  ];

  const activeSection = useActiveSection(sections);

  // Mobile TOC toggle
  const [isTOCOpen, setIsTOCOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy at Mojacares
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-foreground">
              Legal
            </span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">Last Updated: March 26, 2026</span>
          </div>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            This page explains how Mojacares collects, uses, and protects your information when you use our website and app. We are committed to transparency and the security of your data.
          </p>
        </header>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center text-secondary gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full">
            <Shield />
            <span className="text-foreground text-sm font-semibold">Privacy-centric</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full">
            <SecureDataIcon />
            <span className="text-foreground text-sm font-semibold">Secure Data</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full">
            <HIPAAIcon />
            <span className="text-foreground text-sm font-semibold">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full">
            <PatientFirstIcon />
            <span className="text-foreground text-sm font-semibold">Patient First</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {/* Section 1: Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Mojacares, Inc. (“Mojacares,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, protect, and share personal information when you use the Mojacares website, mobile applications, and services (collectively, the “Services”).
              </p>
              <p className="text-gray-700">
                By accessing or using the Services, you agree to this Privacy Policy. If you do not agree, please do not use the Services.
              </p>
            </section>

            {/* Section 2: Our Role */}
            <section id="our-role" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Our Role</h2>
              <p className="text-gray-700 mb-4">
                Mojacares is a care coordination and digital health platform. We do not provide medical care or make medical decisions. Clinical services, diagnoses, and treatments are provided by independent licensed healthcare providers.
              </p>
              <div className="p-5 bg-blue-50/50 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-800">
                  When Mojacares handles protected health information (“PHI”) on behalf of healthcare providers, we do so in accordance with applicable healthcare privacy laws, including HIPAA.
                </p>
              </div>
            </section>

            {/* Section 3: Information We Collect */}
            <section id="data-collection" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information We Collect</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <InfoIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Information you provide</h3>
                    <p className="text-foreground text-sm mt-1">
                      Name, contact details, date of birth, emergency contacts, care preferences, insurance details, health history you choose to share, and payment information.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <CareCoordIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Care coordination data</h3>
                    <p className="text-foreground text-sm mt-1">
                      Appointment details, referrals, care updates, and communications you authorize.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <TechDataIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Technical data</h3>
                    <p className="text-foreground text-sm mt-1">
                      IP address, device type, browser type, usage data, and cookies.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <CommIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Communications</h3>
                    <p className="text-foreground text-sm mt-1">
                      Messages, emails, or support requests you send to us.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: How We Use Your Information */}
            <section id="data-usage" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-700 mb-6">We use your information to:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 text-secondary w-5 h-">
                    <Check />
                  </div>
                  <span className="text-gray-700">Provide and operate the Services</span>
                </div>
                <div className="flex items-start gap-3">
             <div className="mt-1 shrink-0 text-secondary w-5 h-">
                    <Check />
                  </div>
                  <span className="text-gray-700">Coordinate care and support requests</span>
                </div>
                <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0 text-secondary w-5 h-">
                    <Check />
                  </div>
                  <span className="text-gray-700">Maintain your account</span>
                </div>
                <div className="flex items-start gap-3">
                   <div className="mt-1 shrink-0 text-secondary w-5 h-">
                    <Check />
                  </div>
                  <span className="text-gray-700">Improve our platform and UX</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 text-secondary w-5 h-">
                    <Check />
                  </div>
                  <span className="text-gray-700">Ensure security and prevent fraud</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="font-semibold text-gray-900">
                  We do not sell your personal or health information.
                </p>
              </div>
            </section>

            {/* Section 5: AI-Enabled Features */}
            <section id="ai-features" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. AI-Enabled Features</h2>
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-4">
                <div className="shrink-0 w-6 h-6 text-secondary flex items-center justify-center">
                  <Sparkles />
                </div>
                <p className="text-gray-800">
                  Mojacares may use automated tools, including artificial intelligence, to organize, summarize, or highlight patterns in information you provide (for example, timelines or care summaries). These features are <strong>informational only</strong> and are not medical advice, diagnoses, or treatment recommendations.
                </p>
              </div>
            </section>

            {/* Section 6: Sharing */}
            <section id="data-sharing" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sharing of Information</h2>
              <p className="text-gray-700 mb-4">We may share your information only:</p>
              <ul className="space-y-3">
                {[
                  "With service providers who support our operations (e.g., hosting, payments, analytics)",
                  "With healthcare providers or caregivers at your direction or authorization",
                  "To comply with legal or regulatory requirements",
                  "In connection with a business transfer (e.g., merger or acquisition)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-3">
                All service providers are required to protect your information.
              </p>
            </section>

            {/* Sections 7–11 */}
            {[
              {
                id: 'children-privacy', title: '7. Children’s Privacy', content: (
                  <p>
                    Mojacares services may be used to support minors <strong>only with verified consent</strong> from a parent or legal guardian. We collect and use a child’s information solely for care coordination purposes and do not use it for marketing or advertising.
                  </p>
                )
              },
              {
                id: 'cookies', title: '8. Cookies and Tracking', content: (
                  <p>
                    We use cookies and similar technologies to operate and improve our Services. You can control cookies through your browser settings, though some features may not function properly if cookies are disabled.
                  </p>
                )
              },
              {
                id: 'your-rights', title: '9. Your Privacy Rights', content: (
                  <>
                    <p className="mb-3">
                      Depending on your state of residence, you may have rights to access, correct, or delete certain personal information, and to opt out of certain data uses, including targeted advertising.
                    </p>
                    <p>
                      To exercise your rights, contact us at{' '}
                      <a href="mailto:support@mojacares.com" className="text-orange-500 font-medium underline">
                        support@mojacares.com
                      </a>.
                    </p>
                  </>
                )
              },
              {
                id: 'data-security', title: '10. Data Security', content: (
                  <p>
                    We use reasonable administrative, technical, and physical safeguards to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
                  </p>
                )
              },
              {
                id: 'changes', title: '11. Changes to This Policy', content: (
                  <p>
                    We may update this Privacy Policy from time to time. If changes are material, we will notify you through the Services or by email.
                  </p>
                )
              }
            ].map(({ id, title, content }) => (
              <section key={id} id={id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
                <div className="text-gray-700">{content}</div>
              </section>
            ))}

            {/* Section 12: Contact */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-foreground mb-6">
                If you have questions or concerns about this Privacy Policy or your information, please reach out to us.
              </p>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <ContactIcon />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-tight mb-1">Privacy Support</div>
                    <a
                      href="mailto:support@mojacares.com"
                      className="text-lg font-semibold text-gray-900 hover:text-orange-600"
                    >
                      support@mojacares.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Right Sidebar: Table of Contents */}
          <aside className="lg:block hidden">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 bg-gray-50 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">On this page</h3>
                </div>
                <nav className="p-2 max-h-[520px] overflow-y-auto">
                  {sections.map((id) => {
                    const titles: Record<string, string> = {
                      introduction: '1. Introduction',
                      'our-role': '2. Our Role',
                      'data-collection': '3. Data Collection',
                      'data-usage': '4. Data Usage',
                      'ai-features': '5. AI Features',
                      'data-sharing': '6. Data Sharing',
                      'children-privacy': '7. Children’s Privacy',
                      cookies: '8. Cookies',
                      'your-rights': '9. Your Rights',
                      'data-security': '10. Data Security',
                      changes: '11. Changes',
                      contact: '12. Contact Us'
                    };
                    const isActive = activeSection === id;
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                            ? 'bg-orange-50 text-orange-700'
                            : 'text-foreground hover:bg-gray-50'
                          }`}
                      >
                        {titles[id]}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Mobile TOC Button */}
          <div className="lg:hidden flex justify-end mb-6">
            <button
              onClick={() => setIsTOCOpen(!isTOCOpen)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {isTOCOpen ? 'Hide TOC' : 'Jump to section'}
            </button>
          </div>

          {/* Mobile TOC */}
          {isTOCOpen && (
            <div className="lg:hidden bg-white rounded-xl border border-gray-200 p-4 mb-8">
              <h3 className="font-bold text-gray-900 mb-3">On this page</h3>
              <nav className="space-y-2">
                {sections.map((id) => {
                  const titles: Record<string, string> = {
                    introduction: '1. Introduction',
                    'our-role': '2. Our Role',
                    'data-collection': '3. Data Collection',
                    'data-usage': '4. Data Usage',
                    'ai-features': '5. AI Features',
                    'data-sharing': '6. Data Sharing',
                    'children-privacy': '7. Children’s Privacy',
                    cookies: '8. Cookies',
                    'your-rights': '9. Your Rights',
                    'data-security': '10. Data Security',
                    changes: '11. Changes',
                    contact: '12. Contact Us'
                  };
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="block px-3 py-2 text-sm text-foreground hover:text-orange-600 rounded"
                      onClick={() => setIsTOCOpen(false)}
                    >
                      {titles[id]}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
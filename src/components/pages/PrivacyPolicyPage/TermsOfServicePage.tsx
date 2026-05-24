"use client"

// Reusable Section Component
const Section = ({ id, title, children }: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-lg font-semibold text-zinc-900 mb-3 pb-0.5 border-b border-transparent">
      {title}
    </h2>
    <div className="text-neutral-500 text-base leading-6">{children}</div>
  </section>
);

const TermsOfServicePage = () => {


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-[0_1px_4px_0_rgba(0,0,0,0.02),_0_4px_20px_0_rgba(0,0,0,0.03)] p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-zinc-900 leading-tight mb-2">
              Terms of Service
            </h1>
            <p className="text-xs text-foreground">Last updated: March 24, 2026</p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <Section id="about" title="1. About Mojacares">
              Mojacares, Inc. (“Mojacares,” “we,” “us,” or “our”) is a care coordination and digital health platform designed to help individuals and families organize health information, coordinate care, and connect with healthcare providers and support services.
              <br /><br />
              Mojacares does not provide medical care, diagnosis, or treatment. Clinical services are provided by independent, licensed healthcare professionals.
            </Section>

            <Section id="eligibility" title="2. Eligibility">
              You must be at least 18 years old to use the Services, unless you are a parent or legal guardian using the Services on behalf of a minor with appropriate authority and consent.
              <br />
              By using the Services, you represent that you have the legal capacity to enter into these Terms.
            </Section>

            <Section id="no-medical-advice" title="3. No Medical Advice">
              Information provided through the Services, including care summaries, reminders, insights, or AI-generated outputs, is for informational and care coordination purposes only.
              <br />
              Mojacares does not provide medical advice.
              <br />
              Do not rely on the Services for medical decisions.
              <br />
              Always consult a licensed healthcare provider for diagnosis or treatment.
              <br />
              If you believe you are experiencing a medical emergency, call emergency services immediately.
            </Section>

            <Section id="ai-features" title="4. AI-Enabled Features">
              Mojacares may use automated tools, including artificial intelligence, to help organize, summarize, or highlight patterns in information you provide.
              <br />
              You understand and agree that:
              <ul className="list-disc pl-5 space-y-1 mt-2 text-neutral-500">
                <li>AI outputs may be incomplete or inaccurate.</li>
                <li>AI outputs are not clinical judgments.</li>
                <li>You are responsible for verifying information with qualified professionals.</li>
              </ul>
            </Section>

            <Section id="accounts" title="5. User Accounts">
              You are responsible for:
              <ul className="list-disc pl-5 space-y-1 mt-2 text-neutral-500">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activity that occurs under your account</li>
                <li>Providing accurate and up-to-date information</li>
              </ul>
              We may suspend or terminate accounts that violate these Terms or pose security or legal risks.
            </Section>

            <Section id="acceptable-use" title="6. Acceptable Use">
              You agree not to:
              <ul className="list-disc pl-5 space-y-1 mt-2 text-neutral-500">
                <li>Use the Services for unlawful purposes</li>
                <li>Interfere with the security or operation of the Services</li>
                <li>Upload false, misleading, or unauthorized information</li>
                <li>Attempt to access systems or data you are not authorized to use</li>
              </ul>
              We reserve the right to investigate and take action for violations.
            </Section>

            <Section id="payments" title="7. Payments and Subscriptions">
              If you purchase paid features or subscriptions:
              <ul className="list-disc pl-5 space-y-1 mt-2 text-neutral-500">
                <li>Fees will be disclosed before purchase</li>
                <li>Payments are non-refundable unless otherwise stated</li>
                <li>We may modify pricing or features with notice</li>
              </ul>
              Failure to pay may result in suspension or termination of access.
            </Section>

            <Section id="privacy" title="8. Privacy">
              Your use of the Services is subject to our Privacy Policy and, where applicable, our Notice of Privacy Practices, which describe how we collect, use, and protect information.
            </Section>

            <Section id="ip" title="9. Intellectual Property">
              All content, software, designs, logos, and features of the Services are Mojacares or its licensors and are by intellectual property laws.
              <br />
              You are granted a limited, non-exclusive, non-transferable license to use the Services for personal, non-commercial purposes.
            </Section>

            <Section id="third-party" title="10. Third-Party Services">
              The Services may link to or integrate with third-party services. Mojacares is not responsible for third-party content, policies, or practices.
              <br />
              Your use of third-party services is subject to their terms.
            </Section>

            {/* Skip #11 (missing in source) */}
            <Section id="limitation-liability" title="12. Limitation of Liability">
              To the fullest extent permitted by law, Mojacares shall not be liable for any indirect, incidental, or consequential damages, including loss of data, profits, or use, or for decisions made based on information provided through the Services.
              <br />
              Your sole remedy is to stop using the Services.
            </Section>

            <Section id="indemnification" title="13. Indemnification">
              You agree to indemnify and hold harmless Mojacares from claims arising out of your use of the Services, your violation of these Terms, or your misuse of information or reliance on non-medical content.
            </Section>

            <Section id="termination" title="14. Termination">
              We may suspend or terminate your access to the Services at any time, with or without notice, if you violate these Terms or if continued use poses risk.
              <br />
              You may stop using the Services at any time.
            </Section>

            <Section id="governing-law" title="15. Governing Law">
              These Terms are governed by the laws of the state in which Mojacares is incorporated, without regard to conflict-of-law principles.
            </Section>

            <Section id="changes" title="16. Changes to These Terms">
              We may update these Terms from time to time. Continued use of the Services after changes become effective constitutes acceptance of the revised Terms.
            </Section>

            <Section id="contact" title="17. Contact Us">
              If you have questions about these Terms, contact us at:
              <br />
              Email: <a href="mailto:support@mojacares.com" className="text-neutral-500 underline hover:text-orange-600">
                support@mojacares.com
              </a>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
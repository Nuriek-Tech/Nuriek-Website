import { useState } from 'react';

const DOCS = [
  {
    id: 'terms',
    label: 'Terms of Service',
    updated: 'November 21, 2025',
    sections: [
      {
        heading: '1. Agreement to Terms',
        body: `Welcome to Nuriek. By accessing or using our website nuriek.com, products, or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). These Terms constitute a legally binding agreement between you and Nuriek.

If you do not agree to these Terms, you must not access or use our Services. We reserve the right to modify these Terms at any time. Continued use of our Services after changes constitutes acceptance of the modified Terms.`,
      },
      {
        heading: '2. Eligibility & Accounts',
        subsections: [
          {
            title: '2.1 Age Requirement',
            body: 'You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this age requirement.',
          },
          {
            title: '2.2 Account Creation',
            body: 'When you create an account, you agree to: provide accurate, current, and complete information; maintain and promptly update your account information; keep your password secure and confidential; accept responsibility for all activities under your account; notify us immediately of any unauthorized use.',
          },
          {
            title: '2.3 Account Termination',
            body: 'We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason.',
          },
        ],
      },
      {
        heading: '3. Use of Services',
        subsections: [
          {
            title: '3.1 License Grant',
            body: 'Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your personal or internal business purposes.',
          },
          {
            title: '3.2 Prohibited Activities',
            body: 'You agree not to: violate any applicable laws or regulations; infringe on intellectual property rights; transmit harmful code, viruses, or malware; attempt to gain unauthorized access to our systems; interfere with or disrupt our Services; use automated tools to access or scrape our Services without permission; impersonate any person or entity; harass, threaten, or abuse other users; use the Services for illegal or fraudulent purposes; reverse engineer, decompile, or disassemble our software.',
          },
          {
            title: '3.3 Content Standards',
            body: 'Any content you submit must be lawful, accurate, and not violate any third-party rights. You retain ownership of your content but grant us a license to use, modify, and display it as necessary to provide our Services.',
          },
        ],
      },
      {
        heading: '4. Service Availability',
        subsections: [
          {
            title: '4.1 Service Description',
            body: 'Nuriek provides SaaS products, consulting services, R&D solutions, and training programs. Service details, features, and availability may change without notice.',
          },
          {
            title: '4.2 Uptime',
            body: 'We strive to maintain 99.9% uptime but do not guarantee uninterrupted or error-free service. We may suspend services for maintenance, updates, or emergencies.',
          },
          {
            title: '4.3 Beta Features',
            body: 'Some features may be offered as "beta," "preview," or "experimental." These features are provided "as-is" and may be unstable or incomplete.',
          },
        ],
      },
      {
        heading: '5. Payments & Fees',
        subsections: [
          {
            title: '5.1 Pricing',
            body: 'Prices for our Services are stated on our website and may change at any time. We will provide notice of price changes for existing subscribers.',
          },
          {
            title: '5.2 Payment',
            body: 'All fees are in USD unless otherwise stated. Payment is due at the time of purchase or as specified in your agreement. You authorize us to charge your payment method for all fees. Subscription fees are billed in advance on a recurring basis. All sales are final; no refunds except as required by law.',
          },
          {
            title: '5.3 Taxes',
            body: 'You are responsible for all applicable taxes. We will collect taxes where required by law.',
          },
          {
            title: '5.4 Late Payment',
            body: 'If payment is overdue, we may suspend or terminate your access to Services until payment is received.',
          },
        ],
      },
      {
        heading: '6. Intellectual Property',
        subsections: [
          {
            title: '6.1 Ownership',
            body: `Nuriek and its licensors own all rights, title, and interest in the Services, including all intellectual property rights. Our trademarks, logos, and brand features are protected by law.`,
          },
          {
            title: '6.2 User Content',
            body: 'You retain ownership of content you submit. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, modify, reproduce, and display the content as necessary to provide our Services.',
          },
          {
            title: '6.3 Feedback',
            body: 'Any feedback, suggestions, or ideas you provide become our property, and we may use them without obligation or compensation.',
          },
        ],
      },
      {
        heading: '7. Privacy',
        body: `Your use of our Services is governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy to understand our data practices.`,
      },
      {
        heading: '8. Disclaimers & Warranties',
        body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW: our Services are provided "as is" and "as available" without warranties of any kind; we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement; we do not warrant that our Services will be uninterrupted, secure, or error-free; we do not warrant the accuracy or completeness of content on our Services; you use our Services at your own risk.`,
      },
      {
        heading: '9. Limitation of Liability',
        body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW: Nuriek and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages; this includes damages for lost profits, lost data, or business interruption; our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim. Some jurisdictions do not allow certain limitations of liability, so these limitations may not apply to you.`,
      },
      {
        heading: '10. Indemnification',
        body: `You agree to indemnify, defend, and hold harmless Nuriek and its affiliates from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from: your use of our Services; your violation of these Terms; your violation of any rights of another party; your content or conduct.`,
      },
      {
        heading: '11. Termination',
        subsections: [
          {
            title: '11.1 By You',
            body: 'You may terminate your account at any time by contacting us or through your account settings.',
          },
          {
            title: '11.2 By Us',
            body: 'We may suspend or terminate your access to our Services immediately, without notice, for any reason, including violation of these Terms.',
          },
          {
            title: '11.3 Effect of Termination',
            body: 'Upon termination, your right to use our Services ceases immediately. Provisions that by their nature should survive termination shall continue to apply.',
          },
        ],
      },
      {
        heading: '12. Dispute Resolution',
        subsections: [
          {
            title: '12.1 Informal Resolution',
            body: 'Before filing a formal claim, you agree to contact us at hello@nuriek.com to attempt to resolve the dispute informally.',
          },
          {
            title: '12.2 Arbitration',
            body: 'Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.',
          },
          {
            title: '12.3 Class Action Waiver',
            body: 'You agree to resolve disputes on an individual basis and waive the right to participate in class actions or class-wide arbitrations.',
          },
        ],
      },
      {
        heading: '13. Governing Law',
        body: `These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.`,
      },
      {
        heading: '14. Changes to These Terms',
        body: `We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. We will provide notice of material changes through email or prominent notice on our Services. Your continued use of our Services after changes constitutes acceptance of the modified Terms.`,
      },
      {
        heading: '15. General',
        subsections: [
          { title: '15.1 Entire Agreement', body: 'These Terms constitute the entire agreement between you and Nuriek regarding our Services.' },
          { title: '15.2 Severability', body: 'If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force.' },
          { title: '15.3 Waiver', body: 'Our failure to enforce any right or provision shall not constitute a waiver of that right or provision.' },
          { title: '15.4 Assignment', body: 'You may not assign or transfer these Terms. We may assign our rights without restriction.' },
          { title: '15.5 Third-Party Rights', body: 'These Terms do not confer any third-party beneficiary rights.' },
        ],
      },
      {
        heading: '16. Contact',
        body: `Questions about these Terms? Contact us:\nEmail: hello@nuriek.com\nWebsite: nuriek.com/contact`,
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    updated: 'November 21, 2025',
    sections: [
      {
        heading: '1. Introduction',
        body: `Nuriek ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our products and services, or engage with us in any way.

By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.`,
      },
      {
        heading: '2. Information We Collect',
        subsections: [
          {
            title: '2.1 Personal Information',
            body: 'We may collect personally identifiable information that you voluntarily provide: Contact Information (name, email address, phone number, company name, job title); Account Information (username, password, profile information); Payment Information (billing address, payment method details processed securely by third-party providers); Communication Data (messages, feedback, support requests, survey responses); Resume/CV when applying for positions through our careers page.',
          },
          {
            title: '2.2 Automatically Collected Information',
            body: 'Technical Data: IP address, browser type and version, device information, operating system. Usage Data: pages visited, time spent, click patterns, referral sources. Cookies & Tracking: session data, preferences, analytics information. Log Data: server logs, error reports, performance metrics.',
          },
          {
            title: '2.3 Third-Party Sources',
            body: 'We may receive information about you from publicly available sources, business partners, and service providers that help us improve our services.',
          },
        ],
      },
      {
        heading: '3. How We Use Your Information',
        body: `We use the collected information for: Service Delivery — provide, operate, and maintain our products and services; Communication — respond to inquiries, provide customer support, send updates; Personalization — customize user experience, recommend relevant content; Marketing — send promotional materials and newsletters (with your consent); Analytics — analyze usage patterns, improve functionality, develop new features; Security — detect fraud, prevent abuse, protect user accounts; Legal Compliance — meet regulatory requirements, enforce terms of service; Business Operations — process transactions, manage accounts, conduct research.`,
      },
      {
        heading: '4. How We Share Your Information',
        subsections: [
          {
            title: '4.1 Service Providers',
            body: 'Third-party vendors who assist us with cloud hosting and infrastructure (AWS, Azure, GCP), payment processing (Stripe, PayPal), email delivery and marketing automation, analytics and performance monitoring, and customer support tools.',
          },
          {
            title: '4.2 Business Partners',
            body: 'With your consent, we may share information with partners to provide joint services or promotional offers.',
          },
          {
            title: '4.3 Legal Requirements',
            body: 'We may disclose information to comply with legal obligations, court orders, government requests, or to protect our rights and safety.',
          },
          {
            title: '4.4 Business Transfers',
            body: 'In case of merger, acquisition, or sale of assets, your information may be transferred to the new entity.',
          },
        ],
      },
      {
        heading: '5. Data Security',
        body: `We implement industry-standard security measures to protect your personal information: SSL/TLS encryption for data transmission; encrypted storage of sensitive data; regular security audits and vulnerability assessments; access controls and authentication mechanisms; employee training on data protection; incident response and breach notification procedures.

However, no method of transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`,
      },
      {
        heading: '6. Data Retention',
        body: `We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Retention periods vary based on the nature of the information, the purpose for which it was collected, legal and regulatory requirements, and business operational needs.

When data is no longer needed, we securely delete or anonymize it.`,
      },
      {
        heading: '7. Your Privacy Rights',
        body: `Depending on your location, you may have the following rights:
— Access: request access to your personal data
— Correction: request correction of inaccurate or incomplete data
— Deletion: request deletion of your personal data
— Restriction: request restriction of processing
— Portability: request transfer of your data to another service
— Objection: object to processing of your data
— Withdraw Consent: withdraw consent for data processing
— Opt-Out: unsubscribe from marketing communications

To exercise these rights, contact us at privacy@nuriek.com`,
      },
      {
        heading: '8. Cookies & Tracking Technologies',
        body: `We use cookies and similar tracking technologies to enhance your experience:
— Essential Cookies: required for website functionality
— Analytics Cookies: help us understand how users interact with our site
— Marketing Cookies: track user behaviour for targeted advertising
— Preference Cookies: remember your settings and preferences

You can control cookies through your browser settings. Note that disabling certain cookies may limit website functionality.`,
      },
      {
        heading: '9. Third-Party Links',
        body: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.`,
      },
      {
        heading: `10. Children's Privacy`,
        body: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.`,
      },
      {
        heading: '11. International Data Transfers',
        body: `Your information may be transferred to and processed in countries other than your own. We ensure adequate safeguards are in place to protect your data in accordance with applicable laws.`,
      },
      {
        heading: '12. Changes to This Policy',
        body: `We may update this privacy policy periodically. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy regularly. Continued use of our services after changes constitutes acceptance of the updated policy.`,
      },
      {
        heading: '13. Contact Us',
        body: `Questions, concerns, or requests regarding this privacy policy or our data practices?\n\nEmail: privacy@nuriek.com\nGeneral: hello@nuriek.com`,
      },
    ],
  },
];

function DocSection({ doc }) {
  const [open, setOpen] = useState(false);

  return (
    <div id={doc.id} className="border-t border-line">
      {/* ── toggle header ── */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between px-5 py-7 text-left sm:px-8"
        aria-expanded={open}
      >
        <div>
          <p className="eyebrow text-graphite">{doc.label}</p>
          <p className="mt-1 font-mono text-[0.65rem] text-graphite/55">Last updated {doc.updated}</p>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
          className="shrink-0 text-graphite transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* ── full content ── */}
      {open && (
        <div className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-[52rem] space-y-10">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                {/* section heading */}
                <h3 className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink">
                  {section.heading}
                </h3>
                <div className="mt-2 mb-4 h-px w-8 bg-ink/20" />

                {/* plain body */}
                {section.body && (
                  <p className="font-mono text-[0.82rem] leading-7 text-graphite whitespace-pre-line">
                    {section.body}
                  </p>
                )}

                {/* subsections */}
                {section.subsections && (
                  <div className="mt-4 space-y-5 pl-4 border-l border-line">
                    {section.subsections.map((sub) => (
                      <div key={sub.title}>
                        <p className="font-mono text-[0.72rem] font-semibold text-ink/80 uppercase tracking-[0.1em]">
                          {sub.title}
                        </p>
                        <p className="mt-2 font-mono text-[0.82rem] leading-7 text-graphite">
                          {sub.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function LegalSection() {
  return (
    <section className="border-t border-line bg-paper" aria-label="Legal">
      <div className="mx-auto max-w-[72rem]">
        {DOCS.map((doc) => (
          <DocSection key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  );
}

import { useId, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/ui.jsx';
import { usePageTitle } from '../lib/usePageTitle.js';
import { SITE, services } from '../lib/content.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  usePageTitle('Book a consultation');
  const uid = useId();
  const [sp] = useSearchParams();
  const preset = services.find((x) => x.id === sp.get('service'));
  const [f, setF] = useState({ name: '', email: '', company: '', interest: preset ? preset.title : '', message: '' });
  const [touched, setTouched] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const emailBad = touched && !EMAIL_RE.test(f.email.trim());
  const msgBad = touched && f.message.trim().length < 16;

  function submit(e) {
    e.preventDefault();
    setTouched(true);
    if (!EMAIL_RE.test(f.email.trim()) || f.message.trim().length < 16 || !f.name.trim()) return;
    const body = [
      `Name: ${f.name.trim()}`,
      `Email: ${f.email.trim()}`,
      `Company: ${f.company.trim() || '-'}`,
      `Interested in: ${f.interest || '-'}`,
      '',
      f.message.trim(),
    ].join('\n');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Consulting enquiry — ' + (f.company.trim() || f.name.trim()))}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHero
        tone={3}
        eyebrow="Contact"
        title="Book a consultation."
        lede="Tell us about the problem. We usually reply within two business days."
      />
      <section>
        <div className="mx-auto grid max-w-editorial gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <form onSubmit={submit} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}n`} className="eyebrow text-iris">Name</label>
                <input id={`${uid}n`} className="field mt-2" autoComplete="name" value={f.name} onChange={set('name')} required />
              </div>
              <div>
                <label htmlFor={`${uid}e`} className="eyebrow text-iris">Work email</label>
                <input id={`${uid}e`} type="email" className="field mt-2" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={emailBad} required />
                {emailBad && <p className="mt-1 font-mono text-xs">A valid email is needed.</p>}
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}c`} className="eyebrow text-iris">Company</label>
                <input id={`${uid}c`} className="field mt-2" autoComplete="organization" value={f.company} onChange={set('company')} />
              </div>
              <div>
                <label htmlFor={`${uid}i`} className="eyebrow text-iris">Interested in</label>
                <select id={`${uid}i`} className="field mt-2" value={f.interest} onChange={set('interest')}>
                  <option value="">Not sure yet</option>
                  {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={`${uid}m`} className="eyebrow text-iris">What are you trying to improve?</label>
              <textarea id={`${uid}m`} rows={6} className="field mt-2" value={f.message} onChange={set('message')} aria-invalid={msgBad} required />
              {msgBad && <p className="mt-1 font-mono text-xs">A little more detail, please (16+ characters).</p>}
            </div>
            <button type="submit" className="btn btn-solid">Send message</button>
            <p className="font-mono text-xs text-graphite">Sending opens your email app with the message ready to go.</p>
          </form>
          <aside className="space-y-6 text-ink/75">
            <p className="eyebrow text-iris">Prefer email?</p>
            <a className="link-underline text-2xl text-ink" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <p>Every enquiry is read by an engineer, not a sales queue.</p>
          </aside>
        </div>
      </section>
    </>
  );
}

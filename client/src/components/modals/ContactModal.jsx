import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from '../../lib/useLockBodyScroll.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactModal({ open, onClose }) {
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const closeRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setName('');
      setEmail('');
      setMessage('');
      setTouched(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const emailErr = touched && !EMAIL_RE.test(email.trim());
  const messageErr =
    touched && message.trim().length < 16;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!EMAIL_RE.test(email.trim()) || message.trim().length < 16) return;

    const subject = name.trim()
      ? `Nuriek — note from ${name.trim()}`
      : 'Nuriek — contact form';
    const body = [
      name.trim() ? `Name: ${name.trim()}` : null,
      `Email: ${email.trim()}`,
      '',
      message.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:hello@nuriek.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    onClose();
  }

  const modal = (
    <div
      className="fixed inset-0 z-[105] flex items-start justify-center p-4 pb-10 pt-10 sm:p-6 sm:pb-12 sm:pt-12"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/38 motion-safe:transition-opacity motion-safe:duration-300"
        aria-label="Close contact form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="paper-texture contact-postcard relative z-[1] w-full max-w-[min(100%,26rem)] overflow-hidden rounded-[2px] border border-ink/20 bg-[#faf9f6] shadow-[inset_0_0_0_1px_rgba(247,247,244,0.85),0_26px_70px_rgba(17,17,17,0.16)] motion-safe:animate-[editorial-rise_480ms_ease-editorial_both] sm:max-w-[min(100%,41rem)]"
      >
        <button
          ref={closeRef}
          type="button"
          className="absolute right-2 top-2 z-[2] flex h-10 w-10 items-center justify-center rounded-sm text-graphite transition-colors hover:bg-ink/[0.06] hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink sm:right-3 sm:top-3"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="text-xl font-light leading-none" aria-hidden>
            ×
          </span>
        </button>

        <div className="flex items-end justify-between border-b border-ink/10 px-5 pb-3 pt-10 sm:px-7 sm:pb-3.5 sm:pt-11">
          <h2
            id={titleId}
            className="font-serif text-[1.4rem] leading-tight tracking-[-0.02em] text-ink sm:text-[1.5rem]"
          >
            Contact Nuriek
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_minmax(9.25rem,10.75rem)]">
          <div className="border-b border-dashed border-ink/15 p-5 sm:p-7 md:border-b-0 md:border-r md:pb-8">
            <p className="font-serif text-[1.2rem] italic leading-snug text-ink/90 sm:text-[1.3rem]">
              A note in the mail
            </p>
            <p className="mt-3 max-w-[22rem] font-mono text-[0.76rem] leading-[1.65] text-graphite">
              Your message opens in your email app to send. Or write directly to{' '}
              <a className="link-underline text-ink" href="mailto:hello@nuriek.com">
                hello@nuriek.com
              </a>
              .
            </p>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label
                    htmlFor={nameId}
                    className="mb-1.5 block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink"
                  >
                    From
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact-postcard-input w-full"
                    placeholder="Name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor={emailId}
                    className="mb-1.5 block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink"
                  >
                    Reply-to<span className="font-normal text-graphite"> *</span>
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={emailErr}
                    aria-describedby={emailErr ? `${emailId}-err` : undefined}
                    className="contact-postcard-input w-full"
                    placeholder="you@domain.com"
                  />
                  {emailErr ? (
                    <p
                      id={`${emailId}-err`}
                      className="mt-1.5 font-mono text-[0.68rem] text-ink"
                    >
                      Valid email needed.
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor={messageId}
                  className="mb-1.5 block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  Message<span className="font-normal text-graphite"> *</span>
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={messageErr}
                  aria-describedby={messageErr ? `${messageId}-err` : undefined}
                  className="contact-postcard-input contact-postcard-textarea min-h-[8.5rem] w-full resize-y"
                  placeholder="Your lines here…"
                />
                {messageErr ? (
                  <p
                    id={`${messageId}-err`}
                    className="mt-1.5 font-mono text-[0.68rem] text-ink"
                  >
                    Add a little more (16+ characters).
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full border border-ink bg-ink py-3.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-paper transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ink/92 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink md:w-auto md:px-12"
              >
                Post letter
              </button>
            </form>
          </div>

          <aside
            className="flex flex-col gap-7 bg-[#f3f2ed]/85 p-6 sm:p-7 md:min-h-[26rem]"
            aria-label="Delivery address"
          >
            <div className="flex justify-end md:block">
              <div
                className="postmark-stamp rotate-[-2.5deg] sm:rotate-[-3deg]"
                aria-hidden
              >
                <span className="postmark-stamp-cancel" />
                <div className="postmark-stamp-rings pointer-events-none" />
                <div className="postmark-stamp-core">
                  <span className="postmark-stamp-star" aria-hidden>
                    ◆
                  </span>
                  <span className="postmark-stamp-word lowercase text-ink">
                    nuriek
                  </span>
                  <span className="postmark-stamp-rule" />
                  <span className="postmark-stamp-tagline lowercase">
                    memory · makers
                  </span>
                  <span className="postmark-stamp-year">Bangalore · 2026</span>
                </div>
              </div>
            </div>

            <div className="mt-auto font-mono text-[0.7rem] leading-[1.7] text-ink">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-graphite">
                Deliver to
              </p>
              <div className="mt-4 space-y-4 border-t border-dotted border-ink/20 pt-4">
                <p className="text-[0.8rem] font-medium tracking-tight">Nuriek</p>
                <p className="border-b border-ink/15 pb-0.5 text-graphite">
                  hello@nuriek.com
                </p>
                <p className="border-b border-ink/15 pb-0.5 text-graphite/90">
                  Bangalore, India
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

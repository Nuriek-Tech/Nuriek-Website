import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from '../../lib/useLockBodyScroll.js';

export function TeamModal({ open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  const team = [
    {
      name: 'Mariyam Annie Priya J',
      role: 'Co-Founder & MD',
      image: '/team-mariyam.png',
      bio: 'A marketing veteran with 15+ years of strategic leadership. Deeply focused on understanding human behaviour, crafting resonant narratives, and building authentic connections between people and platforms.',
    },
    {
      name: 'Sherin Thenayan',
      role: 'Co-Founder',
      image: '/team-sherin.png',
      bio: 'An operations authority with over 20 years of global expertise. Specialises in architecting resilient, scalable frameworks that turn ambitious visions into reliable, human-centric operational realities.',
    },
    {
      name: 'Arun',
      role: 'Founder',
      image: '/team-arun.png',
      bio: 'Passionate about foundational technology, adaptive intelligence, and long-term memory systems. Driven by the core belief that tools must adapt gracefully to real human context.',
    },
  ];

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pb-10 pt-10 sm:p-6 sm:pt-12"
      role="presentation"
    >
      {/* backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-ink/35 motion-safe:transition-opacity motion-safe:duration-300"
        aria-label="Close team modal"
        onClick={onClose}
      />

      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex max-h-[min(92dvh,860px)] w-full max-w-[min(72rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_28px_90px_rgba(17,17,17,0.22)] motion-safe:animate-[editorial-rise_520ms_ease-editorial_both]"
      >
        {/* sticky header */}
        <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5 sm:px-8">
          <div>
            <p className="eyebrow text-graphite">Meet the team</p>
            <h2 id={titleId} className="mt-0.5 font-serif text-lg italic text-ink">
              The humans behind the systems.
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-md text-graphite transition-colors hover:bg-ink/6 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <span className="text-xl font-light leading-none" aria-hidden>×</span>
          </button>
        </div>

        {/* scrollable body */}
        <div className="overflow-y-auto overscroll-contain px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className="group relative flex flex-col">
                <div className="relative w-full overflow-hidden border border-line bg-[#f0eee9]">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-[22rem] w-full object-cover object-top transition-all duration-500 filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:contrast-100 sm:h-[24rem]"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-ink/5" />
                </div>

                <div className="mt-5 flex flex-col">
                  <h3 className="font-serif text-[1.3rem] font-medium leading-snug text-ink">
                    {person.name}
                  </h3>
                  <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-graphite">
                    {person.role}
                  </p>
                  <p className="mt-3.5 font-mono text-[0.82rem] leading-relaxed text-graphite">
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

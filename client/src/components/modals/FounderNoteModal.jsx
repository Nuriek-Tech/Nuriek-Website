import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from '../../lib/useLockBodyScroll.js';

export function FounderNoteModal({ open, onClose }) {
  const closeModal = onClose;
  const titleId = useId();
  const closeRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-ink/38 motion-safe:transition-opacity motion-safe:duration-300"
        aria-label="Close founder note"
        onClick={closeModal}
      />

      {/* Letter sheet — fixed size, no scroll */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="founder-note-modal-sheet relative z-[1] w-full max-w-[min(42rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#ddd6cb] shadow-[0_28px_90px_rgba(17,17,17,0.22)] motion-safe:animate-[editorial-rise_520ms_ease-editorial_both]"
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          className="absolute right-4 top-4 z-[10] flex h-10 w-10 items-center justify-center rounded-md text-graphite transition-colors hover:bg-ink/6 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-label="Close"
          onClick={closeModal}
        >
          <span className="text-xl font-light leading-none" aria-hidden>×</span>
        </button>



        {/* Content */}
        <div className="relative z-[1] px-6 pb-8 pt-9 sm:px-10 sm:pt-10 sm:pb-8">

          {/* Eyebrow */}
          <p className="handwritten text-[0.82rem] text-graphite/60 mb-4">
            — A letter from the founder
          </p>

          {/* Handwritten headline */}
          <h2
            id={titleId}
            className="handwritten text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.35] text-[#1e1b16]"
          >
            For years, I thought I was building ideas.<br />
            In reality, I was trying to understand people.
          </h2>

          <div className="mt-5 mb-1 h-px w-8 bg-ink/20" />

          {/* Handwritten body */}
          <div className="mt-5 space-y-4 handwritten text-[1rem] leading-[1.75] text-[#1e1b16] sm:text-[1.06rem]">
            <p>
              I started with curiosity, not certainty. Many ideas came and went.
              Some failed early. Some never left the notebook. But every experiment
              taught me something about people — how they think, decide, learn, feel, and hope.
            </p>
            <p>
              Nuriek exists because I believe technology should not just solve problems,
              it should understand people. Not as data points, but as human beings.
            </p>
            <p>
              We&apos;re here for the long journey. To build systems that remember,
              adapt, and truly support. This is just the beginning.
            </p>
          </div>

          <p className="founder-signature mt-6" aria-label="Signed, Arun">
            Arun
          </p>

        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

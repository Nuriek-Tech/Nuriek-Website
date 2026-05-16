import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LEGAL_DOCS } from './legalContent.js';
import { useLockBodyScroll } from '../../lib/useLockBodyScroll.js';

function DocContent({ doc }) {
  return (
    <div className="space-y-10">
      {doc.sections.map((section) => (
        <div key={section.heading}>
          <p className="font-mono text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-ink">
            {section.heading}
          </p>
          <div className="mt-2 mb-4 h-px w-6 bg-ink/20" />
          {section.body && (
            <p className="font-mono text-[0.93rem] leading-7 text-graphite whitespace-pre-line">
              {section.body}
            </p>
          )}
          {section.subsections && (
            <div className="mt-4 space-y-5 border-l border-line pl-4">
              {section.subsections.map((sub) => (
                <div key={sub.title}>
                  <p className="font-mono text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-ink/75">
                    {sub.title}
                  </p>
                  <p className="mt-2 font-mono text-[0.93rem] leading-7 text-graphite">
                    {sub.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function LegalModal({ open, docId, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const doc = LEGAL_DOCS.find((d) => d.id === docId);

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

  if (!open || !doc) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pb-10 pt-10 sm:p-6 sm:pt-12"
      role="presentation"
    >
      {/* backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-ink/35 motion-safe:transition-opacity motion-safe:duration-300"
        aria-label="Close"
        onClick={onClose}
      />

      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex max-h-[min(92dvh,860px)] w-full max-w-[min(56rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_28px_90px_rgba(17,17,17,0.22)] motion-safe:animate-[editorial-rise_520ms_ease-editorial_both]"
      >
        {/* ── sticky header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5 sm:px-8">
          <div>
            <p className="eyebrow text-graphite">{doc.label}</p>
            <p className="mt-0.5 font-mono text-[0.62rem] text-graphite/55">
              Last updated {doc.updated}
            </p>
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

        {/* ── scrollable body ── */}
        <div className="overflow-y-auto overscroll-contain px-6 py-8 sm:px-8 sm:py-10">
          <DocContent doc={doc} />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

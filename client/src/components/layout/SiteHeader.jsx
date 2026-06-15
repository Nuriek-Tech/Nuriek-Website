import { useEffect, useId, useState } from 'react';
import { useContactModal } from '../../context/ContactModalContext.jsx';
import { useLockBodyScroll } from '../../lib/useLockBodyScroll.js';

const navItems = [
  { label: 'story', href: '#story' },
  { label: 'context', href: '#context' },
  { label: 'mission', href: '#mission' },
  { label: 'today', href: '#today' },
];

export function SiteHeader() {
  const { openModal } = useContactModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 640px)').matches) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-20 w-full bg-paper/88 backdrop-blur">
      <div className="mx-auto max-w-[72rem] px-5 sm:px-8">
        <div className="grid h-[5rem] grid-cols-[1fr_auto_auto] items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <a
            href="#top"
            className="flex items-center"
            aria-label="Nuriek home"
            onClick={closeMenu}
          >
            <img
              src="/nuriek-logo.svg"
              alt="Nuriek"
              className="h-7 w-auto"
              draggable={false}
            />
          </a>

          <nav className="hidden sm:block sm:justify-self-center" aria-label="Primary navigation">
            <ul className="flex items-center gap-7 text-sm lowercase tracking-normal text-ink">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="link-underline" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 sm:justify-self-end">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-ink/25 text-ink sm:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                {menuOpen ? (
                  <path d="M2 2L16 12M16 2L2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M0 1H18" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M0 7H18" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M0 13H18" stroke="currentColor" strokeWidth="1.2" />
                  </>
                )}
              </svg>
            </button>
            <button
              type="button"
              className="rounded-md border border-ink/25 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-4"
              onClick={openModal}
            >
              Contact
            </button>
          </div>
        </div>

        <nav
          id={menuId}
          className={`border-t border-line sm:hidden ${menuOpen ? 'block' : 'hidden'}`}
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="block px-1 py-2.5 font-mono text-sm lowercase tracking-normal text-ink"
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeMenu();
                    const target = document.querySelector(item.href);
                    if (target) {
                      // useLockBodyScroll cleanup uses two nested rAFs to restore scroll
                      // position. We wait for both to complete before scrolling to the
                      // new target, otherwise the restoration overrides our scroll.
                      requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          window.history.pushState(null, '', item.href);
                        });
                      });
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

import { useEffect } from 'react';

/**
 * Locks body scroll when `active` is true.
 *
 * Uses `position: fixed` instead of `overflow: hidden` — this keeps the
 * scrollbar visible so the page width never changes, eliminating the shake.
 * Restores the exact scroll position when the modal closes.
 */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const body = document.body;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflowY = 'scroll'; // keep scrollbar visible — no layout shift

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflowY = '';
      window.scrollTo(0, scrollY); // restore exact scroll position
    };
  }, [active]);
}

import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleAnchorClick(event) {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', targetId);
    }

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
}


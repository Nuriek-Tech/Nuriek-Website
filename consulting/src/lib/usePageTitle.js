import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} — Nuriek AI Consulting`
      : 'Nuriek AI Consulting — From AI ambition to measurable business impact';
  }, [title]);
}

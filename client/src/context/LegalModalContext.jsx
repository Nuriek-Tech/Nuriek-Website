import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { LegalModal } from '../components/modals/LegalModal.jsx';

const LegalModalContext = createContext(null);

export function LegalModalProvider({ children }) {
  const [docId, setDocId] = useState(null);

  const openTerms   = useCallback(() => setDocId('terms'),   []);
  const openPrivacy = useCallback(() => setDocId('privacy'), []);
  const closeModal  = useCallback(() => setDocId(null),      []);

  const value = useMemo(
    () => ({ openTerms, openPrivacy, closeModal }),
    [openTerms, openPrivacy, closeModal],
  );

  return (
    <LegalModalContext.Provider value={value}>
      {children}
      <LegalModal open={!!docId} docId={docId} onClose={closeModal} />
    </LegalModalContext.Provider>
  );
}

export function useLegalModal() {
  const ctx = useContext(LegalModalContext);
  if (!ctx) throw new Error('useLegalModal must be used within LegalModalProvider');
  return ctx;
}

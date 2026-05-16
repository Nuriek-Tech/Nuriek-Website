import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FounderNoteModal } from '../components/modals/FounderNoteModal.jsx';

const FounderNoteModalContext = createContext(null);

export function FounderNoteModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return (
    <FounderNoteModalContext.Provider value={value}>
      {children}
      <FounderNoteModal open={open} onClose={closeModal} />
    </FounderNoteModalContext.Provider>
  );
}

export function useFounderNoteModal() {
  const ctx = useContext(FounderNoteModalContext);
  if (!ctx) {
    throw new Error(
      'useFounderNoteModal must be used within FounderNoteModalProvider',
    );
  }
  return ctx;
}

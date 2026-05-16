import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ContactModal } from '../components/modals/ContactModal.jsx';

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={open} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return ctx;
}

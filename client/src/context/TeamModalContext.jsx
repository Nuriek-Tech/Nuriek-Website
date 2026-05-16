import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { TeamModal } from '../components/modals/TeamModal.jsx';

const TeamModalContext = createContext(null);

export function TeamModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return (
    <TeamModalContext.Provider value={value}>
      {children}
      <TeamModal open={open} onClose={closeModal} />
    </TeamModalContext.Provider>
  );
}

export function useTeamModal() {
  const ctx = useContext(TeamModalContext);
  if (!ctx) {
    throw new Error('useTeamModal must be used within TeamModalProvider');
  }
  return ctx;
}

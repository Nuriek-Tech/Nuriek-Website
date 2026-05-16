import { EditorialShell } from './components/layout/EditorialShell.jsx';
import { FounderNoteModalProvider } from './context/FounderNoteModalContext.jsx';
import { ContactModalProvider } from './context/ContactModalContext.jsx';
import { LegalModalProvider } from './context/LegalModalContext.jsx';
import { TeamModalProvider } from './context/TeamModalContext.jsx';
import { FounderLetterSection } from './components/sections/FounderLetterSection.jsx';
import { JourneySection } from './components/sections/JourneySection.jsx';
import { LessonSection } from './components/sections/LessonSection.jsx';
import { MissionSection } from './components/sections/MissionSection.jsx';
import { OpeningStatement } from './components/sections/OpeningStatement.jsx';
import { TodaySection } from './components/sections/TodaySection.jsx';
import { useSmoothScroll } from './lib/useSmoothScroll.js';

export default function App() {
  useSmoothScroll();

  return (
    <FounderNoteModalProvider>
      <ContactModalProvider>
        <LegalModalProvider>
          <TeamModalProvider>
            <EditorialShell>
              <OpeningStatement />
              <JourneySection />
              <LessonSection />
              <FounderLetterSection />
              <MissionSection />
              <TodaySection />
            </EditorialShell>
          </TeamModalProvider>
        </LegalModalProvider>
      </ContactModalProvider>
    </FounderNoteModalProvider>
  );
}

import { useFounderNoteModal } from '../../context/FounderNoteModalContext.jsx';

/**
 * Open-book hero layout:
 * - LEFT  → text floats on section background (no box — it IS the left page)
 * - RIGHT → distinct cream notebook page with its own shadow (the right page)
 * - SPINE → shadow where the two pages meet
 * This creates the unmistakable open-book silhouette from the reference image.
 */
export function NotebookSpread() {
  const { openModal } = useFounderNoteModal();

  return (
    <div className="notebook-spread">

      {/* ════════════════════════════════════
          LEFT PAGE
          Transparent — inherits section bg
          Feels like the left book page
      ════════════════════════════════════ */}
      <div className="notebook-spread-left">
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(17,17,17,0.4)',
            marginBottom: '1.6rem',
            margin: '0 0 1.6rem',
          }}
        >
          A founder story
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.3rem,3.8vw,3.8rem)',
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            color: '#111111',
            margin: '0 0 1.6rem',
          }}
        >
          Some ideas fade.
          <br />
          Some become
          <br />
          <em>your life&apos;s work.</em>
        </h1>

        <div style={{ width: '2.4rem', height: '1px', background: 'rgba(17,17,17,0.45)', marginBottom: '1.5rem' }} />

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            lineHeight: 1.85,
            color: 'rgba(17,17,17,0.58)',
            margin: '0 0 2.4rem',
            maxWidth: 'min(100%, 19rem)',
          }}
        >
          Years of curiosity, experiments, failures,
          <br />
          and learning — to build something that
          <br />
          truly matters.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.4rem' }}>
          <a
            href="#story"
            style={{
              display: 'inline-block',
              background: '#111111',
              color: '#f7f4eb',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.9rem 1.6rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(17,17,17,0.2)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}
          >
            Read the story
          </a>
          <button
            type="button"
            onClick={openModal}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(17,17,17,0.35)',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#111111',
              padding: '0 0 2px',
            }}
          >
            Founder&apos;s note →
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT PAGE — The Notebook
          This is the distinct physical object
      ════════════════════════════════════ */}
      <div className="notebook-spread-right">

        {/* Ruled lines */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 2.2rem, rgba(80,100,200,0.07) 2.2rem, rgba(80,100,200,0.07) calc(2.2rem + 1px))',
            backgroundPosition: '0 4.4rem',
            pointerEvents: 'none',
          }}
        />
        {/* Red margin line */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '3rem',
            width: '1px',
            background: 'rgba(200,70,70,0.16)',
            pointerEvents: 'none',
          }}
        />

        {/* ── TAPED CARD — top right ── */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(1rem,2.5vw,1.8rem)',
            right: 'clamp(1rem,2.5vw,1.8rem)',
            width: 'clamp(8rem,18%,11rem)',
            transform: 'rotate(1.4deg)',
          }}
        >
          {/* Tape */}
          <div aria-hidden style={{
            position: 'absolute', top: '-0.55rem', left: '50%', transform: 'translateX(-50%)',
            width: '2.8rem', height: '0.6rem',
            background: 'rgba(235,225,200,0.8)', borderRadius: '1px',
            boxShadow: '0 1px 3px rgba(17,17,17,0.07)',
          }} />
          <div style={{
            background: '#fdfaf3',
            border: '1px solid rgba(17,17,17,0.09)',
            boxShadow: '0 3px 14px rgba(17,17,17,0.1)',
            padding: '0.85rem 1rem 1rem',
          }}>
            <p style={{
              fontFamily: "'Caveat', 'Kalam', cursive",
              fontSize: 'clamp(0.88rem,1.7vw,1.08rem)',
              lineHeight: 1.52,
              color: '#1e1b16',
              margin: 0,
            }}>
              Build systems<br />
              that grow with<br />
              people over time.
            </p>
          </div>
        </div>

        {/* ── NURIEK · CONTEXT — marginal scribbles ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 'clamp(2.8rem,8%,3.6rem)',
            left: 'clamp(3.2rem,8%,4.2rem)',
            transform: 'rotate(-2.5deg)',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: "'Caveat', 'Kalam', cursive",
              fontSize: 'clamp(1.05rem,2.1vw,1.28rem)',
              fontWeight: 600,
              color: '#2a2418',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Nuriek
          </p>
          <svg width="52" height="10" viewBox="0 0 52 10" fill="none" style={{ display: 'block', marginTop: '0.15rem' }}>
            <path
              d="M2 7.5C10 4.5 22 5.5 34 6.2C42 6.6 48 5.8 50 6.5"
              stroke="#2a2418"
              strokeWidth="0.95"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
          <p
            style={{
              fontFamily: "'Caveat', 'Kalam', cursive",
              fontSize: 'clamp(0.92rem,1.85vw,1.12rem)',
              fontStyle: 'italic',
              color: 'rgba(42,36,24,0.72)',
              margin: '0.35rem 0 0',
              lineHeight: 1.2,
            }}
          >
            context
          </p>
          <svg width="38" height="8" viewBox="0 0 38 8" fill="none" style={{ display: 'block', marginTop: '0.1rem', marginLeft: '0.15rem' }}>
            <path
              d="M1 5.5C8 3.2 18 4.8 28 4.2C33 3.9 36 5 37 4.6"
              stroke="#2a2418"
              strokeWidth="0.85"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>

        <div
          aria-hidden
          className="notebook-scribble-mobile-hide"
          style={{
            position: 'absolute',
            top: '52%',
            right: 'clamp(0.8rem,3%,1.4rem)',
            width: 'clamp(5.5rem,14%,7.5rem)',
            transform: 'rotate(3.2deg)',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: "'Caveat', 'Kalam', cursive",
              fontSize: 'clamp(0.78rem,1.55vw,0.92rem)',
              lineHeight: 1.38,
              color: 'rgba(42,36,24,0.62)',
              margin: 0,
            }}
          >
            pace · memory
            <br />
            <span style={{ fontStyle: 'italic' }}>→ context</span>
          </p>
          <svg width="44" height="28" viewBox="0 0 44 28" fill="none" style={{ marginTop: '0.25rem', opacity: 0.5 }}>
            <path
              d="M4 22C12 14 20 10 32 6"
              stroke="#2a2418"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2 2.5"
            />
            <polyline points="26,8 34,5 30,12" stroke="#2a2418" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <div
          aria-hidden
          className="notebook-scribble-mobile-hide"
          style={{
            position: 'absolute',
            top: '38%',
            left: '58%',
            zIndex: 2,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity="0.45">
            <ellipse cx="18" cy="18" rx="14" ry="11" stroke="#2a2418" strokeWidth="0.85" fill="none" transform="rotate(-8 18 18)" />
            <path d="M8 26C14 20 22 16 30 12" stroke="#2a2418" strokeWidth="0.7" strokeLinecap="round" />
          </svg>
        </div>

        <div
          aria-hidden
          className="notebook-scribble-mobile-hide"
          style={{
            position: 'absolute',
            bottom: '14%',
            left: '52%',
            transform: 'rotate(-12deg)',
            zIndex: 2,
            opacity: 0.38,
          }}
        >
          <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
            <path d="M2 14C10 6 18 4 28 8C36 11 42 9 46 12" stroke="#2a2418" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M6 18C14 12 24 10 34 14" stroke="#2a2418" strokeWidth="0.75" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── NODE SKETCH ── */}
        <div className="notebook-node-wrap" style={{ position: 'absolute', left: 'clamp(2rem,6%,4.5rem)', top: '18%', zIndex: 3 }}>
          <svg width="90" height="132" viewBox="0 0 90 132" fill="none" aria-hidden>
            <line x1="45" y1="13" x2="45" y2="34" stroke="#2a2418" strokeWidth="0.9" strokeLinecap="round"/>
            <line x1="45" y1="47" x2="20" y2="68" stroke="#2a2418" strokeWidth="0.9" strokeLinecap="round"/>
            <line x1="45" y1="47" x2="45" y2="68" stroke="#2a2418" strokeWidth="0.9" strokeLinecap="round"/>
            <line x1="45" y1="47" x2="70" y2="68" stroke="#2a2418" strokeWidth="0.9" strokeLinecap="round"/>
            <line x1="20" y1="81" x2="11" y2="104" stroke="#2a2418" strokeWidth="0.85" strokeLinecap="round"/>
            <line x1="20" y1="81" x2="30" y2="104" stroke="#2a2418" strokeWidth="0.85" strokeLinecap="round"/>
            <line x1="45" y1="81" x2="45" y2="104" stroke="#2a2418" strokeWidth="0.85" strokeLinecap="round"/>
            <line x1="70" y1="81" x2="62" y2="104" stroke="#2a2418" strokeWidth="0.85" strokeLinecap="round"/>
            <circle cx="45" cy="7" r="6.5" stroke="#2a2418" strokeWidth="1" fill="none"/>
            <circle cx="45" cy="40.5" r="6.5" stroke="#2a2418" strokeWidth="1" fill="none"/>
            <circle cx="20" cy="74.5" r="6.5" stroke="#2a2418" strokeWidth="1" fill="none"/>
            <circle cx="45" cy="74.5" r="6.5" stroke="#2a2418" strokeWidth="1" fill="none"/>
            <circle cx="70" cy="74.5" r="6.5" stroke="#2a2418" strokeWidth="1" fill="none"/>
            <circle cx="11" cy="111" r="5.5" stroke="#2a2418" strokeWidth="0.9" fill="none"/>
            <circle cx="30" cy="111" r="5.5" stroke="#2a2418" strokeWidth="0.9" fill="none"/>
            <circle cx="45" cy="111" r="5.5" stroke="#2a2418" strokeWidth="0.9" fill="none"/>
            <circle cx="62" cy="111" r="5.5" stroke="#2a2418" strokeWidth="0.9" fill="none"/>
          </svg>
          <p
            style={{
              position: 'absolute',
              top: '-0.35rem',
              right: '-2.8rem',
              fontFamily: "'Caveat', 'Kalam', cursive",
              fontSize: 'clamp(0.72rem,1.4vw,0.86rem)',
              fontStyle: 'italic',
              color: 'rgba(42,36,24,0.55)',
              margin: 0,
              transform: 'rotate(6deg)',
              whiteSpace: 'nowrap',
            }}
          >
            context map?
          </p>
        </div>

        <svg
          aria-hidden
          className="notebook-scribble-mobile-hide"
          style={{
            position: 'absolute',
            left: 'clamp(5.5rem,12%,6.5rem)',
            top: 'clamp(5.5rem,14%,6.2rem)',
            width: 'clamp(2.5rem,6%,3.5rem)',
            height: 'clamp(2rem,5%,2.8rem)',
            opacity: 0.42,
            pointerEvents: 'none',
            zIndex: 2,
          }}
          viewBox="0 0 48 40"
          fill="none"
        >
          <path
            d="M4 4C14 12 22 22 38 34"
            stroke="#2a2418"
            strokeWidth="0.85"
            strokeLinecap="round"
            strokeDasharray="2.5 3"
          />
          <polyline points="30,30 40,36 34,26" stroke="#2a2418" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>

        {/* ── ARROW + STAMP ── */}
        <div className="notebook-scribble-mobile-hide" style={{
          position: 'absolute',
          left: '40%',
          top: '44%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}>
          <svg width="42" height="14" viewBox="0 0 42 14" fill="none" aria-hidden>
            <line x1="0" y1="7" x2="32" y2="7" stroke="#2a2418" strokeWidth="1" strokeLinecap="round"/>
            <polyline points="24,2 36,7 24,12" stroke="#2a2418" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
            <circle cx="15" cy="15" r="12" stroke="#2a2418" strokeWidth="1" fill="rgba(42,36,24,0.04)"/>
            <circle cx="15" cy="15" r="8.5" stroke="#2a2418" strokeWidth="0.55" strokeDasharray="1.6 2" fill="none"/>
            <circle cx="15" cy="15" r="3" fill="rgba(42,36,24,0.2)"/>
          </svg>
        </div>

        {/* ── CLARITY TOOK TIME ── */}
        <div style={{ position: 'absolute', bottom: '22%', left: 'clamp(3.5rem,9%,4.5rem)' }}>
          <p style={{
            fontFamily: "'Caveat', 'Kalam', cursive",
            fontSize: 'clamp(1rem,2vw,1.22rem)',
            color: '#2a2418',
            margin: '0 0 0.3rem',
          }}>
            Clarity took time.
          </p>
          <div style={{ height: '1px', width: '6.5rem', background: 'rgba(42,36,24,0.25)' }} />
        </div>

        {/* ── DATE ── */}
        <p style={{
          position: 'absolute',
          bottom: '10%',
          right: 'clamp(1rem,5%,2rem)',
          fontFamily: "'Caveat', 'Kalam', cursive",
          fontSize: 'clamp(0.9rem,1.8vw,1.08rem)',
          fontStyle: 'italic',
          color: 'rgba(42,36,24,0.6)',
          margin: 0,
        }}>
          June 11, 2021
        </p>

      </div>
    </div>
  );
}

export function LessonSection() {
  return (
    <section id="context" className="bg-paper border-y border-line">
      <div className="mx-auto grid max-w-[72rem] gap-9 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-11 lg:py-12">

        {/* ── Cork / pinboard collage ── */}
        <div
          className="idea-board relative mx-auto w-full max-w-[32rem] rounded-[3px_7px_4px_5px] border border-line shadow-[0_14px_40px_rgba(17,17,17,0.08)] sm:mx-0 sm:max-w-[min(100%,38rem)] lg:justify-self-start"
          style={{
            background: "#dedad3",
            /* fixed aspect ratio so absolute-positioned notes never overflow */
            aspectRatio: "4 / 3.1",
            overflow: "hidden",
          }}
        >
          {/* ── dot-grid texture (cork feel) ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(17,17,17,0.07) 0 1px, transparent 1.5px)",
              backgroundSize: "0.68rem 0.68rem",
            }}
          />
          {/* ── vignette edges ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 48%, rgba(17,17,17,0.09) 100%)",
            }}
          />

          {/* ════════════════════════════════════════
              NOTES — all absolutely positioned
              board is 4:3.1 aspect ratio
              ════════════════════════════════════════ */}

          {/* ── 1. IDEA LIST — spiral notebook page (top-left) ── */}
          <div
            className="collage-slip-sketch absolute"
            style={{
              top: "5%",
              left: "2%",
              width: "29%",
              background: "#faf9f5",
              border: "1px solid rgba(17,17,17,0.1)",
              boxShadow:
                "0 6px 18px rgba(17,17,17,0.14), inset 0 0 0 1px rgba(255,255,252,0.4)",
              transform: "rotate(-1.3deg)",
              zIndex: 8,
              overflow: "hidden",
            }}
          >
            {/* Spiral holes strip */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "1.5rem",
                borderRight: "1px dashed rgba(17,17,17,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                padding: "0.5rem 0",
                background: "rgba(232,229,223,0.45)",
              }}
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "0.48rem",
                    height: "0.48rem",
                    borderRadius: "999px",
                    background: "#dedad3",
                    border: "1px solid rgba(17,17,17,0.25)",
                    boxShadow: "inset 0 1px 2px rgba(17,17,17,0.15)",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Content — right of holes */}
            <div style={{ paddingLeft: "1.7rem", paddingRight: "0.65rem", paddingTop: "0.7rem", paddingBottom: "0.8rem" }}>
              <p
                className="collage-hand-title"
                style={{ fontSize: "clamp(0.78rem,2.4vw,1rem)", lineHeight: 1.08 }}
              >
                IDEA LIST
              </p>
              <p
                className="collage-hand-sub"
                style={{ fontSize: "clamp(0.62rem,1.7vw,0.78rem)", marginTop: "0.08rem", opacity: 0.8 }}
              >
                (2018–2021)
              </p>
              <svg
                className="pointer-events-none mt-[0.3rem] text-ink/30"
                height="8" width="72" viewBox="0 0 72 8" fill="none" aria-hidden
              >
                <path d="M1 6C12 3.5 32 5.5 48 4.5C60 3.8 68 5 71 4"
                  stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
              </svg>
              <ul
                className="collage-script collage-hand-list"
                style={{
                  marginTop: "0.4rem",
                  fontSize: "clamp(0.6rem,1.65vw,0.76rem)",
                  lineHeight: 1.6,
                }}
              >
                <li>– food delivery</li>
                <li>– EV platforms</li>
                <li>– freelance network</li>
                <li>– hyperlocal social</li>
                <li>– learning app</li>
                <li>– ... and many more</li>
              </ul>
            </div>
          </div>

          {/* ── 2. Graph paper — growth curve (top centre) ── */}
          <div
            className="collage-graph-paper collage-slip-sketch absolute"
            style={{
              top: "4%",
              left: "33%",
              width: "28%",
              aspectRatio: "1.05 / 1",
              border: "1px solid rgba(17,17,17,0.09)",
              boxShadow: "0 5px 14px rgba(17,17,17,0.11)",
              transform: "rotate(0.9deg)",
              zIndex: 7,
              overflow: "hidden",
            }}
          >
            <svg
              viewBox="0 0 100 90"
              fill="none"
              aria-hidden
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              {/* X axis */}
              <line x1="14" y1="72" x2="90" y2="72"
                stroke="rgba(17,17,17,0.38)" strokeWidth="0.75" strokeLinecap="round"/>
              {/* Y axis */}
              <line x1="14" y1="72" x2="14" y2="10"
                stroke="rgba(17,17,17,0.38)" strokeWidth="0.75" strokeLinecap="round"/>
              {/* Arrow tips */}
              <polygon points="90,70 94,72 90,74" fill="rgba(17,17,17,0.38)"/>
              <polygon points="12,10 14,6 16,10" fill="rgba(17,17,17,0.38)"/>
              {/* Tick marks on Y */}
              {[20,32,44,56,68].map(y => (
                <line key={y} x1="11" y1={y} x2="17" y2={y}
                  stroke="rgba(17,17,17,0.22)" strokeWidth="0.6"/>
              ))}
              {/* Growth curve */}
              <path
                d="M16 70 C24 69 32 67 40 61 C50 53 56 42 64 31 C70 23 76 16 86 12"
                stroke="rgba(17,17,17,0.7)"
                strokeWidth="1.05"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Labels */}
              <text x="44" y="82" fontSize="7" fill="rgba(17,17,17,0.48)"
                fontFamily="Caveat, cursive">time</text>
              <text x="3" y="42" fontSize="6.5" fill="rgba(17,17,17,0.45)"
                fontFamily="Caveat, cursive"
                transform="rotate(-90,6,42)">value</text>
            </svg>
          </div>

          {/* ── 3. Tiny note top-right: "You didn't / try / true." ── */}
          <div
            className="collage-slip-sketch absolute"
            style={{
              top: "3%",
              right: "3%",
              width: "18%",
              background: "#fbfaf7",
              border: "1px solid rgba(17,17,17,0.09)",
              boxShadow: "0 4px 10px rgba(17,17,17,0.09)",
              padding: "0.55rem 0.5rem 0.6rem",
              transform: "rotate(2deg)",
              zIndex: 9,
            }}
          >
            {/* Tape */}
            <div aria-hidden style={{
              position: "absolute", top: "-0.35rem", left: "50%",
              transform: "translateX(-50%) rotate(-1.5deg)",
              width: "1.8rem", height: "0.55rem", borderRadius: "1px",
              background: "rgba(210,205,195,0.85)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5)",
            }}/>
            <p className="collage-script-loose" style={{
              fontSize: "clamp(0.58rem,1.5vw,0.7rem)", lineHeight: 1.38, textAlign: "center",
            }}>
              You didn't<br /><em>try</em><br />true.
            </p>
          </div>

          {/* ── 4. "Too didn't / Not real / needed." — middle ── */}
          <div
            className="collage-slip-sketch absolute"
            style={{
              top: "47%",
              left: "33%",
              width: "22%",
              background: "#f8f7f4",
              border: "1px solid rgba(17,17,17,0.1)",
              boxShadow: "0 5px 14px rgba(17,17,17,0.1)",
              padding: "0.6rem 0.65rem 0.7rem",
              transform: "rotate(-2deg)",
              zIndex: 10,
            }}
          >
            {/* Tape */}
            <div aria-hidden style={{
              position: "absolute", top: "-0.35rem", left: "25%",
              transform: "rotate(2.5deg)",
              width: "1.7rem", height: "0.55rem", borderRadius: "1px",
              background: "rgba(208,203,193,0.82)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5)",
            }}/>
            <p className="collage-script-loose" style={{
              fontSize: "clamp(0.62rem,1.6vw,0.74rem)", lineHeight: 1.45,
            }}>
              Too didn't.<br />Not real<br />needed.
            </p>
          </div>

          {/* ── 5. Main quote — "The real problem..." (right, large) ── */}
          <div
            className="collage-slip-sketch absolute"
            style={{
              top: "28%",
              right: "2%",
              width: "31%",
              background: "#fdfcf9",
              border: "1px solid rgba(17,17,17,0.08)",
              boxShadow:
                "0 10px 28px rgba(17,17,17,0.14), inset 0 0 0 1px rgba(255,255,252,0.5)",
              padding: "0.9rem 0.85rem 1rem",
              transform: "rotate(-0.6deg)",
              zIndex: 12,
            }}
          >
            {/* Tape centred */}
            <div aria-hidden style={{
              position: "absolute", top: "-0.38rem", left: "50%",
              transform: "translateX(-50%) rotate(1deg)",
              width: "2.6rem", height: "0.6rem", borderRadius: "1px",
              background: "rgba(210,205,193,0.9)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5)",
            }}/>
            <p className="collage-script-loose" style={{
              fontSize: "clamp(0.72rem,1.85vw,0.88rem)", lineHeight: 1.5,
            }}>
              The real problem<br />
              isn't technology.<br />
              It's understanding<br />
              people deeply.
            </p>
          </div>

          {/* ── 6. Architectural grid sketches — bottom-left ── */}
          <div
            className="absolute"
            aria-hidden
            style={{
              bottom: "4%",
              left: "2%",
              width: "22%",
              aspectRatio: "1.3 / 1",
              zIndex: 6,
              opacity: 0.32,
            }}
          >
            <svg viewBox="0 0 80 62" fill="none" style={{ width: "100%", height: "100%" }}>
              {/* 4×4 tiny grid squares */}
              {[0,18,36,54].map(x =>
                [0,15,30].map(y => (
                  <rect key={`${x}-${y}`} x={x+2} y={y+2} width="14" height="12"
                    stroke="rgba(17,17,17,0.72)" strokeWidth="0.65" fill="none"/>
                ))
              )}
              {/* Diagonal lines hinting at layout/floor plan */}
              <line x1="2" y1="2" x2="56" y2="44" stroke="rgba(17,17,17,0.3)" strokeWidth="0.5"/>
              <line x1="16" y1="2" x2="16" y2="44" stroke="rgba(17,17,17,0.4)" strokeWidth="0.5"/>
            </svg>
          </div>

          {/* ── 7. "Build something that remembers." — bottom right ── */}
          <div
            className="absolute"
            style={{
              bottom: "5%",
              right: "3%",
              width: "34%",
              zIndex: 11,
              transform: "rotate(0.5deg)",
            }}
          >
            <p
              className="collage-script-loose"
              style={{
                fontSize: "clamp(0.74rem,1.9vw,0.9rem)",
                lineHeight: 1.42,
                color: "#252320",
                textAlign: "right",
              }}
            >
              Build something<br />that remembers.
            </p>
          </div>

        </div>
        {/* ── end pinboard ── */}

        {/* ── Text column ── */}
        <div className="max-w-[32rem] lg:max-w-[34.5rem] lg:justify-self-end">
          <p className="eyebrow mb-5 text-graphite lg:mb-6">What we learned</p>
          <h2 className="font-serif text-[clamp(2.1rem,3.1vw,3.1rem)] leading-[1.04] tracking-[-0.02em] text-ink">
            Ideas are easy.
            <br />
            <span className="italic">Understanding people is hard.</span>
          </h2>
          <div className="mt-7 h-px w-10 bg-ink" />
          <p className="mt-8 font-mono text-[0.86rem] leading-7 text-ink">
            We explored everything from marketplaces to hardware. The deeper we
            looked, the clearer it became: the problem is not access to tools,
            it's the lack of systems that adapt to real human context.
          </p>
        </div>

      </div>
    </section>
  );
}

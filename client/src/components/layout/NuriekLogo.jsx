/**
 * Nuriek wordmark as an inline SVG.
 * "nuriek" in Inter Regular with a floating dot above the "i".
 * Dot position is pre-calculated for Inter 400 at the given font-size/viewBox.
 */
export function NuriekLogo({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 76"
      role="img"
      aria-label="Nuriek"
      className={className}
    >
      {/*
        "nuriek" centred, Inter Regular 64px, letter-spacing -1.5
        Using dotless-i (ı U+0131) so the glyph has no built-in dot.
        The floating dot circle below is positioned manually.
        cx ≈ 170 (SVG centre) + offset for the "i" position in the word.
        In Inter Regular at 64px the character widths are roughly:
          n≈38  u≈39  r≈23  ı≈14  e≈36  k≈37  → total ≈ 187px
          with letter-spacing -1.5 × 5 gaps = -7.5 → ≈ 179.5px
          left edge ≈ 170 - 89.75 = 80.25
          "i" centre ≈ 80.25 + 38+39+23 (nur) - 4.5 (spacing) + 7 (half-i) = 182.75 ≈ 183
      */}
      <text
        x="50%"
        y="62"
        textAnchor="middle"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="64"
        fontWeight="400"
        letterSpacing="-1.5"
        fill="#111111"
      >
        nurıek
      </text>

      {/* Floating dot — sits above cap-height; cx tuned to the dotless-i centre */}
      <circle cx="183" cy="6" r="3.8" fill="#111111" />
    </svg>
  );
}

/**
 * Subtle marble-texture band used to separate sections. The veining is
 * generated with an SVG turbulence filter (no image asset, no extra
 * request) and kept very low-opacity so it reads as a refined charcoal
 * marble on pure black — a luxury detail, never loud.
 */
export function MarbleDivider({ label }: { label?: string }) {
  return (
    <div className="relative overflow-hidden border-y border-ink-600 bg-ink-900">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14] mix-blend-screen"
        preserveAspectRatio="none"
      >
        <filter id="nox-marble">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.05"
            numOctaves={3}
            seed={11}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="gamma" amplitude="1.4" exponent="2.6" offset="0" />
            <feFuncG type="gamma" amplitude="1.4" exponent="2.6" offset="0" />
            <feFuncB type="gamma" amplitude="1.4" exponent="2.6" offset="0" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#nox-marble)" />
      </svg>

      {/* Edge fade so the texture melts into the page */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink" />

      <div className="relative flex h-24 items-center justify-center sm:h-28">
        {label && (
          <span className="font-display text-[11px] uppercase tracking-brand text-bone-muted">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

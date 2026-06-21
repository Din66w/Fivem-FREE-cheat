/**
 * Site-wide film grain. A fixed, non-interactive noise layer at very
 * low opacity — the kind of subtle texture high-end fashion sites use
 * to avoid the flat "template" look on large black surfaces. Generated
 * with an SVG turbulence filter, so it costs no extra request.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35] opacity-[0.022]"
    >
      <svg className="h-full w-full" preserveAspectRatio="none">
        <filter id="nox-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nox-grain)" />
      </svg>
    </div>
  );
}

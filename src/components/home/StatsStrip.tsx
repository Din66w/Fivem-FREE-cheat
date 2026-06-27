'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS: [string, string][] = [
  ['1 / 1', 'Every piece one-of-one'],
  ['100%', 'Authenticated in-house'],
  ['48H', 'Worldwide dispatch'],
  ['500+', 'Pieces curated'],
];

const ease = [0.16, 1, 0.3, 1] as const;

function Stat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target == null) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display = target == null ? value : `${n}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      className="group relative flex h-full flex-col items-center justify-center bg-ink-900/70 px-6 py-12 text-center backdrop-blur transition-colors duration-500 hover:bg-ink-800 lg:py-16"
    >
      {/* top accent line grows on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-0 bg-bone/60 transition-all duration-500 ease-nox group-hover:w-full" />
      {/* soft radial glow on hover */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
      <p className="relative font-display text-4xl font-black tabular-nums tracking-tightest text-bone transition-transform duration-500 group-hover:scale-105 sm:text-5xl lg:text-6xl">
        {display}
      </p>
      <p className="relative mt-3 text-[11px] uppercase tracking-[0.22em] text-ash transition-colors duration-300 group-hover:text-bone-muted">
        {label}
      </p>
    </motion.div>
  );
}

/** Big-number credibility strip with count-up + hover effects. */
export function StatsStrip() {
  return (
    <section className="border-y border-ink-600 bg-ink-900">
      <div className="nox-container grid grid-cols-2 gap-px overflow-hidden bg-ink-600 lg:grid-cols-4">
        {STATS.map(([value, label], i) => (
          <Stat key={label} value={value} label={label} index={i} />
        ))}
      </div>
    </section>
  );
}

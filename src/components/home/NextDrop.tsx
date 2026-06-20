'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SITE } from '@/lib/config';

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');
const ease = [0.16, 1, 0.3, 1] as const;

export function NextDrop() {
  const target = new Date(SITE.dropDate).getTime();
  const [t, setT] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setT(getRemaining(target));
    const id = setInterval(() => setT(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, string][] = [
    ['Days', t ? pad(t.d) : '--'],
    ['Hrs', t ? pad(t.h) : '--'],
    ['Min', t ? pad(t.m) : '--'],
    ['Sec', t ? pad(t.s) : '--'],
  ];

  return (
    <section className="relative overflow-hidden border-y border-ink-600 bg-ink">
      {/* faint top light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[40vh] w-[120vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_65%)]" />
      </div>

      <div className="nox-container relative flex flex-col items-center py-20 text-center sm:py-28">
        <motion.p
          className="nox-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          The next chapter
        </motion.p>

        <motion.h2
          className="mt-5 font-display text-5xl font-black uppercase tracking-tightest text-bone sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Next Drop
        </motion.h2>

        <p className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-bone-muted sm:text-base">
          01.01.2027 &nbsp;|&nbsp; 00:00
        </p>

        {/* Countdown */}
        <div className="mt-12 grid w-full max-w-xl grid-cols-4 gap-3 sm:gap-5">
          {units.map(([label, value], i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center border border-ink-600 bg-ink-900/60 py-5 backdrop-blur sm:py-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <span className="font-display text-3xl font-bold tabular-nums text-bone sm:text-5xl">
                {value}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-ash sm:text-[11px]">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <Link
          href="/shop?sort=newest"
          className="mt-12 inline-flex h-14 items-center justify-center border border-bone/30 px-10 text-sm font-medium uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
        >
          Preview the drop
        </Link>
      </div>
    </section>
  );
}

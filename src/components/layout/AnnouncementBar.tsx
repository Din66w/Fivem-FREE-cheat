'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/config';

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * Slim, dark, centered announcement bar — restrained and premium
 * (no busy white ticker). Shows the next-drop date + a live countdown.
 */
export function AnnouncementBar() {
  const target = new Date(SITE.dropDate).getTime();
  const [t, setT] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setT(getRemaining(target));
    const id = setInterval(() => setT(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const countdown =
    t && (t.d || t.h || t.m || t.s)
      ? `${t.d}d ${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`
      : null;

  return (
    <div className="border-b border-ink-600 bg-ink">
      <div className="nox-container flex h-9 items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-bone-muted sm:text-[11px]">
        <span className="hidden sm:inline">NOX Drop</span>
        <span className="hidden text-ink-600 sm:inline">/</span>
        <span className="font-mono tracking-[0.2em] text-bone">01.01.2027 · 00:00</span>
        {countdown && (
          <>
            <span className="text-ink-600">/</span>
            <span className="font-mono tabular-nums tracking-[0.15em] text-ash">{countdown}</span>
          </>
        )}
      </div>
    </div>
  );
}

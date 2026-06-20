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

export function AnnouncementBar() {
  const target = new Date(SITE.dropDate).getTime();
  const [t, setT] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setT(getRemaining(target));
    const id = setInterval(() => setT(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // One announcement string repeated to build a seamless marquee.
  const message =
    t && (t.d || t.h || t.m || t.s)
      ? `${SITE.announcement}  •  ${t.d}D ${pad(t.h)}:${pad(t.m)}:${pad(t.s)} REMAINING`
      : SITE.announcement;

  return (
    <div className="border-b border-ink-600 bg-bone text-ink">
      <div className="flex overflow-hidden whitespace-nowrap py-2">
        <div className="flex shrink-0 animate-marquee items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
              aria-hidden={i !== 0}
            >
              {message}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

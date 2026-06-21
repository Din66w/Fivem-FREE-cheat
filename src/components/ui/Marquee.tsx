'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  /** Separator glyph between items. */
  separator?: string;
  className?: string;
}

/**
 * Luxury infinite marquee. The track renders the item set twice and
 * scrolls by exactly one set (-50%) for a seamless loop; it pauses on
 * hover and honours prefers-reduced-motion via the global CSS rule.
 */
export function Marquee({ items, separator = '✦', className }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className={cn('group flex overflow-hidden whitespace-nowrap', className)}>
      <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="mx-6 font-display text-2xl font-extrabold uppercase tracking-tightest text-bone sm:mx-10 sm:text-4xl">
              {item}
            </span>
            <span className="text-sm text-ash">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

import type { SVGProps } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const icon = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const Ship = (p: SVGProps<SVGSVGElement>) => (
  <svg {...icon} {...p}>
    <path d="M2 7h11v8H2zM13 10h4l3 3v2h-7z" />
    <circle cx="6" cy="17.5" r="1.6" />
    <circle cx="17" cy="17.5" r="1.6" />
  </svg>
);
const Shield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...icon} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const Tag = (p: SVGProps<SVGSVGElement>) => (
  <svg {...icon} {...p}>
    <path d="M3 12V4h8l10 10-7 7L3 12z" />
    <circle cx="7.5" cy="7.5" r="1.4" />
  </svg>
);
const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg {...icon} {...p}>
    <path d="M12 3l2.5 6 6.5.5-5 4.2 1.6 6.3L12 16.8 6.4 20l1.6-6.3-5-4.2L9.5 9z" />
  </svg>
);

const ITEMS = [
  { Icon: Ship, title: 'Fast Shipping', body: 'Tracked worldwide, dispatched in 1–2 days.' },
  { Icon: Shield, title: 'Authentic Pieces', body: 'Every item verified before it lists.' },
  { Icon: Tag, title: 'Fair Prices', body: 'Honest pricing on real, curated stock.' },
  { Icon: Star, title: 'Curated Selection', body: 'Handpicked. No filler, no noise.' },
];

export function TrustSection() {
  return (
    <section className="border-y border-ink-600 bg-ink-900">
      <div className="nox-container grid grid-cols-2 gap-px overflow-hidden bg-ink-600 lg:grid-cols-4">
        {ITEMS.map(({ Icon, title, body }, i) => (
          <Reveal key={title} index={i}>
            <div className="flex h-full flex-col items-center gap-4 bg-ink-900/70 px-6 py-10 text-center backdrop-blur lg:py-14">
              <Icon className="h-7 w-7 text-bone" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bone">
                  {title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ash">{body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

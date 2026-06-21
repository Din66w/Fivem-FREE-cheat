import { Reveal } from '@/components/ui/Reveal';

const STATS: [string, string][] = [
  ['1 / 1', 'Every piece one-of-one'],
  ['100%', 'Authenticated in-house'],
  ['48H', 'Worldwide dispatch'],
  ['500+', 'Pieces curated'],
];

/** Big-number credibility strip — trust signals for an exclusive marketplace. */
export function StatsStrip() {
  return (
    <section className="border-y border-ink-600 bg-ink-900">
      <div className="nox-container grid grid-cols-2 gap-px overflow-hidden bg-ink-600 lg:grid-cols-4">
        {STATS.map(([num, label], i) => (
          <Reveal key={label} index={i}>
            <div className="h-full bg-ink-900/70 px-6 py-10 text-center backdrop-blur lg:py-14">
              <p className="font-display text-4xl font-black tabular-nums text-bone sm:text-5xl">
                {num}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ash">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

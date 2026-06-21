import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE } from '@/lib/config';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Curated vintage and streetwear pieces. Every item is handpicked to offer quality, style, and authenticity.',
};

const VALUES = [
  {
    title: 'Curated',
    body: 'No bulk. No filler. Every piece is chosen by hand for cut, condition and cultural weight.',
  },
  {
    title: 'Authentic',
    body: 'Each item is checked and verified. What you see is what lands — no surprises, no fakes.',
  },
  {
    title: 'One-of-one',
    body: 'Most pieces are single stock. When it sells, it&apos;s gone. That&apos;s the point.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-600">
        <div className="nox-container py-20 lg:py-28">
          <Reveal>
            <p className="nox-eyebrow">[ About — the NOX story ]</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-black uppercase leading-[0.85] tracking-tightest text-bone sm:text-7xl">
              Clean pieces only.
            </h1>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-muted">
              {SITE.name} is a curated vintage and streetwear store. Every item is
              handpicked to offer quality, style, and authenticity — pulled from
              archives, drops and rails most people never see.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image + manifesto */}
      <section className="nox-container grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
            <Image
              src="/ph/2.svg"
              alt="NOX curated rail"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className="space-y-5 text-base leading-relaxed text-bone-muted">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tightest text-bone">
              Engineered for the few, not the crowd.
            </h2>
            <p>
              We started NOX because the resale world had become noise — endless
              listings, inflated grails, no point of view. We wanted the opposite:
              a tight, considered edit you can actually trust.
            </p>
            <p>
              From 90s football shirts to deadstock streetwear, designer staples to
              Y2K rarities — if it carries NOX, it earned its place. Quality first,
              hype second.
            </p>
            <p>When the cold hits, everything else goes quiet. So do we. We just curate.</p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-y border-ink-600 bg-ink-900">
        <div className="nox-container grid gap-px overflow-hidden bg-ink-600 py-px sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} index={i}>
              <div className="h-full bg-ink-900 p-8 lg:p-12">
                <p className="font-mono text-sm text-ash">0{i + 1}</p>
                <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-tightest text-bone">
                  {v.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-bone-muted"
                  dangerouslySetInnerHTML={{ __html: v.body }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="nox-container flex flex-col items-center py-20 text-center lg:py-28">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold uppercase tracking-tightest text-bone sm:text-5xl">
            Find your next grail.
          </h2>
          <div className="mt-8">
            <Button href="/shop" size="lg">Shop the archive</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

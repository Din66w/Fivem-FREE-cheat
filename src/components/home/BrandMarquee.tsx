import { Marquee } from '@/components/ui/Marquee';

const BRANDS = [
  'Represent',
  'Corteiz',
  'Stüssy',
  'Fear of God',
  'Supreme',
  'Arc’teryx',
  'Nike',
  'Carhartt',
  'Ralph Lauren',
  'Denim Tears',
];

/** Editorial brand ticker — signals the houses NOX curates. */
export function BrandMarquee() {
  return (
    <section className="border-y border-ink-600 bg-ink py-8 sm:py-10">
      <Marquee items={BRANDS} />
    </section>
  );
}

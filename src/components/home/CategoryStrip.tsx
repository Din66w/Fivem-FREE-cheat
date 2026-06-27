import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRightIcon } from '@/components/ui/Icons';

const CATEGORIES = [
  { label: 'Streetwear', href: '/shop?category=Streetwear', img: '/products/p6.jpg' },
  { label: 'Vintage', href: '/shop?category=Vintage', img: '/products/p2.jpg' },
  { label: 'Designer', href: '/shop?category=Designer', img: '/products/p3.jpg' },
  { label: 'Football Shirts', href: '/shop?category=Football+Shirts', img: '/products/p16.jpg' },
  { label: 'Y2K', href: '/shop?category=Y2K', img: '/products/p8.jpg' },
];

/**
 * Category tiles. Each reveals a grayscale image that fades + zooms in
 * on hover (the editorial category-tile effect) — premium, not a flat
 * list of links.
 */
export function CategoryStrip() {
  return (
    <section className="border-y border-ink-600">
      <div className="nox-container grid grid-cols-2 gap-px overflow-hidden bg-ink-600 lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => (
          <Reveal
            key={cat.label}
            index={i}
            className="[&:last-child]:col-span-2 lg:[&:last-child]:col-span-1"
          >
            <Link
              href={cat.href}
              className="group relative flex h-44 flex-col justify-between overflow-hidden bg-ink p-5 lg:h-60 lg:p-6"
            >
              {/* hover image reveal */}
              <Image
                src={cat.img}
                alt=""
                fill
                aria-hidden
                sizes="(min-width:1024px) 20vw, 50vw"
                className="scale-110 object-cover opacity-0 grayscale transition-all duration-[800ms] ease-nox group-hover:scale-100 group-hover:opacity-40"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ash transition-colors duration-300 group-hover:text-bone-muted">
                0{i + 1}
              </span>
              <div className="relative flex items-end justify-between gap-2">
                <span className="font-display text-xl font-bold uppercase leading-none tracking-tightest text-bone transition-transform duration-500 ease-nox group-hover:-translate-y-1 lg:text-2xl">
                  {cat.label}
                </span>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-ash transition-all duration-300 group-hover:translate-x-1 group-hover:text-bone" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

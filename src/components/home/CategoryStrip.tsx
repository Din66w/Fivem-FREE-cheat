import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRightIcon } from '@/components/ui/Icons';

const CATEGORIES = [
  { label: 'Streetwear', href: '/shop?category=Streetwear' },
  { label: 'Vintage', href: '/shop?category=Vintage' },
  { label: 'Designer', href: '/shop?category=Designer' },
  { label: 'Football Shirts', href: '/shop?category=Football+Shirts' },
  { label: 'Y2K', href: '/shop?category=Y2K' },
];

export function CategoryStrip() {
  return (
    <section className="border-y border-ink-600">
      <div className="nox-container grid grid-cols-1 divide-y divide-ink-600 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.label} index={i}>
            <Link
              href={cat.href}
              className="group flex items-center justify-between px-2 py-7 lg:flex-col lg:items-start lg:gap-10 lg:px-6"
            >
              <span className="font-display text-xl font-semibold uppercase tracking-tightest text-bone transition-colors group-hover:text-white">
                {cat.label}
              </span>
              <ArrowRightIcon className="h-5 w-5 text-ash transition-all duration-300 group-hover:translate-x-1 group-hover:text-bone lg:self-end" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

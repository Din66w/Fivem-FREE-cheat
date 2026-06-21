'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { formatMoney } from '@/lib/utils';
import { useUI } from '@/context/UIContext';
import { ArrowRightIcon } from '@/components/ui/Icons';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ products }: { products: Product[] }) {
  const { openQuickView } = useUI();
  const feature = products[0];
  const inventory = products.slice(1, 4);

  if (!feature) return null;
  const soldOut = !feature.available;

  return (
    <section className="relative overflow-hidden border-b border-ink-600 bg-ink">
      {/* soft top light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-14%] h-[55vh] w-[130vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_62%)]" />
      </div>

      <div className="nox-container relative py-10 sm:py-12">
        {/* technical top labels */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
          <span>Not for many — for the few</span>
          <span className="hidden sm:block">Curated archive / Est. 2027</span>
        </div>

        {/* stage: headline + featured product */}
        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-14">
          {/* Headline block */}
          <motion.div
            className="order-2 text-center lg:order-1 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
              [ Archive — SS26 ]
            </p>
            <h1 className="mt-5 font-display text-6xl font-black uppercase leading-[0.82] tracking-tightest text-bone sm:text-7xl lg:text-8xl">
              Clean
              <br />
              pieces
              <br />
              only.
            </h1>
            <p className="mx-auto mt-6 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-bone-muted lg:mx-0">
              Curated streetwear, vintage &amp; archive pieces. One-of-one, authenticated, clean.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link
                href="/shop?sort=newest"
                className="group inline-flex h-14 w-full items-center justify-center gap-2 bg-bone px-9 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-bone-muted sm:w-auto"
              >
                Shop New Arrivals
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shop?sort=trending"
                className="inline-flex h-14 w-full items-center justify-center border border-bone/30 px-9 text-xs font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink sm:w-auto"
              >
                View Drop
              </Link>
            </div>
          </motion.div>

          {/* Featured product */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <Link
              href={`/product/${feature.handle}`}
              className="group relative block overflow-hidden border border-ink-600 bg-ink-800"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={feature.images[0].url}
                  alt={feature.images[0].altText || feature.title}
                  fill
                  priority
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className="object-cover object-top grayscale transition-all duration-[1100ms] ease-nox group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              </div>

              {/* top labels */}
              <span className="absolute left-0 top-4 bg-bone px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink">
                {soldOut ? 'Sold Out' : `Featured — ${feature.condition}`}
              </span>
              <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">
                {feature.brand}
              </span>

              {/* bottom: name + price */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold uppercase tracking-tight text-bone">
                    {feature.title}
                  </p>
                  <p className="mt-1 font-mono text-xs tabular-nums text-bone-muted">
                    {soldOut ? 'Sold out' : formatMoney(feature.price)}
                  </p>
                </div>
              </div>
            </Link>

            {/* circular Add-to-cart CTA (FRZN-style) */}
            {!soldOut && (
              <button
                type="button"
                onClick={() => openQuickView(feature)}
                aria-label="Quick add"
                className="group absolute bottom-5 right-5 grid h-14 w-14 place-items-center rounded-full border border-bone/40 bg-ink/70 text-bone backdrop-blur transition-colors hover:bg-bone hover:text-ink"
              >
                <ArrowRightIcon className="h-5 w-5 -rotate-45 transition-transform group-hover:rotate-0" />
              </button>
            )}
          </motion.div>
        </div>

        {/* The Inventory — mini rail */}
        <div className="mt-16 border-t border-ink-600 pt-10">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-bone sm:text-xl">
              The Inventory
            </h2>
            <Link
              href="/shop"
              className="nox-link font-mono text-[11px] uppercase tracking-[0.2em] text-ash hover:text-bone"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-px bg-ink-600">
            {inventory.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.08 }}
              >
                <Link
                  href={`/product/${p.handle}`}
                  className="group relative block overflow-hidden bg-ink"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={p.images[0].url}
                      alt={p.images[0].altText || p.title}
                      fill
                      sizes="(min-width:1024px) 22vw, 33vw"
                      className="object-cover object-top grayscale transition-all duration-[900ms] ease-nox group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="hidden truncate font-mono text-[10px] uppercase tracking-[0.18em] text-bone-muted sm:block">
                        {p.brand}
                      </p>
                      <p className="truncate text-xs font-medium text-bone">{p.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] tabular-nums text-ash">
                        {p.available ? formatMoney(p.price) : 'Sold out'}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

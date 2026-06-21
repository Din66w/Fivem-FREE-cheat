'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { formatMoney } from '@/lib/utils';
import { SITE } from '@/lib/config';
import { ArrowRightIcon } from '@/components/ui/Icons';

const ease = [0.16, 1, 0.3, 1] as const;

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}
const pad = (n: number) => n.toString().padStart(2, '0');

export function Hero({ products }: { products: Product[] }) {
  const tiles = products.slice(0, 4);
  const target = new Date(SITE.dropDate).getTime();
  const [t, setT] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setT(getRemaining(target));
    const id = setInterval(() => setT(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const countdown: [string, string][] = [
    ['D', t ? pad(t.d) : '--'],
    ['H', t ? pad(t.h) : '--'],
    ['M', t ? pad(t.m) : '--'],
    ['S', t ? pad(t.s) : '--'],
  ];

  return (
    <section className="relative overflow-hidden border-b border-ink-600 bg-ink">
      {/* soft top light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12%] h-[52vh] w-[130vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_62%)]" />
      </div>

      {/* Brand lockup */}
      <div className="nox-container relative flex flex-col items-center pb-9 pt-12 text-center sm:pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
        >
          <Image
            src="/nox-logo.jpg"
            alt="NOX"
            width={132}
            height={132}
            priority
            className="rounded-full sm:h-[150px] sm:w-[150px]"
          />
        </motion.div>

        <motion.h1
          className="sr-only"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          NOX — clean pieces only.
        </motion.h1>

        <motion.p
          className="mt-7 text-sm lowercase tracking-[0.4em] text-bone sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          clean pieces only.
        </motion.p>

        <motion.p
          className="mt-3 max-w-md text-xs uppercase tracking-[0.22em] text-ash sm:text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
        >
          Curated streetwear, vintage &amp; archive pieces.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
        >
          <Link
            href="/shop"
            className="group inline-flex h-14 w-full items-center justify-center gap-2 bg-bone px-9 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-bone-muted sm:w-auto"
          >
            Shop Now
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/shop?sort=newest"
            className="inline-flex h-14 w-full items-center justify-center border border-bone/30 px-9 text-xs font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink sm:w-auto"
          >
            Latest Drop
          </Link>
        </motion.div>
      </div>

      {/* Next Drop countdown bar — above the fold */}
      <div className="relative border-y border-ink-600 bg-ink-900/80 backdrop-blur">
        <div className="nox-container flex flex-col items-center justify-center gap-3 py-4 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bone" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
              Next Drop
            </span>
          </div>
          <span className="hidden h-4 w-px bg-ink-600 sm:block" />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-bone-muted sm:text-sm">
            01.01.2027 &nbsp;|&nbsp; 00:00
          </span>
          <span className="hidden h-4 w-px bg-ink-600 sm:block" />
          <div className="flex items-center gap-2 font-mono text-xs text-bone sm:text-sm">
            {countdown.map(([label, value], i) => (
              <span key={label} className="flex items-baseline">
                <span className="tabular-nums">{value}</span>
                <span className="text-ash">{label}</span>
                {i < countdown.length - 1 && <span className="ml-2 text-ink-600">:</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured product imagery — products above the fold */}
      <div className="grid grid-cols-2 gap-px bg-ink-600 lg:grid-cols-4">
        {tiles.map((p, i) => {
          const soldOut = !p.available;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 + i * 0.08 }}
            >
              <Link
                href={`/product/${p.handle}`}
                className="group relative block overflow-hidden bg-ink"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={p.images[0].url}
                    alt={p.images[0].altText || p.title}
                    fill
                    priority={i < 2}
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover grayscale transition-all duration-[900ms] ease-nox group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

                  <span className="absolute left-0 top-3 bg-bone px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink">
                    {soldOut ? 'Sold Out' : p.condition}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-bone-muted">
                        {p.brand}
                      </p>
                      <p className="mt-1 truncate text-sm font-medium text-bone">{p.title}</p>
                    </div>
                    <p className="shrink-0 text-sm font-medium tabular-nums text-bone">
                      {soldOut ? '—' : formatMoney(p.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* archive marketplace line */}
      <Link
        href="/shop"
        className="group flex items-center justify-center gap-3 border-t border-ink-600 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-ash transition-colors hover:text-bone"
      >
        Enter the archive
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@/components/ui/Icons';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-600 bg-ink">
      {/* Subtle radial light + grain feel via gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="nox-container relative flex min-h-[88vh] flex-col justify-center py-24">
        <motion.p
          className="nox-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Curated streetwear &amp; vintage
        </motion.p>

        <motion.h1
          className="mt-5 max-w-5xl font-display text-[15vw] font-extrabold uppercase leading-[0.85] tracking-tightest text-bone sm:text-[12vw] lg:text-[10rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
        >
          When the
          <br />
          cold hits,
          <br />
          <span className="text-ash">everything</span>
          <br />
          goes quiet.
        </motion.h1>

        <motion.div
          className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
        >
          <p className="max-w-md text-sm leading-relaxed text-bone-muted">
            Handpicked streetwear, designer, football shirts and Y2K grails.
            One-of-one pieces, authenticated and clean. Engineered for the few,
            not the crowd.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex h-14 items-center gap-2 bg-bone px-9 text-sm font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white"
            >
              Shop now
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop?sort=trending"
              className="inline-flex h-14 items-center border border-bone/30 px-9 text-sm font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:border-bone"
            >
              Trending
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee strip */}
      <div className="overflow-hidden border-t border-ink-600 py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 font-display text-2xl font-bold uppercase tracking-tightest text-ink-600"
            >
              NOX — clean pieces only —
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

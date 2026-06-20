'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@/components/ui/Icons';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden border-b border-ink-600 bg-ink text-center">
      {/* Soft radial light from the top — premium depth on pure black */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[70vh] w-[140vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_60%)]" />
      </div>

      <div className="nox-container relative flex flex-col items-center py-28">
        <motion.p
          className="nox-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Premium reselling — curated streetwear &amp; vintage
        </motion.p>

        <motion.h1
          className="mt-8 font-display text-[34vw] font-black uppercase leading-[0.82] tracking-tightest text-bone sm:text-[26vw] lg:text-[20rem]"
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease, delay: 0.05 }}
        >
          NOX
        </motion.h1>

        <motion.p
          className="mt-2 text-base lowercase tracking-[0.3em] text-bone-muted sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          clean pieces only.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
        >
          <Link
            href="/shop"
            className="group inline-flex h-14 w-full items-center justify-center gap-2 bg-bone px-10 text-sm font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone-muted sm:w-auto"
          >
            Shop Now
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/shop?sort=newest"
            className="inline-flex h-14 w-full items-center justify-center border border-bone/30 px-10 text-sm font-medium uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone sm:w-auto"
          >
            Latest Drop
          </Link>
        </motion.div>
      </div>

      {/* Bottom marquee strip */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-ink-600 py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 font-display text-xl font-bold uppercase tracking-tightest text-ink-600"
            >
              NOX — clean pieces only —
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

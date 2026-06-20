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

      <div className="nox-container relative flex flex-col items-center px-6 py-32 sm:py-36 lg:py-40">
        <motion.p
          className="nox-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Premium reselling — curated streetwear &amp; vintage
        </motion.p>

        <motion.h1
          className="mt-10 font-display text-[32vw] font-black uppercase leading-[0.8] tracking-tightest text-bone sm:mt-12 sm:text-[24vw] lg:text-[19rem]"
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease, delay: 0.05 }}
        >
          NOX
        </motion.h1>

        <motion.p
          className="mt-6 text-sm lowercase tracking-[0.34em] text-bone-muted sm:mt-8 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          clean pieces only.
        </motion.p>

        {/* hairline accent */}
        <motion.div
          className="mt-10 h-px w-16 bg-bone/25"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.28 }}
        />

        <motion.div
          className="mt-10 flex w-full max-w-md flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
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

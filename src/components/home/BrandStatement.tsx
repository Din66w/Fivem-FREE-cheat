import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRightIcon } from '@/components/ui/Icons';

/**
 * Full-bleed editorial brand moment — a giant NOX wordmark over a
 * grayscale image, in the spirit of high-end streetwear lookbooks.
 * Replace the picsum seed with real campaign imagery when available.
 */
export function BrandStatement() {
  return (
    <section className="relative overflow-hidden border-y border-ink-600 bg-ink">
      <div className="relative flex min-h-[460px] items-center justify-center py-24 lg:min-h-[70vh]">
        <Image
          src="/products/p2.jpg"
          alt="NOX archive editorial"
          fill
          sizes="100vw"
          className="object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/70" />

        <div className="nox-container relative flex flex-col items-center text-center">
          <Reveal>
            <p className="nox-eyebrow mb-6">The curated archive</p>
            <h2 className="font-display text-[26vw] font-black uppercase leading-[0.78] tracking-tightest text-bone lg:text-[17rem]">
              NOX
            </h2>
            <p className="mt-6 text-sm lowercase tracking-[0.4em] text-bone-muted sm:text-base">
              clean pieces only.
            </p>
            <Link
              href="/shop"
              className="group mt-10 inline-flex h-14 items-center justify-center gap-2 border border-bone/40 px-10 text-xs font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              Enter the archive
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

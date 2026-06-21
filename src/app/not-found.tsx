import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 — Gone',
  description: 'This piece sold or the page moved. One-of-one means once it’s gone, it’s gone.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden text-center">
      {/* faint top light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[50vh] w-[120vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_65%)]" />
      </div>

      <div className="nox-container relative flex flex-col items-center py-20">
        <Image
          src="/nox-logo.jpg"
          alt="NOX"
          width={72}
          height={72}
          className="rounded-full"
        />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-ash">
          Error 404
        </p>
        <h1 className="mt-5 font-display text-[26vw] font-black uppercase leading-[0.85] tracking-tightest text-bone sm:text-[12rem]">
          Gone.
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-muted">
          This piece sold or the page moved. One-of-one means once it&apos;s gone,
          it&apos;s gone.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/shop" size="lg">Back to the archive</Button>
          <Button href="/" variant="outline" size="lg">Home</Button>
        </div>
      </div>
    </div>
  );
}

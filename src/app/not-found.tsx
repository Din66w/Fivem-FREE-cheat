import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="nox-container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-ash">Error 404</p>
      <h1 className="mt-6 font-display text-[22vw] font-extrabold uppercase leading-none tracking-tightest text-bone sm:text-[12rem]">
        Gone.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-bone-muted">
        This piece sold or the page moved. One-of-one means once it&apos;s gone, it&apos;s gone.
      </p>
      <div className="mt-8">
        <Button href="/shop" size="lg">Back to the archive</Button>
      </div>
    </div>
  );
}

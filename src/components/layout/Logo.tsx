import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * NOX wordmark. Kept as type (not a raster) so it stays crisp and
 * theme-able. Drop a real logo asset in /public and swap if desired.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NOX — home"
      className={cn(
        'group inline-flex flex-col leading-none',
        className,
      )}
    >
      <span className="font-display text-2xl font-extrabold uppercase tracking-[0.22em] text-bone transition-opacity duration-300 group-hover:opacity-80">
        NOX
      </span>
      <span className="mt-0.5 text-[9px] font-medium lowercase tracking-[0.28em] text-ash">
        clean pieces only.
      </span>
    </Link>
  );
}

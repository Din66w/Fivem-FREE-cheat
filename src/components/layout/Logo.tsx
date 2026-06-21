import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * NOX wordmark — the white cursive script on transparent, so it reads
 * clean on the black header (no disc/badge). Minimal, premium.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NOX — home"
      className={cn('group inline-flex items-center', className)}
    >
      <Image
        src="/nox-logo-white.png"
        alt="NOX"
        width={846}
        height={380}
        priority
        className="h-7 w-auto transition-opacity duration-300 group-hover:opacity-80 sm:h-8"
      />
    </Link>
  );
}

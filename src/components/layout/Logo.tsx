import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * NOX brand mark (public/nox-logo.jpg) — white disc, black script.
 * Shown as-is: the image's black corners blend into the black header,
 * so it reads as a clean circular badge. Minimalist premium look.
 */
export function Logo({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <Link
      href="/"
      aria-label="NOX — home"
      className={cn('group inline-flex items-center', className)}
    >
      <Image
        src="/nox-logo.jpg"
        alt="NOX"
        width={size}
        height={size}
        priority
        className="rounded-full transition-opacity duration-300 group-hover:opacity-80"
        style={{ width: size, height: size }}
      />
    </Link>
  );
}

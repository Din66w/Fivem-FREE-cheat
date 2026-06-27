import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-bone text-ink hover:bg-white before:bg-[linear-gradient(110deg,transparent,rgba(0,0,0,0.10),transparent)]',
  outline:
    'border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-ink before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)]',
  ghost: 'text-bone hover:bg-ink-700',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-12 px-7 text-xs',
  lg: 'h-14 px-9 text-sm',
};

const baseClass =
  'relative inline-flex items-center justify-center overflow-hidden font-medium uppercase tracking-[0.18em] ' +
  'transition-all duration-300 ease-nox disabled:cursor-not-allowed disabled:opacity-40 ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] ' +
  'before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[130%] before:skew-x-[-20deg] ' +
  'before:transition-transform before:duration-700 before:ease-nox hover:before:translate-x-[130%] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/60';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', href, fullWidth, className, children, ...props },
  ref,
) {
  const classes = cn(
    baseClass,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

  const inner = (
    <span className="relative z-[1] inline-flex items-center justify-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {inner}
    </button>
  );
});

import Link from 'next/link';
import { ArrowRightIcon } from './Icons';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}

export function SectionHeading({ eyebrow, title, href, hrefLabel = 'View all' }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <Reveal>
        <div>
          {eyebrow && <p className="nox-eyebrow mb-3">{eyebrow}</p>}
          <h2 className="font-display text-3xl font-semibold uppercase tracking-tightest text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
      </Reveal>
      {href && (
        <Link
          href={href}
          className="nox-link group hidden shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ash hover:text-bone sm:inline-flex"
        >
          {hrefLabel}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

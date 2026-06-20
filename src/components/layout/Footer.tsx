import Link from 'next/link';
import { FOOTER_COLUMNS, SITE, SOCIALS } from '@/lib/config';
import { NewsletterForm } from '@/components/common/NewsletterForm';

export function Footer() {
  return (
    <footer className="border-t border-ink-600 bg-ink-900">
      <div className="nox-container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <p className="font-display text-3xl font-extrabold uppercase tracking-[0.22em] text-bone">
              {SITE.name}
            </p>
            <p className="mt-2 text-sm lowercase tracking-[0.1em] text-ash">{SITE.slogan}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone-muted">
              Curated vintage and streetwear. Every piece handpicked for quality,
              style and authenticity.
            </p>
            <div className="mt-8 max-w-sm">
              <p className="nox-eyebrow mb-3">Join the list</p>
              <NewsletterForm compact />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="nox-eyebrow mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="nox-link text-sm text-bone-muted hover:text-bone"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink-600 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-ash">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="nox-link text-xs uppercase tracking-[0.18em] text-ash hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

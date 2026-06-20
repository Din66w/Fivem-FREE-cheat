import Link from 'next/link';
import { FOOTER_LINKS, SITE, SOCIALS } from '@/lib/config';
import { NewsletterForm } from '@/components/common/NewsletterForm';
import { InstagramIcon, TikTokIcon } from '@/components/ui/Icons';

const SOCIAL_ICONS: Record<string, typeof TikTokIcon> = {
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-ink-600 bg-ink-900">
      {/* Oversized brand band */}
      <div className="nox-container overflow-hidden pt-16 lg:pt-20">
        <p className="select-none text-center font-display text-[26vw] font-black uppercase leading-none tracking-tightest text-ink-700 lg:text-[16rem]">
          NOX
        </p>
      </div>

      <div className="nox-container grid gap-12 pb-14 lg:grid-cols-12 lg:gap-8">
        {/* Newsletter */}
        <div className="lg:col-span-5">
          <p className="text-sm lowercase tracking-[0.2em] text-bone-muted">{SITE.slogan}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-muted">
            Curated vintage and streetwear. Every piece handpicked for quality,
            style and authenticity.
          </p>
          <div className="mt-7 max-w-sm">
            <p className="nox-eyebrow mb-3">Never miss a drop</p>
            <NewsletterForm compact />
          </div>
        </div>

        {/* Nav */}
        <div className="lg:col-span-4 lg:col-start-7">
          <p className="nox-eyebrow mb-5">Menu</p>
          <ul className="space-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="nox-link text-lg font-medium text-bone hover:text-bone-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="lg:col-span-2">
          <p className="nox-eyebrow mb-5">Social</p>
          <ul className="space-y-3">
            {SOCIALS.filter((s) => SOCIAL_ICONS[s.label]).map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-bone-muted hover:text-bone"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="nox-link text-sm">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-600">
        <div className="nox-container flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-ash">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-ash">
            Premium reselling — clean pieces only.
          </p>
        </div>
      </div>
    </footer>
  );
}

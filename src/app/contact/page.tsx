import type { Metadata } from 'next';
import { SOCIALS } from '@/lib/config';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/common/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with NOX — questions, sourcing requests and authentication.',
};

export default function ContactPage() {
  return (
    <div className="nox-container py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="nox-eyebrow">[ Contact — hello@nox.store ]</p>
            <h1 className="mt-5 font-display text-5xl font-black uppercase tracking-tightest text-bone sm:text-6xl lg:text-7xl">
              Contact
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone-muted">
              Questions about a piece, sourcing requests, authentication, orders —
              we read everything. Expect a reply within 24 hours.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="mt-10 space-y-6 border-t border-ink-600 pt-10">
              {SOCIALS.map((s) => (
                <div key={s.label}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ash">{s.label}</p>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="nox-link mt-1 inline-block text-lg text-bone hover:text-white"
                  >
                    {s.handle}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal index={1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}

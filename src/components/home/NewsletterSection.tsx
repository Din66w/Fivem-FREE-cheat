import { Reveal } from '@/components/ui/Reveal';
import { NewsletterForm } from '@/components/common/NewsletterForm';

export function NewsletterSection() {
  return (
    <section className="border-t border-ink-600 bg-ink-900">
      <div className="nox-container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="nox-eyebrow">Don&apos;t miss the drop</p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tightest text-bone sm:text-5xl">
              First to know.
              <br />
              First to cop.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-bone-muted">
              Subscribe for early access to drops, restocks and one-of-one grails.
              No noise — clean pieces only.
            </p>
          </Reveal>
          <Reveal index={1}>
            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

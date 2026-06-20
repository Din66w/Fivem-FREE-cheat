import type { Metadata } from 'next';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion, type QA } from '@/components/common/Accordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Shipping, returns, authenticity and payments — everything you need to know about NOX.',
};

const SECTIONS: { id: string; title: string; items: QA[] }[] = [
  {
    id: 'shipping',
    title: 'Shipping',
    items: [
      {
        q: 'Where do you ship?',
        a: 'Worldwide. UK orders are dispatched within 1–2 business days; international orders within 1–3. Every parcel is fully tracked end to end.',
      },
      {
        q: 'How much is shipping?',
        a: 'UK shipping is a flat rate and free over £150. International rates are calculated at checkout based on destination and weight.',
      },
      {
        q: 'When will my order arrive?',
        a: 'UK: 2–4 business days. Europe: 3–6. Rest of world: 5–10. You will receive tracking the moment your order leaves us.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns',
    items: [
      {
        q: 'What is your returns policy?',
        a: 'Returns are accepted within 14 days of delivery, provided the piece is unworn and in its original condition with any tags attached.',
      },
      {
        q: 'How do I start a return?',
        a: 'Email hello@nox.store with your order number and we will send a prepaid label (UK) or instructions (international). Refunds are processed within 5 business days of receipt.',
      },
      {
        q: 'Are all items returnable?',
        a: 'Most are. One-of-one vintage grails are sold as described with detailed condition notes and photos — please read carefully before ordering. Anything sold "as-is" is marked clearly.',
      },
    ],
  },
  {
    id: 'authenticity',
    title: 'Authenticity',
    items: [
      {
        q: 'Are your items authentic?',
        a: 'Always. Every piece is inspected and authenticated by our team before it is listed. We never sell replicas, reproductions or anything we cannot verify.',
      },
      {
        q: 'How do you verify authenticity?',
        a: 'We assess construction, hardware, labels, stitching and provenance against known references, and use third-party authentication for high-value designer pieces.',
      },
      {
        q: 'What condition are vintage pieces in?',
        a: 'Each listing states condition honestly — from Deadstock to Good — with close-up photos of any wear. What you see is exactly what lands.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'All major cards, Apple Pay, Google Pay, PayPal and Shop Pay. Checkout is fully secured and encrypted.',
      },
      {
        q: 'Can I pay in instalments?',
        a: 'Yes — Klarna and Clearpay are available at checkout on eligible orders, letting you split payment over time.',
      },
      {
        q: 'Is my payment secure?',
        a: 'Completely. Payments are processed through Shopify Payments / PCI-compliant providers. We never see or store your card details.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="nox-container py-16 lg:py-24">
      <Reveal>
        <p className="nox-eyebrow">Help &amp; info</p>
        <h1 className="mt-5 font-display text-5xl font-extrabold uppercase tracking-tightest text-bone sm:text-6xl">
          FAQ
        </h1>
      </Reveal>

      {/* Quick jump nav */}
      <Reveal index={1}>
        <div className="mt-10 flex flex-wrap gap-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="border border-ink-600 px-4 py-2 text-xs uppercase tracking-[0.15em] text-bone-muted transition-colors hover:border-bone hover:text-bone"
            >
              {s.title}
            </a>
          ))}
        </div>
      </Reveal>

      <div className="mt-14 space-y-16">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-tightest text-bone">
              {section.title}
            </h2>
            <Accordion items={section.items} />
          </section>
        ))}
      </div>
    </div>
  );
}

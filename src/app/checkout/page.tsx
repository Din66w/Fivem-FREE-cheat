import type { Metadata } from 'next';
import { CheckoutClient } from '@/components/cart/CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="nox-container py-16 lg:py-24">
      <p className="nox-eyebrow">Almost yours</p>
      <h1 className="mb-12 mt-5 font-display text-5xl font-extrabold uppercase tracking-tightest text-bone sm:text-6xl">
        Checkout
      </h1>
      <CheckoutClient />
    </div>
  );
}

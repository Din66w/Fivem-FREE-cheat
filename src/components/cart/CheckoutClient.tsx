'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CheckoutClient() {
  const { lines, subtotal, currencyCode, hydrated } = useCart();
  const [loading, setLoading] = useState(false);
  const [demoNotice, setDemoNotice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines: lines.map((l) => ({ variantId: l.variant.id, quantity: l.quantity })),
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.demo) {
        setDemoNotice(true);
      } else {
        setError(data.error ?? 'Something went wrong.');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  if (!hydrated) return <div className="nox-skeleton h-64 w-full" />;

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-display text-3xl uppercase tracking-tightest text-bone">
          Your bag is empty
        </p>
        <Button href="/shop" variant="outline">Shop the archive</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
      {/* Line items */}
      <ul className="divide-y divide-ink-600 border-y border-ink-600">
        {lines.map((line) => (
          <li key={line.variant.id} className="flex gap-5 py-6">
            <Link
              href={`/product/${line.product.handle}`}
              className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-ink-800"
            >
              <Image
                src={line.product.images[0].url}
                alt={line.product.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col">
              <p className="text-[11px] uppercase tracking-[0.12em] text-ash">
                {line.product.brand}
              </p>
              <p className="text-bone">{line.product.title}</p>
              <p className="mt-1 text-xs text-ash">
                Size {line.variant.size} · Qty {line.quantity}
              </p>
              <p className="mt-auto text-sm text-bone">
                {formatMoney({
                  amount: line.variant.price.amount * line.quantity,
                  currencyCode,
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <aside className="h-fit border border-ink-600 p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-xl font-semibold uppercase tracking-tightest text-bone">
          Order summary
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between text-bone-muted">
            <dt>Subtotal</dt>
            <dd className="text-bone">{formatMoney({ amount: subtotal, currencyCode })}</dd>
          </div>
          <div className="flex justify-between text-bone-muted">
            <dt>Shipping</dt>
            <dd>Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-ink-600 pt-4">
          <Button onClick={handleCheckout} fullWidth size="lg" disabled={loading}>
            {loading ? 'Redirecting…' : 'Secure checkout'}
          </Button>
        </div>

        {error && <p className="mt-3 text-xs text-bone-muted">{error}</p>}

        {demoNotice && (
          <div className="mt-4 border border-ink-600 bg-ink p-4 text-xs leading-relaxed text-bone-muted">
            <p className="mb-1 font-medium text-bone">Demo mode</p>
            Connect Shopify (set <span className="font-mono">SHOPIFY_STORE_DOMAIN</span> and your
            Storefront token) to enable live, hosted checkout. The full cart flow is already wired —
            it just needs credentials.
          </div>
        )}

        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.12em] text-ash">
          Secure payment · Klarna &amp; Clearpay available
        </p>
      </aside>
    </div>
  );
}

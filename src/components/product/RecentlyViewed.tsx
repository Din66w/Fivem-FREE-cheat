'use client';

import type { Product } from '@/lib/types';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from './ProductRail';

/**
 * Renders the visitor's recently-viewed pieces. Receives the full
 * catalog pool from a server component and resolves stored handles
 * against it — works identically in demo and Shopify modes.
 */
export function RecentlyViewed({
  pool,
  excludeHandle,
}: {
  pool: Product[];
  excludeHandle?: string;
}) {
  const { handles, hydrated } = useRecentlyViewed();
  if (!hydrated) return null;

  const products = handles
    .filter((h) => h !== excludeHandle)
    .map((h) => pool.find((p) => p.handle === h))
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section className="nox-container py-16 lg:py-24">
      <SectionHeading eyebrow="Pick up where you left off" title="Recently Viewed" />
      <ProductRail products={products} />
    </section>
  );
}

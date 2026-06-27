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

  // Only show once there are enough pieces to fill a row — a lone card
  // stranded in a wide rail looks sparse/cheap.
  if (products.length < 4) return null;

  return (
    <section className="nox-container cv-auto py-20 lg:py-28">
      <SectionHeading eyebrow="Pick up where you left off" title="Recently Viewed" />
      <ProductRail products={products} />
    </section>
  );
}

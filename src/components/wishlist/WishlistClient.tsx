'use client';

import type { Product } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';

export function WishlistClient({ pool }: { pool: Product[] }) {
  const { handles, hydrated } = useWishlist();

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="nox-skeleton aspect-[3/4]" />
        ))}
      </div>
    );
  }

  const products = handles
    .map((h) => pool.find((p) => p.handle === h))
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-display text-3xl uppercase tracking-tightest text-bone">
          Your wishlist is empty
        </p>
        <p className="max-w-sm text-sm text-ash">
          Tap the heart on any piece to save it here for later.
        </p>
        <Button href="/shop" variant="outline" className="mt-2">Browse the archive</Button>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}

import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { WishlistClient } from '@/components/wishlist/WishlistClient';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved NOX pieces.',
  robots: { index: false, follow: false },
};

export default async function WishlistPage() {
  const products = await getAllProducts();
  return (
    <div className="nox-container py-16 lg:py-24">
      <p className="nox-eyebrow">Saved for later</p>
      <h1 className="mb-12 mt-5 font-display text-5xl font-extrabold uppercase tracking-tightest text-bone sm:text-6xl">
        Wishlist
      </h1>
      <WishlistClient pool={products} />
    </div>
  );
}

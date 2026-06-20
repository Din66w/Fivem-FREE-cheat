import type { Product } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from '@/components/product/ProductRail';

export function Trending({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="nox-container py-16 lg:py-24">
      <SectionHeading
        eyebrow="Moving fast"
        title="Trending Now"
        href="/shop?sort=trending"
        hrefLabel="View all"
      />
      <ProductRail products={products} />
    </section>
  );
}

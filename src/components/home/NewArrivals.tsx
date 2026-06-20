import type { Product } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from '@/components/product/ProductRail';

export function NewArrivals({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="border-y border-ink-600 bg-ink-900">
      <div className="nox-container py-16 lg:py-24">
        <SectionHeading
          eyebrow="Just landed"
          title="New Arrivals"
          href="/shop?sort=newest"
          hrefLabel="See all new"
        />
        <ProductRail products={products} />
      </div>
    </section>
  );
}

import type { Product } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from '@/components/product/ProductGrid';

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="nox-container py-16 lg:py-24">
      <SectionHeading
        eyebrow="The selects"
        title="Featured Pieces"
        href="/shop"
        hrefLabel="Shop all"
      />
      <ProductGrid products={products} priorityCount={4} />
    </section>
  );
}

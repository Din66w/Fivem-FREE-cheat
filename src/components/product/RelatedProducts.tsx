import type { Product } from '@/lib/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from './ProductRail';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="nox-container py-16 lg:py-24">
      <SectionHeading eyebrow="You might also like" title="Related Pieces" />
      <ProductRail products={products} />
    </section>
  );
}

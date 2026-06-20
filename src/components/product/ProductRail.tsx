import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

/** Horizontal, snap-scrolling rail of product cards. */
export function ProductRail({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[68vw] shrink-0 snap-start sm:w-[40vw] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

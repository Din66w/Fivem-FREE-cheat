import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  className?: string;
  priorityCount?: number;
}

export function ProductGrid({ products, className, priorityCount = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center border border-dashed border-ink-600 text-center">
        <p className="font-display text-2xl uppercase tracking-tightest text-bone">
          No pieces found
        </p>
        <p className="mt-2 text-sm text-ash">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-16 xl:grid-cols-4',
        className,
      )}
    >
      {products.map((product, i) => (
        <Reveal key={product.id} index={i % 4} as="div">
          <ProductCard product={product} priority={i < priorityCount} />
        </Reveal>
      ))}
    </div>
  );
}

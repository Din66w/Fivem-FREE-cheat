'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, ProductVariant } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icons';

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { openCart } = useUI();
  const [selected, setSelected] = useState<ProductVariant | null>(
    product.variants.length === 1 ? product.variants[0] : null,
  );
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selected) {
      setError(true);
      return;
    }
    addItem(product, selected, 1);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Size selector */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="nox-eyebrow">Size</p>
          {error && !selected && (
            <p className="text-[11px] uppercase tracking-[0.15em] text-bone-muted">
              Select a size
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => {
            const isActive = selected?.id === variant.id;
            return (
              <button
                key={variant.id}
                type="button"
                disabled={!variant.available}
                onClick={() => {
                  setSelected(variant);
                  setError(false);
                }}
                className={cn(
                  'min-w-[3rem] border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200',
                  isActive
                    ? 'border-bone bg-bone text-ink'
                    : 'border-ink-600 text-bone hover:border-bone',
                  !variant.available &&
                    'cursor-not-allowed border-ink-700 text-ink-600 line-through hover:border-ink-700',
                )}
              >
                {variant.size}
              </button>
            );
          })}
        </div>
      </div>

      <Button onClick={handleAdd} fullWidth size="lg" disabled={!product.available}>
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <CheckIcon className="h-4 w-4" /> Added to bag
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {product.available ? 'Add to bag' : 'Sold out'}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

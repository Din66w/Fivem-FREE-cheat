'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { CartLine, Product, ProductVariant } from '@/lib/types';

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  currencyCode: string;
  hydrated: boolean;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { value: lines, setValue: setLines, hydrated } = useLocalStorage<CartLine[]>(
    'nox:cart',
    [],
  );

  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.variant.id === variant.id);
        if (existing) {
          return prev.map((l) =>
            l.variant.id === variant.id
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        }
        return [...prev, { product, variant, quantity }];
      });
    },
    [setLines],
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.variant.id !== variantId)
          : prev.map((l) =>
              l.variant.id === variantId ? { ...l, quantity } : l,
            ),
      );
    },
    [setLines],
  );

  const removeItem = useCallback(
    (variantId: string) =>
      setLines((prev) => prev.filter((l) => l.variant.id !== variantId)),
    [setLines],
  );

  const clear = useCallback(() => setLines([]), [setLines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.variant.price.amount * l.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      currencyCode: lines[0]?.variant.price.currencyCode ?? 'GBP',
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    };
  }, [lines, hydrated, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

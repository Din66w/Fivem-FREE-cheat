'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface WishlistContextValue {
  handles: string[];
  count: number;
  hydrated: boolean;
  has: (handle: string) => boolean;
  toggle: (handle: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { value: handles, setValue, hydrated } = useLocalStorage<string[]>(
    'nox:wishlist',
    [],
  );

  const has = useCallback((handle: string) => handles.includes(handle), [handles]);

  const toggle = useCallback(
    (handle: string) =>
      setValue((prev) =>
        prev.includes(handle)
          ? prev.filter((h) => h !== handle)
          : [handle, ...prev],
      ),
    [setValue],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ handles, count: handles.length, hydrated, has, toggle }),
    [handles, hydrated, has, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}

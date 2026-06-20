'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { UIProvider } from '@/context/UIContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickView } from '@/components/product/QuickView';
import { NewsletterPopup } from '@/components/common/NewsletterPopup';

/**
 * Composes every client-side provider and mounts the global overlays
 * (cart drawer, quick-view modal, newsletter popup) once for the whole app.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <QuickView />
            <NewsletterPopup />
          </CartProvider>
        </RecentlyViewedProvider>
      </WishlistProvider>
    </UIProvider>
  );
}

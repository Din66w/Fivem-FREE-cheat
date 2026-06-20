'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';

/** Side-effect-only component: records a product view on mount. */
export function TrackView({ handle }: { handle: string }) {
  const { track } = useRecentlyViewed();
  useEffect(() => track(handle), [handle, track]);
  return null;
}

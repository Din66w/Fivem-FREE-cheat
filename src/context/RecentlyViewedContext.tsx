'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const MAX = 8;

interface RecentlyViewedContextValue {
  handles: string[];
  hydrated: boolean;
  track: (handle: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const { value: handles, setValue, hydrated } = useLocalStorage<string[]>(
    'nox:recently-viewed',
    [],
  );

  const track = useCallback(
    (handle: string) =>
      setValue((prev) => [handle, ...prev.filter((h) => h !== handle)].slice(0, MAX)),
    [setValue],
  );

  const value = useMemo<RecentlyViewedContextValue>(
    () => ({ handles, hydrated, track }),
    [handles, hydrated, track],
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}

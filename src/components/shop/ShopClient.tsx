'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product, ProductFilters, SortKey } from '@/lib/types';
import { filterProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Filters, type Facets } from './Filters';
import { CloseIcon, SearchIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

interface ShopClientProps {
  products: Product[];
  facets: Facets;
  initialFilters: ProductFilters;
}

export function ShopClient({ products, facets, initialFilters }: ShopClientProps) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const clear = () =>
    setFilters({ sort: filters.sort, query: filters.query });

  const filterPanel = (
    <Filters facets={facets} filters={filters} onChange={setFilters} onClear={clear} />
  );

  return (
    <div className="nox-container py-10 lg:py-14">
      {/* Page head */}
      <div className="mb-10 border-b border-ink-600 pb-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
          <span>[ Catalog — full archive ]</span>
          <span className="tabular-nums">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-tightest text-bone sm:text-6xl lg:text-7xl">
              The Archive
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-muted">
              Every piece authenticated and one-of-one — curated streetwear, vintage,
              designer &amp; Y2K.
            </p>
          </div>

          {/* Search */}
          <div className="flex w-full max-w-md items-center gap-3 border border-ink-600 px-4 focus-within:border-bone lg:w-80">
            <SearchIcon className="h-4 w-4 text-ash" />
            <input
              type="search"
              value={filters.query ?? ''}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="Search brand, piece, tag…"
              className="h-11 w-full bg-transparent text-sm text-bone placeholder:text-ash focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="border border-ink-600 px-4 py-2.5 text-xs uppercase tracking-[0.15em] text-bone hover:border-bone lg:hidden"
            >
              Filters
            </button>
            <div className="ml-auto flex items-center gap-3">
              <label className="hidden text-xs uppercase tracking-[0.15em] text-ash sm:block">
                Sort
              </label>
              <select
                value={filters.sort ?? 'newest'}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value as SortKey })
                }
                className="border border-ink-600 bg-ink px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-bone focus:border-bone focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value} className="bg-ink">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={filtered} priorityCount={4} />
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className={cn(
                'fixed inset-y-0 left-0 z-[61] w-[85%] max-w-sm overflow-y-auto border-r border-ink-600 bg-ink-900 px-6 py-6 lg:hidden',
              )}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="font-display text-lg uppercase tracking-tightest text-bone">
                  Filters
                </p>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close"
                  className="text-bone"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              {filterPanel}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full bg-bone py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink"
              >
                Show {filtered.length} results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

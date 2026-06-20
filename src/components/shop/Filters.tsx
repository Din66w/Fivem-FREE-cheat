'use client';

import type { Category, Condition, ProductFilters } from '@/lib/types';
import { formatMoney } from '@/lib/utils';
import { CheckOption, FilterGroup } from './FilterGroup';

export interface Facets {
  brands: string[];
  sizes: string[];
  categories: string[];
  conditions: string[];
  maxPrice: number;
}

interface FiltersProps {
  facets: Facets;
  filters: ProductFilters;
  onChange: (next: ProductFilters) => void;
  onClear: () => void;
}

export function Filters({ facets, filters, onChange, onClear }: FiltersProps) {
  const toggle = <K extends 'brands' | 'sizes' | 'categories' | 'conditions'>(
    key: K,
    value: string,
  ) => {
    const list = (filters[key] as string[] | undefined) ?? [];
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    (filters.brands?.length ?? 0) +
    (filters.sizes?.length ?? 0) +
    (filters.categories?.length ?? 0) +
    (filters.conditions?.length ?? 0) +
    (filters.maxPrice != null ? 1 : 0);

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-bone">
          Filters {activeCount > 0 && <span className="text-ash">({activeCount})</span>}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="nox-link text-[11px] uppercase tracking-[0.15em] text-ash hover:text-bone"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        {facets.categories.map((c) => (
          <CheckOption
            key={c}
            label={c}
            checked={filters.categories?.includes(c as Category) ?? false}
            onChange={() => toggle('categories', c)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {facets.brands.map((b) => (
          <CheckOption
            key={b}
            label={b}
            checked={filters.brands?.includes(b) ?? false}
            onChange={() => toggle('brands', b)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((s) => {
            const active = filters.sizes?.includes(s) ?? false;
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle('sizes', s)}
                className={
                  'min-w-[2.75rem] border px-3 py-2 text-xs uppercase tracking-[0.1em] transition-colors ' +
                  (active
                    ? 'border-bone bg-bone text-ink'
                    : 'border-ink-600 text-bone-muted hover:border-bone')
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Condition">
        {facets.conditions.map((c) => (
          <CheckOption
            key={c}
            label={c}
            checked={filters.conditions?.includes(c as Condition) ?? false}
            onChange={() => toggle('conditions', c)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Max Price">
        <input
          type="range"
          min={0}
          max={facets.maxPrice}
          step={10}
          value={filters.maxPrice ?? facets.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-bone"
        />
        <div className="mt-2 flex justify-between text-xs text-ash">
          <span>{formatMoney({ amount: 0, currencyCode: 'GBP' })}</span>
          <span className="text-bone">
            {formatMoney({
              amount: filters.maxPrice ?? facets.maxPrice,
              currencyCode: 'GBP',
            })}
          </span>
        </div>
      </FilterGroup>
    </div>
  );
}

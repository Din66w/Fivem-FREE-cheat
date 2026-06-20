import type { Metadata } from 'next';
import { buildFacets, getAllProducts } from '@/lib/products';
import type { Category, Condition, ProductFilters, SortKey } from '@/lib/types';
import { ShopClient } from '@/components/shop/ShopClient';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop curated streetwear, vintage, designer, football shirts and Y2K. One-of-one pieces, authenticated and clean.',
};

export const revalidate = 60;

interface ShopPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function asArray(value: string | string[] | undefined): string[] | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value : [value];
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await getAllProducts();
  const facets = buildFacets(products);

  const initialFilters: ProductFilters = {
    query: typeof searchParams.q === 'string' ? searchParams.q : undefined,
    categories: asArray(searchParams.category) as Category[] | undefined,
    brands: asArray(searchParams.brand),
    sizes: asArray(searchParams.size),
    conditions: asArray(searchParams.condition) as Condition[] | undefined,
    sort: (searchParams.sort as SortKey) ?? 'newest',
  };

  return (
    <ShopClient products={products} facets={facets} initialFilters={initialFilters} />
  );
}

// ──────────────────────────────────────────────────────────────
// Unified product data-access layer.
//
// The whole app imports from here and NEVER from Shopify or the
// dummy catalog directly. When Shopify is configured it serves live
// data; otherwise it serves the bundled demo catalog. Filtering and
// sorting run identically in both modes so the UI never branches.
// ──────────────────────────────────────────────────────────────

import { DUMMY_PRODUCTS } from './dummy-data';
import { isShopifyConfigured, shopifyFetch } from './shopify/client';
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from './shopify/queries';
import { transformProduct, type RawProduct } from './shopify/transforms';
import type { Product, ProductFilters, SortKey } from './types';

async function fetchAll(): Promise<Product[]> {
  if (!isShopifyConfigured) return DUMMY_PRODUCTS;

  const data = await shopifyFetch<{ products: { edges: { node: RawProduct }[] } }>(
    { query: GET_PRODUCTS, variables: { first: 100 } },
  );
  return data.products.edges.map((e) => transformProduct(e.node));
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchAll();
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return DUMMY_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });
  return data.product ? transformProduct(data.product) : null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await fetchAll();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getTrendingProducts(limit = 6): Promise<Product[]> {
  const all = await fetchAll();
  return all.filter((p) => p.trending).slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  const all = await fetchAll();
  return [...all]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const all = await fetchAll();
  return all
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      score:
        (p.category === product.category ? 2 : 0) +
        (p.brand === product.brand ? 2 : 0) +
        p.tags.filter((t) => product.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export async function getProductsByHandles(handles: string[]): Promise<Product[]> {
  if (!handles.length) return [];
  const all = await fetchAll();
  // Preserve the order of the requested handles.
  return handles
    .map((h) => all.find((p) => p.handle === h))
    .filter((p): p is Product => Boolean(p));
}

// ─── Client-usable pure helpers ───────────────────────────────

export function sortProducts(products: Product[], sort: SortKey = 'newest'): Product[] {
  const out = [...products];
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => a.price.amount - b.price.amount);
    case 'price-desc':
      return out.sort((a, b) => b.price.amount - a.price.amount);
    case 'trending':
      return out.sort((a, b) => Number(b.trending) - Number(a.trending));
    case 'newest':
    default:
      return out.sort(
        (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
      );
  }
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const q = filters.query?.trim().toLowerCase();
  const result = products.filter((p) => {
    if (q) {
      const haystack = `${p.title} ${p.brand} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.brands?.length && !filters.brands.includes(p.brand)) return false;
    if (filters.categories?.length && !filters.categories.includes(p.category)) return false;
    if (filters.conditions?.length && !filters.conditions.includes(p.condition)) return false;
    if (filters.sizes?.length && !p.variants.some((v) => filters.sizes!.includes(v.size)))
      return false;
    if (filters.minPrice != null && p.price.amount < filters.minPrice) return false;
    if (filters.maxPrice != null && p.price.amount > filters.maxPrice) return false;
    return true;
  });
  return sortProducts(result, filters.sort);
}

// ─── Facets for the shop filter UI ────────────────────────────

export function buildFacets(products: Product[]) {
  const brands = new Set<string>();
  const sizes = new Set<string>();
  const categories = new Set<string>();
  const conditions = new Set<string>();
  let maxPrice = 0;

  for (const p of products) {
    brands.add(p.brand);
    categories.add(p.category);
    conditions.add(p.condition);
    p.variants.forEach((v) => sizes.add(v.size));
    maxPrice = Math.max(maxPrice, p.price.amount);
  }

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const sortedSizes = [...sizes].sort((a, b) => {
    const ia = sizeOrder.indexOf(a);
    const ib = sizeOrder.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, undefined, { numeric: true });
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return {
    brands: [...brands].sort(),
    sizes: sortedSizes,
    categories: [...categories].sort(),
    conditions: [...conditions].sort(),
    maxPrice: Math.ceil(maxPrice / 10) * 10,
  };
}

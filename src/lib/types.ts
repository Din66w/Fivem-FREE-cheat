// ──────────────────────────────────────────────────────────────
// NOX domain types
//
// These are intentionally a *superset-friendly* shape that maps
// cleanly onto the Shopify Storefront API. The dummy catalog and
// the Shopify adapter both normalise into these types, so every
// component in the app only ever speaks "NOX", never "Shopify".
// ──────────────────────────────────────────────────────────────

export type Condition =
  | 'Brand New'
  | 'Deadstock'
  | 'Like New'
  | 'Excellent'
  | 'Good'
  | 'Vintage';

export type Category =
  | 'Streetwear'
  | 'Vintage'
  | 'Designer'
  | 'Football Shirts'
  | 'Y2K'
  | 'Accessories';

export interface Money {
  amount: number;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  /** Size label, e.g. "M", "US 9", "One Size". */
  title: string;
  size: string;
  price: Money;
  available: boolean;
}

export interface Product {
  id: string;
  /** URL-safe identifier — also the Shopify product handle. */
  handle: string;
  title: string;
  brand: string;
  category: Category;
  condition: Condition;
  description: string;
  /** Short, single-line tagline for cards / SEO. */
  excerpt: string;
  price: Money;
  /** Optional original price for "was/now" sale display. */
  compareAtPrice?: Money;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  /** Curated flags drive the home-page rails. */
  featured: boolean;
  trending: boolean;
  /** ISO date — newest first powers "New Arrivals". */
  publishedAt: string;
  /** Single piece resale — most items are 1-of-1. */
  available: boolean;
}

export interface CartLine {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  lines: CartLine[];
  /** Shopify cart id once a checkout has been created. */
  id?: string;
  checkoutUrl?: string;
}

export interface ProductFilters {
  query?: string;
  brands?: string[];
  sizes?: string[];
  categories?: Category[];
  conditions?: Condition[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
}

export type SortKey =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'trending';

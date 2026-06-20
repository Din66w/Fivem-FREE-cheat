// Normalises raw Shopify Storefront payloads into NOX domain types.
// Every assumption Shopify-specific lives here and nowhere else.

import type {
  Category,
  Condition,
  Product,
  ProductImage,
  ProductVariant,
} from '../types';

interface Edge<T> {
  edges: Array<{ node: T }>;
}

interface RawMoney {
  amount: string;
  currencyCode: string;
}

interface RawVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: RawMoney;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  publishedAt: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: RawMoney };
  compareAtPriceRange: { minVariantPrice: RawMoney };
  images: Edge<ProductImage>;
  variants: Edge<RawVariant>;
}

const CATEGORIES: Category[] = [
  'Streetwear',
  'Vintage',
  'Designer',
  'Football Shirts',
  'Y2K',
  'Accessories',
];

const CONDITIONS: Condition[] = [
  'Brand New',
  'Deadstock',
  'Like New',
  'Excellent',
  'Good',
  'Vintage',
];

function money(raw: RawMoney) {
  return { amount: parseFloat(raw.amount), currencyCode: raw.currencyCode };
}

/** Pull a value out of Shopify tags formatted like `condition:Deadstock`. */
function tagValue(tags: string[], key: string): string | undefined {
  const hit = tags.find((t) => t.toLowerCase().startsWith(`${key}:`));
  return hit?.split(':')[1]?.trim();
}

export function transformProduct(raw: RawProduct): Product {
  const images = raw.images.edges.map((e) => e.node);
  const variants: ProductVariant[] = raw.variants.edges.map((e) => {
    const size =
      e.node.selectedOptions.find((o) => o.name.toLowerCase() === 'size')
        ?.value ?? e.node.title;
    return {
      id: e.node.id,
      title: e.node.title,
      size,
      price: money(e.node.price),
      available: e.node.availableForSale,
    };
  });

  const category =
    (CATEGORIES.find((c) => c === raw.productType) ??
      (tagValue(raw.tags, 'category') as Category)) ||
    'Streetwear';

  const condition =
    (CONDITIONS.find((c) => c === tagValue(raw.tags, 'condition')) as Condition) ||
    'Vintage';

  const price = money(raw.priceRange.minVariantPrice);
  const compareAt = money(raw.compareAtPriceRange.minVariantPrice);

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    brand: raw.vendor,
    category,
    condition,
    description: raw.description,
    excerpt: raw.description.split('\n')[0]?.slice(0, 120) ?? '',
    price,
    compareAtPrice: compareAt.amount > price.amount ? compareAt : undefined,
    images: images.length
      ? images
      : [{ url: '/placeholder.svg', altText: raw.title } as ProductImage],
    variants,
    tags: raw.tags,
    featured: raw.tags.includes('featured'),
    trending: raw.tags.includes('trending'),
    publishedAt: raw.publishedAt,
    available: raw.availableForSale,
  };
}

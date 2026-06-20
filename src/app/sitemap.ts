import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/config';
import { getAllProducts } from '@/lib/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticRoutes = ['', '/shop', '/about', '/contact', '/faq'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const products = await getAllProducts();
  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.handle}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

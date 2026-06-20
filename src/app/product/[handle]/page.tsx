import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllProducts,
  getProductByHandle,
  getRelatedProducts,
} from '@/lib/products';
import { SITE } from '@/lib/config';
import { formatMoney } from '@/lib/utils';
import { ImageGallery } from '@/components/product/ImageGallery';
import { AddToCart } from '@/components/product/AddToCart';
import { WishlistButton } from '@/components/product/WishlistButton';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { TrackView } from '@/components/product/TrackView';

export const revalidate = 60;

interface PageProps {
  params: { handle: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: 'Not found' };
  return {
    title: `${product.title} — ${product.brand}`,
    description: product.excerpt,
    openGraph: {
      title: `${product.title} — ${product.brand}`,
      description: product.excerpt,
      images: [{ url: product.images[0].url }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  const [related, all] = await Promise.all([
    getRelatedProducts(product, 6),
    getAllProducts(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.map((i) => i.url),
    description: product.excerpt,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.price.currencyCode,
      price: product.price.amount,
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE.url}/product/${product.handle}`,
      itemCondition: 'https://schema.org/UsedCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackView handle={product.handle} />

      <div className="nox-container py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-ash">
          <Link href="/" className="hover:text-bone">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-bone">Shop</Link>
          <span>/</span>
          <span className="text-bone-muted">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageGallery images={product.images} title={product.title} />

          <div className="lg:py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="nox-eyebrow">{product.brand}</p>
                <h1 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tightest text-bone sm:text-4xl">
                  {product.title}
                </h1>
              </div>
              <WishlistButton handle={product.handle} className="mt-1 shrink-0" />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl text-bone">{formatMoney(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-base text-ash line-through">
                  {formatMoney(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Spec list */}
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-ink-600 bg-ink-600 text-sm sm:grid-cols-3">
              {[
                ['Condition', product.condition],
                ['Brand', product.brand],
                ['Category', product.category],
              ].map(([label, value]) => (
                <div key={label} className="bg-ink-900 p-4">
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-ash">{label}</dt>
                  <dd className="mt-1 text-bone">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            <div className="mt-10 border-t border-ink-600 pt-8">
              <p className="nox-eyebrow mb-3">Description</p>
              <div className="space-y-4 text-sm leading-relaxed text-bone-muted">
                {product.description.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <ul className="mt-8 space-y-2 border-t border-ink-600 pt-8 text-xs text-ash">
              <li>• Authenticated &amp; quality-checked by NOX.</li>
              <li>• One-of-one piece — once it&apos;s gone, it&apos;s gone.</li>
              <li>• Tracked worldwide shipping. 14-day returns.</li>
            </ul>
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />
      <RecentlyViewed pool={all} excludeHandle={product.handle} />
    </>
  );
}

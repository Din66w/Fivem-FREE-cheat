import {
  getAllProducts,
  getFeaturedProducts,
  getNewArrivals,
  getTrendingProducts,
} from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { TrustSection } from '@/components/home/TrustSection';
import { StatsStrip } from '@/components/home/StatsStrip';
import { BrandStatement } from '@/components/home/BrandStatement';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { NewArrivals } from '@/components/home/NewArrivals';
import { Trending } from '@/components/home/Trending';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { SocialSection } from '@/components/home/SocialSection';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { BrandMarquee } from '@/components/home/BrandMarquee';

// Re-fetch product rails periodically once connected to Shopify.
export const revalidate = 60;

export default async function HomePage() {
  const [featured, arrivals, trending, all] = await Promise.all([
    getFeaturedProducts(4),
    getNewArrivals(8),
    getTrendingProducts(6),
    getAllProducts(),
  ]);

  return (
    <>
      {/* Product-forward hero: branding + drop countdown + featured pieces */}
      <Hero products={featured} />
      <TrustSection />
      <NewArrivals products={arrivals} />
      <CategoryStrip />
      <BrandStatement />
      <Trending products={trending} />
      <StatsStrip />
      <BrandMarquee />
      <SocialSection />
      <RecentlyViewed pool={all} />
      <NewsletterSection />
    </>
  );
}

import {
  getAllProducts,
  getFeaturedProducts,
  getNewArrivals,
  getTrendingProducts,
} from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { TrustSection } from '@/components/home/TrustSection';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { NewArrivals } from '@/components/home/NewArrivals';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Trending } from '@/components/home/Trending';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { SocialSection } from '@/components/home/SocialSection';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';

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
      <Hero />
      <TrustSection />
      <NewArrivals products={arrivals} />
      <FeaturedProducts products={featured} />
      <CategoryStrip />
      <Trending products={trending} />
      <SocialSection />
      <RecentlyViewed pool={all} />
      <NewsletterSection />
    </>
  );
}

import {
  getAllProducts,
  getFeaturedProducts,
  getNewArrivals,
  getTrendingProducts,
} from '@/lib/products';
import { Hero } from '@/components/home/Hero';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { NewArrivals } from '@/components/home/NewArrivals';
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
      <CategoryStrip />
      <FeaturedProducts products={featured} />
      <NewArrivals products={arrivals} />
      <Trending products={trending} />
      <SocialSection />
      <RecentlyViewed pool={all} />
      <NewsletterSection />
    </>
  );
}

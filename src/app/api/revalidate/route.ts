import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Shopify webhook → on-demand revalidation.
 *
 * Configure a webhook (e.g. products/update) in Shopify pointing to
 * /api/revalidate?secret=YOUR_SECRET. When products change, the
 * relevant pages are rebuilt without a full redeploy.
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');
  if (!process.env.SHOPIFY_REVALIDATION_SECRET || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/shop');
  revalidatePath('/product/[handle]', 'page');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

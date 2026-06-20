import { NextResponse } from 'next/server';
import { isShopifyConfigured, shopifyFetch } from '@/lib/shopify/client';
import { CREATE_CART } from '@/lib/shopify/queries';

interface CheckoutLine {
  variantId: string;
  quantity: number;
}

/**
 * Creates a Shopify cart from the client-side bag and returns the
 * hosted checkout URL. In demo mode (no Shopify credentials) it
 * responds with `{ demo: true }` so the UI can show a friendly notice
 * instead of failing.
 */
export async function POST(request: Request) {
  const { lines } = (await request.json()) as { lines: CheckoutLine[] };

  if (!lines?.length) {
    return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
  }

  if (!isShopifyConfigured) {
    return NextResponse.json({ demo: true });
  }

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: { message: string }[];
      };
    }>({
      query: CREATE_CART,
      variables: {
        lines: lines.map((l) => ({
          merchandiseId: l.variantId,
          quantity: l.quantity,
        })),
      },
      revalidate: 0,
    });

    const { cart, userErrors } = data.cartCreate;
    if (!cart) {
      return NextResponse.json(
        { error: userErrors[0]?.message ?? 'Checkout failed' },
        { status: 502 },
      );
    }

    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch {
    return NextResponse.json({ error: 'Checkout failed' }, { status: 502 });
  }
}

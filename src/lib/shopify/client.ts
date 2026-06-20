// Low-level Shopify Storefront API client.
//
// This is server-only. It is never imported by client components.
// If credentials are absent, `isShopifyConfigured` is false and the
// data layer transparently falls back to the bundled dummy catalog.

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-07';

export const isShopifyConfigured = Boolean(domain && token);

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : '';

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /** ISR cache window in seconds. */
  revalidate?: number;
}

export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 60,
}: ShopifyFetchOptions): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      'Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.',
    );
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

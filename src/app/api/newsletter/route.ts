import { NextResponse } from 'next/server';

/**
 * Newsletter signup endpoint (stub).
 *
 * Swap the body of this handler for your provider:
 *  - Shopify: customerCreate mutation w/ acceptsMarketing
 *  - Klaviyo / Mailchimp: POST to their list subscribe API
 * Keep the request/response contract identical so the UI is untouched.
 */
export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // TODO: persist to your ESP. For now we simply acknowledge.
    console.info(`[newsletter] subscribe: ${email}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

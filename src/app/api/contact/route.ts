import { NextResponse } from 'next/server';

/**
 * Contact form endpoint (stub). Wire this to your email provider
 * (Resend / Postmark / SendGrid) or a CRM. The UI expects only an
 * `ok: true` on success.
 */
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, string>;
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // TODO: send the email / push to CRM here.
    console.info('[contact] message received from', data.email);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

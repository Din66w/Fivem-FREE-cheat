'use client';

import Script from 'next/script';

/**
 * Official TikTok creator embed. Renders @<handle>'s latest feed via
 * TikTok's embed.js (loaded lazily so it never blocks first paint).
 * Falls back to a styled link if the script is blocked.
 */
export function TikTokEmbed({ handle = 'nox' }: { handle?: string }) {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <blockquote
        className="tiktok-embed overflow-hidden rounded-sm"
        cite={`https://www.tiktok.com/@${handle}`}
        data-unique-id={handle}
        data-embed-type="creator"
        style={{ maxWidth: '100%', minWidth: 260 }}
      >
        <section className="flex min-h-[260px] items-center justify-center bg-ink-800 text-sm text-ash">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.tiktok.com/@${handle}?refer=creator_embed`}
          >
            @{handle} on TikTok
          </a>
        </section>
      </blockquote>
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </div>
  );
}

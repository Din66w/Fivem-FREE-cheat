import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InstagramIcon, TikTokIcon } from '@/components/ui/Icons';

// Demo social grid — replace seeds with your IG/TikTok feed (e.g. via
// a Behold/EmbedSocial feed API) when connecting live content.
const POSTS = Array.from({ length: 6 }).map((_, i) => ({
  seed: `social-${i}`,
  href: 'https://instagram.com',
}));

export function SocialSection() {
  return (
    <section className="nox-container py-16 lg:py-24">
      <SectionHeading eyebrow="@nox" title="Follow The Feed" />
      <div className="mb-8 flex gap-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-muted hover:text-bone"
        >
          <InstagramIcon className="h-5 w-5" /> Instagram
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-muted hover:text-bone"
        >
          <TikTokIcon className="h-5 w-5" /> TikTok
        </a>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {POSTS.map((post, i) => (
          <Reveal key={post.seed} index={i % 6}>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden bg-ink-800"
            >
              <Image
                src={`https://picsum.photos/seed/nox-${post.seed}/600/600`}
                alt="NOX on Instagram"
                fill
                sizes="(min-width:1024px) 16vw, 33vw"
                className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition-opacity group-hover:opacity-100">
                <InstagramIcon className="h-6 w-6 text-bone" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

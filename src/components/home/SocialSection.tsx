import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InstagramIcon, TikTokIcon } from '@/components/ui/Icons';

// Demo grid — replace seeds with your live TikTok/IG feed when ready.
const POSTS = Array.from({ length: 6 }).map((_, i) => ({ seed: `social-${i}` }));

export function SocialSection() {
  return (
    <section className="nox-container py-20 lg:py-28">
      <SectionHeading eyebrow="As seen on" title="Follow @nox" />

      <div className="mb-10 flex flex-wrap gap-3">
        <a
          href="https://tiktok.com/@nox"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-bone/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:border-bone"
        >
          <TikTokIcon className="h-5 w-5" /> TikTok
        </a>
        <a
          href="https://instagram.com/nox"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-bone/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:border-bone"
        >
          <InstagramIcon className="h-5 w-5" /> Instagram
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {POSTS.map((post, i) => (
          <Reveal key={post.seed} index={i % 6}>
            <a
              href="https://tiktok.com/@nox"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-[9/16] overflow-hidden bg-ink-800"
            >
              <Image
                src={`https://picsum.photos/seed/nox-${post.seed}/540/960`}
                alt="NOX on TikTok"
                fill
                sizes="(min-width:1024px) 16vw, 50vw"
                className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 grid place-items-center bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                <TikTokIcon className="h-7 w-7 text-bone" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InstagramIcon, TikTokIcon } from '@/components/ui/Icons';
import { TikTokEmbed } from './TikTokEmbed';

// Demo grid — replace seeds with your live IG/TikTok feed when ready.
const POSTS = Array.from({ length: 4 }).map((_, i) => ({ seed: `social-${i}` }));

export function SocialSection() {
  return (
    <section className="nox-container cv-auto py-20 lg:py-28">
      <SectionHeading eyebrow="As seen on" title="Follow @nox" />

      <div className="mb-10 flex flex-wrap gap-3">
        <a
          href="https://tiktok.com/@nox"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 border border-bone/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-bone hover:bg-bone hover:text-ink"
        >
          <TikTokIcon className="h-5 w-5" /> TikTok
        </a>
        <a
          href="https://instagram.com/nox"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 border border-bone/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-bone hover:bg-bone hover:text-ink"
        >
          <InstagramIcon className="h-5 w-5" /> Instagram
        </a>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Live TikTok embed */}
        <Reveal className="lg:col-span-5 xl:col-span-4">
          <TikTokEmbed handle="nox" />
        </Reveal>

        {/* Feed preview grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7 lg:grid-cols-2 xl:col-span-8 xl:grid-cols-4">
          {POSTS.map((post, i) => (
            <Reveal key={post.seed} index={i % 4}>
              <a
                href="https://tiktok.com/@nox"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-[9/16] overflow-hidden bg-ink-800"
              >
                <Image
                  src={`/ph/${(i % 6) + 1}.svg`}
                  alt="NOX on TikTok"
                  fill
                  loading="lazy"
                  sizes="(min-width:1280px) 16vw, (min-width:640px) 22vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 ease-nox group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <TikTokIcon className="h-7 w-7 text-bone" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

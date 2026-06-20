'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { ProductImage } from '@/lib/types';

/**
 * Product image gallery with thumbnail rail and hover-to-zoom on the
 * active image (desktop). Falls back to a clean static image on touch.
 */
export function ImageGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const current = images[active];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
      {/* Main image */}
      <div
        ref={frameRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-ink-800"
      >
        <Image
          src={current.url}
          alt={current.altText || title}
          fill
          priority
          sizes="(min-width:1024px) 50vw, 100vw"
          className={cn(
            'object-cover transition-transform duration-300 ease-out',
            zoom ? 'scale-[1.8]' : 'scale-100',
          )}
          style={zoom ? { transformOrigin: `${origin.x}% ${origin.y}%` } : undefined}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 lg:flex-col">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-ink-800 transition-opacity lg:w-20',
                active === i ? 'opacity-100 ring-1 ring-bone' : 'opacity-50 hover:opacity-90',
              )}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

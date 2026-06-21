'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { cn, discountPercent, formatMoney } from '@/lib/utils';
import { useUI } from '@/context/UIContext';
import { WishlistButton } from './WishlistButton';
import { BagIcon } from '@/components/ui/Icons';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const { openQuickView } = useUI();
  const discount = discountPercent(product.price, product.compareAtPrice);
  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];
  const soldOut = !product.available;

  return (
    <motion.article
      className={cn('group relative', className)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden border border-ink-600 bg-ink-800 transition-colors duration-500 ease-nox group-hover:border-bone/25">
          <Image
            src={primary.url}
            alt={primary.altText || product.title}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            priority={priority}
            className={cn(
              'object-cover grayscale transition-all duration-700 ease-nox',
              soldOut ? 'opacity-60' : 'group-hover:scale-[1.03] group-hover:opacity-0',
            )}
          />
          {!soldOut && (
            <Image
              src={secondary.url}
              alt=""
              aria-hidden
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              className="scale-105 object-cover opacity-0 transition-all duration-[900ms] ease-nox group-hover:scale-100 group-hover:opacity-100"
            />
          )}

          {/* Sold out overlay */}
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="border border-bone/40 bg-ink/70 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-bone backdrop-blur">
                Sold Out
              </span>
            </div>
          )}

          {/* Depth veil for badge / button legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20 opacity-70" />

          {/* Badges */}
          <div className="absolute left-0 top-3 flex flex-col gap-1.5">
            <span className="bg-bone px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink">
              {product.condition}
            </span>
            {discount && !soldOut && (
              <span className="bg-ink/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-bone backdrop-blur">
                −{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <WishlistButton handle={product.handle} />
          </div>

          {/* Quick add */}
          {!soldOut && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product);
              }}
              className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 bg-bone py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink opacity-0 transition-all duration-300 ease-nox hover:bg-white group-hover:translate-y-0 group-hover:opacity-100"
            >
              <BagIcon className="h-4 w-4" /> Quick Add
            </button>
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ash">{product.brand}</p>
          <Link href={`/product/${product.handle}`}>
            <h3 className="mt-1.5 truncate text-sm font-medium tracking-tight text-bone transition-colors group-hover:text-white">
              {product.title}
            </h3>
          </Link>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium tabular-nums text-bone">{formatMoney(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs tabular-nums text-ash line-through">
              {formatMoney(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>

      {/* Sizes directly visible */}
      <p className="mt-2.5 truncate text-[10px] uppercase tracking-[0.2em] text-ash">
        {product.variants
          .filter((v) => v.available)
          .map((v) => v.size)
          .join('  /  ') || 'Sold out'}
      </p>
    </motion.article>
  );
}

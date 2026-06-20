'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { cn, discountPercent, formatMoney } from '@/lib/utils';
import { useUI } from '@/context/UIContext';
import { WishlistButton } from './WishlistButton';
import { EyeIcon } from '@/components/ui/Icons';

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

  return (
    <motion.article
      className={cn('group relative', className)}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <Link href={`/product/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink-800">
          <Image
            src={primary.url}
            alt={primary.altText || product.title}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-opacity duration-500 ease-nox group-hover:opacity-0"
          />
          <Image
            src={secondary.url}
            alt=""
            aria-hidden
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="scale-105 object-cover opacity-0 transition-all duration-700 ease-nox group-hover:scale-100 group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <span className="bg-bone px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">
              {product.condition}
            </span>
            {discount && (
              <span className="bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-bone">
                -{discount}%
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute right-3 top-3">
            <WishlistButton handle={product.handle} />
          </div>

          {/* Quick view */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 bg-bone/95 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink opacity-0 backdrop-blur transition-all duration-300 ease-nox group-hover:translate-y-0 group-hover:opacity-100"
          >
            <EyeIcon className="h-4 w-4" /> Quick view
          </button>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.15em] text-ash">{product.brand}</p>
          <Link href={`/product/${product.handle}`}>
            <h3 className="mt-1 truncate text-sm font-medium text-bone transition-colors hover:text-white">
              {product.title}
            </h3>
          </Link>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium text-bone">{formatMoney(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-ash line-through">
              {formatMoney(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>

      {/* Sizes directly visible */}
      <p className="mt-2 truncate text-[11px] uppercase tracking-[0.14em] text-ash">
        {product.variants
          .filter((v) => v.available)
          .map((v) => v.size)
          .join('  ·  ') || 'Sold out'}
      </p>
    </motion.article>
  );
}

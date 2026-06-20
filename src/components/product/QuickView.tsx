'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useUI } from '@/context/UIContext';
import { formatMoney } from '@/lib/utils';
import { CloseIcon } from '@/components/ui/Icons';
import { AddToCart } from './AddToCart';
import { WishlistButton } from './WishlistButton';

export function QuickView() {
  const { quickViewProduct: product, closeQuickView } = useUI();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close quick view"
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={closeQuickView}
          />
          <motion.div
            className="relative grid max-h-[88vh] w-full max-w-4xl grid-cols-1 overflow-hidden border border-ink-600 bg-ink-900 sm:grid-cols-2"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={closeQuickView}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-bone hover:text-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <div className="relative aspect-[3/4] bg-ink-800 sm:aspect-auto">
              <Image
                src={product.images[0].url}
                alt={product.images[0].altText || product.title}
                fill
                sizes="(min-width:640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute right-3 top-3 sm:hidden">
                <WishlistButton handle={product.handle} />
              </div>
            </div>

            <div className="flex flex-col overflow-y-auto p-7 sm:p-9">
              <p className="nox-eyebrow">{product.brand}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tightest text-bone">
                {product.title}
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg text-bone">{formatMoney(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-ash line-through">
                    {formatMoney(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-ink-600 py-4 text-xs">
                <div>
                  <dt className="text-ash">Condition</dt>
                  <dd className="mt-1 text-bone">{product.condition}</dd>
                </div>
                <div>
                  <dt className="text-ash">Category</dt>
                  <dd className="mt-1 text-bone">{product.category}</dd>
                </div>
              </dl>

              <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-bone-muted">
                {product.description}
              </p>

              <div className="mt-auto pt-6">
                <AddToCart product={product} />
                <Link
                  href={`/product/${product.handle}`}
                  onClick={closeQuickView}
                  className="nox-link mt-4 inline-block text-xs uppercase tracking-[0.18em] text-ash hover:text-bone"
                >
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

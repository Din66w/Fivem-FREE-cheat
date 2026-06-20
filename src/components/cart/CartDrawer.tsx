'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { formatMoney } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CloseIcon, MinusIcon, PlusIcon } from '@/components/ui/Icons';

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { lines, subtotal, currencyCode, count, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-ink-600 bg-ink-900"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-ink-600 px-6 py-5">
              <h2 className="font-display text-lg font-semibold uppercase tracking-[0.15em] text-bone">
                Bag {count > 0 && <span className="text-ash">({count})</span>}
              </h2>
              <button type="button" onClick={closeCart} aria-label="Close" className="text-bone hover:text-white">
                <CloseIcon className="h-5 w-5" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-display text-2xl uppercase tracking-tightest text-bone">
                  Your bag is empty
                </p>
                <p className="text-sm text-ash">Clean pieces are waiting.</p>
                <Button href="/shop" onClick={closeCart} variant="outline" className="mt-2">
                  Shop now
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink-600 overflow-y-auto px-6">
                  {lines.map((line) => (
                    <li key={line.variant.id} className="flex gap-4 py-5">
                      <Link
                        href={`/product/${line.product.handle}`}
                        onClick={closeCart}
                        className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-ink-800"
                      >
                        <Image
                          src={line.product.images[0].url}
                          alt={line.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-ash">
                              {line.product.brand}
                            </p>
                            <p className="truncate text-sm text-bone">{line.product.title}</p>
                            <p className="mt-0.5 text-xs text-ash">Size {line.variant.size}</p>
                          </div>
                          <p className="shrink-0 text-sm text-bone">
                            {formatMoney({
                              amount: line.variant.price.amount * line.quantity,
                              currencyCode,
                            })}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-ink-600">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(line.variant.id, line.quantity - 1)}
                              className="grid h-8 w-8 place-items-center text-bone hover:bg-ink-700"
                            >
                              <MinusIcon className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs text-bone">{line.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(line.variant.id, line.quantity + 1)}
                              className="grid h-8 w-8 place-items-center text-bone hover:bg-ink-700"
                            >
                              <PlusIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(line.variant.id)}
                            className="nox-link text-[11px] uppercase tracking-[0.12em] text-ash hover:text-bone"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-ink-600 px-6 py-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="uppercase tracking-[0.15em] text-ash">Subtotal</span>
                    <span className="text-bone">{formatMoney({ amount: subtotal, currencyCode })}</span>
                  </div>
                  <p className="mt-1 text-xs text-ash">Shipping &amp; taxes calculated at checkout.</p>
                  <Button href="/checkout" onClick={closeCart} fullWidth size="lg" className="mt-5">
                    Checkout
                  </Button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="nox-link mt-4 block w-full text-center text-xs uppercase tracking-[0.18em] text-ash hover:text-bone"
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

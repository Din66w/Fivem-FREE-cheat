'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from '@/components/ui/Icons';

export function Header() {
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openCart, openMobileMenu } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-colors duration-300',
          scrolled
            ? 'border-ink-600 bg-ink/80 backdrop-blur-xl'
            : 'border-transparent bg-ink',
        )}
      >
        <div className="nox-container flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Left: mobile menu + desktop nav */}
          <div className="flex flex-1 items-center gap-8">
            <button
              type="button"
              onClick={openMobileMenu}
              aria-label="Open menu"
              className="text-bone lg:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nox-link text-xs font-medium uppercase tracking-[0.18em] text-bone-muted hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <div className="flex flex-1 justify-center">
            <Logo />
          </div>

          {/* Right: actions */}
          <div className="flex flex-1 items-center justify-end gap-5 text-bone">
            <Link href="/shop" aria-label="Search" className="hover:text-white">
              <SearchIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative hover:text-white"
            >
              <HeartIcon className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bone px-1 text-[9px] font-semibold text-ink">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              className="relative hover:text-white"
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bone px-1 text-[9px] font-semibold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}

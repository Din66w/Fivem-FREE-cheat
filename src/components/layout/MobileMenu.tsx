'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, SOCIALS } from '@/lib/config';
import { useUI } from '@/context/UIContext';
import { CloseIcon } from '@/components/ui/Icons';
import { Logo } from './Logo';

export function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu } = useUI();

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-ink lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="nox-container flex h-16 items-center justify-between border-b border-ink-600">
            <Logo />
            <button type="button" onClick={closeMobileMenu} aria-label="Close menu" className="text-bone">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="nox-container flex flex-1 flex-col justify-center gap-2">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block py-2 font-display text-4xl font-semibold uppercase tracking-tightest text-bone"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="nox-container flex gap-6 border-t border-ink-600 py-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.18em] text-ash hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

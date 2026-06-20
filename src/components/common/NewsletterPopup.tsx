'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CloseIcon } from '@/components/ui/Icons';
import { NewsletterForm } from './NewsletterForm';

/** Appears once per visitor after a short delay; dismissal persists. */
export function NewsletterPopup() {
  const { value: dismissed, setValue: setDismissed, hydrated } =
    useLocalStorage<boolean>('nox:newsletter-dismissed', false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hydrated || dismissed) return;
    const id = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(id);
  }, [hydrated, dismissed]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close newsletter"
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            className="relative w-full max-w-md border border-ink-600 bg-ink-900 p-8 sm:p-10"
            initial={{ scale: 0.94, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-ash hover:text-bone"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <p className="nox-eyebrow">NOX DROP • 01.01.2027</p>
            <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tightest text-bone">
              First access.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-bone-muted">
              Subscribe for early access to drops, restocks and one-of-one grails.
              No spam — clean pieces only.
            </p>
            <div className="mt-6">
              <NewsletterForm onSubscribed={() => setTimeout(close, 1600)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

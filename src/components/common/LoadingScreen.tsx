'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Luxury intro overlay. Shows the NOX mark on pure black, then fades
 * away on first load. Only runs once per browser session so internal
 * navigation never re-triggers it.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem('nox:intro') === 'done';
    } catch {
      /* ignore */
    }
    if (shown) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('nox:intro', 'done');
      } catch {
        /* ignore */
      }
    }, 1150);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/nox-logo.jpg"
              alt="NOX"
              width={120}
              height={120}
              priority
              className="rounded-full"
            />
          </motion.div>

          <motion.p
            className="mt-6 text-[10px] lowercase tracking-[0.4em] text-ash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            clean pieces only.
          </motion.p>

          {/* Thin progress hairline */}
          <motion.div
            className="mt-10 h-px bg-bone/40"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

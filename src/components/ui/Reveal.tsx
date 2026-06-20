'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

interface RevealProps {
  children: ReactNode;
  /** Stagger index for sequenced reveals. */
  index?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}

/** Fades + lifts content into view once, respecting reduced-motion. */
export function Reveal({ children, index = 0, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}

import type { Money } from './types';

/** Tailwind-friendly className joiner (no extra dependency). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: money.amount % 1 === 0 ? 0 : 2,
  }).format(money.amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

/** Discount percentage between compareAt and current price. */
export function discountPercent(price: Money, compareAt?: Money): number | null {
  if (!compareAt || compareAt.amount <= price.amount) return null;
  return Math.round(((compareAt.amount - price.amount) / compareAt.amount) * 100);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Central brand + site configuration.

export const SITE = {
  name: 'NOX',
  slogan: 'clean pieces only.',
  description:
    'NOX — curated streetwear, vintage, designer, football shirts and Y2K. Every piece handpicked for quality, style and authenticity. clean pieces only.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nox.store',
  announcement: '⏰ NOX DROP • 01.01.2027 • 00:00',
  dropDate: '2027-01-01T00:00:00Z',
} as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'New', href: '/shop?sort=newest' },
  { label: 'Trending', href: '/shop?sort=trending' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIALS = [
  { label: 'Instagram', handle: '@nox', href: 'https://instagram.com' },
  { label: 'TikTok', handle: '@nox', href: 'https://tiktok.com' },
  { label: 'Email', handle: 'hello@nox.store', href: 'mailto:hello@nox.store' },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Pieces', href: '/shop' },
      { label: 'New Arrivals', href: '/shop?sort=newest' },
      { label: 'Trending', href: '/shop?sort=trending' },
      { label: 'Football Shirts', href: '/shop?category=Football+Shirts' },
      { label: 'Y2K', href: '/shop?category=Y2K' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Authenticity', href: '/faq#authenticity' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping', href: '/faq#shipping' },
      { label: 'Returns', href: '/faq#returns' },
      { label: 'Payments', href: '/faq#payments' },
    ],
  },
] as const;

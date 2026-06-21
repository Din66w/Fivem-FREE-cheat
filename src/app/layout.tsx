import type { Metadata, Viewport } from 'next';
import { Inter, Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE, SOCIALS } from '@/lib/config';
import { Providers } from '@/components/providers/Providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Premium type system. Archivo (heavy grotesque) for the wordmark &
// headlines, Inter for body/UI, JetBrains Mono for the drop countdown.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.slogan}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'fashion',
  keywords: [
    'NOX',
    'NOX store',
    'premium streetwear',
    'vintage fashion',
    'designer clothing resale',
    'football shirts',
    'Y2K fashion',
    'second-hand designer',
    'curated streetwear',
    'archive fashion',
  ],
  alternates: { canonical: '/' },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.slogan}`,
    description: SITE.description,
    url: SITE.url,
    locale: 'en_GB',
    images: [
      {
        url: '/nox-logo.jpg',
        width: 1080,
        height: 1080,
        alt: `${SITE.name} — ${SITE.slogan}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.slogan}`,
    description: SITE.description,
    creator: '@nox',
    images: ['/nox-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/nox-logo.jpg', type: 'image/jpeg' }],
    shortcut: ['/nox-logo.jpg'],
    apple: ['/nox-logo.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        slogan: SITE.slogan,
        logo: `${SITE.url}/nox-logo.jpg`,
        sameAs: SOCIALS.filter((s) => s.href.startsWith('http')).map((s) => s.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        publisher: { '@id': `${SITE.url}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/shop?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <AnnouncementBar />
          <Header />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

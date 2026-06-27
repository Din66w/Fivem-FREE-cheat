import type { Product } from './types';

// ──────────────────────────────────────────────────────────────
// Demo catalog — used whenever Shopify credentials are absent.
//
// Each piece maps to real editorial apparel photography in
// /public/products, chosen to fit the garment (graphic tees → graphic
// tee shots, denim → denim, outerwear → jackets, etc.). Swap for your
// own product shots / Shopify CDN when ready and this layer drops out.
// ──────────────────────────────────────────────────────────────

// Product id → ordered real photos (first = card / hero image).
const PRODUCT_IMAGES: Record<string, string[]> = {
  'nox-001': ['p6', 'p9'], // technical puffer — streetwear model + outerwear rack
  'nox-002': ['p7', 'p6'], // cargo pant — model
  'nox-003': ['p1', 'p6'], // essentials hoodie — clean top
  'nox-004': ['p5', 'p11'], // 8-ball graphic tee
  'nox-005': ['p11', 'p1'], // owners' club washed tee
  'nox-006': ['p16', 'p5'], // juventus shirt — striped flatlay
  'nox-007': ['p9', 'p6'], // nike windbreaker — outerwear rack
  'nox-008': ['p8', 'p2'], // baggy carpenter denim
  'nox-009': ['p9', 'p4'], // beta gore-tex shell
  'nox-010': ['p9', 'p2'], // carhartt detroit jacket
  'nox-011': ['p11', 'p5'], // cotton wreath black tee
  'nox-012': ['p6', 'p16'], // polo sport cap — model wearing cap
  'nox-013': ['p5', 'p16'], // ac milan shirt
  'nox-014': ['p6', 'p7'], // knit balaclava — model
  'nox-015': ['p9', 'p3'], // cropped leather bomber
  'nox-016': ['p6', 'p1'], // box logo hoodie
};

const GBP = 'GBP';

function p(
  partial: Omit<Product, 'currencyCode' | 'price' | 'variants' | 'images'> & {
    price: number;
    compareAt?: number;
    sizes: string[];
    imageSeeds: string[];
  },
): Product {
  const { price, compareAt, sizes, imageSeeds: _seeds, ...rest } = partial;
  void _seeds;
  const photos = PRODUCT_IMAGES[rest.id] ?? ['p2'];
  return {
    ...rest,
    price: { amount: price, currencyCode: GBP },
    compareAtPrice: compareAt ? { amount: compareAt, currencyCode: GBP } : undefined,
    images: photos.map((name, i) => ({
      url: `/products/${name}.jpg`,
      altText: `${rest.title} — ${rest.brand} (view ${i + 1})`,
      width: 1000,
      height: 1250,
    })),
    variants: sizes.map((size, i) => ({
      id: `${rest.id}-v${i}`,
      title: size,
      size,
      price: { amount: price, currencyCode: GBP },
      available: rest.available,
    })),
  };
}

export const DUMMY_PRODUCTS: Product[] = [
  p({
    id: 'nox-001',
    handle: 'shadow-puffer-jacket',
    title: 'Shadow Technical Puffer',
    brand: 'NOX Archive',
    category: 'Streetwear',
    condition: 'Deadstock',
    description:
      'Engineered for cold, not for crowds. A boxy, matte-shell down puffer with sealed seams and a high collar. Built to withstand sub-zero temperatures while keeping a clean, architectural silhouette.\n\nWhen the cold hits, everything else goes quiet.',
    excerpt: 'Matte-shell down puffer with a high collar and architectural cut.',
    price: 320,
    compareAt: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    imageSeeds: ['puffer-a', 'puffer-b', 'puffer-c'],
    tags: ['featured', 'trending', 'outerwear'],
    featured: true,
    trending: true,
    publishedAt: '2026-06-10T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-002',
    handle: 'corteiz-cargo-grey',
    title: 'Alcatraz Cargo Pant — Grey',
    brand: 'Corteiz',
    category: 'Streetwear',
    condition: 'Like New',
    description:
      'The cult cargo in fog grey. Tapered leg, bungee hem, and the signature buckle hardware. Worn twice, kept immaculate.',
    excerpt: 'Cult tapered cargo in fog grey with bungee hem.',
    price: 145,
    sizes: ['M', 'L'],
    imageSeeds: ['cargo-a', 'cargo-b'],
    tags: ['trending'],
    featured: false,
    trending: true,
    publishedAt: '2026-06-08T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-003',
    handle: 'fear-of-god-hoodie-cream',
    title: 'Essentials Hoodie — Cream',
    brand: 'Fear of God',
    category: 'Designer',
    condition: 'Excellent',
    description:
      'Oversized drop-shoulder hoodie in cream with rubberised logo. Heavyweight loopback cotton that softens with every wear.',
    excerpt: 'Oversized cream hoodie in heavyweight loopback cotton.',
    price: 110,
    compareAt: 150,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imageSeeds: ['hoodie-a', 'hoodie-b'],
    tags: ['featured'],
    featured: true,
    trending: false,
    publishedAt: '2026-06-05T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-004',
    handle: 'stussy-8ball-tee',
    title: '8 Ball Heavyweight Tee',
    brand: 'Stüssy',
    category: 'Streetwear',
    condition: 'Brand New',
    description:
      'The 8 Ball fleece graphic on a boxy heavyweight tee. Deadstock, tags attached.',
    excerpt: 'Boxy heavyweight 8 Ball graphic tee, deadstock.',
    price: 60,
    sizes: ['S', 'M', 'L'],
    imageSeeds: ['tee-a', 'tee-b'],
    tags: ['featured', 'trending'],
    featured: true,
    trending: true,
    publishedAt: '2026-06-12T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-005',
    handle: 'represent-owners-club-tee',
    title: "Owners' Club Tee — Washed Black",
    brand: 'Represent',
    category: 'Designer',
    condition: 'Like New',
    description:
      'Vintage-washed black tee with the Owners’ Club print. Garment-dyed for that broken-in feel from day one.',
    excerpt: 'Garment-dyed washed-black Owners’ Club tee.',
    price: 75,
    sizes: ['M', 'L', 'XL'],
    imageSeeds: ['rep-a', 'rep-b'],
    tags: ['featured'],
    featured: true,
    trending: false,
    publishedAt: '2026-06-03T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-006',
    handle: 'vintage-juventus-96-shirt',
    title: 'Juventus 1996 Home Shirt',
    brand: 'Kappa',
    category: 'Football Shirts',
    condition: 'Vintage',
    description:
      'Grail-tier Kappa Juventus home shirt from the 95/96 Champions League season. Sony sponsor, original tags long gone, condition honest and clean.',
    excerpt: 'Grail Kappa Juventus 95/96 home shirt, Sony sponsor.',
    price: 220,
    sizes: ['L'],
    imageSeeds: ['juve-a', 'juve-b'],
    tags: ['trending', 'grail'],
    featured: false,
    trending: true,
    publishedAt: '2026-06-01T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-007',
    handle: 'vintage-nike-windbreaker',
    title: 'Vintage Nike Shell Windbreaker',
    brand: 'Nike',
    category: 'Vintage',
    condition: 'Good',
    description:
      'Late-90s Nike colour-block shell. Quarter-zip, packable hood, embroidered swoosh. Honest vintage wear, no flaws.',
    excerpt: 'Late-90s colour-block packable Nike shell.',
    price: 85,
    sizes: ['L', 'XL'],
    imageSeeds: ['nike-a', 'nike-b'],
    tags: ['vintage'],
    featured: false,
    trending: false,
    publishedAt: '2026-05-28T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-008',
    handle: 'y2k-baggy-denim',
    title: 'Y2K Baggy Carpenter Denim',
    brand: 'Archive',
    category: 'Y2K',
    condition: 'Excellent',
    description:
      'Early-2000s baggy carpenter jean in washed indigo. Hammer loop, double knee, the proper Y2K volume.',
    excerpt: 'Washed indigo baggy carpenter jean, true Y2K volume.',
    price: 95,
    sizes: ['30', '32', '34', '36'],
    imageSeeds: ['denim-a', 'denim-b'],
    tags: ['y2k', 'trending'],
    featured: false,
    trending: true,
    publishedAt: '2026-06-07T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-009',
    handle: 'arcteryx-beta-jacket',
    title: 'Beta LT Gore-Tex Shell',
    brand: 'Arc’teryx',
    category: 'Designer',
    condition: 'Like New',
    description:
      'Black Beta LT in Gore-Tex. The gorpcore staple. Helmet-compatible hood, pit zips, immaculate.',
    excerpt: 'Black Gore-Tex Beta LT shell, gorpcore staple.',
    price: 290,
    compareAt: 380,
    sizes: ['M', 'L'],
    imageSeeds: ['arc-a', 'arc-b'],
    tags: ['featured', 'outerwear'],
    featured: true,
    trending: false,
    publishedAt: '2026-06-09T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-010',
    handle: 'vintage-carhartt-detroit',
    title: 'Carhartt Detroit Jacket — Faded',
    brand: 'Carhartt',
    category: 'Vintage',
    condition: 'Good',
    description:
      'Broken-in Detroit jacket with blanket lining and corduroy collar. The kind of fade you can’t fake.',
    excerpt: 'Broken-in blanket-lined Detroit jacket, real fade.',
    price: 130,
    sizes: ['M', 'L'],
    imageSeeds: ['carhartt-a', 'carhartt-b'],
    tags: ['vintage', 'workwear'],
    featured: false,
    trending: false,
    publishedAt: '2026-05-25T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-011',
    handle: 'denim-tears-cotton-tee',
    title: 'Cotton Wreath Tee — Black',
    brand: 'Denim Tears',
    category: 'Designer',
    condition: 'Brand New',
    description:
      'The cotton wreath motif on premium black jersey. Deadstock with tags.',
    excerpt: 'Cotton wreath motif on premium black jersey, deadstock.',
    price: 120,
    sizes: ['S', 'M', 'L'],
    imageSeeds: ['dt-a', 'dt-b'],
    tags: ['featured'],
    featured: true,
    trending: false,
    publishedAt: '2026-06-11T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-012',
    handle: 'vintage-ralph-cap',
    title: 'Vintage Polo Sport Cap',
    brand: 'Ralph Lauren',
    category: 'Accessories',
    condition: 'Good',
    description:
      '90s Polo Sport six-panel in navy. Adjustable strap, embroidered spellout. Clean.',
    excerpt: '90s Polo Sport six-panel cap in navy.',
    price: 45,
    sizes: ['One Size'],
    imageSeeds: ['cap-a'],
    tags: ['vintage', 'accessories'],
    featured: false,
    trending: false,
    publishedAt: '2026-05-30T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-013',
    handle: 'vintage-ac-milan-90',
    title: 'AC Milan 1990 Home Shirt',
    brand: 'Adidas',
    category: 'Football Shirts',
    condition: 'Vintage',
    description:
      'Adidas AC Milan home shirt, 89/90 era. Mediolanum sponsor. A piece of football history kept clean.',
    excerpt: 'Adidas AC Milan 89/90 home shirt, Mediolanum sponsor.',
    price: 180,
    sizes: ['M', 'L'],
    imageSeeds: ['milan-a', 'milan-b'],
    tags: ['grail'],
    featured: false,
    trending: false,
    publishedAt: '2026-05-22T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-014',
    handle: 'nox-archive-balaclava',
    title: 'Archive Knit Balaclava',
    brand: 'NOX Archive',
    category: 'Accessories',
    condition: 'Brand New',
    description:
      'Heavy ribbed-knit balaclava in jet black. Cold ops essential.',
    excerpt: 'Heavy ribbed-knit balaclava in jet black.',
    price: 38,
    sizes: ['One Size'],
    imageSeeds: ['bala-a'],
    tags: ['trending', 'accessories'],
    featured: false,
    trending: true,
    publishedAt: '2026-06-13T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-015',
    handle: 'y2k-leather-bomber',
    title: 'Y2K Cropped Leather Bomber',
    brand: 'Archive',
    category: 'Y2K',
    condition: 'Excellent',
    description:
      'Cropped black leather bomber with ribbed cuffs. That early-2000s sheen, supple and clean.',
    excerpt: 'Cropped black leather bomber with ribbed cuffs.',
    price: 165,
    sizes: ['S', 'M'],
    imageSeeds: ['bomber-a', 'bomber-b'],
    tags: ['y2k', 'featured'],
    featured: true,
    trending: false,
    publishedAt: '2026-06-04T09:00:00Z',
    available: true,
  }),
  p({
    id: 'nox-016',
    handle: 'supreme-box-logo-hood',
    title: 'Box Logo Hooded Sweatshirt',
    brand: 'Supreme',
    category: 'Streetwear',
    condition: 'Like New',
    description:
      'FW box logo hoodie in heather grey. The one everyone wants. Worn a handful of times, no flaws.',
    excerpt: 'FW box logo hoodie in heather grey, near-perfect.',
    price: 540,
    sizes: ['M', 'L'],
    imageSeeds: ['bogo-a', 'bogo-b'],
    tags: ['featured', 'trending', 'grail'],
    featured: true,
    trending: true,
    publishedAt: '2026-06-14T09:00:00Z',
    // Showcases the Sold Out state — a grail that's already gone.
    available: false,
  }),
];

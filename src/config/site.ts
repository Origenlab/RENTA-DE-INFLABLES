// site.ts — SSoT (Single Source of Truth) de INFLAFI / renta-de-inflables.com
// ============================================================================
// FUENTE ÚNICA DE VERDAD. Todo dato que aparezca en más de una página vive aquí.
// Contrato canónico: interoperable con src/lib/seo.ts, layouts y componentes.
// ============================================================================

export const SITE = {
  name: 'INFLAFI',
  brand: 'INFLAFI',
  tagline: 'Castillos saltarines, toboganes e inflables para tu fiesta en CDMX',
  domain: 'renta-de-inflables.com',
  url: 'https://renta-de-inflables.com',
  lang: 'es-MX',
  locale: 'es-MX',
  description:
    'Renta de inflables en CDMX — castillos saltarines, toboganes y juegos inflables para fiestas infantiles, bodas y eventos corporativos. Entrega, montaje y desmontaje incluidos.',
  defaultImage: '/images/og/default.jpg',

  trailingSlash: 'never' as 'never' | 'always',
  searchUrl: undefined as string | undefined,
  allowSelfReviews: false,

  seo: {
    title: 'Renta de inflables CDMX | castillos saltarines | toboganes',
    description:
      'Renta de inflables en CDMX — castillos saltarines, toboganes y juegos inflables para fiestas infantiles, bodas y eventos. Entrega y montaje incluidos.',
    image: '/images/og/default.jpg',
    titleMaxLength: 60,
    descriptionMaxLength: 160,
    appendBrand: false,
  },

  social: {
    twitter: undefined as string | undefined,
    facebook: 'https://www.facebook.com/inflafi' as string | undefined,
    instagram: 'https://www.instagram.com/inflafi' as string | undefined,
    linkedin: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },

  organization: {
    name: 'INFLAFI',
    legalName: 'INFLAFI Renta de Inflables',
    logo: '/images/brand/logo.webp',
    foundingDate: '2020',
    sameAs: [] as string[],
  },

  business: {
    type: ['LocalBusiness', 'EventVenue'] as string | string[],
    priceRange: '$$',
    address: {
      street: 'Juán Vázquez de Mella 481, Piso 2, Col. Los Morales Polanco',
      locality: 'Ciudad de México',
      region: 'CDMX',
      postalCode: '11510',
      country: 'MX',
    },
    geo: {
      lat: 19.4362 as string | number,
      lng: -99.2009 as string | number,
    },
    openingHours: {
      weekdays: { opens: '09:00', closes: '19:00' },
      saturday: { opens: '09:00', closes: '17:00' },
    },
    areaServed: [
      'Ciudad de México',
      'Miguel Hidalgo',
      'Polanco',
      'Lomas de Chapultepec',
      'Santa Fe',
      'Naucalpan',
    ] as string[],
  },
} as const;

// ── KEYWORDS — tripleta canónica para la home ─────────────────────────────────
export const KEYWORDS = [
  'renta de inflables CDMX',    // kw1 · principal
  'castillos saltarines',        // kw2 · secundaria
  'inflables para fiestas',      // kw3 · variante / long-tail
] as const;

// ── CONTACT — NAP ─────────────────────────────────────────────────────────────
export const CONTACT = {
  phone: '55 4886 1621',
  phoneE164: '+525548861621',
  phoneRaw: '+525548861621',
  whatsapp: '5215539048634',
  email: 'contacto@renta-de-inflables.com',
  street: 'Juán Vázquez de Mella 481, Piso 2',
  city: 'Ciudad de México',
  state: 'CDMX',
  postalCode: '11510',
  country: 'MX',
  geo: {
    lat: 19.4362,
    lng: -99.2009,
  },
  hours: {
    weekdays: 'Lun–Vie 9:00–19:00',
    saturday: 'Sáb 9:00–17:00',
    sunday: 'Dom Cerrado',
    display: 'Lun–Sáb 9:00–19:00',
  },
  schedule: {
    display: 'Lun–Sáb 9:00–19:00',
    weekdays: 'Lun–Vie  9:00–19:00',
    saturday: 'Sábado  9:00–17:00',
    sunday: 'Domingo  Cerrado',
  },
} as const;

// ── TAXONOMY — categorías de inflables y servicios ────────────────────────────
export const TAXONOMY = {
  categories: [
    { slug: 'chicos',   label: 'Inflables Chicos',        badge: undefined, href: '/renta-de-inflables-chicos' },
    { slug: 'medianos', label: 'Inflables Medianos',       badge: undefined, href: '/renta-de-inflables-medianos' },
    { slug: 'grandes',  label: 'Inflables Grandes',        badge: undefined, href: '/renta-de-inflables-grandes' },
    { slug: 'ninas',    label: 'Inflables para Niñas',     badge: 'Princesas', href: '/renta-de-inflables-para-nina' },
    { slug: 'ninos',    label: 'Inflables para Niños',     badge: 'Héroes', href: '/renta-de-inflables-para-ninos' },
    { slug: 'bodas',    label: 'Inflables para Bodas',     badge: undefined, href: '/renta-de-inflables-para-boda' },
  ],
  services: [
    { id: 'pantalla-inflable',    label: 'Pantalla Inflable',     desc: 'Proyección en pantalla inflable gigante para eventos al aire libre.' },
    { id: 'mobiliario-infantil',  label: 'Mobiliario Infantil',   desc: 'Mesas, sillas y accesorios infantiles para tu fiesta.' },
    { id: 'decoracion-fiestas',   label: 'Decoración para Fiestas', desc: 'Ambientación completa y decoración temática para tu evento.' },
    { id: 'pintacaritas',         label: 'Pintacaritas',          desc: 'Artistas profesionales de maquillaje artístico para niños.' },
    { id: 'maquina-palomitas',    label: 'Máquina de Palomitas',  desc: 'Palomitas recién hechas en tu evento, instalación incluida.' },
    { id: 'mesa-dulces',          label: 'Mesa de Dulces',        desc: 'Mesas dulces personalizadas con temática para tu fiesta.' },
  ],
  sectors: [] as readonly { slug: string; label: string }[],
  coverageStates: [
    { slug: 'cdmx', label: 'CDMX', type: 'operativo' as 'operativo' | 'comercial' },
    { slug: 'naucalpan', label: 'Naucalpan', type: 'comercial' as 'operativo' | 'comercial' },
    { slug: 'tlalnepantla', label: 'Tlalnepantla', type: 'comercial' as 'operativo' | 'comercial' },
  ],
} as const;

export const PRODUCT_CATEGORIES = TAXONOMY.categories;
export const SERVICES = TAXONOMY.services;
export const SECTORS = TAXONOMY.sectors;
export const COVERAGE_STATES = TAXONOMY.coverageStates;

export type ProductCategory = (typeof TAXONOMY.categories)[number];
export type Service = (typeof TAXONOMY.services)[number];
export type Sector = (typeof TAXONOMY.sectors)[number];
export type CoverageState = (typeof TAXONOMY.coverageStates)[number];

// ── NAV — menú principal del Header ──────────────────────────────────────────
export type NavLink = { label: string; href: string; desc?: string };
export type NavItem = {
  label: string;
  href: string;
  panel?: 'mega' | 'dropdown';
  allLabel?: string;
  items?: readonly NavLink[];
};

export const NAV: readonly NavItem[] = [
  {
    label: 'Inflables',
    href: '/inflables',
    panel: 'dropdown',
    allLabel: 'Ver todos los inflables',
    items: PRODUCT_CATEGORIES.map((c) => ({ label: c.label, href: c.href })),
  },
  {
    label: 'Servicios',
    href: '/servicios',
    panel: 'dropdown',
    allLabel: 'Ver todos los servicios',
    items: [
      ...SERVICES.map((s) => ({ label: s.label, href: `/${s.id}`, desc: s.desc })),
    ],
  },
  { label: 'Paquetes', href: '/paquetes-para-fiestas-infantiles' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

// ── BRANCHES — sucursales ─────────────────────────────────────────────────────
export const BRANCHES: { label: string; address: string; mapsUrl?: string }[] = [];

// ── SOCIAL — redes sociales ───────────────────────────────────────────────────
export type SocialNetwork = 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'x' | 'tiktok';
export const SOCIAL: { network: SocialNetwork; label: string; url: string }[] = [
  { network: 'facebook',  label: 'Facebook',  url: 'https://www.facebook.com/inflafi' },
  { network: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/inflafi' },
];

// ── LEGAL — enlaces legales del Footer ────────────────────────────────────────
export const LEGAL: { label: string; href: string }[] = [
  { label: 'Aviso de privacidad', href: '/privacidad' },
  { label: 'Mapa del sitio', href: '/sitemap-index.xml' },
];

// ── WA_MESSAGES — mensajes pre-armados por intención ─────────────────────────
export const WA_MESSAGES = {
  default: 'Hola, quiero información sobre renta de inflables para mi evento.',
  cotizar: 'Hola, quiero cotizar un inflable para mi evento en CDMX.',
  cotizacion: 'Hola, quiero cotizar un inflable para mi evento en CDMX.',
  reservar: 'Hola, me gustaría reservar un inflable para mi fiesta. ¿Qué disponibilidad tienen?',
  paquetes: 'Hola, me interesa conocer los paquetes para fiestas infantiles que ofrecen.',
  boda: 'Hola, me interesa rentar un inflable para mi boda.',
  urgente: 'Hola, necesito un inflable para un evento muy próximo. ¿Pueden ayudarme?',
} as const;

// ── waUrl() — constructor canónico de enlaces de WhatsApp ─────────────────────
// REGLA DURA: nunca hardcodear wa.me/<número>. Siempre waUrl(WA_MESSAGES.<clave>).
export function waUrl(message: string = WA_MESSAGES.default): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

// ── telUrl() — constructor canónico del enlace de llamada ─────────────────────
export function telUrl(): string {
  return `tel:${CONTACT.phoneE164}`;
}

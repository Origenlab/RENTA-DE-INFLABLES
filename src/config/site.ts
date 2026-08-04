// site.ts — SSoT (Single Source of Truth) de DENFLAB / renta-de-inflables.com
// ============================================================================
// FUENTE ÚNICA DE VERDAD. Todo dato que aparezca en más de una página vive aquí.
// Contrato canónico: interoperable con src/lib/seo.ts, layouts y componentes.
// ============================================================================

export const SITE = {
  name: 'DENFLAB',
  brand: 'DENFLAB',
  tagline: 'DENFLAB · Más de 30 años rentando inflables para fiestas en CDMX',
  domain: 'renta-de-inflables.com',
  url: 'https://renta-de-inflables.com',
  lang: 'es-MX',
  locale: 'es-MX',
  description:
    'DENFLAB — más de 30 años de experiencia en renta de inflables en CDMX. Castillos saltarines, toboganes y juegos inflables para fiestas infantiles, bodas y eventos corporativos. Entrega, montaje y desmontaje incluidos.',
  defaultImage: '/images/og/default.jpg',

  trailingSlash: 'never' as 'never' | 'always',
  searchUrl: undefined as string | undefined,
  allowSelfReviews: false,

  seo: {
    title: 'Renta de inflables CDMX | +30 años | DENFLAB',
    description:
      'DENFLAB: más de 30 años rentando inflables en CDMX. Castillos saltarines, toboganes y juegos inflables para fiestas, bodas y eventos. Entrega y montaje incluidos.',
    image: '/images/og/default.jpg',
    titleMaxLength: 60,
    descriptionMaxLength: 160,
    appendBrand: false,
  },

  social: {
    twitter: undefined as string | undefined,
    facebook: undefined as string | undefined,
    instagram: undefined as string | undefined,
    linkedin: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },

  organization: {
    name: 'DENFLAB',
    legalName: 'DENFLAB Renta de Inflables',
    slogan: 'Más de 30 años de experiencia en renta de inflables',
    logo: '/images/brand/isotipo-denflab.png',
    foundingDate: '1995',
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

// ── EXPERIENCE — trayectoria de marca (SSoT del claim de antigüedad) ─────────
// REGLA DURA: nunca hardcodear "30 años" en una página. Siempre EXPERIENCE.*
export const EXPERIENCE = {
  since: 1995,
  years: 30,
  short: '+30 años',
  label: 'Más de 30 años de experiencia',
  claim: 'Más de 30 años de experiencia en la renta de inflables',
  sentence:
    'DENFLAB lleva más de 30 años rentando inflables para fiestas en la Ciudad de México — desde 1995.',
  badge: 'Desde 1995 · +30 años de experiencia',
} as const;

// ── CONTACT — NAP ─────────────────────────────────────────────────────────────
export const CONTACT = {
  phone: '55 3904 8634',
  phoneE164: '+525539048634',
  phoneRaw: '+525539048634',
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

// ── INFLABLES — medidas oficiales y espacio mínimo (SSoT) ─────────────────────
// FUENTE ÚNICA DE VERDAD de las medidas del equipo. Entregadas por el dueño del
// negocio (2026-08). Mandan sobre cualquier cifra que aparezca en páginas o
// artículos: si una medida cambia, se cambia AQUÍ y se propaga.
//
// FÓRMULA ÚNICA del espacio mínimo de instalación:
//   ancho libre  = ancho del inflable + 1 m por cada lado  → +2 m
//   largo libre  = largo del inflable + 1 m por cada lado  → +2 m
//   altura libre = alto del inflable + 1 m
// El metro libre por lado cubre el soplador, el anclaje y la circulación de los
// supervisores. No es negociable: por debajo de esa medida no se instala.
//
// ⚠️ Castillo Blanco: el dueño lo entregó como "5 × 7 × 4", es decir con el ANCHO
// mayor que el LARGO. Se aplica literal — pendiente de confirmación del dueño.
export type InflableSpec = {
  slug: string;
  name: string;
  category: 'chicos' | 'medianos' | 'grandes' | 'ninas' | 'bodas';
  /** Largo del inflable en metros */
  largo: number;
  /** Ancho del inflable en metros */
  ancho: number;
  /** Alto del inflable en metros */
  alto: number;
  /** Etiqueta canónica largo×ancho×alto */
  dims: string;
  /** Espacio mínimo de piso (largo+2 × ancho+2) */
  espacioMinimo: string;
  /** Altura libre requerida (alto+1) */
  alturaLibre: string;
};

export const INFLABLES_SPECS: readonly InflableSpec[] = [
  { slug: 'micro-baby',      name: 'Micro Baby',      category: 'chicos',   largo: 2,   ancho: 2,   alto: 3,   dims: '2×2×3 m',       espacioMinimo: '4×4 m',   alturaLibre: '4 m'   },
  { slug: 'dragones-rojos',  name: 'Dragones Rojos',  category: 'medianos', largo: 5,   ancho: 2.5, alto: 2.8, dims: '5×2.5×2.8 m',   espacioMinimo: '7×4.5 m', alturaLibre: '3.8 m' },
  { slug: 'mini-jungla',     name: 'Mini Jungla',     category: 'medianos', largo: 5,   ancho: 2.5, alto: 2.5, dims: '5×2.5×2.5 m',   espacioMinimo: '7×4.5 m', alturaLibre: '3.5 m' },
  { slug: 'gusanitos',       name: 'Gusanitos',       category: 'medianos', largo: 5,   ancho: 4.5, alto: 2.8, dims: '5×4.5×2.8 m',   espacioMinimo: '7×6.5 m', alturaLibre: '3.8 m' },
  { slug: 'princesas',       name: 'Princesas',       category: 'ninas',    largo: 5,   ancho: 4,   alto: 3,   dims: '5×4×3 m',       espacioMinimo: '7×6 m',   alturaLibre: '4 m'   },
  { slug: 'barco-pirata',    name: 'Barco Pirata',    category: 'grandes',  largo: 6,   ancho: 3.8, alto: 3.8, dims: '6×3.8×3.8 m',   espacioMinimo: '8×5.8 m', alturaLibre: '4.8 m' },
  { slug: 'extrem',          name: 'Extrem',          category: 'grandes',  largo: 7,   ancho: 4.5, alto: 3.5, dims: '7×4.5×3.5 m',   espacioMinimo: '9×6.5 m', alturaLibre: '4.5 m' },
  { slug: 'castillo-blanco', name: 'Castillo Blanco', category: 'bodas',    largo: 5,   ancho: 7,   alto: 4,   dims: '5×7×4 m',       espacioMinimo: '7×9 m',   alturaLibre: '5 m'   },
] as const;

/** Margen libre por lado, en metros. Base de la fórmula del espacio mínimo. */
export const MARGEN_LIBRE_M = 1;

/** Devuelve la ficha canónica de un modelo por slug. */
export function inflableSpec(slug: string): InflableSpec | undefined {
  return INFLABLES_SPECS.find((i) => i.slug === slug);
}

/** Recalcula el espacio mínimo desde las medidas (largo+2 × ancho+2). */
export function espacioMinimo(spec: InflableSpec): string {
  const l = spec.largo + MARGEN_LIBRE_M * 2;
  const a = spec.ancho + MARGEN_LIBRE_M * 2;
  return `${l}×${a} m`;
}

/** Recalcula la altura libre desde el alto (alto+1). */
export function alturaLibre(spec: InflableSpec): string {
  return `${spec.alto + MARGEN_LIBRE_M} m`;
}

// ── TAXONOMY — categorías de inflables y servicios ────────────────────────────
export const TAXONOMY = {
  categories: [
    { slug: 'chicos',   label: 'Inflables Chicos',        badge: undefined, href: '/renta-de-inflables-chicos' },
    { slug: 'medianos', label: 'Inflables Medianos',       badge: undefined, href: '/renta-de-inflables-medianos' },
    { slug: 'grandes',  label: 'Inflables Grandes',        badge: undefined, href: '/renta-de-inflables-grandes' },
    { slug: 'ninas',    label: 'Inflables para Niñas',     badge: 'Princesas', href: '/renta-de-inflables-para-nina' },
    { slug: 'ninos',    label: 'Inflables para Niños',     badge: 'Aventura', href: '/renta-de-inflables-para-ninos' },
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
      ...SERVICES.map((s) => ({ label: s.label, href: `/servicios#${s.id}`, desc: s.desc })),
    ],
  },
  { label: 'Paquetes', href: '/paquetes-para-fiestas-infantiles' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

// ── BRANCHES — sucursales ─────────────────────────────────────────────────────
export const BRANCHES: { label: string; address: string; mapsUrl?: string }[] = [];

// ── SOCIAL — redes sociales ───────────────────────────────────────────────────
export type SocialNetwork = 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'x' | 'tiktok';
export const SOCIAL: { network: SocialNetwork; label: string; url: string }[] = [
  // Pendiente: perfiles oficiales DENFLAB. No publicar URLs hasta que existan.
];

// ── LEGAL — enlaces legales del Footer ────────────────────────────────────────
export const LEGAL: { label: string; href: string }[] = [
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
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

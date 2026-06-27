/* ============================================================================
 * src/lib/seo.ts — Librería SEO canónica para INFLAFI / renta-de-inflables.com
 * Copiada y adaptada desde EJEMPLOS (sistema Master). Sin modificaciones al contrato.
 * ========================================================================== */

import { SITE, CONTACT, SOCIAL } from '@config/site';

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const BUSINESS_ID = `${SITE.url}/#localbusiness`;
const LOGO_ID = `${SITE.url}/#logo`;

const ORG_SAMEAS: string[] = [
  ...new Set([
    ...((SITE.organization?.sameAs ?? []) as string[]),
    ...SOCIAL.map((s) => s.url),
  ]),
].filter((u) => typeof u === 'string' && /^https?:\/\//.test(u));

function authorNode(name?: string) {
  const brand = String(SITE.organization?.name ?? SITE.name).trim().toLowerCase();
  const n = (name ?? '').trim();
  return n && n.toLowerCase() !== brand ? { '@type': 'Person', name: n } : { '@id': ORG_ID };
}

export function absUrl(path: string): string {
  const base = SITE.url.endsWith('/') ? SITE.url.slice(0, -1) : SITE.url;
  let clean = /^https?:\/\//.test(path) ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
  if (clean === base || clean === `${base}/`) return `${base}/`;
  if (/\.\w{2,5}$/.test(clean)) return clean;
  const wantsSlash = String(SITE.trailingSlash ?? 'never') === 'always';
  const hasSlash = clean.endsWith('/');
  if (wantsSlash && !hasSlash) clean = `${clean}/`;
  if (!wantsSlash && hasSlash) clean = clean.slice(0, -1);
  return clean;
}

function absImage(src?: string): string | undefined {
  if (!src) return undefined;
  return /^https?:\/\//.test(src) ? src : `${SITE.url}${src.startsWith('/') ? src : `/${src}`}`;
}

const TITLE_MAX = SITE.seo?.titleMaxLength ?? 60;
const TITLE_SUFFIX = ` | ${SITE.name}`;

function capTitleCore(text: string, max: number): string {
  const cleaned = text.replace(/[\s|·•\-–—,;:]+$/g, '').trim();
  if (cleaned.length <= max) return cleaned;
  let cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > max * 0.5) cut = cut.slice(0, lastSpace);
  return cut.replace(/[\s|·•\-–—,;:]+$/g, '').trim();
}

export function formatTitle(title?: string): string {
  if (!title) return SITE.seo?.title ?? SITE.name;
  const trimmed = title.trim();
  const appendBrand = (SITE.seo as { appendBrand?: boolean })?.appendBrand === true;
  if (!appendBrand) {
    return trimmed.length <= TITLE_MAX ? trimmed : capTitleCore(trimmed, TITLE_MAX);
  }
  const brandRe = new RegExp(SITE.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  if (brandRe.test(trimmed)) {
    if (trimmed.length <= TITLE_MAX) return trimmed;
    return `${capTitleCore(trimmed, TITLE_MAX - TITLE_SUFFIX.length)}${TITLE_SUFFIX}`;
  }
  const core = trimmed.replace(/[\s|·•\-–—]+$/g, '').trim();
  const full = `${core}${TITLE_SUFFIX}`;
  if (full.length <= TITLE_MAX) return full;
  return `${capTitleCore(core, TITLE_MAX - TITLE_SUFFIX.length)}${TITLE_SUFFIX}`;
}

const META_MAX = SITE.seo?.descriptionMaxLength ?? 160;
const WEAK_ENDINGS = new Set([
  'a', 'al', 'con', 'como', 'de', 'del', 'el', 'en', 'la', 'las', 'los',
  'para', 'por', 'sin', 'un', 'una', 'y', 'o', 'que',
]);

export function truncateMetaDescription(description: string, max = META_MAX): string {
  const normalized = description.replace(/\.{3,}/g, ' ').replace(/\s+/g, ' ').replace(/[""\"]/g, "'").trim();
  const trimEnding = (t: string) => t.trim().replace(/[,:;.\-–—\s]+$/g, '').trim();
  const trimWeak = (t: string) => {
    const words = trimEnding(t).split(' ').filter(Boolean);
    while (words.length > 3) {
      const last = words[words.length - 1]?.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      if (!last || !WEAK_ENDINGS.has(last)) break;
      words.pop();
    }
    return words.join(' ');
  };
  const finalize = (t: string) => {
    let r = trimWeak(t) || trimEnding(t);
    if (r && !/[.!?]$/.test(r) && `${r}.`.length <= max) r = `${r}.`;
    return r;
  };
  if (normalized.length <= max) return finalize(normalized);
  const sentences = normalized.split(/(?<=[.!?])\s+/);
  let acc = '';
  for (const s of sentences) {
    const cand = acc ? `${acc} ${s}` : s;
    if (cand.length > max) break;
    acc = cand;
  }
  if (acc && acc.length >= Math.floor(max * 0.65)) return finalize(acc.trim());
  let words = '';
  for (const w of normalized.split(' ')) {
    const cand = words ? `${words} ${w}` : w;
    if (cand.length > max) break;
    words = cand;
  }
  return finalize(words || normalized.slice(0, max));
}

export function buildKeywordTitle(keywords: readonly string[]): string {
  const mods = keywords.map((k) => k.trim()).filter(Boolean);
  if (!mods.length) return SITE.seo?.title ?? SITE.name;
  let title = mods[0]!;
  for (let i = 1; i < mods.length; i++) {
    const next = `${title} | ${mods[i]}`;
    if (next.length > TITLE_MAX) break;
    title = next;
  }
  const cased = title.charAt(0).toUpperCase() + title.slice(1);
  return formatTitle(cased);
}

export function buildKeywordDescription(keywords: readonly string[], copy: string): string {
  void keywords;
  const text = (copy ?? '').trim();
  return truncateMetaDescription(text);
}

export type MetaInput = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export type MetaOutput = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  robots: string;
  locale: string;
  siteName: string;
  twitterCard: 'summary_large_image';
  twitterSite?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMeta(input: MetaInput): MetaOutput {
  return {
    title: formatTitle(input.title),
    description: truncateMetaDescription(input.description ?? SITE.seo?.description ?? ''),
    canonical: absUrl(input.canonical ?? '/'),
    image: absImage(input.image) ?? absImage(SITE.seo?.image) ?? `${SITE.url}/og.jpg`,
    type: input.type ?? 'website',
    robots: input.noindex
      ? 'noindex,nofollow'
      : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    locale: SITE.locale?.replace('-', '_') ?? 'es_MX',
    siteName: SITE.name,
    twitterCard: 'summary_large_image',
    twitterSite: SITE.social?.twitter,
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
  };
}

export function orgSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.organization?.name ?? SITE.name,
    ...(SITE.organization?.legalName ? { legalName: SITE.organization.legalName } : {}),
    url: SITE.url,
    logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: absImage(SITE.organization?.logo) ?? `${SITE.url}/logo.png` },
    image: { '@id': LOGO_ID },
    description: SITE.seo?.description ?? SITE.description ?? '',
    ...(SITE.organization?.foundingDate ? { foundingDate: SITE.organization.foundingDate } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneRaw ?? CONTACT.phone,
      email: CONTACT.email,
      contactType: 'customer service',
      areaServed: 'MX',
      availableLanguage: ['es-MX', 'Spanish'],
    },
    ...(ORG_SAMEAS.length ? { sameAs: ORG_SAMEAS } : {}),
  };
}

export const organizationSchema = orgSchema;

export function websiteSchema() {
  const search = SITE.searchUrl;
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.seo?.description ?? SITE.description ?? '',
    inLanguage: SITE.locale ?? 'es-MX',
    publisher: { '@id': ORG_ID },
    ...(search ? { potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: search }, 'query-input': 'required name=query' } } : {}),
  };
}

export function localBusinessSchema(overrides?: { areaServed?: string[] }) {
  const b = SITE.business ?? {};
  const a = (b as any).address ?? {};
  return {
    '@type': (b as any).type ?? 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.organization?.name ?? SITE.name,
    description: SITE.seo?.description ?? SITE.description ?? '',
    url: SITE.url,
    image: absImage(SITE.seo?.image),
    logo: { '@id': LOGO_ID },
    parentOrganization: { '@id': ORG_ID },
    telephone: CONTACT.phoneRaw ?? CONTACT.phone,
    email: CONTACT.email,
    priceRange: (b as any).priceRange ?? '$$',
    currenciesAccepted: 'MXN',
    ...(a.street || a.locality ? {
      address: {
        '@type': 'PostalAddress',
        ...(a.street ? { streetAddress: a.street } : {}),
        addressLocality: a.locality ?? 'Ciudad de México',
        addressRegion: a.region ?? 'CDMX',
        ...(a.postalCode ? { postalCode: a.postalCode } : {}),
        addressCountry: a.country ?? 'MX',
      },
    } : {}),
    ...((b as any).geo ? { geo: { '@type': 'GeoCoordinates', latitude: (b as any).geo.lat, longitude: (b as any).geo.lng } } : {}),
    ...((b as any).openingHours ? {
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: (b as any).openingHours.weekdays?.opens ?? '09:00', closes: (b as any).openingHours.weekdays?.closes ?? '19:00' },
        ...((b as any).openingHours.saturday ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: (b as any).openingHours.saturday.opens, closes: (b as any).openingHours.saturday.closes }] : []),
      ],
    } : {}),
    areaServed: (overrides?.areaServed ?? (b as any).areaServed ?? ['Ciudad de México']).map((name: string) => ({ '@type': 'City', name })),
    ...(ORG_SAMEAS.length ? { sameAs: ORG_SAMEAS } : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export type Review = { author: string; text: string; rating: number; date: string };

function emitReviews(reviews?: Review[]): Record<string, unknown> {
  if (!reviews?.length || !SITE.allowSelfReviews) return {};
  const valid = reviews.filter((r) => r.author && r.text && r.rating >= 1 && r.rating <= 5 && r.date);
  if (!valid.length) return {};
  const avg = valid.reduce((s, r) => s + r.rating, 0) / valid.length;
  return {
    aggregateRating: { '@type': 'AggregateRating', ratingValue: Number(avg.toFixed(1)), reviewCount: valid.length, bestRating: 5, worstRating: 1 },
    review: valid.map((r) => ({ '@type': 'Review', author: { '@type': 'Person', name: r.author }, reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 }, reviewBody: r.text, datePublished: r.date })),
  };
}

export type ServiceData = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  image?: string;
  areaServed?: string[];
  reviews?: Review[];
};

export function serviceSchema(s: ServiceData) {
  const url = absUrl(s.path);
  return {
    '@type': 'Service',
    name: s.name,
    description: s.description,
    serviceType: s.serviceType ?? s.name,
    url,
    ...(s.image ? { image: absImage(s.image) } : {}),
    provider: { '@id': BUSINESS_ID },
    areaServed: (s.areaServed ?? (SITE.business as any)?.areaServed ?? ['Ciudad de México']).map((name: string) => ({ '@type': 'City', name })),
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, servicePhone: CONTACT.phoneRaw ?? CONTACT.phone },
    ...emitReviews(s.reviews),
  };
}

export type ListItem = { name: string; path: string; image?: string; description?: string };

export type SchemaData = {
  breadcrumbs?: Crumb[];
  service?: ServiceData;
  faqs?: FaqItem[];
  list?: { name: string; description: string; path: string; items: ListItem[]; areaServed?: string };
  areaServed?: string[];
};

export type PageType = 'home' | 'page' | 'category' | 'product' | 'service' | 'article' | 'directory' | 'faq' | 'techArticle';

const CTX = 'https://schema.org';

export function buildSchema(pageType: PageType, data: SchemaData = {}): object[] {
  const out: object[] = [];
  const baseGraph: object[] = [orgSchema(), websiteSchema()];
  if (SITE.business) baseGraph.push(localBusinessSchema({ areaServed: data.areaServed }));
  out.push({ '@context': CTX, '@graph': baseGraph });
  if (data.breadcrumbs?.length) out.push({ '@context': CTX, ...breadcrumbSchema(data.breadcrumbs) });
  switch (pageType) {
    case 'service':
      if (data.service) out.push({ '@context': CTX, ...serviceSchema(data.service) });
      break;
    default:
      break;
  }
  if (data.faqs?.length) out.push({ '@context': CTX, ...faqSchema(data.faqs) });
  return out;
}

export const META_TITLE_MAX = 60;
export const META_DESC_MAX = 155;
export function metaAuditBasic(input: { title?: string; description?: string }): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const t = (input.title ?? '').trim();
  const d = (input.description ?? '').trim();
  if (!t) errors.push('Falta <title> (vacío).');
  else if (t.length > META_TITLE_MAX) errors.push(`Title de ${t.length} chars: pasa de ${META_TITLE_MAX}.`);
  if (!d) errors.push('Falta meta description (vacía).');
  else if (d.length > META_DESC_MAX) errors.push(`Description de ${d.length} chars: pasa de ${META_DESC_MAX}.`);
  return { ok: errors.length === 0, errors };
}

// content.config.ts — Content Collections para INFLAFI / renta-de-inflables.com
// Canónico: raíz del proyecto (no src/content/config.ts).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imagePath = z.string().regex(/^\/images\//, {
  message: 'La imagen debe ser una ruta absoluta bajo /images/',
});

const faqSchema = z
  .array(z.object({ question: z.string(), answer: z.string() }))
  .optional();

// ── Colección: inflables ──────────────────────────────────────────────────────
const inflables = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/inflables' }),
  schema: z
    .object({
      title: z.string().min(10).max(110),
      description: z.string().min(70).max(280),
      category: z.enum([
        'chicos', 'medianos', 'grandes', 'ninas', 'ninos', 'bodas',
      ]),
      image: imagePath,
      gallery: z.array(imagePath).optional(),
      price: z.string().optional(),
      features: z.array(z.string()).optional(),
      faqs: faqSchema,
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      noindex: z.boolean().default(false),
    })
    .strict(),
});

// ── Colección: servicios ──────────────────────────────────────────────────────
const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z
    .object({
      title: z.string().min(10).max(110),
      description: z.string().min(70).max(280),
      category: z.enum([
        'pantalla', 'mobiliario', 'decoracion', 'pintacaritas', 'palomitas', 'dulces', 'paquete',
      ]),
      image: imagePath,
      includes: z.array(z.string()).optional(),
      price: z.string().optional(),
      faqs: faqSchema,
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      noindex: z.boolean().default(false),
    })
    .strict(),
});

// ── Colección: zonas ─────────────────────────────────────────────────────────
const zonas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/zonas' }),
  schema: z
    .object({
      title: z.string().min(10).max(70),
      description: z.string().min(70).max(160),
      zoneName: z.string(),
      state: z.string().default('CDMX'),
      image: imagePath,
      draft: z.boolean().default(false),
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      noindex: z.boolean().default(false),
    })
    .strict(),
});

// ── Colección: blog ──────────────────────────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './articulos' }),
  schema: z
    .object({
      title: z.string().min(10).max(160),
      description: z.string().min(50).max(300),
      model: z.string(),
      category: z.enum([
        'chicos', 'medianos', 'grandes', 'ninas', 'ninos', 'bodas',
      ]),
      pubDate: z.coerce.date(),
      draft: z.boolean().default(false),
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      noindex: z.boolean().default(false),
    })
    .strict(),
});

// ── Colección: categorias ────────────────────────────────────────────────────
// Páginas de categoría L3 (una landing completa por entrada). El slug del
// archivo = ruta pública (p. ej. renta-de-inflables-chicos.md → /renta-de-inflables-chicos).
// F7.1: contenido extraído 1:1 de las páginas hardcodeadas — los límites de
// title/description siguen el patrón canónico de este repo (110/280) porque los
// metas existentes superan 70/160 y está prohibido modificarlos.
const headingSchema = z
  .object({
    eyebrow: z.string(),
    title: z.string(),
    titleAccent: z.string(),
    desc: z.string().optional(),
    body: z.array(z.string()).min(1),
  })
  .strict();

const categorias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categorias' }),
  schema: z
    .object({
      title: z.string().min(10).max(110),
      description: z.string().min(70).max(280),
      image: imagePath,
      breadcrumbLabel: z.string(),
      waMessage: z.string(),
      hero: z
        .object({
          badge: z.string(),
          title: z.string(),
          accent: z.string(),
          subtitle: z.string(),
          descRight: z.array(z.string()).min(1),
          ctaText: z.string(),
          ariaLabel: z.string(),
        })
        .strict(),
      menuItems: z
        .array(
          z
            .object({
              label: z.string(),
              sub: z.string(),
              href: z.string(),
              icon: z.string(),
            })
            .strict(),
        )
        .length(4),
      menuCta: z.object({ label: z.string(), sub: z.string() }).strict(),
      introHeadingId: z.string(),
      intro: headingSchema,
      detail: z
        .object({
          id: z.string(),
          eyebrow: z.string(),
          category: z.string(),
          title: z.string(),
          body: z.array(z.string()).min(1),
          points: z.array(z.string()).min(1),
          ctaLabel: z.string(),
          gallery: z
            .object({
              main: z.object({ src: imagePath, alt: z.string() }).strict(),
              thumbs: z
                .array(z.object({ src: imagePath, alt: z.string() }).strict())
                .length(3),
            })
            .strict(),
        })
        .strict(),
      specsHeading: headingSchema,
      featureSpecs: z
        .array(
          z
            .object({
              gradient: z.string(),
              svgContent: z.string(),
              label: z.string(),
              value: z.string(),
              detail: z.string(),
              tag: z.string(),
            })
            .strict(),
        )
        .length(3),
      panel: z
        .object({
          src: imagePath,
          alt: z.string(),
          badge: z.string(),
          dims: z.string(),
          cat: z.string(),
          note: z.string(),
          colTitle: z.string(),
          ctaLabel: z.string(),
          ctaNote: z.string(),
        })
        .strict(),
      secondarySpecs: z
        .array(
          z
            .object({
              svgContent: z.string(),
              label: z.string(),
              value: z.string(),
              note: z.string(),
            })
            .strict(),
        )
        .length(6),
      cuandoHeading: headingSchema,
      scenarios: z
        .array(
          z
            .object({
              icon: z.string(),
              title: z.string(),
              desc: z.string(),
              tag: z.string(),
            })
            .strict(),
        )
        .length(6),
      cuandoCtaText: z.string(),
      otrasHeading: headingSchema,
      otrasCats: z
        .array(
          z
            .object({
              label: z.string(),
              href: z.string(),
              image: imagePath,
              imageAlt: z.string(),
              badge: z.string().optional(),
              blurb: z.string(),
              ctaLabel: z.string(),
            })
            .strict(),
        )
        .length(5),
      faqHeading: headingSchema,
      faqs: z
        .array(z.object({ question: z.string(), answer: z.string() }).strict())
        .length(6),
      banner: z
        .object({ heading: z.string(), desc: z.string(), badge: z.string() })
        .strict(),
      draft: z.boolean().default(false),
    })
    .strict(),
});

export const collections = { inflables, servicios, zonas, blog, categorias };

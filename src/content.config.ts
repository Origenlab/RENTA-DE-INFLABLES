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

export const collections = { inflables, servicios, zonas };

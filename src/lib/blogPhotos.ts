// src/lib/blogPhotos.ts — Asignación determinista de fotos reales a los artículos del blog.
//
// Fuente única: src/data/fototeca.json (fototeca real DENFLAB, AVIF sm/md/lg).
//
// El mapeo NO es una tabla escrita a mano: se DERIVA del campo `model` del
// frontmatter. El slug de la fototeca se obtiene normalizando el nombre del
// modelo ("Barco Pirata" → "barco-pirata"). Si ese slug no existe en la
// fototeca (hoy: Micro Baby y Castillo Blanco, que no tienen fotos propias),
// el artículo cae al pool genérico de `eventos` — fiestas reales que funcionan
// bien como portada.
//
// El reparto es determinista: los artículos se ordenan por id y cada pool
// avanza un cursor propio, así dos artículos del mismo modelo nunca comparten
// foto mientras haya fotos suficientes. Mismo build → misma foto. Sin random.

import fototeca from '@data/fototeca.json'

export interface FotoItem {
  lg: string
  md: string
  sm: string
  w: number
  h: number
  alt?: string
}

const FOTOTECA = fototeca as unknown as Record<string, FotoItem[]>

/** Pool genérico para los modelos sin fototeca propia. */
const FALLBACK_SLUG = 'eventos'

/** "Barco Pirata" → "barco-pirata" · "Mini Jungla" → "mini-jungla" */
export function modelToSlug(model: string): string {
  return model
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Slug de fototeca propia del modelo, o null si el modelo no tiene fotos propias. */
export function ownPhotoSlug(model: string): string | null {
  const slug = modelToSlug(model)
  return FOTOTECA[slug]?.length ? slug : null
}

/** Slug del pool del que se sirve este modelo (propio o `eventos`). */
export function poolSlug(model: string): string {
  return ownPhotoSlug(model) ?? FALLBACK_SLUG
}

/** Fotos propias del modelo (vacío si no tiene fototeca propia). */
export function ownPhotos(model: string): FotoItem[] {
  const slug = ownPhotoSlug(model)
  return slug ? (FOTOTECA[slug] ?? []) : []
}

type BlogLike = { id: string; data: { model: string } }

/**
 * Mapa determinista postId → foto de portada.
 * Se construye SIEMPRE con la colección completa (mismo filtro de draft en el
 * índice y en el detalle) para que ambas rutas coincidan foto a foto.
 */
export function buildCoverMap(posts: readonly BlogLike[]): Map<string, FotoItem> {
  const cursor = new Map<string, number>()
  const covers = new Map<string, FotoItem>()

  for (const post of [...posts].sort((a, b) => a.id.localeCompare(b.id))) {
    const slug = poolSlug(post.data.model)
    const pool = FOTOTECA[slug]
    if (!pool?.length) continue

    const i = cursor.get(slug) ?? 0
    cursor.set(slug, i + 1)
    covers.set(post.id, pool[i % pool.length]!)
  }

  return covers
}

/** Alt de la foto, con respaldo derivado del modelo si el manifiesto no trae uno. */
export function coverAlt(foto: FotoItem | undefined, model: string): string {
  return foto?.alt ?? `Inflable ${model} de DENFLAB montado en una fiesta en CDMX`
}

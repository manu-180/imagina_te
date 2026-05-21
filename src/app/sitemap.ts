import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/queries/products'
import { getAllCollections } from '@/lib/queries/collections'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://imaginate-lenceria.com.ar'
  const [products, collections] = await Promise.all([
    getAllProducts(),
    getAllCollections(),
  ])

  const staticRoutes = [
    '',
    '/productos',
    '/colecciones',
    '/guia-talles',
    '/envios-devoluciones',
    '/nosotros',
    '/contacto',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }))

  const productRoutes = products.map((p) => ({
    url: `${base}/productos/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/colecciones/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...productRoutes, ...collectionRoutes]
}

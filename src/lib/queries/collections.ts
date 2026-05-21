import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Collection, Product } from '@/types'

export const getAllCollections = cache(async (): Promise<Collection[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_collections')
    .select('*')
    .eq('is_active', true)
    .order('position', { ascending: true })

  if (error) {
    console.error('[getAllCollections]', error)
    return []
  }
  return data ?? []
})

export const getCollectionBySlug = cache(
  async (
    slug: string
  ): Promise<{ collection: Collection; products: Product[] } | null> => {
    const supabase = createClient()
    const { data: collection } = await supabase
      .from('lenceria_collections')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (!collection) return null

    const { data: products } = await supabase
      .from('lenceria_products')
      .select(`
        *,
        images:lenceria_product_images(*),
        variants:lenceria_product_variants(*)
      `)
      .eq('status', 'active')
      .eq('collection_id', collection.id)
      .order('is_featured', { ascending: false })

    return {
      collection,
      products: (products ?? []).map((p) => ({
        ...p,
        images: [...(p.images ?? [])].sort(
          (a: { position: number }, b: { position: number }) =>
            a.position - b.position
        ),
      })) as Product[],
    }
  }
)

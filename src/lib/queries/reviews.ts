import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Review } from '@/types'

export const getReviewsByProduct = cache(
  async (productId: string): Promise<Review[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getReviewsByProduct]', error)
      return []
    }
    return data ?? []
  }
)

export const getFeaturedReviews = cache(
  async (limit = 6): Promise<(Review & { product_name: string; product_slug: string })[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_reviews')
      .select(`
        *,
        product:lenceria_products(name, slug)
      `)
      .eq('is_published', true)
      .gte('rating', 4)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getFeaturedReviews]', error)
      return []
    }
    type RowWithProduct = Review & { product: { name: string; slug: string } | null }
    return ((data ?? []) as RowWithProduct[]).map((r) => ({
      ...r,
      product_name: r.product?.name ?? 'Producto',
      product_slug: r.product?.slug ?? '',
    }))
  }
)

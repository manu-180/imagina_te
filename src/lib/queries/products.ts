import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Product, ProductImage, ProductVariant } from '@/types'

const PRODUCT_SELECT = `
  *,
  images:lenceria_product_images(*),
  variants:lenceria_product_variants(*),
  category:lenceria_categories(*),
  collection:lenceria_collections(*)
`

type RawProduct = Product & {
  images: ProductImage[]
  variants: ProductVariant[]
}

function sortProductRelations(p: RawProduct): RawProduct {
  return {
    ...p,
    images: [...(p.images ?? [])].sort((a, b) => a.position - b.position),
    variants: [...(p.variants ?? [])].sort((a, b) => {
      // Stock primero, luego por size
      if (a.stock === 0 && b.stock > 0) return 1
      if (a.stock > 0 && b.stock === 0) return -1
      return a.size.localeCompare(b.size, 'es', { numeric: true })
    }),
  }
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_products')
    .select(PRODUCT_SELECT)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllProducts]', error)
    return []
  }
  return (data ?? []).map(sortProductRelations)
})

export const getFeaturedProducts = cache(
  async (limit = 4): Promise<Product[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_products')
      .select(PRODUCT_SELECT)
      .eq('status', 'active')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getFeaturedProducts]', error)
      return []
    }
    return (data ?? []).map(sortProductRelations)
  }
)

export const getBestsellerProducts = cache(
  async (limit = 8): Promise<Product[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_products')
      .select(PRODUCT_SELECT)
      .eq('status', 'active')
      .eq('is_bestseller', true)
      .order('rating_avg', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getBestsellerProducts]', error)
      return []
    }
    return (data ?? []).map(sortProductRelations)
  }
)

export const getNewArrivals = cache(async (limit = 8): Promise<Product[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_products')
    .select(PRODUCT_SELECT)
    .eq('status', 'active')
    .eq('is_new', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getNewArrivals]', error)
    return []
  }
  return (data ?? []).map(sortProductRelations)
})

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_products')
      .select(PRODUCT_SELECT)
      .eq('slug', slug)
      .eq('status', 'active')
      .maybeSingle()

    if (error) {
      console.error('[getProductBySlug]', error)
      return null
    }
    return data ? sortProductRelations(data as RawProduct) : null
  }
)

export const getProductById = cache(
  async (id: string): Promise<Product | null> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_products')
      .select(PRODUCT_SELECT)
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('[getProductById]', error)
      return null
    }
    return data ? sortProductRelations(data as RawProduct) : null
  }
)

export interface ProductsFilter {
  category?: string
  collection?: string
  size?: string
  color?: string
  minPrice?: number
  maxPrice?: number
  isNew?: boolean
  onSale?: boolean
  search?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'rating'
  limit?: number
  offset?: number
}

export interface FilteredProductsResult {
  products: Product[]
  total: number
}

export async function getFilteredProducts(
  filter: ProductsFilter
): Promise<FilteredProductsResult> {
  const supabase = createClient()
  let query = supabase
    .from('lenceria_products')
    .select(PRODUCT_SELECT, { count: 'exact' })
    .eq('status', 'active')

  if (filter.category) {
    const { data: cat } = await supabase
      .from('lenceria_categories')
      .select('id')
      .eq('slug', filter.category)
      .maybeSingle()
    if (cat) {
      query = query.eq('category_id', cat.id)
    } else {
      return { products: [], total: 0 }
    }
  }

  if (filter.collection) {
    const { data: col } = await supabase
      .from('lenceria_collections')
      .select('id')
      .eq('slug', filter.collection)
      .maybeSingle()
    if (col) {
      query = query.eq('collection_id', col.id)
    } else {
      return { products: [], total: 0 }
    }
  }

  if (filter.minPrice !== undefined) query = query.gte('price', filter.minPrice)
  if (filter.maxPrice !== undefined) query = query.lte('price', filter.maxPrice)
  if (filter.isNew) query = query.eq('is_new', true)
  if (filter.onSale) query = query.not('compare_at_price', 'is', null)
  if (filter.search && filter.search.trim()) {
    const q = filter.search.trim()
    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,short_description.ilike.%${q}%`)
  }

  switch (filter.sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('price', { ascending: false })
      break
    case 'bestselling':
      query = query
        .order('is_bestseller', { ascending: false })
        .order('rating_count', { ascending: false })
      break
    case 'rating':
      query = query.order('rating_avg', { ascending: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const limit = filter.limit ?? 24
  const offset = filter.offset ?? 0
  query = query.range(offset, offset + limit - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('[getFilteredProducts]', error)
    return { products: [], total: 0 }
  }

  let products = (data ?? []).map(sortProductRelations)

  // Filtros que requieren post-procesamiento (sobre variants)
  if (filter.size) {
    products = products.filter((p) =>
      (p.variants ?? []).some((v) => v.size.toLowerCase() === filter.size!.toLowerCase())
    )
  }
  if (filter.color) {
    products = products.filter((p) =>
      (p.variants ?? []).some((v) => v.color.toLowerCase() === filter.color!.toLowerCase())
    )
  }

  return { products, total: count ?? products.length }
}

export const getRelatedProducts = cache(
  async (productId: string, collectionId: string | null, limit = 4): Promise<Product[]> => {
    const supabase = createClient()
    let query = supabase
      .from('lenceria_products')
      .select(PRODUCT_SELECT)
      .eq('status', 'active')
      .neq('id', productId)

    if (collectionId) {
      query = query.eq('collection_id', collectionId)
    }

    const { data, error } = await query
      .order('rating_avg', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getRelatedProducts]', error)
      return []
    }
    return (data ?? []).map(sortProductRelations)
  }
)

export const getAvailableSizes = cache(async (): Promise<string[]> => {
  const supabase = createClient()
  const { data } = await supabase
    .from('lenceria_product_variants')
    .select('size')
  const set = new Set<string>()
  data?.forEach((v) => set.add(v.size))
  return Array.from(set)
})

export const getAvailableColors = cache(
  async (): Promise<{ name: string; hex: string }[]> => {
    const supabase = createClient()
    const { data } = await supabase
      .from('lenceria_product_variants')
      .select('color, color_hex')
    const map = new Map<string, string>()
    data?.forEach((v) => map.set(v.color, v.color_hex))
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }))
  }
)

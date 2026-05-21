import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/types'

export const getAllCategories = cache(async (): Promise<Category[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_categories')
    .select('*')
    .order('position', { ascending: true })

  if (error) {
    console.error('[getAllCategories]', error)
    return []
  }
  return data ?? []
})

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (error) {
      console.error('[getCategoryBySlug]', error)
      return null
    }
    return data
  }
)

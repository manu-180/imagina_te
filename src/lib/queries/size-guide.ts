import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { SizeGuideEntry } from '@/types'

export const getAllSizeGuideEntries = cache(
  async (): Promise<SizeGuideEntry[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_size_guide_entries')
      .select('*')
      .order('category')
      .order('size_label')

    if (error) {
      console.error('[getAllSizeGuideEntries]', error)
      return []
    }
    return (data ?? []) as SizeGuideEntry[]
  }
)

export const getSizeGuideByCategory = cache(
  async (category: string): Promise<SizeGuideEntry[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_size_guide_entries')
      .select('*')
      .eq('category', category)
      .order('size_label')

    if (error) {
      console.error('[getSizeGuideByCategory]', error)
      return []
    }
    return (data ?? []) as SizeGuideEntry[]
  }
)

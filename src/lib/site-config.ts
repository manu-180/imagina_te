import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { DEFAULT_SITE_CONFIG, type SiteConfig } from './site-config-types'

export type { SiteConfig }
export { DEFAULT_SITE_CONFIG }

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('lenceria_site_settings')
      .select('key, value')

    if (!data || data.length === 0) return DEFAULT_SITE_CONFIG

    const out: Record<string, unknown> = { ...DEFAULT_SITE_CONFIG }
    data.forEach((row) => {
      out[row.key] = row.value
    })
    return out as unknown as SiteConfig
  } catch (e) {
    console.error('[getSiteConfig]', e)
    return DEFAULT_SITE_CONFIG
  }
})

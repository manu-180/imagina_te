import { createClient } from '@supabase/supabase-js'

/**
 * Cliente admin (Service Role) — solo en server actions / route handlers.
 * Si no hay SUPABASE_SERVICE_ROLE_KEY, devuelve null y los callers deben
 * fallback al authenticated client.
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) return null

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

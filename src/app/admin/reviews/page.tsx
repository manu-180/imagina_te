import { TopBar } from '@/components/admin/TopBar'
import { ReviewRow } from './ReviewRow'
import { createClient } from '@/lib/supabase/server'

interface ReviewWithProduct {
  id: string
  customer_name: string
  customer_email: string | null
  rating: number
  title: string | null
  body: string | null
  size_purchased: string | null
  is_verified: boolean
  is_published: boolean
  created_at: string
  product: { name: string; slug: string } | null
}

export const dynamic = 'force-dynamic'

export default async function AdminReviewsPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('lenceria_reviews')
    .select(`
      id, customer_name, customer_email, rating, title, body, size_purchased,
      is_verified, is_published, created_at,
      product:lenceria_products(name, slug)
    `)
    .order('created_at', { ascending: false })

  const reviews = (data ?? []) as unknown as ReviewWithProduct[]
  const pending = reviews.filter((r) => !r.is_published)
  const published = reviews.filter((r) => r.is_published)

  return (
    <>
      <TopBar
        title="Reviews"
        description={`${pending.length} pendientes · ${published.length} publicadas`}
      />
      <div className="p-6 lg:p-10 space-y-8">
        {pending.length > 0 && (
          <section>
            <h2 className="font-display italic text-2xl text-ink mb-4">
              Pendientes de moderación
            </h2>
            <div className="space-y-3">
              {pending.map((r) => (
                <ReviewRow key={r.id} review={r} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-display italic text-2xl text-ink mb-4">
            Publicadas
          </h2>
          <div className="space-y-3">
            {published.map((r) => (
              <ReviewRow key={r.id} review={r} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

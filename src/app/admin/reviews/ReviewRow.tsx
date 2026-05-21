'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { updateReviewStatus } from '@/app/admin/productos/actions'
import { formatDate } from '@/lib/utils'

interface Review {
  id: string
  customer_name: string
  rating: number
  title: string | null
  body: string | null
  size_purchased: string | null
  is_verified: boolean
  is_published: boolean
  created_at: string
  product: { name: string; slug: string } | null
}

export function ReviewRow({ review }: { review: Review }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function call(isPublished: boolean, isVerified?: boolean) {
    startTransition(async () => {
      const res = await updateReviewStatus(review.id, isPublished, isVerified)
      if (res.error) {
        toast.error(res.error)
        return
      }
      toast.success('Review actualizada')
      router.refresh()
    })
  }

  return (
    <div className="bg-cream border border-warm-gray-100 p-5">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <p className="font-medium text-ink flex items-center gap-2">
            {review.customer_name}
            {review.is_verified && (
              <Badge variant="success" className="text-[9px]">
                Verificada
              </Badge>
            )}
            {!review.is_published && <Badge variant="default">Pendiente</Badge>}
          </p>
          <p className="text-xs text-warm-gray-500">
            {review.product?.name} · {formatDate(review.created_at)}
            {review.size_purchased ? ` · Talle ${review.size_purchased}` : ''}
          </p>
        </div>
        <StarRating rating={review.rating} showCount={false} />
      </div>
      {review.title && (
        <p className="font-display italic text-lg text-ink mb-1">{review.title}</p>
      )}
      {review.body && (
        <p className="text-sm text-soft-black leading-relaxed">{review.body}</p>
      )}
      <div className="flex gap-2 mt-4 pt-4 border-t border-warm-gray-100">
        {!review.is_published ? (
          <Button
            variant="primary"
            size="sm"
            loading={isPending}
            onClick={() => call(true)}
          >
            <CheckCircle2 size={12} strokeWidth={1.5} className="mr-1" />
            Publicar
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            loading={isPending}
            onClick={() => call(false)}
          >
            <XCircle size={12} strokeWidth={1.5} className="mr-1" />
            Ocultar
          </Button>
        )}
        {!review.is_verified && (
          <Button
            variant="champagne"
            size="sm"
            loading={isPending}
            onClick={() => call(review.is_published, true)}
          >
            <ShieldCheck size={12} strokeWidth={1.5} className="mr-1" />
            Marcar verificada
          </Button>
        )}
      </div>
    </div>
  )
}

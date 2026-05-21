import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  count?: number
  size?: number
  showCount?: boolean
  className?: string
}

export function StarRating({
  rating,
  count,
  size = 14,
  showCount = true,
  className,
}: StarRatingProps) {
  const rounded = Math.round(rating * 2) / 2 // Half-step

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={cn(
              i <= rounded
                ? 'fill-champagne text-champagne'
                : 'text-warm-gray-300'
            )}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-warm-gray-500 ml-1">
          ({count})
        </span>
      )}
    </div>
  )
}

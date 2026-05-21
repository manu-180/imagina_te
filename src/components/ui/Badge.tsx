import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'new' | 'sale' | 'bestseller' | 'soldout' | 'ink' | 'success'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
  className?: string
  rotated?: boolean
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-cream text-ink border border-warm-gray-300',
  new: 'bg-champagne text-ink',
  sale: 'bg-burgundy text-cream',
  bestseller: 'bg-ink text-cream',
  soldout: 'bg-warm-gray-300 text-soft-black',
  ink: 'bg-ink text-cream',
  success: 'bg-success text-cream',
}

export function Badge({ children, variant = 'default', className, rotated }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-[10px] uppercase tracking-eyebrow font-medium',
        variantStyles[variant],
        rotated && 'transform -rotate-3',
        className
      )}
    >
      {children}
    </span>
  )
}

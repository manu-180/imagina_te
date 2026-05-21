import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'champagne'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  loading?: boolean
  children?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-ink text-cream hover:bg-soft-black focus-visible:ring-champagne',
  secondary:
    'bg-cream text-ink border border-warm-gray-300 hover:bg-linen focus-visible:ring-champagne',
  outline:
    'bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream focus-visible:ring-champagne',
  ghost:
    'bg-transparent text-ink hover:bg-warm-gray-100 focus-visible:ring-champagne',
  champagne:
    'bg-champagne text-ink hover:bg-champagne-light focus-visible:ring-ink',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-[11px] tracking-button h-9 px-4 uppercase',
  md: 'text-[13px] tracking-button h-12 px-7 uppercase',
  lg: 'text-[14px] tracking-button h-14 px-8 uppercase',
  icon: 'h-10 w-10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', fullWidth, loading, disabled, children, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-body font-medium transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {loading ? (
          <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

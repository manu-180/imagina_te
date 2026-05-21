import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  children: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, className, id, children, ...rest }, ref) => {
    const selectId =
      id ?? rest.name ?? `select-${Math.random().toString(36).slice(2, 8)}`

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full h-12 px-4 pr-10 bg-ivory border border-warm-gray-300 text-ink',
              'font-body appearance-none',
              'focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink',
              'transition-colors',
              error && 'border-error focus:border-error focus:ring-error',
              className
            )}
            {...rest}
          >
            {children}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-500 pointer-events-none"
            strokeWidth={1.5}
          />
        </div>
        {hint && !error && (
          <p className="text-xs text-warm-gray-500">{hint}</p>
        )}
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

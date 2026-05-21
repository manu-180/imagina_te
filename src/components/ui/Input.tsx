import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name ?? `input-${Math.random().toString(36).slice(2, 8)}`

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 px-4 bg-ivory border border-warm-gray-300 text-ink',
            'placeholder:text-warm-gray-500 font-body',
            'focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink',
            'transition-colors',
            error && 'border-error focus:border-error focus:ring-error',
            className
          )}
          {...rest}
        />
        {hint && !error && (
          <p className="text-xs text-warm-gray-500">{hint}</p>
        )}
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

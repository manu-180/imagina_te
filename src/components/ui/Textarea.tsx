import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, id, ...rest }, ref) => {
    const textareaId =
      id ?? rest.name ?? `textarea-${Math.random().toString(36).slice(2, 8)}`

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full min-h-[100px] px-4 py-3 bg-ivory border border-warm-gray-300 text-ink',
            'placeholder:text-warm-gray-500 font-body',
            'focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink',
            'transition-colors resize-y',
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

Textarea.displayName = 'Textarea'

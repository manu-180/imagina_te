'use client'

import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne',
          checked ? 'bg-ink' : 'bg-warm-gray-300'
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-cream transition-transform shadow',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
      {(label || description) && (
        <div>
          {label && (
            <span className="block text-sm text-ink font-medium">{label}</span>
          )}
          {description && (
            <span className="block text-xs text-warm-gray-500 mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  )
}

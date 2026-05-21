import { cn } from '@/lib/utils'

type Variant = 'horizontal' | 'stacked' | 'monogram'

interface LogoProps {
  variant?: Variant
  className?: string
  /** Color principal del texto. Default: currentColor */
  textColor?: string
  /** Color del corazón. Default: champagne */
  heartColor?: string
  /** Animar latido del corazón */
  animated?: boolean
  /** Tamaño */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: { fontSize: 20, heart: 11, gap: 6 },
  md: { fontSize: 28, heart: 15, gap: 8 },
  lg: { fontSize: 40, heart: 22, gap: 10 },
  xl: { fontSize: 60, heart: 32, gap: 14 },
}

function HeartGlyph({
  size,
  color,
  animated,
}: {
  size: number
  color: string
  animated: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', animated && 'origin-center animate-heartbeat')}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  )
}

export function Logo({
  variant = 'horizontal',
  className,
  textColor = 'currentColor',
  heartColor = '#C9A96E',
  animated = true,
  size = 'md',
}: LogoProps) {
  const { fontSize, heart, gap } = sizeMap[size]

  if (variant === 'monogram') {
    const monoSize = fontSize + 16
    return (
      <svg
        viewBox="0 0 80 80"
        width={monoSize}
        height={monoSize}
        className={cn('inline-block', className)}
        aria-label="Imagina te"
      >
        <circle cx="40" cy="40" r="40" fill="#0E0B0A" />
        <text
          x="40"
          y="50"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontWeight="500"
          fontSize="34"
          fill="#F5EFE7"
        >
          I
        </text>
        <text
          x="40"
          y="50"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontWeight="500"
          fontSize="34"
          fill="#F5EFE7"
          transform="translate(14, 0)"
        >
          T
        </text>
        <path
          d="M40 32c-3-4-9-3-9 2 0 5 9 12 9 12s9-7 9-12c0-5-6-6-9-2z"
          fill={heartColor}
          className={animated ? 'origin-center animate-heartbeat' : ''}
        />
      </svg>
    )
  }

  const wordStyle = {
    fontSize: `${fontSize}px`,
    color: textColor,
    letterSpacing: '-0.02em',
    lineHeight: 1,
  } as const

  if (variant === 'stacked') {
    return (
      <span
        className={cn('inline-flex flex-col items-center', className)}
        aria-label="Imagina te"
        style={{ gap: `${Math.round(gap * 0.6)}px` }}
      >
        <span className="font-display italic font-medium" style={wordStyle}>
          imagina
        </span>
        <HeartGlyph size={heart} color={heartColor} animated={animated} />
        <span className="font-display italic font-medium" style={wordStyle}>
          te
        </span>
      </span>
    )
  }

  return (
    <span
      className={cn('inline-flex items-center', className)}
      aria-label="Imagina te"
      style={{ gap: `${gap}px` }}
    >
      <span className="font-display italic font-medium" style={wordStyle}>
        imagina
      </span>
      <HeartGlyph size={heart} color={heartColor} animated={animated} />
      <span className="font-display italic font-medium" style={wordStyle}>
        te
      </span>
    </span>
  )
}

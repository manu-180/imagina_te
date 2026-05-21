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
  sm: { width: 100, height: 24 },
  md: { width: 140, height: 34 },
  lg: { width: 180, height: 44 },
  xl: { width: 260, height: 60 },
}

export function Logo({
  variant = 'horizontal',
  className,
  textColor = 'currentColor',
  heartColor = '#C9A96E',
  animated = true,
  size = 'md',
}: LogoProps) {
  const { width, height } = sizeMap[size]

  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 80 80"
        width={height + 8}
        height={height + 8}
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

  if (variant === 'stacked') {
    return (
      <svg
        viewBox="0 0 220 130"
        width={width * 0.9}
        height={height * 2.4}
        className={cn('inline-block', className)}
        aria-label="Imagina te"
      >
        <text
          x="110"
          y="45"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontWeight="500"
          fontSize="42"
          letterSpacing="-1"
          fill={textColor}
        >
          imagina
        </text>
        <g
          transform="translate(110 64)"
          className={animated ? 'origin-center animate-heartbeat' : ''}
        >
          <path
            d="M0 -8c-4-5-12-4-12 3 0 6 12 14 12 14s12-8 12-14c0-7-8-8-12-3z"
            fill={heartColor}
          />
        </g>
        <text
          x="110"
          y="115"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          fontWeight="500"
          fontSize="42"
          letterSpacing="-1"
          fill={textColor}
        >
          te
        </text>
      </svg>
    )
  }

  // Horizontal default
  return (
    <svg
      viewBox="0 0 320 56"
      width={width}
      height={height}
      className={cn('inline-block', className)}
      aria-label="Imagina te"
    >
      <text
        x="0"
        y="40"
        fontFamily="Cormorant Garamond, serif"
        fontStyle="italic"
        fontWeight="500"
        fontSize="40"
        letterSpacing="-0.8"
        fill={textColor}
      >
        imagina
      </text>
      <g
        transform="translate(166 22)"
        className={animated ? 'origin-center animate-heartbeat' : ''}
      >
        <path
          d="M0 -6c-3-4-10-3-10 3 0 5 10 12 10 12s10-7 10-12c0-6-7-7-10-3z"
          fill={heartColor}
        />
      </g>
      <text
        x="200"
        y="40"
        fontFamily="Cormorant Garamond, serif"
        fontStyle="italic"
        fontWeight="500"
        fontSize="40"
        letterSpacing="-0.8"
        fill={textColor}
      >
        te
      </text>
    </svg>
  )
}

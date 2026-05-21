import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes con tailwind-merge */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formato de precio en pesos argentinos (ARS) con separador de miles.
 * Ej: 24900 → "$24.900"
 */
export function formatPriceARS(price: number | null | undefined): string {
  const n = Number(price ?? 0)
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Ahora'
  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours} h`
  if (diffDays < 7) return `Hace ${diffDays} d`
  return formatDate(d)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

export function calculateDiscount(price: number, compareAt: number | null | undefined): number {
  if (!compareAt || compareAt <= price) return 0
  return Math.round(((compareAt - price) / compareAt) * 100)
}

/**
 * Orden de talles de lencería: copas y números primero (85B, 90C), luego XS-XXL,
 * luego Único / TU. Útil para selectors de variantes.
 */
const ALPHA_SIZE_ORDER: Record<string, number> = {
  XXXS: 5,
  XXS: 10,
  XS: 20,
  S: 30,
  M: 40,
  L: 50,
  XL: 60,
  XXL: 70,
  XXXL: 80,
  '4XL': 90,
  OS: 9999,
  TU: 9999,
  ÚNICO: 9999,
  UNICO: 9999,
}

function rankSize(label: string): number {
  const compact = label.trim().replace(/\s+/g, '').toUpperCase()
  if (ALPHA_SIZE_ORDER[compact] !== undefined) return ALPHA_SIZE_ORDER[compact]
  // Talle tipo 85B, 90C
  const cupMatch = compact.match(/^(\d+)([A-Z]+)$/)
  if (cupMatch) {
    const num = parseInt(cupMatch[1], 10)
    const cupRank = cupMatch[2].charCodeAt(0) - 64
    return 1000 + num * 10 + cupRank
  }
  if (/^\d+(\.\d+)?$/.test(compact)) return 2000 + parseFloat(compact)
  return 5000
}

export function compareSizes(a: string, b: string): number {
  return rankSize(a) - rankSize(b)
}

/** Construye URL pública de Unsplash con auto-formato */
export function unsplashUrl(
  photoId: string,
  width = 1200,
  quality = 85
): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`
}

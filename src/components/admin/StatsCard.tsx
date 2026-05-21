import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: { value: number; positive: boolean }
  accent?: 'champagne' | 'rose' | 'success' | 'ink'
}

const accentMap = {
  champagne: 'text-champagne',
  rose: 'text-rose-deep',
  success: 'text-success',
  ink: 'text-ink',
}

export function StatsCard({ label, value, icon: Icon, trend, accent = 'champagne' }: StatsCardProps) {
  return (
    <div className="bg-cream border border-warm-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-eyebrow text-warm-gray-500 font-medium">
          {label}
        </p>
        <Icon size={18} strokeWidth={1.5} className={accentMap[accent]} />
      </div>
      <p className="font-display italic text-3xl text-ink">{value}</p>
      {trend && (
        <p
          className={cn(
            'text-xs mt-2',
            trend.positive ? 'text-success' : 'text-error'
          )}
        >
          {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs. mes anterior
        </p>
      )}
    </div>
  )
}

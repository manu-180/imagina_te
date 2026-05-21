'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatPriceARS } from '@/lib/utils'

interface RevenueChartProps {
  data: { date: string; revenue: number; orders: number }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-cream border border-warm-gray-100 p-6">
      <h3 className="font-display italic text-xl text-ink mb-1">
        Ingresos últimos 30 días
      </h3>
      <p className="text-xs text-warm-gray-500 mb-6">
        Total e historial diario
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A96E" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#C9A96E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E5DED1" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="#8A8175"
              fontSize={11}
              tickFormatter={(d) => {
                const date = new Date(d)
                return `${date.getDate()}/${date.getMonth() + 1}`
              }}
            />
            <YAxis
              stroke="#8A8175"
              fontSize={11}
              tickFormatter={(v) =>
                v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`
              }
            />
            <Tooltip
              formatter={(value: number) => formatPriceARS(value)}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                })
              }
              contentStyle={{
                backgroundColor: '#0E0B0A',
                border: 'none',
                color: '#F5EFE7',
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
              }}
              labelStyle={{ color: '#C9A96E' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A96E"
              strokeWidth={2}
              fill="url(#revGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

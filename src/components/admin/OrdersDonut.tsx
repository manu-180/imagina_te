'use client'

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ORDER_STATUS_LABELS } from '@/lib/constants'

const STATUS_COLORS: Record<string, string> = {
  pending: '#BFB6A8',
  confirmed: '#EAD5C8',
  paid: '#5A7A52',
  shipped: '#C9A96E',
  delivered: '#0E0B0A',
  cancelled: '#9B1B30',
  refunded: '#C99E9A',
}

interface OrdersDonutProps {
  byStatus: Record<string, number>
}

export function OrdersDonut({ byStatus }: OrdersDonutProps) {
  const data = Object.entries(byStatus).map(([status, value]) => ({
    name: ORDER_STATUS_LABELS[status] ?? status,
    value,
    statusKey: status,
  }))

  if (data.length === 0) {
    return (
      <div className="bg-cream border border-warm-gray-100 p-6">
        <h3 className="font-display italic text-xl text-ink mb-1">
          Órdenes por estado
        </h3>
        <p className="text-sm text-warm-gray-500 mt-4">
          Todavía no hay órdenes para mostrar.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-cream border border-warm-gray-100 p-6">
      <h3 className="font-display italic text-xl text-ink mb-1">
        Órdenes por estado
      </h3>
      <p className="text-xs text-warm-gray-500 mb-6">Distribución total</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.statusKey}
                  fill={STATUS_COLORS[entry.statusKey] ?? '#8A8175'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0E0B0A',
                border: 'none',
                color: '#F5EFE7',
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontFamily: 'var(--font-inter)', fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

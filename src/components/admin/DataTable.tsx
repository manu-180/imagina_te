'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  emptyMessage = 'Sin datos',
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-cream border border-warm-gray-100">
      <table className="w-full">
        <thead className="bg-ink text-cream">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  'text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium',
                  c.className
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-warm-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  i % 2 === 0 ? 'bg-cream' : 'bg-ivory',
                  onRowClick && 'cursor-pointer hover:bg-blush/30 transition-colors'
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn('px-4 py-3 text-sm text-ink', c.className)}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

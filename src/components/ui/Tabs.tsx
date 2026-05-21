'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)

  return (
    <div className={className}>
      <div className="flex gap-6 border-b border-warm-gray-300 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              'pb-3 -mb-px text-[11px] uppercase tracking-eyebrow font-medium border-b transition-colors whitespace-nowrap',
              active === tab.id
                ? 'text-ink border-ink'
                : 'text-warm-gray-500 border-transparent hover:text-ink'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  )
}

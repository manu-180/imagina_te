'use client'

import { useEffect, useState } from 'react'
import { useSiteConfig } from '@/lib/site-config-context'

export function AnnouncementBar() {
  const config = useSiteConfig()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('imagina-te-announcement-dismissed')
    if (dismissed === '1') setVisible(false)
  }, [])

  if (!visible || !config.announcement_bar?.active) return null

  return (
    <div className="bg-ink text-cream w-full text-center text-[11px] uppercase tracking-eyebrow py-2.5 px-4">
      <span className="font-body font-medium">
        {config.announcement_bar.text} <span className="text-champagne">♥</span>
      </span>
    </div>
  )
}

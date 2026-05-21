'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { updateOrderStatus } from '@/app/admin/productos/actions'
import { ORDER_STATUS_LABELS } from '@/lib/constants'

interface Props {
  orderId: string
  currentStatus: string
}

const STATUS_OPTIONS = [
  'pending',
  'confirmed',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]

export function OrderStatusControl({ orderId, currentStatus }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  async function save() {
    if (status === currentStatus && !notes) {
      toast.error('Cambiá el estado o agregá una nota')
      return
    }
    setSaving(true)
    const res = await updateOrderStatus(orderId, status, notes || null)
    if (res.error) {
      toast.error(res.error)
      setSaving(false)
      return
    }
    toast.success('Estado actualizado')
    setNotes('')
    router.refresh()
    setSaving(false)
  }

  return (
    <div className="space-y-3">
      <Select value={status} onChange={(e) => setStatus(e.target.value)}>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </option>
        ))}
      </Select>
      <Textarea
        placeholder="Notas internas (opcional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
      />
      <Button variant="primary" fullWidth loading={saving} onClick={save}>
        Guardar
      </Button>
    </div>
  )
}

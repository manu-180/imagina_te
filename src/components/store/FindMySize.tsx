'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface FindMySizeProps {
  open: boolean
  onClose: () => void
}

type Category = 'corpino' | 'bombacha' | 'conjunto'

export function FindMySize({ open, onClose }: FindMySizeProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState<Category | null>(null)
  const [underbust, setUnderbust] = useState('')
  const [bust, setBust] = useState('')
  const [hip, setHip] = useState('')
  const [result, setResult] = useState<string | null>(null)

  function reset() {
    setStep(1)
    setCategory(null)
    setUnderbust('')
    setBust('')
    setHip('')
    setResult(null)
  }

  function close() {
    reset()
    onClose()
  }

  function calculate() {
    if (category === 'bombacha') {
      const h = parseInt(hip, 10)
      if (h <= 90) setResult('S')
      else if (h <= 96) setResult('M')
      else if (h <= 102) setResult('L')
      else setResult('XL')
    } else {
      // Corpiño / conjunto: calcular contorno bajo busto a talle
      const u = parseInt(underbust, 10)
      const b = parseInt(bust, 10)
      let sizeNum: number
      if (u <= 79) sizeNum = 85
      else if (u <= 84) sizeNum = 90
      else if (u <= 89) sizeNum = 95
      else sizeNum = 100

      const diff = b - u
      let cup = 'B'
      if (diff < 13) cup = 'A'
      else if (diff < 15) cup = 'B'
      else if (diff < 17) cup = 'C'
      else if (diff < 19) cup = 'D'
      else cup = 'E'

      setResult(`${sizeNum}${cup}`)
    }
    setStep(3)
  }

  function search() {
    if (!result) return
    router.push(`/productos?talle=${encodeURIComponent(result)}`)
    close()
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Encontrá tu talle"
      size="md"
    >
      {/* Step 1: tipo de prenda */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-soft-black">
            En 30 segundos te decimos cuál es tu talle. Sin vueltas.
          </p>
          <div className="grid gap-3">
            {[
              { id: 'corpino', label: 'Corpiño', desc: 'Sostén con copa' },
              { id: 'bombacha', label: 'Bombacha', desc: 'Vedetinas, culottes, tangas' },
              { id: 'conjunto', label: 'Conjunto', desc: 'Corpiño + bombacha' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setCategory(opt.id as Category)
                  setStep(2)
                }}
                className="text-left p-4 border border-warm-gray-300 hover:border-ink hover:bg-ivory transition-colors"
              >
                <p className="font-display italic text-xl text-ink">{opt.label}</p>
                <p className="text-xs text-warm-gray-500 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: medidas */}
      {step === 2 && (
        <div className="space-y-5">
          {category === 'bombacha' ? (
            <>
              <p className="text-sm text-soft-black">
                Medí tu contorno de cadera en la parte más amplia.
              </p>
              <Input
                label="Cadera (cm)"
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder="Ej: 95"
                hint="Pasá el centímetro alrededor de la parte más amplia."
              />
            </>
          ) : (
            <>
              <p className="text-sm text-soft-black">
                Necesitamos dos medidas para calcular tu talle exacto.
              </p>
              <Input
                label="Contorno bajo busto (cm)"
                type="number"
                value={underbust}
                onChange={(e) => setUnderbust(e.target.value)}
                placeholder="Ej: 80"
                hint="Justo debajo del pecho, donde apoya el corpiño."
              />
              <Input
                label="Contorno de busto (cm)"
                type="number"
                value={bust}
                onChange={(e) => setBust(e.target.value)}
                placeholder="Ej: 92"
                hint="Sobre la parte más prominente del pecho."
              />
            </>
          )}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Volver
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={calculate}
              disabled={
                category === 'bombacha'
                  ? !hip
                  : !underbust || !bust
              }
            >
              Calcular mi talle
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: resultado */}
      {step === 3 && result && (
        <div className="text-center py-4 space-y-5">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium">
            Tu talle estimado es
          </p>
          <p className="font-display italic text-7xl text-ink">{result}</p>
          <p className="text-sm text-soft-black max-w-sm mx-auto">
            Tené en cuenta que cada estilo puede variar levemente. Si tenés dudas, escribinos por WhatsApp y te asesoramos.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="primary" fullWidth onClick={search}>
              Ver productos en mi talle
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setStep(1)}>
              Calcular de nuevo
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Logo } from '@/components/store/Logo'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast.error(error.message || 'No se pudo iniciar sesión')
        setLoading(false)
        return
      }
      toast.success('¡Hola! Te llevamos al admin.')
      router.push(next)
      router.refresh()
    } catch {
      toast.error('Error inesperado.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md bg-ivory border border-warm-gray-100 p-8 lg:p-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Logo variant="horizontal" size="lg" />
          </Link>
          <h1 className="font-display italic text-3xl text-ink mt-4">
            Acceso administrador
          </h1>
          <p className="text-sm text-warm-gray-500 mt-2">
            Ingresá con tus credenciales.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            label="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            Iniciar sesión
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-warm-gray-500 hover:text-ink transition-colors"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}

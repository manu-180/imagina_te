import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/Sidebar'
import { Toaster } from 'sonner'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/admin')
  }

  return (
    <div className="min-h-screen bg-ivory flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">{children}</div>
      <Toaster
        position="bottom-right"
        theme="light"
        toastOptions={{
          style: {
            background: '#FAF6F0',
            color: '#0E0B0A',
            border: '1px solid #C9A96E',
            borderRadius: '0',
          },
        }}
      />
    </div>
  )
}

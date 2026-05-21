import { TopBar } from '@/components/admin/TopBar'
import { SettingsForm } from './SettingsForm'
import { getSiteConfig } from '@/lib/site-config'

export const dynamic = 'force-dynamic'

export default async function ConfiguracionPage() {
  const config = await getSiteConfig()

  return (
    <>
      <TopBar
        title="Configuración"
        description="Editá los textos y datos de contacto del sitio"
      />
      <div className="p-6 lg:p-10 max-w-3xl">
        <SettingsForm config={config} />
      </div>
    </>
  )
}

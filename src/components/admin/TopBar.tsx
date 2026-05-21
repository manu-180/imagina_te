interface TopBarProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function TopBar({ title, description, action }: TopBarProps) {
  return (
    <header className="bg-cream border-b border-warm-gray-100 px-6 lg:px-10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="font-display italic text-3xl md:text-4xl text-ink">{title}</h1>
        {description && (
          <p className="text-sm text-warm-gray-500 mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </header>
  )
}

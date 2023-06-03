interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl dark:text-slate-100">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground dark:text-slate-400">{text}</p>}
      </div>
      {children}
    </div>
  )
}

import type { PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx'

type CardProps = PropsWithChildren<{
  title?: string
  icon?: ReactNode
  description?: string
  className?: string
}>

export function Card({ title, icon, description, className, children }: CardProps) {
  return (
    <div className={clsx('rounded-2xl border border-border bg-muted/60 p-6 shadow-card', className)}>
      <div className="flex items-center justify-between">
        <div>
          {title ? <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">{title}</h3> : null}
          {description ? <p className="mt-1 text-3xl font-bold text-foreground">{description}</p> : null}
        </div>
        {icon ? <div className="text-4xl text-primary">{icon}</div> : null}
      </div>
      {children ? <div className="mt-4 text-sm text-foreground/70">{children}</div> : null}
    </div>
  )
}

export default Card

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary: 'bg-primary text-black hover:bg-primary/80',
  secondary: 'bg-muted text-foreground hover:bg-muted/80 border border-border',
  ghost: 'text-primary hover:bg-muted/60'
} as const

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
} as const

type Variant = keyof typeof variants

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant
    size?: keyof typeof sizes
  }
>

export function Button({ children, className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

export default Button

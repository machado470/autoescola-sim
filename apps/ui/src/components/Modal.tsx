import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'

type ModalProps = PropsWithChildren<{
  isOpen: boolean
  title?: string
  onClose: () => void
}>

const modalRoot = typeof document !== 'undefined' ? document.body : null

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen || !modalRoot) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-muted p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          {title ? <h2 className="text-lg font-semibold text-foreground">{title}</h2> : <span />}
          <Button variant="ghost" onClick={onClose} aria-label="Fechar">
            ✕
          </Button>
        </div>
        <div className="space-y-4 text-sm text-foreground/90">{children}</div>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal

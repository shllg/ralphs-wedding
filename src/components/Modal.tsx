'use client'

import { useRef, useEffect, type ReactNode } from 'react'

interface ModalProps {
  id?: string
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ id, open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className="p-0 rounded-lg backdrop:bg-black/50 max-w-lg w-full"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 data-testid="modal-title" className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            data-testid="modal-close-button"
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

'use client'

import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import { InviteGuestForm } from './InviteGuestForm'

interface InviteGuestButtonProps {
  weddingEventId: string
}

export function InviteGuestButton({ weddingEventId }: InviteGuestButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        id="invite-guest-button"
        variant="default"
        onClick={() => setIsOpen(true)}
      >
        <span className="flex items-center gap-2">
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Invite Guest
        </span>
      </Button>

      <Modal
        id="invite-guest-modal"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Invite Guest"
      >
        <InviteGuestForm
          weddingEventId={weddingEventId}
          onSuccess={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}

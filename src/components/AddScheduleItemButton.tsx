'use client'

import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import { AddScheduleItemForm } from './AddScheduleItemForm'

interface AddScheduleItemButtonProps {
  weddingEventId: string
  eventDate: Date
}

export function AddScheduleItemButton({ weddingEventId, eventDate }: AddScheduleItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        id="add-schedule-item-button"
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
          Add Item
        </span>
      </Button>

      <Modal
        id="add-schedule-item-modal"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Schedule Item"
      >
        <AddScheduleItemForm
          weddingEventId={weddingEventId}
          eventDate={eventDate}
          onSuccess={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}

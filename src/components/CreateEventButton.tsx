'use client'

import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import { CreateEventForm } from './CreateEventForm'

export function CreateEventButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        id="create-event-button"
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Event
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Event"
      >
        <CreateEventForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  )
}

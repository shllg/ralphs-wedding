'use client'

import { useActionState, useRef, useEffect } from 'react'
import { createEvent, type FormState } from '@/actions/createEvent'
import { Button } from './Button'

interface CreateEventFormProps {
  onSuccess?: () => void
}

const initialState: FormState = {
  success: false,
}

export function CreateEventForm({ onSuccess }: CreateEventFormProps) {
  const [state, formAction, isPending] = useActionState(createEvent, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      onSuccess?.()
    }
  }, [state.success, onSuccess])

  return (
    <form ref={formRef} action={formAction} id="create-event-form" className="space-y-4">
      {state.errors?._form && (
        <div data-testid="form-error" className="text-red-600 text-sm">
          {state.errors._form.join(', ')}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.name && (
          <div data-testid="name-error" className="text-red-600 text-sm mt-1">
            {state.errors.name.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium mb-1">
          Event Date
        </label>
        <input
          type="datetime-local"
          id="eventDate"
          name="eventDate"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.eventDate && (
          <div data-testid="eventDate-error" className="text-red-600 text-sm mt-1">
            {state.errors.eventDate.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.location && (
          <div data-testid="location-error" className="text-red-600 text-sm mt-1">
            {state.errors.location.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="invitationText" className="block text-sm font-medium mb-1">
          Invitation Text
        </label>
        <textarea
          id="invitationText"
          name="invitationText"
          rows={4}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.invitationText && (
          <div data-testid="invitationText-error" className="text-red-600 text-sm mt-1">
            {state.errors.invitationText.join(', ')}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Event'}
        </Button>
      </div>
    </form>
  )
}

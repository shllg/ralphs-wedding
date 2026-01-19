'use client'

import { useActionState, useRef, useEffect, useCallback, startTransition } from 'react'
import { createScheduleItem, type FormState } from '@/actions/createScheduleItem'
import { Button } from './Button'

interface AddScheduleItemFormProps {
  weddingEventId: string
  eventDate: Date
  onSuccess?: () => void
}

const initialState: FormState = {
  success: false,
}

export function AddScheduleItemForm({
  weddingEventId,
  eventDate,
  onSuccess,
}: AddScheduleItemFormProps) {
  const [state, formAction, isPending] = useActionState(createScheduleItem, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      onSuccess?.()
    }
  }, [state.success, onSuccess])

  const defaultDate = new Date(eventDate).toISOString().split('T')[0]

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      const formData = new FormData(form)

      const date = formData.get('date') as string
      const time = formData.get('time') as string

      if (date && time) {
        formData.set('dateTime', `${date}T${time}:00`)
      }

      startTransition(() => {
        formAction(formData)
      })
    },
    [formAction]
  )

  return (
    <form ref={formRef} onSubmit={handleSubmit} id="add-schedule-item-form" className="space-y-4">
      <input type="hidden" name="weddingEventId" value={weddingEventId} />

      {state.errors?._form && (
        <div data-testid="form-error" className="text-sm text-red-600">
          {state.errors._form.join(', ')}
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g., Guest Arrival"
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.title && (
          <div data-testid="title-error" className="mt-1 text-sm text-red-600">
            {state.errors.title.join(', ')}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={defaultDate}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-primary"
          />
        </div>
        <div>
          <label htmlFor="time" className="mb-1 block text-sm font-medium">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-primary"
          />
        </div>
      </div>
      {state.errors?.dateTime && (
        <div data-testid="datetime-error" className="text-sm text-red-600">
          {state.errors.dateTime.join(', ')}
        </div>
      )}

      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium">
          Location (optional)
        </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="e.g., Garden Terrace"
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.location && (
          <div data-testid="location-error" className="mt-1 text-sm text-red-600">
            {state.errors.location.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          placeholder="e.g., Welcome cocktails and seating"
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.description && (
          <div data-testid="description-error" className="mt-1 text-sm text-red-600">
            {state.errors.description.join(', ')}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Item'}
        </Button>
      </div>
    </form>
  )
}

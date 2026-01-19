'use client'

import { useActionState, useRef, useEffect } from 'react'
import { createInvitation, type FormState } from '@/actions/createInvitation'
import { Button } from './Button'

interface InviteGuestFormProps {
  weddingEventId: string
  onSuccess?: () => void
}

const initialState: FormState = {
  success: false,
}

export function InviteGuestForm({ weddingEventId, onSuccess }: InviteGuestFormProps) {
  const [state, formAction, isPending] = useActionState(createInvitation, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      onSuccess?.()
    }
  }, [state.success, onSuccess])

  return (
    <form ref={formRef} action={formAction} id="invite-guest-form" className="space-y-4">
      <input type="hidden" name="weddingEventId" value={weddingEventId} />

      {state.errors?._form && (
        <div data-testid="form-error" className="text-red-600 text-sm">
          {state.errors._form.join(', ')}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Guest Name
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
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ink-primary"
        />
        {state.errors?.email && (
          <div data-testid="email-error" className="text-red-600 text-sm mt-1">
            {state.errors.email.join(', ')}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Inviting...' : 'Send Invitation'}
        </Button>
      </div>
    </form>
  )
}

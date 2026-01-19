'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createEventSchema } from '@/lib/schemas'

export type FormState = {
  success: boolean
  errors?: {
    name?: string[]
    eventDate?: string[]
    location?: string[]
    invitationText?: string[]
    _form?: string[]
  }
}

export async function createEvent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get('name'),
    eventDate: formData.get('eventDate'),
    location: formData.get('location'),
    invitationText: formData.get('invitationText'),
  }

  const result = createEventSchema.safeParse(rawData)

  if (!result.success) {
    const errors: FormState['errors'] = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof typeof errors
      if (!errors[field]) {
        errors[field] = []
      }
      errors[field]!.push(issue.message)
    }
    return { success: false, errors }
  }

  try {
    await prisma.weddingEvent.create({
      data: {
        name: result.data.name,
        eventDate: new Date(result.data.eventDate),
        location: result.data.location,
        invitationText: result.data.invitationText,
      },
    })

    revalidatePath('/maintainer')
    return { success: true }
  } catch (error) {
    console.error('Failed to create event:', error)
    return {
      success: false,
      errors: { _form: ['Failed to create event. Please try again.'] },
    }
  }
}

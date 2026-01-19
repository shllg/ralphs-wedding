'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createInvitationSchema } from '@/lib/schemas'

export type FormState = {
  success: boolean
  errors?: {
    name?: string[]
    email?: string[]
    weddingEventId?: string[]
    _form?: string[]
  }
}

export async function createInvitation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    weddingEventId: formData.get('weddingEventId'),
  }

  const result = createInvitationSchema.safeParse(rawData)

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
    await prisma.eventInvitation.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        weddingEventId: result.data.weddingEventId,
      },
    })

    revalidatePath(`/maintainer/${result.data.weddingEventId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to create invitation:', error)
    return {
      success: false,
      errors: { _form: ['Failed to create invitation. Please try again.'] },
    }
  }
}

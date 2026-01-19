'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createScheduleItemSchema } from '@/lib/schemas'

export type FormState = {
  success: boolean
  errors?: {
    title?: string[]
    dateTime?: string[]
    description?: string[]
    location?: string[]
    weddingEventId?: string[]
    _form?: string[]
  }
}

export async function createScheduleItem(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    title: formData.get('title'),
    dateTime: formData.get('dateTime'),
    description: formData.get('description') || undefined,
    location: formData.get('location') || undefined,
    weddingEventId: formData.get('weddingEventId'),
  }

  const result = createScheduleItemSchema.safeParse(rawData)

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
    await prisma.scheduleItem.create({
      data: {
        title: result.data.title,
        dateTime: new Date(result.data.dateTime),
        description: result.data.description || null,
        location: result.data.location || null,
        weddingEventId: result.data.weddingEventId,
      },
    })

    revalidatePath(`/maintainer/${result.data.weddingEventId}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to create schedule item:', error)
    return {
      success: false,
      errors: { _form: ['Failed to create schedule item. Please try again.'] },
    }
  }
}

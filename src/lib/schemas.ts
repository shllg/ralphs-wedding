import { z } from 'zod'

export const createEventSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  eventDate: z.string().min(1, 'Event date is required').refine(
    (val) => !isNaN(Date.parse(val)),
    'Invalid date format'
  ),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be 200 characters or less'),
  invitationText: z.string().min(1, 'Invitation text is required').max(5000, 'Invitation text must be 5000 characters or less'),
})

export type CreateEventInput = z.infer<typeof createEventSchema>

export const invitationStateSchema = z.enum(['PENDING', 'ACCEPTED', 'DECLINED'])

export const createInvitationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  weddingEventId: z.string().min(1, 'Wedding event is required'),
})

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>

export const updateInvitationStateSchema = z.object({
  state: invitationStateSchema,
})

export type UpdateInvitationStateInput = z.infer<typeof updateInvitationStateSchema>

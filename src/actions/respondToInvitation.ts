'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import type { InvitationState } from '@prisma/client'

export async function respondToInvitation(
  invitationId: string,
  state: 'ACCEPTED' | 'DECLINED'
): Promise<void> {
  await prisma.eventInvitation.update({
    where: { id: invitationId },
    data: { state: state as InvitationState },
  })

  revalidatePath(`/invitation/${invitationId}`)
}

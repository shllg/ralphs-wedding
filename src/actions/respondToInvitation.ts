'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function respondToInvitation(
  invitationId: string,
  state: 'ACCEPTED' | 'DECLINED'
): Promise<void> {
  await prisma.eventInvitation.update({
    where: { id: invitationId },
    data: { state },
  })

  revalidatePath(`/invitation/${invitationId}`)
}

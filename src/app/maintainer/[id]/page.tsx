import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function WeddingEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await prisma.weddingEvent.findUnique({
    where: { id },
  })

  if (!event) {
    notFound()
  }

  return (
    <main id="wedding-event-detail" className="p-8" data-event-id={event.id}>
      <Link href="/maintainer" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to list
      </Link>

      <h1 className="text-2xl font-bold mb-6" data-testid="event-name">
        {event.name}
      </h1>

      <dl className="space-y-2">
        <div>
          <dt className="font-semibold">ID</dt>
          <dd data-testid="event-id">{event.id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Created At</dt>
          <dd data-testid="event-created-at">
            {new Date(event.createdAt).toLocaleDateString()}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Updated At</dt>
          <dd data-testid="event-updated-at">
            {new Date(event.updatedAt).toLocaleDateString()}
          </dd>
        </div>
      </dl>
    </main>
  )
}

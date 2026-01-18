import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { WeddingEvent } from '@/types/wedding-event'

async function getWeddingEvent(id: string): Promise<WeddingEvent | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/maintainer/wedding-events/${id}`, {
    cache: 'no-store',
  })

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error('Failed to fetch wedding event')
  }

  return res.json()
}

export default async function WeddingEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getWeddingEvent(id)

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

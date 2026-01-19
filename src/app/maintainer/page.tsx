import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { CreateEventButton } from '@/components'

export const dynamic = 'force-dynamic'

export default async function MaintainerPage() {
  const events = await prisma.weddingEvent.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Wedding Events</h1>
        <CreateEventButton />
      </div>

      <ul id="wedding-events-list" className="space-y-4">
        {events.map((event) => (
          <li key={event.id} data-event-id={event.id}>
            <Link
              href={`/maintainer/${event.id}`}
              className="block p-4 border rounded hover:bg-gray-50"
            >
              <span data-testid="event-name" className="font-medium">{event.name}</span>
              <div className="mt-2 text-sm text-gray-600">
                <span data-testid="event-date">
                  {new Date(event.eventDate).toLocaleDateString()}
                </span>
                <span className="mx-2">|</span>
                <span data-testid="event-location">{event.location}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

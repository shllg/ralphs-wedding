import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function MaintainerPage() {
  const events = await prisma.weddingEvent.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Wedding Events</h1>

      <ul id="wedding-events-list" className="space-y-4">
        {events.map((event) => (
          <li key={event.id} data-event-id={event.id}>
            <Link
              href={`/maintainer/${event.id}`}
              className="block p-4 border rounded hover:bg-gray-50"
            >
              <span data-testid="event-name">{event.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

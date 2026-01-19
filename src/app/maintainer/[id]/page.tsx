import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, Button, InvitationCard, InviteGuestButton } from '@/components'

export default async function WeddingEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await prisma.weddingEvent.findUnique({
    where: { id },
    include: {
      invitations: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!event) {
    notFound()
  }

  const totalGuests = event.invitations.length
  const acceptedCount = event.invitations.filter((i) => i.state === 'ACCEPTED').length
  const declinedCount = event.invitations.filter((i) => i.state === 'DECLINED').length
  const pendingCount = event.invitations.filter((i) => i.state === 'PENDING').length

  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div id="wedding-event-detail" data-event-id={event.id} className="py-8">
      <Link
        href="/maintainer"
        className="mb-6 inline-block font-sans text-sm text-ink-secondary hover:text-ink-primary"
      >
        &larr; Back to list
      </Link>

      {/* Header */}
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1
            data-testid="event-name"
            className="font-serif text-3xl font-semibold text-ink-primary"
          >
            {event.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-sm text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <span data-testid="event-date">{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span data-testid="event-location">{event.location}</span>
            </span>
          </div>
        </div>
        <Button variant="default">
          <span className="flex items-center gap-2">
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit Details
          </span>
        </Button>
      </header>

      {/* Stats Grid */}
      <div
        data-testid="stats-grid"
        className="mb-8 grid grid-cols-2 gap-4"
      >
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-canvas text-ink-secondary">
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div>
              <p
                data-testid="stat-total-guests"
                className="font-serif text-2xl font-semibold text-ink-primary"
              >
                {totalGuests}
              </p>
              <p className="font-sans text-sm text-ink-muted">Total Guests</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-bg-success text-status-success">
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <div>
              <p
                data-testid="stat-accepted"
                className="font-serif text-2xl font-semibold text-ink-primary"
              >
                {acceptedCount}
              </p>
              <p className="font-sans text-sm text-ink-muted">Accepted</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-bg-error text-status-error">
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p
                data-testid="stat-declined"
                className="font-serif text-2xl font-semibold text-ink-primary"
              >
                {declinedCount}
              </p>
              <p className="font-sans text-sm text-ink-muted">Declined</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-bg-pending text-status-pending">
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p
                data-testid="stat-pending"
                className="font-serif text-2xl font-semibold text-ink-primary"
              >
                {pendingCount}
              </p>
              <p className="font-sans text-sm text-ink-muted">Pending</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Guest List */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-ink-primary">Guest List</h2>
          <InviteGuestButton weddingEventId={event.id} />
        </div>

        <div data-testid="guest-list" className="space-y-3">
          {event.invitations.length === 0 ? (
            <p className="py-8 text-center font-sans text-sm text-ink-muted">
              No guests invited yet
            </p>
          ) : (
            event.invitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                name={invitation.name}
                email={invitation.email}
                state={invitation.state.toLowerCase() as 'accepted' | 'pending' | 'declined'}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, Button } from '@/components'
import { respondToInvitation } from '@/actions/respondToInvitation'

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const invitation = await prisma.eventInvitation.findUnique({
    where: { id },
    include: {
      weddingEvent: true,
    },
  })

  if (!invitation) {
    notFound()
  }

  const { weddingEvent } = invitation

  const formattedDate = new Date(weddingEvent.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const today = new Date()
  const eventDate = new Date(weddingEvent.eventDate)
  const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  const acceptAction = respondToInvitation.bind(null, id, 'ACCEPTED')
  const declineAction = respondToInvitation.bind(null, id, 'DECLINED')

  return (
    <div id="invitation-page" data-invitation-id={invitation.id} className="py-8">
      {/* Header Section */}
      <header className="mb-8 rounded-lg bg-canvas py-12 text-center">
        {/* Heart Icon */}
        <div className="mb-4 flex justify-center">
          <svg
            className="size-12 text-status-success"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <p className="mb-2 font-sans text-sm uppercase tracking-widest text-ink-secondary">
          You are invited to the wedding of
        </p>

        <h1
          data-testid="event-name"
          className="mb-4 font-serif text-4xl font-semibold text-ink-primary md:text-5xl"
        >
          {weddingEvent.name}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-ink-secondary">
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
            <span data-testid="event-location">{weddingEvent.location}</span>
          </span>
        </div>

        {daysUntil > 0 && (
          <div className="mt-6">
            <span
              data-testid="days-countdown"
              className="inline-block rounded-full border border-border-subtle bg-surface px-4 py-2 font-sans text-sm text-ink-primary"
            >
              {daysUntil} {daysUntil === 1 ? 'day' : 'days'} until the wedding
            </span>
          </div>
        )}
      </header>

      {/* Personal Message Card */}
      <Card className="mb-6 text-center">
        <h2
          data-testid="guest-greeting"
          className="mb-4 font-serif text-2xl font-medium text-ink-primary"
        >
          Dear {invitation.name},
        </h2>

        <p
          data-testid="invitation-text"
          className="mx-auto max-w-lg font-sans text-ink-secondary"
        >
          {weddingEvent.invitationText}
        </p>
      </Card>

      {/* Response Section */}
      <Card className="text-center">
        <h3 className="mb-4 font-serif text-xl font-medium text-ink-primary">
          Your Response
        </h3>

        {invitation.state === 'PENDING' ? (
          <div data-testid="response-buttons" className="flex flex-wrap justify-center gap-4">
            <form action={acceptAction}>
              <Button type="submit" variant="primary">
                <span className="flex items-center gap-2">
                  <svg
                    className="size-4"
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
                  Accept Invitation
                </span>
              </Button>
            </form>
            <form action={declineAction}>
              <Button type="submit" variant="default">
                <span className="flex items-center gap-2">
                  <svg
                    className="size-4"
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
                  Decline with Regrets
                </span>
              </Button>
            </form>
          </div>
        ) : (
          <div data-testid="response-status">
            {invitation.state === 'ACCEPTED' ? (
              <div className="flex items-center justify-center gap-2 font-sans text-status-success">
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
                You have accepted this invitation
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 font-sans text-ink-muted">
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
                You have declined this invitation
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

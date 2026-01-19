interface ScheduleItemCardProps {
  id: string
  dateTime: Date
  title: string
  description?: string | null
  location?: string | null
}

export function ScheduleItemCard({
  id,
  dateTime,
  title,
  description,
  location,
}: ScheduleItemCardProps) {
  const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div
      id={`schedule-item-${id}`}
      data-schedule-item-id={id}
      className="flex items-start gap-4 rounded-lg border border-canvas bg-surface p-4"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas text-primary">
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
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            data-testid="schedule-item-time"
            className="font-sans text-lg font-medium text-ink-secondary"
          >
            {formattedTime}
          </span>
          {location && (
            <span
              data-testid="schedule-item-location"
              className="rounded bg-bg-success px-2 py-0.5 font-sans text-xs font-medium text-status-success"
            >
              {location}
            </span>
          )}
        </div>
        <h3
          data-testid="schedule-item-title"
          className="mt-1 font-serif text-base font-semibold text-ink-primary"
        >
          {title}
        </h3>
        {description && (
          <p
            data-testid="schedule-item-description"
            className="mt-0.5 font-sans text-sm text-ink-muted"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

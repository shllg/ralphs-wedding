import { Card } from './Card'
import { ScheduleItemCard } from './ScheduleItemCard'
import { AddScheduleItemButton } from './AddScheduleItemButton'

interface ScheduleItem {
  id: string
  dateTime: Date
  title: string
  description: string | null
  location: string | null
}

interface ScheduleSectionProps {
  weddingEventId: string
  eventDate: Date
  scheduleItems: ScheduleItem[]
}

export function ScheduleSection({ weddingEventId, eventDate, scheduleItems }: ScheduleSectionProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl font-medium text-ink-primary">Event Schedule</h2>
        <AddScheduleItemButton weddingEventId={weddingEventId} eventDate={eventDate} />
      </div>

      <div data-testid="schedule-list" className="space-y-3">
        {scheduleItems.length === 0 ? (
          <p className="py-8 text-center font-sans text-sm text-ink-muted">
            No schedule items yet
          </p>
        ) : (
          scheduleItems.map((item) => (
            <ScheduleItemCard
              key={item.id}
              id={item.id}
              dateTime={item.dateTime}
              title={item.title}
              description={item.description}
              location={item.location}
            />
          ))
        )}
      </div>
    </Card>
  )
}

interface ScheduleItemData {
  id: string;
  dateTime: Date;
  title: string;
  description: string | null;
  location: string | null;
}

interface ScheduleTimelineProps {
  items: ScheduleItemData[];
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function ScheduleCard({
  item,
  alignment,
}: {
  item: ScheduleItemData;
  alignment: "left" | "right";
}) {
  const time = formatTime(new Date(item.dateTime));
  const isRight = alignment === "right";

  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface p-4 ${isRight ? "text-right" : "text-left"}`}
    >
      {/* Time */}
      <div
        className={`mb-2 flex items-center gap-1.5 font-sans text-sm text-ink-secondary ${isRight ? "justify-end" : "justify-start"}`}
      >
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
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span data-testid="schedule-item-time">{time}</span>
      </div>

      {/* Title */}
      <h4
        data-testid="schedule-item-title"
        className="mb-1 font-sans text-base font-semibold text-ink-primary"
      >
        {item.title}
      </h4>

      {/* Description */}
      {item.description && (
        <p
          data-testid="schedule-item-description"
          className="mb-3 font-sans text-sm text-ink-secondary"
        >
          {item.description}
        </p>
      )}

      {/* Location Badge */}
      {item.location && (
        <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
          <span
            data-testid="schedule-item-location"
            className="inline-flex items-center gap-1 rounded-full border border-border-subtle px-3 py-1 font-sans text-xs text-ink-secondary"
          >
            <svg
              className="size-3"
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
            {item.location}
          </span>
        </div>
      )}
    </div>
  );
}

function TimelineItem({
  item,
  position,
}: {
  item: ScheduleItemData;
  position: "left" | "right";
}) {
  const isLeft = position === "left";

  return (
    <div
      data-testid="schedule-item"
      data-item-id={item.id}
      className="grid grid-cols-[1fr_auto_1fr] gap-4"
    >
      {/* Left Column */}
      <div className={`flex ${isLeft ? "justify-end" : ""}`}>
        {isLeft && <ScheduleCard item={item} alignment="right" />}
      </div>

      {/* Center Column - Timeline Dot */}
      <div className="flex flex-col items-center">
        <div className="flex size-6 items-center justify-center rounded-full border-2 border-status-success bg-surface">
          <div className="size-2.5 rounded-full bg-status-success" />
        </div>
      </div>

      {/* Right Column */}
      <div className={`flex ${!isLeft ? "justify-start" : ""}`}>
        {!isLeft && <ScheduleCard item={item} alignment="left" />}
      </div>
    </div>
  );
}

export function ScheduleTimeline({ items }: ScheduleTimelineProps) {
  if (items.length === 0) {
    return null;
  }

  // Sort items by dateTime
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  return (
    <section data-testid="schedule-timeline" className="py-8">
      <h2 className="mb-8 text-center font-serif text-2xl font-medium text-ink-primary">
        Schedule of Events
      </h2>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-subtle" />

        {/* Timeline Items */}
        <div className="relative flex flex-col gap-8">
          {sortedItems.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              position={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

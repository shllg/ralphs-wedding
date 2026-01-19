import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Card } from "./Card";

interface EventItemCardProps {
  time: string;
  location: string;
  title: string;
  description: string;
}

export function EventItemCard({
  time,
  location,
  title,
  description,
}: EventItemCardProps) {
  return (
    <Card>
      <h3 className="font-serif text-xl text-ink-primary mb-2">{title}</h3>
      <p className="font-sans text-sm text-ink-secondary mb-4">{description}</p>
      <div className="flex flex-wrap gap-4">
        <div className="font-sans text-sm text-ink-muted flex items-center gap-1.5">
          <ClockIcon className="size-4" />
          <span>{time}</span>
        </div>
        <div className="font-sans text-sm text-ink-muted flex items-center gap-1.5">
          <MapPinIcon className="size-4" />
          <span>{location}</span>
        </div>
      </div>
    </Card>
  );
}

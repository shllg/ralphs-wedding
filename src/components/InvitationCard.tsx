import { Badge } from "./Badge";

type InvitationState = "accepted" | "pending" | "declined";

interface InvitationCardProps {
  name: string;
  email: string;
  state: InvitationState;
  plusOne?: boolean;
}

export function InvitationCard({
  name,
  email,
  state,
  plusOne,
}: InvitationCardProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      data-testid="invitation-card"
      className="flex items-center gap-4 rounded-lg border border-border-subtle bg-surface px-4 py-3"
    >
      <div
        data-testid="invitation-avatar"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas font-sans text-sm font-medium text-ink-secondary"
      >
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <p
          data-testid="invitation-name"
          className="truncate font-sans text-sm font-medium text-ink-primary"
        >
          {name}
        </p>
        <p
          data-testid="invitation-email"
          className="truncate font-sans text-sm text-ink-muted"
        >
          {email}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {plusOne && (
          <span
            data-testid="invitation-plus-one"
            className="rounded border border-border-subtle px-2 py-0.5 font-sans text-xs text-ink-secondary"
          >
            +1
          </span>
        )}
        <Badge status={state} />
      </div>
    </div>
  );
}

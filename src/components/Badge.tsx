type BadgeStatus = "accepted" | "pending" | "declined";

interface BadgeProps {
  status: BadgeStatus;
}

const statusClasses: Record<BadgeStatus, string> = {
  accepted: "bg-bg-success text-status-success",
  pending: "bg-bg-pending text-status-pending",
  declined: "bg-bg-error text-status-error",
};

const statusLabels: Record<BadgeStatus, string> = {
  accepted: "Accepted",
  pending: "Pending",
  declined: "Declined",
};

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

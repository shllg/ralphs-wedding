import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-lg shadow-sm border border-border-subtle p-6 ${className}`}
    >
      {children}
    </div>
  );
}

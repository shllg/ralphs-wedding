import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "default";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-primary text-white hover:bg-ink-secondary",
  default:
    "border border-ink-primary text-ink-primary bg-transparent hover:bg-ink-primary hover:text-white",
};

export function Button({
  variant = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-2.5 rounded font-sans text-sm uppercase tracking-widest transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

import React, { ReactNode, useMemo, useState } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";

export type ActionButtonProps = {
  title: string;
  icon?: ReactNode;
  variant?: ButtonVariant;

  onAction: () => void | Promise<void>;

  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;

  loadingText?: string;
  ariaLabel?: string;
};

export function ActionButton({
  title,
  icon,
  variant = "primary",
  onAction,
  disabled = false,
  type = "button",
  className,
  loadingText = "Carregando...",
  ariaLabel,
}: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const variantClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return "btn-custom btn-primary";
      case "secondary":
        return "btn-custom btn-secondary";
      case "danger":
        return "btn-custom btn-danger";
      case "ghost":
        return "btn-custom btn-ghost";
      case "outline":
        return "btn-custom btn-outline";
      default:
        return "btn-custom btn-primary";
    }
  }, [variant]);

  async function handleClick() {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);
      await onAction();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type={type}
      className={[variantClass, className].filter(Boolean).join(" ")}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel ?? title}
    >
      <span className="btn-content">
        {icon ? <i className={"fa-solid " + icon}></i> : null}
        <span className="btn-text">{isLoading ? loadingText : title}</span>
      </span>
    </button>
  );
}

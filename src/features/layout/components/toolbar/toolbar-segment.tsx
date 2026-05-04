import * as React from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";

type ToolbarSegmentProps = {
  active?: boolean;
  ariaLabel: string;
  onClick: () => void;
  icon?: React.ReactElement<{ className?: string }>;
};

export function ToolbarSegment({
  active = false,
  ariaLabel,
  onClick,
  icon,
}: ToolbarSegmentProps) {
  const renderedIcon = icon
    ? React.cloneElement(icon, {
        className: cn(icon.props.className, "size-3"),
      })
    : null;

  return (
    <Button
      aria-pressed={active}
      aria-label={ariaLabel}
      className={cn(
        "h-6 rounded-md border-0 px-1.5 py-0 shadow-none",
        active
          ? "bg-button-primary text-button-primary-fg hover:bg-button-primary-hover"
          : "bg-transparent text-shell-fg hover:bg-button-secondary-hover",
      )}
      onClick={onClick}
      variant={active ? "default" : "outline"}
    >
      <span className="flex items-center justify-center leading-none">
        {renderedIcon}
      </span>
    </Button>
  );
}

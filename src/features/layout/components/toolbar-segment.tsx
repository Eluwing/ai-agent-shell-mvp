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
          ? "bg-zinc-900 text-white hover:bg-zinc-800"
          : "bg-transparent text-zinc-900 hover:bg-zinc-100",
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

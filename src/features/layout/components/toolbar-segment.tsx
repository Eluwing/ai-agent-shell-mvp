import * as React from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { useToolbarGroup } from "./toolbar-group";

type ToolbarSegmentProps = {
  active?: boolean;
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  mode?: "icon" | "text";
  onClick: () => void;
  icon?: React.ReactElement<{ className?: string }>;
};

export function ToolbarSegment({
  active = false,
  ariaLabel,
  children,
  className,
  mode = "icon",
  onClick,
  icon,
}: ToolbarSegmentProps) {
  const { density } = useToolbarGroup();
  const iconSizeClassName = density === "compact" ? "size-3" : "size-[13px]";
  const textSizeClassName = density === "compact" ? "text-xs" : "text-xs";

  const renderedIcon = icon
    ? React.cloneElement(icon, {
        className: cn(icon.props.className, iconSizeClassName),
      })
    : null;

  return (
    <Button
      aria-pressed={active}
      aria-label={ariaLabel}
      className={cn(
        "h-full rounded-md leading-none",
        density === "compact" ? "px-2" : "px-2.5",
        mode === "text" ? textSizeClassName : null,
        className,
      )}
      onClick={onClick}
      variant={active ? "default" : "outline"}
    >
      {renderedIcon}
      {children}
    </Button>
  );
}

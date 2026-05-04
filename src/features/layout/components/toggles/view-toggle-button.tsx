import type { ReactElement } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";

type ViewToggleButtonProps = {
  active: boolean;
  ariaLabel: string;
  onClick: () => void;
  activeIcon: ReactElement<{ className?: string }>;
  inactiveIcon: ReactElement<{ className?: string }>;
};

export function ViewToggleButton({
  active,
  ariaLabel,
  onClick,
  activeIcon,
  inactiveIcon,
}: ViewToggleButtonProps) {
  return (
    <Button
      aria-pressed={active}
      aria-label={ariaLabel}
      className={cn(
        "h-6 rounded-md border-0 px-1.5 shadow-none",
        active
          ? "bg-[color:var(--button-primary-bg)] text-[color:var(--button-primary-fg)] hover:bg-[color:var(--button-primary-hover-bg)]"
          : "bg-transparent text-[color:var(--chrome-foreground)] hover:bg-[color:var(--button-secondary-hover-bg)]",
      )}
      onClick={onClick}
      variant="outline"
    >
      {active ? activeIcon : inactiveIcon}
    </Button>
  );
}

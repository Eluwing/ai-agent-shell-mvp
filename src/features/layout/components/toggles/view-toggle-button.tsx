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
          ? "bg-zinc-900 text-white hover:bg-zinc-800"
          : "bg-transparent text-zinc-900 hover:bg-zinc-100",
      )}
      onClick={onClick}
      variant="outline"
    >
      {active ? activeIcon : inactiveIcon}
    </Button>
  );
}

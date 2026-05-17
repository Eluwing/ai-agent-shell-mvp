import { Check, Circle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type AgentActivityItemProps = {
  active?: boolean;
  complete?: boolean;
  label: string;
};

export function AgentActivityItem({
  active = false,
  complete = false,
  label,
}: AgentActivityItemProps) {
  return (
    <li className="flex gap-2 text-xs leading-5 text-card-fg/80">
      <span
        className={cn(
          "mt-1 inline-flex size-3.5 shrink-0 items-center justify-center rounded-full",
          complete
            ? "bg-card-fg/70 text-card"
            : "border border-card-fg/40 text-card-fg/60",
          active && "border-button-primary text-button-primary",
        )}
        aria-hidden="true"
      >
        {complete ? <Check className="size-2.5" /> : <Circle className="size-1.5" />}
      </span>
      <span className={cn(active && "font-medium text-card-fg")}>{label}</span>
    </li>
  );
}

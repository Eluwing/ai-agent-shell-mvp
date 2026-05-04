import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import type { Workspace } from "@/features/workspace/types/workspace-types";

type WorkspaceTabProps = {
  workspace: Workspace;
  active: boolean;
  tabWidth: number;
  onSelect: () => void;
  onClose: () => void;
};

const workspaceKindDotClassName: Record<Workspace["kind"], string> = {
  cms: "bg-emerald-400",
  crm: "bg-sky-400",
  admin: "bg-violet-400",
};

export function WorkspaceTab({
  workspace,
  active,
  tabWidth,
  onSelect,
  onClose,
}: WorkspaceTabProps) {
  const closeButtonWidth = active ? "pr-8" : "pr-3";
  const titleMaxWidth = active
    ? Math.max(0, tabWidth - 64)
    : Math.max(0, tabWidth - 40);

  return (
    <div
      className={cn(
        "group relative flex shrink-0 items-stretch overflow-hidden rounded-t-xl border border-b-0 shadow-none transition-colors",
        active
          ? "z-10 -mb-px border-[color:var(--tab-active-border)] bg-[color:var(--tab-active-background)] shadow-[0_-1px_0_rgba(255,255,255,0.04)]"
          : "border-transparent bg-[color:var(--tab-inactive-background)] hover:bg-[color:var(--tab-hover-background)]",
      )}
      style={{ width: tabWidth }}
    >
      <Button
        aria-pressed={active}
        aria-label={workspace.name}
        className={cn(
          "h-8 min-w-0 flex-1 justify-start gap-2 rounded-none border-0 bg-transparent px-3 py-0 shadow-none hover:bg-transparent",
          closeButtonWidth,
          active
            ? "font-medium text-[color:var(--tab-active-foreground)]"
            : "text-[color:var(--tab-inactive-foreground)]",
        )}
        onClick={onSelect}
        variant={active ? "default" : "outline"}
      >
        <span
          className={cn(
            "size-2.5 shrink-0 rounded-full",
            workspaceKindDotClassName[workspace.kind],
          )}
          aria-hidden="true"
        />
        <span
          className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-none"
          style={{ maxWidth: titleMaxWidth }}
        >
          {workspace.name}
        </span>
      </Button>

      {active ? (
        <button
          type="button"
          aria-label={`Close ${workspace.name}`}
          className="group absolute right-0 inline-flex h-8 w-8 items-center justify-center text-[color:var(--tab-inactive-foreground)] transition-colors"
          onClick={onClose}
        >
          <span className="inline-flex size-4 items-center justify-center rounded-full transition-colors group-hover:bg-[color:var(--button-secondary-hover-bg)] group-hover:text-[color:var(--chrome-foreground)]">
            <X className="size-3" />
          </span>
        </button>
      ) : null}
    </div>
  );
}

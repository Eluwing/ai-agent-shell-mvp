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
  const showIcon = !active || tabWidth >= 96;
  const showTitle = !active || tabWidth >= 72;
  const compactWidth = active && !showIcon && !showTitle ? 40 : tabWidth;

  return (
    <div
      className={cn(
        "group relative flex shrink-0 items-stretch overflow-hidden rounded-t-xl border border-b-0 shadow-none transition-colors",
        active
          ? "border-zinc-700 bg-zinc-900"
          : "border-transparent bg-zinc-950/90 hover:bg-zinc-800",
      )}
      style={{ width: compactWidth }}
    >
      <Button
        aria-pressed={active}
        aria-label={workspace.name}
        className={cn(
          "h-8 min-w-0 flex-1 justify-start gap-2 rounded-none border-0 bg-transparent px-3 py-0 shadow-none hover:bg-transparent",
          closeButtonWidth,
          active ? "text-white" : "text-zinc-300",
        )}
        onClick={onSelect}
        variant={active ? "default" : "outline"}
      >
        {showIcon ? (
          <span
            className={cn(
              "size-2.5 shrink-0 rounded-full",
              workspaceKindDotClassName[workspace.kind],
            )}
            aria-hidden="true"
          />
        ) : null}
        {showTitle ? (
          <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-none">
            {workspace.name}
          </span>
        ) : null}
      </Button>

      {active ? (
        <button
          type="button"
          aria-label={`Close ${workspace.name}`}
          className="group absolute right-0 top-0 left-0 inline-flex h-8 w-8 items-center justify-center text-zinc-400 transition-colors"
          onClick={onClose}
        >
          <span className="inline-flex size-4 items-center justify-center rounded-full transition-colors group-hover:bg-white/10 group-hover:text-white">
            <X className="size-3" />
          </span>
        </button>
      ) : null}
    </div>
  );
}

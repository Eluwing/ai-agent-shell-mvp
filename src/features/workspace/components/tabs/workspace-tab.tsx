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
  return (
    <div
      className={cn(
        "group flex shrink-0 items-stretch overflow-hidden rounded-t-xl border border-b-0 shadow-none transition-colors",
        active
          ? "border-zinc-700 bg-zinc-900"
          : "border-transparent bg-zinc-950/90 hover:bg-zinc-800",
      )}
      style={{ width: tabWidth }}
    >
      <Button
        aria-pressed={active}
        aria-label={workspace.name}
        className={cn(
          "h-8 min-w-0 flex-1 justify-start gap-2 rounded-none border-0 bg-transparent px-3 py-0 shadow-none hover:bg-transparent",
          active ? "text-white" : "text-zinc-300",
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
        <span className="min-w-0 flex-1 truncate text-[12px] font-medium leading-none">
          {workspace.name}
        </span>
      </Button>

      <button
        type="button"
        aria-label={`Close ${workspace.name}`}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        onClick={onClose}
      >
        <X className="size-3" />
      </button>
    </div>
  );
}

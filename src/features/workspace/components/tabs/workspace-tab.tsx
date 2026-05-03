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
    <div className="group relative shrink-0">
      <Button
        aria-pressed={active}
        aria-label={workspace.name}
        style={{ width: tabWidth }}
        className={cn(
          "h-8 min-w-0 flex-none rounded-t-xl rounded-b-none border border-b-0 px-3 py-0 shadow-none",
          active
            ? "border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
            : "border-transparent bg-zinc-950/90 text-zinc-300 hover:bg-zinc-800",
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
        className="absolute right-1 top-1/2 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 opacity-0 transition-opacity hover:bg-white/10 hover:text-white group-hover:opacity-100"
        onClick={onClose}
      >
        <X className="size-3" />
      </button>
    </div>
  );
}

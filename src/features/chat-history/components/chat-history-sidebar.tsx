import { useEffect, useMemo } from "react";
import { FolderOpen, MessageSquarePlus } from "lucide-react";
import { ChatThreadItem } from "@/features/chat-history/components/chat-thread-item";
import { useChatHistoryStore } from "@/features/chat-history/stores/chat-history-store";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function ChatHistorySidebar() {
  const { t } = useTranslation();
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspace = useMemo(
    () => workspaces.find((workspace) => workspace.id === activeWorkspaceId) ?? null,
    [activeWorkspaceId, workspaces],
  );
  const threadsByWorkspaceId = useChatHistoryStore(
    (state) => state.threadsByWorkspaceId,
  );
  const activeThreadIdByWorkspaceId = useChatHistoryStore(
    (state) => state.activeThreadIdByWorkspaceId,
  );
  const syncWorkspaces = useChatHistoryStore((state) => state.syncWorkspaces);
  const addThread = useChatHistoryStore((state) => state.addThread);
  const setActiveThread = useChatHistoryStore((state) => state.setActiveThread);

  useEffect(() => {
    syncWorkspaces(workspaces);
  }, [syncWorkspaces, workspaces]);

  if (!activeWorkspace) {
    return null;
  }

  const activeThreads = threadsByWorkspaceId[activeWorkspace.id] ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          {t("chat.projects")}
        </p>
      </div>

      <div className="mt-4 min-h-0 space-y-3 overflow-y-auto pr-1">
        {workspaces.map((workspace) => {
          const threads = threadsByWorkspaceId[workspace.id] ?? [];
          const activeThreadId = activeThreadIdByWorkspaceId[workspace.id] ?? null;
          const workspaceActive = workspace.id === activeWorkspaceId;

          return (
            <div key={workspace.id} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <button
                  className="flex min-w-0 flex-1 items-center gap-2 text-left text-card-fg/90"
                  onClick={() => setActiveWorkspace(workspace.id)}
                  type="button"
                >
                  <FolderOpen className="size-4 opacity-80" />
                  <span
                    className={
                      workspaceActive
                        ? "truncate text-lg font-semibold"
                        : "truncate text-lg font-medium opacity-80"
                    }
                  >
                    {workspace.name}
                  </span>
                </button>

                <Button
                  aria-label={t("chat.newThread")}
                  className="h-7 w-7 shrink-0 rounded-md border border-transparent bg-transparent px-0 text-card-fg/70 hover:bg-button-secondary-hover hover:text-card-fg"
                  onClick={() =>
                    addThread(
                      workspace.id,
                      `${t("chat.newThread")} ${threads.length + 1}`,
                    )
                  }
                  variant="secondary"
                >
                  <MessageSquarePlus className="size-3.5" />
                </Button>
              </div>

              <div className="space-y-2 pl-1">
                {threads.map((thread) => (
                  <ChatThreadItem
                    key={thread.id}
                    active={activeThreadId === thread.id}
                    thread={thread}
                    onSelect={() => {
                      setActiveWorkspace(workspace.id);
                      setActiveThread(workspace.id, thread.id);
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

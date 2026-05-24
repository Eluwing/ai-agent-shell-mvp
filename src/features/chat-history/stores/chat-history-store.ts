import { create } from "zustand";
import type { Workspace } from "@/features/workspace/types/workspace-types";
import type { ChatThread } from "@/features/chat-history/types/chat-history-types";

type ChatHistoryState = {
  threadsByWorkspaceId: Record<Workspace["id"], ChatThread[]>;
  activeThreadIdByWorkspaceId: Record<Workspace["id"], ChatThread["id"] | null>;
  syncWorkspaces: (workspaces: Workspace[]) => void;
  addThread: (workspaceId: Workspace["id"], title: string) => void;
  setActiveThread: (
    workspaceId: Workspace["id"],
    threadId: ChatThread["id"],
  ) => void;
};

let threadSequence = 1;

function createThread(title: string): ChatThread {
  const id = `thread-${threadSequence}`;
  threadSequence += 1;

  return {
    id,
    title,
    updatedAt: new Date().toISOString(),
  };
}

function createInitialThread(workspaceName: string): ChatThread {
  return createThread(`${workspaceName} · Chat 1`);
}

export const useChatHistoryStore = create<ChatHistoryState>((set) => ({
  threadsByWorkspaceId: {},
  activeThreadIdByWorkspaceId: {},
  syncWorkspaces: (workspaces) =>
    set((state) => {
      const nextThreadsByWorkspaceId: Record<string, ChatThread[]> = {};
      const nextActiveThreadIdByWorkspaceId: Record<string, string | null> = {};

      for (const workspace of workspaces) {
        const existingThreads = state.threadsByWorkspaceId[workspace.id];
        const threads =
          existingThreads && existingThreads.length > 0
            ? existingThreads
            : [createInitialThread(workspace.name)];

        nextThreadsByWorkspaceId[workspace.id] = threads;

        const existingActiveId = state.activeThreadIdByWorkspaceId[workspace.id];
        const resolvedActiveId =
          existingActiveId &&
          threads.some((thread) => thread.id === existingActiveId)
            ? existingActiveId
            : threads[0]?.id ?? null;

        nextActiveThreadIdByWorkspaceId[workspace.id] = resolvedActiveId;
      }

      return {
        threadsByWorkspaceId:
          nextThreadsByWorkspaceId as ChatHistoryState["threadsByWorkspaceId"],
        activeThreadIdByWorkspaceId:
          nextActiveThreadIdByWorkspaceId as ChatHistoryState["activeThreadIdByWorkspaceId"],
      };
    }),
  addThread: (workspaceId, title) =>
    set((state) => {
      const nextThread = createThread(title);
      const currentThreads = state.threadsByWorkspaceId[workspaceId] ?? [];
      const nextThreads = [...currentThreads, nextThread];

      return {
        threadsByWorkspaceId: {
          ...state.threadsByWorkspaceId,
          [workspaceId]: nextThreads,
        },
        activeThreadIdByWorkspaceId: {
          ...state.activeThreadIdByWorkspaceId,
          [workspaceId]: nextThread.id,
        },
      };
    }),
  setActiveThread: (workspaceId, threadId) =>
    set((state) => ({
      activeThreadIdByWorkspaceId: {
        ...state.activeThreadIdByWorkspaceId,
        [workspaceId]: threadId,
      },
    })),
}));


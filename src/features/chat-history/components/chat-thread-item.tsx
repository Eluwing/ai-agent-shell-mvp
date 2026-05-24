import { Button } from "@/shared/components/ui/button";
import type { ChatThread } from "@/features/chat-history/types/chat-history-types";

type ChatThreadItemProps = {
  active: boolean;
  thread: ChatThread;
  onSelect: () => void;
};

export function ChatThreadItem({ active, thread, onSelect }: ChatThreadItemProps) {
  return (
    <Button
      className="w-full justify-start truncate"
      variant={active ? "default" : "secondary"}
      onClick={onSelect}
    >
      {thread.title}
    </Button>
  );
}


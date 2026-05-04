import { Bot } from "lucide-react";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function WorkspaceSidebar() {
  return (
    <aside className="border-r border-[color:var(--card-border)] bg-[color:var(--card-background)] px-4 py-5 text-[color:var(--card-foreground)]">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Bot className="size-4" />
        AI Agent Mock
      </div>

      <WorkspaceSwitcher />
    </aside>
  );
}

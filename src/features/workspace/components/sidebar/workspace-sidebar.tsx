import { Bot } from "lucide-react";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function WorkspaceSidebar() {
  return (
    <aside className="border-r border-card-border bg-card px-4 py-5 text-card-fg">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Bot className="size-4" />
        AI Agent Mock
      </div>

      <WorkspaceSwitcher />
    </aside>
  );
}

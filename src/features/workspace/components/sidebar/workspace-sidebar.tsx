import { Bot } from "lucide-react";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function WorkspaceSidebar() {
  return (
    <aside className="border-r border-zinc-200 bg-white px-4 py-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Bot className="size-4" />
        AI Agent Mock
      </div>

      <WorkspaceSwitcher />
    </aside>
  );
}

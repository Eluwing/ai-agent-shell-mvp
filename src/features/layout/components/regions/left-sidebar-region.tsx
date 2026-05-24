import { AppTitleBarBrand } from "@/features/layout/components/title-bar/app-title-bar-brand";
import { ChatHistorySidebar } from "@/features/chat-history/components/chat-history-sidebar";

export function LeftSidebarRegion() {
  return (
    <aside className="row-span-2 flex min-h-0 min-w-0 flex-col border-r border-card-border bg-card text-card-fg">
      <div className="flex h-app-titlebar items-center border-b border-card-border pl-titlebar-leading pr-titlebar-horizontal text-card-fg">
        <AppTitleBarBrand className="text-card-fg" />
      </div>

      <div className="flex-1 px-browser-horizontal py-layout-gutter">
        <ChatHistorySidebar />
      </div>
    </aside>
  );
}

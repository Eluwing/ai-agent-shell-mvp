import { AppTitleBarBrand } from "@/app/components/title-bar/app-title-bar-brand";
import { WorkspaceSwitcher } from "@/features/workspace/components/sidebar/workspace-switcher";

export function SidebarRail() {
  return (
    <aside className="row-span-2 flex min-h-0 min-w-0 flex-col border-r border-card-border bg-card text-card-fg">
      <div className="flex h-9 items-center border-b border-card-border pl-[86px] pr-3 text-card-fg">
        <AppTitleBarBrand className="text-card-fg" />
      </div>

      <div className="flex-1 px-4 py-5">
        <WorkspaceSwitcher />
      </div>
    </aside>
  );
}

import { WorkspaceTitleBar } from "@/app/components/shell/layouts/workspace-title-bar";
import { WorkspaceContent } from "@/app/components/shell/layouts/workspace-content";
import { SidebarRail } from "@/app/components/shell/layouts/sidebar-rail";

type SidebarLayoutProps = {
  inspectorVisible: boolean;
};

export function SidebarLayout({ inspectorVisible }: SidebarLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] grid-rows-[max-content_1fr]">
      <SidebarRail />
      <WorkspaceTitleBar />
      <WorkspaceContent inspectorVisible={inspectorVisible} />
    </div>
  );
}

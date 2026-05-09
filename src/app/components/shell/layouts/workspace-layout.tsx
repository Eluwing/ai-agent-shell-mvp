import { AppTitleBar } from "@/app/components/title-bar/app-title-bar";
import { WorkspaceContent } from "@/app/components/shell/layouts/workspace-content";

type WorkspaceLayoutProps = {
  inspectorVisible: boolean;
};

export function WorkspaceLayout({ inspectorVisible }: WorkspaceLayoutProps) {
  return (
    <div className="grid flex-1 min-h-0 grid-rows-app-shell">
      <AppTitleBar />
      <div className="grid min-h-0 grid-cols-1">
        <WorkspaceContent inspectorVisible={inspectorVisible} />
      </div>
    </div>
  );
}

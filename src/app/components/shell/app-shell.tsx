import { useEffect } from "react";
import { SidebarLayout } from "@/app/components/shell/layouts/sidebar-layout";
import { WorkspaceLayout } from "@/app/components/shell/layouts/workspace-layout";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function AppShell() {
  const locale = useLayoutStore((state) => state.locale);
  const workspaceSidebarVisible = useLayoutStore(
    (state) => state.workspaceSidebarVisible,
  );
  const inspectorVisible = useLayoutStore((state) => state.inspectorVisible);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="min-h-screen bg-app-bg text-app-fg">
      {workspaceSidebarVisible ? (
        <SidebarLayout inspectorVisible={inspectorVisible} />
      ) : (
        <WorkspaceLayout inspectorVisible={inspectorVisible} />
      )}
    </main>
  );
}

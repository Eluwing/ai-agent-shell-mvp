import { useEffect } from "react";
import { NativeLayout } from "@/features/layout/components/modes/native-layout";
import { PipLayout } from "@/features/layout/components/modes/pip-layout";
import { SplitLayout } from "@/features/layout/components/modes/split-layout";
import { useLayoutModeSync } from "@/features/layout/hooks/use-layout-mode-sync";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function AppMainLayout() {
  useLayoutModeSync();

  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const workspaceSidebarVisible = useLayoutStore(
    (state) => state.workspaceSidebarVisible,
  );
  const inspectorVisible = useLayoutStore((state) => state.inspectorVisible);

  useEffect(() => {
    if (layoutMode === "pip") {
      void window.agentShell?.layout.enterPip();
      return;
    }

    void window.agentShell?.layout.exitPip();
  }, [layoutMode]);

  if (layoutMode === "pip") {
    return <PipLayout />;
  }

  if (layoutMode === "split") {
    return (
      <SplitLayout
        agentPanelVisible={inspectorVisible}
        leftSidebarVisible={workspaceSidebarVisible}
      />
    );
  }

  return (
    <NativeLayout
      agentPanelVisible={inspectorVisible}
      leftSidebarVisible={workspaceSidebarVisible}
    />
  );
}

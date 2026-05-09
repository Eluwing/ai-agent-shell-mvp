import { NativeLayout } from "@/features/layout/components/modes/native-layout";
import { PipLayout } from "@/features/layout/components/modes/pip-layout";
import { SplitLayout } from "@/features/layout/components/modes/split-layout";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function AppMainLayout() {
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const workspaceSidebarVisible = useLayoutStore(
    (state) => state.workspaceSidebarVisible,
  );
  const inspectorVisible = useLayoutStore((state) => state.inspectorVisible);

  if (layoutMode === "pip") {
    return <PipLayout agentPanelVisible={inspectorVisible} />;
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

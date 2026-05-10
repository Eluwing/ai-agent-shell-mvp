import { useEffect } from "react";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function useLayoutModeSync() {
  const setLayoutMode = useLayoutStore((state) => state.setLayoutMode);

  useEffect(() => {
    return window.agentShell?.layout.onModeChanged((event) => {
      setLayoutMode(event.layoutMode);
    });
  }, [setLayoutMode]);
}

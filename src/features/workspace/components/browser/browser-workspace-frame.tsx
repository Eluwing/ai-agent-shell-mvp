import { useEffect, useRef } from "react";
import { openWorkspace } from "@/features/workspace/actions/open-workspace";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useActiveWorkspace } from "@/features/workspace/hooks/use-active-workspace";
import { resolveWorkspaceUrl } from "@/features/workspace/lib/resolve-workspace-url";
import { WebviewPlaceholder } from "./webview-placeholder";

export function BrowserWorkspaceFrame() {
  const activeWorkspace = useActiveWorkspace();
  const { t } = useTranslation();
  const browserViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void openWorkspace(activeWorkspace);
  }, [activeWorkspace.id, activeWorkspace.url]);

  useEffect(() => {
    const element = browserViewportRef.current;

    if (!element) {
      return;
    }

    const syncBounds = () => {
      const rect = element.getBoundingClientRect();

      window.agentShell?.workspace.setViewBounds({
        workspaceId: activeWorkspace.id,
        bounds: {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
      });
    };

    syncBounds();

    const resizeObserver = new ResizeObserver(syncBounds);
    resizeObserver.observe(element);
    window.addEventListener("resize", syncBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncBounds);
    };
  }, [activeWorkspace.id]);

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-card-border bg-card text-card-fg">
      <div className="flex h-10 items-center gap-2 border-b border-card-border px-4">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-card-fg/70">
          {t("browser.placeholderChrome", {
            workspace: activeWorkspace.name,
          })}
        </span>
        <span className="ml-auto rounded-full bg-button-secondary px-2 py-0.5 text-[11px] text-card-fg/70">
          {resolveWorkspaceUrl(activeWorkspace)}
        </span>
      </div>
      <div ref={browserViewportRef} className="relative min-h-0 flex-1 overflow-hidden">
        <WebviewPlaceholder />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { openWorkspace } from "@/features/workspace/actions/open-workspace";
import { useActiveWorkspace } from "@/features/workspace/hooks/use-active-workspace";
import { ChevronLeft, ChevronRight, Lock, RotateCw } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function BrowserWorkspaceFrame() {
  const activeWorkspace = useActiveWorkspace();
  const { t } = useTranslation();
  const browserViewportRef = useRef<HTMLDivElement>(null);
  const [currentUrl, setCurrentUrl] = useState(activeWorkspace.url);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const workspaceUrl = currentUrl || activeWorkspace.url;
  const isSecure = workspaceUrl.startsWith("https://");

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

  useEffect(() => {
    let active = true;

    window.agentShell?.workspace
      .getNavigationState({ workspaceId: activeWorkspace.id })
      .then((state) => {
        if (!active) {
          return;
        }

        setCurrentUrl(state.currentUrl);
        setCanGoBack(state.canGoBack);
        setCanGoForward(state.canGoForward);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setCurrentUrl(activeWorkspace.url);
        setCanGoBack(false);
        setCanGoForward(false);
      });

    const unsubscribe =
      window.agentShell?.workspace.onNavigationStateChanged((state) => {
        if (state.workspaceId !== activeWorkspace.id) {
          return;
        }

        setCurrentUrl(state.currentUrl);
        setCanGoBack(state.canGoBack);
        setCanGoForward(state.canGoForward);
      });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [activeWorkspace.id, activeWorkspace.url]);

  const handleGoBack = () => {
    void window.agentShell?.workspace.navigateBack({
      workspaceId: activeWorkspace.id,
    });
  };

  const handleReload = () => {
    void window.agentShell?.workspace.reload({
      workspaceId: activeWorkspace.id,
    });
  };

  const handleGoForward = () => {
    void window.agentShell?.workspace.navigateForward({
      workspaceId: activeWorkspace.id,
    });
  };

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-card-border bg-card text-card-fg">
      <div className="flex h-11 items-center gap-2 border-b border-card-border px-4">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={t("browser.back")}
            disabled={!canGoBack}
            className="inline-flex size-8 items-center justify-center rounded-full text-card-fg/70 transition-colors hover:bg-button-secondary-hover-bg hover:text-card-fg disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleGoBack}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("browser.forward")}
            disabled={!canGoForward}
            className="inline-flex size-8 items-center justify-center rounded-full text-card-fg/70 transition-colors hover:bg-button-secondary-hover-bg hover:text-card-fg disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleGoForward}
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("browser.reload")}
            className="inline-flex size-8 items-center justify-center rounded-full text-card-fg/70 transition-colors hover:bg-button-secondary-hover-bg hover:text-card-fg"
            onClick={handleReload}
          >
            <RotateCw className="size-4" />
          </button>
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center rounded-full border border-card-border bg-app-bg px-4 py-2 text-sm text-app-fg/80 shadow-sm">
          <span
            aria-hidden="true"
            className={`mr-3 inline-flex size-4 items-center justify-center ${
              isSecure ? "text-emerald-500" : "text-amber-500"
            }`}
          >
            <Lock className="size-3.5" />
          </span>
          <input
            aria-label={workspaceUrl}
            readOnly
            tabIndex={-1}
            className="w-full min-w-0 bg-transparent text-sm text-app-fg/80 outline-none placeholder:text-app-fg/50"
            value={workspaceUrl}
          />
        </div>
      </div>
      <div
        ref={browserViewportRef}
        className="relative min-h-0 flex-1 overflow-hidden bg-app-bg"
      />
    </div>
  );
}

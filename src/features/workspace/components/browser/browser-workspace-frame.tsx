import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useActiveWorkspace } from "@/features/workspace/hooks/use-active-workspace";
import { resolveWorkspaceUrl } from "@/features/workspace/lib/resolve-workspace-url";
import { WebviewPlaceholder } from "./webview-placeholder";

export function BrowserWorkspaceFrame() {
  const activeWorkspace = useActiveWorkspace();
  const { t } = useTranslation();

  return (
    <div className="min-w-0 rounded-lg border border-zinc-200 bg-white">
      <div className="flex h-10 items-center gap-2 border-b border-zinc-200 px-4">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-zinc-500">
          {t("browser.placeholderChrome", {
            workspace: activeWorkspace.name,
          })}
        </span>
        <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500">
          {resolveWorkspaceUrl(activeWorkspace)}
        </span>
      </div>
      <WebviewPlaceholder />
    </div>
  );
}

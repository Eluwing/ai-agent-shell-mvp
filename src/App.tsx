import { useEffect, useState } from "react";
import { Bot, Monitor, PanelRight, PictureInPicture2, Play } from "lucide-react";
import { createPreviewGraph } from "@/agent/graph";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localeLabels, type Locale } from "@/i18n/translations";
import { useTranslation } from "@/i18n/use-translation";
import { useAgentStore } from "@/store/agent-store";

type Versions = {
  electron: string;
  chrome: string;
  node: string;
};

export function App() {
  const {
    layoutMode,
    activeWorkspace,
    locale,
    setLayoutMode,
    setActiveWorkspace,
    setLocale,
  } = useAgentStore();
  const { t } = useTranslation();
  const [versions, setVersions] = useState<Versions | null>(null);
  const [previewWorkspace, setPreviewWorkspace] = useState<string | null>(null);

  useEffect(() => {
    window.agentShell?.versions().then(setVersions);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  async function runPreviewAgent() {
    const graph = createPreviewGraph();
    const result = await graph.invoke({ goal: activeWorkspace });
    setPreviewWorkspace(String(result.goal ?? activeWorkspace));
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <aside className="border-r border-zinc-200 bg-white px-4 py-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Bot className="size-4" />
            AI Agent Mock
          </div>

          <nav className="mt-8 space-y-2">
            {["CMS", "CRM", "Admin"].map((workspace) => (
              <Button
                key={workspace}
                className="w-full justify-start"
                variant={activeWorkspace === workspace ? "default" : "secondary"}
                onClick={() => setActiveWorkspace(workspace)}
              >
                {workspace}
              </Button>
            ))}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-5">
            <div>
              <p className="text-sm font-medium">Platform Agent</p>
              <p className="text-xs text-zinc-500">{t("app.subtitle")}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setLayoutMode("native")}>
                <Monitor className="size-4" />
                {t("layout.native")}
              </Button>
              <Button variant="outline" onClick={() => setLayoutMode("pip")}>
                <PictureInPicture2 className="size-4" />
                {t("layout.pip")}
              </Button>
              <Button variant="outline" onClick={() => setLayoutMode("split")}>
                <PanelRight className="size-4" />
                {t("layout.split")}
              </Button>
              <div
                className="ml-2 flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 p-1"
                aria-label={t("language.label")}
              >
                {(Object.keys(localeLabels) as Locale[]).map((nextLocale) => (
                  <Button
                    key={nextLocale}
                    className="h-7 px-2 text-xs"
                    variant={locale === nextLocale ? "default" : "secondary"}
                    onClick={() => setLocale(nextLocale)}
                  >
                    {localeLabels[nextLocale]}
                  </Button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid flex-1 grid-cols-[1fr_360px] gap-4 p-5">
            <div className="min-w-0 rounded-lg border border-zinc-200 bg-white">
              <div className="flex h-10 items-center gap-2 border-b border-zinc-200 px-4">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-zinc-500">
                  {t("browser.placeholderChrome", {
                    workspace: activeWorkspace,
                  })}
                </span>
              </div>
              <div className="grid h-[calc(100vh-8.75rem)] place-items-center bg-zinc-100">
                <div className="text-center">
                  <p className="text-2xl font-semibold">
                    {t("browser.placeholderTitle")}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    {t("browser.placeholderSubtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("agent.control")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-md bg-zinc-50 p-3 text-sm">
                    <p className="text-xs text-zinc-500">
                      {t("agent.currentMode")}
                    </p>
                    <p className="mt-1 font-medium">{layoutMode}</p>
                  </div>
                  <Button className="w-full" onClick={runPreviewAgent}>
                    <Play className="size-4" />
                    {t("agent.runPreview")}
                  </Button>
                  <div className="rounded-md border border-zinc-200 p-3 text-sm">
                    {previewWorkspace
                      ? t("agent.previewResult", {
                          workspace: previewWorkspace,
                        })
                      : t("agent.waiting")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("runtime.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-600">
                  <p>Electron: {versions?.electron ?? "-"}</p>
                  <p>Chrome: {versions?.chrome ?? "-"}</p>
                  <p>Node: {versions?.node ?? "-"}</p>
                  <p>{t("runtime.sqlite")}</p>
                  <p>{t("runtime.openai")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { Bot, Monitor, PanelRight, PictureInPicture2, Play } from "lucide-react";
import { createPreviewGraph } from "@/agent/graph";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentStore } from "@/store/agent-store";

type Versions = {
  electron: string;
  chrome: string;
  node: string;
};

export function App() {
  const { layoutMode, activeWorkspace, setLayoutMode, setActiveWorkspace } =
    useAgentStore();
  const [versions, setVersions] = useState<Versions | null>(null);
  const [graphResult, setGraphResult] = useState("대기 중");

  useEffect(() => {
    window.agentShell?.versions().then(setVersions);
  }, []);

  async function runPreviewAgent() {
    const graph = createPreviewGraph();
    const result = await graph.invoke({ goal: activeWorkspace });
    setGraphResult(String(result.nextAction ?? "No action"));
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
              <p className="text-xs text-zinc-500">
                Electron + React + LangGraph 기본 구동 확인
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setLayoutMode("native")}>
                <Monitor className="size-4" />
                Native
              </Button>
              <Button variant="outline" onClick={() => setLayoutMode("pip")}>
                <PictureInPicture2 className="size-4" />
                PIP
              </Button>
              <Button variant="outline" onClick={() => setLayoutMode("split")}>
                <PanelRight className="size-4" />
                Split
              </Button>
            </div>
          </header>

          <div className="grid flex-1 grid-cols-[1fr_360px] gap-4 p-5">
            <div className="min-w-0 rounded-lg border border-zinc-200 bg-white">
              <div className="flex h-10 items-center gap-2 border-b border-zinc-200 px-4">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-zinc-500">
                  {activeWorkspace} WebContentsView placeholder
                </span>
              </div>
              <div className="grid h-[calc(100vh-8.75rem)] place-items-center bg-zinc-100">
                <div className="text-center">
                  <p className="text-2xl font-semibold">WebView 영역</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    다음 단계에서 실제 SaaS WebContentsView를 붙입니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-md bg-zinc-50 p-3 text-sm">
                    <p className="text-xs text-zinc-500">현재 모드</p>
                    <p className="mt-1 font-medium">{layoutMode}</p>
                  </div>
                  <Button className="w-full" onClick={runPreviewAgent}>
                    <Play className="size-4" />
                    Preview Graph 실행
                  </Button>
                  <div className="rounded-md border border-zinc-200 p-3 text-sm">
                    {graphResult}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Runtime</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-600">
                  <p>Electron: {versions?.electron ?? "-"}</p>
                  <p>Chrome: {versions?.chrome ?? "-"}</p>
                  <p>Node: {versions?.node ?? "-"}</p>
                  <p>SQLite schema: ready</p>
                  <p>OpenAI SDK: installed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

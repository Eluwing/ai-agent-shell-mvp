# Electron Architecture Guide

작성일: 2026-04-25

## 목적

이 문서는 `ai-agent-shell-mvp`의 Electron main process, preload, IPC, browser automation, agent runtime 디렉토리 구조를 정의한다.

이 프로젝트는 단순한 Electron wrapper가 아니라, Electron 내부의 browser surface를 통해 SaaS 시스템을 열고 AI agent가 자동화하는 앱이다. 따라서 다음 영역의 경계를 처음부터 명확히 해야 한다.

- Electron app/window lifecycle
- Preload bridge
- Typed IPC contract
- Workspace/WebContentsView management
- Browser automation tools
- Agent runtime
- Approval gate
- SQLite persistence
- Security policy

MVP라도 경계를 흐리면 `ipcRenderer.invoke("some-string")`, `webContents` 직접 접근, LLM/tool 실행 로직이 UI에 섞이는 부채가 빠르게 생긴다.

## 핵심 원칙

### 1. Renderer, preload, main의 책임을 분리한다

```txt
Renderer React
  UI, local UI state, typed API 호출

Preload
  제한된 API만 window에 노출

Electron Main
  BrowserWindow, WebContentsView, IPC handlers, DB, browser automation, agent runtime
```

Renderer는 Node API, `ipcRenderer`, `webContents`, CDP를 직접 알면 안 된다.

### 2. IPC 문자열은 한 곳에만 둔다

`ipcRenderer.invoke("runtime:versions")` 같은 문자열 호출은 preload 내부에만 있어야 한다.

IPC channel, request, response 타입은 `src/shared/ipc/`에서 관리한다.

### 3. Agent runtime은 React feature와 분리한다

React의 `src/features/agent`는 UI와 renderer state를 담당한다.

실제 LLM 호출, LangGraph 실행, browser tool 실행은 Electron main의 `agent-runtime`이 담당한다.

```txt
src/features/agent
  Agent UI

electron/main/agent-runtime
  Agent execution engine
```

### 4. Browser automation은 adapter 뒤에 숨긴다

Agent runtime이 Electron `webContents`나 CDP를 직접 다루면 안 된다.

권장 흐름:

```txt
Agent Runtime
  -> BrowserTool interface
  -> Browser Adapter
  -> Electron webContents / CDP
```

이렇게 해야 나중에 Electron webContents, CDP, Playwright-like interface를 교체하거나 병행할 수 있다.

### 5. 위험한 action은 approval gate를 통과한다

다음 action은 agent가 임의로 실행하면 안 된다.

- 삭제
- 제출
- 전송
- 결제 또는 결제 예약
- 권한 변경
- 민감정보 입력
- 외부 업로드
- 계정 생성/권한 생성

위험한 action은 `approval-gate`에서 판단하고, renderer에서 사용자 확인을 받아야 한다.

## 추천 최종 구조

```txt
electron/
  main/
    app/
      create-main-window.ts
      window-options.ts
      app-lifecycle.ts

    ipc/
      register-ipc-handlers.ts
      ipc-handler-context.ts

    runtime/
      runtime-handlers.ts

    workspace/
      workspace-handlers.ts
      workspace-view-manager.ts
      workspace-session-manager.ts
      workspace-types.ts

    browser/
      tools/
        capture-page.ts
        read-dom.ts
        click.ts
        type-text.ts
        navigate.ts
        wait-for.ts

      adapters/
        electron-browser-adapter.ts
        cdp-browser-adapter.ts

      security/
        permission-policy.ts
        navigation-policy.ts

      types/
        browser-tool-types.ts

    agent-runtime/
      graphs/
        agent-graph.ts

      runs/
        run-agent.ts
        agent-runner.ts

      tools/
        tool-registry.ts
        tool-executor.ts

      approvals/
        approval-gate.ts

      adapters/
        openai-responses-adapter.ts

      types/
        agent-runtime-types.ts

    db/
      create-db.ts
      db-path.ts

    config/
      env.ts
      app-config.ts

    logger/
      logger.ts

    main.ts

  preload/
    index.ts
    expose-api.ts

src/
  shared/
    ipc/
      channels.ts
      contracts/
        runtime-contract.ts
        workspace-contract.ts
        browser-contract.ts
        agent-contract.ts
      electron-api.ts
```

## Directory 역할 상세

### `electron/main/app/`

Electron 앱과 window lifecycle을 담당한다.

들어갈 것:

- `BrowserWindow` 생성
- dev/prod URL loading
- window option
- app activate 처리
- window-all-closed 처리

예:

```txt
electron/main/app/create-main-window.ts
electron/main/app/window-options.ts
electron/main/app/app-lifecycle.ts
```

여기에는 browser automation, agent runtime, DB query 로직을 넣지 않는다.

### `electron/main/ipc/`

IPC handler 등록의 진입점이다.

```txt
electron/main/ipc/register-ipc-handlers.ts
electron/main/ipc/ipc-handler-context.ts
```

`register-ipc-handlers.ts`는 feature별 handler를 모아서 등록한다.

예:

```ts
registerRuntimeHandlers(ctx);
registerWorkspaceHandlers(ctx);
registerBrowserHandlers(ctx);
registerAgentHandlers(ctx);
```

`ipc-handler-context.ts`는 handler가 공유하는 의존성을 담는다.

예:

```ts
export type IpcHandlerContext = {
  mainWindow: BrowserWindow;
  workspaceViewManager: WorkspaceViewManager;
  db: AppDatabase;
  logger: Logger;
};
```

handler가 전역 singleton에 직접 의존하지 않게 하기 위한 구조다.

### `electron/main/runtime/`

앱 runtime 정보를 제공하는 IPC handler를 둔다.

예:

```txt
electron/main/runtime/runtime-handlers.ts
```

초기 기능:

- Electron version
- Chrome version
- Node version
- app version

### `electron/main/workspace/`

SaaS workspace와 WebContentsView lifecycle을 담당한다.

```txt
electron/main/workspace/workspace-handlers.ts
electron/main/workspace/workspace-view-manager.ts
electron/main/workspace/workspace-session-manager.ts
electron/main/workspace/workspace-types.ts
```

담당:

- workspace open/close
- active workspace 전환
- workspace별 session partition
- WebContentsView 생성/attach/detach
- workspace bounds 설정
- workspace navigation

`workspace-view-manager.ts`는 핵심 클래스가 된다.

예상 interface:

```ts
class WorkspaceViewManager {
  openWorkspace(input: OpenWorkspaceInput): Promise<OpenWorkspaceResult>;
  setBounds(input: SetWorkspaceBoundsInput): void;
  getActiveView(): WorkspaceView | null;
  closeWorkspace(id: string): Promise<void>;
}
```

### `electron/main/browser/`

브라우저 조작 layer다.

Agent runtime은 이 layer를 통해 SaaS 화면을 조작한다.

```txt
electron/main/browser/
  tools/
  adapters/
  security/
  types/
```

#### `browser/tools/`

구체적인 browser action 구현이다.

예:

```txt
capture-page.ts
read-dom.ts
click.ts
type-text.ts
navigate.ts
wait-for.ts
```

각 tool은 가능하면 작고 단일 책임을 가진다.

#### `browser/adapters/`

Electron webContents, CDP 등 외부 구현체를 내부 browser tool interface에 맞춘다.

예:

```txt
electron-browser-adapter.ts
cdp-browser-adapter.ts
```

#### `browser/security/`

navigation, permission, download, popup 같은 browser 보안 정책을 둔다.

예:

```txt
permission-policy.ts
navigation-policy.ts
```

SaaS 자동화 앱에서는 보안 정책이 product logic만큼 중요하다.

#### `browser/types/`

browser tool input/output 타입을 둔다.

예:

```ts
export type BrowserClickInput = {
  workspaceId: string;
  x: number;
  y: number;
};
```

### `electron/main/agent-runtime/`

실제 agent 실행 엔진이다.

```txt
agent-runtime/
  graphs/
  runs/
  tools/
  approvals/
  adapters/
  types/
```

#### `agent-runtime/graphs/`

LangGraph graph 또는 agent workflow graph를 둔다.

#### `agent-runtime/runs/`

agent run lifecycle을 담당한다.

예:

```txt
run-agent.ts
agent-runner.ts
```

#### `agent-runtime/tools/`

agent가 사용할 tool registry와 executor를 둔다.

예:

```txt
tool-registry.ts
tool-executor.ts
```

#### `agent-runtime/approvals/`

approval gate를 둔다.

예:

```txt
approval-gate.ts
```

위험한 tool call이 실행되기 전에 승인 필요 여부를 판단한다.

#### `agent-runtime/adapters/`

LLM provider adapter를 둔다.

예:

```txt
openai-responses-adapter.ts
anthropic-adapter.ts
```

초기에는 OpenAI Responses API만 구현하더라도 provider lock-in을 피하기 위해 adapter boundary를 둔다.

### `electron/main/db/`

SQLite connection과 DB path를 관리한다.

```txt
create-db.ts
db-path.ts
```

React `src/db/schema.ts`는 schema 정의를 담당하고, 실제 DB connection은 Electron main process에 둔다.

나중에 커지면 다음처럼 확장한다.

```txt
electron/main/db/
  create-db.ts
  db-path.ts
  migrations.ts
  repositories/
    agent-run-repository.ts
    workspace-repository.ts
    timeline-repository.ts
```

### `electron/main/config/`

앱 설정과 환경 값을 관리한다.

예:

```txt
env.ts
app-config.ts
```

들어갈 것:

- dev/prod 여부
- log level
- DB path
- default workspace URL
- feature flag

API key 같은 민감정보는 코드에 하드코딩하지 않는다.

### `electron/main/logger/`

main process logging을 담당한다.

초기에는 `console` wrapper여도 되지만, 나중에 `pino` 같은 logger로 바꿀 수 있게 한 곳으로 모은다.

### `electron/preload/`

Renderer에 노출할 안전한 API만 담당한다.

```txt
electron/preload/index.ts
electron/preload/expose-api.ts
```

규칙:

- Node API 직접 노출 금지
- `ipcRenderer` 직접 노출 금지
- raw channel string 노출 금지
- `src/shared/ipc/electron-api.ts` 타입과 일치하는 함수만 노출

예:

```ts
contextBridge.exposeInMainWorld("agentShell", electronApi);
```

### `src/shared/ipc/`

Renderer와 Electron main 사이의 typed contract를 둔다.

```txt
src/shared/ipc/
  channels.ts
  contracts/
    runtime-contract.ts
    workspace-contract.ts
    browser-contract.ts
    agent-contract.ts
  electron-api.ts
```

#### `channels.ts`

IPC channel 문자열을 한 곳에 모은다.

예:

```ts
export const IPC_CHANNELS = {
  runtimeVersions: "runtime:versions",
  workspaceOpen: "workspace:open",
  browserCapturePage: "browser:capture-page",
} as const;
```

#### `contracts/`

request/response 타입을 둔다.

예:

```ts
export type RuntimeVersionsResponse = {
  electron: string;
  chrome: string;
  node: string;
};
```

#### `electron-api.ts`

preload가 renderer에 노출하는 최종 API 타입이다.

예:

```ts
export type ElectronApi = {
  runtime: {
    versions: () => Promise<RuntimeVersionsResponse>;
  };
  workspace: {
    open: (input: OpenWorkspaceInput) => Promise<OpenWorkspaceResult>;
  };
};
```

`src/vite-env.d.ts`는 이 타입을 import해서 `window.agentShell` 타입을 선언한다.

## 현재 코드에서 이동 예정

현재 파일을 이 구조로 옮기면 다음과 같다.

```txt
electron/main.cjs
-> electron/main/main.ts
-> electron/main/app/create-main-window.ts
-> electron/main/app/app-lifecycle.ts
-> electron/main/ipc/register-ipc-handlers.ts
-> electron/main/runtime/runtime-handlers.ts

electron/preload.cjs
-> electron/preload/index.ts
-> electron/preload/expose-api.ts

src/vite-env.d.ts
-> src/shared/ipc/electron-api.ts 타입을 참조하도록 갱신
```

## 도입 순서

실제 리팩토링은 다음 순서로 진행한다.

```txt
1. src/shared/ipc 생성
2. electron/preload 구조 분리
3. electron/main/app 구조 분리
4. electron/main/ipc handler context 생성
5. runtime versions IPC를 새 구조로 이동
6. build/start 확인
7. workspace manager skeleton 생성
8. browser tool interface skeleton 생성
9. agent-runtime skeleton 생성
10. commit/push
```

## 금지할 패턴

### Renderer에서 raw IPC 호출 금지

피해야 할 예:

```ts
ipcRenderer.invoke("runtime:versions");
```

권장:

```ts
window.agentShell.runtime.versions();
```

### Renderer에서 Electron object 직접 사용 금지

피해야 할 예:

```ts
import { ipcRenderer } from "electron";
```

Renderer는 Electron 패키지를 직접 import하지 않는다.

### Agent runtime에서 webContents 직접 접근 금지

피해야 할 예:

```ts
runAgent({ webContents });
```

권장:

```ts
runAgent({ browserTools });
```

### main process에 모든 handler 몰아넣기 금지

피해야 할 예:

```txt
electron/main.ts
  1000 lines of window, IPC, DB, browser, agent logic
```

기능별 handler와 manager로 분리한다.


# React Directory Structure Guide

작성일: 2026-04-25

## 목적

이 문서는 `ai-agent-shell-mvp`의 React renderer 디렉토리 구조를 정의한다.

이 앱은 단순한 화면 앱이 아니라 Electron 내부에서 SaaS workspace를 열고, AI agent가 browser automation을 수행하는 데스크톱 앱이다. 따라서 시간이 지나면 다음 영역이 빠르게 커질 가능성이 높다.

- Agent run
- Browser tools
- Approval flow
- Action timeline
- Workspace/session
- Layout mode
- Runtime/IPC

초기부터 기능별 응집도를 유지하면서도, 파일의 역할을 쉽게 찾을 수 있는 구조를 목표로 한다.

## 핵심 원칙

### 1. 전역 역할별 폴더를 피한다

다음처럼 전역에 모든 파일을 몰아넣는 구조는 피한다.

```txt
src/
  components/
  hooks/
  actions/
  api/
  lib/
  types/
```

이 방식은 작은 앱에서는 편하지만, 기능이 커질수록 서로 다른 도메인의 파일이 같은 폴더에 섞인다.

대신 다음처럼 기능 내부에서 역할별 폴더를 사용한다.

```txt
features/workspace/components/
features/workspace/hooks/
features/workspace/actions/
features/workspace/api/
features/workspace/types/

features/agent/tools/components/
features/agent/tools/actions/
features/agent/tools/adapters/
features/agent/tools/types/
```

### 2. 큰 단위는 domain으로 나눈다

`agent`, `workspace`, `layout`, `runtime`처럼 제품의 기능 단위로 먼저 나눈다.

```txt
features/
  agent/
  workspace/
  layout/
  runtime/
```

### 3. feature 내부는 역할별로 나눈다

기본 역할 폴더는 다음을 사용한다.

```txt
components/
hooks/
stores/
actions/
api/
adapters/
lib/
constants/
types/
```

역할:

| Directory | 역할 |
| --- | --- |
| `components/` | React 컴포넌트 |
| `hooks/` | React custom hook |
| `stores/` | Zustand store 또는 client state |
| `actions/` | 사용자의 의도나 업무 단위 실행 로직 |
| `api/` | IPC, HTTP, runtime bridge 같은 외부 경계 호출 |
| `adapters/` | OpenAI, Electron, CDP 등 외부 구현체를 내부 인터페이스에 맞추는 코드 |
| `lib/` | feature 내부 순수 로직 |
| `constants/` | 상수 |
| `types/` | TypeScript 타입 |

### `services/`를 쓰지 않는 이유

`services/`는 의미가 넓어 시간이 지나면 다음 코드가 한 폴더에 섞일 가능성이 높다.

```txt
run-agent.ts
execute-tool-call.ts
preview-graph.ts
create-workspace-view.ts
approval-gate.ts
openai-client.ts
electron-ipc.ts
```

이렇게 되면 유스케이스, 외부 호출, adapter, 순수 정책 로직이 모두 `services/`에 들어가고, 결국 또 하나의 애매한 공용 폴더가 된다.

따라서 이 프로젝트에서는 `services/`를 기본 디렉토리로 사용하지 않는다. 대신 의도를 더 명확하게 나눈다.

```txt
actions/   사용자의 의도나 업무 단위 실행
api/       IPC, HTTP, runtime bridge 같은 외부 경계 호출
adapters/  외부 구현체를 내부 인터페이스로 변환
lib/       feature 내부 순수 로직
```

### 4. 큰 feature는 sub-feature로 한 번 더 나눈다

`agent`는 반드시 커질 영역이므로 처음부터 sub-feature 구조를 사용한다.

```txt
features/
  agent/
    core/
    preview/
    runs/
    tools/
    approvals/
    timeline/
```

각 sub-feature 내부에서도 필요하면 역할별 폴더를 사용한다.

```txt
features/agent/tools/
  components/
  hooks/
  actions/
  api/
  adapters/
  lib/
  constants/
  types/
  schemas/
```

### 5. shared에는 진짜 공통만 둔다

`shared/`에는 특정 도메인을 몰라도 쓸 수 있는 코드만 둔다.

좋은 예:

```txt
shared/components/ui/button.tsx
shared/components/ui/card.tsx
shared/i18n/hooks/use-translation.ts
shared/lib/cn.ts
```

나쁜 예:

```txt
shared/components/agent-control-panel.tsx
shared/lib/run-agent.ts
shared/types/workspace-types.ts
```

`agent`, `workspace`, `approval`, `timeline` 같은 도메인 지식이 있으면 `shared`가 아니라 해당 feature 안에 둔다.

## 추천 최종 구조

```txt
src/
  app/
    App.tsx
    components/
      app-shell.tsx
    providers/
      providers.tsx

  features/
    agent/
      core/
        stores/
          agent-store.ts
        types/
          agent-types.ts
        constants/
          agent-status.ts

      preview/
        components/
          preview-run-button.tsx
          preview-result-card.tsx
        hooks/
          use-agent-preview.ts
        actions/
          run-preview-agent.ts
        lib/
          preview-graph.ts
        types/
          preview-types.ts

      runs/
        components/
          agent-run-list.tsx
          agent-run-detail.tsx
          agent-run-status.tsx
        hooks/
          use-agent-runs.ts
        actions/
          start-agent-run.ts
          stop-agent-run.ts
        api/
          create-agent-run.ts
        types/
          agent-run-types.ts

      tools/
        components/
          tool-call-list.tsx
          tool-call-row.tsx
        hooks/
          use-tool-call.ts
        actions/
          execute-tool-call.ts
        adapters/
          electron-browser-tool-adapter.ts
          openai-tool-adapter.ts
        lib/
          tool-registry.ts
          validate-tool-input.ts
        constants/
          browser-tool-names.ts
        types/
          tool-types.ts
          browser-tool-types.ts
        schemas/
          browser-tool-schemas.ts

      approvals/
        components/
          approval-dialog.tsx
          approval-summary.tsx
        hooks/
          use-approval-request.ts
        stores/
          approval-store.ts
        actions/
          approve-request.ts
          reject-request.ts
        lib/
          approval-gate.ts
          format-approval-risk.ts
        types/
          approval-types.ts

      timeline/
        components/
          action-timeline.tsx
          timeline-event-row.tsx
        hooks/
          use-agent-timeline.ts
        lib/
          group-timeline-events.ts
          format-timeline-event.ts
        types/
          timeline-types.ts

    workspace/
      components/
        workspace-sidebar.tsx
        workspace-switcher.tsx
        browser-workspace-frame.tsx
        webview-placeholder.tsx
      hooks/
        use-active-workspace.ts
      stores/
        workspace-store.ts
      actions/
        open-workspace.ts
      api/
        create-workspace-view.ts
      lib/
        resolve-workspace-url.ts
      constants/
        default-workspaces.ts
      types/
        workspace-types.ts

    layout/
      components/
        layout-mode-toolbar.tsx
        language-switcher.tsx
      stores/
        layout-store.ts
      constants/
        layout-modes.ts
      types/
        layout-types.ts

    runtime/
      components/
        runtime-card.tsx
      hooks/
        use-runtime-versions.ts
      types/
        runtime-types.ts

shared/
  components/
    ui/
      button.tsx
      card.tsx

    i18n/
      hooks/
        use-translation.ts
      constants/
        translations.ts
      types/
        i18n-types.ts

  hooks/
    use-disclosure.ts
    use-debounce.ts

  lib/
    cn.ts

  db/
    schema.ts

  main.tsx
  styles.css
  vite-env.d.ts
```

## Directory 역할 상세

### `app/`

앱 전체 조립을 담당한다.

여기에는 feature의 세부 로직을 넣지 않는다.

예:

- provider 연결
- app shell 배치
- route 또는 top-level layout

```txt
app/
  App.tsx
  components/app-shell.tsx
  providers/providers.tsx
```

### `features/agent/`

AI agent domain이다.

agent는 가장 커질 가능성이 높으므로 처음부터 sub-feature로 나눈다.

#### `agent/core/`

agent 전체에서 공유하는 최소 상태와 타입을 둔다.

예:

```txt
features/agent/core/stores/agent-store.ts
features/agent/core/types/agent-types.ts
features/agent/core/constants/agent-status.ts
```

여기에는 workspace, layout, locale 상태를 넣지 않는다.

#### `agent/preview/`

MVP와 smoke test용 preview agent 기능이다.

현재 LangGraph preview graph가 이곳으로 이동한다.

예:

```txt
features/agent/preview/hooks/use-agent-preview.ts
features/agent/preview/actions/run-preview-agent.ts
features/agent/preview/lib/preview-graph.ts
```

#### `agent/runs/`

사용자 요청 하나를 받아 agent가 실행되는 단위를 담당한다.

예:

```txt
features/agent/runs/actions/start-agent-run.ts
features/agent/runs/hooks/use-agent-runs.ts
features/agent/runs/types/agent-run-types.ts
```

#### `agent/tools/`

AI가 호출할 tool 정의와 실행을 담당한다.

예상 tool:

- `browser.screenshot`
- `browser.readDom`
- `browser.click`
- `browser.type`
- `browser.navigate`
- `browser.waitFor`

AI tool input은 외부 모델에서 들어오므로 validation이 중요하다. 따라서 `schemas/`를 둘 가능성이 높다.

#### `agent/approvals/`

위험하거나 민감한 action에 대해 사용자 승인을 받는 기능이다.

예:

- 삭제
- 제출
- 전송
- 결제
- 권한 변경
- 민감정보 입력

#### `agent/timeline/`

agent 실행 중 발생한 event를 시간순으로 보여준다.

예:

- plan
- observation
- tool call
- approval request
- result
- error

### `features/workspace/`

SaaS workspace를 담당한다.

예:

- CMS
- CRM
- Admin

workspace는 나중에 URL, session partition, auth state, WebContentsView id 등을 갖게 된다.

### `features/layout/`

앱 shell의 layout 상태를 담당한다.

예:

- native mode
- PIP mode
- split screen mode
- locale

### `features/runtime/`

Electron/Chrome/Node 등 runtime 정보를 담당한다.

현재 `window.agentShell.versions()` 호출은 나중에 이 feature의 hook으로 이동한다.

### `shared/`

도메인 지식 없는 공통 코드다.

예:

- UI primitive
- i18n helper
- generic hooks
- generic utils

### `db/`

Drizzle schema와 DB 관련 타입을 둔다.

초기에는 `schema.ts` 하나로 충분하다.

나중에 커지면 다음처럼 확장한다.

```txt
db/
  schema/
    agent-runs.ts
    tool-calls.ts
    timeline-events.ts
    approval-requests.ts
    workspaces.ts
  index.ts
```

## 확장 시 추가 가능한 디렉토리

기본 세트:

```txt
components/
hooks/
stores/
actions/
api/
adapters/
lib/
constants/
types/
```

상황에 따라 추가:

| Directory | 추가 시점 |
| --- | --- |
| `schemas/` | tool input, form, IPC payload validation이 필요할 때 |
| `mappers/` | DB/API 응답을 UI model로 변환하는 코드가 많아질 때 |
| `fixtures/` | 개발용 mock data가 필요할 때 |
| `tests/` | feature 내부 테스트 파일이 많아질 때 |
| `assets/` | feature 전용 이미지, 샘플 screenshot, static asset이 필요할 때 |
| `config/` | 환경별 또는 사용자 변경 가능 설정이 많아질 때 |
| `commands/` | command palette, shortcut, app command 패턴을 도입할 때 |

## 파일 배치 판단 기준

### React 컴포넌트

```txt
components/
```

예:

```txt
features/workspace/components/workspace-sidebar.tsx
features/agent/timeline/components/action-timeline.tsx
```

### React hook

```txt
hooks/
```

단, 해당 feature 안에 둔다.

예:

```txt
features/runtime/hooks/use-runtime-versions.ts
features/agent/preview/hooks/use-agent-preview.ts
```

공통 hook만 `shared/hooks`에 둔다.

### Zustand store

```txt
stores/
```

예:

```txt
features/workspace/stores/workspace-store.ts
features/layout/stores/layout-store.ts
```

### 사용자 의도 또는 업무 단위 실행

```txt
actions/
```

예:

```txt
features/agent/runs/actions/start-agent-run.ts
features/agent/tools/actions/execute-tool-call.ts
```

`actions/`는 "무언가를 한다"에 가까운 유스케이스를 둔다. 내부에서 `api/`, `stores/`, `adapters/`, `lib/`를 조합할 수 있다.

### 외부 경계 호출

```txt
api/
```

예:

```txt
features/runtime/api/get-runtime-versions.ts
features/workspace/api/create-workspace-view.ts
features/agent/tools/api/capture-page.ts
```

`api/`는 Electron IPC, HTTP, runtime bridge, renderer-facing client 호출처럼 외부 경계를 넘는 코드를 둔다.

### 외부 구현체 adapter

```txt
adapters/
```

예:

```txt
features/agent/tools/adapters/electron-browser-tool-adapter.ts
features/agent/tools/adapters/openai-tool-adapter.ts
```

`adapters/`는 OpenAI, Electron, CDP, Playwright-like interface처럼 교체 가능한 외부 구현을 내부 인터페이스에 맞춘다.

### Feature 내부 순수 로직

```txt
lib/
```

예:

```txt
features/agent/timeline/lib/format-timeline-event.ts
features/workspace/lib/resolve-workspace-url.ts
```

`lib/`는 가능하면 side effect 없는 순수 함수와 도메인 계산 로직만 둔다.

### 상수

```txt
constants/
```

예:

```txt
features/layout/constants/layout-modes.ts
features/workspace/constants/default-workspaces.ts
```

### 타입

```txt
types/
```

예:

```txt
features/agent/tools/types/tool-types.ts
features/workspace/types/workspace-types.ts
```

## 현재 코드에서 이동 예정

현재 파일을 이 구조로 옮기면 다음과 같다.

```txt
src/App.tsx
-> src/app/App.tsx
-> src/app/components/app-shell.tsx

src/components/ui/button.tsx
-> src/shared/components/ui/button.tsx

src/components/ui/card.tsx
-> src/shared/components/ui/card.tsx

src/lib/utils.ts
-> src/shared/lib/cn.ts

src/i18n/translations.ts
-> src/shared/i18n/constants/translations.ts

src/i18n/use-translation.ts
-> src/shared/i18n/hooks/use-translation.ts

src/store/agent-store.ts
-> src/features/agent/core/stores/agent-store.ts
-> src/features/workspace/stores/workspace-store.ts
-> src/features/layout/stores/layout-store.ts

src/agent/graph.ts
-> src/features/agent/preview/lib/preview-graph.ts

src/db/schema.ts
-> 유지
```

## 도입 순서

실제 리팩토링은 다음 순서로 진행한다.

```txt
1. shared/components, shared/i18n, shared/lib 이동
2. layout feature 생성
3. workspace feature 생성
4. runtime feature 생성
5. agent/core 및 agent/preview 생성
6. app-shell에서 feature UI 조립
7. build 확인
8. 브라우저에서 KO/JA/EN 전환 확인
9. commit
10. push
```

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

### 3-1. 큰 폴더는 scope 단위로 한 번 더 나눈다

`components/`, `context/`, `hooks/`, `actions/` 같은 역할 폴더가 커지면, 기능이나 UI 범위 단위로 하위 폴더를 둔다.
이 규칙은 `app/`, `features/`, `shared/` 전반에 적용한다. 폴더가 커지면 최상위 역할 폴더에 계속 쌓아두지 말고, 먼저 scope 하위 폴더를 만든다.
기본 원칙은 "늦게 쪼개기"가 아니라 "빠르게 쪼개기"다. 앞으로 커질 가능성이 보이면 초기에 scope 폴더를 만들어 구조를 명확히 한다.

예:

```txt
app/components/shell/app-shell.tsx
app/components/title-bar/app-title-bar.tsx
app/components/title-bar/title-bar-section.tsx
app/context/title-bar/title-bar-layout-context.tsx

features/workspace/components/browser/browser-workspace-frame.tsx
features/workspace/components/tabs/workspace-tab-strip.tsx
features/workspace/components/tabs/workspace-tab.tsx
features/workspace/context/workspace-tabs-context.tsx
features/workspace/hooks/use-active-workspace.ts
```

기준:

- `app/` 아래의 UI는 shell, title bar, chrome 등 화면 범위 기준으로 나눈다.
- `features/` 아래의 UI는 feature domain 안에서 sub-feature나 scope 기준으로 나눈다.
- `shared/`는 여전히 도메인 지식이 없는 공통 코드만 둔다.

### `providers/` and `context/` scopes

- `providers/`는 여러 하위 영역을 감싸는 공급자용으로만 쓴다.
- `context/`는 특정 UI 범위 안에서만 공유할 값이 있을 때 쓴다.
- 전역 앱 설정처럼 여러 feature가 함께 써야 하는 값은 `app/providers/`에 둔다.
- 타이틀바, 탭 스트립, 특정 feature 내부 레이아웃처럼 범위가 좁은 값은 해당 영역의 `context/` 아래에 둔다.
- `shared/`에는 도메인이나 UI 범위를 아는 context를 두지 않는다.

### 3-2. import boundary를 지킨다

레이어 간 import는 아래 방향을 기본으로 한다.

```txt
app -> features, shared
features -> shared, 자기 feature 내부
shared -> 아무 feature도 import하지 않음
```

규칙:

- `app`은 feature의 public surface만 조립한다.
- `features`는 다른 feature의 내부 파일을 직접 import하지 않는다.
- feature 간 공유가 필요하면 `shared/`의 contract, helper, UI primitive를 우선 사용한다.
- 꼭 필요하면 의존하는 feature의 매우 얇은 public API만 노출하고, 깊은 내부 경로 import는 피한다.
- `shared/`는 어떤 feature도 알지 못하는 순수 공통 코드만 둔다.

### 3-3. 파일 네이밍 규칙

AI와 사람이 같은 패턴으로 파일을 만들 수 있게, 이름은 다음 규칙을 따른다.

```txt
component  -> kebab-case.tsx
hook       -> use-xxx.ts
store      -> xxx-store.ts
action     -> verb-noun.ts
type       -> xxx-types.ts
constant   -> xxx.ts 또는 xxx-options.ts
context    -> xxx-context.tsx
provider   -> xxx-provider.tsx
```

예:

```txt
workspace-tab-strip.tsx
use-runtime-versions.ts
layout-store.ts
run-preview-agent.ts
workspace-types.ts
locale-options.ts
title-bar-layout-context.tsx
title-bar-layout-provider.tsx
```

### 3-4. barrel export 정책

기본적으로 `index.ts` barrel export는 만들지 않는다.

이유:

- import 경로가 짧아지는 대신 순환 의존성이 숨기 쉽다.
- AI가 자동 생성할 때 불필요한 public surface가 늘어난다.
- 파일 위치와 의존 방향을 명시적으로 보기 어렵다.

예외:

- feature의 명확한 public API를 정말 제한적으로 노출할 때만 허용한다.
- `components/` 하위 폴더마다 `index.ts`를 자동 생성하지 않는다.

### 3-5. state ownership

상태는 다음 기준으로 둔다.

```txt
feature 전역 상태        -> stores/
단일 컴포넌트 UI 상태    -> component local state
runtime / IPC 응답 캐시  -> hooks/ 또는 api/ 근처
DB/API 응답 변환        -> mappers/
계산 가능한 값          -> store에 저장하지 말고 lib 또는 selector로 계산
```

규칙:

- Zustand에는 장기 보관이 필요한 상태만 둔다.
- 파생 가능한 값은 store에 중복 저장하지 않는다.
- UI 토글처럼 범위가 매우 좁으면 component local state를 우선 고려한다.

### 3-6. test placement

테스트는 scope를 따라 둔다.

```txt
작은 순수 함수 테스트      -> 같은 폴더에 colocate 가능
테스트가 많아진 feature     -> feature/tests/
IPC contract 테스트         -> shared/ipc 또는 Electron 쪽 테스트
```

규칙:

- 순수 함수는 가까운 곳에서 테스트한다.
- feature가 커지면 `tests/`로 올린다.
- Electron IPC contract는 renderer feature 테스트와 섞지 않는다.

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
shared/ipc/contracts/workspace-contract.ts
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
      shell/
        app-shell.tsx
      title-bar/
        app-title-bar.tsx
        title-bar-section.tsx
        title-bar-control-group.tsx
    providers/
      providers.tsx
    context/
      title-bar/
        title-bar-layout-context.tsx
    hooks/
      use-element-width.ts

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
        tabs/
          workspace-tab-strip.tsx
          workspace-tab.tsx
        browser/
          browser-workspace-frame.tsx
          webview-placeholder.tsx
        sidebar/
          workspace-sidebar.tsx
          workspace-switcher.tsx
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
        toggles/
          view-controls.tsx
          view-toggle-button.tsx
        toolbar/
          layout-mode-toolbar.tsx
          toolbar-segment.tsx
        switcher/
          language-switcher.tsx
      stores/
        layout-store.ts
      constants/
        layout-modes.ts
        locale-options.ts
      lib/
        get-locale-icon.tsx
      types/
        layout-types.ts

    runtime/
      components/
        cards/
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

  ipc/
    channels.ts
    contracts/
      agent-contract.ts
      browser-contract.ts
      runtime-contract.ts
      workspace-contract.ts
    electron-api.ts

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

`app/providers/`에는 앱 전체를 감싸는 전역 provider를 둔다.
`app/context/`에는 특정 앱 영역에서만 쓰는 로컬 context를 둔다.
예를 들어 타이틀바 전용 레이아웃 정보는 `app/context/title-bar/` 아래에 둔다.

```txt
app/
  App.tsx
  components/
    shell/
      app-shell.tsx
    title-bar/
      app-title-bar.tsx
      title-bar-section.tsx
      title-bar-control-group.tsx
  providers/providers.tsx
  context/
    title-bar/
      title-bar-layout-context.tsx
  hooks/
    use-element-width.ts
```

### `features/agent/`

AI agent domain이다.

agent는 가장 커질 가능성이 높으므로 처음부터 sub-feature로 나눈다.
현재 구현은 더 강하게 scope 단위로 쪼개는 방향을 따른다. `ui/`, `preview/`, `runs/`, `tools/`, `approvals/`, `timeline/` 아래에서 다시 `cards/`, `panels/`, `controls/`, `dialogs/`, `summaries/`, `lists/`, `rows/`처럼 좁혀서 관리한다.

실제 현재 구조 예:

```txt
features/agent/ui/
  cards/
    agent-status-card.tsx
  panels/
    agent-control-panel.tsx

features/agent/preview/
  components/
    cards/
      preview-result-card.tsx
    controls/
      preview-run-button.tsx
  hooks/
    use-agent-preview.ts
  actions/
    run-preview-agent.ts
  lib/
    preview-graph.ts

features/agent/approvals/
  components/
    dialogs/
      approval-dialog.tsx
    summaries/
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

features/agent/tools/
  components/
    lists/
      tool-call-list.tsx
    rows/
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

features/agent/runs/
  components/
    list/
      agent-run-list.tsx
    detail/
      agent-run-detail.tsx
    status/
      agent-run-status.tsx
  hooks/
    use-agent-runs.ts
  actions/
    start-agent-run.ts
    stop-agent-run.ts
  api/
    create-agent-run.ts

features/agent/timeline/
  components/
    list/
      action-timeline.tsx
    rows/
      timeline-event-row.tsx
  hooks/
    use-agent-timeline.ts
  lib/
    group-timeline-events.ts
    format-timeline-event.ts
```

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

현재 구현은 workspace도 scope 단위로 나눈다. `tabs/`, `browser/`, `sidebar/`처럼 화면 역할 기준으로 분리하고, 각 scope 아래에서 다시 세부 컴포넌트를 나눈다.

실제 현재 구조 예:

```txt
features/workspace/
  components/
    tabs/
      workspace-tab-strip.tsx
      workspace-tab.tsx
    browser/
      browser-workspace-frame.tsx
      webview-placeholder.tsx
    sidebar/
      workspace-sidebar.tsx
      workspace-switcher.tsx
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
```

workspace는 나중에 URL, session partition, auth state, WebContentsView id 등을 갖게 된다.

### `features/layout/`

앱 shell의 layout 상태를 담당한다.

`layout`은 빠르게 scope 하위 폴더로 나눈다. 현재도 컨트롤 성격에 따라 분리해서 둔다.

권장 구조 예:

```txt
features/layout/
  components/
    toggles/
      view-controls.tsx
      view-toggle-button.tsx
    toolbar/
      layout-mode-toolbar.tsx
      toolbar-segment.tsx
    switcher/
      language-switcher.tsx
  stores/
    layout-store.ts
  constants/
    layout-modes.ts
    locale-options.ts
  lib/
    get-locale-icon.tsx
  types/
    layout-types.ts
```

현재 코드 예:

```txt
features/layout/
  components/
    toggles/
      view-controls.tsx
      view-toggle-button.tsx
    toolbar/
      layout-mode-toolbar.tsx
      toolbar-segment.tsx
    switcher/
      language-switcher.tsx
  constants/
    layout-modes.ts
    locale-options.ts
  lib/
    get-locale-icon.tsx
  stores/
    layout-store.ts
  types/
    layout-types.ts
```

예:

- native mode
- PIP mode
- split screen mode
- sidebar visibility
- inspector visibility
- locale

layout은 단순 UI 컴포넌트가 아니라 앱 shell의 보기 모드, 패널 상태, 언어 토글 같은 **전역 레이아웃 정책**을 함께 담는다.

### `features/runtime/`

Electron/Chrome/Node 등 runtime 정보를 담당한다.

현재 `window.agentShell.versions()` 호출은 나중에 이 feature의 hook으로 이동한다.

현재 코드 예:

```txt
features/runtime/
  components/
    cards/
      runtime-card.tsx
  hooks/
    use-runtime-versions.ts
  types/
    runtime-types.ts
```

runtime은 아직 작지만, runtime 정보 카드나 버전 조회 hook이 더 늘어나면 `cards/`와 `hooks/` 기준으로 더 나눌 수 있다.

### `shared/`

도메인 지식 없는 공통 코드다.

예:

- UI primitive
- i18n helper
- generic hooks
- generic utils

### `shared/ipc/`

renderer가 preload API와 통신하기 위한 타입, 채널, contract만 둔다.

예:

```txt
shared/ipc/
  channels.ts
  contracts/
    agent-contract.ts
    browser-contract.ts
    runtime-contract.ts
    workspace-contract.ts
  electron-api.ts
```

규칙:

- raw `ipcRenderer`를 React feature로 노출하지 않는다.
- `Electron` 객체를 React feature로 직접 넘기지 않는다.
- `webContents`도 renderer feature에 직접 노출하지 않는다.
- feature는 `shared/ipc`의 contract와 typed API만 통해 통신한다.

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
features/workspace/components/sidebar/workspace-sidebar.tsx
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

## Migration History

아래는 현재 구조로 옮기며 정리한 대표 이동 이력이다.

```txt
src/App.tsx
-> src/app/App.tsx
-> src/app/components/shell/app-shell.tsx
-> src/app/components/title-bar/app-title-bar.tsx
-> src/app/components/title-bar/title-bar-section.tsx
-> src/app/components/title-bar/title-bar-control-group.tsx
-> src/app/context/title-bar/title-bar-layout-context.tsx
-> src/app/hooks/use-element-width.ts

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

## Current Structure

현재 코드베이스는 위 구조를 대부분 반영했다.

## Future Expansion

앞으로 새 feature를 추가할 때는 다음 순서로 확장한다.

```txt
1. shared/components, shared/i18n, shared/lib 이동
2. layout feature에 새 scope 추가
3. workspace feature에 새 scope 추가
4. runtime feature에 새 scope 추가
5. agent/core 및 agent 하위 scope 추가
6. app-shell에서 feature UI 조립
7. build 확인
8. 브라우저에서 동작 확인
9. commit
10. push
```

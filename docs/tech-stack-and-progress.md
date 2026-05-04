# AI Agent Mock: Tech Stack And Progress

작성일: 2026-04-25

## 프로젝트 목표

React + Electron 기반의 데스크톱 AI 에이전트 앱을 만든다.

앱 내부에서 SaaS 시스템을 WebContentsView 또는 유사한 브라우저 컨테이너로 열고, AI 에이전트가 DOM, screenshot, browser action을 이용해 사용자의 업무를 자동화하는 구조를 목표로 한다.

초기 컨셉은 다음 기능을 포함한다.

- Electron native app 안에서 SaaS 화면 표시
- AI agent chat/control panel
- SaaS별 session 분리
- DOM 기반 browser automation
- screenshot 또는 vision 기반 fallback
- PIP mode
- split screen mode
- action timeline과 실행 로그
- 사용자의 승인/중지/retry flow

## 선택한 기술 스택

| 영역 | 선택 |
| --- | --- |
| Desktop shell | Electron |
| Renderer UI | React |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI components | shadcn/ui 스타일 구성 |
| Icons | lucide-react |
| UI state | Zustand |
| Local database | SQLite |
| ORM | Drizzle ORM |
| Agent workflow | LangGraph.js |
| LLM provider | OpenAI Responses API |
| Browser control | Electron webContents / CDP / WebContentsView |
| Packaging | electron-builder |

## 선정 이유

### Electron

이 프로젝트는 일반 웹 앱이 아니라 로컬 데스크톱 환경에서 SaaS 화면을 품고, 그 화면을 AI가 조작해야 한다.

Electron은 Chromium 기반이기 때문에 SaaS 화면을 실제 브라우저에 가깝게 렌더링할 수 있고, `webContents`를 통해 navigation, screenshot, input, DOM execution, permission, session 등을 제어할 수 있다.

Tauri도 대안이지만 OS별 WebView를 사용하기 때문에 Chromium/CDP 중심의 자동화에는 Electron이 더 적합하다. 브라우저 확장 프로그램도 DOM 조작에는 강하지만 PIP, split screen, local database, native shell UX까지 통합하기에는 제약이 크다.

### React

AI agent app은 chat, browser workspace, tabs, action timeline, approval modal, split layout 등 상태가 많은 UI를 가진다.

React는 Electron renderer UI를 구성하기에 생태계가 넓고, shadcn/ui, Zustand, Vite와의 조합이 안정적이다.

### TypeScript

이 프로젝트는 IPC contract, browser automation tool schema, agent state, DB schema, workflow state처럼 타입으로 보호해야 할 경계가 많다.

초기부터 TypeScript를 쓰면 main process, preload, renderer, agent runtime 사이의 계약을 점진적으로 안전하게 만들 수 있다.

### Vite

Electron renderer 개발에 빠른 dev server와 단순한 build pipeline이 필요하다.

Vite는 React + TypeScript 앱을 가볍게 시작하기 좋고, Tailwind CSS 및 shadcn/ui와의 통합도 쉽다.

### Tailwind CSS

이 앱은 운영 도구에 가까운 UI다. 작은 버튼, 탭, 패널, 로그, 카드, 모달, split layout처럼 반복되는 인터페이스가 많다.

Tailwind는 빠르게 조합하기 좋고, runtime CSS-in-JS 의존이 없어 Electron renderer에서도 단순하게 운용할 수 있다.

### shadcn/ui 스타일 구성

shadcn/ui는 완성된 패키지에 의존하기보다 컴포넌트 소스를 프로젝트 안에 두고 소유하는 방식이다.

이 프로젝트처럼 agent control, approval, browser workspace 등 커스텀이 많은 제품에는 MUI나 Ant Design보다 더 유연하다.

현재는 shadcn/ui 전체 CLI 세팅 대신 Button/Card에 필요한 최소 컴포넌트만 직접 구성했다.

### Zustand

현재 앱에는 서버 상태보다 로컬 UI 상태가 많다.

예:

- 현재 workspace
- layout mode
- PIP/split/native mode
- 선택된 browser session
- agent 실행 상태
- timeline filter

Zustand는 boilerplate가 적고 React hook 기반으로 단순하게 사용할 수 있어 MVP 단계의 전역 UI 상태에 적합하다.

### SQLite

초기 앱은 서버 없이 로컬에서 실행되는 데스크톱 앱이다.

저장할 데이터는 다음과 같다.

- agent run
- tool call history
- action timeline
- workflow template
- approval log
- screenshot metadata
- SaaS workspace metadata

SQLite는 로컬 앱에서 배포와 운영이 단순하고, 로그 검색과 migration을 처리하기 좋다.

### Drizzle ORM

Drizzle은 TypeScript 친화적인 ORM이며 SQLite schema를 코드로 관리하기 좋다.

Prisma도 대안이지만 Electron 로컬 앱에서는 엔진, 번들, migration이 상대적으로 무겁다. Drizzle은 현재 앱의 크기와 방향에 더 잘 맞는다.

### LangGraph.js

이 앱의 agent는 단순 chat completion이 아니라 장기 실행 workflow를 가진다.

예상 flow:

1. 사용자 목표 이해
2. 현재 SaaS 화면 관찰
3. DOM/screenshot 수집
4. 다음 action 계획
5. action 실행
6. 결과 검증
7. 실패 시 retry 또는 fallback
8. 민감하거나 위험한 action 전 사용자 승인

LangGraph는 agent workflow, human-in-the-loop, persistence, retry, streaming 같은 구조를 만들기 좋다.

MVP에서는 LangGraph preview graph만 넣었고, 실제 browser tool 연결은 다음 단계에서 설계한다.

### OpenAI Responses API

화면 조작 agent에는 tool calling, reasoning, screenshot 기반 computer-use style loop가 필요하다.

OpenAI Responses API는 tool call과 multimodal 입력을 중심으로 agent runtime을 구성하기 좋다.

다만 provider lock-in을 피하기 위해 나중에는 OpenAI adapter 형태로 감싸고 Anthropic, Gemini, local model을 붙일 수 있는 구조가 좋다.

### Electron webContents / CDP / WebContentsView

초기 컨셉은 WebView 내부를 Playwright처럼 조작하는 것이지만, 실제 구현은 Electron의 `webContents`를 1차 제어면으로 쓰는 방향이 적합하다.

권장 구조:

```txt
WebContentsView
  -> webContents
    -> executeJavaScript
    -> capturePage
    -> input events
    -> navigation events
    -> CDP
```

이 구조는 사용자가 보는 화면과 agent가 조작하는 화면을 일치시키기 쉽다.

Playwright를 별도 browser instance로 띄우면 자동화는 쉬울 수 있지만, 사용자가 보는 앱 화면과 agent가 조작하는 브라우저가 분리될 수 있다.

### electron-builder

Electron 앱 배포, installer, auto update, code signing을 고려하면 electron-builder가 실전 배포 흐름에 적합하다.

Electron Forge도 좋은 대안이며 공식 생태계 흐름과 잘 맞는다. 현재는 빠른 패키징과 배포 설정을 위해 electron-builder를 기본값으로 둔다.

## 현재 구현 상태

현재까지는 가장 기본적인 앱 골격과 구동 확인만 완료했다.

구현한 항목:

- Electron main process 구성
- preload bridge 구성
- React + TypeScript + Vite renderer 구성
- Tailwind CSS 설정
- shadcn/ui 스타일의 Button/Card 최소 컴포넌트 구성
- Zustand store 예시 구성
- Drizzle SQLite schema 예시 구성
- LangGraph preview graph 구성
- OpenAI SDK 설치
- Electron packaging 설정 초안
- dependency version pinning
- npm audit 0 vulnerabilities 상태 확인

## 생성한 주요 파일

```txt
package.json
package-lock.json
index.html
tsconfig.json
vite.config.ts
electron/main.cjs
electron/preload.cjs
src/main.tsx
src/app/App.tsx
src/app/components/shell/app-shell.tsx
src/app/components/title-bar/app-title-bar.tsx
src/styles.css
src/vite-env.d.ts
src/shared/lib/cn.ts
src/shared/components/ui/button.tsx
src/shared/components/ui/card.tsx
src/features/agent/core/stores/agent-store.ts
src/features/agent/preview/lib/preview-graph.ts
src/shared/i18n/constants/translations.ts
src/shared/i18n/hooks/use-translation.ts
src/shared/ipc/contracts/workspace-contract.ts
src/db/schema.ts
docs/tech-stack-and-progress.md
```

## 현재 package 기준 주요 버전

```txt
Electron 41.3.0
React 19.2.5
TypeScript 6.0.3
Vite 8.0.10
Tailwind CSS 4.2.4
@tailwindcss/vite 4.2.4
@vitejs/plugin-react 6.0.1
Zustand 5.0.12
Drizzle ORM 0.45.2
@libsql/client 0.17.3
@langchain/core 1.1.41
@langchain/langgraph 1.2.9
OpenAI SDK 6.34.0
electron-builder 26.8.1
lucide-react 1.11.0
```

`uuid` transitive dependency audit 이슈를 피하기 위해 다음 override를 추가했다.

```json
{
  "overrides": {
    "uuid": "14.0.0"
  }
}
```

## 검증한 명령

```bash
npm install
npm audit
npm run build
npm run dev
```

결과:

- `npm install` 성공
- `npm audit` 결과 `found 0 vulnerabilities`
- `npm run build` 성공
- `npm run dev`로 Vite + Electron 구동 확인
- 브라우저에서 `http://127.0.0.1:5173/` 렌더링 확인
- `Preview Graph 실행` 버튼 클릭 시 LangGraph 결과 표시 확인

## 현재 앱 화면 구성

현재 UI는 다음 placeholder 구조다.

```txt
Left sidebar
  - AI Agent Mock
  - CMS
  - CRM
  - Admin

Main header
  - Platform Agent
  - Native / PIP / Split mode buttons

Main workspace
  - WebContentsView placeholder

Right panel
  - Agent Control
  - Preview Graph 실행
  - Runtime version display
```

## 다음 단계 후보

다음 작업은 디렉토리 구조를 먼저 잡는 것이 좋다.

추천 방향:

```txt
electron/
  main/
  preload/
  browser/
  ipc/

src/
  app/
  components/
  features/
    agent/
    browser-workspace/
    layout-mode/
    timeline/
  stores/
  db/
  lib/
```

그 다음 실제 기능은 아래 순서가 좋다.

1. Electron main process 디렉토리 분리
2. WebContentsView manager 초안
3. SaaS workspace/session model
4. Renderer와 main 사이 IPC contract 정리
5. Browser automation tool interface 정의
6. DOM snapshot / screenshot tool 구현
7. Agent action timeline 저장
8. approval gate 설계
9. PIP window 구현
10. split screen layout 구현

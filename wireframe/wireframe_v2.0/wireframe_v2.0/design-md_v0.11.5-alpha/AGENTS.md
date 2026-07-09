# AGENTS.md — NE Design.md handoff

이 파일은 AI coding agent가 작업 폴더에서 **자동 로드**하는 진입 훅이다.
정책을 복제하지 않는다 — 어디를 읽고 무엇을 하지 말지만 가리킨다.
**Source of truth는 `DESIGN.md`다. 정책은 이 파일이 아니라 DESIGN.md에서 가져온다.**
**NE Design.md는 stack-agnostic foundation이다.** React/Vite baseline은 하나의 **reference adapter**이지 유일한 경로가 아니다. token/class/정책은 어느 스택에든 적용된다.

## Read order

코드를 작성하기 전에:

1. `AI_HANDOFF.md` — 실무 워크플로 / guardrail (구현 진입점)
2. `DESIGN.md` — primary source of truth (token / component / pattern / policy)
3. `README.md` — 패키지 오리엔테이션 (정책 원천 아님)

그 다음 `AI_HANDOFF.md §2A Pre-implementation Checklist`에 **먼저 답한 뒤** 코드를 작성한다.

## Entry scenario

먼저 어느 경로인지 정한다 (`AI_HANDOFF.md §2C` 참조):

- **A. 신규 React/Vite PoC (greenfield):** `src/baseline/`을 fork target으로, 자체 `src/main.jsx` / `src/App.jsx`를 새로 작성한다. 빈 vite로 시작하지 않는다.
- **B. 기존 React/Vite PoC (retrofit):** fork가 아니라 **audit이 첫 수**다. 기존 화면 구조·라우팅·데이터 흐름·business logic을 먼저 보존하고, drift(raw hex/rgba, 임의 spacing, lucide 직접 import, primitive 직접 참조, candidate/deferred)를 P0/P1/P2로 분류해 최소 변경으로 교정한다.
- **C. non-React / static HTML:** `.jsx` wrapper와 ESLint를 쓰지 않는다. baseline CSS 3종(`tokens.css`/`layout.css`/`components.css`)을 link/bundle하고 `.ne-*` class contract를 HTML에 직접 적용한다. packed/minified artifact는 먼저 무손실 언팩·렌더 동치 확인 후 audit한다.

## Non-negotiable rules (상세는 DESIGN.md / AI_HANDOFF.md §4)

- 토큰·색·rgba·폰트 weight·spacing·아이콘·component variant를 **발명하지 않는다.**
- 아이콘은 `src/baseline/icons/index.js`에서만 import한다. `lucide-react` 직접 import는 ESLint `no-restricted-imports`로 차단된다.
- `candidate` / `deferred` 항목은 즉흥 구현 금지 — **stop and report.**
- inline `style={{...}}` / inline `<style>` 금지. className + `src/baseline/` style로 표현한다.
- fork target은 `src/baseline/` 뿐이다. 그 외 `src/`는 비정책 renderer 코드이며 product로 복사하지 않는다.
- `src/_stubs/`(Dialog / Toast)는 deferred 임시 구현이다. policy source가 아니다.
- 충돌 시 우선순위: `DESIGN.md` > `AI_HANDOFF.md` > `src/baseline/`. baseline이 spec과 다르면 baseline이 틀린 것이다.
- **stack 분기:** 위의 `src/baseline/` fork · `icons/index.js` import · ESLint 차단은 **React/Vite(A/B) 경로 전용**이다. non-React/HTML(C)은 baseline CSS를 link하고 `.ne-*` class를 직접 쓰며, icon은 approved 목록 기준 inline SVG/CDN(`stroke="currentColor"`), enforcement는 §8A self-validation + PoC-authored 코드 한정 grep이다. (`AI_HANDOFF.md §2C Scenario C`)

## After generation

1차 생성 후 `AI_HANDOFF.md §8A Self-validation Pass`로 위반을 P0/P1/P2로 점검·보완하고,
구조 변경 / 신규 token·component·variant가 필요하면 `§8B`에 따라 owner decision으로 stop-and-report한다.

§8A 후, `docs/templates/NE_DESIGNMD_SELF_VALIDATION_TEMPLATE.md` 양식으로 PoC 루트
`docs/NE_DESIGNMD_SELF_VALIDATION.md` 리포트를 자동 생성하고 owner에게 전달한다 (필수 산출물).

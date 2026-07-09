# NE Design System AI Handoff — v0.11.5-alpha

NE 디자인 시스템을 NE 내부 인계 대상 / AI coding agent / 바이브코딩 작업자에게 인계할 때 실무 entrypoint 문서다. 시스템의 source of truth는 `DESIGN.md`이며, 패키지를 처음 받은 경우 먼저 `README.md`에서 패키지 구조를 확인한다.

---

## 1. Status

- Internal alpha handoff guide.
- Purpose: PoC / vibe-coding / AI coding agent implementation guidance.
- Not production-ready.
- `DESIGN.md` is the primary source of truth.
- `AI_HANDOFF.md` is the operational execution guide for AI coding agents.
- `README.md` is the package index / orientation entry, not a policy source.
- `src/baseline/` is the PoC fork target. Example implementation, not a source of truth.

---

## 2. How to Use

If you received this package as a folder or zip archive, read `README.md` first for package orientation. AI coding agents auto-load `AGENTS.md` at the package root as a thin entry hook (read-order + guardrail pointer; not a policy source).

For implementation work, use this order:

1. `AI_HANDOFF.md` — practical workflow and guardrails
2. `DESIGN.md` — primary source of truth

Rules:

1. Use `DESIGN.md` as the source of truth for tokens, components, patterns, and policies.
2. If a token, component, or pattern is missing, do not invent it.
3. Stop and report when a reference is missing, undefined, candidate, or deferred.

---

## 2A. Pre-implementation Checklist

새 화면/컴포넌트를 작성하기 전, **또는 기존 PoC를 retrofit하기 전**, AI agent는 아래 질문에 먼저 답한 뒤 진행한다. 이 checklist는 참고 문서가 아니라 **"작업 시작 전 답변" workflow enforcement**다. retrofit(Scenario B/C)에서는 기존 화면 기준으로 **식별·선언**하고(§2C retrofit checkpoint), 기존과 다르게 바꾸려는 경우만 진행 전 owner 확인.

1. 이 화면의 content width는 `spacing.container` 중 어느 variant인가? (canonical: `narrow` / `reading` / `default` / `wide` / `none` — **owner-facing 자연어 라벨·px 기준은 아래 [본문 폭] 선택지 참조**) 임의 px 사용 금지. 이 variant는 viewport가 아니라 content type 기준으로 골랐는가? 다열 grid가 좁은 화면에서 1열로 접혀야 하면 `.ne-collapse-md` / `.ne-collapse-sm` fallback을 명시했는가? (`DESIGN.md spacing.responsive_intent` 참조)
2. 이 PoC의 전달 모델은 무엇인가? (canonical: `desktop-only` / `responsive-reflow` / `mobile-desktop-split` — **owner-facing 자연어 라벨은 아래 [화면 대응 범위] 선택지 참조**) 어느 쪽이든 토큰·컴포넌트는 single source이며 모바일 전용 set을 따로 만들지 않는다. 반응형이 필요하면 어느 breakpoint(`sm` / `md` / `lg`)가 scope인지 정하고, minimum fallback 이상(자동 grid · fluid type · table mobile)은 deferred → stop and report. (`DESIGN.md spacing.responsive_intent` 참조)
3. body / main background는 `ne-surface-base`인가? 강조 surface(`ne-surface-section` 등)는 부분 구역에만 사용한다.
4. 이 화면의 **section surface intent**는? (canonical: `base-only` / `muted-band` / `mixed` — **owner-facing 자연어 라벨은 아래 [배경 구성] 선택지 참조**) — white/oatmeal을 감으로 고르지 말고 먼저 선언한다. root canvas는 항상 `ne-surface-base`. 강조 surface(`ne-surface-section`)는 구역 구분 band에만(전역 금지). raised 카드/패널은 `ne-surface-base + border/elevation`이며 `ne-surface-section` 위에서도 base — 부모보다 어두운 tint로 가라앉히지 않는다. hover를 줄 거면 실제 clickable이고, 큰 카드 hover를 surface→어두운 tint로만 처리하지 않는다. (`DESIGN.md surface_context_policy`)
5. 사용할 모든 Lucide icon이 `src/baseline/icons/index.js`에서 import되는가? 그 외 `lucide-react` 직접 import는 ESLint `no-restricted-imports`로 차단된다.
6. 사용할 컴포넌트 status가 candidate / deferred이면 stop and report가 필요한가?
7. 화면에 deferred 영역(responsive / focus trap / portal / scroll lock / toast queue)이 등장하는가? 등장하면 즉흥 결정 금지, 명시적 fallback 또는 stop and report.
8. inline `style={{...}}` 또는 inline `<style>` 태그를 쓰려는가?
9. className과 `src/baseline/` style로 표현 가능한가?
10. 도메인 컴포넌트(article card, book card, student card 등)가 필요한가?
11. 도메인 컴포넌트라면 baseline에 추가하지 않고 PoC layer에서 composition하는가? (`DESIGN.md component_scope_policy` 참조)

### §2A 선택지 (owner-facing)

PM / owner / 디자이너에게 보여줄 때는 **자연어 라벨을 먼저** 제시하고, 괄호 안 `canonical value`는 self-validation 리포트·집계용 내부값으로만 기록한다 (리포트 필드는 항상 canonical value로 적는다). Q1·Q2·Q4가 이 선택지에 대응한다.

**[본문 폭 선택]** (Q1 / `content_width`)
아래 px는 직접 입력하는 값이 **아니라** `spacing.container` 토큰의 **최대폭 기준(resolved value)**이다. 화면 크기가 아니라 **콘텐츠 성격** 기준으로 선택한다. 구현 시 임의 max-width px를 직접 쓰지 않는다.

1. **좁은 안내/폼 화면** (`narrow`, 최대 720px) — 로그인·짧은 설정·간단한 입력 폼처럼 집중해서 한 줄씩 처리하는 화면
2. **긴 글 읽기 화면** (`reading`, 최대 880px) — 아티클·지문·학습 본문처럼 읽기 흐름이 중요한 화면
3. **일반 업무 화면** (`default`, 최대 1200px) — 목록·카드·기본 대시보드·관리 화면 등 대부분의 일반 화면
4. **넓은 대시보드/그리드 화면** (`wide`, 최대 1440px) — 여러 열의 통계·비교표·밀도 높은 그리드가 필요한 화면
5. **전체 폭을 쓰는 특수 화면** (`none`, 최대폭 없음) — 풀블리드 hero·캔버스형 도구·지도/보드처럼 화면 전체를 써야 하는 경우

**[배경 구성 선택]** (Q4 / `surface_intent`)

1. **흰 배경 중심** (`base-only`) — 전체 화면은 흰 배경을 유지하고, 카드·패널은 테두리나 그림자로 구분한다.
2. **일부 구역만 연한 배경** (`muted-band`) — 기본은 흰 배경이고, 요약/추천/보조 정보처럼 묶음이 필요한 구역만 연한 배경을 쓴다.
3. **여러 구역을 구분하는 화면** (`mixed`) — 홈/대시보드처럼 여러 성격의 구역이 이어질 때 사용하며, 각 구역의 역할을 먼저 정한다.

**[화면 대응 범위 선택]** (Q2 / `delivery_model`)

1. **데스크톱 시연 중심** (`desktop-only`) — 모바일 최적화는 이번 범위가 아니며, 리포트에 미적용으로 남긴다.
2. **화면 크기에 맞춰 재배치** (`responsive-reflow`) — 같은 화면이 모바일/태블릿/데스크톱에서 자연스럽게 1열 또는 다열로 바뀐다.
3. **모바일과 데스크톱 구조 분리** (`mobile-desktop-split`) — 구조를 다르게 설계하되, 토큰과 컴포넌트 기준은 하나로 유지한다(single source).

---

## 2B. Resolution order

충돌 시 다음 순서를 따른다.

1. `DESIGN.md` — source of truth.
2. `AI_HANDOFF.md` — workflow rules.
3. `src/baseline/` — example implementation and fork target.

If baseline contradicts spec, baseline is wrong and must be updated.
Do not derive policy from baseline.
Derive policy from DESIGN.md.

`src/_stubs/` 안의 임시 구현은 절대 policy source가 아니다. `@deferred-stub` JSDoc과 `Do not derive policy from this.` 문구가 박혀 있다.

---

## 2C. Scenario Entry (적용 경로 선택)

코드를 작성하기 전에 어느 경로인지 먼저 결정한다. 세 경로는 **첫 수가 다르다.** 섞지 않는다.

### Scenario A — 신규 PoC (greenfield, baseline fork)

이 zip의 baseline으로 처음부터 시작하는 경우.

1. `README.md → AI_HANDOFF.md → DESIGN.md` 순서로 읽는다.
2. `## 2A Pre-implementation Checklist`에 먼저 답한다.
3. 이 zip은 완성 앱이 아니다. 자체 `src/main.jsx` / `src/App.jsx`를 새로 작성한다. 빈 vite로 시작하지 않는다.
4. `src/baseline/styles/*` + `src/baseline/components/*` + `src/baseline/icons/index.js`만 fork target으로 import한다.
5. `candidate` / `deferred` 항목은 구현하지 말고 stop and report한다.
6. 한 화면씩 시작한다. 전체 서비스를 한 번에 만들지 않는다.

### Scenario B — 기존 PoC 적용 (retrofit / audit-first)

이미 작동하는 PoC에 디자인 시스템을 적용하는 경우. **fork가 아니라 audit이 첫 수다.**

1. 기존 PoC의 화면 구조 / 라우팅 / 데이터 흐름 / business logic을 **먼저 파악하고 보존**한다. 통째로 재작성하지 않는다.
2. `README.md → AI_HANDOFF.md → DESIGN.md`를 읽되, `src/baseline/`은 교체 대상이 아니라 **정합 기준**으로 쓴다.
3. drift를 찾아 분류한다: raw hex/rgba, 임의 spacing, `lucide-react` 직접 import, primitive token 직접 참조, candidate/deferred 구현, inline style, status/assessment 혼용.
   - **P0** = 토큰/레이어 위반·brand 오용 (즉시), **P1** = 컴포넌트/아이콘/surface drift, **P2** = 정리/일관성.
4. 기존 기능을 깨지 않는 **최소 변경**으로 NE 토큰과 baseline component anatomy에 맞춰 교정한다.
5. 새 token/component/variant가 필요해 보이면 만들지 말고 `## 8B`에 따라 stop and report한다.

### Scenario C — non-React / static HTML retrofit

React/Vite 프로젝트가 아닌 HTML · 서버 템플릿 · CMS · 정적 산출물에 적용하는 경우. NE Design.md는 **stack-agnostic foundation**이고 React/Vite baseline은 그중 하나의 reference adapter다. 비-React 경로는 `.jsx` wrapper와 ESLint를 쓰지 않는다.

1. `DESIGN.md`는 그대로 source of truth다. 규칙·정책·패턴은 stack 무관하게 적용한다.
2. `src/baseline/styles/tokens.css` · `layout.css` · `components.css`는 **순수 CSS**다 (`:hover`/`:focus`/`:active` pseudo-class 포함, JS 불요). `<link>` 또는 CSS bundle로 적용한다.
3. React wrapper(`Button.jsx`, `Card.jsx` 등)는 사용하지 않고, 동일한 `.ne-*` **class contract를 HTML에 직접** 적용한다 (예: `<button class="ne-btn ne-btn-primary">`, `<div class="ne-grid ne-grid--auto">`). wrapper는 class를 붙여주는 sugar일 뿐이다.
4. **icon** — `src/baseline/icons/index.js` import는 HTML에서 못 쓴다. 대신:
   - 이름은 `DESIGN.md icon_system.approved_icons`(156개) 안에서만 사용한다.
   - inline Lucide SVG는 `stroke="currentColor"`를 유지한다 (색은 토큰/부모 color로).
   - lucide CDN(`<i data-lucide="...">`)을 쓰더라도 `data-lucide` 이름이 approved 목록 안이어야 한다.
   - 임의 SVG 아이콘 추가는 stop-and-report.
5. **enforcement** — ESLint `no-restricted-imports`는 React/Vite 경로 전용이라 여기선 작동하지 않는다. 대신:
   - **PoC가 새로 작성한 HTML/CSS/JS만** 대상으로 raw `#hex`/`rgba(`, inline `style=`, 비승인 icon name을 grep한다. **imported baseline CSS · vendor bundle · 원본 packed artifact는 검사 대상에서 제외(allowlist)**한다 — tokens.css 등의 source token 정의에서 false positive가 나기 때문이다.
   - 그 다음 `## 8A` self-validation을 반드시 수행한다 (HTML에선 §8A가 주 enforcement).
6. 입력 파일이 **minified / bundled / escaped build artifact**(단일 HTML, gzip manifest, Babel-standalone 등)면 바로 수정하지 않는다. 먼저 **원본 소스 확보 또는 무손실 언팩 → 렌더 동치 확인** 후에 audit한다. packed artifact는 diff·edit가 무의미하다.

먼저 적용 경로(A/B/C)와 §2A 답변을 보여주고, 그 다음 진행한다. **retrofit(B/C)은 §2A를 "retrofit checkpoint"로 출력한다** — `scenario` / `delivery_model` / `surface_intent`를 기존 화면 기준으로 식별·선언하고, 기존과 *다르게 바꾸려는* 경우(또는 brand red/neutral-info/overlay·desktop↔responsive처럼 영향 큰 경우)만 진행 전 owner 확인(blocking). 그 외에는 선언형 checkpoint로 흐름을 끊지 않는다. checkpoint를 사람에게 보여줄 때는 **§2A 선택지의 자연어 라벨을 먼저** 쓰고 `canonical value`는 괄호로 병기한다 (리포트 필드는 canonical value만 기록). 구조는 **기존 intent 식별 → 권장 유지/변경 → owner redirect 가능**으로 유지하되, 기존 intent를 바꾸는 경우만 blocking.

예) `§2A retrofit checkpoint — scenario: B(기존 React retrofit) / 화면 대응 범위: 데스크톱 시연 중심 (desktop-only, 식별) / 배경 구성: 여러 구역을 구분하는 화면 (mixed, 식별 — dashboard만 mixed·나머지 흰 배경 중심 base-only) → 기존 intent 유지로 audit 진행 권장. 다른 intent로 바꾸려면 여기서 owner 확인.`

---

## 3. Required Files for Handoff

**Required reading set** (folder/zip 패키지를 처음 받았을 때 함께 읽는 최소 세트)
- `README.md` — package index and orientation. Not a source of truth.
- `AI_HANDOFF.md` — operational execution guide for AI coding agents.
- `DESIGN.md` — primary design system specification.

**Core authority**
- `DESIGN.md` — primary source of truth.
- `AI_HANDOFF.md` — operational guide.

**Package entry**
- `README.md` — orientation only.

**Fork-ready baseline** (v0.11.0-alpha부터 handoff zip에 포함. `npm run dev`로 바로 뜨는 앱이 아니라 fork 대상 building blocks다)
- `src/baseline/` — PoC fork target. 새 PoC는 이 디렉터리를 fork해서 시작한다.
- `src/_stubs/` — deferred 임시 구현 (Dialog / Toast). policy source 아님.
- **baseline CSS로 실제 구현된 live `.ne-*` 계약 목록은 `DESIGN.md §1Q baseline_css_coverage`** 참조 (현재 live: ne-btn / ne-card / ne-badge / layout. avatar·form은 must-tier todo). 미구현 `.ne-*`는 silent dead class다.
- **`lucide-react`는 `1.14.0` 핀**(`package.json`). 소비자는 `1.14.0` exact 또는 compatible verified version을 쓴다 — 기존 PoC의 다른/낮은 버전은 baseline icon wrapper(156)와 불일치해 누락 아이콘으로 dev module link 실패 가능(build는 tree-shaking으로 통과).

**Excluded from handoff zip**
- `src/examples/` — renderer demo 전용. PoC에 복사 금지. zip 미포함.

**Optional reference** (brand provenance / external reference trace 필요 시)
- `docs/reference/BRAND_SOURCE.md` — NE CI / brand source reconciliation, adopted / rejected / conditional 자산.
- `docs/reference/DESIGN_REFERENCES.md` — 외부 디자인 시스템 references, rationale trace.

**Historical only**
- `docs/archive/INTERNAL_SHARING_MEMO.md` — archived alpha 내부 공유 memo (v0.10.0 origin). current handoff 기준이 아니다.

일반 인계 워크플로에서는 **README.md + AI_HANDOFF.md + DESIGN.md + src/baseline/** 가 필수 reading + executable set이다. source of truth는 `DESIGN.md`, operational guide는 `AI_HANDOFF.md`, package entry는 `README.md`, PoC fork target은 `src/baseline/`다.

---

## 4. Quick Implementation Rules

- Use neutral button for repeated/default actions.
- Use primary red only for one major brand/forward CTA per screen.
- Use assessment tokens for correct/incorrect learning results.
- Use status tokens for system/content state.
- Do not mix status and assessment layers.
- Do not use danger/negative red as large fill.
- Do not use disabled styling for permission/access state.
- Do not apply Paperlogy inside component text or global header brand text.
- Do not invent colors, rgba, font weights, spacing, icons, or component variants.
- **Use only the 156 icons listed in `DESIGN.md icon_system.approved_icons`.** Import path: `src/baseline/icons/index.js`. `lucide-react` direct import는 ESLint `no-restricted-imports`로 차단된다.
- **Do not copy `src/examples/` patterns into PoC code.** examples는 renderer 시연 전용.
- **Use `src/baseline/` as the fork target.** 빈 vite로 시작하지 않는다.
- **Do not derive policy from `src/_stubs/`.** Dialog / Toast stub은 deferred minimum이다.
- Do not add raw `rgba(...)` into `src/baseline/`. baseline focus ring / overlay는 semantic CSS variable만 사용.
- Do not add legacy `.btn-primary` / `.btn-on-dark` into `src/baseline/`. baseline은 `.ne-btn-*` family를 사용.
- Do not define `--ff-base` / `--ff-display`. Canonical font alias는 `--font-primary` / `--font-display`다.
- Do not define `--ne-overlay-*` 또는 다른 신규 primitive/color token. v0.11.0-alpha 신규 token 0건.
- Treat `candidate` and `deferred` as stop/report areas.
- Token Alias Reference entries are valid token id aliases; do not auto-convert them to object paths.
- Keep source/root color separate from component default state.
- Do not force NE black root as every dark default.

---

## 5. Brand Basics

- NE red is the primary brand source and limited primary action color.
- NE black is a root / ceiling color, not every dark component default.
- CI sub-colors (Blue / Gold / Silver)는 자동으로 product UI tokens이 되지 않는다.
- Paperlogy is intentional display, not UI default.
- Pretendard is the default UI font.

---

## 6. Buttons / Status / Learning UI

- Repeated / default action: neutral button (`.ne-btn-neutral` family, mono color tokens).
- Single major forward action: primary red, limited.
- Correct / incorrect answer UI: assessment tokens (`ne-assessment-correct-*` / `ne-assessment-incorrect-*`).
- System / content state: status tokens (`ne-status-success-*` / `ne-status-warning-*` / `ne-status-danger-*`).
- Stalled progress follows DESIGN.md `progress_feedback` definitions (mono bar + danger caption/icon).
- If uncertain, **report instead of inventing a new state.**

---

## 7. Known Unfinished Areas

- Production readiness not complete.
- Component-level a11y audit deferred.
- Dialog portal / focus trap / scroll lock deferred. (`src/_stubs/Dialog.jsx` minimum stub만 baseline 동봉)
- Toast exact duration / queue / mobile placement deferred. (`src/_stubs/Toast.jsx` minimum stub만 baseline 동봉)
- Dark mode not started.
- Responsive system not formalized (단 v0.11.0-alpha에서 minimum `spacing.breakpoint` token 추가).
- Visual regression automation not present.
- WCAG automation not present.
- Read-only validation script not present (v0.12 trigger-based candidate).
- Build-fail validator not present (v0.12+ candidate).

---

## 8. Recommended Workflow

1. Start with one screen, not the whole service.
2. Answer `## 2A. Pre-implementation Checklist` before writing code.
3. Use `src/baseline/` as the fork target. 빈 vite 프로젝트로 시작하지 않는다.
4. Generate using `DESIGN.md` and this handoff guide.
5. Check tokens / buttons / assessment-status separation.
6. Report any undefined references.
7. Get human review for visual hierarchy, brand density, and UX flow.

Major structural patches (new sub-section in `## 1A`–`## 1P`, new component contract, `component_scope_policy` 변경, `## 1P Structural Roadmap` update, baseline 구조 변경)는 independent second-review를 권장한다. v0.11.0-alpha 계획 evidence: 2-AI 4-round cross-review가 단일 검토 대비 약 16건의 blind spot을 잡았다. 강제 운영 규칙은 아니다.

### 3-pass 적용 프로토콜 (개요)

공식 build-fail validator가 아직 없으므로(`## 7` 참조), pass 기반 프롬프팅으로 가드레일을 강제한다.

- **Pass 0 — 진입 선택:** `## 2C` Scenario A(신규/fork) 또는 B(기존/audit).
- **Pass 1 — 생성:** `## 2A` 체크리스트 답변 후 가드레일 생성.
- **Pass 2 — 자체 검증:** `## 8A` self-validation pass (위반 P0/P1/P2 → 보완).
- **Pass 3+ — 바이브 코딩:** `## 8B` 인간 주도 반복, 불변식 계승, 구조/신규 토큰은 owner decision.

---

## 8A. Self-validation Pass (2차 검증)

1차 생성 직후, **코드를 새로 작성하지 말고 검증만** 수행한다. 독립 컨텍스트(새 세션 또는 다른 agent)에서 돌리면 blind spot을 더 잡는다.

검증 축:

1. **token / layer** — 색·spacing·rounded·elevation이 전부 토큰인가? raw hex/rgba·임의 px 0건인가? primitive 직접 참조 대신 semantic을 쓰는가?
2. **button hierarchy** — 화면당 primary red 1개 이하, 반복 액션은 neutral인가?
3. **surface role / state** — root는 `ne-surface-base`인가? section surface intent(base-only/muted-band/mixed)가 선언됐는가? ① grouping band 자리가 flat white로 뭉개지지 않았는가? ② raised 카드/패널이 더 어두운 tint로 가라앉지 않았는가(`ne-surface-section` 위 카드=base)? ③ hover background가 실제 clickable/selectable 요소에만 있는가? ④ 큰 카드/패널 hover를 surface→어두운 tint(bg-soft) 변화만으로 처리하지 않았는가? (`DESIGN.md surface_context_policy`)
4. **icon registry** — 모든 아이콘이 `src/baseline/icons/index.js` 경로인가? `lucide-react` 직접 import 0건인가?
5. **candidate / deferred** — 즉흥 구현 없이 stop-and-report 했는가?
6. **baseline vs PoC 경계** — 도메인 컴포넌트를 baseline에 넣지 않고 PoC layer에서 composition 했는가? (`DESIGN.md component_scope_policy`)
7. **status vs assessment** — 두 레이어를 혼용하지 않았는가?
8. **a11y minimum / build·lint** — `## 1I a11y baseline` 충족? `npm run lint`(no-restricted-imports 포함) / build 통과?
9. **mobile smoke test** — 360 / 768 / 1280 viewport에서: body/page 가로 스크롤 없음 / 다열 grid가 1열로 fallback / 핵심 CTA 터치 타깃 44px 근처 / 긴 제목·버튼 텍스트가 부모 밖으로 넘치지 않음 / table은 압축되지 않고 scroll wrapper 또는 fallback 사용. (`DESIGN.md spacing.responsive_intent.mobile_defaults` 참조)

산출: 위반을 **P0/P1/P2로 분류**한 리포트 → **P0/P1 우선 보완**. 새 token/component/variant가 필요하면 만들지 말고 `## 8B`로 넘긴다.

**overall_status 판정 rubric** (주관 금지 — self-validation 리포트에 이 기준으로 기록):
- **pass** = P0=0 ∧ P1=0 ∧ surface/responsive 축 pass ∧ 이 PoC 진행을 막는 미결 결정 없음 ∧ 의미있는 P2 debt 정리 완료(또는 사소).
- **partial** = P0=0 이지만 (P1>0 / 결과에 영향 주는 미결 owner-decision 존재 / 대량 P2 debt 미정리[계획만]). 보통 `can_continue_vibe_coding: yes`.
- **blocked** = P0>0 또는 owner decision 없이는 진행 불가.

**inline-style 분류** (`## 4` "inline style 금지"의 운영 기준):
- raw/off-token inline style (raw hex/rgba, 임의 px) → **P0/P1**.
- retrofit의 *tokenized* inline-style 잔여(값은 토큰, mechanism만 inline) → **P2 debt** — 단 self-validation에 **개수 + 정리계획(도메인 컴포넌트 추출 §8B) 필수**.
- 신규 PoC에서 inline-style 남발 → **P1 이상**.

**필수 출력물.** 이 pass의 결과는 `docs/templates/NE_DESIGNMD_SELF_VALIDATION_TEMPLATE.md`의 고정 스키마 그대로, PoC 프로젝트 루트의 `docs/NE_DESIGNMD_SELF_VALIDATION.md`로 생성한다. 사람이 손으로 채우는 양식이 아니라 agent가 self-validation 후 자동 생성하는 산출물이다. 작성 후 owner(문의 채널)에게 전달한다 — 이 리포트가 baseline을 매 버전 개선하는 데이터다. 특히 **Stop-and-report 섹션**(베이스라인이 아직 못 덮는 구멍)을 비우지 않는다.

---

## 8B. Vibe-coding Continuation (3차 이후)

Pass 2까지 가드레일을 통과하면, 이후는 화면 단위 **인간 주도 vibe coding**으로 hierarchy / brand density / UX flow를 다듬는다. 단 다음 불변식을 **계승**한다.

- 모든 편집도 토큰/no-invent 규칙을 지킨다 (`## 4` Quick Implementation Rules).
- `DESIGN.md` guardrail을 넘는 **새 token / component / variant / 구조 변경은 owner decision**이 필요하다. 임의 추가 금지, stop-and-report.
- 구조 변경·신규 contract가 확정되면 `DESIGN.md`에 반영해 다음 버전으로 환류한다 (internal alpha는 실제 적용 결과를 매 버전에 반영해 안정화한다).
- 큰 구조 변경에는 `## 8` 의 independent second-review를 권장한다.

---

## 9. Baseline Archive Verification

v0.11.0-alpha부터 baseline zip은 **fork-ready handoff package**다. docs + baseline + stubs를 함께 포함한다 (단 renderer entry `src/App.jsx`/`src/main.jsx`와 `src/examples/`, `docs/review`, `docs/fail_report`는 제외). `npm run dev`로 즉시 작동하는 완성 앱이 아니라, PoC가 자체 entry를 작성해 fork하는 building blocks 모음이다.

zip 생성은 `scripts/build-handoff-zip.mjs` script로 한다. broad `zip -r . .` 명령은 금지. self-include 차단을 위해 temp/staging 기준으로 빌드 후 `public/`으로 복사한다.

```bash
npm run build:handoff-zip
```

zip artifact:

```
public/design-md_v0.11.5-alpha.zip
```

Denylist verification (expect 0 lines):

```bash
unzip -Z1 public/design-md_v0.11.5-alpha.zip \
  | grep -E "\.zip|node_modules|dist/|\.git|\.claude|docs/review|docs/fail_report|src/examples|patch_prompt|__MACOSX|\.DS_Store"
```

Required-content check (각 path 1+ entry 기대):

```bash
unzip -Z1 public/design-md_v0.11.5-alpha.zip \
  | grep -E "^(README.md|AI_HANDOFF.md|DESIGN.md|font.css|_READ_FIRST.txt|package.json|package-lock.json|index.html|vite.config.js)$|^src/baseline/|^src/_stubs/"
```

baseline zip은 v0.11.0-alpha부터 일반 handoff에 포함된다. docs-only snapshot mode는 폐기되었다.

### Baseline fork pattern (v0.11.0a hygiene patch, 2026-05-20)

handoff zip의 `src/baseline/`, `src/_stubs/`는 **fork target building blocks**다. PoC 시작 시 별도 vite entry (`main.jsx`, `App.jsx`)를 작성하고 baseline을 import해 사용한다. zip 안에는 `src/App.jsx` / `src/main.jsx`가 포함되지 않는다 — 본 repo의 두 파일은 `src/examples/` 의존성을 가진 reference renderer이며 PoC entry로 직접 사용 불가하다.

v05 PoC가 이 패턴으로 작동 확인 (2026-05-20 smoke test). 이 패키지의 baseline은 **fork-ready code blocks**이며 zip 자체 `npm run dev`로 작동하는 완성 앱이 아니다. PoC가 자체 entry를 작성하고 `npm install` 후 `npm run build`가 통과한다.

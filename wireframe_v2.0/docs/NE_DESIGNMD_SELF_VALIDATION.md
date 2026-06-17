# NE Design.md — Self-Validation & Application Report

<!-- §8A self-validation pass 후 자동 생성. source of truth = DESIGN.md. canonical value만 기록. -->

## Summary
- overall_status: partial
- can_continue_vibe_coding: yes
- needs_owner_decision: yes
- one_line: NE Books Front 와이어프레임(11화면)을 NE Design.md v0.11.5-alpha로 retrofit. P0/P1 = 0으로 교정 완료, brand-red 도입 1건과 미승인 cart/share 아이콘 2건은 owner 확인 대상, tokenized inline-style 88건은 P2 debt(정리계획 있음).

## Meta
- baseline_version: v0.11.5-alpha
- scenario: C(non-React/static HTML)
- precheck_shown: yes
- poc_name: nebooks-mall-v2.0 / wireframe_v2.0 (Front 와이어프레임)
- screens_count: 11 (메인·교재목록·교재상세·학습자료실·장바구니·주문결제·결제완료·주문내역·포인트·쿠폰·1:1문의)
- date: 2026-06-17
- tool/agent: Claude Code (Opus 4.8)

## Compliance
- eslint_no_restricted_imports: n/a   # Scenario C (React 전용)
- npm_run_build: n/a                   # Scenario C
- non_react_manual_grep: pass          # PoC-authored(index.html/app.css/script.js) raw hex/rgba 0, 미승인 icon 0, emoji 0. baseline CSS·vendor 제외 allowlist 적용.
- static_render_smoke: pass            # 단일 정적 HTML(언팩 불요). 360/768/1280 레이아웃 fallback 확인.

## Drift findings (§8A 축별 개수)
| 축 | P0 | P1 | P2 |
|---|---|---|---|
| token/layer (raw hex·rgba·임의 px) | 0 | 0 | 0 |
| button hierarchy (primary ≤1) | 0 | 0 | 0 |
| surface role/state | 0 | 0 | 0 |
| icon registry (approved subset만) | 0 | 0 | 0 |
| candidate/deferred stop-report | 0 | 0 | 0 |
| baseline vs PoC 경계 | 0 | 0 | 0 |
| status vs assessment | 0 | 0 | 0 |
| responsive (전달모델·collapse fallback) | 0 | 0 | 0 |
| inline-style (tokenized 잔여) | 0 | 0 | 88 |
- before→after (retrofit): P0 113→0   P1 ~40→0   P2 144(inline)→88

### 교정 내역 (before → after)
- **P0 token/layer**: `style.css` raw hex 111 + rgba 1 → 전량 NE token(`var(--ne-*)`) 치환, raw 0.
- **P0 surface**: root canvas `#dcdcdc`(body/screen-wrap) → `ne-surface-base`(baseline body 배선 준수, token_use_guards 충족).
- **P0 no-emoji**: emoji `🛒` 1 + 아이콘 대체 dingbat(`♡ 📌 ◀ ▶ ● ○ × ↗ ▸`) → approved Lucide inline SVG(currentColor) 또는 텍스트/CSS dot으로 교체. 잔여 emoji 0.
- **P0 brand 오용**: 기존 "primary=검정(#333)" 9건 → NE 위계 재매핑(forward CTA만 `ne-btn-primary`, 반복 액션 `ne-btn-neutral`/`-neutral-subtle`). 화면당 primary ≤1.
- **P1 component**: `.btn/.badge/.wf-box` → `.ne-btn`·`.ne-badge`·`.ne-card` live 계약으로 치환. dead class(ne-form-*/ne-tabs/ne-avatar/ne-dialog) 미사용 — form/tabs/table/modal은 PoC layer(app.css)에서 token으로 보완.

## Stop-and-report  ← 가장 중요
- **미승인 아이콘 2종 (icon_system.approved_icons 156 미포함)**:
  - `shopping-cart`(장바구니) — approved 목록에 cart 계열 없음. 현재 **텍스트 라벨 "장바구니"**로 처리. → owner decision: (a) 텍스트 유지 / (b) approved_icons에 ShoppingCart 추가.
  - `share`/`share-2`(공유하기) — approved 목록에 share 없음. 현재 **텍스트 라벨 "공유하기"**로 처리. → owner decision: (a) 텍스트 유지 / (b) Send/Copy 차용 / (c) Share2 추가.
- **brand red 도입(영향 큰 변경)**: 기존 와이어프레임은 의도적 흑백/회색톤. NE Design 적용으로 화면당 1개 forward CTA(`ne-btn-primary`, NE red)를 도입함. 사용자의 "NE Design.md 적용" 지시를 owner 승인으로 간주해 진행. 전부 무채색 유지를 원하면 redirect 필요.
- **elevation 토큰 미배선**: baseline tokens.css에 `--elevation-*` CSS 변수 없음(DESIGN.md spec엔 존재, 어댑터 미배선 = surface_context_policy.deferred_v0.12). modal/card는 box-shadow 대신 border + ne-surface로만 깊이 표현. modal scrim은 raw rgba 금지 준수를 위해 `color-mix(in srgb, var(--ne-text-heading) 48%, transparent)`로 토큰 파생.
- **form/tabs/table 시각층 미배선(must_tier_todo)**: ne-form-*/ne-tabs가 silent dead class라 PoC app.css에서 token만으로 시각층 보완. baseline 정식 구현 시 교체 예정.
- **focus-ring 토큰 부분 배선**: tokens.css에 `--ne-form-input-focus-ring`/`--ne-status-danger-focus-ring` 미배선(semantic엔 정의). 입력 포커스는 배선된 `--ne-mono-focus-ring`으로 대체.

## Surface role/state (surface_context_policy 준수)
- surface_intent: mixed
  - 메인 = mixed(여러 구역) / 교재목록·상세·자료실·결제완료·주문내역·쿠폰·1:1문의 = base-only / 장바구니·주문결제 요약·포인트 요약·정책메모 = muted-band
- grouping_flat_check: pass — 요약/정책메모/탭 헤더 band는 `ne-surface-section`(ne-card--muted), flat white로 뭉개지지 않음.
- raised_card_tint_check: pass — 모든 카드(.ne-card)는 `ne-surface-base`. muted band 위 카드도 base 유지, 부모보다 어두운 tint로 가라앉히지 않음.
- hover_affordance_check: pass — hover background는 clickable 요소(nav item, tab, selectable option, gnb link)에만. 비-interactive table/카드에는 hover 없음. 큰 카드 hover를 surface→bg-soft tint로만 처리한 곳 없음.

## Responsive (mobile_defaults 준수)
- delivery_model: desktop-only
- collapse_applied: yes — 카드 그리드는 `.ne-grid--auto`(본질적 반응형), 2/3열은 `.ne-grid--2/--3`(collapse 내장). 결제 2단·정책메모는 1100px 이하 1열 fallback.
- table_fallback: scroll-wrapper (`.nb-table-wrap` overflow-x auto)
- mobile_smoke_test: 360/768/1280 — 가로 스크롤 없음(table은 scroll wrapper), 다열 grid 1열 fallback, 760px 이하 사이드바 숨김, 제목/버튼 텍스트 overflow 없음(nowrap 미강제).
- unresolved_responsive: none (desktop-only 범위 내 최소 fallback만 적용, fluid type/자동 grid는 deferred로 미접촉)

## Deferred 영역 닿음
- **modal(ne-dialog)**: baseline은 stub_only(portal/focus-trap/scroll-lock deferred). PoC 최소 modal로 구현 — overlay 클릭/닫기 버튼/`data-close`만 제공, **focus-trap·scroll-lock·portal 미구현(deferred 명시)**. scrim은 token 파생(color-mix).
- **tabs(ne-tabs)**: 키보드 spec deferred. PoC 탭은 click 전환만, 키보드 네비게이션 deferred.
- **toast**: 미사용. 더미 피드백은 `alert()`로 대체(와이어프레임 한정).
- dark mode / WCAG 자동화: 미접촉.

## 빌더 코멘트
- 막혔던 점: (1) live `.ne-*`가 ne-btn/ne-card/ne-badge/layout뿐이라 form·tabs·table·modal·도메인 카드는 PoC layer에서 token으로 직접 보완해야 했다(§1Q must_tier_todo). (2) cart/share 등 커머스 핵심 아이콘이 approved 156에 없어 텍스트 라벨로 우회. (3) elevation/overlay 토큰 미배선으로 depth는 border 중심 표현.
- 개선 제안: 커머스 PoC 수요를 고려해 approved_icons에 ShoppingCart/Share2(또는 대체 매핑 가이드) 추가 검토. ne-form-* / ne-tabs 시각층 baseline 배선(must_tier_todo) 우선순위 상향. modal scrim용 semantic overlay 토큰(또는 color-mix 공식 가이드) 제공 시 PoC 일관성 향상.
- 잔여 P2(정리계획): tokenized inline-style 88건(구조용 width/min-width px, margin:0, gap/padding=var(--space-*), display 토글, color=var(--ne-*)). 다음 단계에서 교재카드/금액요약/필터바를 도메인 컴포넌트 클래스로 추출해 inline 잔여를 0에 수렴시킨다(§8B).

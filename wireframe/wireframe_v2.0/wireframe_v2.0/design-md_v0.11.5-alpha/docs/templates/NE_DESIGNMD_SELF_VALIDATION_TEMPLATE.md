# NE Design.md — Self-Validation & Application Report (template)

<!--
  AI agent가 §8A self-validation pass 이후 *자동 생성*하는 산출물이다.
  사람이 손으로 채우는 양식이 아니다.

  이 파일은 baseline package에 동봉된 **template**다.
  실제 보고서는 PoC 프로젝트 루트의 `docs/NE_DESIGNMD_SELF_VALIDATION.md`로 생성하고,
  작성 후 <문의 채널>로 우리에게 전달한다. (이게 우리가 매 버전 반영하는 데이터다.)

  정책 문서가 아니다. source of truth는 DESIGN.md.
  필드는 고정 스키마로 유지한다 (PoC 간 집계 가능해야 함). 임의로 칸을 바꾸지 않는다.
  owner-facing UI에서는 자연어 라벨(예: "일부 구역만 연한 배경")을 보여주더라도,
  이 리포트의 surface_intent / delivery_model / content_width 등은 *항상 canonical value만* 기록한다
  (집계 가능해야 하므로 자연어 라벨을 적지 않는다).
-->

## Summary  (사람이 먼저 보는 칸)
<!-- pass/partial/blocked 정의 = AI_HANDOFF §8A rubric. P0/P1 잔존·미결 owner-decision·대량 P2 debt면 partial. -->
- overall_status: pass | partial | blocked
- can_continue_vibe_coding: yes | no
- needs_owner_decision: yes | no
- one_line:                       # 한 줄 요약

## Meta
- baseline_version: v0.11.5-alpha  # 적용한 baseline 버전 (실제 적용 버전으로 덮어쓸 것)
- scenario: A(신규 React/Vite) | B(기존 React/Vite retrofit) | C(non-React/static HTML)
- precheck_shown: yes | no         # §2A checkpoint(retrofit 포함)가 작업/audit 전에 출력됐는가
- poc_name:
- screens_count:
- date:
- tool/agent:                      # Cursor / Claude Code / 기타

## Compliance (자동 강제 항목 — scenario에 따라 n/a)
- eslint_no_restricted_imports: pass | fail | n/a   # React/Vite(A·B) 전용
- npm_run_build: pass | fail | n/a                  # React/Vite(A·B) 전용
- non_react_manual_grep: pass | fail | n/a          # C 전용: PoC-authored 코드의 raw hex/rgba·inline style·비승인 icon grep (baseline CSS/vendor/packed 제외)
- static_render_smoke: pass | fail | n/a            # C 전용: 언팩본이 원본과 동일 렌더 + 360/768/1280 smoke

## Drift findings (§8A 축별 개수)
<!-- inline-style 분류(§8A): raw/off-token inline → P0/P1 · retrofit tokenized inline 잔여 → P2(개수+정리계획 필수) · 신규 PoC inline 남발 → P1+. -->
| 축 | P0 | P1 | P2 |
|---|---|---|---|
| token/layer (raw hex·rgba·임의 px) | | | |
| button hierarchy (primary ≤1) | | | |
| surface role/state (intent 선언 / grouping flat / 카드 가라앉음 / hover는 clickable에만 / 카드 hover≠surface→bg-soft) | | | |
| icon registry (baseline/icons만) | | | |
| candidate/deferred stop-report | | | |
| baseline vs PoC 경계 | | | |
| status vs assessment | | | |
| responsive (전달모델·collapse fallback) | | | |
- (retrofit인 경우) before→after: P0 _→_   P1 _→_   P2 _→_

## Stop-and-report  ← 가장 중요 (다음 버전 백로그 원천)
<!-- 멈추고 보고한 항목 = 베이스라인이 아직 못 덮는 구멍. 빠진 토큰/패턴/모호한 spec을 그대로 적는다. -->
-

## Surface role/state (surface_context_policy 준수 — 반드시 채움)
<!-- v0.11.4. 배경 토큰을 색이 아니라 역할+부모대비로. -->
- surface_intent: base-only | muted-band | mixed
- grouping_flat_check: grouping band 자리가 flat white로 뭉개지지 않았는가 (pass/fail)
- raised_card_tint_check: raised 카드/패널이 더 어두운 tint로 가라앉지 않았는가, section 위 카드=base인가 (pass/fail)
- hover_affordance_check: hover background가 실제 clickable에만 있고, 큰 카드 hover가 surface→bg-soft tint만은 아닌가 (pass/fail)

## Responsive (mobile_defaults 준수 — 반드시 채움)
<!-- v0.11.2 precondition. 비우지 말 것. -->
- delivery_model: desktop-only | responsive-reflow | mobile-desktop-split
- collapse_applied: 다열 grid에 .ne-grid--auto/--2/--3 또는 .ne-collapse-md/sm 적용 여부 (yes/no/n-a)
- table_fallback: none | scroll-wrapper | card-list-fallback
- mobile_smoke_test: 360/768/1280 통과 여부 (가로스크롤 없음 / 1열 fallback / 텍스트 overflow 없음)
- unresolved_responsive: 미해결 responsive 결정 (없으면 none)

## Deferred 영역 닿음
<!-- responsive 외 dialog / toast / dark mode / a11y 등 deferred 영역에 닿았으면 무엇을 어떻게 fallback 했는지 -->
-

## 빌더 코멘트
- 막혔던 점 / 개선 제안:

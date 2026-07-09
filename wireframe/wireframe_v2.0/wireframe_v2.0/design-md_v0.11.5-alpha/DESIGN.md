---
name: AI-Native Token Foundation (NE 범용 디자인 시스템)
version: 0.11.5-alpha
description: |
  레거시 환경에서 AI-Native로의 전환을 위한 디자인 시스템 출발점이다.
  NE 신규 PoC / 내부 alpha 프로젝트에서 공통 기준으로 차용 가능한
  token foundation이다. AI agent가 README.md, AI_HANDOFF.md, DESIGN.md를
  함께 읽어 일관된 UI를 생성한다.

constraints:
  no-emoji:
    rule: forbidden
    scope: all UI text, icons, prose, code
    reason: |
      이모지는 OS·브라우저별 렌더링 차이로 시각 일관성을 깬다.
      Pretendard typography와 baseline 정렬이 안 맞는다.
      LLM이 OS-의존 결과물을 만들지 않도록 차단.
    replacement:
      - 시각 표시: Lucide icon 또는 텍스트 라벨
      - 의미 표시: 텍스트 라벨 또는 status 토큰 색

layer_contract:
  brand:
    role: BI/CI와 브랜드 톤 보관소.
    rule: product component가 직접 참조하지 않는다.
  primitive:
    role: 실제 값 저장소.
    rule: UI class가 직접 참조하지 않는다.
  semantic:
    role: UI 역할 토큰.
    rule: component와 pattern이 참조한다.
  component:
    role: 독립 UI 단위.
    rule: 최소 사용 규칙과 token_refs를 가진다.
  state_family:
    role: 여러 컴포넌트가 공유하는 상태.
    rule: component 세부 구현보다 먼저 공통 의미를 둔다.
  pattern:
    role: 여러 컴포넌트를 조합한 사용 흐름.
    rule: 컴포넌트보다 높은 사용 맥락을 기록한다.
  domain:
    role: 평가/학습 등 의미 기반 확장.
    rule: status와 assessment처럼 의미가 다르면 token을 분리한다.
  candidate:
    role: 인지된 후보지만 아직 정식화 전.
    rule: 사용 가능 컴포넌트처럼 구현하지 않는다.

inventory_status:
  ready: 현재 DESIGN.md 기준으로 바로 사용 가능.
  draft: 최소 계약은 있으나 세부 상태/시연이 제한됨.
  candidate: 필요 가능성이 높지만 결정 필요.
  deferred: 지금 범위 밖.

demo_site_role:
  status: internal-renderer
  purpose: DESIGN.md를 눈으로 검토하기 위한 내부 렌더러.
  not:
    - 제품 시연 사이트
    - component contract validator
    - token sync automation
    - MD 제공 서비스
    - LLM 자동 UI 결정 엔진

colors:

  # ─────────────────────────────────────────────────
  # PRIMITIVE — 실제 hex가 박히는 단 한 곳 (창고)
  # ─────────────────────────────────────────────────
  primitive:
    accent-300:   "#F6AFA9"
    accent-500:   "#E83828"
    accent-600:   "#C32E20"
    accent-700:   "#911F14"

    # v4.1 list-page point/label accent (BI 무관 보조 강조)
    orange-400:   "#FF8A3D"   # NEW 배지
    orange-500:   "#F47920"   # 적립 포인트
    navy-700:     "#1D2B5C"   # 시리즈 카드 라벨
    icon-red-500: "#D64835"   # E-Book/MP3/모바일 라인 아이콘 빨강 포인트 (브릭톤)

    neutral-0:    "#FFFFFF"
    neutral-50:   "#F4EFE9"
    neutral-100:  "#EDE9DE"
    neutral-200:  "#E6DFD8"
    neutral-500:  "#8E8B82"
    neutral-700:  "#6C6A64"
    neutral-800:  "#3D3D3A"
    neutral-900:  "#1D1717"

    # v4.1 list-page cool gray (warm neutral과 별개 — UI 보조 텍스트/near-white)
    gray-25:      "#FAFAFA"   # near-white inset (시리즈 카드)
    gray-250:     "#E5E5E5"   # soft line: 유틸바·탭·스테퍼 가는 구분선
    gray-300:     "#A9A9A9"   # faint: 브레드크럼·키워드·취소선·비활성
    gray-400:     "#888888"   # muted: 설명·부가 텍스트

    # v4.x footer dark (다크 푸터 전용)
    ink-950:      "#0D0D0D"   # 푸터 배경
    ink-gray-300: "#C4C4C4"   # 다크 위 강조(소셜·family·메뉴·로고)
    ink-gray-500: "#9A9A9A"   # 다크 위 링크
    ink-gray-600: "#7E7E7E"   # 다크 위 본문(회사정보)

    # v0.9.0: mute -> mono rename. NE CI Basic Guideline page 13 단색 그라데이션 기반.
    # mono-900은 NE Black root #1D1717로 정합 (PDF box 10 extract #1A1919는 prose trace만 유지).
    mono-0:       "#FFFFFF"
    mono-20:      "#E4E4E3"
    mono-50:      "#CBCCCB"
    mono-500:     "#4D4E4D"
    mono-900:     "#1D1717"

    positive-700: "#1E9245"
    positive-900: "#024409"
    positive-bg:  "#D1F5DE"
    caution-700:  "#C48F00"
    caution-900:  "#634900"
    caution-bg:   "#FFE8AA"
    negative-700: "#D64545"
    negative-900: "#7A1A1A"
    negative-bg:  "#FFE4E4"

  # ─────────────────────────────────────────────────
  # SEMANTIC — 컴포넌트가 참조하는 곳
  # ─────────────────────────────────────────────────
  semantic:
    ne-primary:                 "{colors.primitive.accent-500}"
    ne-primary-hover:           "{colors.primitive.accent-600}"
    ne-primary-active:          "{colors.primitive.accent-700}"
    ne-primary-disabled:        "{colors.primitive.accent-300}"
    ne-on-primary:              "{colors.primitive.neutral-0}"
    ne-primary-focus-ring:       "rgba(232, 56, 40, 0.25)"

    # v4.1 list-page point/label (적립·NEW배지·시리즈라벨). 빨강 계열은 ne-primary로 통일(별도 red token 없음).
    ne-reward:                  "{colors.primitive.orange-500}"   # #f47920 적립 포인트 배지
    ne-badge-new:               "{colors.primitive.orange-400}"   # #ff8a3d NEW 배지
    ne-series-label:            "{colors.primitive.navy-700}"     # #1d2b5c 시리즈 카드 텍스트
    ne-icon-red:                "{colors.primitive.icon-red-500}" # #d64835 라인 아이콘 빨강 포인트 (래스터 아이콘 톤 일치)
    ne-form-input-focus-ring:    "rgba(142, 139, 130, 0.25)"
    ne-neutral-focus-ring:       "rgba(142, 139, 130, 0.25)"   # ne-form-input-focus-ring과 같은 hex이나 neutral 강조 전용으로 별도 유지
    ne-status-danger-focus-ring: "rgba(214, 69, 69, 0.25)"

    # neutral — NE warm surface·text emphasis. disabled는 시스템 패턴 B(ne-surface-section + ne-text-disabled) 차용.
    ne-neutral:                  "{colors.primitive.neutral-800}"
    ne-neutral-hover:            "{colors.primitive.neutral-900}"
    ne-neutral-active:           "{colors.primitive.neutral-900}"
    ne-on-neutral:               "{colors.primitive.neutral-0}"

    # mono 무채색 액션 그레이 (NE CI page 13 단색 그라데이션 기반, BI 무관). Button neutral 계열과 inverse에서 사용.
    ne-mono:                     "{colors.primitive.mono-500}"
    ne-mono-hover:               "{colors.primitive.mono-900}"
    ne-mono-active:              "{colors.primitive.mono-900}"
    ne-mono-disabled:            "{colors.primitive.mono-50}"
    ne-on-mono:                  "{colors.primitive.mono-0}"
    ne-mono-focus-ring:          "{colors.primitive.mono-50}"
    ne-mono-overlay-hover:       "{colors.primitive.mono-20}"
    ne-mono-overlay-active:      "{colors.primitive.mono-50}"
    ne-mono-surface-base:        "{colors.primitive.mono-0}"

    ne-surface-base:            "{colors.primitive.neutral-0}"
    ne-surface-section:         "{colors.primitive.neutral-50}"
    ne-surface-card:            "{colors.primitive.neutral-100}"
    ne-surface-subtle:          "{colors.primitive.gray-25}"      # #fafafa near-white inset (시리즈 카드)
    ne-boundary:                "{colors.primitive.neutral-200}"
    ne-line-soft:               "{colors.primitive.gray-250}"     # #e5e5e5 유틸바·탭·스테퍼 가는 구분선
    # footer (다크)
    ne-footer-bg:               "{colors.primitive.ink-950}"      # #0d0d0d
    ne-footer-link:             "{colors.primitive.ink-gray-500}" # #9a9a9a
    ne-footer-text:             "{colors.primitive.ink-gray-600}" # #7e7e7e
    ne-footer-strong:           "{colors.primitive.ink-gray-300}" # #c4c4c4
    ne-footer-line:             "rgba(255,255,255,.1)"            # 구분선
    ne-surface-emphasis-soft:   "{colors.primitive.accent-300}"   # v0.2.2: 강조 surface

    ne-text-heading:            "{colors.primitive.neutral-900}"
    ne-text-body:               "{colors.primitive.neutral-800}"
    ne-text-tertiary:           "{colors.primitive.neutral-700}"
    ne-text-muted:              "{colors.primitive.gray-400}"     # #888888 설명·부가 텍스트
    ne-text-faint:              "{colors.primitive.gray-300}"     # #a9a9a9 브레드크럼·키워드·취소선·비활성
    ne-text-disabled:           "{colors.primitive.neutral-500}"
    ne-text-on-dark:            "{colors.primitive.neutral-0}"    # v0.2.2: 다크 표면 위 heading
    ne-text-on-dark-soft:       "{colors.primitive.neutral-500}"  # v0.2.2: 다크 표면 위 보조

    ne-status-success:          "{colors.primitive.positive-900}"
    ne-status-success-bg:       "{colors.primitive.positive-bg}"
    ne-status-success-border:   "{colors.primitive.positive-700}"
    ne-status-success-strong:   "{colors.primitive.positive-700}"
    ne-status-warning:          "{colors.primitive.caution-900}"
    ne-status-warning-bg:       "{colors.primitive.caution-bg}"
    ne-status-warning-border:   "{colors.primitive.caution-700}"
    ne-status-warning-strong:   "{colors.primitive.caution-700}"
    ne-status-danger:           "{colors.primitive.negative-900}"
    ne-status-danger-bg:        "{colors.primitive.negative-bg}"
    ne-status-danger-border:    "{colors.primitive.negative-700}"
    ne-status-danger-strong:    "{colors.primitive.negative-700}"

  # ─────────────────────────────────────────────────
  # BRAND — NE 그룹 BI / CI · Hero 시그니처 전용
  # ─────────────────────────────────────────────────
  brand:
    ne-brand-primary:           "#E83828"
    ne-brand-secondary:         "#1D1717"

  # ─────────────────────────────────────────────────
  # ASSESSMENT — 정오 판정 UI 전용 (학습·진단·평가·채점·피드백)
  # ─────────────────────────────────────────────────
  assessment:
    ne-assessment-correct:           "{colors.primitive.positive-900}"
    ne-assessment-correct-bg:        "{colors.primitive.positive-bg}"
    ne-assessment-correct-border:    "{colors.primitive.positive-700}"
    ne-assessment-incorrect:         "{colors.primitive.negative-900}"
    ne-assessment-incorrect-bg:      "{colors.primitive.negative-bg}"
    ne-assessment-incorrect-border:  "{colors.primitive.negative-700}"

  # ─────────────────────────────────────────────────
  # TOKEN USE GUARDS (v0.11.0-alpha)
  # 토큰 값은 위에서 alias 구조로 박혀 있다. 본 블록은 PoC AI가 토큰을
  # 의미와 정반대로 적용한 케이스(F-001 / F-018 / F-019)를 차단하기 위한
  # 사용처 명시이며 신규 primitive/color token 추가가 아니다.
  # ─────────────────────────────────────────────────
  token_use_guards:
    ne-surface-base:
      use_for:
        - root canvas / body 기본 배경
        - 페이지 main 컨테이너 기본 배경
      must_not_use_for:
        - 별다른 의미 없는 강조 surface 자리
      rationale: body / main 컨테이너는 항상 base에서 시작한다.
    ne-surface-section:
      use_for:
        - 부분 강조 구역 (callout / side panel / contained band)
        - section divider 영역
        - table header background
      must_not_use_for:
        - body / main 컨테이너 전역 background
        - 모든 화면에 적용되는 root canvas
        - warm 톤 같은 표현 효과를 위한 전역 surface 깔기
        # v0.11.0a (2026-05-20): v05 PoC 1인칭 사용 피드백 기반 추가.
        # 같은 anti-pattern은 어느 surface 토큰에도 적용된다 — row/list-item hover에
        # surface 변화를 줄 거면 element가 명시적으로 clickable이어야 한다.
        - non-clickable element의 hover background (misleading affordance + 행/열 비교 흐름 깨짐)
      rationale: section은 부분 강조 토큰이다. 전역에 깔면 위계가 사라진다 (F-001). row hover misuse는 misleading affordance 발생.
    ne-surface-card:
      # legacy name — 실제 역할은 card 배경이 아니라 small muted/inset/fallback fill. canonical rename은 v0.12 후보. 자세한 건 surface_context_policy.
      use_for:
        - small muted / inset / fallback fill (avatar fallback, neutral badge, table header, code/inset)
        - list/table row striping
      must_not_use_for:
        - card / panel 기본 배경 (카드는 ne-surface-base + border/elevation; ne-surface-section 위에서도 base)
        - raised surface를 더 어두운 tint로 표현
        - body / main 컨테이너 전역 background
    ne-primary:
      use_for:
        - 한 화면 단일 brand CTA
        - 학습이 활발히 진행 중인 active progress fill
        - selected forward movement 신호
      must_not_use_for:
        - 반복 CTA (목록 / 테이블 / 폼 안의 일반 버튼)
        - danger / stalled progress fill
        - large fill background
      rationale: brand red density 회피 + assessment red와 동일 화면 large fill 경쟁 금지.
    caution-700:
      use_for:
        - status warning text / icon / border
        - small signal
      must_not_use_for:
        - rating star fill (semantic 의미가 warning이 아님)
        - large fill background
      rationale: F-018 star rating에 caution-700이 임의 차용된 케이스 차단. rating은 별도 owner decision 필요.
    paperlogy:
      use_for:
        - hero h1 (랜딩 / 마케팅)
        - editorial display heading
        - 의도된 BI/CI 로고 텍스트
      must_not_use_for:
        - global header brand text 자동 적용 (이미지 asset 우선)
        - component internal text (button / form / table / alert / dialog title)
        - general UI heading 자동 적용
      rationale: F-019 boundary 보강. typography.embedding.must_not의 기존 룰을 token guard 형태로 redundancy 강화.
    font_alias_policy:
      canonical:
        - "--font-primary"
        - "--font-display"
      must_not_define:
        - "--ff-base"
        - "--ff-display"
      rationale: F-003 alias 중복 차단. PoC에서 --ff-base / --ff-display를 신규 정의하면 spec 위반이다.

  # v0.11.4-alpha. 배경 토큰을 색이 아니라 "부모 대비 + 역할"로 고르게 하는 정책. 값 변경 0.
  surface_context_policy:
    status: policy
    principle: 배경 토큰은 색이 아니라 부모 surface 대비 + 역할로 고른다. 오용 3종(① 떠야 할 카드가 더 어두운 tint로 가라앉음 ② grouping band 자리에 flat white surface ③ hover가 surface→어두운 tint라 가라앉음)은 모두 "색으로만 고름"에서 나온다.
    roles:
      ne-surface-base: 기본 canvas + raised card/panel fill (흰색).
      ne-surface-section: soft grouping band / 구역 구분 배경. 의도적 묶음·강조에만, 전역 금지.
      ne-surface-card: card 배경이 아니라 small muted/inset/fallback fill. (legacy name; v0.12 rename 후보)
    surface_intent:
      # 화면 적용 시 §2A에서 먼저 선언한다. white/oatmeal을 감으로 고르지 말고 화면 구조 의사결정으로. root canvas는 항상 ne-surface-base(white) 고정.
      base-only: 전체를 ne-surface-base 중심으로 유지. 폼·읽기·설정·관리·고밀도/반복 작업 화면. 카드/패널은 base + border/elevation.
      muted-band: 일부 section/band만 ne-surface-section. 구역 전환이 필요할 때(hero 다음 요약, 추천 묶음, 보조 정보, onboarding block). section은 부분 구역에만, root/main 전체 배경 금지.
      mixed: 여러 콘텐츠 섹션이 이어지는 랜딩/포털/홈. 섹션마다 역할을 명시. ne-surface-section 위 주요 카드는 ne-surface-base.
    relative_rule:
      - ne-surface-section 위의 주요 card/panel은 ne-surface-base를 쓴다.
      - raised surface를 부모보다 더 어두운 tint로 표현하지 않는다.
      - 같은 색 surface 위에서의 구분은 border / elevation으로 해결한다.
      - 외부 토큰(--bg-soft, --surface 등)은 이름이 아니라 역할로 판별해 매핑한다. grouping band면 ne-surface-section, 작은 inset/fill이면 ne-surface-card(muted). 문자 1:1 매핑 금지.
    hover_rule:
      - 비-interactive 요소에는 hover background 변화를 주지 않는다 (ne-table hover 제거 선례).
      - 큰 card/panel hover를 surface→어두운 tint(section/muted) 변화만으로 처리하지 않는다. 위계가 가라앉아 hover 없는 것보다 나쁘다.
      - interactive(clickable) card hover는 배경 tint가 아니라 border / elevation / 명시적 affordance(cursor pointer · focus state · keyboard 접근 · link/button semantics)로 신호한다.
      - 어두운 tint hover background는 작은 selectable item(menu/list/dropdown option, selectable chip, compact row)에만 제한한다.
    must_not:
      - 배경 토큰을 부모 대비·역할 무시하고 색만으로 선택.
      - 외부 토큰명을 NE 토큰에 역할 판별 없이 1:1 문자 매핑.
      - raised/큰 카드 hover를 surface→bg-soft tint 변화만으로 처리.
      - warm tone을 위해 root/main 전체 배경을 ne-surface-section으로 깔기.
      - 섹션마다 즉흥적으로 white/oatmeal을 번갈아 사용 (surface_intent 선언 없이).
    deferred_v0.12:
      - canonical rename (ne-surface-muted / ne-surface-inset) + ne-surface-card deprecated alias.
      - elevation token baseline CSS 배선 + interactive card hover 정식 값 (border/elev-card lift).
      - 실제 색값(#EDE9DE 등) 조정.

# ─────────────────────────────────────────────────
# TYPOGRAPHY (v0.2)
# ─────────────────────────────────────────────────
typography:
  font-family:
    base: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  font-weight:
    regular:    400  # 본문, 캡션
    medium:     500  # 버튼 라벨, 폼 라벨
    bold:       700  # 카드/섹션 제목
    extrabold:  800  # Hero h1, 임팩트 숫자
  embedding:
    # v0.7.0 typography embedding. v0.10.6에서 NE 공식 CDN(front.neungyule.com)으로 production swap 완료.
    # 신규 design token이 아니며 tokenCounts에 포함하지 않는다.
    # src/data/tokens.js에는 추가하지 않는다.
    font_source:
      current: NE 공식 CDN (front.neungyule.com)
      pretendard_css: https://front.neungyule.com/css/pretendardvariable.css
      paperlogy_css:  https://front.neungyule.com/font/Paperlogy/subset/Paperlogy-subset.css
      delivery: index.html의 <link rel="stylesheet"> 2개로 일원화. src/styles/fonts.css는 css variable alias만 보존.
    families:
      - Pretendard Variable
      - Pretendard
      - Paperlogy
    family_name_policy:
      pretendard_variable_canonical: "'Pretendard Variable'"
      pretendard_fallback: "'Pretendard'"
      paperlogy_canonical: "'Paperlogy'"
      paperozi_legacy: "사용하지 않는다"
    family_name_override:
      reason: NE 회사 표준 이름에 맞춰 Paperlogy로 통일하고, NE 공식 CDN family naming과 정합한다.
    css_aliases:
      # typography embedding alias. tokenCounts 미포함.
      - --font-primary  # 'Pretendard Variable', 'Pretendard' fallback
      - --font-display  # 'Paperlogy', Pretendard fallback
    pretendard_variable_axis:
      weight_range: "45 920"
      delivery: single woff2 variable font
      note: NE 공식 CDN의 Pretendard Variable는 단일 variable font이며 weight 45-920 axis를 가진다. 9개 정적 weight @font-face 모델은 v0.10.6에서 제거됐다.
    standard_weights:
      - 400
      - 500
      - 700
      - 800
    non_standard_weights:
      - 100
      - 200
      - 300
      - 600
      - 900
    non_standard_usage: display / special decision only
    legacy_swap_history:
      - v0.7.0 ~ v0.10.5-alpha: 폰트눈누 공개 CDN (cdn.jsdelivr.net/gh/projectnoonnu/...) + orioncactus Pretendard variable CDN을 PoC source로 사용.
      - v0.10.6-alpha: NE 공식 CDN (front.neungyule.com)으로 production swap 완료. noonnu / jsdelivr / orioncactus 외부 CDN 의존성 제거.
    default_policy:
      pretendard: system default
      paperlogy: intentional display choice
    must_not:
      - Paperlogy를 general UI heading에 자동 적용하지 않는다.
      - Paperlogy를 component internal text에 자동 적용하지 않는다.
      - Paperlogy를 button / form / table / alert / dialog title에 자동 적용하지 않는다.
      - 비표준 weight를 일반 UI에 사용하지 않는다.
      - 외부 PoC CDN(noonnu / jsdelivr / orioncactus)으로 회귀하지 않는다.
      - src/styles/fonts.css에 @font-face 블록을 다시 추가하지 않는다. 폰트 로딩은 index.html link tag에서 일원화 관리한다.
  scale:
    display-xl:   { size: 64px, line-height: 1.05, letter-spacing: -0.04em,  weight: extrabold }
    display-lg:   { size: 48px, line-height: 1.1,  letter-spacing: -0.035em, weight: extrabold }
    display-md:   { size: 36px, line-height: 1.15, letter-spacing: -0.03em,  weight: bold }
    display-sm:   { size: 28px, line-height: 1.2,  letter-spacing: -0.025em, weight: bold }
    title-lg:     { size: 22px, line-height: 1.3,  letter-spacing: -0.015em, weight: bold }
    title-md:     { size: 18px, line-height: 1.4,  letter-spacing: -0.01em,  weight: medium }
    title-sm:     { size: 16px, line-height: 1.4,  letter-spacing: 0,        weight: medium }
    body-md:      { size: 16px, line-height: 1.55, letter-spacing: 0,        weight: regular }
    body-sm:      { size: 14px, line-height: 1.55, letter-spacing: 0,        weight: regular }
    caption:      { size: 13px, line-height: 1.4,  letter-spacing: 0,        weight: medium }
    caption-up:   { size: 12px, line-height: 1.4,  letter-spacing: 0.12em,   weight: medium }
    button:       { size: 14px, line-height: 1.0,  letter-spacing: -0.01em,  weight: medium }

# ─────────────────────────────────────────────────
# SPACING — 8px 그리드
# ─────────────────────────────────────────────────
spacing:
  xxs:     4px
  xs:      8px
  sm:      12px
  md:      16px
  lg:      24px
  xl:      32px
  xxl:     40px
  xxxl:    56px
  section: 96px

  # v0.11.0-alpha structural layout spec. 신규 primitive/color token 아님.
  # F-004 (per-page maxWidth 즉흥) 차단용. PoC는 inline maxWidth 대신 이 variant를 사용한다.
  container:
    narrow:  "720px"   # long-form article body, reading focus
    reading: "880px"   # quiz / result / form flow (focus stream)
    default: "1200px"  # 리스트 / 카탈로그 / 대시보드
    wide:    "1440px"  # marketing hero, full-bleed near content
    none:    "none"    # bleed (hero, image-only)
    must_not:
      - inline maxWidth에 720 / 880 / 1200 / 1440 같은 px 직접 박지 않는다.
      - 페이지마다 즉흥 maxWidth 결정 금지.

  # v0.11.0-alpha structural layout spec. responsive system은 v0.11에서 정식화 보류 상태이지만,
  # F-013 (inline <style> media query) 차단용 minimum breakpoint를 spec에 박는다.
  breakpoint:
    sm: "600px"
    md: "900px"
    lg: "1200px"
    must_not:
      - 페이지 안에 inline <style> 태그로 media query를 박지 않는다.
      - 페이지마다 즉흥 breakpoint 결정 금지.

  # v0.11.1-alpha 문서 가이드. 신규 token 아님 (tokenCounts 미포함).
  # container variant 선택 시 "이게 화면 크기에 따라 어떻게 줄어드나"를 설명한다.
  responsive_intent:
    status: documentation_guidance
    token_count_policy: no_new_token
    model: desktop_first_minimum_fallback
    note: |
      container variant는 viewport breakpoint가 아니라 content-width cap이다.
      "모바일이면 narrow, 데스크톱이면 wide" 매핑이 아니라 정보 성격으로 고른다.
      모든 variant는 좁은 화면에서 width:100%로 줄고 max-width 상한만 다르다.
      현재 baseline minimum responsive는 desktop-first fallback 모델이다
      (기본 desktop 레이아웃, 좁아지면 collapse).
    variant_intent:
      narrow:  긴 본문. 모바일에서도 읽기 흐름 유지.
      reading: 퀴즈 / 폼 / 결과 같은 단일 작업 흐름.
      default: 목록 / 대시보드 / 카드 그리드의 기본값.
      wide:    넓은 시각 영역. 핵심 텍스트는 내부에서 다시 readable width를 가진다.
      none:    full-bleed media / hero용. 긴 텍스트 컨테이너로 쓰지 않는다.
    page_padding: 24px (sm 600px 이하 16px, none variant는 0 full-bleed)
    grid_collapse: 다열 grid가 좁은 화면에서 필요하면 .ne-collapse-md(900px 이하) / .ne-collapse-sm(600px 이하) fallback을 명시한다 (opt-in, 자동 아님)
    baseline_guarantee: max-width cap + 가운데 정렬 + page padding(24px / 600px 이하 16px, none 제외) + opt-in collapse helper
    deferred: 자동 grid system / fluid typography·spacing / table mobile fallback / component별 responsive rule. 즉흥 결정 금지 — PoC가 명시적 fallback 또는 stop-and-report.
    governance: 반응형 reflow냐 모바일·데탑 분리 구조냐는 PoC 아키텍처 결정이다. 시스템이 강제하지 않는다. 단 어느 모델이든 동일 토큰·컴포넌트를 소비한다 — 모바일 전용 token/component set을 따로 만들지 않는다 (single source).
    mobile_defaults:  # v0.11.2-alpha precondition. "안 깨지는 최소" — safe default, full spec 아님.
      grid: 다열 grid/card/list는 모바일에서 1열 fallback이 기본이다. layout_helpers의 .ne-grid--auto(권장) 또는 .ne-grid--2/--3(collapse 내장)을 쓴다. 손으로 짠 grid에는 .ne-collapse-md/sm을 명시한다.
      table: 모바일에서 억지로 압축하지 않는다. 기본은 overflow-x auto 스크롤 래퍼다. 작은 목록성 데이터는 PoC layer에서 card/list fallback. 정식 table mobile component는 v0.12+.
      type: 모바일에서 heading nowrap/overflow를 만들지 않는다. 긴 단어 줄바꿈 허용. hero-scale type는 모바일 overflow 주의. fluid type system은 v0.12+.
      nav: navigation은 PoC layer 책임이다. 모바일은 상단 고정 / 드로어 / 하단 탭 중 하나를 명시적으로 선택한다. baseline nav component는 제공하지 않는다.
    must_not:
      - container variant를 viewport 기준 매핑으로 쓰지 않는다 (1200px 이상에서만 default 식 금지).
      - responsive_intent를 신규 token으로 취급하지 않는다 (tokenCounts 미포함).
      - 모바일 전용 token/component set을 baseline과 분리해 만들지 않는다.

  # v0.11.2-alpha layout utility. grid "system"이 아니다. 신규 token 0 (gap=space-lg 차용, tokenCounts 미포함).
  layout_helpers:
    status: layout_utility
    token_count_policy: no_new_token
    ne-grid:
      base: "display:grid; gap = space-lg"
      variants:
        auto: ".ne-grid--auto — auto-fit minmax(min(100%,280px),1fr). 권장 기본, 본질적 반응형 (breakpoint·collapse 불필요)."
        two:  ".ne-grid--2 — 고정 2열, 600px 이하에서 1열 collapse 내장."
        three: ".ne-grid--3 — 고정 3열, 900px 이하에서 1열 collapse 내장."
      compose_with: ".ne-collapse-md/sm은 손으로 짠 custom grid용 escape hatch. ne-grid 변형은 collapse 내장이라 불필요."
    must_not:
      - "12-col grid system / .ne-grid--4 이상 / gap variant / container query / fluid type로 확장하지 않는다 (v0.12+ trigger)."
      - "layout_helper를 신규 token으로 취급하지 않는다 (tokenCounts 미포함)."

# ─────────────────────────────────────────────────
# Z-INDEX LAYERS (v0.11.0-alpha structural layout spec)
# F-014 (Toast z-index hardcoded) 차단용. 신규 primitive/color token 아님.
# ─────────────────────────────────────────────────
z-index_layers:
  sticky_header:  50
  dropdown:       800
  dialog_overlay: 900
  toast:          1000
  must_not:
    - 컴포넌트 내부에 z-index 매직 넘버를 박지 않는다.

# ─────────────────────────────────────────────────
# ROUNDED
# ─────────────────────────────────────────────────
rounded:
  xs:    4px
  sm:    6px
  md:    8px
  lg:    12px
  xl:    16px
  pill:  9999px
  full:  50%

# ─────────────────────────────────────────────────
# ELEVATION — 라이트 UI 미니멀 3단
# ─────────────────────────────────────────────────
elevation:
  none:  "none"
  card:  "0 1px 3px rgba(20, 20, 19, 0.06), 0 1px 2px rgba(20, 20, 19, 0.04)"
  modal: "0 12px 24px rgba(20, 20, 19, 0.12), 0 4px 8px rgba(20, 20, 19, 0.06)"

# ─────────────────────────────────────────────────
# COMPONENTS — Buttons (v0.2)
# 5종 변형(primary · neutral · subtle · text · inverse) × 5사이즈
# (sm 36 / md 44 기본 / lg 52 / xl 60 / 2xl 68). 변형과 사이즈는 직교.
# 사이즈 modifier는 height만 변동, padding·font-size·rounded는 동일 유지.
# text 변형은 height auto이므로 사이즈 modifier 적용 안 함.
# ─────────────────────────────────────────────────
components:

  button-sizes:
    sm:   { height: 36px }
    md:   { height: 44px }   # default — .ne-btn 기본, 별도 클래스 없음
    lg:   { height: 52px }
    xl:   { height: 60px }
    2xl:  { height: 68px }

  button-usage:
    # v0.9.0: button canonical family는 neutral. 기존 mute family는 폐기 명칭.
    neutral: 빈도 높은 일반 액션. solid. BI 무관 강조. canonical default action family.
    neutral-subtle: neutral 톤 약한 강조. outline 형. 취소·보조 동작.
    neutral-text: neutral 톤 인라인 액션.
    primary: 브랜드 메인 CTA. 한 화면에 1개 권장. 제한적 brand emphasis.
    primary-subtle: primary 톤 약한 강조. outline 형 보조 강조.
    primary-text: primary 톤 인라인 액션.
    inverse: 어두운 표면 또는 강조 표면 위 액션. neutral mono 한정.
    loading_ref: Button loading은 state_families.loading.button을 참조한다. 중복 제출 방지와 width 흔들림 방지 같은 공통 규칙은 state_families.loading에서 관리한다.
    deferred:
      - icon-only
      - loading 상세는 state_families.loading 참조

  ne-button-primary:
    # 메인 CTA. solid. 가장 강한 시각 강조.
    height: 44px
    padding: "12px 20px"
    rounded: "{rounded.md}"
    typography: "{typography.scale.button}"
    states:
      default:  { bg: "{colors.semantic.ne-primary}",          text: "{colors.semantic.ne-on-primary}" }
      hover:    { bg: "{colors.semantic.ne-primary-hover}",    text: "{colors.semantic.ne-on-primary}" }
      active:   { bg: "{colors.semantic.ne-primary-active}",   text: "{colors.semantic.ne-on-primary}" }
      focus:    { bg: "{colors.semantic.ne-primary}",          text: "{colors.semantic.ne-on-primary}", ring: "{colors.semantic.ne-primary-focus-ring}" }
      disabled: { bg: "{colors.semantic.ne-primary-disabled}", text: "{colors.semantic.ne-on-primary}" }

  ne-button-primary-subtle:
    # primary 톤 약한 강조. outline 형.
    height: 44px
    padding: "12px 20px"
    rounded: "{rounded.md}"
    typography: "{typography.scale.button}"
    states:
      default:  { bg: transparent, text: "{colors.semantic.ne-primary}",        border: "{colors.semantic.ne-primary}" }
      hover:    { bg: transparent, text: "{colors.semantic.ne-primary-hover}",  border: "{colors.semantic.ne-primary-hover}" }
      active:   { bg: transparent, text: "{colors.semantic.ne-primary-active}", border: "{colors.semantic.ne-primary-active}" }
      focus:    { bg: transparent, text: "{colors.semantic.ne-primary}",        border: "{colors.semantic.ne-primary}", ring: "{colors.semantic.ne-primary-focus-ring}" }
      disabled: { bg: transparent, text: "{colors.semantic.ne-text-disabled}",  border: "{colors.semantic.ne-mono-disabled}" }

  ne-button-primary-text:
    # primary 톤 인라인 액션. 배경 없음.
    padding: "0"
    typography: "{typography.scale.button}"
    states:
      default:  { text: "{colors.semantic.ne-primary}" }
      hover:    { text: "{colors.semantic.ne-primary-hover}",  decoration: underline }
      active:   { text: "{colors.semantic.ne-primary-active}", decoration: underline }
      focus:    { text: "{colors.semantic.ne-primary}",        ring: "{colors.semantic.ne-primary-focus-ring}" }
      disabled: { text: "{colors.semantic.ne-text-disabled}" }

  ne-button-neutral:
    # 빈도 높은 일반 액션. solid. BI 무관 강조. canonical default action family (v0.9.0).
    height: 44px
    padding: "12px 20px"
    rounded: "{rounded.md}"
    typography: "{typography.scale.button}"
    states:
      default:  { bg: "{colors.semantic.ne-mono}",          text: "{colors.semantic.ne-on-mono}" }
      hover:    { bg: "{colors.semantic.ne-mono-hover}",    text: "{colors.semantic.ne-on-mono}" }
      active:   { bg: "{colors.semantic.ne-mono-active}",   text: "{colors.semantic.ne-on-mono}" }
      focus:    { bg: "{colors.semantic.ne-mono}",          text: "{colors.semantic.ne-on-mono}", ring: "{colors.semantic.ne-mono-focus-ring}" }
      disabled: { bg: "{colors.semantic.ne-mono-disabled}", text: "{colors.semantic.ne-on-mono}" }

  ne-button-neutral-subtle:
    # neutral 톤 약한 강조. outline 형. 취소·보조 동작.
    height: 44px
    padding: "12px 20px"
    rounded: "{rounded.md}"
    typography: "{typography.scale.button}"
    states:
      default:  { bg: transparent, text: "{colors.semantic.ne-text-heading}", border: "{colors.semantic.ne-mono}" }
      hover:    { bg: "{colors.semantic.ne-mono-overlay-hover}",  text: "{colors.semantic.ne-text-heading}", border: "{colors.semantic.ne-mono-hover}" }
      active:   { bg: "{colors.semantic.ne-mono-overlay-active}", text: "{colors.semantic.ne-text-heading}", border: "{colors.semantic.ne-mono-active}" }
      focus:    { bg: transparent, text: "{colors.semantic.ne-text-heading}", border: "{colors.semantic.ne-mono}", ring: "{colors.semantic.ne-mono-focus-ring}" }
      disabled: { bg: transparent, text: "{colors.semantic.ne-text-disabled}", border: "{colors.semantic.ne-mono-disabled}" }

  ne-button-neutral-text:
    # neutral 톤 인라인 액션. 배경 없음.
    padding: "0"
    typography: "{typography.scale.button}"
    states:
      default:  { text: "{colors.semantic.ne-mono}" }
      hover:    { text: "{colors.semantic.ne-mono-hover}",  decoration: underline }
      active:   { text: "{colors.semantic.ne-mono-active}", decoration: underline }
      focus:    { text: "{colors.semantic.ne-mono}",        ring: "{colors.semantic.ne-mono-focus-ring}" }
      disabled: { text: "{colors.semantic.ne-text-disabled}" }

  ne-button-inverse:
    # 어두운 또는 강조 표면 위 액션. neutral mono 한정.
    height: 44px
    padding: "12px 20px"
    rounded: "{rounded.md}"
    typography: "{typography.scale.button}"
    states:
      default:  { bg: "{colors.semantic.ne-mono-surface-base}",   text: "{colors.semantic.ne-text-heading}" }
      hover:    { bg: "{colors.semantic.ne-mono-overlay-hover}",  text: "{colors.semantic.ne-text-heading}" }
      active:   { bg: "{colors.semantic.ne-mono-overlay-active}", text: "{colors.semantic.ne-text-heading}" }
      focus:    { bg: "{colors.semantic.ne-mono-surface-base}",   text: "{colors.semantic.ne-text-heading}" }
      disabled: { bg: "{colors.semantic.ne-mono-surface-base}",   text: "{colors.semantic.ne-text-disabled}" }

# ─────────────────────────────────────────────────
# COMPONENTS — Forms (v0.2)
# ─────────────────────────────────────────────────

  form-usage:
    label: 입력 목적을 명확히 이름 붙인다.
    helper: 입력 전 보조 설명 또는 형식 안내.
    error: 사용자가 수정해야 하는 검증 실패 메시지.
    counter: 글자 수나 제한 상태를 보조적으로 표시.
    minimum_a11y:
      - placeholder는 label을 대체하지 않는다.
      - error text는 해당 control과 의미상 연결된다.
      - validation priority는 기존 정의를 유지한다.
      - required state는 시각과 의미 양쪽으로 표시한다.
    deferred:
      - 구체 ARIA 매핑
      - screen reader announcement timing
      - fieldset / legend 정책
      - async validation timing
      - debounce ms
      - full a11y spec
    validation_priority:
      - disabled
      - read-only
      - error
      - success
      - focus
      - hover
      - default
    switch_hit_area: "44x44 minimum"
    related_patterns:
      - patterns.search_form

  ne-form-input:
    height: 44px
    padding: "12px 16px"
    rounded: "{rounded.md}"
    typography: "{typography.scale.body-md}"
    placeholder-color: "{colors.semantic.ne-text-tertiary}"
    states:
      default:   { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-boundary}",            text: "{colors.semantic.ne-text-heading}" }
      hover:     { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-text-tertiary}",       text: "{colors.semantic.ne-text-heading}" }
      focus:     { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-text-tertiary}",       text: "{colors.semantic.ne-text-heading}", ring: "{colors.semantic.ne-form-input-focus-ring}" }
      disabled:  { bg: "{colors.semantic.ne-surface-section}", border: "{colors.semantic.ne-boundary}",            text: "{colors.semantic.ne-text-disabled}" }
      readonly:  { bg: "{colors.semantic.ne-surface-section}", border: "{colors.semantic.ne-boundary}",            text: "{colors.semantic.ne-text-body}" }
      error:     { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-status-danger-border}", text: "{colors.semantic.ne-text-heading}", ring: "{colors.semantic.ne-status-danger-focus-ring}" }
      success:   { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-status-success-border}", text: "{colors.semantic.ne-text-heading}" }

  ne-form-textarea:
    # ne-form-input의 모든 토큰을 그대로 사용 + min-height만 추가.
    inherits-from: ne-form-input
    min-height: 96px
    resize: vertical

  ne-form-radio:
    size: 18px
    rounded: "{rounded.full}"
    states:
      unchecked:        { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-boundary}" }
      hover:            { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-text-tertiary}" }
      checked:          { bg: "{colors.semantic.ne-primary}",         border: "{colors.semantic.ne-primary}",         inner-dot: "{colors.semantic.ne-on-primary}" }
      focus:            { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-primary}",         ring: "{colors.semantic.ne-primary-focus-ring}" }
      disabled:         { bg: "{colors.semantic.ne-surface-section}", border: "{colors.semantic.ne-boundary}" }
      disabled-checked: { bg: "{colors.semantic.ne-primary-disabled}", border: "{colors.semantic.ne-primary-disabled}", inner-dot: "{colors.semantic.ne-on-primary}" }

  ne-form-checkbox:
    size: 18px
    rounded: "{rounded.xs}"
    check-mark-svg: "stroke=on-primary, 2px line, check mark shape"
    states:
      unchecked:        { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-boundary}" }
      hover:            { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-text-tertiary}" }
      checked:          { bg: "{colors.semantic.ne-primary}",         border: "{colors.semantic.ne-primary}", check: "{colors.semantic.ne-on-primary}" }
      indeterminate:    { bg: "{colors.semantic.ne-primary}",         border: "{colors.semantic.ne-primary}", check: "{colors.semantic.ne-on-primary}" }
      focus:            { bg: "{colors.semantic.ne-surface-base}",    border: "{colors.semantic.ne-primary}", ring: "{colors.semantic.ne-primary-focus-ring}" }
      disabled:         { bg: "{colors.semantic.ne-surface-section}", border: "{colors.semantic.ne-boundary}" }
      disabled-checked: { bg: "{colors.semantic.ne-primary-disabled}", border: "{colors.semantic.ne-primary-disabled}", check: "{colors.semantic.ne-on-primary}" }

  ne-form-switch:
    track-width: 36px
    track-height: 20px
    thumb-size: 16px
    rounded: "{rounded.pill}"
    note: "Visual size 36×20; interactive hit area must be at least 44×44 on touch devices."
    states:
      off:           { track: "{colors.semantic.ne-boundary}",         thumb: "{colors.semantic.ne-surface-base}" }
      hover-off:     { track: "{colors.semantic.ne-text-tertiary}",    thumb: "{colors.semantic.ne-surface-base}" }
      on:            { track: "{colors.semantic.ne-primary}",          thumb: "{colors.semantic.ne-on-primary}" }
      hover-on:      { track: "{colors.semantic.ne-primary-hover}",    thumb: "{colors.semantic.ne-on-primary}" }
      focus:         { ring: "{colors.semantic.ne-primary-focus-ring}" }
      disabled-off:  { track: "{colors.semantic.ne-surface-section}",  thumb: "{colors.semantic.ne-surface-base}" }
      disabled-on:   { track: "{colors.semantic.ne-primary-disabled}", thumb: "{colors.semantic.ne-on-primary}" }

  ne-form-select:
    trigger:
      inherits-from: ne-form-input
      caret-color: "{colors.semantic.ne-text-tertiary}"
    panel:
      bg:      "{colors.semantic.ne-surface-base}"
      border:  "{colors.semantic.ne-boundary}"
      rounded: "{rounded.md}"
      shadow:  "{elevation.modal}"
      max-height: 320px
    option:
      default:  { bg: transparent,                        text: "{colors.semantic.ne-text-body}" }
      hover:    { bg: "{colors.semantic.ne-surface-section}", text: "{colors.semantic.ne-text-heading}" }
      selected: { bg: "{colors.semantic.ne-primary-disabled}", text: "{colors.semantic.ne-primary-active}" }
      disabled: { bg: transparent,                        text: "{colors.semantic.ne-text-disabled}" }

# ─────────────────────────────────────────────────
# Form auxiliary
# ─────────────────────────────────────────────────

  ne-form-label:
    text:        "{colors.semantic.ne-text-body}"
    typography:  "{typography.scale.body-sm}"
    weight:      "{typography.font-weight.medium}"
    margin-bottom: "{spacing.xs}"

  ne-form-helper:
    text:        "{colors.semantic.ne-text-tertiary}"
    typography:  "{typography.scale.caption-up}"
    weight:      "{typography.font-weight.regular}"
    margin-top:  "{spacing.xs}"

  ne-form-error:
    text:        "{colors.semantic.ne-status-danger}"
    typography:  "{typography.scale.caption-up}"
    weight:      "{typography.font-weight.medium}"
    margin-top:  "{spacing.xs}"

  ne-form-required:
    # label 옆 `*` 마크. 별도 토큰 만들지 않고 danger 색 차용.
    text:       "{colors.semantic.ne-status-danger}"
    typography: "{typography.scale.body-sm}"

  ne-form-counter:
    text:        "{colors.semantic.ne-text-tertiary}"
    typography:  "{typography.scale.caption-up}"
    align:       right
    over-limit:
      text:   "{colors.semantic.ne-status-danger}"
      weight: "{typography.font-weight.medium}"

  ne-form-input-prefix:
    # 입력 좌측 자리 (단위·고정 텍스트). v0.2: 텍스트 자리만 정의.
    text:    "{colors.semantic.ne-text-tertiary}"
    bg:      transparent
    padding: "0 0 0 16px"

  ne-form-input-suffix:
    # 입력 우측 자리. v0.2: 텍스트 자리만 정의.
    text:    "{colors.semantic.ne-text-tertiary}"
    bg:      transparent
    padding: "0 16px 0 0"

# ─────────────────────────────────────────────────
# COMPONENTS — Badges (v0.2.2). 신규 hex 0개, 모두 기존 토큰 차용.
# ─────────────────────────────────────────────────

  badge-usage:
    category: 콘텐츠 분류.
    level: 난이도 또는 단계.
    status: 시스템 상태.
    result: 평가/채점 결과.
    count: 알림·미확인 개수.
    rules:
      - category-color는 강조 전용이며 과사용하지 않는다.
      - status와 assessment/result는 의미가 다르다.
      - 작은 식별 요소이므로 과도한 시각 장식을 금지한다.
    deferred:
      - interactive badge
      - filter chip

  ne-badge:
    # 공통 base (count 제외)
    rounded:    "{rounded.pill}"
    padding:    "4px 12px"
    typography: "{typography.scale.caption}"

  ne-badge-category-mono:
    # 디폴트. 같은 위계 카테고리 여러 개 표시 시.
    bg:   "{colors.semantic.ne-surface-card}"
    text: "{colors.semantic.ne-text-heading}"

  ne-badge-category-color:
    # 강조 전용. 한 화면에 1~2개만. 추천·인기·신규.
    bg:   "{colors.semantic.ne-surface-emphasis-soft}"
    text: "{colors.semantic.ne-text-heading}"

  ne-badge-level-1:
    # 초급. border 없음 — bg + text 두 색만으로 위계 표현.
    bg:   "{colors.semantic.ne-status-success-bg}"
    text: "{colors.semantic.ne-status-success}"

  ne-badge-level-2:
    # 중급
    bg:   "{colors.semantic.ne-status-warning-bg}"
    text: "{colors.semantic.ne-status-warning}"

  ne-badge-level-3:
    # 고급
    bg:   "{colors.semantic.ne-status-danger-bg}"
    text: "{colors.semantic.ne-status-danger}"

  ne-badge-status-success:
    bg:   "{colors.semantic.ne-status-success-bg}"
    text: "{colors.semantic.ne-status-success}"

  ne-badge-status-warning:
    bg:   "{colors.semantic.ne-status-warning-bg}"
    text: "{colors.semantic.ne-status-warning}"

  ne-badge-status-danger:
    bg:   "{colors.semantic.ne-status-danger-bg}"
    text: "{colors.semantic.ne-status-danger}"

  ne-badge-status-neutral:
    # 미시작·진행 중 같은 중립 상태
    bg:   "{colors.semantic.ne-surface-card}"
    text: "{colors.semantic.ne-text-heading}"

  ne-badge-result-correct:
    bg:   "{colors.assessment.ne-assessment-correct-bg}"
    text: "{colors.assessment.ne-assessment-correct}"

  ne-badge-result-incorrect:
    bg:   "{colors.assessment.ne-assessment-incorrect-bg}"
    text: "{colors.assessment.ne-assessment-incorrect}"

  ne-badge-count:
    # 알림·미확인 카운트. 99+ 가로 확장 가능 → pill.
    rounded:    "{rounded.pill}"
    min-width:  "18px"
    height:     "18px"
    padding:    "0 6px"
    bg:         "{colors.semantic.ne-primary}"
    text:       "{colors.semantic.ne-on-primary}"
    typography: "11px / line-height 1 (count 전용 micro-geometry. v0.11.5 정정: body-sm 14px는 18px pill에 과대 — scale 외 예외값)"

# ─────────────────────────────────────────────────
# COMPONENTS — Avatars (v0.2.2). 4 크기 + fallback. pastel fill 사용 안 함.
# ─────────────────────────────────────────────────

  avatar-usage:
    fallback: 이미지가 없거나 로드 실패 시 initials를 표시한다.
    alt_policy:
      - 프로필 이미지가 사용자 식별에 필요하면 사용자 이름을 alt로 제공한다.
      - 주변 텍스트가 이미 사용자를 식별하면 장식 이미지로 처리할 수 있다.
    rules:
      - random pastel fill 사용 금지.
      - fallback은 ne-surface-card와 ne-text-heading을 사용한다.
    deferred:
      - image loading placeholder
      - group / stacked avatar
      - status indicator
    size_context:
      sm: 댓글·인라인 멘션.
      md: 리스트 기본.
      lg: 헤더·프로필 카드.
      xl: 큰 프로필 영역.

  ne-avatar:
    # 공통 base
    rounded:        "{rounded.full}"
    border:         "1px solid {colors.semantic.ne-boundary}"
    fallback-bg:    "{colors.semantic.ne-surface-card}"
    fallback-text:  "{colors.semantic.ne-text-heading}"

  ne-avatar-sm:
    size: 24px
    fallback-font: "{typography.scale.caption}"   # 13px — 댓글·인라인 멘션
  ne-avatar-md:
    size: 32px
    fallback-font: "{typography.scale.body-sm}"   # 14px — 리스트 기본
  ne-avatar-lg:
    size: 40px
    fallback-font: "{typography.scale.title-sm}"  # 16px — 헤더·프로필 카드
  ne-avatar-xl:
    size: 56px
    fallback-font: "{typography.scale.title-md}"  # 18px — 큰 프로필 영역

# ─────────────────────────────────────────────────
# COMPONENTS — Toast & Card (initially accepted in v0.4 inventory patch)
# ─────────────────────────────────────────────────

  ne-toast:
    status: draft
    purpose: 짧은 작업 결과를 일시적으로 알린다.
    variants:
      - neutral
      - success
      - danger
    minimum_rules:
      - temporary feedback only
      - critical error에는 toast만 사용하지 않는다.
      - v0.4.1에서는 현재 시연 위치를 toast의 잠정 기준으로 인정한다.
      - screen reader announcement는 future a11y refinement로 deferred.
    deferred:
      - mobile placement
      - queue behavior
      - exact duration

  ne-card:
    status: draft
    purpose: 관련 정보를 하나의 표면으로 묶는다.
    anatomy:
      - container
      - optional title
      - optional description
      - optional meta
      - optional actions
    variants:
      flat:
        rule: 배경과 동일한 위계의 정보 묶음.
      elevated:
        rule: 독립된 콘텐츠 블록.
      interactive:
        rule: 카드 전체가 하나의 목적지로 이동할 때만 사용.
    minimum_rules:
      - internal spacing은 기존 spacing token 참조 수준에서만 다룬다.
      - nested interactive target 금지 또는 주의.
      - media card, result card, skeleton card는 deferred.
    token_refs:
      surface: "{colors.semantic.ne-surface-base}"
      surface-muted: "{colors.semantic.ne-surface-section}"
      border: "{colors.semantic.ne-boundary}"
      text: "{colors.semantic.ne-text-heading}"
      spacing: "{spacing.*}"
      rounded: "{rounded.lg}"
      elevation: "{elevation.card}"

  ne-link:
    status: draft
    purpose: 문서, 본문, 보조 행동에서 다른 위치나 외부 리소스로 이동하는 텍스트 기반 액션을 제공한다.
    variants:
      - inline
      - standalone
      - external: deferred
    states:
      - default
      - hover
      - focus
      - disabled
    anatomy:
      - text
      - optional trailing icon
      - underline or visual affordance: implementation dependent
    usage:
      - 주요 CTA는 button을 먼저 검토한다.
      - 본문 안 이동, 문서 링크, 보조 탐색은 link를 사용한다.
      - inline link는 주변 text rhythm을 깨지 않는다.
      - link를 button처럼 보이게 만들지 않는다.
      - destructive action에는 link를 사용하지 않는다.
    behavior:
      - 내부 anchor 또는 route 이동은 현재 앱 구조에 따른다.
      - external link 정책은 deferred다.
      - download action은 button 또는 explicit download affordance를 검토한다.
    a11y:
      - link text는 목적지를 설명해야 한다.
      - 여기, 클릭처럼 목적지를 설명하지 않는 단독 link text는 피한다.
      - icon-only link는 v0.5.1 범위 밖이다.
      - focus state는 기존 focus token을 따른다.
    token_refs:
      text: "기존 ne-text-* token"
      accent: "기존 ne-primary 또는 currentColor. 새 token 만들지 않는다."
      focus: "기존 focus ring token"
      typography: "주변 body typography를 따른다."
    deferred:
      - external link icon policy
      - visited state
      - underline policy 정식화
      - routing policy
      - link inside dark surface
    must_not:
      - link를 primary CTA 대체물로 남용하지 않는다.
      - raw primary red를 임의로 적용하지 않는다.
      - button과 link 역할을 섞지 않는다.
      - 신규 color token을 만들지 않는다.

  ne-alert:
    status: draft
    purpose: 화면 안에 남는 persistent feedback을 제공한다.
    variants:
      - neutral
      - success
      - warning
      - danger
    states:
      - default
      - with-action
    anatomy:
      - container
      - optional title
      - description
      - optional action
    usage:
      - toast보다 오래 남아야 하는 상태 메시지에 사용한다.
      - 사용자가 읽고 처리해야 하는 안내에 사용한다.
      - critical error를 toast만으로 전달하지 않는다.
      - status와 assessment/result 의미를 섞지 않는다.
    behavior:
      - 화면 흐름 안에 배치된다.
      - 자동 사라짐을 기본으로 하지 않는다.
      - action이 있으면 사용자의 다음 행동을 명확히 한다.
      - v0.6.2부터 variant 신호는 container background로 전달한다.
      - v0.6.2부터 dismiss interaction을 제공한다.
    a11y:
      - alert 역할은 추후 구현에서 검토한다.
      - 중요한 메시지는 색상만으로 전달하지 않는다.
      - dismiss button에는 accessible label을 제공한다.
      - full screen reader announcement spec은 deferred다.
    token_refs:
      neutral-bg: "{colors.semantic.ne-surface-base}"
      neutral-text: "{colors.semantic.ne-text-heading}"
      success-bg: "{colors.semantic.ne-status-success-bg}"
      warning-bg: "{colors.semantic.ne-status-warning-bg}"
      danger-bg: "{colors.semantic.ne-status-danger-bg}"
      action-bg: "{colors.semantic.ne-neutral}"
      action-text: "{colors.semantic.ne-on-neutral}"
      rounded: "{rounded.md}"
      typography: "{typography.scale.body-md}"
      spacing: "{spacing.*}"
      border: "{colors.semantic.ne-boundary}"
    deferred:
      - icon policy
      - screen reader announcement timing
      - alert role mapping
      - prominent / callout variant
    must_not:
      - toast와 같은 temporary feedback으로 취급하지 않는다.
      - status와 assessment/result를 섞지 않는다.
      - 신규 status color를 만들지 않는다.
      - variant 의미를 action button color만으로 전달하지 않는다.
      - Carbon visual style이나 Material color language를 복제하지 않는다.

  ne-dialog:
    status: draft
    purpose: 화면 흐름 위에 집중 작업, 확인, 중요한 선택을 띄운다.
    variants:
      - standard
      - confirmation
      - destructive
    states:
      - closed
      - open
    anatomy:
      - panel
      - optional title
      - description
      - actions
      - overlay
    usage:
      - 현재 화면 맥락을 유지하면서 짧은 확인이나 집중 작업이 필요할 때 사용한다.
      - destructive variant는 되돌리기 어려운 행동을 확인할 때만 사용한다.
      - 단순 안내는 alert 또는 toast를 먼저 검토한다.
    behavior:
      - v0.6 demo는 open / close, ESC close, backdrop click close를 제공한다.
      - full focus trap, portal, scroll lock은 deferred다.
      - destructive action은 danger 의미를 사용한다.
      - action과 cancel의 의미 구분은 future implementation에서 검토한다.
    a11y:
      - title과 description 연결은 future implementation에서 검토한다.
      - role=dialog, aria-modal, title / description 연결을 최소 demo에 반영한다.
      - full focus management와 full dialog accessibility spec은 deferred다.
    token_refs:
      panel-bg: "{colors.semantic.ne-surface-base}"
      border: "{colors.semantic.ne-boundary}"
      text: "{colors.semantic.ne-text-heading}"
      shadow: "{elevation.modal}"
      rounded: "{rounded.lg}"
      spacing: "{spacing.*}"
    deferred:
      - focus trap
      - portal
      - animation
      - scroll lock
      - alert-dialog 분리
      - action/cancel full policy
      - full keyboard spec
    must_not:
      - modal portal을 구현하지 않는다.
      - 모든 확인 작업에 dialog를 남용하지 않는다.
      - modal visual styling을 외부 레퍼런스에서 복제하지 않는다.
      - 신규 overlay token을 만들지 않는다.
      - 신규 rgba를 만들지 않는다.

  ne-tabs:
    status: draft
    purpose: 같은 맥락 안의 콘텐츠 패널을 전환한다.
    variants:
      - line
      - contained: deferred
    states:
      - default
      - selected
      - hover
      - focus
      - disabled
    anatomy:
      - tablist
      - tab
      - active indicator
      - panel
    usage:
      - 같은 정보 구조 안에서 병렬 패널을 전환할 때 사용한다.
      - 전역 내비게이션을 대체하지 않는다.
      - filter, sort, stepper, command palette를 대체하지 않는다.
      - label은 짧고 명확하게 유지한다.
    behavior:
      - v0.6 demo는 click switching과 ArrowLeft / ArrowRight 최소 이동을 제공한다.
      - Home / End, overflow, vertical tabs는 deferred다.
      - full keyboard interaction은 deferred다.
    a11y:
      - tablist / tab / tabpanel 역할은 future implementation에서 검토한다.
      - ArrowLeft / ArrowRight 외 keyboard spec은 deferred다.
      - selected state는 색상만으로 전달하지 않는다.
    token_refs:
      text-default: "{colors.semantic.ne-text-tertiary}"
      text-selected: "{colors.semantic.ne-text-heading}"
      indicator: "{colors.semantic.ne-primary}"
      border: "{colors.semantic.ne-boundary}"
      focus-ring: "{colors.semantic.ne-primary-focus-ring}"
      typography: "{typography.scale.button}"
      spacing: "{spacing.*}"
    deferred:
      - contained tabs
      - vertical tabs
      - overflow behavior
      - keyboard full spec
      - responsive behavior
      - Home / End keyboard support
    must_not:
      - navigation과 혼동하지 않는다.
      - filter chip이나 segmented control 대체물로 쓰지 않는다.
      - IBM visual style을 복제하지 않는다.
      - full keyboard spec을 지금 작성하지 않는다.

  ne-accordion:
    status: draft
    purpose: 긴 보조 정보나 선택적 내용을 접고 펼친다.
    variants:
      - single item
      - grouped accordion
    states:
      - closed
      - open
      - hover
      - focus
      - disabled
    anatomy:
      - item
      - trigger
      - optional indicator
      - content
    usage:
      - FAQ, 설정 그룹, 보조 설명처럼 사용자가 필요할 때 펼쳐보는 콘텐츠에 사용한다.
      - 핵심 정보를 기본적으로 숨기는 용도로 남용하지 않는다.
      - 단계 진행이나 tab 전환을 대체하지 않는다.
    behavior:
      - v0.6 demo는 single-open toggle을 제공한다.
      - simple accordion은 closed=ChevronDown / open=ChevronUp icon pair를 사용한다.
      - multiple open 정책은 deferred다.
      - nested accordion은 deferred다.
      - full keyboard interaction은 deferred다.
    a11y:
      - trigger와 content를 aria-controls로 연결한다.
      - expanded state는 aria-expanded로 전달한다.
      - full accordion accessibility spec은 deferred다.
    token_refs:
      border: "{colors.semantic.ne-boundary}"
      bg: "{colors.semantic.ne-surface-base}"
      text: "{colors.semantic.ne-text-heading}"
      muted-text: "{colors.semantic.ne-text-tertiary}"
      focus-ring: "{colors.semantic.ne-primary-focus-ring}"
      spacing: "{spacing.*}"
      rounded: "{rounded.md}"
    deferred:
      - single vs multiple open policy
      - nested accordion
      - keyboard full spec
      - animation
      - content height transition
    must_not:
      - 핵심 정보를 기본적으로 숨기지 않는다.
      - disclosure 구조를 이유 없이 복잡하게 만들지 않는다.
      - exact interaction spec을 외부 레퍼런스에서 복제하지 않는다.

icon_system:
  status: draft
  library: lucide-react
  license: ISC
  purpose: UI 의미를 보조하는 단일 icon source와 사용 규칙을 정의한다.
  size_scale:
    - 16
    - 20
    - 24
  color:
    - currentColor를 기본으로 사용한다.
    - 의미 색은 기존 ne-text-* 또는 ne-status-* token을 따른다.
    - raw hex를 사용하지 않는다.
  usage:
    - Lucide 전체가 아니라 NE approved subset만 사용한다.
    - 새 아이콘을 쓰려면 registry에 먼저 추가한다.
    - registry는 Core/UI, Status/Feedback, Action, Navigation/Direction, Document/File/Print, Education/Learning, User/Class/Admin, Communication/Notification, Search/Filter/View, Mobile/Device, Theme/Mode, System/Security/Data, Emotion/Reaction, Media/Attachment 그룹으로 관리한다.
    - icon name은 Lucide export name을 따른다.
    - icon은 의미 체계를 보조하며, 중요한 상태를 icon만으로 전달하지 않는다.
    - decorative icon과 informative icon을 구분한다.
    - decorative icon은 aria-hidden을 사용한다.
    - informative icon은 주변 text 또는 aria-label로 의미를 전달한다.
    - icon-only control은 aria-label이 필수다.
    - emoji를 icon 대체로 사용하지 않는다.
    - icon library는 lucide-react 하나로 제한한다.
  approved_icons_count: 156
  approved_icons:
    core_ui:
      - PanelsTopLeft
      - PanelTop
      - LayoutGrid
      - Rows3
      - Columns
      - SquareStack
      - MoreHorizontal
      - MoreVertical
    status_feedback:
      - Info
      - CircleHelp
      - CircleCheck
      - BadgeCheck
      - TriangleAlert
      - CircleAlert
      - OctagonAlert
      - XCircle
      - Loader
      - RefreshCw
      - Clock
    action:
      - Download
      - Upload
      - Copy
      - ExternalLink
      - Plus
      - Minus
      - X
      - Trash2
      - Archive
      - ArchiveX
      - Eraser
      - Undo2
    navigation_direction:
      - ChevronDown
      - ChevronUp
      - ChevronLeft
      - ChevronRight
      - ArrowRight
      - ArrowLeft
      - ArrowUp
      - ArrowDown
      - ArrowUpDown
      - ArrowDownUp
      - MoveRight
      - MoveLeft
      - Home
      - Menu
      - PanelLeft
      - PanelRight
    document_file_print:
      - File
      - FileText
      - Files
      - FilePlus
      - FileMinus
      - FileCheck
      - FileX
      - FileQuestion
      - FileSearch
      - FilePen
      - FileDown
      - FileUp
      - Clipboard
      - ClipboardList
      - ClipboardCheck
      - Printer
    education_learning:
      - GraduationCap
      - School
      - BookOpen
      - BookMarked
      - Notebook
      - NotebookPen
      - Pencil
      - PenLine
      - Highlighter
      - Library
      - Brain
      - Lightbulb
      - Calculator
      - Presentation
    user_class_admin:
      - User
      - Users
      - UserPlus
      - UserMinus
      - UserCheck
      - UserX
      - CircleUser
      - IdCard
      - Contact
      - ShieldUser
      - KeyRound
      - Lock
      - Unlock
    communication_notification:
      - Bell
      - BellRing
      - BellOff
      - Mail
      - Inbox
      - Send
      - MessageCircle
      - MessagesSquare
      - Megaphone
    search_filter_view:
      - Search
      - Filter
      - ListFilter
      - SlidersHorizontal
      - Eye
      - EyeOff
      - List
      - ListTodo
    mobile_device:
      - Smartphone
      - Tablet
      - Laptop
      - Monitor
      - MonitorSmartphone
      - MousePointer
      - Hand
      - Keyboard
      - Wifi
      - WifiOff
      - Battery
      - BatteryCharging
    theme_mode:
      - Sun
      - Moon
      - Contrast
      - Palette
      - Paintbrush
      - Accessibility
      - Settings
      - Cog
    system_security_data:
      - Wrench
      - Shield
      - ShieldCheck
      - Key
      - Database
      - Server
      - Cloud
      - CloudOff
      - CloudUpload
      - CloudDownload
    emotion_reaction:
      - Star
      - Heart
      - Bookmark
      - ThumbsUp
      - ThumbsDown
      - Smile
      - Meh
      - Frown
      - Laugh
      - PartyPopper
    media_attachment:
      - Image
      - Images
      - Paperclip
      - Camera
      - CirclePlay
      - Play
      - Pause
      - Volume2
      - VolumeX

  # v0.11.0-alpha: Phase 5 icon migration에서 발견된 owner decision 대기 4건.
  # approved_icons에 포함되지 않으며 wrapper에서도 export되지 않는다.
  # 임시로 가장 가까운 approved icon을 alias import로 차용해 renderer demo는
  # 계속 build되지만, baseline / PoC fork에는 사용하지 않는다.
  # approved_icons_count: 156은 변경되지 않는다.
  candidates:
    History:
      used_in: ["src/components/Header.jsx:88 (Patch Notes button)"]
      temporary_substitute: Clock
      semantic_context: "패치 노트 이력 / 버전 history 신호"
      options:
        - "(a) UI 자체 제거 (텍스트만 유지)"
        - "(b) Clock 임시 차용 유지 (현재 상태)"
        - "(c) approved_icons에 History 추가 (owner decision)"
    ListChecks:
      used_in: ["src/examples/sections/DataComponentsSection.jsx (assignment row checklist)"]
      temporary_substitute: ClipboardCheck
      semantic_context: "체크리스트 / 과제 목록 진행 신호"
      options:
        - "(a) UI 자체 제거"
        - "(b) ClipboardCheck 임시 차용 유지 (현재 상태)"
        - "(c) approved_icons에 ListChecks 추가 (owner decision)"
    PauseCircle:
      used_in: ["src/examples/sections/DataComponentsSection.jsx (stalled progress caption icon)"]
      temporary_substitute: Pause
      semantic_context: "정체된 진행률 / 학습 정지 신호"
      options:
        - "(a) UI 자체 제거"
        - "(b) Pause 임시 차용 유지 (현재 상태)"
        - "(c) approved_icons에 PauseCircle 추가 (owner decision)"
    Table:
      used_in: ["src/examples/sections/DataComponentsSection.jsx (table demo header)"]
      temporary_substitute: SquareStack
      semantic_context: "데이터 테이블 / 행렬 보기 신호"
      options:
        - "(a) UI 자체 제거"
        - "(b) SquareStack 임시 차용 유지 (현재 상태)"
        - "(c) approved_icons에 Table 추가 (owner decision)"
    review_at: v0.11.1-validation
    note: |
      4건 모두 renderer demo (src/examples/) 안에서만 임시 차용된 상태다.
      baseline / handoff zip / PoC fork target에는 포함되지 않는다.
      v0.11.1 validation 사이클에서 owner decision으로 (a)/(b)/(c) 중 선택해 정식 처리한다.

  semantic_pair_rules:
    - 펼침/닫힘, 이전/다음, 추가/삭제, 보임/숨김처럼 의미 쌍이 필요한 icon은 한쪽만 등록하지 않는다.
    - 잠금/해제, 알림 켬/끔, 업로드/다운로드, 재생/일시정지 같은 상태 쌍은 pair 기준으로 관리한다.
    - 같은 의미에는 같은 icon을 반복 사용한다.
    - 한 컴포넌트 안에서 방향형 chevron과 plus/minus disclosure를 섞지 않는다.
  disclosure_icon_policy:
    - tree / nested navigation / file-like hierarchy는 ChevronRight(닫힘) / ChevronDown(열림) pair를 사용한다.
    - accordion / FAQ / simple expandable panel은 ChevronDown(닫힘) / ChevronUp(열림) pair를 사용한다.
    - plus / minus pair는 밀도 높은 설정 패널이나 보조 disclosure에서 검토한다.
    - 한 컴포넌트 안에서 chevron 방향형과 plus/minus형을 섞지 않는다.
  icon_supply_policy:
    primary_source: lucide-react
    rules:
      - Lucide에서 적절한 icon을 먼저 찾는다.
      - Lucide에 없는 icon만 NE custom icon으로 제작한다.
      - custom icon은 Lucide의 기본 구조와 시각 문법을 따른다.
      - custom icon도 사용 전 approved icon registry에 등록한다.
      - registry에 없는 icon은 제품 UI에서 즉흥적으로 사용하지 않는다.
      - 같은 의미에는 같은 icon을 반복 사용한다.
      - semantic pair가 필요한 icon은 한쪽만 등록하지 않는다.
    custom_icon_requirements:
      - 기존 Lucide icon과 같은 viewBox / stroke / rounded cap / rounded join 감각을 따른다.
      - currentColor 기반으로 동작해야 한다.
      - raw color를 포함하지 않는다.
      - fill icon을 임의로 만들지 않는다.
      - 의미, 사용처, 대체 텍스트 필요 여부를 registry에 함께 기록한다.
  must_not:
    - Lucide 전체를 사용 가능 목록으로 보지 않는다.
    - registry에 없는 icon을 즉흥적으로 쓰지 않는다.
    - custom SVG를 registry 없이 직접 UI에 넣지 않는다.
    - Carbon/Radix/Material/Heroicons 등 다른 icon set과 섞지 않는다.
    - custom SVG asset을 임의로 추가하지 않는다.
    - icon 전용 신규 color token을 만들지 않는다.
    - 아이콘만으로 중요한 상태를 전달하지 않는다.
  deferred:
    - ne-icon 정식 컴포넌트
    - icon size token 정식화
    - NE-specific custom icon 제작
    - icon-only button size 정책
    - filled icon 사용 여부

state_families:
  loading:
    status: draft
    purpose: 비동기 처리 중임을 표시하고 중복 행동을 막는다.
    types:
      - button
      - section
      - page
      - inline
    button: 동일 액션의 중복 실행을 막는 loading이다.
    section: 특정 영역 갱신 중임을 표시하는 loading이다.
    page: 초기 화면 또는 큰 전환 중임을 표시하는 loading이다.
    inline: 작은 컨트롤이나 텍스트 옆 상태를 표시하는 loading이다.
    minimum_rules:
      - 중복 제출 방지.
      - aria-busy 고려.
      - 1초 이상이면 시각 피드백 표시.
      - 버튼 width 흔들림 방지.
    deferred:
      - spinner SVG
      - animation 상세
      - skeleton visual policy
      - type별 token_refs
    indicator:
      status: draft
      purpose: 로딩 중임을 보여주는 기본 시각 장치.
      types:
        - spinner
      applies_to:
        - button
        - section
        - page
        - inline
      rules:
        - spinner는 진행률을 보여주지 않는 loading indicator다.
        - button loading은 관련 action 안에서 표시한다.
        - section loading은 해당 영역 안에서 표시한다.
        - page loading은 화면의 주요 진행 상태를 보여줄 때 검토한다.
        - inline loading은 관련 label 또는 control 근처에 배치한다.
      deferred:
        - spinner SVG path
        - animation duration
        - exact size token
        - overlay opacity
        - motion policy
  validation:
    status: draft
    purpose: 입력값의 유효성 상태를 표현한다.
    priority:
      - disabled
      - read-only
      - error
      - success
      - focus
      - hover
      - default

patterns:
  # v0.11.0-alpha structural layout pattern. F-005 / F-010 (section padding 즉흥) 차단용.
  # 신규 primitive/color token 아님. 기존 spacing 토큰 references.
  section_rhythm:
    status: draft
    purpose: page header / section / card padding의 vertical rhythm 통일.
    page_header_margin_bottom: "{spacing.lg}"   # 24px
    section_v_padding: "{spacing.xxl}"          # 48px
    card_padding_default: "{spacing.lg}"        # 24px
    card_padding_compact: "{spacing.md}"        # 16px (list/table 내장 카드)
    must_not:
      - section padding을 페이지마다 inline 즉흥 결정하지 않는다.
      - section_v_padding을 임의 px로 박지 않는다.

  empty_state:
    status: draft
    purpose: 콘텐츠가 없거나 결과가 없을 때 상태와 다음 행동을 안내한다.
    anatomy:
      - title
      - description
      - optional action
    variants:
      - no-data
      - no-results
      - first-use
      - recoverable-error
    rule: 검색 결과 없음은 error가 아니라 empty state로 처리한다.
    recoverable_error:
      rule: 복구 가능한 실패에는 retry action을 제공한다.
      note: critical error는 toast만으로 전달하지 않는다.
    deferred:
      - illustration asset/style system
  search_form:
    status: draft
    purpose: 사용자가 키워드로 콘텐츠를 찾는다.
    minimum_rules:
      - Enter submit을 지원한다.
      - no-results는 patterns.empty_state와 연결한다.
      - search form을 command palette처럼 확장하지 않는다.
    includes:
      - search input
      - optional submit
      - optional clear
      - loading
      - no-results
      - error
    deferred:
      - advanced filter
      - sort
      - saved search
      - autocomplete
      - search result card layout
  feedback:
    status: draft
    purpose: 작업 결과나 상태를 사용자에게 전달한다.
    includes:
      - toast
      - ne-alert draft
    distinction:
      toast: 일시적 피드백.
      alert: 화면 안에 남는 메시지.
    boundary: Toast는 일시적 feedback이다. Alert는 사용자가 읽고 처리해야 하는 in-page persistent message다. Critical error는 toast만으로 전달하지 않는다.
  page_shell:
    status: draft
    purpose: 화면의 기본 골격을 잡는 page-level pattern.
    required_parts:
      - main
    optional_parts:
      - header
      - sidebar
      - footer
    rules:
      - page_shell은 Header / Sidebar / Main / Footer 같은 화면 슬롯을 조합한다.
      - main은 페이지의 주요 콘텐츠 영역이다.
      - sidebar는 탐색이나 보조 정보가 반복될 때만 검토한다.
      - footer는 제품 화면에서 항상 필요하지 않다.
    deferred:
      - max-width
      - breakpoints
      - sidebar width
      - responsive layout rules
      - grid system

  ne-table:
    status: draft
    purpose: 행과 열로 데이터를 비교하고 관리하는 화면에 사용한다.
    variants:
      - basic
      - compact
      - status-table
      - comparison
    anatomy:
      - table
      - optional caption
      - header
      - header cell
      - row
      - cell
      - optional status cell
      - optional action cell
      - empty row
    states:
      - default
      - hover
      - loading
      - empty
      - error
      - selected: deferred
    usage:
      - 행/열 비교가 필요한 데이터에 사용한다.
      - 단순 반복 목록은 data-list를 먼저 검토한다.
      - 카드형 탐색은 card-grid를 검토한다.
      - 모바일에서는 table을 그대로 축소하지 않고 responsive fallback을 검토한다.
    behavior:
      - v0.6에서는 static/basic table demo만 구현한다.
      - sorting, filtering, pagination, selection은 deferred다.
    a11y:
      - header/cell 관계를 유지한다.
      - caption/summary 정책은 deferred다.
      - full grid keyboard spec은 deferred다.
    deferred:
      - sorting
      - filtering
      - pagination
      - row selection
      - column resizing
      - sticky header
      - virtualization
      - spreadsheet-like grid
      - full data grid behavior
    must_not:
      - full data grid처럼 구현하지 않는다.
      - sorting/filtering/pagination/selection을 v0.6 demo에 넣지 않는다.

  ne-data-list:
    status: draft
    purpose: 반복 객체 목록을 짧고 스캔 가능한 구조로 보여준다.
    anatomy:
      - list
      - list item
      - title
      - meta
      - description
      - optional status
      - optional leading icon
      - optional trailing action
      - empty state
    usage:
      - 읽고 고르는 반복 항목에 사용한다.
      - 행과 열 비교가 필요하면 table을 먼저 검토한다.
      - 시각적 탐색이나 선택이 중심이면 card-grid를 검토한다.
    deferred:
      - bulk selection
      - drag/reorder
      - virtualized list
      - swipe action
      - nested list

  ne-divider:
    status: draft
    purpose: section, card 내부, list item 사이를 구분한다.
    variants:
      - horizontal
      - subtle
      - section
    token_refs:
      border: "{colors.semantic.ne-boundary}"
    must_not:
      - 신규 token을 만들지 않는다.
      - raw border color를 사용하지 않는다.

  metric_display:
    status: draft
    purpose: label, value, unit, optional status를 가진 숫자 표현이다.
    anatomy:
      - label
      - value
      - unit
      - optional status
      - optional delta
    usage:
      - 점수/평가 결과는 assessment/result 의미로 다룬다.
      - 시스템 상태는 status 의미로 다룬다.
      - chart나 graph를 대체하지 않는다.
    must_not:
      - status와 assessment/result를 섞지 않는다.
      - sparkline이나 chart를 포함하지 않는다.

  progress_feedback:
    status: draft
    purpose: 진행 정도를 값으로 보여준다.
    variants:
      - neutral
      - active
      - success
      - warning
      - stalled
    anatomy:
      - label
      - value
      - progress bar
      - optional caption
      - optional icon (stalled signal only)
    usage:
      - determinate progress에 사용한다.
      - loading은 진행 중임을, progress는 진행 정도를 값으로 보여준다.
      - variant는 props로 외부에서 전달받는다.
      - 임계값과 도메인 정책은 사용 서비스가 결정한다.
    deferred:
      - step progress
      - wizard
      - stepper
      - progress token 정식화

component_candidates:
  ne-dropdown:
    status: candidate
    purpose: 숨겨진 선택지나 액션 목록을 연다.
    likely_use: 액션 메뉴, 간단 선택, overflow action.
    required_decisions:
      - menu vs select 구분
      - keyboard
      - positioning
    must_not: select 대체품처럼 무분별하게 사용하지 않는다.
  ne-tooltip:
    status: candidate
    purpose: 짧은 보조 설명을 제공한다.
    likely_use: icon-only 버튼 설명, 축약 라벨 보조.
    required_decisions:
      - hover/focus
      - delay
      - interactive content 금지 여부
    must_not: 중요한 설명이나 오류 메시지를 tooltip에만 넣지 않는다.
  ne-pagination:
    status: draft
    purpose: 긴 목록을 페이지 단위로 이동한다.
    likely_use: 검색 결과, 데이터 목록.
    source: v4.1 교재목록(BOOK-LIST-001) 구현 반영. numbered 방식 확정.
    token_count_policy: excluded_from_token_counts
    visual:
      container: 가운데 정렬 · gap 4px · 상단 여백 {spacing.xl}
      number: 36x36 hit area · 테두리/배경 없음(borderless) · color {ne-text-body} · hover {ne-text-heading}
      current: 원형(border-radius 50%) · 배경 {ne-text-heading} · 텍스트 흰색(on-dark) · fw-bold
      arrow: 36x36 · 테두리/배경 없음 · chevron-left/right 아이콘만 · color {ne-text-body}
    required_decisions:
      - page size (미정)
      - mobile 표시 방식 (미정)
    must_not:
      - infinite scroll 정책을 대신 결정하지 않는다.
      - number/arrow에 테두리·배경을 넣지 않는다 (현재 페이지 원형만 강조).
  ne-breadcrumb:
    status: candidate
    purpose: 현재 위치와 상위 경로를 표시한다.
    likely_use: 깊은 정보 구조, 관리 화면.
    required_decisions:
      - truncation
      - current page 표시
    must_not: 전역 내비게이션으로 사용하지 않는다.
  ne-command-palette:
    status: candidate
    purpose: keyboard-first 방식으로 명령과 이동을 찾는다.
    likely_use: 내부 도구, 빠른 이동, 액션 실행.
    required_decisions:
      - keyboard-first
      - search
      - grouping
      - keyboard shortcut
    must_not: 현재 범위에서 제품 기능처럼 구현하지 않는다.

pattern_candidates:
  advanced_search:
    status: candidate
    purpose: 검색 조건을 확장한다.
    likely_use: 콘텐츠 탐색, 관리 목록.
    required_decisions:
      - filter와 sort 분리
      - saved search 필요 여부
    must_not: search_form draft에 포함하지 않는다.
  filter_sort:
    status: candidate
    purpose: 목록의 조건과 순서를 바꾼다.
    likely_use: 데이터 목록, 카드 그리드.
    required_decisions:
      - filter chip
      - sort menu
      - reset behavior
    must_not: v0.4.1에서 정식 pattern으로 승격하지 않는다.
  card_grid:
    status: candidate
    purpose: 카드 단위 콘텐츠를 격자로 보여준다.
    likely_use: 콘텐츠 탐색, 템플릿 선택.
    required_decisions:
      - responsive columns
      - media 여부
      - interactive card 규칙
      - ne-data-list / table과의 경계
    must_not: ne-card draft를 곧바로 result card로 확장하지 않는다.
  step_flow:
    status: candidate
    purpose: 순차 작업의 현재 단계와 다음 행동을 보여준다.
    likely_use: 온보딩, 제출 흐름, 설정 마법사.
    required_decisions:
      - linear/non-linear
      - validation gate
      - progress 표시
    must_not: 단순 페이지 이동을 과하게 단계화하지 않는다.
  confirmation_flow:
    status: candidate
    purpose: 중요한 행동 전후의 확인 흐름을 정의한다.
    likely_use: 삭제, 제출, 되돌릴 수 없는 변경.
    required_decisions:
      - dialog 필요 여부
      - destructive copy
      - undo 가능 여부
    must_not: 모든 액션에 확인 단계를 붙이지 않는다.
  access_state:
    status: candidate
    purpose: 권한, 잠금, 읽기 전용, 사용 불가 상태를 표현한다.
    likely_use:
      - 교사만 수정 가능한 화면
      - 학생은 보기만 가능한 화면
      - 제출 후 수정 불가 상태
      - 마감된 과제
      - 권한이 부족한 사용자
    boundary:
      - disabled control은 단일 control의 비활성 상태다.
      - access_state는 화면이나 콘텐츠 단위의 권한/잠금 상태다.
    required_decisions:
      - role별 화면 정책
      - read-only view pattern
      - locked state visual treatment
      - permission message 위치
    must_not:
      - 권한 정책을 UI token으로 해결하지 않는다.
      - disabled style만으로 권한 부족을 설명하지 않는다.

# ─────────────────────────────────────────────────
# COMPONENT VISUAL CONTRACTS (v0.6.1)
# Layer 3 visual composition contracts.
# primitive / semantic token 이후에 적용되는 컴포넌트 단위
# 시각 조립 규칙이다. existing primitive / semantic token을
# 어떻게 조합할지 정의할 뿐, 새로운 token 값을 만들지 않는다.
# component_contracts의 component alias는 tokenCounts에
# 포함하지 않는다.
# ─────────────────────────────────────────────────
component_contracts:

  ne-alert:
    status: draft
    source: v0.6.2 alert variant signal moves to container background
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    container:
      padding: space-lg
      border: ne-boundary
      border_radius: rounded-lg
      shadow: elev-modal
      text_align: center
      display: block
      position: relative
    heading:
      align_items: center
      justify_content: center
      gap: space-xs
    title:
      font_size: 18px
      font_weight: fw-bold
      color: ne-text-heading
    description:
      margin_top: space-xs
      color: ne-text-body
      font_size: 14px
      line_height: 1.55
    actions:
      display: flex
      margin_top: space-lg
    action_button:
      width: 100%
      padding: 8px 12px
      border_radius: rounded-md
      font_size: 13px
      font_weight: fw-medium
      background: ne-neutral
      color: ne-on-neutral
      text_align: center
    variants:
      neutral:
        container_background: ne-surface-base
        action_background: ne-neutral
        action_color: ne-on-neutral
      success:
        container_background: ne-status-success-bg
        action_background: ne-neutral
        action_color: ne-on-neutral
      warning:
        container_background: ne-status-warning-bg
        action_background: ne-neutral
        action_color: ne-on-neutral
      danger:
        container_background: ne-status-danger-bg
        action_background: ne-neutral
        action_color: ne-on-neutral
    behavior:
      dismissible: true
      dismiss_button_position: heading_top_right_or_card_top_right
      main_action_width: 100%
    preserves:
      - v0.6.1 alert card visual contract
      - action button neutral hierarchy
      - component_contracts tokenCounts exclusion
    must_not:
      - variant 의미를 action button color만으로 전달하지 않는다.
      - main action width를 100%에서 바꾸지 않는다.
      - alert prominent variant를 추가하지 않는다.
      - 신규 token을 추가하지 않는다.

  ne-global-header:
    status: draft
    source: v4.0 NE Books 자사몰 개편 — nebooks.co.kr 상단 GNB 재현 (wireframe_v2.0)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    structure:
      - util_bar        # 1행: 패밀리/유틸 메뉴 + 통합회원가입(우)
      - brand_line      # 2행: BI 로고(좌) · GNB 메뉴(중앙) · 검색+유틸아이콘(우)
      - compact_header  # 스크롤 고정 시 노출되는 1행 축약 헤더
    behavior:
      open_header:
        position: fixed
        background: transparent              # 메인 비주얼 배너 위에 오버레이(오픈 헤더)
        on_scroll: ">40px 시 open_header 숨김(opacity/visibility) → compact_header 노출"
      compact_header:
        height: 64px
        background: ne-surface-base
        shadow: "elevation 라이트 미니멀 3단 중 1단"
        layout: "BI(좌) · 메뉴(중앙) · 검색아이콘+유틸아이콘(우)"
      page_state:
        main: "헤더 투명 / 배너 배경 = banner_bg"
        sub:  "헤더 하단 ne-boundary 라인 노출(.neb-subpage) · 배경 흰색"
    util_bar:
      background: transparent
      border_bottom: ne-boundary
      typography: "{typography.scale.caption}"
      text_color: ne-text-tertiary
      active_tab:                            # "영어·수학교재" 폴더형 탭
        border: "ne-boundary (top/left/right)"
        border_radius: "{rounded.lg} (상단 모서리만)"
        background: transparent              # 페이지 배경이 그대로 비침
        text: "ne-text-heading / fw-bold"
        bottom_line: "없음 (페이지 배경색 덮개로 baseline 차단)"
    brand_line:
      max_width: "none (풀폭, 좌우 40px 패딩 · 화면 넓어지면 양쪽으로 확장)"
      layout: "space-between (logo 좌 / menu 중앙 / 검색+아이콘 우)"
      logo: "img height 28px (compact 20px)"
      gnb_menu:
        typography: "16px / fw-medium"
        default: ne-text-body
        hover_and_active: "ne-primary text + 3px underline (open/compact 공통)"
      search:
        collapsed: "검색 아이콘만 (stroke-width 1, ne-text-body)"
        expanded: "클릭 시 좌측으로 슬라이드(width 0→260px) · pill · border ne-boundary · bg ne-surface-base"
      util_icons:                            # 로그인 / 장바구니 / 마이페이지 / 고객센터
        size: "28px / stroke-width 1"
        color: ne-text-body
        hover: ne-primary
      quick_menu_floating:                   # 우측 하단 고정 플로팅(선생님 자료·MP3/단어장·맞춤형 교재추천)
        shape: "원형 56px"
        label: "hover 시 좌측 노출"
    tokens_used:
      - "{colors.semantic.ne-surface-base}"
      - "{colors.semantic.ne-boundary}"
      - "{colors.semantic.ne-text-heading}"
      - "{colors.semantic.ne-text-body}"
      - "{colors.semantic.ne-text-tertiary}"
      - "{colors.semantic.ne-primary}"
      - "{rounded.pill} / {rounded.lg}"
      - "{typography.scale.body / caption / button}"
    raw_values_to_reconcile:                 # 현재 wireframe 인라인 하드코딩 → 토큰 매핑 필요
      brand_red:      "#e2231a   # GNB active/hover → colors.brand.* 또는 ne-primary 매핑"
      util_text:      "#6d6d6d   # → ne-text-tertiary 근접값 확정"
      icon_stroke:    "#555555   # → ne-text-body 계열"
      banner_bg:      "#F3F3F3   # 메인 비주얼 배너 배경(var --neb-banner-bg)"
      quickmenu_dark: "#1E1718 / hover #E73829   # 우측 플로팅 퀵메뉴 원형 버튼"
    preserves:
      - 오픈(투명) 헤더 → 스크롤 시 compact 헤더 전환
      - util_bar 통합회원가입 영역은 항상 표시(투명 오버레이에서 제외 안 함)
      - active 탭 하단 라인 비노출(폴더 탭 연결)
    must_not:
      - raw hex를 최종 구현에 잔류시키지 않는다(raw_values_to_reconcile 토큰화 후 제거).
      - util_bar 활성 탭 아래에 baseline 라인을 노출하지 않는다.
      - 신규 primitive color token을 임의 추가하지 않는다(brand layer 정책 준수).

  ne-list-page:
    status: draft
    source: v4.1 교재목록(BOOK-LIST-001) — 좌측 필터 + 우측 가로형 리스트
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    layout:
      structure: "헤더 아래 → 로케이션+타이틀 → 시리즈 밴드(풀 폭, 타이틀 좌측선 정렬) → [필터(좌 220px) | 리스트(우)] 2단"
      crumb_title:
        location: "브레드크럼 · 13px · {ne-text-faint} · 예) ELT > Coursebook"
        title: "h1 · {typography.font-family.display}(Paperlogy) · 40px · extrabold · {ne-text-heading}"
        margin: "위/아래 {spacing.xxxl}(56px)"
      columns: "display:flex · gap {spacing.xxl}(40px) · align-items flex-start · 필터 flex 0 0 220px · 리스트 flex 1"
      line_align: "필터 헤드(교재 찾기)·리스트 헤드(총 N개) 모두 height 54px box-border → 하단 구분선 수평 정렬"
      filter_sticky: "필터 컬럼 position:sticky · top 80px(=compact 헤더 64px+여유) · 리스트 스크롤 시 좌측 고정 추종 · 상위 .nb-shell은 overflow-x:clip(hidden은 sticky 컨테이너 가로채 금지)"
    floating_recent: "최근 본 도서 — 우측 하단 고정 플로팅(.nb-floating#floating-recent) · position:fixed right/bottom {spacing.lg} · 폭 184px · 다크 헤더({ne-text-heading} 배경 + {ne-text-on-dark} 텍스트) · 표지 placeholder + 도서명 아이템(아이템 간 1px {ne-boundary} 구분) · z {z-dropdown} · 그림자. showPage('list')일 때만 .show 토글로 노출(메인/상세 등 타 화면 비노출)"
    must_not:
      - inline maxWidth/즉흥 spacing 사용 금지(spacing token 사용).
      - 최근 본 도서 플로팅을 교재목록 외 화면에 노출하지 않는다.

  ne-filter-panel:
    status: draft
    source: v4.1 교재목록 좌측 필터
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    head: "교재 찾기 · 24px · extrabold · 하단 1px {ne-text-heading}"
    section: "상하 {spacing.xxl}(40px) 패딩 · 하단 1px {ne-boundary} 구분선"
    section_title: "18px · bold · 보조표기(다중/단일) 11px {ne-text-tertiary}"
    checkbox:
      base: "appearance:none · 18x18 · radius 5px · border 1px {ne-boundary}(=select 테두리색 동일) · 배경 {ne-surface-base} · 항목 상하 8px"
      checked: "배경 {ne-primary} · 흰색 check SVG(stroke #fff) · 미체크와 동일 크기/라운드"
      label: "14px · {ne-text-body}"
      scope: "이 커스텀 체크박스 비주얼은 전역(input[type=checkbox]) 기본으로 승격됨 — 교재찾기 필터뿐 아니라 학습자료 테이블(전체선택/개별) 등 사이트 내 모든 체크박스에 동일 적용. 단일 정의(source) = 교재찾기."
    select: "appearance:none · 커스텀 chevron · 화살표 우측 여백 {spacing.md}(16px)=좌측 텍스트 여백과 동일"

  ne-series-strip:
    status: draft
    source: v4.1 교재목록 상단 시리즈 밴드
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    container: "배경 {ne-surface-card} · radius 16px · 패딩 {spacing.xl}(32px) · 하단 여백 56px"
    card: "100x100 · radius 16px · 배경 {ne-surface-subtle} · 텍스트 {display}(Paperlogy) 800 / {ne-series-label} · 가로 스크롤"
    hover: "카드 전체 배경 {ne-primary}(빨강) + 텍스트 흰색"
    note: "실제 시리즈는 글씨만 있는 PNG로 교체 예정 (현재 텍스트 placeholder)"

  ne-viewtype-toggle:
    status: draft
    source: v4.1 교재목록 보기유형(교재구매형/E-Book·자료형)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    style: "알약/탭 아님 — 아이콘+텍스트만 · 14px/600 · 항목 gap 18px"
    active: "{ne-primary}(빨강) · hover도 {ne-primary}"
    inactive: "{ne-text-faint}"
    sort_select: "우측 정렬 셀렉트 — 테두리 없음 · 배경 투명 · 텍스트/chevron {ne-text-faint}(회색) · hover {ne-text-tertiary}"
    sort_divider: "viewtype 버튼군과 셀렉트 사이 세로 구분선 1px×14px {ne-boundary} · 양쪽 {spacing.lg}(24px) 간격으로 분리"

  ne-product-row:
    status: draft
    source: v4.1 교재목록 가로형 리스트(교재구매형)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    layout: "display:flex · align center · gap {spacing.xl}(32px) · 상하 패딩 {spacing.xxl}(40px) · 하단 1px {ne-boundary} · position relative"
    thumb: "180x236(595x780 원본 비율 0.763) · object-fit contain · 배경 {ne-surface-base}(흰 표지 대비 1px {ne-boundary} 테두리) · radius {rounded.sm}(6px, placeholder와 동일) · NEW({ne-badge-new})/HOT({ne-primary})/품절 배지 좌상단"
    body:
      tags: "브랜드(회색 알약 {ne-surface-card} · {ne-text-body}) + Coursebook/레벨 배지(category-mono) · 하단 16px"
      title: "{display}(Paperlogy) · 30px · 700 · {ne-text-heading} · hover underline"
      sub: "14px · {ne-text-muted} · 제목 아래 8px"
      keywords: "#해시태그 · {ne-text-faint} · 이미지 baseline에 정렬(margin-top auto)"
      link: "E-Book·학습자료 — 다운로드 아이콘(회색 원 {ne-surface-card}) + 밑줄 텍스트 14px / {ne-text-body}"
    util: "공유·찜 아이콘 — 행 우상단(이미지 상단 라인), stroke 1.6, 기본 {ne-text-muted}, hover {ne-primary}"
    buy:
      align: "이미지 하단 라인 기준 우측 아래 정렬"
      badges: "할(원형 {ne-primary}, 흰글씨) 10% · 적(원형 {ne-reward}, 흰글씨) 5% — 금액 위"
      price: "정가(취소선 {ne-text-faint}, 원 포함) + 판매가({display} 28px/800) + 원"
      buttons: "장바구니(neutral-subtle) · 바로구매(primary)"
      soldout: "품절 시 썸네일/타이틀 dim · 버튼 disabled"
    variant_data:                                # E-Book·자료형 = 동일 ne-product-row 쉘 재사용 (.nb-hrow--data)
      align: "행 align-items flex-start (본문이 길어 상단 정렬)"
      perms: "권한 라벨(회원/교·강사)은 썸네일 좌상단 배지(NEW/HOT처럼) — 회원 {ne-primary}(HOT와 동일 빨강)·교·강사 {ne-badge-new}(NEW와 동일 주황), 흰글씨 10px/700, 세로 스택"
      sub: "설명 대신 자료유형 요약 — 예) 자료유형 : 정답지 1 · 워크시트 2 · MP3 1 ({ne-text-muted})"
      svc_icons: "부가서비스 = 아이콘 타일(.nb-svc-ic) — 64x64 라운드({rounded.lg}) {ne-surface-section} 박스 + SVG 라인 아이콘(36px) + 하단 라벨 14px/400 {ne-text-body}. 타일 간격 16px. margin-top:auto로 본문 하단=썸네일 하단에 정렬"
      svc_icon_style: "굵은 검정 라인아트(stroke 2px, currentColor) + 단일 빨강 포인트({ne-icon-red}). E-Book=펼친 책+빨강 책갈피 · MP3 듣기=헤드폰+빨강 이어컵 · 모바일 학습=스마트폰+빨강 재생버튼"
      right: "가격/구매 버튼 대신 '학습자료 다운로드' 버튼(neutral-subtle, 화살표 없음 — 장바구니 버튼과 동형, modal-multidownload) · 우측 하단 정렬 · 공유·찜 util은 교재구매형과 동일"
      note: "토큰/썸네일/타이틀/태그/util 전부 교재구매형과 공유 — 차이는 권한 배지·자료유형·아이콘 타일·다운로드 CTA"
    tokenization_resolved:                       # v4.1: 아래 raw hex 전부 시맨틱 토큰으로 정리 완료
      - "#666666 → ne-text-body (브랜드/링크/viewtype 텍스트)"
      - "#888888 → ne-text-muted (설명) · #a9a9a9 → ne-text-faint (브레드크럼·키워드·취소선·inactive)"
      - "#e2231a → ne-primary로 통일 (할인·active·HOT). 빨강 단일화, 별도 red token 없음"
      - "#f47920 → ne-reward (적립 배지) · #ff8a3d → ne-badge-new (NEW 배지)"
      - "#fafafa → ne-surface-subtle (시리즈 카드) · #1d2b5c → ne-series-label (시리즈 텍스트)"
      - "#d64835 → ne-icon-red (E-Book/MP3/모바일 라인 아이콘 빨강 포인트, 래스터 아이콘 톤 일치)"
    must_not:
      - raw hex를 최종 구현에 잔류시키지 않는다(토큰 매핑 후 제거).

  ne-product-detail:
    status: draft
    source: v4.x 교재상세(BOOK-VIEW-001)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    hero_band:
      desc: "상단 상품영역은 메인처럼 풀가로(100vw) 회색 밴드 {ne-surface-card} — GNB 뒤(투명 헤더)부터 깔림. 헤더는 neb-subpage 해제(투명·무테두리)"
      spacing: "상단 56px(GNB↔콘텐츠) · 표지 하단↔밴드끝 80px · 밴드끝↔교재소개 탭 80px"
      layout: "좌(표지영역) + 우(정보) · gap {spacing.xxxl}(56px) · align-items stretch(우측을 표지 높이만큼 늘림)"
    cover:
      box: "표지는 회색 박스 없이 밴드 위에 직접 · 가로 350px · 비율 595/780 · object-fit contain · 입체 그림자(box-shadow) · 모서리 라운드 없음(square)"
      side_buttons: "표지 좌측 세로 원형 버튼 64px(부가서비스) — 학습자료 다운로드 {ne-text-heading}(검정) · E-Book(본책) {ne-primary}(빨강) · E-Book(워크북) #ADADAD(회색) · 간격 {spacing.xxs}(4px)"
      perms: "회원/교·강사 권한 라벨은 표지 좌상단 배지(NEW/HOT처럼)"
    info:
      tags: "제목 위 회색 알약 — 밴드와 구분 위해 {ne-surface-subtle}(#fafafa)"
      title: "{display}(Paperlogy) · 40px · h3 기본여백 제거 · hover 밑줄 없음"
      desc_keywords: "설명(sub)+키워드 한 줄 · 사이 세로 구분선 1px {ne-line-soft} · 키워드도 sub와 동일(14px {ne-text-muted})"
      data_icons: "학습자료 = 아이콘 타일(.nb-svc-ic) 흰 박스 + 라인아이콘(stroke 1.2px, Word Lists svg와 동일) + 라벨 13px · 간격 {spacing.xs}(8px). 빨강 포인트 {ne-icon-red}"
    buy:
      align: "수량(좌) + 금액(우, 바로구매 위) 같은 행 · 하단 정렬(margin-top auto) → 버튼 하단 = 표지 하단 라인"
      qty: "스테퍼 = 단일 테두리 박스({ne-line-soft}) · 숫자칸 투명 배경 · spinner 제거(중앙정렬)"
      price: "할/적 원형 배지 + 정가(취소선)+판매가({display} 28px/800) · 우측 정렬"
      buttons: "장바구니(neutral) · 바로구매(primary)"
    detail_tabs: "→ 별도 계약 ne-detail-tabs"
    sections:
      titles: "교재소개/시리즈/추천교재 — {display}(Paperlogy) 30px · 섹션 상단 80px"
      series_recommend: "시리즈/추천교재 카드 → 별도 계약 ne-series-card · 그리드 4열(1fr)·폭=콘텐츠 풀폭"
      intro: "교재소개 아래 소개페이지 이미지 영역(삽입예정) · 가로폭 = 콘텐츠 풀폭(시리즈 4개 합)"
    floating_recent: "최근 본 도서 플로팅 — 폭 116px(소형) · 교재명 #666666 · 아이템 구분선 없음"
    raw_values_to_reconcile:
      - "#ADADAD(E-Book 워크북 원) → neutral 계열 토큰화 후보"

  ne-detail-tabs:
    status: draft
    source: v4.x 교재상세 상세 콘텐츠 탭
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    structure: "탭 라벨(교재소개/목차/상품정보고시/학습자료/교재후기) flex 1 균등 분할 · 하단 라인 풀가로(100vw, ::after) {ne-line-soft} · 윗줄/배경박스 없음"
    states:
      default: "{ne-text-body} · 500"
      active: "{ne-text-heading} · 700 · 밑줄(::after scaleX 1)"
      hover: "{ne-text-heading} · 밑줄 좌→우 슬라이드(::after scaleX 0→1, origin left, transition) · 회색 hover 박스 없음"
    z_order: "활성 탭 밑줄(.nb-tab::after, 3px {ne-text-heading})은 z-index 1, 하단 풀가로 회색 라인(::after 1px {ne-line-soft})은 z-index 0 → 검은 밑줄이 회색 라인 위로 올라온다."
    must_not:
      - 활성 탭에 상단 라인/배경박스를 넣지 않는다(하단 밑줄만).
    tab_panels:
      desc: "각 패널 공통: 섹션 타이틀 {display}(Paperlogy) 30px(시리즈와 동일) · 회색 테두리 박스 없음 · 타이틀 밑 라인 없음 · 개발 주석(Sheet 참조 등) 없음"
      목차: "기본 목차 텍스트 .nb-toc — PART(.nb-toc-part 굵게) / DAY(.nb-toc-day, white-space pre로 정렬) 계층"
      상품정보고시: "가로(key-value) 스펙 테이블 → 별도 계약 ne-detail-tables.spec"
      학습자료: "세로(열 비교) 자료 테이블 + 필터 칩 → 별도 계약 ne-detail-tables.data"
      교재후기:
        notice: "타이틀 아래 안내 .nb-review-notice(불릿 2: 500 NE Point 적립 / 부적합 후기 무통보 삭제·포인트 회수) {ne-text-body} 14px"
        action: "안내 아래 '교재 후기쓰기' 버튼 .nb-review-btn(neutral, min-width 160px)"
        tables: "작성 폼 / 후기 목록 / 후기 상세 3종 → 별도 계약 ne-review"
    perm_label: ".nb-perm 권한 라벨(회원/교·강사/전체) = 가로리스트와 동일 — 아웃라인 알약(흰 배경 {ne-surface-base} + 1px 테두리): 회원 {ne-primary}(빨강 테/글), 교·강사 {ne-badge-new}(주황 테/글), 전체 {ne-text-tertiary} 글 + {ne-boundary} 테"

  ne-detail-tables:
    status: draft
    source: v4.x 교재상세 상품정보고시·학습자료 탭 테이블
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    base: ".nb-table 기반(border-collapse · 셀 1px {ne-boundary} 테두리 · th 배경 {ne-surface-section}/700/{ne-text-heading} · td {ne-text-body})"
    common:
      cell_size: "셀 높이 56px(상하 padding 0, 텍스트 vertical-align middle) · 본문 14px(.nb-table 기본 12px 오버라이드)"
      no_vertical_lines: "모든 셀 border-left/right 제거 → 세로(컬럼) 구분선 전부 없음 · 가로(행) 라인만 유지"
      no_dev_annotation: "Sheet 참조 등 개발 주석·배지 없음"
    spec:
      class: .nb-spec-table
      orientation: "가로형(key-value) — 좌측 항목명 th + 우측 값 td 행 반복"
      cell_padding: "셀 좌여백 {spacing.lg}(24px) · 텍스트 좌정렬"
      usage: "상품정보고시 고지 항목(도서명/저자/출판사/크기/쪽수/ISBN 등)"
    data:
      class: .nb-data-table
      orientation: "세로형(열 비교) — 헤더 행 + 자료별 데이터 행"
      header: "헤더 좌측 첫 칸 = 전체선택 체크박스(문구 없음) · white-space nowrap"
      alignment: "컬럼별 정렬(헤더·셀 동일) — 체크박스/다운로드 칸 가운데(.center), 자료유형/자료명(텍스트) 칸 왼쪽"
      col_width: "자료유형 칸 width 200px(자료명과 간격 확보) · 다운로드 칸 96px · 체크박스 칸 44px"
      cell_padding: "셀 좌우 여백 {spacing.lg}(24px)"
      cells:
        select: "행 좌측 개별 체크박스(전역 커스텀 체크박스 = 교재찾기 스타일: 18px 라운드 5px, checked 시 {ne-primary} + 흰 체크)"
        name: "자료명 — 앞에 자료대상 권한 라벨 .nb-perm(→ ne-detail-tabs.perm_label)"
        download: "다운로드 = 아이콘 버튼 .nb-dl-ico(개별) · 교·강사 자료는 외부이동(링크) 아이콘"
      filter_chips: "테이블 위 자료유형 필터 칩 .nb-type-btn(전체 + 유형별) — 버튼이 아니라 검색/쏠팅 토글 · 알약형 · is-active 시 {ne-primary} 배경 + 흰 글씨 · JS로 .is-active 토글"
      bulk_actions: "테이블 아래 일괄 다운로드 — 선택 다운로드(좌, neutral) / 전체 다운로드(우, neutral-subtle) · 둘 다 .nb-dl-btn(다운로드 아이콘 포함)"
    raw_values_to_reconcile:
      - "두 테이블 모두 .nb-table(미구현 ne-table의 PoC 레이어) 위에 빌드 — 향후 ne-table 정식 구현 시 정합 필요"

  ne-review:
    status: draft
    source: v4.x 교재상세 교재후기 탭(작성 폼 / 목록 / 상세)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    note: "안내·후기쓰기 버튼·빈 상태는 ne-detail-tabs.tab_panels.교재후기 참조. 본 계약은 3종 테이블 + 상태 전환을 다룬다."
    states_flow: "기본=안내+버튼+목록(.nb-review-list) · '교재 후기쓰기'→작성 폼(.nb-review-form) · 목록 행 제목/내용 클릭→상세(.nb-review-detail) · 상세 '수정'→작성 폼(내용 prefill) · 상세 '목록'→목록 복귀. 한 번에 하나만 노출(나머지 hidden)."
    review_form:
      class: .nb-rvform-table
      desc: "세로형(key-value) 작성 폼 — th(라벨, 배경 {ne-surface-card}/700, width 140px) + td 입력. 상단 라인 얇은 {ne-line-soft}(굵은 검정 아님). 필수표시 .nb-req={ne-primary}"
      rows: "교재명(표지+제목+삭제) · 별점(.nb-star ★ 클릭 선택, on={ne-primary}/off={ne-boundary} + /5.0) · 제목(input) · 내용(textarea) · 교재 이미지(파일첨부 버튼+파일명칸+용량안내)"
      inputs: "제목 input·내용 textarea — placeholder {ne-text-faint}(#a9a9a9) · 입력 텍스트 {ne-text-heading}(#1d1717) · hover/focus 시 1px {ne-text-heading} 테두리(파란 ring 제거)"
      clear_button: ".nb-rvform-clear — 제목 input·파일명칸 우측 X 아이콘. 값이 있을 때만 노출([hidden] 시 display:none), 클릭 시 값 비움. 입력칸 padding-right 40px로 텍스트 겹침 방지"
      file: "파일첨부 버튼 .nb-rvform-filebtn(높이 44px=파일명칸과 동일) + 파일명칸(readonly) + 안내문 {ne-text-muted}. 첨부 시 파일명 표시·X로 초기화"
      footer: "테이블 아래 {spacing.xs}(8px): 좌측 '* 표시는 필수 입력 사항입니다'(테이블서 8px) · 우측 버튼([목록 위치]작성 취소 + 등록), 버튼은 테이블서 24px 아래 · 작성 취소·등록 동일 폭 120px · 등록=primary(화살표 없음)"
    review_list:
      class: .nb-review-table
      desc: "등록 후기 목록 — 헤더(별점 | 첨부 이미지 | 제목 | 작성자/작성일) 배경 {ne-surface-card}/700 · 세로 구분선 없음 · 모든 텍스트 14px"
      columns: "별점(.nb-rvt-rate 180px 가운데, ★ {ne-primary}/off {ne-boundary}) · 첨부 이미지(.nb-rvt-img 150px 가운데, 84px 썸네일/없으면 {ne-surface-card} 박스) · 제목(.nb-rvt-title 왼쪽, padding-left {spacing.xl}로 이미지와 간격) · 작성자/작성일(.nb-rvt-author 170px 가운데)"
      title_body: ".nb-review-rtitle(제목, 700 {ne-text-heading}) + .nb-review-rbody(내용, {ne-text-faint}) — hover 시 밑줄·클릭 시 상세 이동. 작성일 .nb-review-date도 {ne-text-faint}(내용과 동일색)"
      lines: "행 하단 1px {ne-line-soft} · 마지막 행 border-bottom 제거 → 바깥 .nb-review-list 라인과 이중선 방지"
    review_detail:
      class: .nb-rvdetail-table
      desc: "후기 상세 — .nb-spec-table(세로형 key-value) 재사용. 행: 교재명/별점/등록일/작성자/제목/내용/교재이미지"
      tweaks: "교재명 셀 상하 16px 여백(표지 73px 수용, 높이 auto) · 교재이미지 셀 상하 24px 여백 · 별점 /5.0 점수 {ne-text-body}(다른 셀과 동일색)"
      footer: ".nb-rvdetail-foot 우측 정렬 — [목록][수정] 순(수정이 맨 오른쪽). 목록=neutral-subtle(상세→목록), 수정=neutral(작성 폼 prefill 후 저장 시 해당 행 갱신, 신규행 추가 아님)"
    raw_values_to_reconcile:
      - "작성자 마스킹 'neung****'·등록일은 정적 wireframe 값(런타임 new Date()) — 실서비스 연동 시 교체"
      - "수정 시 첨부 파일 객체는 브라우저 보안상 재주입 불가(파일명만 표시)"

  ne-series-card:
    status: draft
    source: v4.x 교재상세 시리즈/추천교재 카드
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    layout: "그리드 4열(1fr) · 폭=콘텐츠 풀폭 · 카드 테두리/배경 박스 없음"
    cover: "회색 박스 {ne-surface-card} · 비율 310/350 · 내부 커버 이미지 60% + 입체 그림자(box-shadow) · 모서리 square(라운드 없음)"
    cart: "표지 박스 안 우하단 원형 아이콘(회색원 #9E9E9E + 흰 카트) · hover {ne-primary}"
    title: "{font-primary}(Pretendard) · 14px · 500 · {ne-text-body}(#666666) · 표지 아래 {spacing.lg}(24px)"
    price: "{display}(Paperlogy) · 22px · 800 · 교재명 아래 {spacing.xs}(8px)"
    raw_values_to_reconcile:
      - "#9E9E9E(장바구니 원) → neutral 계열 토큰화 후보"

  ne-footer:
    status: draft
    source: v4.x 글로벌 푸터(미래엔/NE능률 스타일)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    layout: "풀가로 다크({ne-footer-bg}) · 내부 max-width 1440 중앙. sticky footer: .nb-body는 flex-column·min-height 100vh, .nb-main flex 1 0 auto(남는 공간 채움), .ne-footer flex 0 0 auto → 콘텐츠가 짧아도 푸터가 항상 뷰포트 하단에 위치"
    top: "상단 링크(무채색 {ne-footer-link}, 구분선 |) + 우측 소셜 플레인 아이콘 + FAMILY SITE(화살표) · 하단 라인 풀가로(100vw) {ne-footer-line}"
    family_menu: "FAMILY SITE 클릭 시 상향 드롭다운(.open) — 배경 {ne-footer-bg} + 1px 테두리 · 항목 8(NE능률·아이챌린지·NE Kids·NE Books·NE Build&Grow·NE Times·NE능률 주니어랩·NELT)"
    body: "회사정보 {ne-footer-text} 13px(줄간격 타이트) + Copyright · 우하단 NE능률 로고 = .ne-footer-logo > img(회색 BI 래스터, height 24px·width auto). 텍스트 로고 아님(외부 BI 이미지: pic.neungyule.com/.../bi_ne_gray.png)"
    body_align: ".ne-footer-body align-items flex-end + 카피라잇(.ne-footer-copy) margin-bottom 0 → 좌측 Copyright 줄 하단과 우측 로고 이미지 하단이 동일 선상"

  ne-input-poc:
    status: draft
    source: v4.x PoC 입력 필드(.nb-input) — 전역 통일 스타일
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    scope: "사이트 전역 모든 .nb-input(text/tel/email/number/textarea/select)에 적용. 교재후기 작성폼·주문/결제·모달 등 모두 동일."
    base: "높이 44px · 1px 테두리 {ne-boundary} · radius {rounded.md} · 배경 {ne-surface-base} · 입력 텍스트 {ne-text-heading}(#1d1717) · 14px"
    placeholder: "{ne-text-faint}(#a9a9a9)"
    hover_focus: "hover·focus 모두 1px 테두리 {ne-text-heading}(검정) · focus 시 파란 ring(box-shadow) 제거. (specificity: input.nb-input:hover/:focus로 input[type=*].nb-input 기본 테두리를 이긴다)"
    clear_button:
      desc: "값 지우기 X 버튼 — .nb-clearwrap(position relative) + .nb-clear(우측 absolute, 14px ×아이콘). 입력칸 padding-right 40px로 텍스트 겹침 방지."
      visibility: "포커스됐을 때만 노출(.nb-clear[hidden]→display none). focus 시 값 있으면 표시, blur 시 숨김. X 버튼 mousedown preventDefault로 포커스 유지→클릭 시 값 삭제."
      apply: "주문/결제(#screen-order) 텍스트/연락처/이메일/수령인/주소 인풋에 JS로 자동 래핑(우편번호·읽기전용·숫자 제외). 교재후기 작성폼은 자체 .nb-rvform-clear."

  ne-select-poc:
    status: draft
    source: v4.x PoC 커스텀 셀렉트(.nb-select) — 배송메시지 등
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    desc: "네이티브 select 대신 커스텀 드롭다운(펼친 디자인 제공). [data-nbselect] 컨테이너 JS 토글."
    trigger: ".nb-select-trigger — .nb-input과 동일 외형(44px·1px {ne-boundary}·radius {rounded.md}) + 우측 chevron(.nb-select-ico, open 시 180° 회전). hover/open 시 테두리 {ne-text-heading}"
    value: ".nb-select-value — 선택값 {ne-text-heading} · placeholder(.is-placeholder) {ne-text-faint}"
    menu: ".nb-select-menu — open 시 노출(absolute, z {z-dropdown}). 박스 패딩 {spacing.sm} · 검정 테두리 1px {ne-text-heading} · radius {rounded.md} · 그림자 · 옵션 li padding {spacing.md} {spacing.sm} · hover 시 배경 {ne-surface-card} · 선택 {ne-primary}/700"
    behavior: "trigger 클릭 토글 · 옵션 클릭 시 값 반영·닫힘 · 바깥 클릭 닫힘 · 동시에 하나만 open"

  ne-modal-clean:
    status: draft
    source: v4.x PoC 클린 모달(.nb-modal-clean) — 쿠폰선택/최근배송지/우편번호 검색
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    desc: "회색 head/foot 바·구분선을 제거한 흰 박스 모달. .nb-modal-overlay에 .nb-modal-clean 클래스만 추가하면 적용."
    box: "폭 480px · 박스 안 패딩 40px 균일(상·하·좌·우) — head padding 40 40 24 / body 0 40 / foot 24 40 40"
    head: "배경 {ne-surface-base}(흰색) · 하단 라인 없음 · 타이틀 {display}(Paperlogy) 22px/800 margin 0 · 우상단 X(.nb-x) 테두리·배경 없음, 아이콘 26px {ne-text-heading}"
    body: "안내문구 .nb-modal-desc(plain text, 회색박스 아님) · 옵션 리스트 .nb-opt(타이틀 14px / 설명 13px {ne-text-faint}) · 옵션 hover 시 회색배경 대신 검정 테두리({ne-text-heading})"
    foot: "배경 흰색 · 상단 라인 없음 · 하단 닫기 버튼 없음(상단 X로 닫음) · 적용 버튼만(쿠폰=적용 / 최근배송지=선택 배송지 적용). 우편번호 모달은 foot 없음(바디 하단 패딩 40)"
    zipcode_extra: "우편번호 검색 인풋 = 박스 없는 밑줄형(투명 배경·border 없음·아래 2px {ne-text-heading} 라인·radius 0) + 우측 끝 돋보기 아이콘(.nb-zip-searchbtn, right 0). 결과행 .nb-zip-opt: 도로명 + 우편번호 배지(.nb-zip-badge) + 지번. 클릭 시 주소 필드 채우고 닫힘"

  ne-cart:
    status: draft
    source: v4.x 장바구니(CART-001)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    head_area: "상단 로케이션(.nb-list-loc HOME>장바구니) + 타이틀(.nb-list-title {display} 40px) — 교재목록 페이지와 동일"
    layout: ".nb-cart-wrap = flex(좌 목록 .nb-cart-main flex1 + 우 요약 .nb-cart-aside 340px) · gap {spacing.xxxl}(56px). 우측 요약은 sticky"
    head_row: "전체선택 체크박스(좌) + 선택삭제/전체삭제(우)"
    table: ".nb-cart-table — 헤더 없음 · 세로 구분선 없음 · 모든 텍스트 14px · 행 하단 1px {ne-line-soft}(마지막 행 제외). 컬럼: 체크 / 상품정보 / 수량(스테퍼) / 판매가 / 할인율 / 적립예정 / X삭제"
    product_cell: ".nb-cart-prod(표지 align-items center 세로중앙) — 표지 썸네일 + .nb-cart-meta(상태라벨 .nb-cart-status[판매중 회색테/품절 빨강테] → 교재명 .nb-cart-name[클릭 시 상세 이동·hover 밑줄] → 설명 .nb-cart-tags). 라벨↔교재명 16px"
    price_cell: "정가(.nb-cart-list 취소선 {ne-text-faint}) 위 / 판매가(.cart-amount 15px/700) 아래 · 할인율(.nb-cart-rate {ne-primary}) 별도 칸 · 적립(.nb-cart-c-point) 별도 칸"
    summary:
      box: ".nb-cart-summary — 1px {ne-boundary} 테두리 박스 · radius {rounded.lg} · 패딩 40px · sticky(top calc(header-h + space-md))"
      title: ".nb-cart-sumtitle {display} 22px/800 · 아래 여백 40px(타이틀↔총상품금액)"
      lines: ".nb-cart-sumline 14px · 할인 {ne-primary}(.nb-minus). 총금액 .nb-cart-sumtotal(상단 1px {ne-boundary} 라인 + 위/아래 40px, lbl·val {display} 22px/800). 적립 .nb-cart-sumpoint({ne-text-body}, val 포함, 총금액과 40px 간격)"
      buttons: "선택상품 주문 / 전체상품 주문 — 둘 다 neutral, 가로 분할"
    behaviors: "수량 스테퍼·체크·X삭제·선택/전체삭제 시 합계 자동 재계산(JS recalcCart): 총상품금액=정가합 · 할인=정가-판매가 · 배송비(유료만 3만↑무료/미만 2,500) · 적립=포인트합. 품절행은 합계 제외"

  ne-order:
    status: draft
    source: v4.x 주문/결제(ORDER-001)
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    head_area: "GNB 아래 로케이션(.nb-list-loc HOME>주문/결제) + 타이틀(.nb-list-title)"
    layout: ".nb-pay-layout grid 1fr 340px · gap {spacing.xxxl}(56px) — 장바구니와 동일 간격. 우측 .nb-pay-aside sticky top 96px(컴팩트 헤더 64 + 여백)"
    section_title: ".nb-order-sectitle {display}(Paperlogy) 30px/700 · 위 80px / 아래 16px. 주문자정보·배송지정보·할인혜택은 타이틀 아래 1px {ne-line-soft} 라인(.nb-order-sectitle--line, padding-bottom 16). 주문상품(첫 섹션)도 타이틀↔테이블라인 16px로 동일. 박스(.ne-card) 없음"
    order_table: "주문상품 = .nb-cart-table 재사용(정가 stacked + 할인율·적립 별도 칸). 수량 정적(.nb-order-qty)"
    fields: "라벨 .nb-field>label 13px {ne-text-body}(#666) · 아래 여백 8px. 입력칸 → ne-input-poc(X 버튼·검정 테두리). 필수 .nb-req {ne-primary}"
    address: "탭+기본배송지 = 타이틀 행에 함께(.nb-addr-titlerow: 타이틀 좌 + 기본배송지 체크박스 우, 하단 1px 라인). 탭(.nb-addr-tabs) = 학습자료 칩 모양(알약, active {ne-primary} 배경). 필드 위 여백 40px. 우편번호 검색 버튼 → ne-modal-clean(우편번호) 팝업. 배송메시지 → ne-select-poc"
    discount: "쿠폰 선택 버튼 → ne-modal-clean(쿠폰) 팝업 · 포인트 사용(전액 사용 버튼) · 포인트 안내문구 12px"
    pay_methods: ".nb-pay-methods 2열 그리드 · .nb-opt(타이틀 14px+아래 6px / 설명 13px {ne-text-faint}) · 박스 패딩 16/24 · 선택 시 2px {ne-text-heading} 테두리"
    summary:
      box: ".nb-cart-summary 재사용(주문금액 박스). 타이틀 '주문금액', 합계줄(총상품금액/상품·추가할인/쿠폰할인/포인트사용/배송비) + 총 결제금액(.nb-cart-sumtotal) + 적립예정. 간격 장바구니와 동일(40/40)"
      terms: "회색 박스(.nb-order-terms {ne-surface-card}) 안: '이용규정 및 환불 안내' = 밑줄 텍스트 버튼(.nb-terms-trigger) → 클릭 시 말풍선(.nb-terms-pop, 다크 배경 {ne-text-heading}/흰 글씨 + 상단 화살표) 토글. 그 아래 1px 라인으로 분리 후 주문 동의 체크박스(.nb-order-agree, 체크박스 상단 정렬)"
      pay_button: "결제하기 = primary · 주문 동의 체크 시 활성화(JS). 결제 실패 시나리오/정책메모 없음"

  ne-button:
    status: ready
    source: v0.6.0 button visual
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    variants:
      - neutral
      - neutral-subtle
      - neutral-text
      - primary
      - primary-subtle
      - primary-text
      - inverse
    visual_slots:
      container:
        height_ref: components.button-sizes
        padding_ref: components.ne-button-*
        rounded_ref: rounded.md
        typography_ref: typography.scale.button
      label:
        color_ref: per-variant semantic token
      icon:
        usage: optional, sizing follows label rhythm
      focus:
        ring_ref: per-variant focus ring token
      disabled:
        background_ref: per-variant disabled token
        text_ref: ne-text-disabled or ne-on-mono per variant
    preserves:
      - v0.6.0 ne-btn / ne-btn-* CSS
      - 5단계 size modifier (sm / md / lg / xl / 2xl)
      - text variant의 size modifier 미적용 규칙
      - loading 규칙은 state_families.loading 참조
    must_not:
      - raw hex 사용 금지
      - primitive token 직접 참조 금지
      - 이번 v0.6.1에서 button CSS 변경 금지
      - component alias를 tokenCounts에 포함 금지

  ne-card:
    status: draft
    source: v0.6.0 card visual
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    container:
      surface: ne-surface-base
      surface_muted: ne-surface-section
      border: ne-boundary
      border_radius: rounded-lg
      shadow: elev-card
      padding_ref: spacing.*
    content:
      title:
        color_ref: ne-text-heading
        typography_ref: typography.scale.body-md
      body:
        color_ref: ne-text-body
        typography_ref: typography.scale.body-md
      meta:
        color_ref: ne-text-tertiary
        typography_ref: typography.scale.caption
    usage_boundary:
      - table은 행/열 비교, card는 단위 정보 묶음이다.
      - card-grid는 카드를 격자로 배치하는 pattern이며 card visual을 재정의하지 않는다.
      - alert는 상태 메시지, card는 콘텐츠 묶음이며 역할이 다르다.
    preserves:
      - v0.6.0 ne-card visual
      - flat / elevated / interactive variant 정책
    must_not:
      - 이번 v0.6.1에서 card CSS 변경 금지
      - raw hex 사용 금지
      - component alias를 tokenCounts에 포함 금지

  ne-table:
    status: draft
    source: v0.6.0 table visual
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    container:
      surface: ne-surface-base
      border: ne-boundary
      border_radius: rounded-md
      overflow: hidden
    table:
      header:
        # v0.7.1: ne-surface-card로 분리 → micro-patch: ne-surface-section(neutral-50, #F4EFE9)로 회귀.
        background: ne-surface-section
        text: ne-text-heading
      header_cell:
        padding_ref: spacing.*
        font_weight: fw-bold
      row:
        border_bottom: ne-boundary
      cell:
        padding_ref: spacing.*
        color: ne-text-body
      status_cell:
        color_ref: ne-status-* per status meaning
        variants:
          - neutral (ne-surface-section × ne-text-heading)
          - success (ne-status-success-bg × ne-status-success)
          - warning (ne-status-warning-bg × ne-status-warning)
          - danger  (ne-status-danger-bg × ne-status-danger)
      action_cell:
        align: end
    states:
      default:
        background: ne-surface-base
      # v0.11.0a (2026-05-20): hover state 제거.
      # 이전 정의(hover background: ne-surface-section)는 row가 클릭 불가한 기본 ne-table에서
      # misleading affordance + 행/열 비교 흐름 깨짐 발생. v05 PoC 1인칭 사용 피드백 기반 정정.
      # 진짜 clickable row 케이스는 v0.11.1+에서 interactive variant 정식 spec extension으로 처리한다.
      loading:
        ref: state_families.loading
      empty:
        ref: patterns.empty_state
      error:
        ref: patterns.empty_state.recoverable_error
    preserves:
      - v0.6.0 ne-table visual rhythm
      - NE Times Class flavored basic table demo
    must_not:
      - full data grid로 확장하지 않는다.
      - sorting / filtering / pagination / selection을 구현하지 않는다.
      - component alias를 tokenCounts에 포함 금지
      - non-clickable row에 hover background 변화 적용 금지 (misleading affordance)

  progress_feedback:
    status: draft
    source: v0.7.1 progress semantics
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    variants:
      neutral:
        meaning: 일반 진행률, 의미 신호 없음
        bar_fill: ne-neutral
        value_color: ne-text-heading
        caption_color: ne-text-body
      active:
        meaning: 활발히 진행 중, 학습이 이어지고 있음
        bar_fill: ne-primary
        value_color: ne-text-heading
        caption_color: ne-text-body
        brand_meaning: NE BI red의 긍정 의미(열정/활력/몰입)를 진행 중 신호로 활용
      success:
        meaning: 완료, 목표 달성
        bar_fill: ne-status-success-strong
        value_color: ne-text-heading
        caption_color: ne-text-body
      warning:
        meaning: 지연, 주의 필요
        bar_fill: ne-status-warning-strong
        value_color: ne-text-heading
        caption_color: ne-text-body
      stalled:
        meaning: 정체, 개입 필요
        bar_fill: ne-mono   # v0.9.0 rename: ne-mute -> ne-mono. v0.7.1 의도(flat gray 정체 표현) 유지.
        value_color: ne-text-heading
        caption_color: ne-status-danger-strong
        icon_color: ne-status-danger-strong
        rationale: bar는 정체를 flat gray(NE CI mono)로 표현하고, danger 신호는 caption/icon으로 전달한다.
    anatomy:
      label: bar 외부 좌상단 또는 제목 영역
      value: bar 외부 우상단
      bar: fill only, text overlay 없음
      caption: bar 외부 좌하단
      icon: optional, stalled에서만 danger signal로 사용 가능
    status_mapping_policy:
      - progress variant는 컴포넌트가 자동 결정하지 않는다.
      - variant는 props로 외부에서 전달받는다.
      - 임계값(몇 %가 어떤 variant인지)은 NE 디자인 시스템의 영역이 아니다.
      - 각 서비스의 도메인(LMS / 학습 평가 / 마감 정책 등)에 따라 사용 서비스 개발 주체가 결정한다.
      - NE는 각 variant가 어떻게 시각화되는지만 제공한다.
    brand_color_policy:
      - NE BI red(ne-primary)는 active variant에서만 사용한다.
      - danger / stalled bar fill로 사용하지 않는다.
      - NE BI red 의미는 열정, 활력, 창의성, 몰입이다.
      - progress의 활발히 진행 중 신호가 brand red 의미와 정합한다.
      - danger 신호는 bar fill이 아니라 caption/icon으로 전달한다.
    notes:
      - v0.7.1부터 ne-status-success-strong / ne-status-warning-strong은 success/warning bar fill에서 사용된다.
      - ne-status-danger-strong은 stalled caption/icon signal에서 사용된다.
      - 따라서 ne-status-*-strong 토큰은 cleanup 후보에서 제외된다.
    must_not:
      - 컴포넌트에 threshold를 박지 않는다.
      - 진행률 값으로 variant를 자동 결정하지 않는다.
      - 서비스 도메인 룰을 컴포넌트가 가정하지 않는다.
      - NE BI red를 danger/stalled bar fill로 사용하지 않는다.
      - disabled token을 stalled bar로 사용하지 않는다.
      - label/value를 bar 위에 overlay하지 않는다.
    a11y_minimum:
      - role="progressbar"는 ready 승격 전 필수 검토 항목이다.
      - determinate progress는 aria-valuemin / aria-valuemax / aria-valuenow를 가져야 한다.
      - aria-valuetext는 LMS domain copy가 필요한 경우 사용한다.
      - label/value/caption은 bar 외부에 있어야 한다.
      - indeterminate variant는 deferred다.
      - stalled는 indeterminate가 아니다.
      - active/success/warning/stalled는 visual variant이고 threshold는 서비스가 결정한다.

  ne-dialog:
    status: draft
    source: v0.8.0 dialog draft contract
    layer: component visual / interaction contract
    token_count_policy: excluded_from_token_counts
    anatomy:
      - trigger
      - overlay
      - panel
      - title
      - description
      - actions
      - close affordance (static preview에서 X visual로 제공)
    visual_contract:
      surface: ne-surface-base
      border: ne-boundary
      border_radius: rounded-lg
      shadow: elev-modal
      spacing_ref: spacing.*
      action_alignment: end
      title:
        font_size: 18px
        font_weight: fw-bold
        color: ne-text-heading
      description:
        color: ne-text-body
    behavior_minimum:
      - trigger 버튼으로 open
      - ESC key로 close
      - backdrop click으로 close
      - 정적 미리보기 카드를 함께 제공
    deferred:
      - portal
      - focus trap
      - scroll lock
      - aria-modal full spec
      - nested dialog
      - destructive dialog full pattern
    must_not:
      - full modal system으로 확장하지 않는다.
      - ready로 승격하지 않는다.

  ne-tabs:
    status: draft
    source: v0.8.0 tabs draft contract
    layer: component visual / interaction contract
    token_count_policy: excluded_from_token_counts
    anatomy:
      - tablist
      - tab
      - active indicator
      - panel
    visual_contract:
      tablist:
        border_bottom: ne-boundary
        gap_ref: spacing.md
        padding_ref: 0 spacing.md
      tab:
        padding: spacing.sm 0
        color: ne-text-tertiary
        font_size: 14px
        font_weight: fw-medium
        border_bottom: 3px solid transparent  # v0.7.0 시각 두께 보정값 유지
      tab_selected:
        color: ne-text-heading
        border_bottom: 3px solid ne-primary
      focus_visible:
        ring: ne-neutral-focus-ring
      panel:
        padding_ref: spacing.lg
        color: ne-text-body
    behavior_minimum:
      - click switching
      - ArrowLeft / ArrowRight tab navigation
      - selected panel rendering
      - aria-selected / aria-controls / role="tab" / role="tabpanel"
    deferred:
      - Home / End key
      - vertical orientation
      - overflow / scrollable tabs
      - full WAI-ARIA APG parity
      - tab close / reorder
    must_not:
      - interaction을 새로 확장하지 않는다.
      - ready로 승격하지 않는다.

  ne-accordion:
    status: draft
    source: v0.8.0 accordion draft contract
    layer: component visual / interaction contract
    token_count_policy: excluded_from_token_counts
    anatomy:
      - item
      - header (trigger)
      - content
      - disclosure icon
    icon_policy:
      accordion_faq_simple_panel:
        closed: ChevronDown
        open:   ChevronUp
      tree_nested_navigation:
        collapsed: ChevronRight
        expanded:  ChevronDown
    visual_contract:
      container:
        border: ne-boundary
        border_radius: rounded-lg
        overflow: hidden
      item_separator:
        border_top: ne-boundary
      trigger:
        padding_ref: spacing.md
        color: ne-text-heading
        font_weight: fw-medium
      content:
        padding_ref: 0 spacing.md spacing.md
        color: ne-text-tertiary
        font_size: 14px
        line_height: 1.55
      focus_visible:
        ring: ne-neutral-focus-ring
    behavior_minimum:
      - 현재 단일 open(single-open) demo만 제공
      - aria-expanded / aria-controls
      - 헤더 클릭으로 토글
    deferred:
      - single vs multiple open policy 정식화
      - 키보드 spec(Home / End / 화살표)
      - animation / motion refinement
      - nested accordion
    must_not:
      - disclosure icon policy를 회귀하지 않는다.
      - ready로 승격하지 않는다.

  ne-data-list:
    status: draft
    source: v0.8.0 data-list draft contract
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    anatomy:
      - list container
      - list item
      - leading icon
      - title
      - meta
      - description
      - trailing status badge
    layout_contract:
      list_item_display: grid
      list_item_columns: "auto minmax(0, 1fr) auto"
      align_items: center  # v0.7.1 미세 패치로 정합. status badge 세로 stretch 방지.
      gap_ref: spacing.md
      padding_ref: spacing.lg
      status_badge_shape: 가로 capsule 유지, 세로 stretch 금지
    visual_contract:
      surface: ne-surface-base
      border: ne-boundary
      border_radius: rounded-lg
      item_border_bottom: ne-boundary
      title_color: ne-text-heading
      meta_color: ne-text-tertiary
      description_color: ne-text-body
    status_badge:
      variants:
        - 진행 (neutral · ne-surface-section × ne-text-heading)
        - 완료 (success · ne-status-success-bg × ne-status-success)
        - 주의 (warning · ne-status-warning-bg × ne-status-warning)
        - 오류 (danger  · ne-status-danger-bg  × ne-status-danger)
      policy:
        - semantic token만 사용한다.
        - primitive 직접 참조 금지.
        - status badge는 status 의미로만 사용한다.
        - assessment result 의미로 확장 금지.
    deferred:
      - selection / bulk action
      - sorting / filtering
      - virtualization
      - infinite scroll
      - drag handle
    must_not:
      - table 대체 full data grid로 확장하지 않는다.
      - status badge를 result/assessment 의미로 혼용하지 않는다.
      - ready로 승격하지 않는다.

  metric_display:
    status: draft
    source: v0.8.0 metric_display draft contract
    layer: component visual contract
    token_count_policy: excluded_from_token_counts
    anatomy:
      - label
      - value
      - unit (optional)
      - delta / trend (optional)
      - helper text (optional)
    visual_contract:
      surface: ne-surface-base
      border: ne-boundary
      border_radius: rounded-lg
      padding_ref: spacing.lg
      label:
        color: ne-text-tertiary
        font_size: 13px
      value:
        color: ne-text-heading
        font_size: 32px
        font_weight: fw-bold
        line_height: 1
      unit:
        font_size: 14px
        font_weight: fw-medium
      meta:
        color: ne-text-tertiary
        font_size: 12px
      alignment: left
    semantic_policy:
      - metric은 data summary다. 기본적으로 status가 아니다.
      - trend / signal color를 쓰려면 명시적 의미가 있어야 한다.
      - assessment / result color는 metric이 assessment result를 표시할 때만 사용한다.
      - 일반 metric에 ne-status-* 또는 ne-assessment-* 색을 자동 적용하지 않는다.
    deferred:
      - sparkline
      - chart
      - responsive compact metrics
      - full dashboard KPI system
      - threshold-based color mapping
    must_not:
      - metric을 chart component로 확장하지 않는다.
      - 일반 metric에 status/assessment color를 자동 적용하지 않는다.
      - ready로 승격하지 않는다.
---

## 1. Overview

이 design.md는 AI-Native Token Foundation v0.11.0-alpha다.

v0.4 inventory map에서 시작해, v0.10 계열에서는 token foundation, component visual contracts, semantic policies, interaction state ramp, internal sharing readiness, AI agent execution guard, baseline handoff package hardening, NE 공식 CDN production font source 채택까지 확장되었다.

현재 상태는 PoC-ready / internal-alpha이며, production-ready 문서는 아니다. 이 문서는 NE 신규 PoC와 바이브코딩 기반 화면 구현에서 토큰, 컴포넌트, 상태, 패턴, 학습 도메인 의미를 일관되게 판단하기 위한 기준 문서다.

본 패키지의 required reading set은 `README.md` + `AI_HANDOFF.md` + `DESIGN.md` 3개이며, source of truth는 `DESIGN.md`, operational guide는 `AI_HANDOFF.md`, package entry는 `README.md`다.

**철학**

- AI-Native: 토큰은 YAML로 정확하게, 의도는 markdown으로 자유롭게.
- 역할 기반 명명: 토큰 이름은 색·크기를 가리키지 않고 *역할*만 가리킨다.
- Layered Tokens: hex는 Primitive 한 곳에만 박힌다 (Single Source of Truth).
- Reference Chain: Primitive → Semantic → Component 한 방향 참조.
- MVP: 결정된 것만 박는다. 미결정은 candidate/deferred에 명시한다.

**범위 (v0.11.0-alpha)**

- 포함: 컬러, 타이포그래피, 간격, 모서리, 입체감, 버튼, 배지·아바타, 폼, 토스트, 카드, 상태/패턴/후보 지도, component visual contracts(Layer 3), semantic policies(neutral/mono/status/assessment/negative/red coexistence), interaction state ramp, AI Agent Quick Rules, Token Alias Reference, hardened baseline handoff package structure, NE 공식 CDN production font source, structural sustainability patch (src baseline/examples/_stubs 분리 + full handoff zip + icon re-export wrapper + ESLint enforcement + Pre-implementation Checklist + token use_for/must_not_use_for guards + deferred_in_baseline + component_scope_policy + Structural Roadmap).
- 신규 primitive/color token 0건. Structural layout spec 4건 추가: spacing.container, spacing.breakpoint, z-index_layers, patterns.section_rhythm.
- 미포함: 인쇄(별도 PRINT.md), 다크 모드, 차트 팔레트, full component contract ready 승격, validator, 자동 token sync, npm package화, TypeScript, per-component versioning, full a11y audit, full dialog focus trap policy, toast queue policy, Tabs / Accordion full keyboard spec, 도메인 카드 baseline 승격.

**v0.4 inventory map (origin / history)**

v0.4는 origin point다. 필수 구성 요소 지도로 시작해 `ready`, `draft`, `candidate`, `deferred`로 확정 수준을 구분했다. 이후 사이클에서 contract / policy / state ramp를 누적해 v0.10.x 계열로 확장되었다. 프론트 시연 사이트는 제품이 아니라 DESIGN.md를 눈으로 검토하기 위한 내부 렌더러다. 상세 외부 레퍼런스는 `docs/reference/DESIGN_REFERENCES.md`를 참고한다.

## 1A. AI Agent Quick Rules

DESIGN.md를 처음 보는 AI coding agent / 바이브코딩 작업자 / 신규 PoC 담당자를 위한 1페이지 판단 규칙이다. 본 섹션은 시스템 전체를 읽기 전에도 따라야 하는 최소 금지선과 우선순위를 제공한다.

1. Do not reference primitive tokens directly in component code. Use semantic or component-level references.
2. Use neutral button for repeated/default actions.
3. Use primary red only for one major brand/forward CTA per screen.
4. Use assessment tokens for correct/incorrect learning results.
5. Use status tokens for system/content state, not for answer correctness.
6. Do not use danger/negative red as large fill.
7. Do not use disabled styling to represent permission/access state.
8. If a component or pattern is `candidate`, do not implement it as a reusable component.
9. If a component or pattern is `deferred`, stop and report.
10. If a strict object-path reference is missing or undefined, stop and report.
11. Token Alias Reference entries are valid token id aliases; do not auto-convert them to object paths.
12. Do not invent new colors, rgba, font weights, icons, spacing, or component variants.
13. Do not add a new icon library; use Lucide approved subset.
14. Do not apply Paperlogy inside component text; Pretendard is the default UI font.
15. Keep source/root color separate from component default state; do not force NE black root as every dark default.

본 규칙은 v0.11.0-alpha 기준의 최소 금지선이다. 더 자세한 정책은 `## 15. Semantic Policies`와 component contracts를 참조한다.

## 1B. Reference Taxonomy

DESIGN.md 안에서 등장하는 reference-like value는 두 가지 종류가 다르다. AI agent는 둘을 혼동하지 않아야 한다.

```yaml
reference_taxonomy:
  strict_object_path_ref:
    definition:
      - 문서 내부 object path를 가리키는 ref다.
      - 예: typography.scale.body-md, patterns.empty_state.recoverable_error, component_contracts.ne-alert.
    rule:
      - 실제 path가 없으면 undefined reference다.
      - undefined이면 AI agent는 stop and report한다.

  token_id_alias:
    definition:
      - component_contracts에서 CSS variable / token id를 짧게 참조하기 위한 kebab-case alias다.
      - 예: space-lg, rounded-md, fw-bold, elev-modal, ne-boundary, ne-text-heading.
    rule:
      - Token Alias Reference에 등록되어 있으면 valid alias다.
      - object-path로 자동 변환하지 않는다.
      - App.css / token data 정의 없이 등장하면 stop and report한다.

  ambiguous_ref:
    definition:
      - strict object-path인지 token id alias인지 불명확한 값이다.
    rule:
      - 자동 수정하지 않는다.
      - report한다.
```

## 1C. Token Alias Reference

component_contracts에서 사용하는 kebab-case token id alias의 참조표다. **이 alias들은 CSS variable / token id와 연결되는 valid reference이며, object-path로 자동 변환하지 않는다.** 본 registry는 신규 token 정의가 아니라 문서 설명일 뿐이며 `tokenCounts`에 포함하지 않는다.

```yaml
token_alias_reference:
  purpose:
    - component_contracts에서 쓰는 kebab-case token id alias의 참조표다.
    - 이 alias들은 CSS variable / token id와 연결되는 valid reference다.
    - alias를 object-path로 자동 변환하지 않는다.
  token_count_policy:
    included_in_token_counts: false
    reason: documentation reference only; no new token

  spacing:
    space-xs: var(--space-xs)
    space-sm: var(--space-sm)
    space-md: var(--space-md)
    space-lg: var(--space-lg)
    space-xl: var(--space-xl)

  radius:
    rounded-sm: var(--rounded-sm)
    rounded-md: var(--rounded-md)
    rounded-lg: var(--rounded-lg)
    rounded-xl: var(--rounded-xl)
    rounded-pill: var(--rounded-pill)
    rounded-full: var(--rounded-full)

  typography_weight:
    fw-regular: var(--fw-regular)
    fw-medium: var(--fw-medium)
    fw-bold: var(--fw-bold)
    fw-extrabold: var(--fw-extrabold)

  elevation:
    elev-card: var(--elev-card)
    elev-modal: var(--elev-modal)
    elev-hover: var(--elev-hover)

  boundary:
    ne-boundary: var(--ne-boundary)

  text:
    ne-text-heading: var(--ne-text-heading)
    ne-text-body: var(--ne-text-body)
    ne-text-tertiary: var(--ne-text-tertiary)
    ne-text-disabled: var(--ne-text-disabled)
    ne-text-on-dark: var(--ne-text-on-dark)
    ne-text-on-dark-soft: var(--ne-text-on-dark-soft)

  rule:
    - ne-text-secondary is not a valid alias in v0.10.1.
    - use ne-text-tertiary where lower emphasis body / meta text is required.
    - if an alias is not listed here and is not defined in App.css / token data, stop and report.
```

## 1D. Inventory Status Operational Rules

`ready` / `draft` / `candidate` / `deferred` status는 시각 분류가 아니라 운영 규칙이다. component뿐 아니라 pattern, state_family, candidate inventory 전체에 적용된다.

```yaml
inventory_status_operational_rules:
  ready:
    may_use_in:
      - PoC
      - MVP candidate
      - production with review
    requires:
      - token refs valid
      - visual states defined
      - owner review before production use
    must_not:
      - bypass semantic token references
      - invent undocumented variants

  draft:
    may_use_in:
      - PoC
      - MVP behind owner review
    requires:
      - owner decision before production use
      - implementation caveats documented
    must_not:
      - export as shared reusable component without review
      - treat as production-ready

  candidate:
    may_use_in:
      - documentation
      - local experiment with explicit note
    requires:
      - product need validation
      - token and interaction decision before reusable implementation
    must_not:
      - implement as reusable component
      - use as canonical pattern

  deferred:
    may_use_in:
      - not allowed for implementation
    requires:
      - separate scope decision
    must_not:
      - implement in PoC as if approved
      - create new token or variant to fill the gap
```

If an AI coding agent finds a `candidate` or `deferred` component/pattern, it must **stop and report** instead of implementing it as a reusable component.

## 1E. Layer Boundary Policy — patterns vs component_contracts

`ne-table` / `ne-data-list` / `metric_display` / `progress_feedback`는 `patterns`와 `component_contracts` 두 영역에 모두 등장한다. 중복이 아니라 **Layer 2 / Layer 3 separation**이다.

```yaml
layer_boundary_policy:
  patterns_layer:
    role:
      - usage pattern
      - semantic behavior
      - minimum rules
      - state or interaction pattern summary
    examples:
      - patterns.ne-table
      - patterns.ne-data-list
      - patterns.metric_display
      - patterns.progress_feedback
    note:
      - patterns entries describe how a UI pattern is used and what semantic rules it follows.
      - patterns entries are not full visual contracts.

  component_contracts_layer:
    role:
      - Layer 3 visual composition contract
      - component implementation contract
      - visual anatomy, spacing, typography, variants, states
    examples:
      - component_contracts.ne-table
      - component_contracts.ne-data-list
      - component_contracts.metric_display
      - component_contracts.progress_feedback
    note:
      - component_contracts entries define component-level visual and implementation expectations.

  duplication_policy:
    rule:
      - If an item exists in both patterns and component_contracts, do not treat it as accidental duplication.
      - The patterns entry is semantic / usage guidance.
      - The component_contracts entry is visual / implementation guidance.
      - Do not delete or move either layer without explicit owner decision.

  ne_divider_note:
    current_location: patterns.ne-divider
    status:
      - single-definition entry
      - not part of the duplicated patterns / component_contracts set
    rule:
      - Keep ne-divider as a single-definition entry until a future classification review.
      - Review utility component vs pattern classification in a future patch cycle if needed.
```

## 1F. Required Handoff Files / File Manifest

DESIGN.md는 시스템의 primary specification이며 source of truth다. v0.10.5-alpha부터 file manifest는 **package_entry / core_authority / optional_reference / historical_archive** 네 카테고리로 정합한다. 일반 인계 워크플로에서는 README.md + AI_HANDOFF.md + DESIGN.md 3개를 required reading set으로 함께 전달하며, 그중 source of truth는 DESIGN.md, operational guide는 AI_HANDOFF.md, package entry는 README.md다. brand provenance / 내부 review context / 외부 reference / 실행 가능한 demo source가 필요한 경우에만 optional file을 함께 보낸다. **외부 파일 내용을 DESIGN.md에 인라인하지 않는다.** v0.6.2 파일 분리 결정을 보존한다.

README.md is required for folder/zip package orientation but is not a policy source.
DESIGN.md remains the primary source of truth.
AI_HANDOFF.md remains the operational guide for AI coding agents.

```yaml
required_handoff_files:
  purpose:
    - DESIGN.md is the primary source of truth.
    - AI_HANDOFF.md is the operational execution guide for AI coding agents.
    - README.md is the package index / orientation, required for folder or zip package sharing.
    - Source / reference / archive files are optional and used when deeper context is needed.

  package_entry:
    README.md:
      role: Package index and orientation.
      source_of_truth: false
      required_when: sharing as a folder or zip archive

  core_authority:
    DESIGN.md:
      role: Primary design system specification.
      source_of_truth: true
    AI_HANDOFF.md:
      role: AI coding agent execution guide and guardrails.
      source_of_truth: operational

  optional_reference:
    docs/reference/BRAND_SOURCE.md:
      role: Brand provenance and reconciliation.
      source_of_truth: reference_only
    docs/reference/DESIGN_REFERENCES.md:
      role: External design system reference trace.
      source_of_truth: reference_only

  historical_archive:
    docs/archive/INTERNAL_SHARING_MEMO.md:
      role: Historical internal memo.
      source_of_truth: false

  optional_baseline_zip:
    baseline_zip:
      role:
        - executable / demo / archive baseline
        - optional reference when code / CSS / component source is needed
      required_for_general_handoff: false

  handoff_rule:
    - Required reading set = README.md + AI_HANDOFF.md + DESIGN.md.
    - Core authority = DESIGN.md (primary) + AI_HANDOFF.md (operational).
    - README.md is index / orientation, not a policy source.
    - Provide optional reference / archive files only when brand provenance, historical rationale, or executable demo source is required.
    - Do not require collaborators to read all archive files before starting a PoC screen.

  must_not:
    - Treat README.md as a policy source.
    - Inline optional reference/archive file contents into DESIGN.md without owner decision.
    - Treat missing optional reference/archive files as permission to invent missing design rules.
    - Treat DESIGN.md as production-ready solely because optional reference/archive files are listed.
    - Promote baseline zip to required handoff file without owner decision.
    - Use docs/archive/* files to override current handoff files.
```

## 1G. tokenCounts Policy

`tokenCounts`는 시스템의 core token inventory를 추적해 uncontrolled token expansion을 감지하는 지표다. **모든 문서 alias나 reference를 다 세지 않는다.** 신규 token을 추가하지 않고, prose-only 정합화를 위한 정의 명시다.

```yaml
token_counts_policy:
  purpose:
    - tokenCounts tracks core token inventory, not every documentation alias.
    - It is used to detect uncontrolled token expansion.

  included:
    - primitive color tokens
    - semantic color tokens
    - typography scale tokens
    - spacing tokens
    - radius tokens
    - elevation tokens
    - approved icon inventory if counted by the system

  excluded:
    - component_contracts
    - token_alias_reference
    - reference_taxonomy
    - documentation-only aliases
    - prose examples
    - source / archive file references
    - brand source records not promoted to UI tokens

  rules:
    - Adding a component contract does not increase tokenCounts.
    - Adding a token alias reference does not increase tokenCounts.
    - Adding a brand source record does not increase tokenCounts.
    - tokenCounts changes require explicit owner decision.
```

## 1H. WCAG Contrast Matrix Summary

이미 검증된 주요 contrast pair를 빠르게 확인하기 위한 요약표다. **자동 WCAG validator가 아니다.** 새 색상 계산이나 token 변경은 없다. 새 조합이 등장하면 별도 review가 필요하다.

```yaml
wcag_contrast_matrix_summary:
  status: documentation_summary
  note:
    - This matrix summarizes known safe combinations.
    - It is not an automated WCAG validator.
    - New combinations require review.

  known_safe_pairs:
    - pair: mono-500 / on-mono
      use: neutral button default
      status: verified_in_prior_patch
    - pair: mono-900 / on-mono
      use: neutral button hover/active
      status: verified_in_prior_patch
    - pair: ne-text-heading / surface
      use: heading text
      status: expected_safe
    - pair: ne-text-body / surface
      use: body text
      status: expected_safe
    - pair: assessment-correct / assessment-bg
      use: answer result
      status: requires_context_review_if_large_area
    - pair: status-danger / status-bg
      use: small signal text / icon
      status: not_for_large_fill

  review_required_pairs:
    - pair: ne-primary fill + ne-on-primary white text
      use: primary button default (brand CTA)
      status: contrast_caveat
      note: "#E83828 fill + #FFFFFF text는 normal-size body text 기준 WCAG AA 4.5:1 경계 아래(~4.18:1)다. 14pt bold 또는 18pt 이상에서는 large text AA 3:1을 충족한다. button label 사이즈·weight·면적·사용 맥락을 production 적용 전 review한다."

  must_not:
    - Treat this summary as a substitute for full accessibility testing.
    - Create a new color to pass contrast.
    - Use negative red as large fill.
    - Treat review_required_pairs entries as known safe pairs.
```

## 1I. a11y Baseline

system-level minimum a11y prose다. AI agent가 PoC 화면 / AI-generated UI / component usage review에서 최소한의 accessibility guard를 이해하도록 한다. **현재 alpha baseline에서는 ready component a11y audit을 수행하지 않는다. ready requires를 완화하지 않는다. ready component를 강등하지 않는다. component별 a11y audit은 v0.11 후보로 둔다.**

```yaml
a11y_baseline:
  status: system_level_minimum_prose
  applies_to:
    - new PoC screens
    - AI-generated UI
    - component usage review

  minimum_rules:
    focus_visibility:
      rule:
        - interactive elements must have visible focus indication.
      note:
        - do not regress form focus to primary red or negative red.

    hit_area:
      rule:
        - primary interactive controls should target 44x44px where practical.
      scope:
        - buttons
        - icon buttons
        - touch targets
      note:
        - compact desktop-only controls may require owner review.

    color_only:
      rule:
        - do not rely on color alone for critical state.
      examples:
        - assessment result should include text / icon / copy, not color only.
        - error should include message, not only red styling.

    keyboard_minimum:
      rule:
        - interactive patterns should remain keyboard reachable.
      deferred:
        - full component-level keyboard interaction specs are not completed in the current alpha baseline.

  explicit_deferred:
    - ready component a11y audit
    - dialog focus trap
    - toast announcement model
    - tabs Home/End keyboard behavior
    - accordion single/multiple open policy
    - automated WCAG testing

  must_not:
    - downgrade ready components in this cycle.
    - weaken ready requires in this cycle.
    - claim production accessibility compliance.
```

## 1J. YAML / Value Formatting Guide

AI agent가 object-path ref / token id alias / raw value / prose label을 혼동하지 않도록 하는 formatting 정합화 prose다. 실제 값은 변경하지 않는다.

```yaml
value_formatting_guide:
  object_path_refs:
    examples:
      - typography.scale.body-md
      - patterns.empty_state.recoverable_error
      - component_contracts.ne-table
    rule:
      - Use dot-path when referencing internal document objects.

  token_id_aliases:
    examples:
      - space-lg
      - rounded-md
      - fw-bold
      - elev-modal
    rule:
      - Use kebab-case when referencing Token Alias Reference entries.
      - Do not auto-convert alias to object-path.

  css_variables:
    examples:
      - var(--ne-mono)
      - var(--space-lg)
    rule:
      - Use CSS variable form only in CSS examples or direct style contracts.

  quoted_values:
    hex:
      rule:
        - Quote raw hex values when documenting source values.
      example: "#E83828"
    rgba:
      rule:
        - Do not create new rgba values.
        - Existing rgba traces are documentation-only unless already implemented.
    px:
      rule:
        - Keep px values as written in existing contracts.
        - Do not convert px values to tokens without owner decision.

  labels:
    rule:
      - hyphenated labels such as recoverable-error may be prose labels.
      - YAML object keys should preserve snake_case when already established.
```

## 1K. Brand Layer Usage Policy

brand source / brand layer token / product UI component fill의 경계를 명시한다. NE CI 자산이 자동으로 product UI token으로 승격되지 않도록 한다. `docs/reference/BRAND_SOURCE.md`는 provenance record로 유지되고, `DESIGN.md`가 product UI 사용을 정의한다.

```yaml
brand_layer_usage_policy:
  purpose:
    - Separate brand source assets from product UI component tokens.
    - Prevent automatic promotion of CI colors / fonts into product UI.

  brand_layer_tokens:
    ne-brand-primary:
      source: NE brand source
      use_for:
        - logo signature context
        - brand / marketing surface
        - source trace
        - limited brand emphasis when explicitly mapped
      must_not:
        - use as default component fill without semantic mapping
        - replace ne-primary automatically

    ne-brand-secondary:
      source: NE brand source or documented brand family
      use_for:
        - brand source documentation
        - marketing or identity context if approved
      must_not:
        - become product UI status color automatically
        - become component variant automatically

  rule:
    - Brand source values require explicit semantic mapping before product UI use.
    - docs/reference/BRAND_SOURCE.md remains the provenance record.
    - DESIGN.md defines product UI usage.
```

## 1L. Baseline Archive Verification

Required reading set은 `README.md + AI_HANDOFF.md + DESIGN.md`다 (필요 시 `AGENTS.md` 진입 훅 포함). handoff zip은 이 패키지를 folder/zip으로 공유할 때의 **canonical artifact**이며, v0.11.0-alpha부터 docs + fork-ready baseline + stubs를 함께 포함한다. (이전 "optional archive / docs-only snapshot" 모델은 폐기되었다.)

zip은 **반드시 `npm run build:handoff-zip` builder로만** 생성한다. broad `zip -r ... .` 명령은 금지(self-include / 누수 위험). builder는 allowlist 기반이며 staging 후 `public/design-md_v<version>.zip`으로 출력한다. `npm run build`는 `build:handoff-zip && vite build`로 체이닝되어 있어, build 시 최신 zip이 public/에 생성된 뒤 dist/로 복사된다(public/dist 동기화 자동화).

v0.11.5(2026-06-17)부터 handoff zip은 **pure baseline kit**으로 좁힌다 — fork target + 정책 문서 + build scaffolding만 담고, design.md 사이트 렌더러 코드와 NE-내부 문서는 제외한다(repo-only). 이로써 `docs/feedback` 같은 신규 내부 문서가 추가돼도 zip에 새지 않으며, 소비자가 "무엇이 fork 대상인가"를 헷갈리지 않는다.

**포함 (builder allowlist):**

- `README.md`, `AI_HANDOFF.md`, `DESIGN.md` — required reading set
- `AGENTS.md` — agent-native 진입 훅 (얇은 read-order/guardrail 포인터, 정책 원천 아님)
- `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, `eslint.config.mjs`
- `_READ_FIRST.txt`, `font.css` — builder가 생성
- `src/baseline/` — PoC fork target / `src/_stubs/` — deferred stub (정책 아님)
- `docs/templates/` — self-validation 리포트 양식 (소비자 산출물)
- `scripts/build-handoff-zip.mjs`, `scripts/check-baseline-coverage.mjs`

**절대 제외 (builder forbidden):** 사이트 렌더러(`src/components/`, `src/data/`, `src/hooks/`, `src/lib/`, `src/App.css`, `src/styles/`, `src/App.jsx`, `src/main.jsx`, `src/examples/`), 내부 문서(`docs/reference/`, `docs/archive/`, `docs/PATCH_REPORT_*.md`, `docs/feedback/`, `docs/review/`, `docs/fail_report/`, `docs/PoCv3_AI_HANDOFF.md`, `docs/INTERNAL_ROLLOUT*`), doc-sync 가드(`scripts/check-designmd-sync.mjs` — `src/data/designMd.js` 의존이라 kit에서 무의미), `.git`, `.claude/`, `node_modules`, `dist/`, prior `*.zip`, `patch_prompt/`, `__MACOSX`, `.DS_Store`.

### Denylist verification (expect 0 lines)

```bash
unzip -Z1 public/design-md_v0.11.5-alpha.zip \
  | grep -E "\.zip|node_modules|dist/|\.git|\.claude|src/(components|data|hooks|lib|styles)|src/App\.(jsx|css)|src/main\.jsx|src/examples|docs/(reference|archive|feedback|review|fail_report|PATCH_REPORT|INTERNAL_ROLLOUT)|check-designmd-sync|patch_prompt|__MACOSX|\.DS_Store"
```

### Content check (각 path 1+ entry 기대)

```bash
unzip -Z1 public/design-md_v0.11.5-alpha.zip \
  | grep -E "^(README.md|AGENTS.md|AI_HANDOFF.md|DESIGN.md|font.css|_READ_FIRST.txt|package.json|package-lock.json|index.html|vite.config.js)$|^src/baseline/|^src/_stubs/"
```

handoff zip은 v0.11.0-alpha부터 일반 인계에 포함된다. 단 `npm run dev`로 즉시 작동하는 완성 앱이 아니라, PoC가 자체 entry(`src/main.jsx`/`src/App.jsx`)를 작성해 `src/baseline/`을 fork하는 building blocks 모음이다. 파일이 변경되면 공유 전 builder로 zip을 재생성한다.

## 1M. Explicitly Deferred (current alpha → v0.11+)

현재 alpha baseline에서 의도적으로 다루지 않는 항목이다.

```yaml
deferred:
  visual_or_token_impact:
    - opacity primitive
    - raw rgba derive token
    - dark mode
    - responsive system
    - font embedding token redesign
    - avatar size_context layer

  structure_impact:
    - patterns <-> component_contracts actual relocation
    - ne-neutral / ne-mono Alert / Dialog action integration
    - ne-divider utility component vs pattern final classification

  audit_impact:
    - ready component a11y audit
    - automated WCAG validator
    - visual regression test pipeline
```

## 1N. Deferred in Baseline (v0.11.0-alpha)

v0.11.0-alpha에서 handoff zip에 baseline을 포함하면서, DESIGN.md가 `deferred`로 둔 항목 중 일부가 baseline 안에 minimum stub으로 들어간다. 그 임시 구현이 사실상 spec으로 굳지 않도록(함정 3: deferred frozen) 3-Layer 가드를 둔다.

- Layer 1 (디렉터리명): `src/_stubs/`라는 이름 자체가 경고.
- Layer 2 (코드 JSDoc): 각 stub 파일에 `@deferred-stub` + `Do not derive policy from this.` + `review_at: v0.12.0-alpha`.
- Layer 3 (본 spec 절): stub_file / stub_decisions / review_at 명시.

```yaml
deferred_in_baseline:
  Dialog:
    stub_file: "src/_stubs/Dialog.jsx"
    stub_version: "v0.11.0-alpha"
    review_at: "v0.12.0-alpha"
    policy_source: false
    stub_decisions:
      - "minimum visual/runtime stub only"
      - "focus-trap deferred"
      - "portal deferred"
      - "scroll-lock deferred"
  Toast:
    stub_file: "src/_stubs/Toast.jsx"
    stub_version: "v0.11.0-alpha"
    review_at: "v0.12.0-alpha"
    policy_source: false
    stub_decisions:
      - "minimum visual/runtime stub only"
      - "exact duration deferred"
      - "queue policy deferred"
      - "mobile placement deferred"
  must_not:
    - "_stubs/" 안의 구현을 사실상 spec으로 인용하지 않는다.
    - Dialog / Toast 외 컴포넌트를 임의로 _stubs로 옮기지 않는다.
    - Tabs / Accordion을 stub scope로 끌어들이지 않는다.
```

## 1O. Component Scope Policy (v0.11.0-alpha)

baseline은 어디까지 책임지고 PoC는 어디부터 책임지는가의 명시. Bottleneck 4(도메인 컴포넌트 폭발) 사전 차단.

```yaml
component_scope_policy:
  baseline_responsibility:
    - tokens (primitive / semantic 모두)
    - system components (Button, Card, Form, Dialog, Toast, Alert, Tabs, Accordion 등)
    - utility layout primitives (Stack, Cluster, Grid, PageContainer)
    - pattern primitives (section header, page shell)
    - baseline wrappers (PageContainer, SectionHeader, Card, Button 등)
  poc_responsibility:
    - 도메인 카드 (ArticleCard, BookCard, StudentCard 등)
    - 도메인 화면 composition
    - 도메인 데이터 모델
    - business logic
  rule: |
    PoC는 baseline의 Card / Button / PageContainer / SectionHeader anatomy를 따라
    도메인 컴포넌트를 구성한다.
    ArticleCard, BookCard, StudentCard 같은 도메인 카드를 baseline에 즉시 추가하지 않는다.
  must_not:
    - 도메인 카드를 component_contracts ready로 즉시 승격하지 않는다.
    - F-007(도메인 카드 중복)을 baseline component로 즉시 정식화하지 않는다.
    - "이번 PoC에 필요하다"는 이유로 baseline 컴포넌트를 도메인 어휘로 채우지 않는다.
```

## 1P. Structural Roadmap (v0.11.0-alpha — trigger-based candidates)

v0.12+ 후보 항목을 시점이 아니라 측정값 기반 trigger로 박는다. AI agent capability evolution(Bottleneck 5)을 흡수하기 위해 schedule이 아니라 candidates 형태다.

```yaml
structural_changes:
  v0.12_file_split:
    trigger:
      - "DESIGN.md > 4,000 lines"
      - "OR AI compliance audit에서 spec section miss 30%+ 발생"
    note:
      - "AI capability evolution을 고려해 시점이 아니라 측정값 기반으로 검토"
  v0.12_read_only_validator:
    trigger:
      - "동일 audit이 2회 연속 같은 카테고리 위반 발생"
    note:
      - "build-fail validator는 v0.11.0-alpha 범위 밖"
  v0.12_responsive_minimum:
    trigger:
      - "PoC 2개 이상에서 mobile/tablet 레이아웃 임의 결정(inline media query / 임의 breakpoint) 발생"
      - "OR self-validation 리포트에서 responsive 관련 stop-and-report·drift 2회 연속 누적"
    scope:
      - "breakpoint→layout 거동 규칙 정식화 (현재 .ne-collapse opt-in을 명시 규칙으로)"
      - "mobile page padding / section rhythm 축소 스케일"
      - "touch target 최소 규칙 (버튼 44px 등 기존 값 명문화)"
      - "table mobile fallback"
    governance:
      - "반응형 reflow / 모바일·데탑 분리는 PoC 아키텍처 결정. 시스템이 강제하지 않는다."
      - "어느 모델이든 동일 토큰·컴포넌트를 소비한다. 모바일 전용 token set 분기 금지 (single source)."
    out_of_scope:
      - "자동 grid 프레임워크 전체 도입"
      - "fluid typography/spacing (over-engineering 경계, 별도 trigger로 분리 검토)"
      - "래스터 이미지 에셋 파이프라인 (PoC 책임)"
    note:
      - "현재 responsive_intent(문서 가이드) + minimum fallback만 존재. 시점이 아니라 PoC 실측 신호로 진입 (trigger-based)."
  v0.13_stubs_promotion:
    trigger:
      - "_stubs/ 5개 이상 누적"
    procedure:
      - "매 3-4 patch마다 stub 1-2개를 정식 spec + 구현으로 승격 검토"
  v0.14_npm_package:
    trigger:
      - "PoC 3개 이상이 baseline fork 사용 후 안정성 확인"
    note:
      - "unified semver"
  v1.0_production_release:
    trigger:
      - "validator + 정식 component contract ready 승격 + a11y audit 완료"
    note:
      - "Production-ready unified semver release 후보"
      - "per-component versioning은 over-engineering으로 금지"

revision_triggers:
  - "AI 실패 audit에서 spec compliance drop 30%+ 측정 시 → 분할 즉시 검토"
  - "AI agent 일반 capability 메이저 점프 시 → 로드맵 전체 재검토"
  - "PoC pace 분기 1건 이하 시 → 일부 항목 연기 검토"
```

## 1Q. Baseline CSS Coverage (v0.11.5-alpha)

DESIGN.md가 광고하는 `.ne-*` 계약 중 baseline 어댑터(`src/baseline/styles/`)가 실제 CSS로 구현한 것만 **live**다. 미구현 `.ne-*`는 에러가 아니라 **무효(silent dead class)** — build/lint/preview를 통과하므로 소비자가 가장 먼저·조용히 밟는다. (첫 PoC 리포트에서 `ne-badge` 사례로 발견.)

```yaml
baseline_css_coverage:
  # live = baseline CSS로 실제 구현된 .ne-* (소비자가 바로 써도 되는 것).
  live_contracts:
    - ne-btn            # components.css (5 variant × size)
    - ne-card           # components.css (+ --muted / --compact)
    - ne-badge          # components.css (category-mono/color, level-1~3, status-*, result-*, count) [v0.11.5]
    - ne-page / ne-section / ne-grid / ne-stack / ne-cluster / ne-collapse  # layout.css
  # must-tier(= btn/card 등급: 순수 CSS·토큰·deferred 동작 없음)인데 아직 미구현 → 다음 conformance 대상.
  must_tier_todo:
    - ne-avatar          # 4 size + fallback
    - ne-form-*          # input/select/checkbox/radio/switch 시각층 (DESIGN.md 계약 존재, 어댑터 미배선)
  # CSS는 넣되 동작 deferred:
  css_with_deferred_behavior:
    - ne-tabs / ne-accordion  # 키보드 spec deferred
  # stub 유지 (구현 안 함):
  stub_only:
    - ne-dialog / ne-toast    # portal / focus-trap / queue deferred
  rule:
    - 소비자는 live_contracts만 "바로 작동"으로 신뢰한다. must_tier_todo는 토큰만 적용되고 시각층은 PoC가 보완하거나 stop-and-report.
    - live_contracts는 scripts/check-baseline-coverage.mjs가 baseline CSS 정의와 양방향 대조(회귀 차단). 전체 §8 regex 대조는 draft/deferred/stub false positive로 금지.
    - 신규 .ne-* 계약을 must-tier로 승격하면 같은 사이클에 baseline CSS도 구현하거나 must_tier_todo에 명시한다.
```

## 2. Colors

컬러는 Primitive / Semantic / Brand / Assessment 네 색상 계층으로 관리한다.
이 네 계층은 전체 `layer_contract` 안에서 color layer에 해당한다.
color의 Brand는 system layer의 `brand`, Assessment는 `domain` layer에 각각 대응한다.
component와 pattern은 semantic을 우선 참조한다.

## 3. Typography

font-family · font-weight · 스케일의 3축으로 정의한다. 한국어 환경 Pretendard variable.
font-weight는 400 / 500 / 700 / 800 4단계만 사용한다. 정의되지 않은 weight는 사용하지 않는다.

## 4. Spacing

8px 그리드 8단계. 정의된 단계만 사용한다.

## 5. Rounded

7단 border-radius. 작은 뱃지에서 알약형 · 원형까지 단계만으로 표현한다.

## 6. Elevation & Depth

라이트 UI 전제의 그림자 3단. 따뜻한 그레이 톤(rgba 20,20,19,*)을 사용한다.

## 7. Buttons

5종(primary · neutral · subtle · text · inverse) × 5상태(default · hover · active · focus · disabled).
위계 4종(primary → neutral → subtle → text)에 컨텍스트 변형 inverse(컬러 표면 위)가 더해진 구성.
사이즈 5단계(sm 36 / md 44 기본 / lg 52 / xl 60 / 2xl 68)는 변형과 직교한다.
사이즈 modifier는 height만 변동하고 padding·font-size·rounded는 동일 유지.
text 변형은 height auto이므로 사이즈 modifier 적용 대상이 아니다.

### Button usage

- `primary`: 가장 강한 CTA. 한 화면에 1개 권장.
- `neutral`: 빈도 높은 일반 액션.
- `subtle`: 보조·취소·낮은 강조 액션.
- `text`: 문장 안 또는 낮은 강조 인라인 액션.
- `inverse`: 어두운 표면 또는 강조 표면 위 액션.
- Button loading은 `state_families.loading.button`을 참조한다. 중복 제출 방지와 width 흔들림 방지 같은 공통 규칙은 `state_families.loading`에서 관리한다.
- icon-only, spinner 위치, loading duration은 아직 deferred다.

## 8. Badges & Avatars

11개 Badge 변형과 4개 Avatar 크기. 모든 변형은 기존 토큰 차용으로 정의된다. 신규 hex 0건.

Badge는 bg + text 두 색만으로 위계 표현. border 사용 안 함. 작은 라벨이라 시각 부담 최소화가 원칙.

### Badge — 5 그룹 11 변형

- **Category (2)**: `category-mono`은 디폴트, `category-color`는 강조 전용. 한 화면에 1~2개만.
- **Level (3)**: 초급 · 중급 · 고급. 5단계 필요 케이스는 PoC 적용 후 재검토한다.
- **Status (4)**: success · warning · danger · neutral. `status-neutral`은 미시작 · 진행 중 같은 중립 상태.
- **Result (2)**: Assessment Layer 차용. 정답 / 오답.
- **Count (1)**: 알림 · 미확인 카운트. 99+ 가로 확장 가능 → `rounded.pill` (full 아님).

Status와 Result는 시각이 비슷해도 의미가 다르다. category-color는 강조 전용이며 과사용하지 않는다.
Badge는 작은 식별 요소이므로 장식적 효과를 추가하지 않는다. interactive badge와 filter chip류는 deferred다.

### Avatar — 4 크기 + fallback

- sm 24px (댓글 · 인라인 멘션) · md 32px (리스트) · lg 40px (헤더 · 프로필) · xl 56px (큰 프로필).
- fallback은 이니셜 표시. 크기별 typography 차등 (caption · body-sm · title-sm · title-md).
- 모든 크기 `rounded.full` (`rounded.full`은 Avatar 전용으로 한정).
- pastel fill 사용 안 함. 시스템 모노크롬 정합성 유지.
- 프로필 이미지가 식별에 필요하면 사용자 이름을 alt로 제공한다. 주변 텍스트가 이미 식별하면 장식 이미지로 처리할 수 있다.
- image loading placeholder, group/stacked avatar, status indicator는 deferred다.

## 9. Forms

7개 컴포넌트와 보조 토큰. 컴포넌트 필수 시각 요소(체크마크 · radio dot · select caret)는
SVG로 정의한다. 장식적 prefix · suffix 아이콘은 v0.x에서 추가된다.

label은 입력 목적, helper는 형식 안내, error는 수정해야 할 검증 실패,
counter는 제한 상태를 보조적으로 표시한다. search input은 `patterns.search_form`과 연결 가능하다.
Form control은 placeholder를 label 대체로 사용하지 않는다. Error text는 해당 control과 의미상 연결된다.
구체 ARIA 매핑은 deferred로 둔다. Required state는 시각과 의미 양쪽으로 표시하며, 음성 안내 구현은 추후 정의한다.

### Form 상태 우선순위 (단순 규칙)

`disabled > readonly > error > success > focus > hover > default`

예외 케이스는 Known Gaps 참조.

## 10. Cards, Toast & Link

`ne-card`는 관련 정보를 하나의 표면으로 묶는 draft 컴포넌트다.
flat은 배경과 동일한 위계의 정보 묶음, elevated는 독립된 콘텐츠 블록,
interactive는 카드 전체가 하나의 목적지로 이동할 때만 사용한다.
minimum anatomy는 container, optional title, optional description, optional meta, optional actions로 둔다.
media card, result card, skeleton card는 deferred다.

`ne-toast`는 짧은 작업 결과를 일시적으로 알리는 draft 컴포넌트다.
neutral, success, danger 변형만 두며, 중요한 오류에는 toast만 사용하지 않는다.
v0.4.1에서는 현재 시연 위치를 toast의 잠정 기준으로 인정한다.
Mobile placement, queue behavior, exact duration은 deferred로 둔다.

`ne-link`는 본문 안 이동, 문서 링크, 보조 탐색에 쓰는 draft 컴포넌트다.
주요 CTA는 button을 먼저 검토하고, link를 button처럼 보이게 만들지 않는다.
external link icon, visited state, underline policy, routing policy는 deferred다.

## 11. State Families & Patterns

`loading`과 `validation`은 여러 컴포넌트가 공유하는 draft state family다.
loading은 중복 제출 방지, aria-busy 고려, 1초 이상 시각 피드백, 버튼 width 흔들림 방지를 최소 규칙으로 둔다.
button loading은 동일 액션 중복 방지, section loading은 특정 영역 갱신, page loading은 초기 화면 또는 큰 전환,
inline loading은 작은 컨트롤이나 텍스트 옆 상태로 구분한다. spinner와 skeleton은 boundary만 구분하고 시각 정책은 deferred다.
Loading indicator는 로딩 중임을 보여주는 기본 시각 장치다. spinner는 진행률을 보여주지 않는 loading indicator이며,
v0.6 demo는 minimum animation과 prefers-reduced-motion 대응을 제공한다. page overlay와 skeleton visual policy는 deferred다.
validation 우선순위는 Form 상태 우선순위와 동일하다.

`empty_state`, `search_form`, `feedback`, `page_shell`은 draft pattern이다.
검색 결과 없음은 error가 아니라 empty state로 처리한다.
empty state의 minimum anatomy는 title, description, optional action이다. illustration은 optional이며 asset/style system은 deferred다. v0.6 demo는 검색 결과 없음과 recoverable error visual을 분리해 보여준다.
Recoverable error는 사용자가 다시 시도할 수 있는 실패 상태다. 복구 가능한 실패에는 retry action을 제공한다.
검색 결과 없음은 error가 아니라 empty state로 처리하며, critical error는 toast만으로 전달하지 않는다.
Search form은 콘텐츠를 찾기 위한 일반 검색 흐름이다. Enter submit을 최소 규칙으로 두고, no-results는 empty state와 연결한다.
Command palette는 keyboard-first command/search interaction 후보이며, search form을 command palette처럼 확장하지 않는다.
feedback에서 toast는 일시적 피드백이고 alert는 화면 안에 남는 메시지다.
page_shell은 Header / Sidebar / Main / Footer 같은 화면 슬롯을 조합하는 page-level pattern이다.
main은 필수이며 header, sidebar, footer는 화면 맥락에 따라 선택한다.

## 12. Data Components

Data Components는 table-first 기준의 데이터 표현 foundation이다. `ne-table`은 draft 컴포넌트이며 행과 열 비교가 필요한 관리 목록, 결과 비교, 기록에 사용한다. `ne-data-list`는 읽고 고르는 반복 항목에 사용하고, card-grid는 시각적 탐색이나 선택이 중심일 때 검토한다.

`ne-divider`, `metric_display`, `progress_feedback`은 v0.6 draft다. divider는 boundary token으로 구분을 만들고, metric_display는 숫자 값을 보여주며, progress_feedback은 진행 정도를 값으로 보여준다. sorting, filtering, pagination, row selection, full data grid behavior는 deferred다.

## 13. Icon System & Candidate Registry

`icon_system`은 `ne-icon` 정식 컴포넌트가 아니라 Lucide 기반 icon usage rule이다.
Lucide는 NE의 단일 icon source이며, icon은 기본적으로 currentColor를 사용한다.
decorative icon은 `aria-hidden`으로 처리하고, informative icon은 주변 text 또는 aria-label로 의미를 전달한다.
icon-only control, icon size token, NE-specific custom icon 제작은 deferred다.

v0.6에서 `Component Pack 1` 임시 명칭은 `Feedback & Interaction` 구조로 정리했다. `ne-alert`, `ne-dialog`, `ne-tabs`, `ne-accordion`, loading demo는 minimum runtime interaction을 제공한다.
남은 component candidate는 `ne-dropdown`, `ne-tooltip`, `ne-pagination`, `ne-breadcrumb`, `ne-command-palette`다.
Candidate는 인지된 후보이지 사용 가능 컴포넌트가 아니다.
Table은 행과 열로 데이터를 비교할 때 검토한다. Data list는 반복되는 단순 항목을 표시할 때 검토한다.
Card grid는 시각적 탐색이나 선택이 중심일 때 검토한다. Sorting, filtering, density는 현재 범위에서는 정의하지 않는다.
Component candidate의 외부 reference lens는 `docs/reference/DESIGN_REFERENCES.md`의 Component Reference Lens를 기준으로 검토한다.
Reference lens는 구조와 사용 규칙을 보기 위한 기준이며, 외부 visual style을 복제하기 위한 기준이 아니다.

## 14. Do's and Don'ts

### Do
1. 컴포넌트는 ne-* Semantic 토큰만 참조한다.
2. Brand 색은 BI / CI · Hero 시그니처 전용이다.
3. focus 상태를 항상 표시한다(ne-primary-focus-ring · ne-form-input-focus-ring · ne-status-danger-focus-ring).
4. Assessment와 Status를 의미로 구분한다.
5. 간격·모서리·font-weight는 토큰 외 임의 값을 사용하지 않는다.
6. font-weight는 정의된 4단계(400 / 500 / 700 / 800)만 사용한다.
7. UI icon은 Lucide를 단일 source로 사용하고 currentColor를 따른다. 이모지는 금지한다.

### Don't
1. Primitive를 컴포넌트에서 직접 참조하지 않는다.
2. 색계열 이름(accent)으로 색을 짐작하지 않는다.
3. Brand 색에 hover / active 변형을 만들지 않는다.
4. 학습 도메인에 warning을 도입하지 않는다. 평가는 정답 / 오답 두 갈래다.
5. 알파 톤을 임의로 만들지 않는다.
6. 이모지를 어디에도 사용하지 않는다.
7. 정의되지 않은 font-weight(300, 600, 900 등)를 일반 UI에 사용하지 않는다.

### NE Self-check Rules

LLM과 사람 작업자가 시스템을 수정할 때 반드시 점검하는 NE 고유 결정이다.

1. NE BI red 기반 primary
   - brand는 BI/CI, semantic primary는 UI 강조 역할이다.
   - 둘이 같은 hex라도 의미가 다르다.
2. Assessment layer 분리
   - status와 assessment/result는 색이 같아도 의미가 다르면 token을 분리한다.
3. Neutral button hierarchy
   - NE red가 강하므로 반복되는 일반 핵심 행동은 neutral 중심으로 처리한다.
   - ne-alert action button은 모든 variant에서 neutral action으로 통일한다.
4. Form focus separation
   - form focus는 red가 아니라 neutral gray focus ring을 사용한다.
5. Badge meaning system
   - badge는 category / level / status / result / count 의미를 구분한다.
6. Brand source separation
   - CI Basic Guideline은 브랜드 원천 자료다.
   - CI 색상값과 폰트는 제품 UI token으로 자동 변환하지 않는다.
   - `docs/reference/BRAND_SOURCE.md`의 hex는 source documentation이며 UI token addition이 아니다.
7. Display font separation
   - Pretendard는 시스템 default 폰트다.
   - Paperlogy는 특수 선택용(display) 폰트다.
   - 컴포넌트 내부 텍스트와 일반 UI는 default만 사용한다.
   - Paperlogy는 의도적으로 호출했을 때만 적용된다.
   - 컴포넌트의 alert/dialog/button/form/table title에 자동 적용하지 않는다.
   - 비표준 weight(100/200/300/600/900)는 디스플레이/특수 결정 시에만 사용한다.

## 15. Semantic Policies

v0.8.0에서 정리된 semantic 정합화 prose다. 신규 token은 추가하지 않으며, 기존 token의 사용 의도와 경계만 prose로 명시한다.

### ne-neutral vs ne-mono

`ne-neutral`과 `ne-mono`는 둘 다 무관 강조에 쓰이지만 톤 계열과 역할이 다르다. v0.9.0에서 기존 `ne-mute` 명칭은 폐기되고 `ne-mono`로 정합됐다.

**`ne-neutral`** — warm neutral 기반 중립 강조 (page/surface/text hierarchy 계열)
- warm neutral primitive(`neutral-800` / `neutral-900`) 기반
- text heading 및 system-level neutral hierarchy
- alert action button background
- warm 계열 page/surface와 자연스럽게 정합

**`ne-mono`** — NE CI 단색 그라데이션 기반, BI 무관 무채색 액션 그레이
- NE CI Basic Guideline page 13 단색 그라데이션 추출 (`mono-20/50/500/900`)
- canonical neutral button family (`ne-btn-neutral`, `ne-btn-neutral-subtle`, `ne-btn-neutral-text`)
- inverse button surface
- progress_feedback stalled bar fill (정체 표현)
- BI 무관 무채색 액션 계열

**핵심 문장**
- `ne-mono`는 disabled가 아니다.
- `ne-mono`는 NE CI 단색 그라데이션 기반의 BI 무관 무채색 액션 그레이다.
- `ne-mono`는 warm neutral과 다르다. warm neutral은 page/surface/text hierarchy에 쓰이고, mono는 액션·인터랙티브 무채색에 쓰인다.
- disabled는 "사용 불가" 상태고, mono는 "BI 무관 무채색 강조"다.
- 둘은 다른 token이며 서로 대체하지 않는다.

### mono_grayscale_policy

NE CI Basic Guideline page 13의 단색 그라데이션을 디지털 UI에 흡수할 때 따르는 정책이다. `docs/reference/BRAND_SOURCE.md`는 수정하지 않고 본 prose에 적용 trace만 기록한다.

- **source**: NE CI Basic Guideline page 13 single-color grayscale usage
- **role**: BI 무관 무채색 액션 그레이
- **token_family**: `mono` (primitive) → `ne-mono-*` (semantic) → `.ne-btn-neutral-*` (component)
- **derivation**
  - `mono-20`  = `#E4E4E3` — PDF page 13 grayscale box 1 extract
  - `mono-50`  = `#CBCCCB` — PDF page 13 grayscale box 2 extract
  - `mono-500` = `#4D4E4D` — PDF page 13 grayscale box 8 extract
  - `mono-900` = `#1D1717` — NE digital system root는 NE Black `#1D1717`을 따른다. PDF page 13 box 10은 `#1A1919`로 추출되지만, `docs/reference/BRAND_SOURCE.md` NE Black root와의 정합을 우선해 `mono-900`은 `#1D1717`로 맞춘다. (`#1A1919`는 PDF extraction artifact로만 prose trace에 남긴다.)
- **rationale**
  - mono는 warm neutral과 다르다.
  - mono는 NE CI 단색 그라데이션에서 온 무채색 계열이다.
  - mono는 버튼 neutral family와 progress stalled bar에 사용된다.
  - mono는 "낮은 에너지"가 아니라 BI 무관 무채색 강조 계열이다.
- **must_not**
  - mono를 warm neutral surface와 통합하지 않는다.
  - mono를 disabled와 동일시하지 않는다.
  - mono를 Paperlogy / brand source font policy와 연결하지 않는다.

### source_root_vs_default_state_policy

v0.10.0에서 도입된 개념 분리다. source/root color와 component default state는 다른 개념이다.

**source_root_color**
- brand 또는 color family의 기준점이다.
- 예: NE red `#E83828` (BI source), NE black `#1D1717` (CI/neutral root).
- source/root color는 항상 component default state와 같을 필요가 없다.

**component_default_state**
- 실제 UI에서 component가 기본 상태로 렌더링될 때의 색이다.
- 사용 빈도, 면적, 위계, hover/active 여지에 따라 source/root보다 약할 수 있다.

**NE-specific examples**
- `primary`
  - source_root: `#E83828`
  - component_default: `#E83828` (`ne-primary`)
  - rationale: vivid brand red는 primary default로 자연스럽다. source = default가 일치하는 케이스.
- `neutral / mono`
  - root_ceiling: `#1D1717` (`mono-900`, NE black)
  - component_default: `#4D4E4D` (`mono-500`, lower interaction color)
  - rationale:
    - `#1D1717`은 NE black root / ceiling이다.
    - `#1D1717`을 모든 neutral/mono default로 쓰면 UI가 과도하게 무거워진다.
    - neutral/mono는 default에서 시작해 hover/active에서 ceiling으로 깊어진다.

**must_not**
- source/root color를 component default state와 자동 동일시하지 않는다.
- `#1D1717`을 모든 dark action default로 자동 적용하지 않는다.

### state_ramp_policy

v0.10.0에서 추가된 interaction state ramp 정합 정책이다.

**기본 개념**
- default → hover → active로 상태가 깊어진다.
- 일반적으로 상태가 깊어질수록 더 명확한 강조를 가진다.
- 색상만으로 active를 분리할 수 없으면 pressed treatment(예: `transform: translateY(1px)`)로 구분한다.

**primary_state_ramp**
- default: `ne-primary` (`#E83828`)
- hover: `ne-primary-hover`
- active: `ne-primary-active`
- pattern: source-as-default + darker ramp
- rationale: NE BI red는 brand source이면서 primary default로 자연스럽다. hover/active는 더 깊은 red variant로 구분한다.

**neutral_button_state_ramp**
- default: `ne-mono` (`mono-500` / `#4D4E4D`)
- hover: `ne-mono-hover` (`mono-900` / `#1D1717`)
- active: `ne-mono-active` (`mono-900` / `#1D1717`) + pressed treatment
- pattern: interaction-default → mono ceiling
- rationale:
  - neutral button은 가장 자주 쓰이는 action family다.
  - default는 `#1D1717`보다 낮은 `mono-500`을 사용한다.
  - hover/active는 `mono-900` `#1D1717` ceiling으로 깊어진다.
  - hover와 active가 같은 ceiling color이므로 active는 `transform: translateY(1px)` pressed treatment로 보완한다.

**mono_state_ramp**
- default: `mono-500`
- hover: `mono-900`
- active: `mono-900` + pressed treatment
- rationale:
  - 신규 950 weight 없이 state differentiation을 만든다.
  - `#1D1717` 이상으로 어둡게 가지 않는다.

**warm_neutral_policy**
- role: NE warm surface / text emphasis
- must_not:
  - mono action color와 혼용하지 않는다.
  - neutral button family의 token source로 자동 사용하지 않는다.

**must_not (state ramp 공통)**
- 신규 shade, 950 weight, raw hex 추가 금지.
- hover/active 차별을 신규 token으로 해결하지 않는다.
- pressed treatment에 신규 rgba 추가 금지.

### local_action_boundary_policy

v0.10.0에서 추가된 component-local action 경계 prose다. button-like action이 reusable button family인지, component-local action인지 구분한다.

**reusable button family**
- selector: `.ne-btn-*` (`.ne-btn-neutral`, `.ne-btn-neutral-subtle`, `.ne-btn-neutral-text`, `.ne-btn-primary*`, `.ne-btn-inverse`)
- token: `mono` 계열 (`--ne-mono`, `--ne-on-mono`) 또는 `--ne-primary*`
- state ramp: state_ramp_policy 적용 대상
- 위치: ButtonsSection, Header / Footer / Hero CTA, Dialog trigger 등 일반 button 위치

**component-local action**
- selector: `.ne-alert-demo-action`, `.ne-dialog-action-demo.primary`, `.ne-dialog-action-demo.secondary`
- token: 현재 `--ne-neutral` / `--ne-on-neutral` (warm neutral)
- 사용 의도: ne-alert v0.5.1 visual contract와 ne-dialog static preview / runtime layout 정합 유지
- v0.10에서 reusable button family로 정합하지 않는 이유:
  - ne-alert는 v0.6.1에서 v0.5.1 declaration과 token/number 단위로 정확히 환원된 visual contract가 박혀 있다.
  - dialog action은 v0.7 static preview / runtime modal layout과 함께 정합돼 있다.
  - mono로 일괄 치환하면 alert/dialog의 warm tone 정합이 깨진다.
- v0.10 결정: 변경 보류, prose로 boundary 명시만 한다.
- future review:
  - alert/dialog action을 mono ramp로 정합할지 또는 warm neutral 유지할지 v0.11 이후 결정.
  - 결정 전까지 component-local action은 현재 `--ne-neutral` 유지.

**must_not**
- component-local action을 v0.10에서 `.ne-btn-neutral` 계열로 일괄 치환하지 않는다.
- alert/dialog visual contract를 visual regression이 큰 방향으로 수정하지 않는다.
- component-local action에 reusable button state ramp의 pressed treatment를 자동 적용하지 않는다.

### button_hierarchy_policy

v0.9.0에서 button family의 canonical name은 neutral이다. 기존 mute family 명칭은 폐기된다. v0.10.0에서 source/root vs default state 개념과 정합되도록 보강했다.

**default_action**
- canonical_family: `neutral`
- role: 빈도 높은 일반 액션
- usage: 저장 · 다음 · 확인 · 닫기 · 반복 노출되는 일반 CTA
- token_family: `mono` (primitive) → `ne-mono-*` (semantic) → `.ne-btn-neutral-*` (component)
- rationale: NE red의 과도한 반복 사용을 피하고 안정적인 UI 위계를 만든다.

**brand_primary**
- canonical_family: `primary`
- role: 브랜드 강조 / 특별히 강조해야 하는 단일 주요 행동
- usage: 메인 CTA · 학습 시작 · 중요한 제출
- must_not:
  - 일반 CTA의 기본값으로 사용하지 않는다.
  - 목록 / 테이블 / 폼 안에서 반복 버튼으로 사용하지 않는다.
  - 한 화면에 다수 반복하지 않는다.

**legacy_naming**
- deprecated_button_family_name: `mute`
- canonical_button_family: `neutral`
- rationale:
  - mute는 "낮은 에너지"라는 오해를 만든다.
  - v0.9.0 이후 버튼 family는 neutral로 부른다.
  - 색상 계열(token family)은 `mono`, 컴포넌트 역할(component family)은 `neutral`로 분리한다.

**v0.10.0 supplement — source/default state recheck**
- neutral button = default / frequent action 정합 유지.
- primary red = limited brand emphasis 정합 유지.
- neutral button은 `mono` family를 사용하며 default state는 `mono-500`이다 (`#1D1717` 아님).
- `#1D1717`은 NE black root / ceiling이며 모든 dark action default로 자동 적용하지 않는다.
- repeated CTA는 neutral을 우선한다.
- primary가 negative red 또는 assessment red와 같은 화면에 등장하면 `red_tone_coexistence_policy`의 red density review를 적용한다.
- must_not:
  - primary를 general default action으로 되돌리지 않는다.
  - neutral button을 "brand-neutral"로 잘못 설명하지 않는다.
  - mono default를 `#1D1717`로 자동 변경하지 않는다.

### status vs assessment

`ne-status-*`와 `ne-assessment-*`는 색이 유사해도 의미가 다르다.

**`ne-status-*`** — 시스템 / 작업 / 컨텐츠의 진행 상태
- 예: 진행, 완료, 주의, 오류, 저장 실패, 로딩 실패
- table / data-list status badge
- alert variant container
- form validation
- token family: `ne-status-success-*`, `ne-status-warning-*`, `ne-status-danger-*`

**`ne-assessment-*`** — 학습 평가 결과
- 예: 정답, 오답, 통과, 미통과, 채점 결과
- assessment result badge
- 정답 / 오답 보기 highlight
- token family: `ne-assessment-correct-*`, `ne-assessment-incorrect-*`

**규칙**
- status와 assessment는 색이 유사해도 의미가 다르면 token을 분리한다.
- 정답 / 오답 UI에는 `ne-status-*`를 사용하지 않는다.
- 시스템 상태에는 `ne-assessment-*`를 사용하지 않는다.
- status badge와 result badge를 혼용하지 않는다.

### negative_color_policy

negative red는 유지하되 사용처를 제한한다.

**use_for**
- form validation error text
- inline error label
- destructive icon
- danger icon
- small status badge
- error border
- stalled progress caption / icon
- assessment incorrect label / icon / border
- light negative feedback surface

**do_not_use_for**
- progress bar fill (any width)
- stalled progress fill
- hero / banner background
- large card background (> 200px × 100px)
- repeated list row background
- chart large fill
- brand / marketing emphasis
- primary CTA background
- active progress fill

**conditional**
- danger alert container background: light `ne-status-danger-bg`라면 가능
- small badge background: 가능
- assessment incorrect background: light `ne-assessment-incorrect-bg`라면 가능
- `negative-700` / `negative-900` / `ne-status-danger-strong`: text / icon / border / small signal 중심, large fill 금지

**면적 × 톤 룰**
- light pink surface (`ne-status-danger-bg`, `ne-assessment-incorrect-bg`)는 면적 사용 가능성이 상대적으로 높다.
- 강한 red (`negative-700/900`, `ne-status-danger-strong`)는 text / icon / border / small signal 중심이다.
- 강한 red를 넓은 면적으로 반복 노출하지 않는다.

**must_not**
- brand red와 negative red를 같은 대형 시각 면적에서 경쟁시키지 않는다.
- NE BI red(`ne-primary`)를 danger / stalled fill로 사용하지 않는다.

### red_tone_coexistence_policy

brand red와 negative red는 같은 화면에 공존할 수 있으나 경쟁시키지 않는다.

**brand red / `ne-primary`**
- vivid red orange (`accent-500` / `brand-primary` 동일 hex)
- brand energy / 열정 / 활력 / 몰입
- active progress (학습이 이어지고 있음)
- learning in progress
- selected forward movement
- primary emphasis in limited contexts

**negative red**
- error / danger / destructive / incorrect signal
- wine / coral / light pink family (`negative-*`, `ne-status-danger-*`, `ne-assessment-incorrect-*`)
- small signal 또는 light feedback surface

**coexistence**
- 같은 화면에 brand red와 negative red가 동시에 있을 수 있다.
- 단 같은 시각 영역에서 둘 다 large fill로 경쟁하면 안 된다.
- brand red는 긍정적 진행 / 활성 신호로 제한한다.
- negative red는 문제 / 오답 / 오류 신호로 제한한다.
- progress에서는 active = brand red, stalled = mono bar + danger caption / icon이다.

**review_required**
- brand red CTA + danger red label/icon + active progress가 같은 화면에 동시에 있으면 red density를 검토한다.
- red가 3개 이상 주요 시각 요소로 보이면 neutral 대체를 우선 검토한다.

### assessment_result_policy

학습 평가 UI의 selected / correct / incorrect / feedback flow를 정리한 prose다.

**selected_before_submit** — 선택됨 / 아직 채점 전
- preferred: `ne-neutral` border (2~3px) + checkmark icon
- acceptable: `ne-primary` border (brand red density가 낮은 화면 한정)
- must_not:
  - 정답 / 오답 색을 제출 전 표시하지 않는다.
  - `ne-assessment-correct-*` / `ne-assessment-incorrect-*` token을 제출 전 사용하지 않는다.
  - `ne-status-success-*` / `ne-status-danger-*` token을 제출 전 사용하지 않는다.
- rationale:
  - 제출 전에는 결과가 확정되지 않았으므로 correct / incorrect 색을 쓰지 않는다.
  - brand red 사용 빈도를 줄이기 위해 neutral selected cue를 우선한다.

**correct** — 정답 / 통과
- use_for: 정답 보기 background · 정답 label · check icon · result badge
- tokens:
  - background: `ne-assessment-correct-bg`
  - text:       `ne-assessment-correct`
  - icon:       `ne-assessment-correct`
  - border:     `ne-assessment-correct-border`
- must_not: `ne-status-success-*`를 assessment 결과에 사용하지 않는다.

**incorrect** — 오답 / 재확인 필요
- use_for: 학생이 선택한 오답 보기 background · 오답 label · X icon · small inline result text · incorrect feedback surface
- tokens:
  - background: `ne-assessment-incorrect-bg`
  - text:       `ne-assessment-incorrect`
  - icon:       `ne-assessment-incorrect`
  - border:     `ne-assessment-incorrect-border`
- do_not_use_for:
  - 전체 문제 화면의 large red background
  - progress bar fill
  - primary CTA
  - brand emphasis
  - 큰 면적의 incorrect-700/900 fill
- must_not: `ne-status-danger-*`를 assessment 결과에 사용하지 않는다.

**feedback_flow**
- incorrect_answer_review pattern: 학생 선택 오답 = incorrect 표시, 실제 정답 = correct 표시. 학습 비교 피드백을 위해 학생 선택과 실제 정답을 동시에 보여준다.
- cta_after_submit:
  - retry: `ne-neutral`
  - explanation: `ne-neutral` 또는 subtle
  - next_question: `ne-primary` 또는 `ne-neutral`
- must_not:
  - 오답 화면의 CTA를 모두 danger / red로 만들지 않는다.
  - 학습 동기를 해치는 red overload를 만들지 않는다.

## 16. Known Gaps

- full component contract
- full a11y spec
- validator / automation
- tokenCounts official definition
- advanced search/filter/sort
- loading type별 token_refs
- spinner / skeleton visual policy
- icon-only button visual policy
- ne-icon 정식 컴포넌트
- icon size token 정식화
- icon semantic mapping table (status / assessment / progress / action 축별 default icon 매핑, owner decision)
- external link icon policy
- visited link state
- underline policy 정식화
- async validation timing
- toast exact duration / queue / mobile placement
- dialog focus trap / close policy
- tabs ARIA / keyboard implementation
- table density / sorting / filtering
- command palette keyboard shortcut
- empty state illustration policy
- dialog/tabs/accordion/table ready 승격
- Quick Reference / AI agent Prompt
- 글로벌 토큰 검색 (모든 Layer · Component 토큰 인덱싱)
- 추가 Form 컴포넌트 (combobox · slider · date picker 등 — PoC 신호로 합류)
- 학습 특수 폼 (assessment-form Layer — 학습 PoC 시작 시점)
- Print / CMYK (별도 PRINT.md)
- 다크 모드 (보류)
- 차트 팔레트 (보류)
- Brand 서브 컬러 (디지털 UI 폐기)
- #A72929 (이전 negative 색 — 위계 일관성 위해 #7A1A1A로 조정. 폐기)
- 추가 알파 톤 (필요 시점)
- Form 상태 우선순위 매트릭스 (예: disabled + error 동시 케이스)

## 17. Versioning

- v0.1 — colors, spacing, rounded, elevation
- v0.2 — typography, button (4종), form (7컴포넌트 + 보조)
- v0.2.1 — 톤 A 일괄 적용, 검색 기능 v0.3 이관, glossary 4계층 카논 도입
- v0.2.2 — Badges (11종) + Avatars (4크기), Semantic +3 (ne-surface-emphasis-soft · ne-text-on-dark · ne-text-on-dark-soft)
- v0.2.3 — Primitive Accent 4색 갱신 (Coral → Brand 직접 기반).
  accent-500이 brand-primary와 동일 hex(#E83828)가 됨. brand와 accent는
  별개 토큰으로 유지(R0). focus-ring rgba 동기화. ne-button-inverse desc
  색명 제거 일반화.
- v0.2.4 — Forms 전용 focus ring 토큰 ne-form-input-focus-ring
  신설. 회색 glow로 ne-primary-focus-ring과 시각 분리. ne-form-input/textarea의
  focus 상태가 ne-text-tertiary border + 새 ring을 사용. 다른 컴포넌트의
  focus는 ne-primary-focus-ring 그대로 사용.
- v0.3.0 — 버튼 위계 재배치(primary → neutral → subtle → text +
  컨텍스트 변형 inverse). ne-button-neutral 신규 (브랜드 무관 중립 강조).
  ne-button-secondary를 ne-button-subtle로 리네임. Semantic Layer에 ne-neutral
  시리즈 5개 추가. 신규 hex 0개, Primitive Neutral 차용.
- v0.3.1 — 버튼 사이즈 5단계 modifier 도입(sm 36 / md 44 기본
  / lg 52 / xl 60 / 2xl 68). Carbon 단계 수·명명 참조, px값은 NE 자체.
  medium 기본 유지(input height와 정합). text 변형은 사이즈 modifier
  적용 안 함. 신규 hex 0개.
- v0.3.2 — ne-button-neutral의 disabled 처리를 시스템 패턴 B
  (subtle/inverse/text와 동일)로 통일. 배경 ne-surface-section + 글자
  ne-text-disabled. ne-neutral-disabled 토큰 폐기 (사용처 0). 신규 hex 0개.
- v0.3.3 — ne-button-neutral의 focus ring을 ne-primary-focus-ring
  (빨강 glow)에서 ne-neutral-focus-ring(회색 glow)으로 변경. 검정 표면 위
  시각 일관성 확보. ne-neutral-focus-ring 토큰 신설(ne-form-input-focus-ring과
  동일 hex이나 별개 토큰으로 유지). 신규 hex 0개.
- v0.4 — inventory patch (origin). layer_contract, inventory_status,
  demo_site_role, state_families, patterns, component_candidates,
  pattern_candidates 추가. ne-toast와 ne-card를 draft로 등록. 기존
  Button/Form/Badge/Avatar 최소 usage 보강. 신규 hex 0개.
- **v0.4.1 (2026-05-11) — Minimum content fill · 시연 사이트의 최소 본문 보강**
  - v0.4 inventory 구조 안에서 ready/draft 항목의 최소 사용 규칙을 보강했다.
  - Button loading은 `state_families.loading` 참조로 정리하고, loading 규칙 중복 작성을 피했다.
  - Form a11y는 placeholder, error text, validation priority, required state의 최소 note만 추가했다.
  - Toast placement는 현재 시연 위치를 v0.4.1 잠정 기준으로 인정하고, mobile/queue/duration은 deferred로 유지했다.
  - Search form과 command palette의 boundary를 명시했다.
  - table / data_list / card_grid의 boundary를 candidate 수준에서 명시했다.
  - full component contract, full a11y spec, validator, candidate 정식화는 보류했다.
- **v0.4.2 (2026-05-11) — PoC blocking states and reference lens · PoC 차단 상태와 외부 시스템 비교 렌즈 정리**
  - Loading indicator를 `state_families.loading` 안의 최소 draft로 추가했다.
  - `empty_state.recoverable-error`에 retry action 원칙을 보강했다.
  - `patterns.page_shell`을 추가해 header / optional sidebar / main / optional footer 구조를 최소 draft로 정리했다.
  - `progress_feedback`과 `access_state`를 pattern candidate로 추가했다.
  - Toast와 alert, table / data_list / card_grid의 boundary를 확인하고 필요한 경우 보강했다.
  - v0.5의 실제 컴포넌트 추가를 위해 DESIGN_REFERENCES.md에 Component Reference Lens 표를 추가했다.
- **v0.5 (2026-05-12) — Component Pack 1 draft · Alert·Dialog·Tabs·Accordion 1차 컴포넌트 묶음 초안**
  - `ne-alert`, `ne-dialog`, `ne-tabs`, `ne-accordion`을 candidate에서 draft component로 승격했다.
  - 각 draft component에 purpose, variants, states, anatomy, usage, behavior, a11y, deferred, must_not 최소 계약을 추가했다.
  - ComponentPackSection을 추가해 4개 컴포넌트와 loading indicator를 한 섹션에서 최소 시각화했다.
  - Dialog, Tabs, Accordion demo는 static demo로 유지하고 실제 interaction은 deferred로 남겼다.
  - 신규 hex와 신규 token은 추가하지 않았다.
  - v0.6 이후 실제 사용 결과를 보고 ready 승격 여부를 검토한다.
- **v0.5.1 (2026-05-12) — Navigation grouping and icon/link foundation · 사이드 내비 그룹화와 아이콘·링크 토대 정리**
  - 서비스 UI section nav를 Foundation / Components / Patterns / Guidance / Roadmap 그룹으로 압축했다.
  - `ne-link` draft contract를 추가했다.
  - `icon_system` draft usage rule을 추가하고 Lucide를 단일 icon library로 채택했다.
  - Header와 Component Pack 1 시연에 Lucide icon을 소량 적용했다.
  - 신규 hex와 신규 token은 추가하지 않았다.
- **v0.5.2 (2026-05-12) — LNB navigation and icon registry · 좌측 내비 정식화와 아이콘 인벤토리 정합**
  - 서비스 UI 탐색을 상단 section nav에서 좌측 LNB 구조로 전환했다.
  - Foundation / Components / Patterns / Candidates / Guidance / Roadmap 그룹으로 문서 탐색을 재구성했다.
  - Icon system 화면 섹션을 추가하고 Lucide approved subset을 노출했다.
  - DESIGN.md의 icon_system draft에 approved icon registry 개념을 보강했다.
  - 신규 hex와 신규 token은 추가하지 않았다.
- **v0.5.3 (2026-05-12) — Icon Registry expansion · 아이콘 인벤토리 확장**
  - Lucide approved icon subset을 NE/LMS 사용 맥락에 맞게 확장했다.
  - Education / Learning, Document / File / Print, User / Class / Admin, Mobile / Device, Theme / Mode, Emotion / Reaction 카테고리를 보강했다.
  - 펼침/닫힘, 이전/다음, 추가/삭제, 보임/숨김처럼 의미 쌍이 필요한 아이콘은 pair 기준으로 관리하도록 정리했다.
  - Lucide 우선 사용과 NE custom icon 제작/등록 정책을 icon_system에 추가했다.
  - Component Pack 1 Accordion static demo의 open/closed icon pair 표현을 보정했다.
  - 신규 hex와 신규 token은 추가하지 않았다.
- **v0.6.0 (2026-05-13) — Table-first Data Components + Runtime Interaction · 테이블 중심 데이터 컴포넌트와 런타임 인터랙션 도입**
  - `Component Pack 1` 임시 명칭을 `Feedback & Interaction` 구조로 정리했다.
  - `ne-table`을 draft로 승격하고 NE Times Class flavored table demo를 추가했다.
  - `ne-data-list`, `ne-divider`, `metric_display`, `progress_feedback`, `empty_state / recoverable_error` visual을 추가하거나 보강했다.
  - Alert / Dialog / Tabs / Accordion / Loading을 minimum interactive demo로 전환했다.
  - SideNav에 DATA 그룹을 추가하고 실제 화면 block 기준 anchor를 정리했다.
  - 신규 hex와 신규 token은 추가하지 않았다.
- **v0.6.1 (2026-05-14) — Component Visual Contracts · Layer 3 컴포넌트 시각 계약 도입**
  - Layer 3 `component_contracts` 섹션을 신규 추가하고 P0 컴포넌트의 visual composition contract를 정리했다.
  - `ne-alert` default visual을 v0.5.1 alert declaration과 token/number 단위로 일치하도록 환원했다 (action button background `ne-neutral`, action width 100%, title font-size 18px, container `box-shadow: elev-modal`).
  - `ne-button`, `ne-card`, `ne-table`은 현재 v0.6.0 visual을 유지한 채 component_contracts로 문서화만 했다.
  - component_contracts의 component alias는 tokenCounts에 포함하지 않도록 명시했다.
  - v0.6.0의 alert / dialog / tabs / accordion runtime interaction은 유지했다.
  - 신규 hex와 신규 token은 추가하지 않았다.
- **v0.6.2 (2026-05-15) — Brand Source + ne-alert Completion · 브랜드 원천 문서 분리와 알림 컴포넌트(dismiss / variant) 마감**
  - `BRAND_SOURCE.md`를 추가해 NE CI Basic Guideline의 채택/보류/거부 기준을 정리했다.
  - `AI_HANDOFF.md`를 추가해 LLM 작업 시 브랜드 원천과 UI token을 자동 변환하지 않도록 명시했다.
  - `ne-alert` dismiss interaction을 실제 구현했다.
  - `ne-alert` variant 신호를 action button color에서 container background로 이동하고, action button은 neutral로 통일했다.
  - `component_contracts.ne-alert.variants`와 `behavior`를 업데이트했다.
  - positive/caution/negative alert background 위의 텍스트 대비를 WCAG AA 기준으로 검증했다.
  - 신규 UI hex와 신규 token은 추가하지 않았다.
- **v0.7.0 (2026-05-15) — Typography Extension + Demo Corrections · 타이포그래피 확장(Pretendard·Paperlogy)과 시연 보정**
  - `src/styles/fonts.css`를 추가하고 Pretendard / Paperlogy 9 weight `@font-face`를 분리했다.
  - Paperlogy family name을 `'Paperlogy'`로 통일하고 `Paperozi` naming을 사용하지 않도록 정리했다.
  - Pretendard를 system default, Paperlogy를 intentional display font로 분리했다.
  - `typography.embedding`과 `swap_policy`를 문서화했다.
  - NE Self-check Rule 7(Display font separation)을 추가했다.
  - Typography 섹션에 Paperlogy display sample을 추가했다.
  - `ne-dialog` 정적 미리보기 카드를 추가하고 기존 interaction을 유지했다.
  - `ne-loading` spinner와 `ne-tabs` active line의 시각 두께를 보정했다(2px → 3px).
  - Phase 0 token usage diagnosis를 수행했으며 cleanup은 별도 사이클로 미뤘다.
- **v0.7.1 (2026-05-16) — Demo Visual Refinement + Progress Semantics · 시연 시각 정합과 진행률 5 variant 의미 정리**
  - Typography demo 문구를 Pretendard 영역과 Paperlogy 영역의 역할에 맞게 통일했다.
  - `ne-table` / `ne-data-list` status badge 4단계(진행 · 완료 · 주의 · 오류) 시연을 보강했다.
  - table header background를 `ne-surface-card`로 보정해 body row와 시각 분리를 강화했다.
  - `progress_feedback` 5 variant(neutral · active · success · warning · stalled)를 draft contract로 정리했다.
  - NE BI red를 active progress 신호로 사용하고, stalled는 flat gray bar + danger caption/icon으로 분리했다.
  - progress variant threshold는 서비스 결정 영역으로 남기고, 디자인 시스템은 시각화만 제공하도록 명시했다.
  - `ne-status-*-strong` token은 `progress_feedback`에서 사용처를 확보해 cleanup 후보에서 제외했다.
  - `.data-list-item`에 `align-items: center`를 추가해 status badge 세로 stretch를 방지하는 1줄 미세 패치를 적용했다.
  - 신규 token과 raw hex는 추가하지 않았다.
- **v0.8.0 (2026-05-18) — Component Pack Completion + Semantic Refinement · 컴포넌트 묶음 마감과 시맨틱 정책 정합**
  - `ne-toast` 정적 미리보기 카드를 추가하고 기존 transient toast interaction(글로벌 `Toast` 컴포넌트)을 보존했다.
  - `ne-dialog` / `ne-tabs` / `ne-accordion` / `ne-data-list` / `metric_display`의 P1 draft component contracts를 일괄 신설했다.
  - `ne-neutral`과 `ne-mute`의 의미 차이를 prose로 정리했다 (mute는 disabled가 아니라 의도적 저강도 중립).
  - `progress_feedback` a11y minimum note(role="progressbar" / aria-valuemin·max·now)를 contract에 추가하고 ready 승격은 보류했다.
  - status와 assessment / result 의미 분리를 강화했다.
  - `negative_color_policy`를 추가해 negative red의 use_for / do_not_use_for / conditional / 면적×톤 룰을 정리했다.
  - `red_tone_coexistence_policy`를 추가해 brand red와 negative red 공존 기준 및 red density review rule을 정리했다.
  - `assessment_result_policy`를 추가해 selected_before_submit / correct / incorrect / feedback_flow를 정리했다.
  - v0.7~v0.7.1 stale prose를 정리했다.
  - 신규 token과 raw hex는 추가하지 않았다.
- **v0.9.0 (2026-05-19) — System Coherence Patch · NE CI 무채색(mono) 정합과 mute → neutral 명칭 정리 등 시스템 일관성 패치**
  - MUTE 계열을 MONO 계열로 rename하고 NE CI Basic Guideline page 13 grayscale 기반으로 정합했다.
  - `mute-0/20/50/500/900`을 `mono-0/20/50/500/900`으로 rename하고 hex를 정합했다 (`mono-20 #E4E4E3`, `mono-50 #CBCCCB`, `mono-500 #4D4E4D`).
  - `mono-900`은 NE Black root `#1D1717`로 맞춰 BRAND_SOURCE와 정합했다 (PDF box 10 extract `#1A1919`는 prose trace로만 보존).
  - `#000000`을 구현 영역에서 제거했다.
  - semantic `--ne-mute-*`를 `--ne-mono-*`로 rename했다 (legacy alias 미보존).
  - button family를 neutral로 canonical 정리하고 `.ne-btn-mute*` 계열을 `.ne-btn-neutral*` 계열로 rename했다.
  - button demo order를 neutral family 우선으로 정리했다.
  - `button_hierarchy_policy`와 `mono_grayscale_policy`를 추가하고 v0.8 "ne-mute = 낮은 에너지" prose를 v0.9 mono separation prose로 교체했다.
  - `progress_feedback` stalled bar fill을 `--ne-mono`로 rename했다 (v0.7.1 의도 flat gray 정체 표현 보존, caption/icon `--ne-status-danger-strong` 유지).
  - accordion open/close에 grid-template-rows / opacity 기반 smooth motion과 `prefers-reduced-motion` 대응을 추가했다 (icon policy ChevronDown ↔ ChevronUp 회귀 없음).
  - BRAND_SOURCE.md는 수정하지 않고 NE CI grayscale 적용 trace는 DESIGN.md mono_grayscale_policy에 기록했다.
  - 신규 weight 추가 없음, tokenCounts 수량 변경 없음.
- **v0.10.0 (2026-05-19) — Interaction State Ramp Policy + Internal Sharing Readiness · 인터랙션 상태 단계 정책과 내부 공유 준비**
  - source/root color와 component default state의 개념을 분리해 `source_root_vs_default_state_policy`로 문서화했다.
  - `state_ramp_policy`를 추가해 primary / neutral / mono의 default → hover → active ramp를 정합했다.
  - `#1D1717`을 NE black root / ceiling color로 정의하고, neutral / mono default state와 자동 동일시하지 않는 원칙을 명시했다.
  - neutral/mono hover와 active가 같은 ceiling color를 쓰는 케이스에 `transform: translateY(1px)` pressed treatment + `prefers-reduced-motion` 대응을 추가해 active affordance를 보완했다 (신규 token/hex 없음).
  - `local_action_boundary_policy`를 추가해 reusable `.ne-btn-*` family와 component-local `.ne-alert-demo-action` / `.ne-dialog-action-demo` action의 경계를 명시했다 (alert/dialog action은 v0.6.1 / v0.7 visual contract 보존을 위해 `--ne-neutral` 유지, future review 항목으로 기록).
  - `button_hierarchy_policy`에 v0.10.0 supplement(source/default state recheck)를 추가했다.
  - `INTERNAL_SHARING_MEMO.md`를 신설해 v0.10.0-alpha 내부 공유 가능 상태(alpha / not production ready / not external publish)를 명시했다.
  - 신규 token / weight / raw hex / rgba 추가 0건.
- **v0.10.1 (2026-05-19) — System Integrity + Alias Self-Containment · 시스템 무결성 정정과 alias 자기참조화**
  - Overview와 현재 범위를 v0.10.1-alpha 기준으로 정합화했다 (v0.4 inventory patch / 범위 (v0.4) / v0.4 (현재) 같은 현재-버전 stale prose 정정, v0.4 inventory map은 origin / history 문맥으로만 유지).
  - `component_contracts`의 명백한 undefined reference 5건을 정정했다 (`ne-card.title/body typography_ref: typography.scale.body → typography.scale.body-md`, `ne-card.meta color_ref: ne-text-secondary → ne-text-tertiary`, `ne-table.states.empty.ref: state_families.empty → patterns.empty_state`, `ne-table.states.error.ref: state_families.error → patterns.empty_state.recoverable_error`).
  - `Reference Taxonomy`를 추가해 strict object-path reference와 token id alias를 구분했다.
  - `Token Alias Reference`를 추가해 `component_contracts`에서 쓰는 valid token id alias(`space-*` / `rounded-*` / `fw-*` / `elev-*` / `ne-boundary` / `ne-text-*`)를 문서 내 self-contained 참조표로 등록했다 (tokenCounts 미포함, 신규 token 정의 아님).
  - `inventory_status_operational_rules`를 추가해 ready / draft / candidate / deferred에 may_use_in / requires / must_not을 정의하고 candidate를 reusable로 구현 금지, deferred는 stop and report 원칙을 명시했다.
  - `AI Agent Quick Rules` 15개를 Overview 직후에 추가해 바이브코딩 / AI coding agent의 1페이지 판단 기준을 제공했다 (Rule 15는 `#1D1717` 직접 언급 대신 NE black root로 표현).
  - `layer_boundary_policy`를 추가해 `patterns` Layer 2와 `component_contracts` Layer 3의 경계를 명시하고, `ne-table` / `ne-data-list` / `metric_display` / `progress_feedback` 이중 등장이 중복이 아닌 분리임을 못박았다 (`ne-divider`는 single-definition으로 유지, 분류 검토는 v0.10.2 후보).
  - `required_companion_files`를 추가해 `BRAND_SOURCE.md` / `AI_HANDOFF.md` / `INTERNAL_SHARING_MEMO.md` / `DESIGN_REFERENCES.md`를 file manifest로 명시하고 외부 파일 인라인 금지 원칙을 박았다 (v0.6.2 분리 결정 보존).
  - v0.10.2 후보(tokenCounts 정의 정합 / raw rgba derive 패턴 / ne-divider 분류 / patterns ↔ contracts 재배치 / ready 컴포넌트 a11y baseline audit / self-containment manifest 강화)를 미루었다.
  - `tokens.js` / `App.css` / `fonts.css` / `BRAND_SOURCE.md` / `AI_HANDOFF.md` / `DESIGN_REFERENCES.md` / `README.md` / `index.html` 미수정, 신규 token / weight / raw hex / rgba 0건, 시각 변경 0건.
- **v0.10.2 (2026-05-19) — Handoff Consolidation + Documentation Hardening · 인계 문서 일원화와 문서 정합성 강화**
  - `AI_HANDOFF.md`를 인계용 단일 entrypoint 문서로 재정리했다 (v0.7.0 baseline 표기 정정, status / how-to-use / required files / quick rules / brand basics / buttons-status-learning / known unfinished / workflow / baseline verification).
  - `DESIGN.md` File Manifest를 `Required for handoff: DESIGN.md + AI_HANDOFF.md` 2개 + `optional source / archive` (BRAND_SOURCE / INTERNAL_SHARING_MEMO / DESIGN_REFERENCES / baseline zip) 구조로 정정했다.
  - `tokenCounts policy` prose를 추가해 included / excluded / rules를 명시했다 (component_contracts / token_alias_reference / brand source records는 미포함).
  - `WCAG contrast matrix summary` prose를 추가했다 (documentation summary, not automated validator).
  - system-level `a11y_baseline` prose를 추가했다 (focus_visibility / hit_area / color_only / keyboard_minimum). 단 ready component a11y audit은 수행하지 않고 v0.11 후보로 보류, ready requires 완화 0건, ready 강등 0건.
  - `value_formatting_guide` prose를 추가해 object-path ref / token id alias / CSS variable / quoted values(hex/rgba/px) / labels formatting을 정합했다.
  - `brand_layer_usage_policy` prose를 추가해 `ne-brand-primary` / `ne-brand-secondary` 사용 경계를 명시했다 (BRAND_SOURCE.md provenance record 보존, product UI promotion에는 explicit semantic mapping 필요).
  - `Baseline Archive Verification` guide를 추가해 baseline zip은 optional archive이고 필수 인계 파일이 아님을 명시했다.
  - v0.10.3 / v0.11+ deferred 후보를 visual_or_token_impact / structure_impact / audit_impact 범주로 정리했다.
  - `tokens.js` / `App.css` / `fonts.css` / `BRAND_SOURCE.md` / `INTERNAL_SHARING_MEMO.md` / `DESIGN_REFERENCES.md` / `README.md` / `index.html` 미수정, 신규 token / weight / raw hex / rgba 0건, 시각 변경 0건.
- **v0.10.3 (2026-05-19) — Repository Hygiene + Documentation Coherence · 레포 루트 정리와 문서 경로 정합**
  - root에 흩어져 있던 참고 / 아카이브 MD 파일을 정리해 루트 진입점을 `DESIGN.md` / `AI_HANDOFF.md` / `README.md` 3개로 축소했다.
  - `BRAND_SOURCE.md`와 `DESIGN_REFERENCES.md`를 `docs/reference/` 하위로 이동해 brand 원천과 외부 reference trace를 reference 영역에 묶었다.
  - `INTERNAL_SHARING_MEMO.md`를 `docs/archive/` 하위로 이동하고 상단에 "Archived" / "v0.10.0 origin" / "current handoff baseline v0.10.3-alpha" status note만 추가했다 (본문 재작성 없음).
  - `README.md`의 `v0.4` stale 표기를 v0.10.3-alpha 기준으로 정정하고, primary handoff files / reference·archive files / status / development 4 섹션의 진입점 문서로 재구성했다 (정책 복제 없음).
  - `DESIGN.md`의 Overview / `## 1F` Required Handoff Files / `## 1K` Brand Layer Usage Policy / `## 1L` Baseline Archive Verification / Component Reference Lens / Self-check Rule 6 / `mono_grayscale_policy` 등 현재 reference prose를 새 `docs/` 경로로 정합화했다.
  - `AI_HANDOFF.md`의 optional source / archive 목록과 Baseline Archive Verification guide도 새 경로로 정정했다.
  - baseline zip 검증 명령(`unzip -l`)을 v0.10.3-alpha baseline 파일명과 새 docs 경로 기준으로 갱신했다.
  - 과거 changelog history의 당시 root 파일명(`BRAND_SOURCE.md` / `DESIGN_REFERENCES.md` / `INTERNAL_SHARING_MEMO.md`) trace는 보존했다 (당시 경로 일괄 치환 없음).
  - `tokens.js` / `App.css` / `fonts.css` / 이동된 reference·archive 본문 / `index.html` 미수정, 신규 token / weight / raw hex / rgba 0건, 시각 변경 0건.
- **v0.10.4 (2026-05-19) — YAML Parse Gate + Version Coherence Tail Fix · YAML 파싱 안전성과 버전 정합 마지막 보정**
  - a11y YAML-like list의 parse-risk 문장(`"여기", "클릭" 같은 모호한 단독 link text는 피한다.`)을 따옴표 없는 단순 문장으로 바꿔 YAML block parse-safety를 높였다.
  - `AI_HANDOFF.md` H1을 `v0.10.2-alpha`에서 `v0.10.4-alpha`로 정합화했다.
  - 현재 policy prose에 남아 있던 v0.10.2 고정형 표현을 "현재 alpha baseline" / "in a future patch cycle" 같은 시점 무관 표현으로 정리했다 (changelog history의 v0.10.2 trace는 보존).
  - alpha 상태와 충돌할 수 있는 "모든 신규 프로젝트가 그대로 차용 가능한" 표현을 "신규 PoC / 내부 alpha 프로젝트에서 공통 출발점으로 차용 가능한"으로 완화했다.
  - `Baseline Archive Verification` guide에 macOS metadata exclusion (`__MACOSX/*` / `*/.DS_Store` / `*/._*`) zip 생성 명령을 추가했다. baseline zip은 여전히 optional이다.
  - `tokens.js` / `App.css` / `fonts.css` / `docs/reference/*` / `docs/archive/*` / `index.html` / 컴포넌트 구조 미수정, 신규 token / weight / raw hex / rgba 0건, 시각 변경 0건.
- **v0.10.5 (2026-05-19) — Hardened Baseline Handoff Package · README package entry 도입과 baseline zip allowlist 패키징**
  - Required reading set을 `README.md` + `AI_HANDOFF.md` + `DESIGN.md` 3개로 정합화하고, package_entry / core_authority / optional_reference / historical_archive 4 카테고리로 file manifest를 재구성했다 (`## 1F`).
  - `README.md`를 package index / orientation entry로 정리하고 source of truth가 아님을 명시했다. Recommended reading order, Source of truth boundary, Baseline archive note 3 섹션을 추가했다.
  - `AI_HANDOFF.md` §2 How to Use에 "패키지를 처음 받으면 README first, 구현은 AI_HANDOFF → DESIGN" 순서를 명시하고, §3 Required Files를 `## 1F`와 동일한 카테고리 구조로 정합했다. H1과 status도 v0.10.5-alpha로 정합화했다.
  - `## 1L Baseline Archive Verification`을 broad `zip -r . .`에서 explicit allowlist 명령으로 교체했다. `README.md` / `AI_HANDOFF.md` / `DESIGN.md` / `package.json` / `package-lock.json` / `index.html` / `vite.config.js` / `public/` / `src/` / `docs/reference/` / `docs/archive/` / `docs/PATCH_REPORT_v0.10.5-alpha.md`만 포함하고 `.claude/` / `.git` / `node_modules` / `dist` / backup archives / prior zip / patch prompts는 명시적으로 제외한다. denylist 검증 명령과 content check 명령을 함께 박았다.
  - Hero copy("모든 신규 프로젝트가 그대로 차용 가능")를 internal alpha / 신규 PoC 톤으로 정합화하고, hero meta version badge를 v0.10.5로 갱신했다.
  - `docs/archive/INTERNAL_SHARING_MEMO.md` 헤더의 stale "Current handoff baseline: v0.10.3-alpha" 표기를 제거하고 historical archive only 표현으로 교체했다.
  - 신규 design token / component contract / overlay·glow token / Lucide registry 변경 0건. `tokens.js` / `App.css` / `fonts.css` / 컴포넌트 구조 / token taxonomy 미수정.
  - 다음 사이클(v0.10.6 / v0.11)로 남긴 항목: tokenCounts 정식 derive, color filter count 자동화, legacy `.btn-primary` / `.btn-on-dark` 제거, raw rgba overlay semantic token화, Lucide registry enforcement, DESIGN.md ↔ designMd.js 자동 sync script, `ne-link` / `ne-toast` Layer 3 contract 정식화, form preview native input 구조 개선.
- **v0.10.6 (2026-05-19) — Production Font Source Adoption · NE 공식 CDN(front.neungyule.com) 폰트 채택**
  - Pretendard / Paperlogy 폰트 source를 폰트눈누 공개 CDN(`cdn.jsdelivr.net/gh/projectnoonnu/...`) + orioncactus Pretendard variable CDN에서 NE 공식 CDN(`front.neungyule.com`)으로 production swap 완료했다.
  - `src/styles/fonts.css`의 18개 `@font-face` 블록(Pretendard 9 + Paperlogy 9)을 제거하고, 폰트 로딩은 `index.html`의 `<link rel="stylesheet">` 2개로 일원화했다. `fonts.css`는 `--font-primary` / `--font-display` css variable alias만 보존하는 thin alias layer로 축소됐다.
  - `index.html`의 orioncactus Pretendard variable 링크와 `cdn.jsdelivr.net` preconnect를 제거하고, NE 공식 CDN preconnect + Pretendard Variable + Paperlogy subset 3개 link로 교체했다. `index.html` `<title>`의 stale `v0.2.2` 표기도 v0.10.6-alpha로 정합화했다.
  - `typography.embedding`을 `poc / production` 이중 source 모델에서 `current_source` 단일 모델로 정합화했다. 기존 `swap_policy`는 `legacy_swap_history`로 이동해 historical trace로 보존했다.
  - NE 공식 CDN의 Pretendard Variable는 단일 woff2 variable font(weight axis 45-920)로 제공된다. `typography.embedding`에 `pretendard_variable_axis` 메모를 추가하고 `family_name_policy`에 `pretendard_variable_canonical` / `pretendard_fallback`을 명시했다.
  - `typography.embedding.must_not`에 외부 PoC CDN(noonnu / jsdelivr / orioncactus) 회귀 금지 / `fonts.css`에 `@font-face` 재추가 금지 조항을 추가했다.
  - `## 1L Baseline Archive Verification` allowlist의 zip filename을 `v0.10.6-alpha`로 갱신하고, patch report 참조를 단일 파일(`docs/PATCH_REPORT_v0.10.5-alpha.md`)에서 `docs/review` 디렉터리 전체로 확장해 사이클별 누적 보고서를 보존하도록 했다.
  - `docs/archive/INTERNAL_SHARING_MEMO.md` 본문의 v0.10.0-origin "Production font swap (`front.neungyule.com` source) 미완료. PoC는 폰트눈누 CDN 사용." 항목은 v0.10.6에서 완료 처리됐다 (archive는 historical only로 본문 미수정, trace는 본 changelog).
  - 신규 design token / component contract / Lucide registry 변경 0건. `tokens.js` / `App.css` / 컴포넌트 구조 / token taxonomy 미수정. 시각 변경은 폰트 source 교체에 따른 렌더링 차이뿐이며 token / weight / scale 변경 0건.
- **v0.11.0 (2026-05-19) — Structural Sustainability Patch · src/ 3-way 분리 + baseline 동봉 handoff + ESLint icon enforcement + Pre-implementation Checklist**
  - `src/`를 3-way로 분리했다: `src/baseline/` (canonical, PoC fork target) + `src/examples/` (renderer demo, zip 제외) + `src/_stubs/` (deferred 임시 구현, policy source 아님). 15개 `*Section.jsx`와 `SectionHead.jsx`를 `src/examples/sections/`로 이동했다.
  - handoff zip을 docs-only(5파일)에서 **executable full handoff package**로 확장했다: `README.md` + `AI_HANDOFF.md` + `DESIGN.md` + `package.json` + `package-lock.json` + `index.html` + `vite.config.js` + `public/` + `src/baseline/` + `src/_stubs/` + 생성된 `_READ_FIRST.txt` / `font.css`. `src/examples/` / `docs/review/` / `docs/fail_report/` / `node_modules/` / `dist/` / `.git/` / `.claude/` / `patch_prompt/` / 모든 `.zip` 파일은 staging copy 시점부터 제외했다 (self-include 차단).
  - `scripts/build-handoff-zip.mjs`를 추가해 zip을 temp/staging 기준으로 생성하고 `public/design-md_v0.11.0-alpha.zip`으로 출력하도록 했다. `npm run build:handoff-zip` script로 호출한다. broad `zip -r . .` 패턴은 사용하지 않는다.
  - `src/lib/downloadDesignMdPackage.js`를 갱신해 in-app download가 runtime JSZip 생성 대신 pre-built `public/design-md_v0.11.0-alpha.zip`을 다운로드하도록 했다.
  - `src/baseline/icons/index.js` re-export wrapper를 도입했다. DESIGN.md `icon_system.approved_icons` 156개만 export한다. wrapper 외 `lucide-react` 직접 import는 ESLint core `no-restricted-imports` rule로 차단된다 (`eslint.config.mjs` flat config). F-017 (37% approved 외 import 위반) 정량 증거에 대한 architectural barrier 처방이다.
  - icon migration: Header.jsx / ComponentPackSection.jsx / DataComponentsSection.jsx / IconSystemSection.jsx의 lucide direct import 4건을 모두 wrapper 경로로 변경했다. approved 외 6 icon은 다음과 같이 처리했다:
    - 자동 교체 2건 (semantic 보존): `Check → CircleCheck` (alert dismiss success) / `RotateCcw → RefreshCw` (reset 의미).
    - Stop & report 4건 (owner decision 필요): `History → Clock` (Header Patch Notes 버튼) / `ListChecks → ClipboardCheck` (assignment row) / `PauseCircle → Pause` (stalled progress) / `Table → SquareStack` (table demo header). 모두 import alias로 임시 차용 + 사용처 명시. examples zip 제외 영역이라 PoC에는 영향 없으나 owner decision 후보로 남긴다.
  - DESIGN.md spec 추가:
    - `colors.token_use_guards` 신설 — `ne-surface-base` / `ne-surface-section` / `ne-surface-card` / `ne-primary` / `caution-700` / `paperlogy` / `font_alias_policy`에 `use_for` / `must_not_use_for` 마이크로 가드. F-001 / F-018 / F-019 / F-003 직접 차단.
    - `spacing.container` (narrow 720 / reading 880 / default 1200 / wide 1440 / none) — F-004 차단.
    - `spacing.breakpoint` (sm 600 / md 900 / lg 1200) — F-013 inline `<style>` media query 차단용 minimum 토큰.
    - `z-index_layers` (sticky_header 50 / dropdown 800 / dialog_overlay 900 / toast 1000) — F-014 차단.
    - `patterns.section_rhythm` — F-005 / F-010 차단.
    - `## 1N Deferred in Baseline` 신설 — Dialog / Toast stub의 `stub_file` / `stub_decisions` / `review_at: v0.12.0-alpha` 명시. 함정 3 (deferred frozen) 3-Layer 가드 (디렉터리명 + `@deferred-stub` JSDoc + 본 spec) 중 Layer 3.
    - `## 1O Component Scope Policy` 신설 — baseline_responsibility vs poc_responsibility 경계. Bottleneck 4 (도메인 컴포넌트 폭발) 사전 차단. 도메인 카드는 PoC layer에서 composition.
    - `## 1P Structural Roadmap` 신설 — v0.12+ 후보를 시점이 아닌 trigger-based candidates로 명시. AI capability evolution (Bottleneck 5) 흡수. file split / read-only validator / stubs promotion / npm package / v1.0 release 각각 trigger 명시.
  - 신규 primitive/color token 0건. Structural layout spec 4건 추가: `spacing.container` / `spacing.breakpoint` / `z-index_layers` / `patterns.section_rhythm`. 도메인 카드 baseline 승격 0건. component_contracts ready 승격 0건. TypeScript 도입 0건. npm package화 0건. per-component versioning 도입 0건.
  - AI_HANDOFF.md 추가: `## 2A Pre-implementation Checklist` (작업 시작 전 답해야 하는 10 질문 — content width / body bg / icon import / component status / deferred 영역 / inline style / domain component 등) + `## 2B Resolution order` (DESIGN.md → AI_HANDOFF.md → src/baseline/ 우선순위 + baseline은 policy source 아님 명시) + `## 8` Recommended Workflow 끝에 "major structural patches should use independent second-review" 권장 1줄. v0.11.0-alpha 계획 evidence: 2-AI 4-round cross-review가 단일 검토 대비 약 16건의 blind spot을 잡았다.
  - `src/baseline/` cleanliness: raw `rgba(` 0건 / legacy `.btn-primary` 0건 / legacy `.btn-on-dark` 0건 / `--ff-base` 0건 / `--ff-display` 0건. baseline은 clean state로 유지하고, examples 격리는 허용한다 (zip 제외).
  - baseline 신규 파일: `src/baseline/styles/tokens.css` (primitive + semantic + spacing.container + spacing.breakpoint + z-index_layers + rounded + font alias canonical) / `src/baseline/styles/layout.css` (PageContainer variant + section rhythm + Stack/Cluster + minimum responsive collapse) / `src/baseline/styles/components.css` (body bg = ne-surface-base / ne-btn family / Card variants). wrapper 4개: `PageContainer.jsx` (spacing.container variant) / `SectionHeader.jsx` (patterns.section_rhythm) / `Card.jsx` (composition primitive, 도메인 카드 아님) / `Button.jsx` (.ne-btn family wrapper).
  - stub 신규 파일: `src/_stubs/Dialog.jsx` + `src/_stubs/Toast.jsx`. 양쪽 모두 `@deferred-stub` JSDoc + `Do not derive policy from this.` + `review_at: v0.12.0-alpha` 3-marker.
  - Tabs / Accordion은 stub scope에 넣지 않는다. examples 또는 deferred 유지.
  - 새 MD 파일 추가 0건. `PATCH_REPORT_v0.11.0-alpha.md`를 별도로 만들지 않는다. 실행 결과 기록은 본 changelog가 전부다.
  - Future workflow consideration: major spec patches benefited from 2-AI independent cross-review (v0.11.0 evidence: 4-round ping-pong caught approximately 16 blind spots including F-017 misdiagnosis, F-003 canonical decision, examples zip risk, public zip self-include, baseline CSS cleanup priority, token wording contradiction, AI capability evolution moving target). Consider formalizing in v0.12+ if cycle frequency permits.
  - 후속 사이클 신호: v0.11.1 validation PoC (v04와 다른 도메인의 새 PoC를 baseline fork로 시작해 20건 → 3-5건 reduction 측정) / v0.12+ trigger-based roadmap candidates (`## 1P`).
  - Owner decision 후보 (v0.11.1+ 검토): icon registry 추가 후보 4건 (History, ListChecks, PauseCircle, Table). 임시 차용으로 renderer demo는 build되나 spec compliance 회복은 owner decision 후 정식 처리.
  - **v0.11.0a hygiene patch (2026-05-20)**: handoff zip allowlist 확장 (src/ 전체 포함, src/examples/ 및 src/App.jsx / src/main.jsx는 FORBIDDEN_PATTERNS로 제외 유지). ROOT_FILES에 `eslint.config.mjs` 추가. 92K/27 entries → 183K/50 entries. PoC fork simulate vite build 통과 검증 (2026-05-20 smoke test, 1752 modules / 146KB JS / 501ms).
  - **lucide-react ^1.14.0 false alarm 정정**: v1.x는 standard 메인라인. v1.14.0이 실제 npm에 존재 + 정상 설치 + 156 icon 모두 export. 이 우려는 PoC AI 자기 검토 + Opus/GPT cross-review 5라운드를 거치며 propagate 됐으나, npm 5초 검증으로 false alarm 확정. baseline / wrapper 변경 0건.
  - **handoff zip 안 `_READ_FIRST.txt` wording 보강**: "이 zip은 building blocks 모음 — PoC가 자체 vite entry 작성 필요, npm run dev 즉시 작동하는 완성 앱이 아님" 4줄 추가. zip 첫 진입 사용자의 mental model 오류 차단 (v0.10.5 docs-only snapshot wording 잔재 제거). AI_HANDOFF.md `## 9` 끝에 동일 의미 "Baseline fork pattern" sub-section 추가 (2 단락).
  - **ne-table.states.hover 제거 (옵션 A spec correction)**: v05 PoC 1인칭 사용 피드백 — 클릭 불가 row에 ne-surface-section hover background 적용 시 misleading affordance + 행/열 비교 흐름 깨짐 발생. hover state 자체 제거. 진짜 clickable row 케이스는 v0.11.1+에서 interactive variant 정식 spec extension으로 처리. ne-table.must_not에 "non-clickable row에 hover background 변화 적용 금지" 1줄 추가.
  - **token_use_guards.ne-surface-section.must_not_use_for 보강 (일반 원칙)**: "non-clickable element의 hover background" 1줄 + 일반 원칙 comment 추가 ("같은 anti-pattern은 어느 surface 토큰에도 적용 — row/list-item hover에 surface 변화를 줄 거면 element가 명시적 clickable이어야 한다"). 다른 컴포넌트 (ne-data-list 등)에서 같은 misuse 발생 시 reference. ne-data-list spec 본문은 hover state 자체 미정의 — DESIGN.md spec correction 영역은 ne-table 1건뿐. PoC 측 자체 CSS의 hover 미정의 사용은 PoC layer 정리 영역.
- **v0.11.1 (2026-06-02) — Handoff Coherence Patch · §1L source-of-truth 정합 + AGENTS.md 진입 훅 + 3-pass 적용 프로토콜 + build 체이닝**
  - `## 1L Baseline Archive Verification`을 현재 builder 현실에 맞게 재작성했다. stale했던 "baseline zip = optional archive", broad `zip -r ... .` 생성 명령, `docs/review` 포함 지시를 제거하고, "handoff zip = canonical artifact / `npm run build:handoff-zip` builder only / allowlist·forbidden 목록 / public→dist 동기화"로 교체했다. source of truth(`DESIGN.md`)가 폐기된 패키징 정책을 말하던 오염을 제거 — AI agent가 §2B resolution order상 DESIGN.md를 우선 적용할 때 틀린 결론을 내던 구조적 리스크 차단.
  - `AGENTS.md`를 패키지 루트에 신설했다. Cursor / Claude Code 등이 자동 로드하는 agent-native 진입 훅이다. 정책을 복제하지 않고 read order + entry scenario + non-negotiable rules 포인터만 둔다(정책 원천은 `DESIGN.md`). `scripts/build-handoff-zip.mjs` ROOT_FILES allowlist와 생성 `_READ_FIRST.txt`, `README.md` package contents, `## 1L` content check에 등록했다.
  - `AI_HANDOFF.md`에 3-pass 적용 프로토콜을 임베드했다(별도 문서 추가 0건, drift 표면 최소화): `## 2C Scenario Entry`(A 신규/fork vs B 기존/audit-first 분리, B는 fork가 아니라 audit이 첫 수 + P0/P1/P2 분류) + `## 8A Self-validation Pass`(8축 검증 → 위반 P0/P1/P2 → 보완, 독립 컨텍스트 권장 — 공식 build-fail validator 부재 `## 7`에 대한 prompt 기반 stopgap) + `## 8B Vibe-coding Continuation`(3차+ 인간 주도 반복, 토큰/no-invent 불변식 계승, 신규 token/component/variant·구조 변경은 owner decision + DESIGN.md 환류).
  - `package.json`의 `build`를 `npm run build:handoff-zip && vite build`로 체이닝했다. build 시 최신 zip이 `public/`에 생성된 뒤 vite가 `dist/`로 복사 → stale dist zip 재발 방지(public/dist 자동 동기화). 기존 `public`(57파일/207K)과 `dist`(27파일/구버전) 불일치 해소.
  - `src/data/designMd.js`의 `## 1L`을 DESIGN.md와 동일 내용으로 동기화했다(서비스 우측 상단 Patch Notes / 본문은 designMd.js를 파싱하므로 동기화 필수). 기존 line 199 `"warm 톤"` 따옴표 drift는 designMd.js가 DESIGN.md를 백틱 escape한 병렬 사본이라는 구조적 원인의 증상 — 자동 sync script는 `## 1P` trigger-based 후속.
  - `spacing.responsive_intent` 문서 가이드 블록을 신설했다(`spacing.container` / `spacing.breakpoint` 바로 뒤). container variant가 viewport 매핑이 아니라 content-width cap임을 명시하고, desktop-first minimum fallback 모델 / page padding(24px·600px 이하 16px·none 0) / `.ne-collapse-md`·`.ne-collapse-sm` opt-in collapse 규칙 / baseline 보장 vs deferred(자동 grid·fluid type·table mobile fallback) 경계를 정리했다. `status: documentation_guidance` + `token_count_policy: no_new_token` 가드로 신규 token 오인을 차단(tokenCounts 미포함). `AI_HANDOFF.md §2A` Q1을 viewport-vs-content-type + collapse fallback 확인 절로 확장했다. CSS 거동 변경 0건 — 기존 layout.css 동작을 설명만 정합화.
  - 적용 결과 데이터 루프용 self-validation 리포트 도구를 추가했다. `docs/templates/NE_DESIGNMD_SELF_VALIDATION_TEMPLATE.md`(고정 스키마: Summary 판정 / Meta / Compliance / Drift 축별 P0·P1·P2 / Stop-and-report / Deferred)를 handoff zip에 동봉하고, agent가 §8A self-validation 후 PoC 루트 `docs/NE_DESIGNMD_SELF_VALIDATION.md`로 자동 생성하도록 `AI_HANDOFF.md §8A`(필수 출력물) · `AGENTS.md` · `README.md`에 배선했다. 회수된 리포트의 drift 개수(효과)와 Stop-and-report 목록(미충족 구멍)이 매 버전 개선 입력이며, `## 1P` validator trigger를 측정 가능하게 만드는 중간 단계다. 내부 배포 문서(`docs/INTERNAL_ROLLOUT*`, zip 제외)는 별도. 신규 token/component/시각 변경 0건.
  - responsive governance 보강(문서 레벨, CSS 동결). `AI_HANDOFF.md §2A`에 전달모델 결정 질문(Q2: desktop-only / 반응형 reflow / 모바일·데탑 분리)을 추가하고, `spacing.responsive_intent`에 governance("반응형이냐 분리냐는 PoC 아키텍처 결정, 단 어느 모델이든 single source — 모바일 전용 token/component set 분기 금지")를 명시했다. `## 1P`에 `v0.12_responsive_minimum`(trigger-based, model-agnostic, scope/governance/out_of_scope 구분)을 추가해 그동안 로드맵에 빠져 있던 반응형 항목을 측정 trigger와 함께 올렸다. 신규 token/component/시각 변경 0건.
  - 신규 design token / component contract / Lucide registry / 시각 변경 0건. 본 패치는 packaging coherence + agent entry + workflow 문서 레이어 한정. `tokens.css` / `App.css` / baseline 컴포넌트 구조 미수정. 버전을 정식 마이너 v0.11.1-alpha로 올렸다(`package.json` / version badge / handoff zip 파일명 / 문서 H1 정합). 신규 token / component / 시각 변경 0건은 유지.
- **v0.11.2 (2026-06-03) — Responsive Precondition Minimum · 첫 PoC 전 "안 깨지는 최소" 반응형 baseline**
  - responsive를 정식 system이 아니라 **precondition minimum**으로 보강했다. trigger 대기 영역이 아니라 첫 PoC 전 table-stakes로 처리 — 예측 가능한 responsive 구멍을 먼저 막아 첫 self-validation 리포트 신호(token·button·surface·icon)가 "responsive 임의결정"으로 오염되지 않게 한다.
  - `spacing.responsive_intent.mobile_defaults` 신설(safe default, full spec 아님): 다열=모바일 1열 fallback 기본 / table=overflow-x 스크롤 래퍼(억지 압축 금지) / type=heading nowrap·overflow 금지·줄바꿈 허용 / nav=PoC 책임(상단고정·드로어·탭 택1, baseline nav 미제공).
  - `layout_helpers` contract 신설 + `src/baseline/styles/layout.css`에 grid helper 추가: `.ne-grid--auto`(권장 기본, auto-fit minmax 본질적 반응형) / `.ne-grid--2`(≤600px 1열 collapse 내장) / `.ne-grid--3`(≤900px collapse 내장). 기존 `.ne-collapse-md/sm`은 custom grid escape hatch로 유지. grid "system"이 아니라 layout utility, 신규 token 0건(gap=space-lg 차용, tokenCounts 미포함). 12-col / `--4` 이상 / container query / fluid type는 v0.12+ trigger.
  - `AI_HANDOFF.md §8A`에 mobile smoke test 축(360/768/1280 — 가로스크롤 없음·1열 fallback·터치 44px·텍스트 overflow 없음·table fallback) 추가. self-validation template에 Responsive 섹션(delivery_model / collapse_applied / table_fallback / mobile_smoke_test / unresolved) 필수화.
  - 정식 responsive system(fluid type / table mobile component / 컴포넌트별 variant / 자동 grid framework / container query / visual regression)은 v0.12+ trigger로 유지. 신규 color/spacing/typography token 0건, 시각 변경은 grid helper 신규 클래스 한정. 버전 v0.11.2-alpha로 올림(package.json / version badge / zip 파일명 / 문서 H1 정합).
- **v0.11.3 (2026-06-04) — Stack-agnostic Consumption · non-React/static HTML 적용 경로 공식화**
  - design-md를 **stack-agnostic foundation**으로 명문화했다. React/Vite baseline은 유일 경로가 아니라 **reference adapter 중 하나**다. 재구축·신규 token/CSS/component 0건 — 적용 경로/프레이밍 문서 정합만.
  - 근거(검증): baseline CSS 3종(`tokens.css`/`layout.css`/`components.css`)은 순수 CSS(`:hover`/`:focus`/`:active` pseudo 포함, JS 불요)라 static HTML에서 `<link>` + `.ne-*` class로 그대로 작동한다. `Button.jsx` 등은 class를 붙이는 얇은 sugar wrapper다. React 결합은 (`.jsx` wrapper + ESLint `no-restricted-imports` + 프레이밍) 셋뿐이고 앞 둘은 HTML에서 class/§8A로 대체된다.
  - `AI_HANDOFF.md §2C`에 **Scenario C (non-React / static HTML)** 추가: DESIGN.md SoT 유지 / baseline CSS link·`.ne-*` class 직접 적용 / icon은 approved 156 목록 내 inline Lucide SVG(`stroke="currentColor"`)·CDN `data-lucide`, 임의 SVG는 stop-and-report / ESLint 대신 §8A + **PoC-authored 코드 한정 grep**(imported baseline CSS·vendor·packed artifact 제외 — token 정의 false positive 방지) / minified·bundled·escaped artifact는 무손실 언팩·렌더 동치 확인 후 audit.
  - `AGENTS.md`에 stack 분기(A·B React/Vite vs C non-React)와 "stack-agnostic foundation / React=reference adapter" headline 추가. `README.md`도 동일 명시.
  - self-validation template: `scenario`에 C 추가, Compliance를 n/a 분기(`eslint_no_restricted_imports`·`npm_run_build`는 React 전용, `non_react_manual_grep`·`static_render_smoke` 신설). `docs/INTERNAL_ROLLOUT.md` 경로 A/B/C 정합.
  - 첫 비-React(HTML) PoC 적용 직전에 "handoff가 React/Vite를 유일 경로로 전제"하던 mismatch를 잡은 사례 — self-validation 데이터 루프가 의도한 "적용환경 mismatch" 포착이 rollout 전에 작동. 신규 token/component/시각 변경 0건. 버전 v0.11.3-alpha로 올림.
- **v0.11.4 (2026-06-04) — Surface Context Policy · surface는 색이 아니라 역할+부모대비로 (visual 0)**
  - 실사용 PoC에서 드러난 surface 오용 3종(① 떠야 할 카드가 더 어두운 tint로 가라앉음 ② grouping band 자리에 flat white surface ③ hover가 surface→어두운 tint라 가라앉아 "hover 없는 게 나음")을 **한 원인**으로 묶었다: *배경 토큰을 색으로만 고르고 역할로 안 고름*. 이건 `ne-surface-card` 단일 문제가 아니라 surface role + interaction state 구분 부재 문제.
  - **anchor 확인:** `ne-card` contract는 이미 정답(`surface: ne-surface-base`, `border: ne-boundary`, `shadow: elev-card`). 틀린 건 주변 — `token_use_guards.ne-surface-card`가 "card/panel 배경에 써라"고 가르치고, `tokens.js` preview가 #EDE9DE를 'card'로 라벨. → 정답 contract에 나머지를 정렬.
  - `colors.surface_context_policy` 신설: roles(base=canvas+raised fill / section=soft grouping band / card=muted·inset·fallback) + relative_rule(section 위 카드=base, raised는 부모보다 어두운 tint 금지, 같은 색 구분은 border/elevation, 외부 토큰은 이름 아닌 **역할로 판별** 매핑) + hover_rule(비-interactive=hover 없음 / 큰 카드 hover surface→어두운 tint 금지 / interactive=border·elevation·affordance / 어두운 tint hover는 작은 selectable item에만).
  - `token_use_guards.ne-surface-card` 재작성: use_for=small muted/inset/fallback, must_not_use_for=card/panel 기본 배경·raised를 어두운 tint로.
  - `tokens.js` preview 라벨 `card → muted` (오해 재생산 차단, color 0).
  - `AI_HANDOFF §2A`에 surface-role 결정 질문 + `§8A`에 surface role/state 검증축(grouping flat / 카드 가라앉음 / hover는 clickable에만 / 카드 hover가 surface→bg-soft만은 아닌가) 추가. self-validation template·`INTERNAL_ROLLOUT §4`도 동일 축.
  - **visual 변경 0 · 신규 token 0 · 색값 변경 0 · baseline CSS 변경 0** — 문서/검증/preview 라벨 정합만. v0.12 후보로 분리: canonical rename(ne-surface-muted/inset) + ne-surface-card deprecated alias / baseline `.ne-card`에 elev-card 배선 + interactive hover 정식값 / 색값 조정. 버전 v0.11.4-alpha로 올림.
- **v0.11.5 (2026-06-05) — First-report feedback: retrofit §2A checkpoint + report rubric + baseline adapter conformance**
  - 첫 self-validation 리포트(NE Times Class retrofit, Scenario B) 회수 피드백을 한 패치로 반영. process · report-quality · baseline conformance.
  - **[process]** §2A를 "기존 PoC retrofit 전"까지 확장하고, §2C · `INTERNAL_ROLLOUT #2`에 **retrofit checkpoint**(scenario / delivery_model / surface_intent를 기존 화면 기준 식별·선언, *변경* 또는 brand·구현범위 영향 시만 blocking)를 명시 invoke. 신규 전용이던 §2A "선택 유도"가 retrofit에서도 작업/audit 전에 뜨게 함.
  - **[report-quality]** §8A에 overall_status **pass/partial/blocked rubric** + **inline-style 분류**(raw/off-token→P0/P1, retrofit tokenized 잔여→P2[개수+정리계획 필수], 신규 남발→P1+). template에 `precheck_shown` 필드(다음 리포트부터 "checkpoint가 작업 전에 떴는지" 회수).
  - **[baseline conformance]** §8 계약인데 어댑터 미구현이던 **`.ne-badge` family를 baseline `components.css`에 구현**(category-mono/color · level-1~3 · status-* · result-* · count). category-color용 **`--ne-surface-emphasis-soft`(= accent-300) baseline 배선**. `ne-badge-count` typography를 body-sm → **11px**로 정정(18px pill 충돌 해소). 신규 token/hex 0, §8 derive.
  - **[guard]** `## 1Q Baseline CSS Coverage` 정책 + `scripts/check-baseline-coverage.mjs`(live_contracts allowlist ↔ baseline CSS 양방향 대조; 전체 §8 regex는 draft/deferred/stub false positive로 금지). README/AI_HANDOFF에 live CSS 목록 명시.
  - **[lucide]** `package.json`의 `lucide-react`를 `^1.14.0` → `1.14.0` 핀. handoff에 "소비자는 1.14.0 exact 또는 compatible verified version 사용 — 버전 desync 시 누락 아이콘이 dev module-link에서 실패(build는 tree-shaking으로 통과)" 명시.
  - 첫 리포트 Stop-and-report 분류: conformance/배선(form CSS · elevation CSS · badge[완료] · avatar) / owner·brand decision(neutral-informational · image scrim/overlay · 4단계 level scale) / deferred 유지(toast queue·duration·mobile). → `## 1P` candidate로 추적.
  - **[docs follow-up]** owner-facing choice labels use **natural language + canonical value** — §2A 선택지(본문 폭/배경 구성/화면 대응 범위) · §2C retrofit checkpoint · `INTERNAL_ROLLOUT` 프롬프트·가이드의 사람 대상 문구를 자연어 라벨 먼저 + 괄호에 canonical value(예: "일부 구역만 연한 배경 (muted-band)")로 정리. 본문 폭은 `spacing.container` 최대폭 px(720/880/1200/1440/none)를 참고용으로 병기(직접 입력 금지). self-validation 리포트 필드는 canonical value만 기록(집계 유지). 버전·token·CSS 불변.
  - visual: badge CSS는 baseline 한정(service `App.css` 불변, zip 내 baseline에만 추가). 신규 color token 0. 버전 v0.11.5-alpha로 올림.

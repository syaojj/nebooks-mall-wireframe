# NE Books 자사몰 개편 · Front 와이어프레임

NE Books 개편_기능 정의서_v3.0_260618 + 정책정의서 v1.1 (Wireframe v0.5)을 기준으로 작성한 기획 검토용 Front 와이어프레임입니다.

## 버전 (별도 접근)

| 버전 | 설명 | 진입 |
|---|---|---|
| **기획 검토용 와이어프레임 v0.5** | 흑백/회색톤 기본 와이어프레임 (구조 검토용) | [`wireframe_v1.0/index.html`](wireframe_v1.0/index.html) |
| **디자인.md 적용 와이어프레임 v0.5** | NE Design.md v0.11.5-alpha 적용 retrofit | [`wireframe_v2.0/index.html`](wireframe_v2.0/index.html) |
| **Pencil 와이어프레임 v0.5** | Pencil → HTML export (자체 완결, 11화면) | [`wireframe_v4.0/index.html`](wireframe_v4.0/index.html) |
| **반응형 프로토타입 v0.5** | PC/Mobile 반응형 SPA 프로토타입 (검수 모드·로그인 상태 시뮬레이션) | [`wireframe_v5.0/index.html`](wireframe_v5.0/index.html) |

> 루트 [`index.html`](index.html)에서 네 버전을 카드로 선택해 들어갈 수 있습니다.

## 보는 방법
- **로컬**: 각 `index.html`을 브라우저로 직접 엽니다 (외부 의존성 없음).
- **GitHub Pages**(활성화 시): `/`, `/wireframe_v1.0/`, `/wireframe_v2.0/`, `/wireframe_v4.0/`, `/wireframe_v5.0/`  경로로 접근.

## 화면 (Front 12종)
메인 · 교재목록 · 교재상세 · 학습자료실 · 장바구니 · 주문/결제 · 주문완료 · 마이페이지 홈 · 주문내역 · 찜 · 포인트/쿠폰 · 1:1문의

## 구성
```
index.html                 # 버전 선택 랜딩
wireframe_v1.0/            # 기획 검토용 (index.html, style.css, script.js)
wireframe_v2.0/            # 디자인.md 적용 (index.html, app.css, script.js, styles/, docs/)
wireframe_v4.0/            # Pencil 와이어프레임 v0.5 (index.html — Pencil HTML export, 자체 완결 11화면)
wireframe_v5.0/            # 반응형 프로토타입 v0.5 (index.html — 자체 완결 SPA, PC/Mobile 반응형)
pencil/                    # Pencil 디자인 원본 (v0.1~v0.4.pen)
```

## 참고
- 본 산출물은 디자인 시안이 아닌 **기획 검토용 와이어프레임**입니다.
- 실제 결제연동·API·DB 저장은 포함하지 않습니다 (더미 인터랙션).
- 기능정의서 원본(.xlsx) 및 NE Design.md 원본 패키지는 내부 자료로 저장소에서 제외되어 있습니다(`.gitignore`).

# NE Design.md — AI-Native Token Foundation v0.11.5-alpha

This repository contains the NE AI-Native Token Foundation design system baseline for PoC / internal alpha use.

## Package type

- **Type:** Fork-ready AI handoff baseline package.
- **Not** a runnable demo app — there is no working `npm run dev` entry in the handoff zip (`src/App.jsx` / `src/main.jsx` are intentionally excluded).
- **Not** a production component library.
- **Not** an official `design.md` validator.
- **Stack-agnostic foundation:** the tokens (`tokens.css`), layout/component CSS (`layout.css`, `components.css`), the icon registry, and the `DESIGN.md` rules apply to any stack. The React/Vite baseline is **one reference adapter**, not the only path — non-React / static HTML consumes the same CSS + `.ne-*` class contract (see `AI_HANDOFF.md §2C Scenario C`).
- **Source of truth:** `DESIGN.md`.
- **Execution guide:** `AI_HANDOFF.md`.
- **Fork target (React/Vite path):** `src/baseline/`.

## Package contents

This handoff zip is a **pure baseline kit** — only the fork target + policy + build
scaffolding. The design.md reference-site renderer and NE-internal records are **not**
included (repo-only).

- `README.md` — package index and orientation (this file).
- `AGENTS.md` — agent-native entry hook (read-order + guardrail pointer). Not a policy source.
- `AI_HANDOFF.md` — practical AI coding agent workflow and guardrails.
- `DESIGN.md` — primary design system specification (source of truth).
- `docs/templates/NE_DESIGNMD_SELF_VALIDATION_TEMPLATE.md` — operational report template. After applying the baseline, an AI agent generates a filled `docs/NE_DESIGNMD_SELF_VALIDATION.md` in the PoC project (not a policy source).
- `src/baseline/` — fork target (tokens/layout/components CSS + component wrappers + icon registry).
- `src/_stubs/` — deferred stub implementations (Dialog/Toast). Not a policy source.
- Build scaffolding — `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.mjs`, `index.html`, generated `font.css` / `_READ_FIRST.txt`, and `scripts/` (build + baseline-coverage guard).

**Not in this zip (repo-only):** reference-site renderer (`src/components`, `src/data`, `src/hooks`, `src/lib`, `src/App.css`, `src/styles`), brand/reference provenance (`docs/reference/*`), historical/internal records (`docs/archive/*`, `docs/PATCH_REPORT_*`, `docs/feedback/*`), and the doc-sync guard (`scripts/check-designmd-sync.mjs`). These are NE-internal and not needed to fork the baseline.

## Recommended reading order

1. `README.md` — package index and orientation
2. `AI_HANDOFF.md` — AI coding agent workflow and guardrails
3. `DESIGN.md` — primary design system specification

## Source of truth boundary

- `DESIGN.md` is the primary source of truth.
- `AI_HANDOFF.md` is the practical execution guide for AI coding agents.
- `README.md` is an index, not a policy source.
- `src/baseline/` is the fork target. The full reference-site renderer is repo-only and not in this kit; do not treat the baseline as a production component library or copy patterns blindly into product code.

## Status

- Internal alpha
- PoC / vibe-coding oriented
- Not production-ready

## Getting started (fork-ready package)

This package is **not** a runnable demo app. It is a fork-ready baseline for
AI-assisted PoC implementation. To start a PoC:

1. Create your own `src/main.jsx` and `src/App.jsx` in your PoC project.
2. Import `src/baseline/styles/tokens.css`, `layout.css`, `components.css`.
3. Use `src/baseline/components/*` as composition primitives and
   `src/baseline/icons/index.js` as the approved icon registry.
4. Read `AI_HANDOFF.md` (start with §2A Pre-implementation Checklist) before
   writing code.

Live baseline CSS contracts (`.ne-*` that actually render) are listed in
`DESIGN.md §1Q baseline_css_coverage` — currently `ne-btn` / `ne-card` /
`ne-badge` + layout utilities. An unimplemented `.ne-*` is a silent dead class.

`lucide-react` is pinned to `1.14.0` (the icon registry mirrors that version's
156 icons). Use `1.14.0` exact (or a compatible verified version) — a different
version can desync the registry (missing icons fail at dev module-link, while
`build` still passes via tree-shaking).

After you add your own entry, `npm install && npm run build` should pass.
(The `npm run dev` / `npm run build` scripts exist in `package.json` for an
in-repo renderer, but the handoff zip omits the entry files by design.)

## Baseline archive note

If this repository is shared as a zip archive, **use the canonical builder** — do
not hand-roll `zip -r`. The builder is allowlist-based: it ships only the fork
target (`src/baseline`, `src/_stubs`), policy docs (`README`/`AGENTS`/`AI_HANDOFF`/
`DESIGN.md` + `docs/templates`), and build scaffolding. It excludes the full
reference-site renderer (`src/components`, `src/data`, `src/hooks`, `src/lib`,
`src/App.css`, `src/styles`, `src/App.jsx`, `src/main.jsx`, `src/examples/`),
internal docs (`docs/reference`, `docs/archive`, `docs/PATCH_REPORT_*`,
`docs/feedback`, `docs/review`, `docs/fail_report`, `docs/INTERNAL_ROLLOUT`), the
doc-sync guard, local agent settings, `.git`, `node_modules`, `dist`, backup
archives, prior zip files, and patch prompts.

```bash
npm run build:handoff-zip
# → public/design-md_v<version>.zip
```

Denylist verification (expect 0 lines):

```bash
unzip -Z1 public/design-md_v0.11.5-alpha.zip \
  | grep -E "\.claude|\.git|node_modules|dist/|__MACOSX|\.DS_Store|/\._|examples|App\.(jsx|css)|main\.jsx|review|fail_report|feedback|reference|archive|PATCH_REPORT|patch|prompt|src/(components|data|hooks|lib|styles)|check-designmd-sync"
```

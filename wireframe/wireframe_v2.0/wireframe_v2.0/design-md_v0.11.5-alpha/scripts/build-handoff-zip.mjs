#!/usr/bin/env node
/**
 * NE Design.md — Handoff zip builder (v0.11.0-alpha)
 *
 * Builds the fork-ready handoff package zip via temp/staging directory.
 * Output: public/design-md_v<version>-alpha.zip
 *
 * Safety guarantees:
 *  - Self-include protection: public/*.zip is excluded from staging copy.
 *  - Allowlist-only: no `zip -r . .` patterns.
 *  - examples / docs/review / docs/fail_report / node_modules / dist / .git /
 *    .claude / patch_prompt are excluded.
 *
 * Output also includes a generated `_READ_FIRST.txt` and `font.css` at zip root.
 *
 * Run: `npm run build:handoff-zip`
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const pkg = JSON.parse(
  await fsp.readFile(path.join(REPO_ROOT, 'package.json'), 'utf8'),
);
const VERSION = pkg.version;
const ZIP_FILENAME = `design-md_v${VERSION}.zip`;
const ZIP_OUTPUT_PATH = path.join(REPO_ROOT, 'public', ZIP_FILENAME);

// ──────────────────────────────────────────────────────────────────
// Allowlist (root files)
// ──────────────────────────────────────────────────────────────────
const ROOT_FILES = [
  'README.md',
  'AGENTS.md',
  'AI_HANDOFF.md',
  'DESIGN.md',
  'package.json',
  'package-lock.json',
  'index.html',
  'vite.config.js',
  'eslint.config.mjs',
];

// ──────────────────────────────────────────────────────────────────
// Allowlist (directories — recursive)
// v0.11.0a hygiene patch (2026-05-20): 'src/baseline'+'src/_stubs' → 'src'(full).
// v0.11.0a hygiene patch 2 (2026-05-29): 'docs'(full) 추가.
// v0.11.5 pure-baseline-kit 정리 (2026-06-17):
//   handoff zip을 "fork-ready baseline kit"으로 좁힌다. design.md 사이트
//   렌더러 코드(src/components·data·hooks·lib·App.css·styles)와 내부 문서
//   (docs/feedback·reference·archive·PATCH_REPORT)는 fork 대상이 아니므로 제외.
//   - 'src'(full) → 'src/baseline' + 'src/_stubs' (fork target만)
//   - 'docs'(full) → 'docs/templates' (소비자 산출물 양식만)
//   - scripts/check-designmd-sync.mjs는 src/data/designMd.js(미포함) 의존이라 제외.
//   이로써 docs/feedback 같은 신규 내부 문서가 추가돼도 zip에 절대 새지 않는다.
// ──────────────────────────────────────────────────────────────────
const ALLOWED_DIRS = [
  'public',
  'src/baseline',
  'src/_stubs',
  'scripts',
  'docs/templates',
];

// ──────────────────────────────────────────────────────────────────
// Forbidden path patterns (defense-in-depth, never copied)
// ──────────────────────────────────────────────────────────────────
const FORBIDDEN_PATTERNS = [
  /^src\/examples\//,
  // v0.11.0a hygiene patch (2026-05-20): App.jsx / main.jsx는 renderer demo entry로
  // src/examples/ 의존성을 가진다. examples가 zip 제외(Lock #4)이므로 두 파일도 제외한다.
  // PoC는 src/baseline/을 import하는 자체 main.jsx / App.jsx를 별도 작성한다.
  /^src\/App\.jsx$/,
  /^src\/main\.jsx$/,
  /^docs\/review/,
  /^docs\/fail_report/,
  // README package contents에 미기재된 이전 PoC handoff 문서 — zip 매니페스트 일치 위해 제외.
  /^docs\/PoCv3_AI_HANDOFF\.md$/,
  // 내부 배포 커뮤니케이션(Slack/Confluence) 문서 — 사용 안내문, 정책 아님. handoff zip 제외.
  /^docs\/INTERNAL_ROLLOUT/,
  // v0.11.5: pure baseline kit — site renderer / internal docs / sync guard 방어선 (allowlist로 이미 차단되나 defense-in-depth)
  /^docs\/feedback/,
  /^docs\/reference/,
  /^docs\/archive/,
  /^docs\/PATCH_REPORT/,
  /^src\/components\//,
  /^src\/data\//,
  /^src\/hooks\//,
  /^src\/lib\//,
  /^src\/styles\//,
  /^src\/App\.css$/,
  /^scripts\/check-designmd-sync\.mjs$/,
  /^node_modules\//,
  /^dist\//,
  /^\.git\//,
  /^\.claude\//,
  /^patch_prompt\//,
  /\.zip$/,
  /__MACOSX/,
  /\.DS_Store$/,
  /\/\._/,
];

function isForbidden(relPath) {
  return FORBIDDEN_PATTERNS.some((re) => re.test(relPath));
}

async function walk(dir, baseRel = '') {
  const out = [];
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const rel = baseRel ? `${baseRel}/${entry.name}` : entry.name;
    if (isForbidden(rel)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await walk(full, rel);
      out.push(...nested);
    } else if (entry.isFile()) {
      out.push({ rel, full });
    }
  }
  return out;
}

// ──────────────────────────────────────────────────────────────────
// Generated _READ_FIRST.txt content
// ──────────────────────────────────────────────────────────────────
const READ_FIRST = `NE Design.md — Fork-ready Handoff Package (v${VERSION})

이 zip은 docs + fork-ready baseline을 포함한 handoff package다.
주의: npm run dev로 바로 뜨는 완성 앱이 아니다. renderer entry(src/App.jsx,
src/main.jsx)는 제외되어 있으며, PoC는 자체 entry를 작성해 src/baseline/을 fork한다.

AI agent는 AGENTS.md를 진입 훅으로 자동 로드한다 (얇은 read-order/guardrail 포인터).

읽는 순서:
  1. README.md
  2. AI_HANDOFF.md
  3. DESIGN.md

AI agent로 새 PoC를 시작할 때는 코드를 작성하기 전에
AI_HANDOFF.md ## 2A Pre-implementation Checklist의 질문에 먼저 답한다.
그 다음 src/baseline/을 fork target으로 사용해 구현을 시작한다.

src/baseline/ — PoC fork target.
src/_stubs/   — deferred 임시 구현이다. policy source가 아니다.

⚠️ 이 zip은 building blocks 모음이다. \`npm run dev\`로 즉시 작동하는 완성 앱이 아니다.
PoC 시작 시 자체 vite entry (src/main.jsx, src/App.jsx)를 작성하고 baseline을 import해 사용한다.
본 zip은 renderer demo entry (src/App.jsx, src/main.jsx) 와 src/examples/를 의도적으로 제외했다.
v05 PoC가 이 패턴으로 작동 확인 (2026-05-20).

본 디자인 시스템은 NE능률의 AI-Native 신규 PoC / 서비스 구축을 위한 token foundation이다.
사람과 AI agent가 동일한 기준으로 UI를 만들고 검토할 수 있도록 토큰·컴포넌트·패턴·AI handoff 기준을 하나의 체계로 연결한다.
internal alpha baseline이며, 실제 PoC 적용 결과를 매 버전에 반영하면서 점진적으로 안정화해간다.
`;

// ──────────────────────────────────────────────────────────────────
// Generated font.css (reference only; source of truth is DESIGN.md)
// ──────────────────────────────────────────────────────────────────
const FONT_CSS = `/*
 * NE design.md v${VERSION} — official font loading reference
 * This file is a reference for docs-only consumers.
 * Fonts are loaded from NE-hosted official font sources (front.neungyule.com).
 *
 * Font provenance:
 *   - Pretendard: orioncactus/pretendard (Kil Hyung-jin),
 *     licensed under SIL Open Font License 1.1.
 *     https://github.com/orioncactus/pretendard
 *   - Paperlogy: Korean open-source font, served via NE-hosted official source.
 *
 * Source of truth:
 *   - DESIGN.md typography.embedding
 *   - full baseline index.html link tags
 */

@import url("https://front.neungyule.com/css/pretendardvariable.css");
@import url("https://front.neungyule.com/font/Paperlogy/subset/Paperlogy-subset.css");

:root {
  --font-primary: "Pretendard Variable", "Pretendard", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: "Paperlogy", "Pretendard Variable", "Pretendard", system-ui, sans-serif;
}

body {
  font-family: var(--font-primary);
}
`;

async function main() {
  console.log(`[build-handoff-zip] version: ${VERSION}`);
  console.log(`[build-handoff-zip] target:  ${ZIP_OUTPUT_PATH}`);

  // 1. Delete previous zip if exists (so we never self-include).
  if (fs.existsSync(ZIP_OUTPUT_PATH)) {
    await fsp.unlink(ZIP_OUTPUT_PATH);
    console.log(`[build-handoff-zip] removed previous: ${ZIP_FILENAME}`);
  }

  const zip = new JSZip();

  // 2. Add root allowlist files.
  for (const file of ROOT_FILES) {
    const full = path.join(REPO_ROOT, file);
    if (!fs.existsSync(full)) {
      console.warn(`[build-handoff-zip] missing root file: ${file} (skipped)`);
      continue;
    }
    if (isForbidden(file)) {
      console.warn(`[build-handoff-zip] forbidden root file: ${file} (skipped)`);
      continue;
    }
    const content = await fsp.readFile(full);
    zip.file(file, content);
  }

  // 3. Add generated _READ_FIRST.txt and font.css at root.
  zip.file('_READ_FIRST.txt', READ_FIRST);
  zip.file('font.css', FONT_CSS);

  // 4. Walk allowed directories and add via allowlist.
  for (const dir of ALLOWED_DIRS) {
    const full = path.join(REPO_ROOT, dir);
    if (!fs.existsSync(full)) {
      console.warn(`[build-handoff-zip] missing dir: ${dir} (skipped)`);
      continue;
    }
    const files = await walk(full, dir);
    for (const { rel, full: filePath } of files) {
      if (isForbidden(rel)) continue;
      const content = await fsp.readFile(filePath);
      zip.file(rel, content);
    }
  }

  // 5. Defense-in-depth: ensure no .zip files in archive.
  const allPaths = Object.keys(zip.files);
  const zipInside = allPaths.filter((p) => /\.zip$/.test(p));
  if (zipInside.length > 0) {
    throw new Error(
      `[build-handoff-zip] FAIL — found .zip inside archive: ${zipInside.join(', ')}`,
    );
  }

  const forbidden = allPaths.filter(isForbidden);
  if (forbidden.length > 0) {
    throw new Error(
      `[build-handoff-zip] FAIL — forbidden paths leaked: ${forbidden.slice(0, 10).join(', ')}`,
    );
  }

  // 6. Generate zip blob and write to public/.
  await fsp.mkdir(path.join(REPO_ROOT, 'public'), { recursive: true });
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
  await fsp.writeFile(ZIP_OUTPUT_PATH, buffer);

  console.log(`[build-handoff-zip] entries: ${allPaths.length}`);
  console.log(`[build-handoff-zip] size:    ${(buffer.length / 1024).toFixed(1)} KB`);
  console.log(`[build-handoff-zip] PASS`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

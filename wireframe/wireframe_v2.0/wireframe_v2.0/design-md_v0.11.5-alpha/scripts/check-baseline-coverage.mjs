/**
 * NE Design.md — baseline CSS coverage guard (v0.11.5-alpha)
 *
 * DESIGN.md가 광고하는 .ne-* 계약 중 baseline 어댑터가 "live"로 구현한 것만
 * 소비자가 바로 쓸 수 있다. 미구현 .ne-*는 silent dead class (build/lint 통과).
 * 이 guard는 §1Q baseline_css_coverage의 live_contracts allowlist만 검사한다.
 * (전체 §8 regex 대조는 draft/deferred/stub false positive로 금지 — DESIGN.md §1Q.)
 *
 * FAIL(exit 1): live_contracts 중 baseline CSS에 정의 없는 게 있으면 (회귀 차단).
 *
 *   npm run check:baseline-coverage
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// §1Q baseline_css_coverage.live_contracts (base class name → 정의가 있어야 하는 CSS 파일)
const LIVE = [
  { cls: 'ne-btn', file: 'components.css' },
  { cls: 'ne-card', file: 'components.css' },
  { cls: 'ne-badge', file: 'components.css' },
  { cls: 'ne-page', file: 'layout.css' },
  { cls: 'ne-section', file: 'layout.css' },
  { cls: 'ne-grid', file: 'layout.css' },
  { cls: 'ne-stack', file: 'layout.css' },
  { cls: 'ne-cluster', file: 'layout.css' },
  { cls: 'ne-collapse', file: 'layout.css' },
];

const cache = {};
async function css(file) {
  if (!cache[file]) cache[file] = await readFile(path.join(ROOT, 'src/baseline/styles', file), 'utf8');
  return cache[file];
}
// `.ne-X` 가 selector로 정의돼 있는지 (뒤에 공백/{/./:/-/, 중 하나)
function defined(text, cls) {
  return new RegExp(`\\.${cls}(?=[\\s{.:,\\-])`).test(text);
}

const missing = [];
for (const { cls, file } of LIVE) {
  if (!defined(await css(file), cls)) missing.push(`${cls} (expected in ${file})`);
}

if (missing.length === 0) {
  console.log(`[check:baseline-coverage] PASS — ${LIVE.length} live contracts all defined in baseline CSS`);
  process.exit(0);
}
console.error('[check:baseline-coverage] FAIL — live contract(s) advertised but missing baseline CSS:');
missing.forEach((m) => console.error(`  - ${m}`));
console.error('  Fix: implement the .ne-* CSS in src/baseline/styles/, or move it out of §1Q live_contracts.');
process.exit(1);

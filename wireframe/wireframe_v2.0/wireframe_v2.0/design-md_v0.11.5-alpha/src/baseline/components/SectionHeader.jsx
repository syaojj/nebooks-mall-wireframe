/**
 * NE Design.md Baseline — SectionHeader
 *
 * Section header pattern. Uses patterns.section_rhythm from DESIGN.md.
 *
 * F-009 / F-010 차단:
 *   - PoC는 section header를 페이지마다 즉흥 정의하지 않는다.
 *   - patterns.section_rhythm.page_header_margin_bottom 통일.
 */
export default function SectionHeader({ num, title, lede, className = '' }) {
  return (
    <header className={`ne-section-header ${className}`.trim()}>
      {num && <span className="ne-section-num">{num}</span>}
      <h2 className="ne-section-title">{title}</h2>
      {lede && <p className="ne-section-lede">{lede}</p>}
    </header>
  );
}

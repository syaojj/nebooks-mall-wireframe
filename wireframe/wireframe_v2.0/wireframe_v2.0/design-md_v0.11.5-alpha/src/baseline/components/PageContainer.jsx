/**
 * NE Design.md Baseline — PageContainer
 *
 * Content width wrapper for PoC pages.
 * Uses spacing.container variants from DESIGN.md (v0.11.0-alpha).
 *
 * F-004 차단:
 *   - PoC는 inline maxWidth="880px" 같은 즉흥 값을 사용하지 않는다.
 *   - PageContainer variant 5종 (narrow / reading / default / wide / none) 중 선택.
 *
 * @example
 *   <PageContainer variant="reading">
 *     <article>...</article>
 *   </PageContainer>
 */
export default function PageContainer({ variant = 'default', as: Tag = 'div', className = '', children, ...rest }) {
  const variantClass = `ne-page--${variant}`;
  return (
    <Tag className={`ne-page ${variantClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

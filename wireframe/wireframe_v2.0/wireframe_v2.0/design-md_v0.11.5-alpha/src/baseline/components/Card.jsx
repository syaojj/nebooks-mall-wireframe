/**
 * NE Design.md Baseline — Card
 *
 * Composition primitive. Not a domain card.
 *
 * F-007 / F-011 차단:
 *   - PoC의 ArticleCard, BookCard, StudentCard 등 도메인 카드는
 *     본 Card를 anatomy로 사용해 PoC layer에서 직접 구성한다.
 *   - 도메인 카드를 baseline에 즉시 추가하지 않는다.
 *     (DESIGN.md component_scope_policy 참조)
 *   - variant="compact"는 ne-card.compact를 호출 (padding 0).
 *     list/table 내장 카드 용도.
 *
 * @example
 *   <Card variant="default">
 *     <h3>Title</h3>
 *     <p>Body</p>
 *   </Card>
 */
export default function Card({ variant = 'default', as: Tag = 'div', className = '', children, ...rest }) {
  const variantClass = variant === 'default' ? '' : `ne-card--${variant}`;
  return (
    <Tag className={`ne-card ${variantClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

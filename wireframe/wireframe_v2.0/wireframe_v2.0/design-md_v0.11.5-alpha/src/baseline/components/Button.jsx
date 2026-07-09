/**
 * NE Design.md Baseline — Button
 *
 * .ne-btn family wrapper. legacy .btn-primary / .btn-on-dark는 사용하지 않는다.
 *
 * variant: primary / neutral / neutral-subtle / inverse
 * size: sm / md (default) / lg / xl / 2xl
 *
 * F-002 / F-008 차단:
 *   - PoC는 button 스타일을 inline으로 박지 않는다.
 *   - 항상 본 wrapper를 통해 .ne-btn-* class를 적용한다.
 */
export default function Button({
  variant = 'neutral',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const variantClass = `ne-btn-${variant}`;
  const sizeClass = size === 'md' ? '' : `ne-btn-${size}`;
  return (
    <button
      type={type}
      className={`ne-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

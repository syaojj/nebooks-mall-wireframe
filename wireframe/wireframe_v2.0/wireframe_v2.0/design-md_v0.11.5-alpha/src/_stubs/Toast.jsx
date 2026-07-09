/**
 * @deferred-stub
 * DESIGN.md deferred_in_baseline.Toast
 * This component is a minimum stub.
 * Do not derive policy from this.
 * review_at: v0.12.0-alpha
 *
 * Deferred:
 * - exact duration
 * - queue policy
 * - mobile placement
 * - portal target
 * - announcement timing
 *
 * Used in PoC for minimum visual / runtime presentation only.
 * Production-grade toast requires owner decision and spec finalization.
 */

export default function Toast({ visible, text, code }) {
  if (!visible) return null;
  return (
    <div
      className="ne-toast-stub"
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'var(--ne-mono)',
        color: 'var(--ne-on-mono)',
        padding: '12px 16px',
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 8px 16px rgba(20, 20, 19, 0.16)',
      }}
    >
      <span>{text}</span>
      {code && (
        <code style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
          {code}
        </code>
      )}
    </div>
  );
}

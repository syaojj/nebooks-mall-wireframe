/**
 * @deferred-stub
 * DESIGN.md deferred_in_baseline.Dialog
 * This component is a minimum stub.
 * Do not derive policy from this.
 * review_at: v0.12.0-alpha
 *
 * Deferred:
 * - focus trap
 * - portal
 * - scroll lock
 * - aria-modal full spec
 * - nested dialog
 * - destructive dialog full pattern
 *
 * Used in PoC for minimum visual / runtime presentation only.
 * Production-grade dialog requires owner decision and spec finalization.
 */

import { useEffect } from 'react';

export default function Dialog({ open, onClose, title, description, children, primaryAction, secondaryAction }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ne-dialog-stub-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 900,
      }}
    >
      <div
        className="ne-dialog-stub-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ne-dialog-stub-title"
        aria-describedby={description ? 'ne-dialog-stub-desc' : undefined}
        onClick={(event) => event.stopPropagation()}
        style={{
          background: 'var(--ne-surface-base)',
          border: '1px solid var(--ne-boundary)',
          borderRadius: '12px',
          padding: '24px',
          minWidth: '320px',
          maxWidth: '480px',
        }}
      >
        {title && (
          <div id="ne-dialog-stub-title" style={{ fontWeight: 700, marginBottom: '8px' }}>
            {title}
          </div>
        )}
        {description && (
          <div id="ne-dialog-stub-desc" style={{ color: 'var(--ne-text-body)', marginBottom: '16px' }}>
            {description}
          </div>
        )}
        {children}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
          {secondaryAction}
          {primaryAction}
        </div>
      </div>
    </div>
  );
}

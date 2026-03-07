// Shared design tokens for all admin page components
const G = '#08CB00';

export const S = {
  pageTitle: { color: '#fff', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' },
  pageSubtitle: { color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '4px 0 0' },
  input: {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(8,203,0,0.03)',
    border: '1px solid rgba(8,203,0,0.15)',
    borderRadius: 10, color: '#fff',
    padding: '10px 12px', fontSize: 13,
    fontFamily: 'Inter, sans-serif', outline: 'none',
    transition: 'border-color 0.2s',
  },
  uploadBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    background: 'none',
    border: '1px dashed rgba(8,203,0,0.35)',
    borderRadius: 8, color: G,
    padding: '8px 14px', fontSize: 12,
    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
  },
  progressBg: { width: '100%', height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginTop: 6 },
  progressFill: { height: 4, background: G, borderRadius: 4, transition: 'width 0.3s' },
};

export function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', padding: 16 }}>
      <motion_div style={{
        background: '#080808',
        border: '1px solid rgba(8,203,0,0.15)',
        borderRadius: 20,
        width: '100%', maxWidth: 500,
        maxHeight: '90vh', overflowY: 'auto',
        padding: 28,
        boxShadow: '0 0 0 1px rgba(8,203,0,0.05), 0 32px 64px rgba(0,0,0,0.8)',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', display: 'flex', padding: 4 }}>
            <X_icon size={18} />
          </button>
        </div>
        {children}
      </motion_div>
    </div>
  );
}

export function BtnPrimary({ onClick, children, type = 'button', disabled }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      background: disabled ? 'rgba(8,203,0,0.25)' : 'linear-gradient(135deg,#06a300,#08CB00)',
      border: 'none', borderRadius: 10,
      color: '#000', fontWeight: 800, fontSize: 13,
      padding: '10px 18px', cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'Inter, sans-serif',
      boxShadow: disabled ? 'none' : '0 4px 16px rgba(8,203,0,0.25)',
      transition: 'opacity 0.2s',
      flexShrink: 0,
    }}>
      {children}
    </button>
  );
}

export function BtnCancel({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      flex: 1,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, color: 'rgba(255,255,255,0.5)',
      fontWeight: 600, fontSize: 13,
      padding: '10px 0', cursor: 'pointer',
      fontFamily: 'Inter, sans-serif',
      transition: 'background 0.2s',
    }}>
      {children}
    </button>
  );
}

export function BtnAction({ onClick, children, danger, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      background: 'none',
      border: danger ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(8,203,0,0.25)',
      borderRadius: 8, color: danger ? '#f87171' : '#08CB00',
      fontSize: 12, fontWeight: 600, padding: '7px 0',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'Inter, sans-serif',
      opacity: disabled ? 0.5 : 1,
      transition: 'background 0.2s',
    }}>
      {children}
    </button>
  );
}

export function EmptyState({ children }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
      {children}
    </div>
  );
}

export function CardShell({ children }) {
  return (
    <div style={{
      background: 'rgba(8,203,0,0.03)',
      border: '1px solid rgba(8,203,0,0.1)',
      borderRadius: 16, overflow: 'hidden',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(8,203,0,0.28)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(8,203,0,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(8,203,0,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {children}
    </div>
  );
}

// Re-export icons so pages don't need multiple imports
import { X as X_icon } from 'lucide-react';
import { motion } from 'framer-motion';
const motion_div = ({ style, children }) => (
  <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} style={style}>
    {children}
  </motion.div>
);

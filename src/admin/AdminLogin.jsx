import { useState, useEffect } from 'react';
import { signIn } from '../firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    document.body.classList.add('admin-body');
    return () => document.body.classList.remove('admin-body');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      window.location.replace('/admin');
    } catch {
      setError('Invalid email or password.');
      setLoading(false);
    }
  }

  const field = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(8,203,0,0.03)',
    border: '1px solid rgba(8,203,0,0.15)',
    borderRadius: 12, color: '#fff',
    fontSize: 14, outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dot grid — same as Hero3D */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(8,203,0,0.07) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />
      {/* Green ambient glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(8,203,0,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(8,203,0,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32, justifyContent: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            border: '2px solid rgba(8,203,0,0.5)',
            boxShadow: '0 0 20px rgba(8,203,0,0.2)',
            background: 'rgba(8,203,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#08CB00', fontWeight: 900, fontSize: 18, letterSpacing: '0.05em' }}>I</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>IETE Admin</div>
            <div style={{ color: 'rgba(8,203,0,0.65)', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em' }}>MIT Student Chapter</div>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(8,203,0,0.12)',
          borderRadius: 24,
          padding: '40px 36px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(8,203,0,0.04), 0 32px 64px rgba(0,0,0,0.6)',
        }}>
          {/* Secure badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(8,203,0,0.07)',
            border: '1px solid rgba(8,203,0,0.2)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 24,
          }}>
            <ShieldCheck size={13} color="#08CB00" />
            <span style={{ color: '#08CB00', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>SECURE ACCESS</span>
          </div>

          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Welcome back</h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, margin: '0 0 32px', lineHeight: 1.5 }}>
            Sign in to manage IETE's content dashboard
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(8,203,0,0.4)', pointerEvents: 'none' }} />
                <input
                  type="email" required value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@gmail.com"
                  style={{ ...field, padding: '13px 14px 13px 40px', borderColor: error ? 'rgba(239,68,68,0.4)' : 'rgba(8,203,0,0.15)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(8,203,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = error ? 'rgba(239,68,68,0.4)' : 'rgba(8,203,0,0.15)'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(8,203,0,0.4)', pointerEvents: 'none' }} />
                <input
                  type={showPw ? 'text' : 'password'} required value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  style={{ ...field, padding: '13px 44px 13px 40px', borderColor: error ? 'rgba(239,68,68,0.4)' : 'rgba(8,203,0,0.15)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(8,203,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = error ? 'rgba(239,68,68,0.4)' : 'rgba(8,203,0,0.15)'}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex', alignItems: 'center',
                }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div key="err"
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 12, padding: '10px 14px', marginBottom: 20,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} />
                  <span style={{ color: '#f87171', fontSize: 13 }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: '100%',
              background: loading ? 'rgba(8,203,0,0.25)' : 'linear-gradient(135deg, #06a300, #08CB00, #3dff3a)',
              border: 'none', borderRadius: 12,
              color: '#000', fontWeight: 800, fontSize: 15,
              fontFamily: 'Inter, sans-serif',
              padding: '14px 0',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 8px 28px rgba(8,203,0,0.3)',
              transition: 'opacity 0.2s, box-shadow 0.2s',
              letterSpacing: '0.02em',
            }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16,
                    border: '2px solid rgba(0,0,0,0.2)', borderTop: '2px solid #000',
                    borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }} />
                  Signing in…
                </>
              ) : (
                <>Sign In to Dashboard <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 12, marginTop: 28, marginBottom: 0 }}>
            IETE MIT Student Chapter · Admin Portal
          </p>
        </div>
      </motion.div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

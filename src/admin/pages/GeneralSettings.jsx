import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../supabase/db';
import { Save, Loader2, Globe, Instagram, Linkedin, Twitter, Mail, Type } from 'lucide-react';
import { motion } from 'framer-motion';

const G = '#08CB00';
const INPUT_STYLE = { width: '100%', boxSizing: 'border-box', background: 'rgba(8,203,0,0.03)', border: '1px solid rgba(8,203,0,0.15)', borderRadius: 10, color: '#fff', padding: '12px 14px', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' };

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    heroTitle: '',
    heroSubtitle: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      if (data) setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await updateSettings(settings);
      setMsg({ type: 'success', text: 'Settings updated successfully!' });
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to update settings.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '100px 0' }}><Loader2 size={32} color={G} className="spinner" /></div>;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 900, margin: 0 }}>General Settings</h1>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 4 }}>Site-wide configurations and social links</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Hero Section */}
        <Section title="Hero Section" icon={<Type size={16} />}>
          <Fld label="Hero Title"><input value={settings.heroTitle} onChange={e => setSettings(s => ({ ...s, heroTitle: e.target.value }))} style={INPUT_STYLE} placeholder="Welcome to IETE Student Forum" /></Fld>
          <Fld label="Hero Subtitle"><textarea rows={3} value={settings.heroSubtitle} onChange={e => setSettings(s => ({ ...s, heroSubtitle: e.target.value }))} style={{ ...INPUT_STYLE, resize: 'vertical' }} placeholder="Innovating the future…" /></Fld>
        </Section>

        {/* Social Links */}
        <Section title="Social Media" icon={<Globe size={16} />}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Fld label="Instagram" icon={<Instagram size={14} />}><input value={settings.instagram} onChange={e => setSettings(s => ({ ...s, instagram: e.target.value }))} style={INPUT_STYLE} placeholder="https://instagram.com/…" /></Fld>
            <Fld label="LinkedIn" icon={<Linkedin size={14} />}><input value={settings.linkedin} onChange={e => setSettings(s => ({ ...s, linkedin: e.target.value }))} style={INPUT_STYLE} placeholder="https://linkedin.com/in/…" /></Fld>
            <Fld label="Twitter / X" icon={<Twitter size={14} />}><input value={settings.twitter} onChange={e => setSettings(s => ({ ...s, twitter: e.target.value }))} style={INPUT_STYLE} placeholder="https://twitter.com/…" /></Fld>
            <Fld label="Contact Email" icon={<Mail size={14} />}><input type="email" value={settings.email} onChange={e => setSettings(s => ({ ...s, email: e.target.value }))} style={INPUT_STYLE} placeholder="iete@mit.edu" /></Fld>
          </div>
        </Section>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
          <button type="submit" disabled={saving} style={saveBtnStyle(saving)}>
            {saving ? <Loader2 size={16} className="spinner" /> : <><Save size={16} /> Save Changes</>}
          </button>
          {msg && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} 
              style={{ fontSize: 13, color: msg.type === 'success' ? G : '#f87171', fontWeight: 600 }}>
              {msg.text}
            </motion.span>
          )}
        </div>
      </form>

      <style>{`
        .spinner { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, color: G }}>
        {icon}
        <h3 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, color: '#fff' }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

function Fld({ label, icon, children, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}{label} {required && <span style={{ color: '#f87171' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const saveBtnStyle = (dis) => ({
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: dis ? 'rgba(8,203,0,0.2)' : 'linear-gradient(135deg, #06a300, #08CB00)',
  color: '#000', border: 'none', borderRadius: 12, padding: '14px 28px',
  fontSize: 14, fontWeight: 800, cursor: dis ? 'not-allowed' : 'pointer',
  fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(8,203,0,0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s'
});

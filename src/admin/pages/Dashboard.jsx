import { useEffect, useState } from 'react';
import { getEvents, getAchievements, getGallery, getTeam } from '../../firebase/firestore';
import { CalendarCheck, Trophy, ImageIcon, Users, ArrowUpRight, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const G = '#08CB00';

const CARDS = [
  { label: 'Home Events',    key: 'events',       icon: CalendarCheck, to: '/admin/home-events',  badge: 'Events'  },
  { label: 'Achievements',   key: 'achievements', icon: Trophy,        to: '/admin/achievements', badge: 'Active'  },
  { label: 'Gallery Albums', key: 'gallery',      icon: ImageIcon,     to: '/admin/gallery',      badge: 'Albums'  },
  { label: 'Team Members',   key: 'team',         icon: Users,         to: '/admin/team',         badge: 'Members' },
];

const QUICK_ACTIONS = [
  { label: 'Add Event',       to: '/admin/home-events',   icon: CalendarCheck },
  { label: 'Add Achievement', to: '/admin/achievements',  icon: Trophy        },
  { label: 'Add Photos',      to: '/admin/gallery',       icon: ImageIcon     },
  { label: 'Add Member',      to: '/admin/team',          icon: Users         },
];

export default function Dashboard() {
  const [stats, setStats]   = useState({ events: 0, achievements: 0, gallery: 0, team: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getEvents(), getAchievements(), getGallery(), getTeam()])
      .then(([ev, ac, ga, tm]) =>
        setStats({ events: ev.length, achievements: ac.length, gallery: ga.length, team: tm.length })
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1100, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{ width: 4, height: 20, borderRadius: 4, background: G, boxShadow: `0 0 8px ${G}` }} />
          <p style={{ color: G, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>Overview</p>
        </div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: 0 }}>Welcome back — here&apos;s what&apos;s happening with your content.</p>
      </motion.div>

      {/* ── Stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {CARDS.map(({ label, key, icon: Icon, to, badge }, i) => (
          <motion.button key={key}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            onClick={() => navigate(to)}
            style={{
              position: 'relative', textAlign: 'left', cursor: 'pointer',
              background: 'rgba(8,203,0,0.04)',
              border: '1px solid rgba(8,203,0,0.15)',
              borderRadius: 20, padding: 22,
              overflow: 'hidden',
              transition: 'transform 0.25s ease, border-color 0.25s, box-shadow 0.25s',
              boxShadow: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.borderColor = 'rgba(8,203,0,0.4)';
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(8,203,0,0.12)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(8,203,0,0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Dot grid */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.5,
              backgroundImage: 'radial-gradient(circle, rgba(8,203,0,0.06) 1px, transparent 1px)',
              backgroundSize: '20px 20px', pointerEvents: 'none',
            }} />
            {/* Top glow */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(8,203,0,0.3), transparent)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(8,203,0,0.1)', border: '1px solid rgba(8,203,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={G} />
                </div>
                <ArrowUpRight size={14} style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }} />
              </div>

              {loading
                ? <div style={{ width: 48, height: 40, background: 'rgba(8,203,0,0.1)', borderRadius: 8, marginBottom: 6, animation: 'pulse 1.5s ease infinite' }} />
                : <p style={{ color: '#fff', fontSize: 38, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.03em' }}>{stats[key]}</p>
              }
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 500, margin: '0 0 12px' }}>{label}</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'rgba(8,203,0,0.08)', border: '1px solid rgba(8,203,0,0.18)',
                borderRadius: 100, padding: '3px 10px',
              }}>
                <TrendingUp size={9} color={G} />
                <span style={{ color: 'rgba(8,203,0,0.7)', fontSize: 10, fontWeight: 600 }}>{badge}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* ── Quick actions + Getting started ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(8,203,0,0.08)',
            borderRadius: 20, padding: 24,
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: 0 }}>Quick Actions</h2>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>Click to navigate</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {QUICK_ACTIONS.map(({ label, to, icon: Icon }) => (
              <button key={label} onClick={() => navigate(to)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                  background: 'rgba(8,203,0,0.04)', border: '1px solid rgba(8,203,0,0.1)',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(8,203,0,0.09)'; e.currentTarget.style.borderColor = 'rgba(8,203,0,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(8,203,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(8,203,0,0.1)'; }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(8,203,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={14} color={G} />
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, margin: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Plus size={9} /> New item
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Getting started */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(8,203,0,0.08)',
            borderRadius: 20, padding: 24, minWidth: 280,
          }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 18px' }}>Getting Started</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: '01', text: 'Add Firebase credentials to config.js' },
              { step: '02', text: 'Add featured events via Home Events' },
              { step: '03', text: 'Upload team photos in Team Management' },
              { step: '04', text: 'Create an Event Gallery album' },
            ].map(({ step, text }) => (
              <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(8,203,0,0.08)', border: '1px solid rgba(8,203,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: G, fontSize: 9, fontWeight: 900 }}>{step}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

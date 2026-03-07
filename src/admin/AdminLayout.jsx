import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from '../firebase/auth';
import {
  LayoutDashboard, CalendarCheck, Trophy, ImageIcon,
  Users, LogOut, Menu, X, ChevronRight, Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { to: '/admin',              label: 'Dashboard',       icon: LayoutDashboard, end: true  },
  { to: '/admin/home-events',  label: 'Home Events',     icon: CalendarCheck,   end: false },
  { to: '/admin/achievements', label: 'Achievements',    icon: Trophy,          end: false },
  { to: '/admin/gallery',      label: 'Event Gallery',   icon: ImageIcon,       end: false },
  { to: '/admin/team',         label: 'Team Management', icon: Users,           end: false },
];

const PAGE_TITLES = {
  '/admin':               'Dashboard',
  '/admin/home-events':   'Home Events',
  '/admin/achievements':  'Dept. Achievements',
  '/admin/gallery':       'Event Gallery',
  '/admin/team':          'Team Management',
};

/* ── Design tokens matching the main site ────────────────── */
const C = {
  bg:        '#050505',
  sidebar:   '#080808',
  surface:   'rgba(255,255,255,0.03)',
  border:    'rgba(8,203,0,0.1)',
  green:     '#08CB00',
  greenDim:  'rgba(8,203,0,0.55)',
  greenGlow: 'rgba(8,203,0,0.08)',
  text:      '#ffffff',
  muted:     'rgba(255,255,255,0.35)',
  subtle:    'rgba(255,255,255,0.12)',
};

function SidebarContent({ onClose, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Brand ── */}
      <div style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 14,
            border: `2px solid ${C.greenDim}`,
            boxShadow: `0 0 16px ${C.greenGlow}`,
            background: 'rgba(8,203,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ color: C.green, fontWeight: 900, fontSize: 16 }}>I</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: C.text, fontWeight: 800, fontSize: 14, margin: 0, letterSpacing: '-0.01em' }}>IETE Admin</p>
            <p style={{ color: C.greenDim, fontSize: 11, margin: 0, fontWeight: 500, letterSpacing: '0.04em' }}>Content Manager</p>
          </div>
          {onClose && (
            <button onClick={onClose} style={{
              marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
              color: C.muted, display: 'flex', padding: 4,
            }}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ margin: '0 20px 12px', height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />

      <p style={{ padding: '0 20px', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>
        Navigation
      </p>

      {/* ── Nav links ── */}
      <nav style={{ flex: 1, padding: '0 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to} to={to} end={end}
            onClick={() => onClose?.()}
            style={({ isActive }) => ({
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              borderRadius: 12,
              fontSize: 13, fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              color: isActive ? C.text : C.muted,
              background: isActive ? `rgba(8,203,0,0.08)` : 'transparent',
              border: isActive ? `1px solid rgba(8,203,0,0.18)` : '1px solid transparent',
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-bar"
                    style={{
                      position: 'absolute', left: 0, top: 8, bottom: 8, width: 3,
                      borderRadius: 4, background: C.green,
                      boxShadow: `0 0 8px ${C.green}`,
                    }}
                  />
                )}
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? C.green : 'rgba(255,255,255,0.3)',
                  background: isActive ? 'rgba(8,203,0,0.12)' : 'transparent',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={14} />
                </div>
                <span style={{ flex: 1 }}>{label}</span>
                {isActive && <ChevronRight size={12} style={{ color: C.greenDim }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom ── */}
      <div style={{ padding: '12px 10px' }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: '0 10px 12px' }} />
        {/* User pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(8,203,0,0.04)',
          border: '1px solid rgba(8,203,0,0.08)',
          marginBottom: 4,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: 'rgba(8,203,0,0.12)',
            border: '1px solid rgba(8,203,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: C.green, fontWeight: 900, fontSize: 11 }}>A</span>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ color: C.text, fontSize: 12, fontWeight: 600, margin: 0 }}>Admin</p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, margin: 0 }}>IETE Portal</p>
          </div>
        </div>
        {/* Logout */}
        <button onClick={onLogout} style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          padding: '10px 12px', borderRadius: 12,
          fontSize: 13, fontWeight: 500, fontFamily: 'Inter, sans-serif',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s, background 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'none'; }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={14} />
          </div>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const pageTitle  = PAGE_TITLES[location.pathname] ?? 'Admin';

  useEffect(() => {
    document.body.classList.add('admin-body');
    return () => document.body.classList.remove('admin-body');
  }, []);

  async function handleLogout() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: C.bg, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Desktop sidebar ── */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: C.sidebar,
        borderRight: `1px solid ${C.border}`,
        minHeight: '100vh',
        display: 'none',
      }} className="admin-sidebar-desktop">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 40 }}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                position: 'fixed', left: 0, top: 0, bottom: 0, width: 240,
                background: C.sidebar, borderRight: `1px solid ${C.border}`,
                zIndex: 50, display: 'flex', flexDirection: 'column',
              }}
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', height: 56,
          background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${C.border}`,
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(true)} className="admin-ham" style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer',
              color: C.muted, transition: 'color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.background = C.subtle; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'none'; }}
            >
              <Menu size={17} />
            </button>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>Admin</span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
              <span style={{ fontWeight: 700, color: C.text }}>{pageTitle}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer',
              color: C.muted,
            }}>
              <Bell size={15} />
            </button>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(8,203,0,0.1)',
              border: '1px solid rgba(8,203,0,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: C.green, fontWeight: 900, fontSize: 12 }}>A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px 28px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Responsive: show sidebar on lg+ */}
      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar-desktop { display: flex !important; flex-direction: column; }
          .admin-ham { display: none !important; }
        }
        .admin-body { overflow-x: hidden; }
      `}</style>
    </div>
  );
}

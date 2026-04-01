import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../supabase/db';

/* ─── Hook: animate counter ──────────────────────────────── */
function useCountUp(target, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 20);
    return () => clearInterval(id);
  }, [active, target]);
  return count;
}

/* ─── Hook: IntersectionObserver ─────────────────────────── */
function useInView(ref, threshold = 0.15, trigger = null) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, trigger]);
  return visible;
}

/* ─── Stat counter card ──────────────────────────────────── */
function StatCard({ val, suffix, label, delay, active }) {
  const count = useCountUp(val, active);
  return (
    <div className="ep-stat-card" style={{ transitionDelay: delay }}>
      <span className="ep-stat-num">{count}{suffix}</span>
      <span className="ep-stat-label">{label}</span>
    </div>
  );
}

/* ─── Event Card (Standard Component) ─────────────────────── */
function EventCard({ ev, index, visible }) {
  const navigate = useNavigate();
  const progress = ev.registered && ev.seats ? Math.round((ev.registered / ev.seats) * 100) : 0;
  const isFull = ev.registered >= ev.seats;

  const handleClick = () => {
    if (ev.has_sub_events) {
      navigate(`/events/${ev.id}`);
    } else if (ev.type === 'conducted') {
      navigate(`/gallery/${ev.id}`);
    } else if (ev.register_link) {
      window.open(ev.register_link, '_blank');
    }
  };

  return (
    <div
      className="ep-ev-card"
      style={{
        transitionDelay: `${index * 0.12}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '24px',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      {/* Image */}
      <div className='rounded-md'
      style={{ position: 'relative', height: 180, overflow: 'hidden'}}>
        <img src={ev.image_url || ev.img} alt={ev.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,8,0.7) 0%, transparent 60%)' }} />
        <span style={{ position: 'absolute', top: 14, right: 14, fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100, background: 'var(--accent-green)', color: '#000', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>{ev.type}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{ev.dept || 'IETE'}</span>
          {ev.has_sub_events && <span style={{ fontSize: 10, color: '#fff', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: 100, padding: '3px 10px', fontWeight: 700, textTransform: 'uppercase' }}>Has Sub-Events</span>}
        </div>
        <h3 style={{ fontFamily: 'Funnel Display, Inter, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{ev.title}</h3>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: 12 }}>{ev.description || ev.desc}</p>

        {ev.type === 'upcoming' && ev.seats && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              <span>{ev.registered || 0} registered</span>
              <span>{ev.seats} seats</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, width: visible ? `${progress}%` : '0%', background: 'var(--accent-green)', transition: 'width 1s cubic-bezier(0.22,1,0.36,1) 0.3s' }} />
            </div>
          </div>
        )}

        <button className="ep-btn-outline" style={{ width: '100%', padding: '12px 0', fontSize: 12 }}>
          {ev.has_sub_events ? 'View Details' : ev.type === 'conducted' ? 'View Gallery' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useRef(null);
  const upcomingRef = useRef(null);
  const pastRef = useRef(null);

  const heroVisible = useInView(heroRef, 0.1);
  const upcomingVisible = useInView(upcomingRef, 0.1, loading);
  const pastVisible = useInView(pastRef, 0.1, loading);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter(e => e.type === 'upcoming');
  const conductedEvents = events.filter(e => e.type === 'conducted');

  return (
    <div className="ep-page">
      <style>{`
        /* ════ Page base ════ */
        .ep-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 80px;
          font-family: var(--font-premium);
          color: var(--text-primary);
          overflow-x: hidden;
        }

        /* ════ Hero ════ */
        .ep-hero {
          position: relative;
          padding: 120px 8vw 100px;
          overflow: hidden;
          background: radial-gradient(circle at 50% 0%, rgba(8, 203, 0, 0.08) 0%, transparent 70%);
        }
        .ep-hero-bg-ring {
          position: absolute;
          top: -120px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 700px;
          border-radius: 50%;
          border: 1px solid rgba(8, 203, 0, 0.05);
          pointer-events: none;
          animation: ep-ring-pulse 6s ease-in-out infinite alternate;
        }
        .ep-hero-bg-ring:nth-child(2) {
          width: 500px; height: 500px;
          border-color: rgba(8, 203, 0, 0.08);
          animation-delay: -3s;
        }
        @keyframes ep-ring-pulse {
          from { opacity: 0.4; transform: translateX(-50%) scale(1); }
          to   { opacity: 1;   transform: translateX(-50%) scale(1.06); }
        }
        .ep-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-hero-inner.ep-visible {
          opacity: 1 !important; transform: translateY(0) !important;
        }
        .ep-hero-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-green);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .ep-hero-eyebrow::before, .ep-hero-eyebrow::after {
          content: '';
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-green));
        }
        .ep-hero-eyebrow::after { background: linear-gradient(90deg, var(--accent-green), transparent); }
        .ep-hero-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 24px;
        }
        .ep-hero-title em {
          font-style: normal;
          color: var(--accent-green);
          text-shadow: 0 0 30px rgba(8, 203, 0, 0.3);
        }
        .ep-hero-sub {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 540px;
          margin: 0 auto 40px;
          font-weight: 300;
        }
        .ep-btn-outline {
          background: var(--glass-bg);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 16px 36px;
          border-radius: 100px;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .ep-btn-outline:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ════ Section UI ════ */
        .ep-section {
          padding: 90px 8vw;
          max-width: 1300px;
          margin: 0 auto;
        }
        .ep-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-green);
          margin-bottom: 12px;
          display: block;
        }
        .ep-section-title {
          font-family: var(--font-premium);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }

        .ep-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .loader-wrap {
          display: flex;
          justify-content: center;
          padding: 100px 0;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(8, 203, 0, 0.1);
          border-top-color: var(--accent-green);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Hero */}
      <section className="ep-hero" ref={heroRef}>
        <div className="ep-hero-bg-ring" />
        <div className="ep-hero-bg-ring" />
        <div className={`ep-hero-inner${heroVisible ? ' ep-visible' : ''}`}>
          <h1 className="ep-hero-title">Discover Our <br /><em>Events</em></h1>
          <p className="ep-hero-sub">Stay updated with the latest workshops, hackathons, and technical championships.</p>
        </div>
      </section>

      {loading ? (
        <div className="loader-wrap"><div className="spinner" /></div>
      ) : (
        <>
          {/* Upcoming Events */}
          <section className="ep-section" ref={upcomingRef}>
            <div className="ep-section-header">
              <span className="ep-section-label">Next Chapters</span>
              <h2 className="ep-section-title">Upcoming Highlights</h2>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="ep-grid">
                {upcomingEvents.map((ev, idx) => (
                  <EventCard key={ev.id} ev={ev} index={idx} visible={upcomingVisible} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: 20 }}>No upcoming events scheduled at the moment.</p>
            )}
          </section>

          {/* Conducted Events */}
          <section className="ep-section" ref={pastRef} style={{ borderTop: '1px solid var(--glass-border)' }}>
            <div className="ep-section-header">
              <span className="ep-section-label">Past achievements</span>
              <h2 className="ep-section-title">Conducted Events</h2>
            </div>
            {conductedEvents.length > 0 ? (
              <div className="ep-grid">
                {conductedEvents.map((ev, idx) => (
                  <EventCard key={ev.id} ev={ev} index={idx} visible={pastVisible} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: 20 }}>Stay tuned for our upcoming event highlights!</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

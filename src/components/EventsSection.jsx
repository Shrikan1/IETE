import { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../supabase/db';

const EventsSection = forwardRef(function EventsSectionWithRef(props, ref) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        const upcoming = data.filter(e => e.type === 'upcoming').slice(0, 3);
        setEvents(upcoming);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section ref={ref} className="es-outer">
      <style>{`
        .es-outer {
          width: 100%;
          background: var(--bg-primary);
          padding: 100px 9vw;
          box-sizing: border-box;
          position: relative;
        }
        .es-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 60px;
        }
        .es-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(8, 203, 0, 0.1);
          border: 1px solid rgba(8, 203, 0, 0.2);
          color: var(--accent-green);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .es-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 20px;
        }
        .es-title em {
          font-style: normal;
          color: var(--accent-green);
          text-shadow: 0 0 30px rgba(8, 203, 0, 0.3);
        }
        .es-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        .es-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          cursor: pointer;
        }
        .es-card:hover {
          transform: translateY(-10px);
          border-color: rgba(8, 203, 0, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .es-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .es-card:hover .es-card-img {
          transform: scale(1.05);
        }
        .es-card-content {
          padding: 24px;
        }
        .es-card-dept {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-green);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .es-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .es-card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .es-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--glass-border);
        }
        .es-card-date {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
        .es-card-type {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          background: rgba(255,255,255,0.1);
          padding: 4px 10px;
          border-radius: 100px;
          color: #fff;
        }
        .es-view-all {
          text-align: center;
          margin-top: 60px;
        }
        .es-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent-green);
          color: #000;
          padding: 16px 40px;
          border-radius: 100px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .es-btn:hover {
          background: #0aff00;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(8, 203, 0, 0.2);
        }
      `}</style>
      
      <div className="es-header">
        <span className="es-badge">Core Experience</span>
        <h2 className="es-title">Featured <em>Events</em> & Chapters</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Join our vibrant community of innovators. From high-stakes hackathons to 
          industrial-grade workshops, we design experiences that define futures.
        </p>
      </div>

      <div className="es-grid">
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>Loading events...</div>
        ) : events.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>No upcoming events scheduled at the moment.</div>
        ) : (
          events.map(event => (
            <div key={event.id} className="es-card" onClick={() => navigate('/events')}>
              <img src={event.image_url} alt={event.title} loading="lazy" decoding="async" className="es-card-img" />
              <div className="es-card-content">
                <div className="es-card-dept">{event.dept || 'IETE'}</div>
                <h3 className="es-card-title">{event.title}</h3>
                <p className="es-card-desc">{event.description}</p>
                <div className="es-card-footer">
                  <span className="es-card-date">{event.date}</span>
                  <span className="es-card-type">{event.type}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="es-view-all">
        <a onClick={() => navigate('/events')} className="es-btn">
          Explore All Events →
        </a>
      </div>
    </section>
  );
});

export default EventsSection;

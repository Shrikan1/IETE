import { useEffect, useState } from 'react';
import { getDepartments, getAchievements } from '../supabase/db';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const G = '#08CB00';

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [d, a] = await Promise.all([getDepartments(), getAchievements()]);
        setDepartments(d);
        setAchievements(a);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '9rem', paddingBottom: '9rem', overflowX: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>

        {/* Heading */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-green)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Technical excellence</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Engineering <span style={{ color: 'var(--accent-green)' }}>Ecosystem</span>
          </h1>
          <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', maxWidth: 640, margin: '1.5rem auto 0', lineHeight: 1.7, fontSize: '1.15rem', fontWeight: 300 }}>
            Discover the diverse branches that form the backbone of IETE MIT. We foster cross-disciplinary innovation and professional growth.
          </p>
        </motion.div>

        <style>{`
          .dept-stack {
            display: flex;
            flex-direction: column;
            gap: 200px;
          }
          .dept-split-card {
            display: flex;
            gap: 150px;
            align-items: center;
            position: relative;
          }
          .dept-visual {
            position: relative;
            z-index: 1;
            flex: 1;
          }
          .dept-bg-accent {
            position: absolute;
            top: -15%;
            left: -15%;
            width: 130%;
            height: 130%;
            background: #0a1103;
            clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
            z-index: -1;
            opacity: 0.4;
          }
          .dept-photo-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 1.2 / 1;
            background: #ffffff10;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            box-shadow: 0 50px 100px rgba(0,0,0,0.6);
            overflow: visible;
          }
          .dept-photo-frame::after {
            content: '';
            position: absolute;
            top: 40px;
            right: -24px;
            width: 48px;
            height: 120px;
            background: #ffffff08;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(8px);
            clip-path: polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%);
            z-index: 2;
          }
          .dept-photo-inner {
            position: absolute;
            inset: 12px;
            overflow: hidden;
            border-radius: 12px;
            background: #111;
          }
          .dept-photo-inner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .dept-split-card:hover .dept-photo-inner img {
            transform: scale(1.08);
          }
          .dept-content {
            padding-right: 20px;
            flex: 1;
          }
          .dept-badge {
            font-size: 11px;
            font-weight: 800;
            color: var(--accent-green);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 12px;
            display: block;
          }
          .dept-title {
            font-size: clamp(2rem, 4vw, 3.2rem);
            font-weight: 900;
            color: #fff;
            line-height: 1.1;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
          }
          .dept-description {
            font-size: 1.15rem;
            color: var(--text-secondary);
            line-height: 1.8;
            font-weight: 300;
            margin-bottom: 24px;
            max-width: 500px;
          }
          .achievements-box {
            margin-bottom: 32px;
            background: rgba(8, 203, 0, 0.05);
            border-left: 2px solid var(--accent-green);
            padding: 16px 24px;
            border-radius: 0 12px 12px 0;
            max-width: 500px;
          }
          .achievements-title {
            color: #fff;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
            display: block;
          }
          .achievements-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .achievement-item {
            color: var(--text-secondary);
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .achievement-item::before {
            content: '✦';
            color: var(--accent-green);
            font-size: 0.8rem;
          }
          .dept-learn-more {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .dept-learn-more span {
            width: 40px;
            height: 1px;
            background: var(--accent-green);
            transition: width 0.3s ease;
          }
          .dept-learn-more:hover span {
               width: 60px;
          }
          @media (max-width: 960px) {
            .dept-split-card {
              flex-direction: column !important;
              gap: 60px;
              text-align: center;
            }
            .dept-content {
               padding-right: 0;
               display: flex;
               flex-direction: column;
               align-items: center;
            }
            .dept-bg-accent { transform: scale(0.9); }
            .dept-stack { gap: 100px; }
          }
          .spinner { animation: spin 0.8s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>

        {loading ? (
          <div style={{ padding: '100px 0', textAlign: 'center' }}><Loader2 className="spinner" size={40} color={G} /></div>
        ) : (
          <div className="dept-stack">
            {departments.map((dept, i) => (
              <motion.div 
                key={dept.id} 
                className="dept-split-card"
                {...fadeUp(i * 0.1)}
                style={{
                  flexDirection: i % 2 !== 0 ? 'row-reverse' : 'row'
                }}
              >
                {/* Left Column: Visuals */}
                <div className="dept-visual">
                  <div className="dept-bg-accent" />
                  <div className="dept-photo-frame">
                    <div className="dept-photo-inner">
                      <img src={dept.image_url || dept.img} alt={dept.name} />
                    </div>
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="dept-content">
                  <span className="dept-badge">Industrial Wing • {dept.code}</span>
                  <h3 className="dept-title">{dept.name}</h3>
                  <p className="dept-description">{dept.description || dept.desc}</p>
                  
                  {/* achievements Box */}
                  {achievements.filter(a => a.dept_id === dept.id).length > 0 && (
                    <div className="achievements-box">
                      <span className="achievements-title">achievements</span>
                      <ul className="achievements-list">
                        {achievements.filter(a => a.dept_id === dept.id).map((a, idx) => (
                          <li key={a.id} className="achievement-item">{a.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a href="#" className="dept-learn-more">
                    Explore Curriculum <span />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSettings } from '../supabase/db';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';
import './Footer.css';

const navLinks = [
  { label: 'Home',       path: '/' },
  { label: 'Events',     path: '/events' },
  { label: 'Team',       path: '/team' },
  { label: 'Department', path: '/department' },
];

const Footer = ({ logoRef }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then(setSettings).catch(err => console.error("Error loading settings:", err));
  }, []);

  return (
    <footer className="site-footer">
      {/* Top glow line */}
      <div className="footer-top-glow" />

      <div className="footer-container">

        {/* ── Brand row ── */}
        <div className="footer-brand-row">
          <div className="footer-logo-circle" ref={logoRef}>
            <span className="footer-logo-text"></span>
          </div>
          <div className="footer-brand-info">
            <h2 className="footer-brand-name">IETE Student Forum</h2>
            <p className="footer-brand-tagline">{settings?.heroSubtitle || 'Innovating Electronics & Communication Engineering'}</p>
            {settings && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='#08CB00'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}><Instagram size={18} /></a>}
                {settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='#08CB00'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}><Linkedin size={18} /></a>}
                {settings.twitter && <a href={settings.twitter} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='#08CB00'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}><Twitter size={18} /></a>}
                {settings.email && <a href={`mailto:${settings.email}`} style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='#08CB00'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}><Mail size={18} /></a>}
              </div>
            )}
          </div>
        </div>

        <div className="footer-divider" />

        {/* ── Columns ── */}
        <div className="footer-columns">

          <div className="footer-col">
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-link-list">
              {navLinks.map(link => (
                <li key={link.path}>
                  <button className="footer-link-btn" onClick={() => navigate(link.path)}>
                    <span className="footer-link-arrow">→</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">About IETE</h5>
            <p className="footer-col-text">
              A student-run technical chapter under the Institution of Electronics
              and Telecommunication Engineers — one of India's premier professional
              societies. We foster innovation, learning, and leadership among
              engineering students.
            </p>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">What We Do</h5>
            <ul className="footer-link-list">
              {['Technical Workshops', 'Hackathons', 'Guest Lectures', 'Inter-College Competitions', 'Project Showcases'].map(item => (
                <li key={item}><span className="footer-list-item">{item}</span></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="footer-divider" />

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IETE MIT Student Chapter. All rights reserved.</span>
          <span className="footer-credit">Made with <span className="footer-heart">♥</span> by the Aditya Brandwal</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

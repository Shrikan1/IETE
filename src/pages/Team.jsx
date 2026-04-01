import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Mail, Linkedin, Users, Award, Calendar, ChevronDown, Loader2 } from 'lucide-react';
import { getTeam } from '../supabase/db';
import './Team.css';

const G = '#08CB00';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: 'easeOut', delay },
});

const getAvatarUrl = (name, gender = 'male') => {
  const seed = encodeURIComponent(name);
  if (gender === 'female') {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&topType=LongHairStraight,LongHairCurvy,LongHairBun,LongHairStraight2&clotheType=BlazerShirt,BlazerSweater&clotheColor=Black,Gray02&backgroundColor=ffd5dc,ffdfbf,e8d5f5,c0aede`;
  }
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&topType=ShortHairShortFlat,ShortHairShortCurly,ShortHairShortRound,ShortHairSides&clotheType=BlazerShirt,BlazerSweater&clotheColor=Black,Gray02&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};

const positionDescriptions = {
  'Chairperson': "The Chairperson is the head of the organization and provides overall leadership. They guide the vision and direction, supervise all activities, events, and projects, and coordinate with faculty advisors, team members, and external partners. They represent the organization in meetings and official communications.",
  'Co-Chairperson': "The Co-Chairperson assists the Chairperson in leading the organization. They step in when the Chairperson is unavailable, help coordinate teams, and ensure all initiatives align with the organization's goals. They act as a bridge between the leadership and the core team.",
  'Event Head': "The Event Head plans, organizes, and executes all events held by the organization. They manage the event calendar, coordinate with vendors and venues, and ensure seamless execution. They lead the events team and are responsible for the overall success of each event.",
  'Co-Event Head': "The Co-Event Head supports the Event Head in managing and executing events. They assist in logistics, team coordination, and on-ground management to ensure each event is delivered smoothly and professionally.",
  'Technical Head': "The Technical Head oversees all technical initiatives, workshops, and projects of the organization. They guide the technical team, manage project timelines, and ensure that technical activities align with the latest industry trends and standards.",
  'Co-Technical Head': "The Co-Technical Head supports the Technical Head in driving technical projects. They assist in organizing workshops, managing the technical team's workload, and providing mentorship to junior members in technical domains.",
  'Creative Head': "The Creative Head leads the creative vision of the organization. They oversee design, branding, and visual communication for all events and campaigns. They ensure a consistent and appealing aesthetic across all organizational materials.",
  'Co-Creative Head': "The Co-Creative Head assists in driving the creative direction. They collaborate with the Creative Head on designs, concepts, and campaigns, and support the creative team in delivering high-quality visual and artistic work.",
  'Social Media Head': "The Social Media Head manages the organization's presence across all social media platforms. They create content strategies, schedule posts, engage with the community, and grow the organization's digital reach and influence.",
  'Co-Social Media Head': "The Co-Social Media Head assists in executing the social media strategy. They help create and schedule content, monitor engagement, and support campaigns to boost the organization's online visibility.",
  'Sports Head': "The Sports Head coordinates all sports-related activities and events. They organize competitions, manage sports teams, and promote a healthy and active culture within the organization.",
  'Co-Sports Head': "The Co-Sports Head supports the Sports Head in planning and executing sports events. They assist in scheduling, team management, and ensuring smooth conduct of all athletic activities.",
  'Secretary': "The Secretary maintains official records, minutes of meetings, and correspondence. They manage communication between teams, keep track of deadlines, and ensure organizational operations run smoothly and in an orderly manner.",
  'Treasurer': "The Treasurer manages the financial affairs of the organization. They maintain budgets, track expenditures, manage sponsorships, and ensure all financial activities are transparent, accurate, and aligned with the organization's goals.",
  'Co-Treasurer': "The Co-Treasurer supports the Treasurer in handling finances. They assist in budget planning, expense tracking, and financial reporting to ensure the organization remains financially healthy and accountable.",
};

const FlipCard = ({ member, index, positionColors, positionDescriptions }) => {
  const [expanded, setExpanded] = useState(false);
  const color = positionColors[member.position] || '#982598';
  const id = `card-${index}`;

  return (
    <>
      {/* GRID CARD */}
      <motion.div
        layoutId={id}
        className="flip-card-outer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: Math.floor(index / 4) * 0.1 + (index % 4) * 0.08 }}
        onClick={() => setExpanded(true)}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-shine-wrap">
          <div className="card-glow student-glow" />
          <div className="avatar-wrap">
            <img className="avatar" src={member.photo_url || getAvatarUrl(member.name, member.gender)} alt={member.name} />
          </div>
          <div className="student-body">
            <h3>{member.name}</h3>
            <span className="position-badge" style={{ background: `${color}18`, color, border: `1px solid ${color}44` }}>
              {member.position}
            </span>
            <div className="contact-info small">
              <a href={`mailto:${member.email}`} onClick={e => e.stopPropagation()}><Mail size={13} /><span>{member.email}</span></a>
              <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><Linkedin size={13} /><span>{member.linkedin}</span></a>
            </div>
            <p className="flip-hint">Click to learn role ↗</p>
          </div>
        </div>
      </motion.div>

      {/* EXPANDED MODAL */}
      {expanded && (
        <>
          <motion.div
            className="card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
          <div className="card-modal-wrap" onClick={() => setExpanded(false)}>
            <motion.div
              layoutId={id}
              className="card-modal"
              onClick={e => e.stopPropagation()}
              style={{ borderColor: `${color}55` }}
            >
              <button className="card-modal-close" onClick={() => setExpanded(false)}>✕</button>
              <div className="card-modal-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${color}44, transparent 65%)` }} />
              <div className="avatar-wrap modal-avatar">
                <img className="avatar" src={member.photo_url || getAvatarUrl(member.name, member.gender)} alt={member.name} />
              </div>
              <h3 className="modal-name">{member.name}</h3>
              <span className="position-badge modal-badge" style={{ background: `${color}22`, color, border: `1px solid ${color}66` }}>
                {member.position}
              </span>
              <div className="modal-divider" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              <p className="modal-desc">{positionDescriptions[member.position]}</p>
              <div className="contact-info modal-contact">
                <a href={`mailto:${member.email}`}><Mail size={15} /><span>{member.email}</span></a>
                <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer"><Linkedin size={15} /><span>{member.linkedin}</span></a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await getTeam();
        // Sort by level ascending
        const sorted = data.sort((a, b) => (a.level || 99) - (b.level || 99));
        setMembers(sorted);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouse = (e) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--sx', `${e.clientX - rect.left}px`);
      hero.style.setProperty('--sy', `${e.clientY - rect.top}px`);
    };
    hero.addEventListener('mousemove', handleMouse);
    return () => hero.removeEventListener('mousemove', handleMouse);
  }, []);

  // Split into levels
  const level1 = members.filter(m => m.level === 1);
  const level2 = members.filter(m => m.level === 2);
  const level3 = members.filter(m => m.level === 3);
  const level4 = members.filter(m => m.level === 4 || !m.level);

  // Group level 3 & 4 by department
  const groupByDept = (list) => {
    return list.reduce((acc, m) => {
      const dept = m.department || 'General';
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(m);
      return acc;
    }, {});
  };

  const coreByDept = groupByDept(level3);
  const volunteersByDept = groupByDept(level4);

  const positionColors = {
    'Chairperson': '#982598',
    'Vice Chair': '#7B1FA2',
    'Secretary': '#6A1B9A',
    'Treasurer': '#AD1457',
    'Technical Head': '#1565C0',
    'Creative Head': '#E65100',
    'Event Head': '#C2185B',
  };

  return (
    <div className="team-page">
      <section className="team-hero" ref={heroRef}>
        <div className="hero-spotlight" />
        <div className="team-hero-content">
          <h1 className="hero-heading">
            <span className="hero-line">Meet the <span className="gradient-text">Innovators</span></span>
            <span className="hero-line">Behind the Mission</span>
          </h1>
          <p>The dedicated team driving technology and leadership at IETE MIT Student Chapter.</p>
        </div>
      </section>

      {loading ? (
        <div style={{ padding: '100px 0', textAlign: 'center' }}><Loader2 className="spinner" size={40} color={G} /></div>
      ) : (
        <>
          {/* Level 1: Leadership */}
          {level1.length > 0 && (
            <section className="student-section">
              <div className="section-header">
                <h2 className="section-title">Leadership</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32 }}>
                {level1.map((m, i) => (
                  <FlipCard key={m.id} member={m} index={i} positionColors={positionColors} positionDescriptions={positionDescriptions} />
                ))}
              </div>
            </section>
          )}

          {/* Level 2: Vice Leadership */}
          {level2.length > 0 && (
            <section className="student-section" style={{ paddingTop: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
                {level2.map((m, i) => (
                  <FlipCard key={m.id} member={m} index={i + 10} positionColors={positionColors} positionDescriptions={positionDescriptions} />
                ))}
              </div>
            </section>
          )}

          {/* Level 3: Core Team by Departments */}
          <section className="student-section">
            <div className="section-header">
              <h2 className="section-title">Core Team</h2>
            </div>
            <div className="wing-columns">
              {Object.keys(coreByDept).map((dept, idx) => (
                <div key={dept} className="wing-column">
                  <h4 className="wing-title">{dept} Wing</h4>
                  <div className="wing-cards">
                    {coreByDept[dept].map((m, i) => (
                      <FlipCard key={m.id} member={m} index={i + idx * 20} positionColors={positionColors} positionDescriptions={positionDescriptions} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Level 4: Volunteers */}
          {level4.length > 0 && (
            <section className="student-section">
              <div className="section-header">
                <h2 className="section-title">Volunteers</h2>
              </div>
              <div className="wing-columns">
                {Object.keys(volunteersByDept).map((dept, idx) => (
                  <div key={dept} className="wing-column">
                    <h4 className="wing-title">{dept}</h4>
                    <div className="wing-cards">
                      {volunteersByDept[dept].map((m, i) => (
                        <FlipCard key={m.id} member={m} index={i + idx * 50} positionColors={positionColors} positionDescriptions={positionDescriptions} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
      <style>{`.spinner { animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Team;

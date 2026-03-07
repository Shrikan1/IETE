import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Mail, Linkedin, Users, Award, Calendar, ChevronDown } from 'lucide-react';
import { getTeam } from '../firebase/firestore';
import './Team.css';

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
            <img className="avatar" src={member.photoURL || getAvatarUrl(member.name, member.gender)} alt={member.name} />
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
                <img className="avatar" src={member.photoURL || getAvatarUrl(member.name, member.gender)} alt={member.name} />
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
  const heroRef = useRef(null);
  const [firestoreMembers, setFirestoreMembers] = useState(null);

  useEffect(() => {
    getTeam()
      .then((data) => { if (data.length > 0) setFirestoreMembers(data); })
      .catch(() => {}); // silently fall back to hardcoded data if Firebase not configured
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

  const headingWords1 = ['Meet', 'the'];
  const headingWords2 = ['Behind', 'the', 'Mission'];
  const stats = [
    { icon: Users, value: '28+', label: 'Members' },
    { icon: Award, value: '12+', label: 'Events' },
    { icon: Calendar, value: '3', label: 'Years Active' },
  ];

  const facultyMembers = [
    {
      name: 'Dr. Example HOD',
      position: 'Head of Department',
      email: 'hod.iete@mit.edu',
      linkedin: 'linkedin.com/in/example-hod',
      initials: 'EH',
      tag: 'HOD',
      gender: 'male',
    },
    {
      name: 'Prof. Example Coordinator',
      position: 'IETE Faculty Coordinator',
      email: 'coordinator.iete@mit.edu',
      linkedin: 'linkedin.com/in/example-coordinator',
      initials: 'EC',
      tag: 'Coordinator',
      gender: 'male',
    },
  ];

  const studentMembers = [
    { name: 'CHAITANYA MOHARE',    position: 'Chairperson',         gender: 'male'   },
    { name: 'SOHAM HARNE',         position: 'Co-Chairperson',      gender: 'male'   },
    { name: 'RUSHIKESH KHARCHAN',  position: 'Co-Chairperson',      gender: 'male'   },
    { name: 'INAYA KHAN',          position: 'Event Head',          gender: 'female' },
    { name: 'RUSHIKESH MUNDHE',    position: 'Event Head',          gender: 'male'   },
    { name: 'OM RAUT',             position: 'Co-Event Head',       gender: 'male'   },
    { name: 'ANUSHKA DESHMUKH',    position: 'Co-Event Head',       gender: 'female' },
    { name: 'SUSMIT KULKARNI',     position: 'Technical Head',      gender: 'male'   },
    { name: 'SHRIKANT DHOTRE',     position: 'Technical Head',      gender: 'male'   },
    { name: 'ABHIJEET GORE',       position: 'Co-Technical Head',   gender: 'male'   },
    { name: 'GARGI MORE',          position: 'Creative Head',       gender: 'female' },
    { name: 'SAHIL MAHADIK',       position: 'Creative Head',       gender: 'male'   },
    { name: 'PRACHI RAGUGURU',     position: 'Co-Creative Head',    gender: 'female' },
    { name: 'RAGINI GAJBHIYE',     position: 'Co-Creative Head',    gender: 'female' },
    { name: 'SANSKRUTI GHUGE',     position: 'Social Media Head',   gender: 'female' },
    { name: 'SHIVAM BADGUJAR',     position: 'Social Media Head',   gender: 'male'   },
    { name: 'NEHA GOLAIT',         position: 'Co-Social Media Head',gender: 'female' },
    { name: 'PRATIKSHA SARAF',     position: 'Co-Social Media Head',gender: 'female' },
    { name: 'VAIBHAV DALVI',       position: 'Sports Head',         gender: 'male'   },
    { name: 'RUDRAPRATAP GONDHALE',position: 'Sports Head',         gender: 'male'   },
    { name: 'SHEIKH SAHIL RAFIK',  position: 'Co-Sports Head',      gender: 'male'   },
    { name: 'KEDAR BALI',          position: 'Co-Sports Head',      gender: 'male'   },
    { name: 'SIDDHESH KULKARNI',   position: 'Secretary',           gender: 'male'   },
    { name: 'NEHA DAHIHANDE',      position: 'Secretary',           gender: 'female' },
    { name: 'SANIKA PATIL',        position: 'Treasurer',           gender: 'female' },
    { name: 'RAHIL KHAN',          position: 'Treasurer',           gender: 'male'   },
    { name: 'SHIVAM AMBILWADE',    position: 'Co-Treasurer',        gender: 'male'   },
    { name: 'RENUKA JOSHI',        position: 'Co-Treasurer',        gender: 'female' },
  ].map((m) => ({
    ...m,
    initials: m.name.split(' ').map((w) => w[0]).join('').slice(0, 2),
    email: `${m.name.toLowerCase().replace(/\s+/g, '.')}@iete-mit.com`,
    linkedin: `linkedin.com/in/${m.name.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  // Use Firestore members (from admin) if available, otherwise fall back to hardcoded
  const displayMembers = firestoreMembers
    ? firestoreMembers.map((m) => ({
        ...m,
        initials: m.name.split(' ').map((w) => w[0]).join('').slice(0, 2),
        linkedin: m.linkedin || `linkedin.com/in/${m.name.toLowerCase().replace(/\s+/g, '-')}`,
        gender: 'male', // default (Firestore doesn't store gender)
      }))
    : studentMembers;

  const positionColors = {
    'Chairperson': '#982598',
    'Co-Chairperson': '#7B1FA2',
    'Event Head': '#C2185B',
    'Co-Event Head': '#E91E8C',
    'Technical Head': '#1565C0',
    'Co-Technical Head': '#1976D2',
    'Creative Head': '#E65100',
    'Co-Creative Head': '#F57C00',
    'Social Media Head': '#00838F',
    'Co-Social Media Head': '#00ACC1',
    'Sports Head': '#2E7D32',
    'Co-Sports Head': '#43A047',
    'Secretary': '#6A1B9A',
    'Treasurer': '#AD1457',
    'Co-Treasurer': '#D81B60',
  };

  return (
    <div className="team-page">

      {/* ── HERO ── */}
      <section className="team-hero" ref={heroRef}>
        <div className="hero-spotlight" />
        <div className="hero-mesh" />
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
        </div>
        <div className="particles">
          {[...Array(10)].map((_, i) => <div key={i} className="particle" />)}
        </div>

        <motion.div
          className="team-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="hero-heading">
            <span className="hero-line">
              {headingWords1.map((word, i) => (
                <motion.span
                  key={i}
                  className="word"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: 'easeOut' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
              <motion.span
                className="word gradient-text"
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.44, duration: 0.55, ease: 'easeOut' }}
              >
                Innovators
              </motion.span>
            </span>
            <span className="hero-line">
              {headingWords2.map((word, i) => (
                <motion.span
                  key={i}
                  className="word"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.56 + i * 0.12, duration: 0.55, ease: 'easeOut' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </span>
          </h1>

          <p>
            Passionate students and faculty driving innovation, events, and
            technology initiatives within the IETE community.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              <span>Join Our Community</span>
            </button>
            <button className="btn-secondary">
              <span>Contact Team</span>
            </button>
          </div>

          <div className="hero-stats">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <Icon size={18} className="stat-icon" />
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={24} color="rgba(255,255,255,0.7)" />
        </motion.div>
      </section>

      {/* ── FACULTY ── */}
      <section className="faculty-section">
        <motion.div className="section-header" {...fadeUp()}>
          <span className="section-eyebrow">Leadership</span>
          <h2 className="section-title">Faculty Mentors</h2>
          <p className="section-subtitle">
            The guiding pillars of IETE MIT Student Chapter
          </p>
        </motion.div>

        <div className="faculty-grid">
          {facultyMembers.map((member, i) => (
            <motion.div
              key={i}
              className="faculty-card"
              {...fadeUp(i * 0.18)}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#e491c9"
                glarePosition="all"
                scale={1.03}
                style={{ borderRadius: '1.5rem', width: '100%' }}
              >
              <div className="card-glow" />
              <div className="faculty-top">
                <div className="avatar-ring">
                  <img
                    className="avatar-large"
                    src={member.photoURL || getAvatarUrl(member.name, member.gender)}
                    alt={member.name}
                  />
                </div>
                <span className="role-tag">{member.tag}</span>
              </div>
              <div className="faculty-body">
                <h3>{member.name}</h3>
                <p className="position">{member.position}</p>
                <div className="divider" />
                <div className="contact-info">
                  <a href={`mailto:${member.email}`}>
                    <Mail size={16} />
                    <span>{member.email}</span>
                  </a>
                  <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={16} />
                    <span>{member.linkedin}</span>
                  </a>
                </div>
              </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STUDENTS ── */}
      <section className="student-section">
        <motion.div className="section-header" {...fadeUp()}>
          <span className="section-eyebrow">Core Team</span>
          <h2 className="section-title">Student Members</h2>
          <p className="section-subtitle">
            The passionate minds building IETE MIT&apos;s future
          </p>
        </motion.div>

        <div className="student-grid">
          {displayMembers.map((member, i) => (
            <FlipCard
              key={i}
              member={member}
              index={i}
              positionColors={positionColors}
              positionDescriptions={positionDescriptions}
            />
          ))}
        </div>
      </section>


    </div>
  );
};

export default Team;

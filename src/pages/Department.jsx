import { motion } from 'framer-motion';

const departments = [
  { name: 'Electronics & Telecommunication', code: 'EXTC', desc: 'Covers analog/digital electronics, signal processing, communication systems, and embedded design.' },
  { name: 'Computer Engineering', code: 'COMP', desc: 'Focuses on software development, algorithms, networks, AI, and full-stack technologies.' },
  { name: 'Information Technology', code: 'IT', desc: 'Emphasises web technologies, databases, cloud computing, and information systems.' },
  { name: 'Electrical Engineering', code: 'ELEC', desc: 'Studies power systems, machines, control systems, and energy conversion.' },
  { name: 'Mechanical Engineering', code: 'MECH', desc: 'Encompasses thermodynamics, manufacturing, robotics, and CAD/CAM design.' },
  { name: 'Civil Engineering', code: 'CIVIL', desc: 'Covers structural analysis, construction management, environmental, and transportation engineering.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Department() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d0d1a 0%, #15173D 60%, #1f0a3d 100%)', paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* Heading */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E491C9', display: 'block', marginBottom: '0.75rem' }}>
            IETE MIT Student Chapter
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: 0 }}>
            Our <span style={{ background: 'linear-gradient(90deg, #982598, #E491C9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Departments</span>
          </h1>
          <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '1rem auto 0', lineHeight: 1.7, fontSize: '0.95rem' }}>
            IETE MIT brings together students across engineering disciplines to collaborate, innovate, and grow together.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {departments.map((dept, i) => (
            <motion.div key={dept.code} {...fadeUp(i * 0.08)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(228,145,201,0.15)',
                borderRadius: 16,
                padding: '1.8rem',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.3s, transform 0.3s',
                cursor: 'default',
              }}
              whileHover={{ y: -6, borderColor: 'rgba(152,37,152,0.5)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'linear-gradient(135deg, #982598, #E491C9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em', flexShrink: 0,
                }}>
                  {dept.code}
                </div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{dept.name}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{dept.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

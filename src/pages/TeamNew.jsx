import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

const Team = () => {
  const facultyMembers = [
    {
      name: "Dr. Example HOD",
      position: "Head of Department", 
      email: "hod.iete@mit.edu",
      linkedin: "linkedin.com/in/example-hod"
    },
    {
      name: "Prof. Example Coordinator",
      position: "IETE Faculty Coordinator",
      email: "coordinator.iete@mit.edu", 
      linkedin: "linkedin.com/in/example-coordinator"
    }
  ];

  const studentMembers = [
    { name: "CHAITANYA MOHARE", position: "Chairperson" },
    { name: "SOHAM HARNE", position: "Co-Chairperson" },
    { name: "RUSHIKESH KHARCHAN", position: "Co-Chairperson" },
    { name: "INAYA KHAN", position: "Event Head" },
    { name: "RUSHIKESH MUNDHE", position: "Event Head" }
  ].map(member => ({
    ...member,
    email: `${member.name.toLowerCase().replace(/\s+/g, '.')}@iete-mit.com`,
    linkedin: `linkedin.com/in/${member.name.toLowerCase().replace(/\s+/g, '-')}`
  }));

  return (
    <div className="min-h-screen bg-[#F1E9E9]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#982598] to-[#E491C9] overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-20 w-72 h-72 bg-[#E491C9] rounded-full opacity-30 blur-3xl"
          />
          <motion.div 
            animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#15173D] rounded-full opacity-20 blur-3xl"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl px-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'MM Poly Variable, serif' }}>
            IETE MIT Student Chapter Team
          </h1>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Meet the passionate students and faculty members driving innovation, events, and technology initiatives within the IETE community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#982598] rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
              Join Our Community
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#982598] transition-all">
              Contact Team
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent to-white"></div>
        </motion.div>
      </section>

      {/* Faculty Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#15173D] text-center mb-16"
          style={{ fontFamily: 'MM Poly Variable, serif' }}
        >
          Faculty Leadership
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {facultyMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-[#982598] hover:shadow-2xl hover:shadow-[#982598]/20 transition-all duration-300"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-[#982598] to-[#E491C9] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-lg">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-[#15173D] text-center mb-2">{member.name}</h3>
              <p className="text-[#982598] font-semibold text-center mb-6">{member.position}</p>
              <div className="space-y-3">
                <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#982598] transition-colors">
                  <Mail size={18} />
                  <span className="text-sm">{member.email}</span>
                </a>
                <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#982598] transition-colors">
                  <Linkedin size={18} />
                  <span className="text-sm">{member.linkedin}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Student Team Section */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#15173D] text-center mb-16"
          style={{ fontFamily: 'MM Poly Variable, serif' }}
        >
          Student Team
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-[#982598] hover:shadow-xl hover:shadow-[#982598]/15 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#982598] to-[#E491C9] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-md">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-[#15173D] text-center mb-1">{member.name}</h3>
              <p className="text-[#982598] font-semibold text-center mb-4 text-sm">{member.position}</p>
              <div className="space-y-2">
                <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#982598] transition-colors">
                  <Mail size={14} />
                  <span className="text-xs">{member.email}</span>
                </a>
                <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#982598] transition-colors">
                  <Linkedin size={14} />
                  <span className="text-xs">{member.linkedin}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-8 max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#982598] to-[#E491C9] p-12 rounded-3xl text-center shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'MM Poly Variable, serif' }}>
            Become a Part of the IETE Leadership
          </h2>
          <button className="px-10 py-4 bg-white text-[#982598] rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Join the Team
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Team;

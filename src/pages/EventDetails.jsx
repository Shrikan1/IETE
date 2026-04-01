import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocument, getSubEventsByParent } from '../supabase/db';
import { ChevronLeft, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [subEvents, setSubEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const evData = await getDocument('events', id);
        if (evData) {
          setEvent(evData);
          const subData = await getSubEventsByParent(id);
          setSubEvents(subData);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#08CB00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <button onClick={() => navigate('/events')} className="flex items-center gap-2 text-[#08CB00] hover:underline">
          <ChevronLeft size={20} /> Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20">
      {/* Banner */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-10 left-[8vw]">
          <button onClick={() => navigate('/events')} className="flex items-center gap-2 text-[#08CB00] mb-4 hover:translate-x-[-4px] transition-transform">
            <ChevronLeft size={20} /> Back to Events
          </button>
          <h1 className="text-4xl md:text-6xl font-black">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-[8vw] mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-[#08CB00]">About the Event</h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">{event.description}</p>
            
            {subEvents.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 text-[#08CB00]">Sub-Events Schedule</h2>
                <div className="space-y-6">
                  {subEvents.map((sub, idx) => (
                    <motion.div 
                      key={sub.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-[#08CB00]/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{sub.title}</h3>
                          <p className="text-gray-400 text-sm mb-4">{sub.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {sub.date}</span>
                          </div>
                        </div>
                        {sub.gallery?.length > 0 && (
                          <button 
                            onClick={() => navigate(`/gallery/${sub.id}`)}
                            className="text-xs font-bold text-[#08CB00] border border-[#08CB00]/30 px-4 py-2 rounded-full hover:bg-[#08CB00] hover:text-black transition-all whitespace-nowrap"
                          >
                            View Gallery
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#111] border border-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Event Details</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#08CB00]" size={20} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#08CB00]" size={20} />
                  <span>MIT Campus, Pune</span>
                </div>
                {event.seats && (
                  <div className="flex items-center gap-3">
                    <Users className="text-[#08CB00]" size={20} />
                    <span>{event.seats} Total Seats</span>
                  </div>
                )}
              </div>
              
              {event.type === 'upcoming' && event.register_link && (
                <button 
                  onClick={() => window.open(event.register_link, '_blank')}
                  className="w-full mt-8 bg-[#08CB00] text-black font-black py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  Register Now <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

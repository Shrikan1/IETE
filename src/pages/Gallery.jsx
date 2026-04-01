import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Maximize2, X, Download } from 'lucide-react';
import { getGallery } from '../supabase/db';
import './Gallery.css';

const Gallery = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGallery()
      .then((data) => {
        // Find the specific gallery entry that matches the event title/id
        // Improved lookup: check ID, event_name, or slugified event_name
        const entry = data.find(item => 
          String(item.id) === String(eventId) || 
          item.event_name?.toLowerCase() === eventId?.toLowerCase() ||
          item.event_name?.toLowerCase().replace(/\s+/g, '-') === eventId?.toLowerCase()
        );
        setGalleryData(entry);
      })
      .catch(err => console.error("Error loading gallery data:", err))
      .finally(() => setLoading(false));
  }, [eventId]);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <div className="gallery-loader">
        <div className="loader-spinner" />
      </div>
    );
  }

  if (!galleryData || !galleryData.images || galleryData.images.length === 0) {
    return (
      <div className="gallery-empty">
        <motion.div {...fadeUp} className="empty-content">
          <h2>No Gallery Found</h2>
          <p>We haven't added photos for this event yet. Check back soon!</p>
          <button onClick={() => navigate('/events')} className="back-btn">
            <ChevronLeft size={20} /> Back to Events
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <motion.div 
          className="gallery-nav"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button onClick={() => navigate('/events')} className="nav-back">
            <ChevronLeft size={24} />
          </button>
          <div className="nav-info">
            <span className="event-year">{galleryData.year || '2024'}</span>
            <h1 className="event-title">{galleryData.event_name}</h1>
          </div>
        </motion.div>
      </div>

      <section className="gallery-section">
        <div className="gallery-grid">
          {galleryData.images.map((img, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImg(img)}
            >
              <img src={img} alt={`Event photo ${index + 1}`} loading="lazy" />
              <div className="item-overlay">
                <Maximize2 size={24} color="#fff" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-lightbox" onClick={() => setSelectedImg(null)}>
                <X size={24} />
              </button>
              <img src={selectedImg} alt="Enlarged view" />
              <a href={selectedImg} download target="_blank" rel="noreferrer" className="download-lightbox">
                <Download size={20} /> Save Image
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

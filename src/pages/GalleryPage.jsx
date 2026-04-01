import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getDocument } from '../supabase/db';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const G = '#08CB00';

export default function GalleryPage() {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const subId = searchParams.get('sub');
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (subId) {
          const sub = await getDocument('sub_events', subId);
          if (sub) {
            setTitle(sub.title);
            setImages(sub.gallery || []);
          }
        } else {
          const ev = await getDocument('events', eventId);
          if (ev) {
            setTitle(ev.title);
            setImages(ev.gallery || []);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [eventId, subId]);

  const openLightbox = (i) => setSelectedIdx(i);
  const next = () => setSelectedIdx((selectedIdx + 1) % images.length);
  const prev = () => setSelectedIdx((selectedIdx - 1 + images.length) % images.length);

  if (loading) return <div style={centerStyle}><Loader2 className="spinner" size={40} color={G} /></div>;

  return (
    <div className="gallery-page" style={{ background: '#050505', minHeight: '100vh', color: '#fff', paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>
          <ArrowLeft size={16} /> Back
        </button>

        <h1 style={titleStyle}>{title} <span style={{ color: G }}>Gallery</span></h1>
        
        {images.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 100 }}>No images found in this gallery.</p>
        ) : (
          <div style={masonryGrid}>
            {images.map((url, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: i * 0.05 }}
                style={imgWrapper}
                onClick={() => openLightbox(i)}
              >
                <img src={url} alt={`Gallery ${i}`} style={galleryImg} />
                <div style={imgOverlay} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={lightboxOverlay}
            onClick={() => setSelectedIdx(null)}
          >
            <button style={closeBtn} onClick={() => setSelectedIdx(null)}><X size={24} /></button>
            <button style={navBtn('left')} onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft size={32} /></button>
            <button style={navBtn('right')} onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight size={32} /></button>
            
            <motion.img 
              key={selectedIdx}
              src={images[selectedIdx]} 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              style={lightboxImg}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .spinner { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const centerStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff' };
const backBtnStyle = { background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 14, fontWeight: 600 };
const titleStyle = { fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, marginBottom: 48, letterSpacing: '-0.02em' };
const masonryGrid = { columnCount: 3, columnGap: 24, breakInside: 'avoid' };
const imgWrapper = { position: 'relative', marginBottom: 24, borderRadius: 16, overflow: 'hidden', cursor: 'zoom-in', background: 'rgba(255,255,255,0.05)' };
const galleryImg = { width: '100%', display: 'block', transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' };
const imgOverlay = { position: 'absolute', inset: 0, background: 'rgba(8,203,0,0.1)', opacity: 0, transition: 'opacity 0.3s' };
const lightboxOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 };
const lightboxImg = { maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 0 50px rgba(0,0,0,1)' };
const closeBtn = { position: 'absolute', top: 30, right: 30, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.6 };
const navBtn = (dir) => ({ position: 'absolute', [dir]: 30, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.4, padding: 20 });

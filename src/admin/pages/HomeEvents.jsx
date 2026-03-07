import { useEffect, useRef, useState } from 'react';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';
import { Plus, Pencil, Trash2, X, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#08CB00';
const INPUT_STYLE = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(8,203,0,0.03)',
  border: '1px solid rgba(8,203,0,0.15)',
  borderRadius: 10, color: '#fff',
  padding: '10px 12px', fontSize: 13,
  fontFamily: 'Inter, sans-serif', outline: 'none',
};
const EMPTY = { title: '', date: '', description: '', imageURL: '', registerLink: '' };

export default function HomeEvents() {
  const [events, setEvents]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [modal, setModal]               = useState(null);
  const [form, setForm]                 = useState(EMPTY);
  const [editId, setEditId]             = useState(null);
  const [saving, setSaving]             = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [deleteId, setDeleteId]         = useState(null);
  const fileInputRef = useRef(null);

  async function load() { setLoading(true); setEvents(await getEvents()); setLoading(false); }
  useEffect(() => { load(); }, []);

  function openAdd()   { setForm(EMPTY); setEditId(null); setUploadProgress(null); setModal('add'); }
  function openEdit(ev) {
    setForm({ title: ev.title, date: ev.date, description: ev.description, imageURL: ev.imageURL, registerLink: ev.registerLink });
    setEditId(ev.id); setUploadProgress(null); setModal('edit');
  }

  async function handleImageUpload(file) {
    if (!file) return;
    const url = await uploadFile(file, `events/${Date.now()}_${file.name}`, setUploadProgress);
    setForm(f => ({ ...f, imageURL: url })); setUploadProgress(null);
  }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await addEvent(form); else await updateEvent(editId, form);
      await load(); setModal(null);
    } finally { setSaving(false); }
  }

  async function handleDelete(id) { setDeleteId(id); await deleteEvent(id); await load(); setDeleteId(null); }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>Home Events</h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '4px 0 0' }}>Manage featured events shown on the homepage</p>
        </div>
        <button onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#06a300,#08CB00)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 800, fontSize: 13, padding: '10px 18px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0 4px 16px rgba(8,203,0,0.25)' }}>
          <Plus size={15} /> Add Event
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}><Loader2 size={28} color={G} style={{ animation: 'spin .8s linear infinite' }} /></div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>No events yet. Add your first event!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {events.map(ev => (
            <motion.div key={ev.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              style={{ background: 'rgba(8,203,0,0.03)', border: '1px solid rgba(8,203,0,0.1)', borderRadius: 16, overflow: 'hidden' }}>
              {ev.imageURL && <img src={ev.imageURL} alt={ev.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
              <div style={{ padding: '14px 16px 16px' }}>
                <p style={{ fontSize: 11, color: G, fontWeight: 600, marginBottom: 4 }}>{ev.date}</p>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ev.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.5, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ev.description}</p>
                {ev.registerLink && <a href={ev.registerLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: G }}>Register Link ↗</a>}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => openEdit(ev)} style={aBtnStyle(false)}><Pencil size={13} /> Edit</button>
                  <button onClick={() => handleDelete(ev.id)} disabled={deleteId === ev.id} style={aBtnStyle(true)}>
                    {deleteId === ev.id ? <Loader2 size={13} style={{ animation: 'spin .8s linear infinite' }} /> : <Trash2 size={13} />} Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', padding: 16 }}>
            <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.93 }}
              style={{ background: '#090909', border: '1px solid rgba(8,203,0,0.18)', borderRadius: 20, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', padding: 28, boxShadow: '0 32px 64px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 800, margin: 0 }}>{modal === 'add' ? 'Add Event' : 'Edit Event'}</h2>
                <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', display: 'flex', padding: 4 }}><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Fld label="Title" required><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={INPUT_STYLE} placeholder="Event name" /></Fld>
                <Fld label="Date"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={INPUT_STYLE} /></Fld>
                <Fld label="Description"><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...INPUT_STYLE, resize: 'vertical' }} placeholder="Short description…" /></Fld>
                <Fld label="Register Link"><input value={form.registerLink} onChange={e => setForm(f => ({ ...f, registerLink: e.target.value }))} style={INPUT_STYLE} placeholder="https://…" /></Fld>
                <Fld label="Cover Image">
                  {form.imageURL && <img src={form.imageURL} alt="preview" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />}
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: '1px dashed rgba(8,203,0,0.35)', borderRadius: 8, color: G, padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                    <Upload size={13} /> {form.imageURL ? 'Replace image' : 'Upload image'}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e.target.files[0])} />
                  {uploadProgress !== null && <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginTop: 6 }}><div style={{ height: 4, background: G, borderRadius: 4, width: `${uploadProgress}%`, transition: 'width 0.3s' }} /></div>}
                </Fld>
                <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
                  <button type="button" onClick={() => setModal(null)} style={cancelStyle}>Cancel</button>
                  <button type="submit" disabled={saving || uploadProgress !== null} style={saveStyle(saving || uploadProgress !== null)}>
                    {saving ? <><Loader2 size={13} style={{ animation: 'spin .8s linear infinite' }} /> Saving…</> : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

const aBtnStyle = (danger) => ({
  flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
  background: 'none', border: danger ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(8,203,0,0.25)',
  borderRadius: 8, color: danger ? '#f87171' : '#08CB00', fontSize: 12, fontWeight: 600,
  padding: '7px 0', cursor: 'pointer', fontFamily: 'Inter,sans-serif',
});
const cancelStyle = { flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 13, padding: '10px 0', cursor: 'pointer', fontFamily: 'Inter,sans-serif' };
const saveStyle = (dis) => ({ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: dis ? 'rgba(8,203,0,0.25)' : 'linear-gradient(135deg,#06a300,#08CB00)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 800, fontSize: 13, padding: '10px 0', cursor: dis ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif' });

function Fld({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter,sans-serif' }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

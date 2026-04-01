import { useEffect, useRef, useState } from 'react';
import { getEvents, addEvent, updateEvent, deleteEvent, getSubEventsByParent, addSubEvent, updateSubEvent, deleteSubEvent } from '../../supabase/db';
import { Calendar, Layers } from 'lucide-react';
import { uploadFile } from '../../supabase/storage';
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
const EMPTY = { 
  title: '', 
  date: '', 
  description: '', 
  image_url: '', 
  register_link: '', 
  type: 'upcoming', 
  has_sub_events: false, 
  dept: '',
  registered: 0,
  seats: 0,
  gallery: [] 
};
const EMPTY_SUB = { title: '', description: '', date: '', gallery: [] };

export default function HomeEvents() {
  const [events, setEvents]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [modal, setModal]               = useState(null);
  const [form, setForm]                 = useState(EMPTY);
  const [editId, setEditId]             = useState(null);
  const [saving, setSaving]             = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [deleteId, setDeleteId]         = useState(null);
  
  // Sub-event states
  const [subModal, setSubModal]         = useState(null); // 'manage', 'add', 'edit'
  const [subEvents, setSubEvents]       = useState([]);
  const [subForm, setSubForm]           = useState(EMPTY_SUB);
  const [editSubId, setEditSubId]       = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [subLoading, setSubLoading]     = useState(false);

  const fileInputRef = useRef(null);

  async function load() { 
    setLoading(true); 
    try {
      setEvents(await getEvents()); 
    } catch (err) {
      console.error("Error loading events:", err);
    } finally {
      setLoading(false); 
    }
  }
  useEffect(() => { load(); }, []);

  function openAdd()   { setForm(EMPTY); setEditId(null); setUploadProgress(null); setModal('add'); }
  function openEdit(ev) {
    setForm({ 
      title: ev.title || '', 
      date: ev.date || '', 
      description: ev.description || '', 
      image_url: ev.image_url || '', 
      register_link: ev.register_link || '', 
      type: ev.type || 'upcoming', 
      has_sub_events: !!ev.has_sub_events, 
      dept: ev.dept || '',
      registered: ev.registered || 0,
      seats: ev.seats || 0,
      gallery: ev.gallery || [] 
    });
    setEditId(ev.id); setUploadProgress(null); setModal('edit');
  }

  async function handleImageUpload(file) {
    if (!file) return;
    const url = await uploadFile(file, `events/${Date.now()}_${file.name}`, setUploadProgress);
    setForm(f => ({ ...f, image_url: url })); setUploadProgress(null);
  }

  async function handleGalleryUpload(files) {
    if (!files || files.length === 0) return;
    setUploadProgress(0);
    const newUrls = [];
    for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i], `events/gallery/${Date.now()}_${files[i].name}`, (p) => {
            setUploadProgress(Math.round(((i + (p / 100)) / files.length) * 100));
        });
        newUrls.push(url);
    }
    setForm(f => ({ ...f, gallery: [...(f.gallery || []), ...newUrls] }));
    setUploadProgress(null);
  }

  function removeGalleryImage(index) {
    setForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== index) }));
  }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    try {
      if (modal === 'add') await addEvent(form); else await updateEvent(editId, form);
      await load(); setModal(null);
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Failed to save event. Check console for details.");
    } finally { setSaving(false); }
  }

  async function handleDelete(id) { setDeleteId(id); await deleteEvent(id); await load(); setDeleteId(null); }

  // Sub-event functions
  async function openSubManage(ev) {
    setSelectedParent(ev);
    setSubLoading(true);
    setSubModal('manage');
    setSubEvents(await getSubEventsByParent(ev.id));
    setSubLoading(false);
  }

  function openSubAdd() { setSubForm(EMPTY_SUB); setEditSubId(null); setSubModal('add'); }
  function openSubEdit(s) { setSubForm({ ...s }); setEditSubId(s.id); setSubModal('edit'); }

  async function handleSubSave(e) {
    e.preventDefault(); setSaving(true);
    try {
      if (subModal === 'add') await addSubEvent({ ...subForm, event_id: selectedParent.id });
      else await updateSubEvent(editSubId, subForm);
      setSubEvents(await getSubEventsByParent(selectedParent.id));
      setSubModal('manage');
    } finally { setSaving(false); }
  }

  async function handleSubGalleryUpload(files) {
    if (!files || files.length === 0) return;
    setUploadProgress(0);
    const newUrls = [];
    for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i], `events/sub/gallery/${Date.now()}_${files[i].name}`, (p) => {
            setUploadProgress(Math.round(((i + (p / 100)) / files.length) * 100));
        });
        newUrls.push(url);
    }
    setSubForm(f => ({ ...f, gallery: [...(f.gallery || []), ...newUrls] }));
    setUploadProgress(null);
  }

  function removeSubGalleryImage(index) {
    setSubForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== index) }));
  }

  async function handleSubDelete(id) {
    if (!window.confirm('Delete sub-event?')) return;
    await deleteSubEvent(id);
    setSubEvents(await getSubEventsByParent(selectedParent.id));
  }

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
              {ev.image_url && <img src={ev.image_url} alt={ev.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
              <div style={{ padding: '14px 16px 16px' }}>
                <p style={{ fontSize: 11, color: G, fontWeight: 600, marginBottom: 4 }}>{ev.date}</p>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ev.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.5, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ev.description}</p>
                {ev.register_link && <a href={ev.register_link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: G }}>Register Link ↗</a>}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => openEdit(ev)} style={aBtnStyle(false)}><Pencil size={13} /> Edit</button>
                  {ev.has_sub_events && (
                    <button onClick={() => openSubManage(ev)} style={{ ...aBtnStyle(false), color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Layers size={13} /> Subs
                    </button>
                  )}
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
                <div style={{ display: 'flex', gap: 14 }}>
                  <Fld label="Type" style={{ flex: 1 }}>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={INPUT_STYLE}>
                      <option value="upcoming">Upcoming</option>
                      <option value="conducted">Conducted</option>
                    </select>
                  </Fld>
                  <Fld label="Sub-Events" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 40 }}>
                      <input type="checkbox" checked={form.has_sub_events} onChange={e => setForm(f => ({ ...f, has_sub_events: e.target.checked }))} style={{ width: 18, height: 18, accentColor: G }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Enable Sub-Events</span>
                    </div>
                  </Fld>
                </div>

                <div style={{ display: 'flex', gap: 14 }}>
                  <Fld label="Department" style={{ flex: 1 }}><input value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} style={INPUT_STYLE} placeholder="IETE / Technical / etc." /></Fld>
                  <Fld label="Registered" style={{ width: 80 }}><input type="number" value={form.registered} onChange={e => setForm(f => ({ ...f, registered: parseInt(e.target.value)||0 }))} style={INPUT_STYLE} /></Fld>
                  <Fld label="Total Seats" style={{ width: 100 }}><input type="number" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: parseInt(e.target.value)||0 }))} style={INPUT_STYLE} /></Fld>
                </div>

                <Fld label="Title" required><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={INPUT_STYLE} placeholder="Event name" /></Fld>
                <Fld label="Date"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={INPUT_STYLE} /></Fld>
                <Fld label="Description"><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...INPUT_STYLE, resize: 'vertical' }} placeholder="Short description…" /></Fld>
                <Fld label="Register Link"><input value={form.register_link} onChange={e => setForm(f => ({ ...f, register_link: e.target.value }))} style={INPUT_STYLE} placeholder="https://…" /></Fld>
                
                <Fld label="Cover Image">
                  {form.image_url && <img src={form.image_url} alt="preview" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />}
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: '1px dashed rgba(8,203,0,0.35)', borderRadius: 8, color: G, padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                    <Upload size={13} /> {form.image_url ? 'Replace image' : 'Upload image'}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e.target.files[0])} />
                </Fld>

                <Fld label="Gallery Images">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8, marginBottom: 8 }}>
                    {form.gallery?.map((url, i) => (
                      <div key={i} style={{ position: 'relative', height: 60, borderRadius: 6, overflow: 'hidden' }}>
                        <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button type="button" onClick={() => removeGalleryImage(i)} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', color: '#fff', padding: 2, cursor: 'pointer' }}><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => document.getElementById('gallery-upload').click()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: '1px dashed rgba(8,203,0,0.35)', borderRadius: 8, color: G, padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                    <Plus size={13} /> Add Gallery Images
                  </button>
                  <input id="gallery-upload" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleGalleryUpload(e.target.files)} />
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

      <AnimatePresence>
        {subModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', padding: 16 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              style={{ background: '#090909', border: '1px solid rgba(8,203,0,0.2)', borderRadius: 24, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', padding: 32, boxShadow: '0 40px 80px rgba(0,0,0,0.9)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                  <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: 0 }}>
                    {subModal === 'manage' ? `Manage Subs: ${selectedParent?.title}` : subModal === 'add' ? 'Add Sub-Event' : 'Edit Sub-Event'}
                  </h2>
                </div>
                <button onClick={() => setSubModal(subModal === 'manage' ? null : 'manage')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}><X size={20} /></button>
              </div>

              {subModal === 'manage' ? (
                <div>
                  {subLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}><Loader2 size={24} color={G} className="spinner" /></div>
                  ) : subEvents.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.2)' }}>
                      <p>No sub-events found.</p>
                      <button onClick={openSubAdd} style={{ ...saveStyle(false), maxWidth: 160, marginTop: 16 }}>+ Add Sub-Event</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {subEvents.map(s => (
                        <div key={s.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: 14 }}>{s.title}</h4>
                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: 0 }}>{s.date}</p>
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => openSubEdit(s)} style={iconBtnStyle}><Pencil size={12} /></button>
                            <button onClick={() => handleSubDelete(s.id)} style={{ ...iconBtnStyle, color: '#f87171' }}><Trash2 size={12} /></button>
                          </div>
                        </div>
                      ))}
                      <button onClick={openSubAdd} style={{ ...saveStyle(false), marginTop: 12 }}>+ Add New Sub-Event</button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                   <Fld label="Sub-Event Title" required><input required value={subForm.title} onChange={e => setSubForm(f => ({ ...f, title: e.target.value }))} style={INPUT_STYLE} placeholder="e.g. Inauguration" /></Fld>
                   <Fld label="Description"><textarea rows={3} value={subForm.description} onChange={e => setSubForm(f => ({ ...f, description: e.target.value }))} style={{ ...INPUT_STYLE, resize: 'vertical' }} /></Fld>
                   <Fld label="Time/Date"><input value={subForm.date} onChange={e => setSubForm(f => ({ ...f, date: e.target.value }))} style={INPUT_STYLE} placeholder="10:00 AM - 12:00 PM" /></Fld>
                   
                   <Fld label="Gallery Images">
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: 6, marginBottom: 8 }}>
                       {subForm.gallery?.map((url, i) => (
                         <div key={i} style={{ position: 'relative', height: 50, borderRadius: 6, overflow: 'hidden' }}>
                           <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                           <button type="button" onClick={() => removeSubGalleryImage(i)} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', color: '#fff', padding: 2, cursor: 'pointer' }}><X size={8} /></button>
                         </div>
                       ))}
                     </div>
                     <button type="button" onClick={() => document.getElementById('sub-gallery-upload').click()} style={uploadBtnStyle}>
                       <Plus size={12} /> Add Images
                     </button>
                     <input id="sub-gallery-upload" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleSubGalleryUpload(e.target.files)} />
                     {uploadProgress !== null && <div style={progBg}><div style={{ ...progFill, width: `${uploadProgress}%` }} /></div>}
                   </Fld>

                   <div style={{ display: 'flex', gap: 12, paddingTop: 10 }}>
                     <button type="button" onClick={() => setSubModal('manage')} style={cancelStyle}>Back</button>
                     <button type="submit" disabled={saving} style={saveStyle(saving)}>
                       {saving ? <Loader2 size={14} className="spinner" /> : 'Save Sub-Event'}
                     </button>
                   </div>
                </form>
              )}
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

function Fld({ label, required, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter,sans-serif' }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}
const iconBtnStyle = { background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8, color: G, padding: 8, cursor: 'pointer', display: 'flex' };
const uploadBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: '1px dashed rgba(8,203,0,0.35)', borderRadius: 8, color: G, padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' };
const progBg = { width: '100%', height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginTop: 6 };
const progFill = { height: 4, background: G, borderRadius: 4, transition: 'width 0.3s' };

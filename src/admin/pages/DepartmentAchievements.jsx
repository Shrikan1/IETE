import { useEffect, useRef, useState } from 'react';
import { getAchievements, addAchievement, updateAchievement, deleteAchievement, getDepartments } from '../../supabase/db';
import { uploadFile } from '../../supabase/storage';
import { Plus, Pencil, Trash2, X, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#08CB00';
const INPUT_STYLE = { width: '100%', boxSizing: 'border-box', background: 'rgba(8,203,0,0.03)', border: '1px solid rgba(8,203,0,0.15)', borderRadius: 10, color: '#fff', padding: '10px 12px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' };
const EMPTY = { title: '', description: '', image_url: '', video_url: '', year: '', dept_id: '' };

export default function Departmentachievements() {
  const [items, setItems]               = useState([]);
  const [depts, setDepts]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [modal, setModal]               = useState(null);
  const [form, setForm]                 = useState(EMPTY);
  const [editId, setEditId]             = useState(null);
  const [saving, setSaving]             = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [deleteId, setDeleteId]         = useState(null);
  const fileRef = useRef(null);

  async function load() { 
    setLoading(true); 
    try {
      const [a, d] = await Promise.all([getAchievements(), getDepartments()]);
      setItems(a || []);
      setDepts(d || []);
    } catch (err) {
      console.error("Error loading achievements:", err);
    } finally {
      setLoading(false); 
    }
  }
  useEffect(() => { load(); }, []);
  function openAdd()  { setForm(EMPTY); setEditId(null); setUploadProgress(null); setModal('add'); }
  function openEdit(item) { 
    setForm({ 
      title: item.title, 
      description: item.description, 
      image_url: item.image_url||'', 
      video_url: item.video_url||'', 
      year: item.year||'',
      dept_id: item.dept_id||''
    }); 
    setEditId(item.id); setUploadProgress(null); setModal('edit'); 
  }

  async function handleImageUpload(file) {
    const url = await uploadFile(file, `achievements/${Date.now()}_${file.name}`, setUploadProgress);
    setForm(f => ({ ...f, image_url: url })); setUploadProgress(null);
  }
  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    try { if (modal === 'add') await addAchievement(form); else await updateAchievement(editId, form); await load(); setModal(null); }
    finally { setSaving(false); }
  }
  async function handleDelete(id) { setDeleteId(id); await deleteAchievement(id); await load(); setDeleteId(null); }

  return (
    <div style={{ fontFamily: 'Inter,sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>Department achievements</h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '4px 0 0' }}>Highlight milestones, awards, and accomplishments</p>
        </div>
        <button onClick={openAdd} style={addBtnStyle}><Plus size={15} /> Add Achievement</button>
      </div>

      {loading ? <div style={centerPad}><Loader2 size={28} color={G} style={{ animation: 'spin .8s linear infinite' }} /></div>
        : items.length === 0 ? <div style={emptyStyle}>No achievements yet.</div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ background: 'rgba(8,203,0,0.03)', border: '1px solid rgba(8,203,0,0.1)', borderRadius: 16, display: 'flex', gap: 16, padding: 16 }}>
                {item.image_url && <img src={item.image_url} alt="" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div>
                      <h3 style={{ color: '#fff', fontWeight: 700, margin: '0 0 3px', fontSize: 15 }}>{item.title}</h3>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        {item.year && <span style={{ fontSize: 11, color: G, fontWeight: 600 }}>{item.year}</span>}
                        {item.dept_id && <span style={{ fontSize: 9, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>{depts.find(d => d.id === item.dept_id)?.code || 'DEPT'}</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                      <button onClick={() => openEdit(item)} style={iconBtnStyle(false)}><Pencil size={13} /></button>
                      <button onClick={() => handleDelete(item.id)} disabled={deleteId === item.id} style={iconBtnStyle(true)}>
                        {deleteId === item.id ? <Loader2 size={13} style={{ animation: 'spin .8s linear infinite' }} /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.5, margin: '6px 0 0' }}>{item.description}</p>
                  {item.video_url && <a href={item.video_url} target="_blank" rel="noopener noreferrer" style={{ color: '#08CB00', fontSize: 12, display: 'block', marginTop: 4 }}>Video ↗</a>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      <AnimatePresence>
        {modal && (
          <div style={overlayStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.93 }} style={modalStyle}>
              <div style={modalHeader}>
                <h2 style={modalTitle}>{modal === 'add' ? 'Add Achievement' : 'Edit Achievement'}</h2>
                <button onClick={() => setModal(null)} style={closeBtn}><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Fld label="Title" required><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={INPUT_STYLE} placeholder="Achievement name" /></Fld>
                <div style={{ display: 'flex', gap: 14 }}>
                  <Fld label="Year" style={{ flex: 1 }}><input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} style={INPUT_STYLE} placeholder="2024" /></Fld>
                  <Fld label="Department" style={{ flex: 2 }}>
                    <select value={form.dept_id} onChange={e => setForm(f => ({ ...f, dept_id: e.target.value }))} style={INPUT_STYLE}>
                      <option value="">General (No Dept)</option>
                      {depts.map(d => <option key={d.id} value={d.id}>{d.name} ({d.code})</option>)}
                    </select>
                  </Fld>
                </div>
                <Fld label="Description"><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...INPUT_STYLE, resize: 'vertical' }} /></Fld>
                <Fld label="Video URL"><input value={form.video_url} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} style={INPUT_STYLE} placeholder="https://youtube.com/…" /></Fld>
                <Fld label="Image">
                  {form.image_url && <img src={form.image_url} alt="preview" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />}
                  <button type="button" onClick={() => fileRef.current?.click()} style={uploadBtnStyle}><Upload size={13} /> {form.image_url ? 'Replace' : 'Upload image'}</button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e.target.files[0])} />
                  {uploadProgress !== null && <div style={progBg}><div style={{ ...progFill, width: `${uploadProgress}%` }} /></div>}
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

const addBtnStyle   = { display:'inline-flex',alignItems:'center',gap:7,background:'linear-gradient(135deg,#06a300,#08CB00)',border:'none',borderRadius:10,color:'#000',fontWeight:800,fontSize:13,padding:'10px 18px',cursor:'pointer',fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(8,203,0,0.25)' };
const centerPad     = { textAlign:'center',padding:'80px 0' };
const emptyStyle    = { textAlign:'center',padding:'80px 0',color:'rgba(255,255,255,0.2)',fontSize:14 };
const iconBtnStyle  = (danger) => ({ display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'6px 8px',background:'none',border: danger? '1px solid rgba(239,68,68,0.25)':'1px solid rgba(8,203,0,0.2)',borderRadius:8,color: danger?'#f87171':'#08CB00',cursor:'pointer' });
const overlayStyle  = { position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.8)',backdropFilter:'blur(6px)',padding:16 };
const modalStyle    = { background:'#090909',border:'1px solid rgba(8,203,0,0.18)',borderRadius:20,width:'100%',maxWidth:500,maxHeight:'90vh',overflowY:'auto',padding:28,boxShadow:'0 32px 64px rgba(0,0,0,0.8)' };
const modalHeader   = { display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22 };
const modalTitle    = { color:'#fff',fontSize:17,fontWeight:800,margin:0 };
const closeBtn      = { background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.3)',display:'flex',padding:4 };
const uploadBtnStyle= { display:'inline-flex',alignItems:'center',gap:7,background:'none',border:'1px dashed rgba(8,203,0,0.35)',borderRadius:8,color:'#08CB00',padding:'8px 14px',fontSize:12,cursor:'pointer',fontFamily:'Inter,sans-serif' };
const progBg        = { width:'100%',height:4,background:'rgba(255,255,255,0.07)',borderRadius:4,marginTop:6 };
const progFill      = { height:4,background:'#08CB00',borderRadius:4,transition:'width 0.3s' };
const cancelStyle   = { flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'rgba(255,255,255,0.5)',fontWeight:600,fontSize:13,padding:'10px 0',cursor:'pointer',fontFamily:'Inter,sans-serif' };
const saveStyle     = (dis) => ({ flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,background:dis?'rgba(8,203,0,0.25)':'linear-gradient(135deg,#06a300,#08CB00)',border:'none',borderRadius:10,color:'#000',fontWeight:800,fontSize:13,padding:'10px 0',cursor:dis?'not-allowed':'pointer',fontFamily:'Inter,sans-serif' });

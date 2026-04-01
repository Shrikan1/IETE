import { useEffect, useRef, useState } from 'react';
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from '../../supabase/db';
import { uploadFile } from '../../supabase/storage';
import { Plus, Pencil, Trash2, X, Upload, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#08CB00';
const INPUT_STYLE = { width: '100%', boxSizing: 'border-box', background: 'rgba(8,203,0,0.03)', border: '1px solid rgba(8,203,0,0.15)', borderRadius: 10, color: '#fff', padding: '10px 12px', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' };
const EMPTY = { name: '', code: '', description: '', image_url: '' };

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef(null);

  async function load() { 
    setLoading(true); 
    try {
      setDepartments(await getDepartments()); 
    } catch (err) {
      console.error("Error loading departments:", err);
    } finally {
      setLoading(false); 
    }
  }
  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY); setEditId(null); setUploadProgress(null); setModal('add'); }
  function openEdit(d) {
    setForm({
      name: d.name || '',
      code: d.code || '',
      description: d.description || '',
      image_url: d.image_url || ''
    });
    setEditId(d.id);
    setUploadProgress(null);
    setModal('edit');
  }

  async function handleImageUpload(file) {
    if (!file) return;
    const url = await uploadFile(file, `departments/${Date.now()}_${file.name}`, setUploadProgress);
    setForm(f => ({ ...f, image_url: url }));
    setUploadProgress(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'add') await addDepartment(form);
      else await updateDepartment(editId, form);
      await load();
      setModal(null);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    setDeleteId(id);
    await deleteDepartment(id);
    await load();
    setDeleteId(null);
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>Department Management</h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '4px 0 0' }}>Manage academic departments and their details</p>
        </div>
        <button onClick={openAdd} style={addBtnStyle}><Plus size={15} /> Add Department</button>
      </div>

      {loading ? (
        <div style={centerPad}><Loader2 size={28} color={G} style={{ animation: 'spin .8s linear infinite' }} /></div>
      ) : departments.length === 0 ? (
        <div style={emptyStyle}>No departments yet. Add your first department!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {departments.map(d => (
            <motion.div key={d.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              style={{ background: 'rgba(8,203,0,0.03)', border: '1px solid rgba(8,203,0,0.1)', borderRadius: 16, overflow: 'hidden' }}>
              {d.image_url ? (
                <img src={d.image_url} alt={d.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: 160, background: 'rgba(8,203,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={40} color="rgba(8,203,0,0.2)" />
                </div>
              )}
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, background: 'rgba(8,203,0,0.15)', color: G, padding: '3px 8px', borderRadius: 4, fontWeight: 800 }}>{d.code}</span>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: 0 }}>{d.name}</h3>
                </div>
                <p style={{ color: 'rgba(255,255,254,0.3)', fontSize: 13, lineHeight: 1.5, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.description}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(d)} style={aBtnStyle(false)}><Pencil size={13} /> Edit</button>
                  <button onClick={() => handleDelete(d.id)} disabled={deleteId === d.id} style={aBtnStyle(true)}>
                    {deleteId === d.id ? <Loader2 size={13} style={{ animation: 'spin .8s linear infinite' }} /> : <Trash2 size={13} />} Delete
                  </button>
                </div>
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
                <h2 style={modalTitle}>{modal === 'add' ? 'Add Department' : 'Edit Department'}</h2>
                <button onClick={() => setModal(null)} style={closeBtn}><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Fld label="Department Name" required><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={INPUT_STYLE} placeholder="e.g. Computer Engineering" /></Fld>
                <Fld label="Department Code" required><input required value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} style={INPUT_STYLE} placeholder="e.g. COMP" /></Fld>
                <Fld label="Description" required><textarea rows={4} required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...INPUT_STYLE, resize: 'vertical' }} placeholder="Provide a brief overview of the department…" /></Fld>
                
                <Fld label="Department Image">
                  {form.image_url && <img src={form.image_url} alt="preview" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />}
                  <button type="button" onClick={() => fileRef.current?.click()} style={uploadBtnStyle}><Upload size={13} /> {form.image_url ? 'Replace image' : 'Upload image'}</button>
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

const addBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#06a300,#08CB00)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 800, fontSize: 13, padding: '10px 18px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0 4px 16px rgba(8,203,0,0.25)' };
const centerPad = { textAlign: 'center', padding: '80px 0' };
const emptyStyle = { textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)', fontSize: 14 };
const aBtnStyle = (danger) => ({ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: 'none', border: danger ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(8,203,0,0.25)', borderRadius: 8, color: danger ? '#f87171' : '#08CB00', fontSize: 12, fontWeight: 600, padding: '7px 0', cursor: 'pointer', fontFamily: 'Inter,sans-serif' });
const overlayStyle = { position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', padding: 16 };
const modalStyle = { background: '#090909', border: '1px solid rgba(8,203,0,0.18)', borderRadius: 20, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', padding: 28, boxShadow: '0 32px 64px rgba(0,0,0,0.8)' };
const modalHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 };
const modalTitle = { color: '#fff', fontSize: 17, fontWeight: 800, margin: 0 };
const closeBtn = { background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', display: 'flex', padding: 4 };
const uploadBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: '1px dashed rgba(8,203,0,0.35)', borderRadius: 8, color: '#08CB00', padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' };
const progBg = { width: '100%', height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginTop: 6 };
const progFill = { height: 4, background: '#08CB00', borderRadius: 4, transition: 'width 0.3s' };
const cancelStyle = { flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 13, padding: '10px 0', cursor: 'pointer', fontFamily: 'Inter,sans-serif' };
const saveStyle = (dis) => ({ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: dis ? 'rgba(8,203,0,0.25)' : 'linear-gradient(135deg,#06a300,#08CB00)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 800, fontSize: 13, padding: '10px 0', cursor: dis ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif' });

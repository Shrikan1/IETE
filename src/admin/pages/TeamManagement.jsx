import { useEffect, useRef, useState } from 'react';
import { getTeam, addTeamMember, updateTeamMember, deleteTeamMember } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';
import { Plus, Pencil, Trash2, X, Upload, Loader2, UserCircle2, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#08CB00';
const INPUT_STYLE = { width:'100%',boxSizing:'border-box',background:'rgba(8,203,0,0.03)',border:'1px solid rgba(8,203,0,0.15)',borderRadius:10,color:'#fff',padding:'10px 12px',fontSize:13,fontFamily:'Inter,sans-serif',outline:'none' };
const EMPTY = { name:'', position:'', email:'', linkedin:'', photoURL:'' };

export default function TeamManagement() {
  const [members, setMembers]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [modal, setModal]               = useState(null);
  const [form, setForm]                 = useState(EMPTY);
  const [editId, setEditId]             = useState(null);
  const [saving, setSaving]             = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [deleteId, setDeleteId]         = useState(null);
  const fileRef = useRef(null);

  async function load() { setLoading(true); setMembers(await getTeam()); setLoading(false); }
  useEffect(() => { load(); }, []);
  function openAdd() { setForm(EMPTY); setEditId(null); setUploadProgress(null); setModal('add'); }
  function openEdit(m) { setForm({ name:m.name,position:m.position,email:m.email||'',linkedin:m.linkedin||'',photoURL:m.photoURL||'' }); setEditId(m.id); setUploadProgress(null); setModal('edit'); }

  async function handlePhotoUpload(file) {
    const url = await uploadFile(file, `team/${Date.now()}_${file.name}`, setUploadProgress);
    setForm(f => ({ ...f,photoURL:url })); setUploadProgress(null);
  }
  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    try { if (modal==='add') await addTeamMember(form); else await updateTeamMember(editId,form); await load(); setModal(null); }
    finally { setSaving(false); }
  }
  async function handleDelete(id) { setDeleteId(id); await deleteTeamMember(id); await load(); setDeleteId(null); }

  return (
    <div style={{ fontFamily:'Inter,sans-serif' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28 }}>
        <div>
          <h1 style={{ color:'#fff',fontSize:22,fontWeight:900,margin:0,letterSpacing:'-0.02em' }}>Team Management</h1>
          <p style={{ color:'rgba(255,255,255,0.3)',fontSize:13,margin:'4px 0 0' }}>Add, edit, and remove team members</p>
        </div>
        <button onClick={openAdd} style={addBtnStyle}><Plus size={15} /> Add Member</button>
      </div>

      {loading ? <div style={centerPad}><Loader2 size={28} color={G} style={{ animation:'spin .8s linear infinite' }} /></div>
        : members.length === 0 ? <div style={emptyStyle}>No team members yet.</div>
        : (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16 }}>
            {members.map(m => (
              <motion.div key={m.id} initial={{ opacity:0,scale:0.96 }} animate={{ opacity:1,scale:1 }}
                style={{ background:'rgba(8,203,0,0.03)',border:'1px solid rgba(8,203,0,0.1)',borderRadius:16,padding:18,display:'flex',gap:14,alignItems:'flex-start' }}>
                {m.photoURL
                  ? <img src={m.photoURL} alt={m.name} style={{ width:52,height:52,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:'2px solid rgba(8,203,0,0.3)' }} />
                  : <div style={{ width:52,height:52,borderRadius:'50%',flexShrink:0,background:'rgba(8,203,0,0.08)',border:'2px solid rgba(8,203,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                      <UserCircle2 size={28} color="rgba(8,203,0,0.4)" />
                    </div>
                }
                <div style={{ flex:1,minWidth:0 }}>
                  <h3 style={{ color:'#fff',fontWeight:700,fontSize:14,margin:'0 0 2px',textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap' }}>{m.name}</h3>
                  <p style={{ color:G,fontSize:11,fontWeight:600,margin:'0 0 8px' }}>{m.position}</p>
                  {m.email && <a href={`mailto:${m.email}`} style={{ display:'flex',alignItems:'center',gap:5,fontSize:11,color:'rgba(255,255,255,0.3)',marginBottom:2,textDecoration:'none' }}><Mail size={10}/>{m.email}</a>}
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:5,fontSize:11,color:'rgba(8,203,0,0.6)',textDecoration:'none' }}><Linkedin size={10}/>LinkedIn</a>}
                  <div style={{ display:'flex',gap:7,marginTop:10 }}>
                    <button onClick={() => openEdit(m)} style={aBtnStyle(false)}><Pencil size={12}/> Edit</button>
                    <button onClick={() => handleDelete(m.id)} disabled={deleteId===m.id} style={aBtnStyle(true)}>
                      {deleteId===m.id ? <Loader2 size={12} style={{ animation:'spin .8s linear infinite' }}/> : <Trash2 size={12}/>} Delete
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
            <motion.div initial={{ opacity:0,scale:0.93 }} animate={{ opacity:1,scale:1 }} exit={{ opacity:0,scale:0.93 }} style={modalStyle}>
              <div style={modalHeader}>
                <h2 style={modalTitle}>{modal==='add'?'Add Member':'Edit Member'}</h2>
                <button onClick={() => setModal(null)} style={closeBtn}><X size={18}/></button>
              </div>
              <form onSubmit={handleSave} style={{ display:'flex',flexDirection:'column',gap:14 }}>
                {/* Photo row */}
                <div style={{ display:'flex',alignItems:'center',gap:14 }}>
                  {form.photoURL
                    ? <img src={form.photoURL} alt="" style={{ width:60,height:60,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:'2px solid rgba(8,203,0,0.3)' }} />
                    : <div style={{ width:60,height:60,borderRadius:'50%',flexShrink:0,background:'rgba(8,203,0,0.08)',border:'2px solid rgba(8,203,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center' }}><UserCircle2 size={30} color="rgba(8,203,0,0.4)"/></div>
                  }
                  <div style={{ flex:1 }}>
                    <button type="button" onClick={() => fileRef.current?.click()} style={uploadBtnStyle}><Upload size={12}/> Upload photo</button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handlePhotoUpload(e.target.files[0])} />
                    {uploadProgress !== null && <div style={progBg}><div style={{ ...progFill,width:`${uploadProgress}%` }}/></div>}
                  </div>
                </div>
                <Fld label="Full Name" required><input required value={form.name} onChange={e => setForm(f => ({ ...f,name:e.target.value }))} style={INPUT_STYLE} placeholder="Full name" /></Fld>
                <Fld label="Position" required><input required value={form.position} onChange={e => setForm(f => ({ ...f,position:e.target.value }))} style={INPUT_STYLE} placeholder="President" /></Fld>
                <Fld label="Email"><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f,email:e.target.value }))} style={INPUT_STYLE} placeholder="name@iete.org" /></Fld>
                <Fld label="LinkedIn URL"><input value={form.linkedin} onChange={e => setForm(f => ({ ...f,linkedin:e.target.value }))} style={INPUT_STYLE} placeholder="https://linkedin.com/in/…" /></Fld>
                <div style={{ display:'flex',gap:10,paddingTop:4 }}>
                  <button type="button" onClick={() => setModal(null)} style={cancelStyle}>Cancel</button>
                  <button type="submit" disabled={saving||uploadProgress!==null} style={saveStyle(saving||uploadProgress!==null)}>
                    {saving ? <><Loader2 size={13} style={{ animation:'spin .8s linear infinite' }}/> Saving…</> : 'Save'}
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
    <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
      <label style={{ fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif' }}>
        {label}{required && <span style={{ color:'#f87171',marginLeft:3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const addBtnStyle   = { display:'inline-flex',alignItems:'center',gap:7,background:'linear-gradient(135deg,#06a300,#08CB00)',border:'none',borderRadius:10,color:'#000',fontWeight:800,fontSize:13,padding:'10px 18px',cursor:'pointer',fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(8,203,0,0.25)' };
const centerPad     = { textAlign:'center',padding:'80px 0' };
const emptyStyle    = { textAlign:'center',padding:'80px 0',color:'rgba(255,255,255,0.2)',fontSize:14 };
const aBtnStyle     = (danger) => ({ flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:5,background:'none',border:danger?'1px solid rgba(239,68,68,0.3)':'1px solid rgba(8,203,0,0.25)',borderRadius:8,color:danger?'#f87171':'#08CB00',fontSize:11,fontWeight:600,padding:'6px 0',cursor:'pointer',fontFamily:'Inter,sans-serif' });
const overlayStyle  = { position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.8)',backdropFilter:'blur(6px)',padding:16 };
const modalStyle    = { background:'#090909',border:'1px solid rgba(8,203,0,0.18)',borderRadius:20,width:'100%',maxWidth:480,maxHeight:'90vh',overflowY:'auto',padding:28,boxShadow:'0 32px 64px rgba(0,0,0,0.8)' };
const modalHeader   = { display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22 };
const modalTitle    = { color:'#fff',fontSize:17,fontWeight:800,margin:0 };
const closeBtn      = { background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.3)',display:'flex',padding:4 };
const uploadBtnStyle= { display:'inline-flex',alignItems:'center',gap:7,background:'none',border:'1px dashed rgba(8,203,0,0.35)',borderRadius:8,color:G,padding:'7px 12px',fontSize:12,cursor:'pointer',fontFamily:'Inter,sans-serif' };
const progBg        = { width:'100%',height:4,background:'rgba(255,255,255,0.07)',borderRadius:4,marginTop:6 };
const progFill      = { height:4,background:G,borderRadius:4,transition:'width 0.3s' };
const cancelStyle   = { flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'rgba(255,255,255,0.5)',fontWeight:600,fontSize:13,padding:'10px 0',cursor:'pointer',fontFamily:'Inter,sans-serif' };
const saveStyle     = (dis) => ({ flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,background:dis?'rgba(8,203,0,0.25)':'linear-gradient(135deg,#06a300,#08CB00)',border:'none',borderRadius:10,color:'#000',fontWeight:800,fontSize:13,padding:'10px 0',cursor:dis?'not-allowed':'pointer',fontFamily:'Inter,sans-serif' });

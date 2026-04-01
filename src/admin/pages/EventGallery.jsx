import { useEffect, useRef, useState } from 'react';
import { getGallery, addGalleryEntry, updateGalleryEntry, deleteGalleryEntry } from '../../supabase/db';
import { uploadFile } from '../../supabase/storage';
import { Plus, Trash2, X, Upload, Loader2, Images } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#08CB00';
const INPUT_STYLE = { width:'100%',boxSizing:'border-box',background:'rgba(8,203,0,0.03)',border:'1px solid rgba(8,203,0,0.15)',borderRadius:10,color:'#fff',padding:'10px 12px',fontSize:13,fontFamily:'Inter,sans-serif',outline:'none' };
const EMPTY = { event_name: '', year: '', images: [] };

export default function EventGallery() {
  const [albums, setAlbums]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [saving, setSaving]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId]   = useState(null);
  const fileRef = useRef(null);

  async function load() { 
    setLoading(true); 
    try {
      setAlbums(await getGallery()); 
    } catch (err) {
      console.error("Error loading gallery:", err);
    } finally {
      setLoading(false); 
    }
  }
  useEffect(() => { load(); }, []);
  function openAdd()  { setForm(EMPTY); setEditId(null); setModal('add'); }
  function openEdit(a) { setForm({ event_name: a.event_name, year: a.year||'', images: a.images||[] }); setEditId(a.id); setModal('edit'); }

  async function handleImagesUpload(files) {
    setUploading(true);
    const urls = await Promise.all(Array.from(files).map(f => uploadFile(f, `gallery/${Date.now()}_${f.name}`)));
    setForm(f => ({ ...f, images: [...f.images, ...urls] }));
    setUploading(false);
  }
  function removeImage(idx) { setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) })); }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true);
    try { if (modal === 'add') await addGalleryEntry(form); else await updateGalleryEntry(editId, form); await load(); setModal(null); }
    finally { setSaving(false); }
  }
  async function handleDelete(id) { setDeleteId(id); await deleteGalleryEntry(id); await load(); setDeleteId(null); }

  return (
    <div style={{ fontFamily:'Inter,sans-serif' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28 }}>
        <div>
          <h1 style={{ color:'#fff',fontSize:22,fontWeight:900,margin:0,letterSpacing:'-0.02em' }}>Event Gallery</h1>
          <p style={{ color:'rgba(255,255,255,0.3)',fontSize:13,margin:'4px 0 0' }}>Manage photo albums for past events</p>
        </div>
        <button onClick={openAdd} style={addBtnStyle}><Plus size={15} /> Add Album</button>
      </div>

      {loading ? <div style={centerPad}><Loader2 size={28} color={G} style={{ animation:'spin .8s linear infinite' }} /></div>
        : albums.length === 0 ? <div style={emptyStyle}>No albums yet. Add your first gallery!</div>
        : (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16 }}>
            {albums.map(album => (
              <motion.div key={album.id} initial={{ opacity:0 }} animate={{ opacity:1 }}
                style={{ background:'rgba(8,203,0,0.03)',border:'1px solid rgba(8,203,0,0.1)',borderRadius:16,overflow:'hidden' }}>
                {album.images?.length > 0 ? (
                  <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',height:120 }}>
                    {album.images.slice(0,6).map((url,i) => <img key={i} src={url} alt="" style={{ width:'100%',height:'100%',objectFit:'cover' }} />)}
                  </div>
                ) : (
                  <div style={{ height:120,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.1)' }}>
                    <Images size={32} />
                  </div>
                )}
                <div style={{ padding:'14px 16px 16px' }}>
                  <h3 style={{ color:'#fff',fontWeight:700,fontSize:15,margin:0 }}>{album.event_name}</h3>
                  {album.year && <p style={{ fontSize:11,color:G,fontWeight:600,margin:'3px 0 0' }}>{album.year}</p>}
                  <p style={{ color:'rgba(255,255,255,0.3)',fontSize:12,margin:'4px 0 12px' }}>{(album.images||[]).length} photos</p>
                  <div style={{ display:'flex',gap:8 }}>
                    <button onClick={() => openEdit(album)} style={aBtnStyle(false)}>Edit</button>
                    <button onClick={() => handleDelete(album.id)} disabled={deleteId===album.id} style={aBtnStyle(true)}>
                      {deleteId===album.id ? <Loader2 size={13} style={{ animation:'spin .8s linear infinite' }} /> : <Trash2 size={13} />} Delete
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
                <h2 style={modalTitle}>{modal==='add'?'New Album':'Edit Album'}</h2>
                <button onClick={() => setModal(null)} style={closeBtn}><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <Fld label="Event Name" required><input required value={form.event_name} onChange={e => setForm(f => ({ ...f,event_name:e.target.value }))} style={INPUT_STYLE} placeholder="Tech Fest 2025" /></Fld>
                <Fld label="Year"><input value={form.year} onChange={e => setForm(f => ({ ...f,year:e.target.value }))} style={INPUT_STYLE} placeholder="2025" /></Fld>
                <Fld label="Photos">
                  <button type="button" onClick={() => fileRef.current?.click()} style={{ ...uploadBtnStyle,width:'100%',justifyContent:'center' }}>
                    {uploading ? <Loader2 size={13} style={{ animation:'spin .8s linear infinite' }} /> : <Upload size={13}/>}
                    {uploading ? 'Uploading…' : 'Upload photos (multi-select)'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => handleImagesUpload(e.target.files)} />
                  {form.images.length > 0 && (
                    <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:8 }}>
                      {form.images.map((url,i) => (
                        <div key={i} style={{ position:'relative',borderRadius:8,overflow:'hidden' }}>
                          <img src={url} alt="" style={{ width:'100%',height:64,objectFit:'cover' }} />
                          <button type="button" onClick={() => removeImage(i)} style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.55)',opacity:0,transition:'opacity 0.2s',border:'none',color:'#fff',cursor:'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0'}>
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Fld>
                <div style={{ display:'flex',gap:10,paddingTop:4 }}>
                  <button type="button" onClick={() => setModal(null)} style={cancelStyle}>Cancel</button>
                  <button type="submit" disabled={saving||uploading} style={saveStyle(saving||uploading)}>
                    {saving ? <><Loader2 size={13} style={{ animation:'spin .8s linear infinite' }} /> Saving…</> : 'Save'}
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
const aBtnStyle     = (danger) => ({ flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:5,background:'none',border:danger?'1px solid rgba(239,68,68,0.3)':'1px solid rgba(8,203,0,0.25)',borderRadius:8,color:danger?'#f87171':'#08CB00',fontSize:12,fontWeight:600,padding:'7px 0',cursor:'pointer',fontFamily:'Inter,sans-serif' });
const overlayStyle  = { position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.8)',backdropFilter:'blur(6px)',padding:16 };
const modalStyle    = { background:'#090909',border:'1px solid rgba(8,203,0,0.18)',borderRadius:20,width:'100%',maxWidth:500,maxHeight:'90vh',overflowY:'auto',padding:28,boxShadow:'0 32px 64px rgba(0,0,0,0.8)' };
const modalHeader   = { display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22 };
const modalTitle    = { color:'#fff',fontSize:17,fontWeight:800,margin:0 };
const closeBtn      = { background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.3)',display:'flex',padding:4 };
const uploadBtnStyle= { display:'inline-flex',alignItems:'center',gap:7,background:'none',border:'1px dashed rgba(8,203,0,0.35)',borderRadius:8,color:G,padding:'8px 14px',fontSize:12,cursor:'pointer',fontFamily:'Inter,sans-serif' };
const cancelStyle   = { flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'rgba(255,255,255,0.5)',fontWeight:600,fontSize:13,padding:'10px 0',cursor:'pointer',fontFamily:'Inter,sans-serif' };
const saveStyle     = (dis) => ({ flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,background:dis?'rgba(8,203,0,0.25)':'linear-gradient(135deg,#06a300,#08CB00)',border:'none',borderRadius:10,color:'#000',fontWeight:800,fontSize:13,padding:'10px 0',cursor:dis?'not-allowed':'pointer',fontFamily:'Inter,sans-serif' });

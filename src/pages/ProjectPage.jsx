// FILE: src/pages/ProjectPage.jsx  ✏️ UPDATED
// REAL DATA: reads/writes via projectService (localStorage — no backend needed)
// USERS CAN:  ✅ Create projects  ✅ Edit projects  ✅ Delete projects  ✅ Click to view detail

import { useState, useEffect } from 'react';
import { useNavigate }         from 'react-router-dom';
import { toast }               from 'react-toastify';
import projectService          from '../api/projectService';
import { TopBar }              from '../components/layout/Layout';
import { Badge, Icon }         from '../components/ui/Atoms';
import { colors as C } from '../styles/tokens';

const CAT_CFG = {
  needs:      { label:'Needs',      color:C.accent, bg:C.accentSoft, fg:C.accent, Ico:Icon.needs  },
  wants:      { label:'Wants',      color:C.purple, bg:C.purpleSoft, fg:C.purple, Ico:Icon.wants  },
  investment: { label:'Investment', color:C.green,  bg:C.greenSoft,  fg:C.green,  Ico:Icon.invest },
};

const BLANK = { title:'', amount:'', category:'needs', description:'' };

const inp = (sx={}) => ({ background:C.surfaceEl, border:`1.5px solid ${C.border}`, borderRadius:10, padding:'9px 12px', color:C.text, fontSize:14, outline:'none', width:'100%', ...sx });

// ── Inline project form ───────────────────────────────────────────────────────
const Form = ({ init=BLANK, onSave, onCancel, busy }) => {
  const [f, setF] = useState(init);
  const set = k => e => setF(v=>({...v,[k]:e.target.value}));
  const save = () => {
    if (!f.title.trim())  { toast.error('Title is required'); return; }
    if (!f.amount || isNaN(+f.amount) || +f.amount <= 0) { toast.error('Enter a valid amount'); return; }
    onSave(f);
  };
  return (
    <div className="a-fadeUp" style={{ background:C.surfaceEl, border:`1px solid ${C.borderHov}`, borderRadius:14, padding:'20px 22px', marginBottom:14 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 140px 180px', gap:12, marginBottom:12 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Title *</label>
          <input style={inp()} placeholder="e.g. Emergency Fund" value={f.title} onChange={set('title')} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Amount ($) *</label>
          <input style={inp()} type="number" min="0" placeholder="0" value={f.amount} onChange={set('amount')} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Category *</label>
          <select style={{ ...inp(), cursor:'pointer' }} value={f.category} onChange={set('category')}>
            <option value="needs">Needs (50% rule)</option>
            <option value="wants">Wants (30% rule)</option>
            <option value="investment">Investment (20% rule)</option>
          </select>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:14 }}>
        <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Description (optional)</label>
        <input style={inp()} placeholder="What is this for?" value={f.description} onChange={set('description')} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
      </div>
      <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
        <button onClick={onCancel} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:9, border:`1px solid ${C.border}`, background:'transparent', color:C.textMuted, fontSize:13, fontWeight:600, cursor:'pointer' }}>
          <Icon.x /> Cancel
        </button>
        <button onClick={save} disabled={busy} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 20px', borderRadius:9, border:'none', background:busy?C.border:C.accent, color:'#fff', fontSize:13, fontWeight:700, cursor:busy?'not-allowed':'pointer' }}>
          {busy ? <span className="spin" style={{ width:13, height:13, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block' }} /> : <Icon.check />}
          {busy ? 'Saving…' : 'Save Project'}
        </button>
      </div>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ProjectPage() {
  const navigate              = useNavigate();
  const [projects, setP]      = useState([]);
  const [loading,  setL]      = useState(true);
  const [showNew,  setNew]    = useState(false);
  const [editing,  setEdit]   = useState(null);   // project being edited
  const [busy,     setBusy]   = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setP(await projectService.getProjects()); }
    catch { toast.error('Failed to load projects'); }
    finally { setL(false); }
  };

  const handleCreate = async (form) => {
    setBusy(true);
    try {
      const p = await projectService.createProject(form);
      setP(prev => [p, ...prev]);
      setNew(false);
      toast.success('🎉 Project created!');
    } catch { toast.error('Failed to create'); }
    finally { setBusy(false); }
  };

  const handleUpdate = async (form) => {
    setBusy(true);
    try {
      const updated = await projectService.updateProject(editing._id, form);
      setP(prev => prev.map(p => p._id === updated._id ? updated : p));
      setEdit(null);
      toast.success('✅ Updated!');
    } catch { toast.error('Failed to update'); }
    finally { setBusy(false); }
  };

  const handleDelete = async (project, e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    try {
      await projectService.deleteProject(project._id);
      setP(prev => prev.filter(p => p._id !== project._id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  // 50/30/20 totals
  const totals = {
    needs:      projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
    wants:      projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
    investment: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
  };

  return (
    <div style={{ flex:1, overflow:'auto' }}>
      <TopBar title="Projects" subtitle="Track your Needs · Wants · Investments"
        actions={
          <button onClick={()=>{setNew(s=>!s);setEdit(null);}}
            style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:10, background:C.accent, color:'#fff', border:'none', fontSize:14, fontWeight:600, cursor:'pointer' }}>
            <Icon.plus />{showNew ? 'Cancel' : 'New Project'}
          </button>
        }
      />

      <div style={{ padding:'22px 26px', display:'flex', flexDirection:'column', gap:14 }}>

        {/* Summary tiles */}
        {Object.entries(totals).some(([,v])=>v>0) && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }} className="a-fadeUp">
            {Object.entries(totals).map(([cat,total])=>{
              const cfg = CAT_CFG[cat];
              const Ico = cfg.Ico;
              return (
                <div key={cat} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:13, padding:'15px 18px', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:38,height:38,borderRadius:10,background:cfg.bg,display:'flex',alignItems:'center',justifyContent:'center',color:cfg.fg,flexShrink:0 }}><Ico /></div>
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,color:C.textMuted,textTransform:'uppercase',letterSpacing:'.06em' }}>{cfg.label}</div>
                    <div style={{ fontSize:20,fontWeight:800,color:cfg.fg }}>${total.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* New project form */}
        {showNew && <Form onSave={handleCreate} onCancel={()=>setNew(false)} busy={busy} />}

        {/* Loading */}
        {loading && <div style={{ display:'flex',justifyContent:'center',padding:60 }}><div className="spin" style={{ width:32,height:32,border:`3px solid ${C.border}`,borderTopColor:C.accent,borderRadius:'50%' }} /></div>}

        {/* Empty state */}
        {!loading && projects.length===0 && (
          <div className="a-fadeUp" style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:'56px 24px',textAlign:'center' }}>
            <div style={{ fontSize:44,marginBottom:14 }}>💰</div>
            <div style={{ fontSize:17,fontWeight:700,marginBottom:8 }}>No projects yet</div>
            <div style={{ fontSize:13,color:C.textMuted,marginBottom:22 }}>Create a project to start budgeting with the 50/30/20 rule</div>
            <button onClick={()=>setNew(true)} style={{ display:'inline-flex',alignItems:'center',gap:7,padding:'10px 22px',borderRadius:10,background:C.accent,color:'#fff',border:'none',fontSize:14,fontWeight:600,cursor:'pointer' }}>
              <Icon.plus /> Create First Project
            </button>
          </div>
        )}

        {/* Project cards */}
        {projects.map((p,i)=>{
          const cfg = CAT_CFG[p.category] || CAT_CFG.needs;
          const Ico = cfg.Ico;
          const isEditing = editing?._id===p._id;
          return (
            <div key={p._id}>
              {isEditing && <Form init={{ title:p.title, amount:String(p.amount), category:p.category, description:p.description||'' }} onSave={handleUpdate} onCancel={()=>setEdit(null)} busy={busy} />}
              {!isEditing && (
                <div className={`card-hover a-fadeUp${Math.min(i+1,5)}`}
                  onClick={()=>navigate(`/projects/${p._id}`)}
                  style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:'18px 22px',cursor:'pointer' }}>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:14 }}>
                      <div style={{ width:44,height:44,borderRadius:12,background:cfg.bg,display:'flex',alignItems:'center',justifyContent:'center',color:cfg.fg,flexShrink:0 }}><Ico /></div>
                      <div>
                        <div style={{ fontSize:15,fontWeight:700 }}>{p.title}</div>
                        {p.description && <div style={{ fontSize:12,color:C.textMuted,marginTop:2 }}>{p.description}</div>}
                        <div style={{ marginTop:7 }}><Badge label={cfg.label} color={cfg.color} /></div>
                      </div>
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:14 }}>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:22,fontWeight:800,color:cfg.fg }}>${Number(p.amount).toLocaleString()}</div>
                        {p.createdAt && <div style={{ fontSize:11,color:C.textMuted }}>{new Date(p.createdAt).toLocaleDateString()}</div>}
                      </div>
                      <div style={{ display:'flex',gap:6 }} onClick={e=>e.stopPropagation()}>
                        <button title="Edit" onClick={()=>{setEdit(p);setNew(false);}}
                          style={{ width:32,height:32,borderRadius:8,border:`1px solid ${C.border}`,background:C.surfaceEl,color:C.textMuted,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all .15s' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.textMuted;}}>
                          <Icon.edit />
                        </button>
                        <button title="Delete" onClick={e=>handleDelete(p,e)}
                          style={{ width:32,height:32,borderRadius:8,border:`1px solid ${C.border}`,background:C.surfaceEl,color:C.textMuted,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all .15s' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red;e.currentTarget.style.background=C.redSoft;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.textMuted;e.currentTarget.style.background=C.surfaceEl;}}>
                          <Icon.trash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

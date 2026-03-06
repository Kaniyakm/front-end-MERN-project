// FILE: src/pages/ProjectDetails.jsx  ✏️ UPDATED — real data via projectService
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast }         from 'react-toastify';
import projectService    from '../api/projectService';
import { TopBar }        from '../components/layout/Layout';
import { Badge, Icon }   from '../components/ui/Atoms';
import { C }             from '../styles/tokens';

const CAT = {
  needs:      { label:'Needs',      color:'blue',   bg:C.accentSoft, fg:C.accent  },
  wants:      { label:'Wants',      color:'purple', bg:C.purpleSoft, fg:C.purple  },
  investment: { label:'Investment', color:'green',  bg:C.greenSoft,  fg:C.green   },
};

export default function ProjectDetails() {
  const { id }                  = useParams();
  const navigate                = useNavigate();
  const [project, setProject]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(false);
  const [form,    setForm]      = useState({});
  const [saving,  setSaving]    = useState(false);

  useEffect(() => {
    projectService.getProject(id)
      .then(p => { setProject(p); setForm({ title:p?.title||'', amount:String(p?.amount||''), category:p?.category||'needs', description:p?.description||'' }); })
      .catch(() => toast.error('Failed to load project'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!form.title.trim())                          { toast.error('Title required'); return; }
    if (!form.amount || isNaN(+form.amount))         { toast.error('Valid amount required'); return; }
    setSaving(true);
    try {
      const updated = await projectService.updateProject(id, form);
      setProject(updated);
      setEditing(false);
      toast.success('✅ Saved!');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await projectService.deleteProject(id);
      toast.success('Deleted');
      navigate('/projects');
    } catch { toast.error('Failed to delete'); }
  };

  const set = k => e => setForm(v=>({...v,[k]:e.target.value}));
  const inp = { background:C.surfaceEl, border:`1.5px solid ${C.border}`, borderRadius:10, padding:'9px 12px', color:C.text, fontSize:14, outline:'none', width:'100%' };

  if (loading) return (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="spin" style={{ width:32, height:32, border:`3px solid ${C.border}`, borderTopColor:C.accent, borderRadius:'50%' }} />
    </div>
  );

  if (!project) return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
      <div style={{ fontSize:44 }}>🔍</div>
      <div style={{ fontSize:18, fontWeight:700 }}>Project not found</div>
      <button onClick={()=>navigate('/projects')} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 18px', borderRadius:10, border:`1px solid ${C.border}`, background:'transparent', color:C.textMuted, cursor:'pointer', fontSize:14 }}>
        <Icon.back /> Back to Projects
      </button>
    </div>
  );

  const cfg = CAT[project.category] || CAT.needs;

  return (
    <div style={{ flex:1, overflow:'auto' }}>
      <TopBar
        title={project.title}
        subtitle={<><Badge label={cfg.label} color={cfg.color} /> <span style={{ marginLeft:8, color:C.textMuted, fontSize:13 }}>Created {new Date(project.createdAt).toLocaleDateString()}</span></>}
        actions={
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={()=>navigate('/projects')} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:9, border:`1px solid ${C.border}`, background:'transparent', color:C.textMuted, cursor:'pointer', fontSize:13, fontWeight:600 }}>
              <Icon.back /> Back
            </button>
            {!editing && <button onClick={()=>setEditing(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:9, border:`1px solid ${C.border}`, background:C.surfaceEl, color:C.text, cursor:'pointer', fontSize:13, fontWeight:600 }}><Icon.edit /> Edit</button>}
            <button onClick={handleDelete} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:9, border:`1px solid ${C.redSoft}`, background:C.redSoft, color:C.red, cursor:'pointer', fontSize:13, fontWeight:600 }}><Icon.trash /> Delete</button>
          </div>
        }
      />

      <div style={{ padding:'22px 26px', display:'flex', flexDirection:'column', gap:18 }}>

        {/* Detail card */}
        <div className="a-fadeUp1" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden' }}>
          <div style={{ height:6, background:cfg.fg }} />
          <div style={{ padding:'24px 26px' }}>

            {editing ? (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 160px 200px', gap:12 }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Title</label>
                    <input style={inp} value={form.title} onChange={set('title')} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Amount ($)</label>
                    <input style={inp} type="number" value={form.amount} onChange={set('amount')} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Category</label>
                    <select style={{ ...inp, cursor:'pointer' }} value={form.category} onChange={set('category')}>
                      <option value="needs">Needs</option>
                      <option value="wants">Wants</option>
                      <option value="investment">Investment</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.textMuted }}>Description</label>
                  <input style={inp} placeholder="Optional description" value={form.description} onChange={set('description')} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
                </div>
                <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
                  <button onClick={()=>setEditing(false)} style={{ padding:'8px 16px', borderRadius:9, border:`1px solid ${C.border}`, background:'transparent', color:C.textMuted, cursor:'pointer', fontSize:13, fontWeight:600 }}>Cancel</button>
                  <button onClick={handleSave} disabled={saving} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 20px', borderRadius:9, border:'none', background:saving?C.border:C.accent, color:'#fff', cursor:saving?'not-allowed':'pointer', fontSize:13, fontWeight:700 }}>
                    {saving ? <span className="spin" style={{ width:13,height:13,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block' }} /> : <Icon.check />}
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <div style={{ fontSize:12, color:C.textMuted, fontWeight:600, marginBottom:6 }}>Amount</div>
                  <div style={{ fontSize:40, fontWeight:800, color:cfg.fg, letterSpacing:'-.04em' }}>${Number(project.amount).toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize:12, color:C.textMuted, fontWeight:600, marginBottom:6 }}>Category</div>
                  <div style={{ marginBottom:10 }}><Badge label={cfg.label} color={cfg.color} /></div>
                  <div style={{ fontSize:13, color:C.textMuted }}>
                    {project.category==='needs'?'Essential expenses — target 50% of income':project.category==='wants'?'Discretionary spending — target 30% of income':'Savings & investments — target 20% of income'}
                  </div>
                </div>
                {project.description && (
                  <div style={{ gridColumn:'1/-1', paddingTop:16, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:12, color:C.textMuted, fontWeight:600, marginBottom:6 }}>Description</div>
                    <div style={{ fontSize:14, color:C.text }}>{project.description}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info tiles */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }} className="a-fadeUp2">
          {[
            { label:'Project ID', value:`#${project._id?.slice(-6) || 'N/A'}` },
            { label:'Created',    value:project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : 'Unknown' },
            { label:'Category',   value:CAT[project.category]?.label || 'Other' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:'14px 18px' }}>
              <div style={{ fontSize:11, color:C.textMuted, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>{label}</div>
              <div style={{ fontSize:15, fontWeight:700 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

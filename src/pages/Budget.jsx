// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/pages/Analytics.jsx  (did not exist in original project)
// STATUS: 🆕 CREATED
// PURPOSE:
//   Financial analytics page — top KPI tiles (savings rate, avg daily spend,
//   net worth delta), a grouped BarChart for income vs expense by month,
//   and a Project Budget Health breakdown with per-project progress bars.
//   Uses recharts BarChart.
//   Mock data at top — replace with useAnalytics() hook.
// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/pages/Budget.jsx  ✏️ UPDATED — REAL DATA from projectService
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast }          from 'react-toastify';
import projectService     from '../api/projectService';
import { TopBar }         from '../components/layout/Layout';
import { Icon }           from '../components/ui/Atoms';
import { C }              from '../styles/tokens';

const TT = { background:C.surfaceEl, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:13 };

const Bar2 = ({ value, color, height=6 }) => (
  <div style={{ width:'100%', height, borderRadius:9999, background:C.border, overflow:'hidden' }}>
    <div style={{ height:'100%', width:`${Math.min(100,value)}%`, background:color, borderRadius:9999, transition:'width .6s cubic-bezier(.22,1,.36,1)' }} />
  </div>
);

export default function Budget() {
  const [projects, setProjects] = useState([]);
  const [income,   setIncome]   = useState(() => Number(localStorage.getItem('bb_income')) || 5000);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(setProjects)
      .catch(()=>toast.error('Failed to load'))
      .finally(()=>setLoading(false));
  }, []);

  const saveIncome = v => { setIncome(v); localStorage.setItem('bb_income', v); };

  const catTotals = {
    needs:      projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
    wants:      projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
    investment: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
  };

  const targets = { needs: income*0.5, wants: income*0.3, investment: income*0.2 };

  const chartData = [
    { name:'Needs',      budget:Math.round(targets.needs),      actual:catTotals.needs,      color:C.accent },
    { name:'Wants',      budget:Math.round(targets.wants),      actual:catTotals.wants,      color:C.purple },
    { name:'Investment', budget:Math.round(targets.investment), actual:catTotals.investment, color:C.green  },
  ];

  // Per-project breakdown
  const catGroups = {
    needs:      { label:'Needs',      color:C.accent,  pct:50, items:projects.filter(p=>p.category==='needs')      },
    wants:      { label:'Wants',      color:C.purple,  pct:30, items:projects.filter(p=>p.category==='wants')      },
    investment: { label:'Investment', color:C.green,   pct:20, items:projects.filter(p=>p.category==='investment') },
  };

  return (
    <div style={{ flex:1, overflow:'auto' }}>
      <TopBar title="Budget" subtitle="See how your spending compares to the 50/30/20 rule." />

      <div style={{ padding:'22px 26px', display:'flex', flexDirection:'column', gap:18 }}>

        {/* Income input */}
        <div className="a-fadeUp" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700 }}>Monthly Income</div>
            <div style={{ fontSize:12, color:C.textMuted }}>Used to calculate your 50/30/20 targets</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:15, fontWeight:700, color:C.textMuted }}>$</span>
            <input type="number" min="0" value={income} onChange={e=>saveIncome(Number(e.target.value))}
              style={{ background:C.surfaceEl, border:`1.5px solid ${C.border}`, borderRadius:10, padding:'8px 12px', color:C.text, fontSize:16, fontWeight:700, width:130, outline:'none' }}
              onFocus={e=>e.target.style.borderColor=C.accent}
              onBlur={e=>e.target.style.borderColor=C.border} />
            <span style={{ fontSize:13, color:C.textMuted }}>/mo</span>
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="a-fadeUp1" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'20px 22px' }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Budget vs Actual</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:18 }}>Target (50/30/20) vs your real spending</div>
            {loading
              ? <div style={{ display:'flex',justifyContent:'center',padding:40 }}><div className="spin" style={{ width:24,height:24,border:`2px solid ${C.border}`,borderTopColor:C.accent,borderRadius:'50%' }} /></div>
              : <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} margin={{ top:5,right:5,bottom:0,left:0 }} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                    <XAxis dataKey="name" tick={{ fill:C.textMuted, fontSize:12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:C.textMuted, fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`} width={46} />
                    <Tooltip contentStyle={TT} formatter={v=>[`$${Number(v).toLocaleString()}`]} />
                    <Bar dataKey="budget" fill={C.surfaceEl} stroke={C.border} radius={[4,4,0,0]} name="Target" />
                    <Bar dataKey="actual" radius={[4,4,0,0]} name="Actual">
                      {chartData.map((d,i)=><Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            }
            <div style={{ display:'flex', gap:16, marginTop:12, justifyContent:'center' }}>
              {[['Target', C.surfaceEl], ['Actual', C.accent]].map(([l,c])=>(
                <div key={l} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:C.textMuted }}>
                  <span style={{ width:10, height:10, borderRadius:3, background:c, border:`1px solid ${C.border}` }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Category rows */}
          <div className="a-fadeUp2" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16 }}>
            <div style={{ padding:'18px 22px', borderBottom:`1px solid ${C.border}`, fontSize:15, fontWeight:700 }}>Category Breakdown</div>
            {Object.entries(catGroups).map(([cat, { label, color, pct, items }])=>{
              const total  = items.reduce((s,p)=>s+Number(p.amount),0);
              const target = income * (pct/100);
              const used   = target > 0 ? Math.round((total/target)*100) : 0;
              const over   = used > 100;
              return (
                <div key={cat} style={{ padding:'14px 22px', borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:9, height:9, borderRadius:'50%', background:color }} />
                      <span style={{ fontSize:14, fontWeight:600 }}>{label}</span>
                      <span style={{ fontSize:11, color:C.textMuted }}>({pct}% = ${Math.round(target).toLocaleString()})</span>
                    </div>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <span style={{ fontSize:13, fontWeight:700, color }}>${total.toLocaleString()}</span>
                      {over && <span style={{ fontSize:11, fontWeight:600, color:C.red }}>+{used-100}% over</span>}
                    </div>
                  </div>
                  <Bar2 value={used} color={over ? C.amber : color} />
                  <div style={{ fontSize:11, color:C.textMuted, marginTop:4 }}>{items.length} project{items.length!==1?'s':''}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All projects by category */}
        {Object.entries(catGroups).map(([cat, { label, color, items }]) =>
          items.length > 0 && (
            <div key={cat} className="a-fadeUp3" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16 }}>
              <div style={{ padding:'16px 22px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:color }} />
                <span style={{ fontSize:15, fontWeight:700 }}>{label}</span>
                <span style={{ fontSize:12, color:C.textMuted }}>{items.length} item{items.length!==1?'s':''}</span>
              </div>
              {items.map((p,i) => (
                <div key={p._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 22px', borderBottom: i<items.length-1 ? `1px solid ${C.border}` : 'none' }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600 }}>{p.title}</div>
                    {p.description && <div style={{ fontSize:12, color:C.textMuted }}>{p.description}</div>}
                  </div>
                  <div style={{ fontSize:16, fontWeight:700, color }}>${Number(p.amount).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )
        )}

        {!loading && projects.length===0 && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'40px 24px', textAlign:'center' }}>
            <div style={{ fontSize:13, color:C.textMuted }}>No projects yet. <a href="/projects" style={{ color:C.accent }}>Add projects</a> to see your budget breakdown.</div>
          </div>
        )}
      </div>
    </div>
  );
}

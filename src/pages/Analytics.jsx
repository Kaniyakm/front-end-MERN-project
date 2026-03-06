// FILE: src/pages/Analytics.jsx  ✏️ UPDATED — REAL DATA from projectService
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast }       from 'react-toastify';
import projectService  from '../api/projectService';
import { TopBar }      from '../components/layout/Layout';
import { C }           from '../styles/tokens';

const TT = { background:C.surfaceEl, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:13 };
const Bar2 = ({ v, color }) => <div style={{ width:'100%', height:6, borderRadius:9999, background:C.border, overflow:'hidden' }}><div style={{ height:'100%', width:`${Math.min(100,v)}%`, background:color, borderRadius:9999, transition:'width .6s' }} /></div>;

export default function Analytics() {
  const [projects, setProjects] = useState([]);
  const [income,   setIncome]   = useState(() => Number(localStorage.getItem('bb_income')) || 5000);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(setProjects)
      .catch(()=>toast.error('Failed to load'))
      .finally(()=>setLoading(false));
  }, []);

  const totals = {
    needs:      projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
    wants:      projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
    investment: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
  };
  const totalAll   = totals.needs + totals.wants + totals.investment;
  const remaining  = income - totalAll;
  const savingsRt  = income > 0 ? Math.round((totals.investment/income)*100) : 0;

  const pieData = [
    { name:'Needs',       value:totals.needs,      color:C.accent  },
    { name:'Wants',       value:totals.wants,      color:C.purple  },
    { name:'Investment',  value:totals.investment,  color:C.green   },
    remaining > 0 ? { name:'Unallocated', value:remaining, color:C.surfaceEl } : null,
  ].filter(Boolean).filter(d=>d.value>0);

  // Spending by date (grouped into weeks)
  const weekBuckets = {};
  projects.forEach(p => {
    if (!p.createdAt) return;
    const d   = new Date(p.createdAt);
    const wk  = `${d.getFullYear()}-W${Math.ceil(d.getDate()/7)}`;
    weekBuckets[wk] = (weekBuckets[wk]||0) + Number(p.amount);
  });
  const trendData = Object.entries(weekBuckets).slice(-6).map(([wk,v])=>({ week:wk.split('-W')[1]?`Wk ${wk.split('-W')[1]}`:'', spent:v }));

  const kpis = [
    { label:'Savings Rate',    value:`${savingsRt}%`,                             sub:'of income invested',       color:C.green  },
    { label:'Total Allocated', value:`$${totalAll.toLocaleString()}`,              sub:`of $${income.toLocaleString()} income`,   color:C.accent },
    { label:'Unallocated',     value:`$${Math.max(0,remaining).toLocaleString()}`, sub:remaining<0?'⚠️ Over budget':'left to allocate', color:remaining<0?C.red:C.amber },
  ];

  return (
    <div style={{ flex:1, overflow:'auto' }}>
      <TopBar title="Analytics" subtitle="Insights into your budget allocation and spending." />

      <div style={{ padding:'22px 26px', display:'flex', flexDirection:'column', gap:18 }}>

        {/* KPI tiles */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }} className="a-fadeUp">
          {kpis.map(({ label, value, sub, color })=>(
            <div key={label} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'18px 20px' }}>
              <div style={{ fontSize:12, color:C.textMuted, fontWeight:600, marginBottom:8 }}>{label}</div>
              <div style={{ fontSize:26, fontWeight:800, color, letterSpacing:'-.04em' }}>{value}</div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:4 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {/* Pie chart */}
          <div className="a-fadeUp2" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'20px 22px' }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Allocation Breakdown</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:16 }}>How your budget is distributed</div>
            {loading
              ? <div style={{ display:'flex',justifyContent:'center',padding:40 }}><div className="spin" style={{ width:24,height:24,border:`2px solid ${C.border}`,borderTopColor:C.accent,borderRadius:'50%' }} /></div>
              : pieData.length===0
                ? <div style={{ textAlign:'center', padding:'30px 0', color:C.textMuted, fontSize:13 }}>Add projects to see allocation</div>
                : <>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                          {pieData.map((d,i)=><Cell key={i} fill={d.color} />)}
                        </Pie>
                        <Tooltip contentStyle={TT} formatter={v=>[`$${Number(v).toLocaleString()}`]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                      {pieData.filter(d=>d.color!==C.surfaceEl).map(d=>(
                        <div key={d.name} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:C.textMuted }}>
                          <span style={{ width:8, height:8, borderRadius:'50%', background:d.color }} />
                          {d.name} · ${d.value.toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </>
            }
          </div>

          {/* Trend bar chart */}
          <div className="a-fadeUp3" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'20px 22px' }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Spending by Week</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:16 }}>Total amount added each week</div>
            {trendData.length===0
              ? <div style={{ textAlign:'center', padding:'30px 0', color:C.textMuted, fontSize:13 }}>Not enough data yet</div>
              : <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={trendData} margin={{ top:5,right:5,bottom:0,left:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                    <XAxis dataKey="week" tick={{ fill:C.textMuted, fontSize:12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:C.textMuted, fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`} width={44} />
                    <Tooltip contentStyle={TT} formatter={v=>[`$${Number(v).toLocaleString()}`,'Spent']} />
                    <Bar dataKey="spent" fill={C.accent} radius={[5,5,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
            }
          </div>
        </div>

        {/* All projects ranked by amount */}
        {projects.length > 0 && (
          <div className="a-fadeUp4" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16 }}>
            <div style={{ padding:'16px 22px', borderBottom:`1px solid ${C.border}`, fontSize:15, fontWeight:700 }}>All Projects — Ranked by Amount</div>
            {[...projects].sort((a,b)=>Number(b.amount)-Number(a.amount)).map((p,i)=>{
              const colors  = { needs:C.accent, wants:C.purple, investment:C.green };
              const color   = colors[p.category]||C.accent;
              const pct     = totalAll > 0 ? (Number(p.amount)/totalAll*100) : 0;
              return (
                <div key={p._id} style={{ padding:'13px 22px', borderBottom: i<projects.length-1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ fontSize:12, color:C.textFaint, fontWeight:700, width:20 }}>#{i+1}</div>
                      <div style={{ fontSize:14, fontWeight:600 }}>{p.title}</div>
                    </div>
                    <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                      <span style={{ fontSize:12, color:C.textMuted }}>{Math.round(pct)}%</span>
                      <span style={{ fontSize:15, fontWeight:700, color }}>${Number(p.amount).toLocaleString()}</span>
                    </div>
                  </div>
                  <Bar2 v={pct} color={color} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

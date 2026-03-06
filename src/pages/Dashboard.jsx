// FILE: src/pages/Dashboard.jsx
// ✅ SmartAdvice is fully inlined — you do NOT need a separate SmartAdvice.jsx file.
// Just replace your existing Dashboard.jsx with this entire file.

import { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast }       from 'react-toastify';
import projectService  from '../api/projectService';
import { AuthContext } from '../context/AuthContext';
import { TopBar }      from '../components/layout/Layout';
import { Icon, Badge } from '../components/ui/Atoms';
import { C }           from '../styles/tokens';

const TT = { background:C.surfaceEl, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:13 };

// ═══════════════════════════════════════════════════════════════════════════════
// SMART ADVICE — inlined so no separate file is needed
// ═══════════════════════════════════════════════════════════════════════════════
const IcoSparkle = ({ size=16 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M9 1v3M9 14v3M1 9h3M14 9h3M3.2 3.2l2.1 2.1M12.7 12.7l2.1 2.1M3.2 14.8l2.1-2.1M12.7 5.3l2.1-2.1"/>
    <circle cx="9" cy="9" r="2.5" fill="currentColor" fillOpacity=".2"/>
  </svg>
);
const IcoCheck = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><polyline points="6,10 9,13 14,7"/></svg>;
const IcoWarn  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L18 17H2z"/><line x1="10" y1="8" x2="10" y2="12"/><circle cx="10" cy="15.5" r=".8" fill="currentColor"/></svg>;
const IcoBulb  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2a6 6 0 016 6c0 2.5-1.5 4.5-3.5 5.5V15a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5v-1.5C5.5 12.5 4 10.5 4 8a6 6 0 016-6z"/><line x1="7.5" y1="17.5" x2="12.5" y2="17.5"/></svg>;

const getRuleAdvice = (projects, income) => {
  if (!income || income <= 0) return { text:'Set your monthly income above to get personalised financial advice.', type:'info' };
  if (!projects.length)       return { text:'Add your first project on the Projects page to start getting budget advice.', type:'info' };
  const t = {
    needs:  projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
    wants:  projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
    invest: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
  };
  const np=(t.needs/income)*100, wp=(t.wants/income)*100, ip=(t.invest/income)*100;
  if (np>50) return { text:`Your Needs spending (${np.toFixed(1)}%) exceeds the 50% target. Look for ways to reduce fixed expenses.`, type:'warn' };
  if (wp>30) return { text:`Your Wants spending (${wp.toFixed(1)}%) exceeds the 30% target. Try the 30-day rule before non-essential purchases.`, type:'warn' };
  if (ip<20) return { text:`Your Savings are below 20% (currently ${ip.toFixed(1)}%). Increase investments for long-term stability.`, type:'warn' };
  return { text:'✅ Excellent! Your finances align with the 50/30/20 rule. Keep building your investment portfolio!', type:'good' };
};

const getFallback = (projects, income) => {
  const t = {
    needs:  projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
    wants:  projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
    invest: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
  };
  const rem=income-t.needs-t.wants-t.invest;
  const tips=[];
  if (t.invest<income*0.2) tips.push(`Automate savings: transfer $${Math.round(income*0.2-t.invest)} more/month into investments.`);
  if (t.wants>income*0.3)  tips.push("Audit subscriptions — cancel anything unused in the last 3 months.");
  if (rem>0)               tips.push(`You have $${rem.toLocaleString()} unallocated — assign it to an emergency fund or index fund.`);
  if (!tips.length)        tips.push("Consider diversifying: 60% index funds, 30% bonds, 10% high-yield savings.");
  return tips.join(' ');
};

const ADV_THEMES = {
  good:{ bg:'rgba(16,185,129,.08)',  border:'rgba(16,185,129,.25)', color:C.green,  Ico:IcoCheck  },
  warn:{ bg:'rgba(245,158,11,.08)',  border:'rgba(245,158,11,.25)', color:C.amber,  Ico:IcoWarn   },
  info:{ bg:'rgba(59,130,246,.08)',  border:'rgba(59,130,246,.20)', color:C.accent, Ico:IcoBulb   },
  ai:  { bg:'rgba(139,92,246,.08)', border:'rgba(139,92,246,.25)', color:C.purple, Ico:IcoSparkle },
};

const SmartAdvice = ({ projects=[], income=0 }) => {
  const [aiText,  setAiText]  = useState('');
  const [loading, setLoading] = useState(false);
  const [showAi,  setShowAi]  = useState(false);

  const rule   = getRuleAdvice(projects, income);
  const active = showAi && aiText ? { text:aiText, type:'ai' } : rule;
  const theme  = ADV_THEMES[active.type] || ADV_THEMES.info;
  const Ico    = theme.Ico;
  const canAsk = income>0 && !loading;

  const handleGetAI = async () => {
    setLoading(true); setShowAi(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/advice`,
        { method:'POST',
          headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${localStorage.getItem('token')}` },
          body:JSON.stringify({
            income,
            needs:      projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
            wants:      projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
            investment: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
          })
        }
      );
      if (!res.ok) throw new Error('no endpoint');
      const data = await res.json();
      setAiText(data.advice || data.message || 'No advice returned.');
      setShowAi(true);
    } catch {
      // Falls back to richer rule-based message if backend /api/advice not set up yet
      setAiText(getFallback(projects, income));
      setShowAi(true);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden' }}>
      <div style={{ padding:'16px 22px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:32, height:32, borderRadius:9, background:'rgba(139,92,246,.12)', display:'flex', alignItems:'center', justifyContent:'center', color:C.purple, flexShrink:0 }}>
          <IcoSparkle size={16}/>
        </div>
        <div>
          <div style={{ fontSize:15, fontWeight:700 }}>Smart Financial Advice</div>
          <div style={{ fontSize:12, color:C.textMuted }}>AI-powered insights based on your spending patterns</div>
        </div>
      </div>

      <div style={{ padding:'18px 22px' }}>
        <div style={{ background:theme.bg, border:`1px solid ${theme.border}`, borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'flex-start', gap:12, marginBottom:16 }}>
          <div style={{ width:36, height:36, borderRadius:9, background:theme.color+'20', display:'flex', alignItems:'center', justifyContent:'center', color:theme.color, flexShrink:0 }}>
            <Ico/>
          </div>
          <div style={{ flex:1 }}>
            {loading ? (
              <div style={{ display:'flex', flexDirection:'column', gap:8, paddingTop:2 }}>
                {[85,100,65].map((w,i)=><div key={i} style={{ height:12, borderRadius:6, background:C.surfaceEl, width:`${w}%` }}/>)}
                <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>Analysing your budget…</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize:11, fontWeight:700, color:theme.color, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:5 }}>
                  {showAi ? 'Advanced AI Advice' : 'Smart Advice'}
                </div>
                <p style={{ fontSize:14, color:C.text, lineHeight:1.65, margin:0 }}>{active.text}</p>
              </>
            )}
          </div>
        </div>

        <button onClick={handleGetAI} disabled={!canAsk}
          style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:10, border:'none', background:!canAsk?C.surfaceEl:'linear-gradient(135deg,#6366F1,#8B5CF6)', color:!canAsk?C.textMuted:'#fff', fontSize:14, fontWeight:600, cursor:!canAsk?'not-allowed':'pointer', transition:'all .18s' }}
          onMouseEnter={e=>{ if(canAsk){ e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(99,102,241,.35)'; }}}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
          {loading
            ? <><span className="spin" style={{ display:'inline-block', width:14, height:14, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%' }}/> Analysing…</>
            : <><IcoSparkle size={14}/> Get Advanced AI Advice</>}
        </button>
        {income<=0 && <div style={{ fontSize:12, color:C.textMuted, marginTop:8 }}>Set your monthly income to unlock AI advice</div>}
      </div>
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════


const StatTile = ({ label, value, sub, color, glowClass, delay, icon }) => (
  <div className={`card-hover ${glowClass} a-fadeUp${delay}`} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'18px 20px', display:'flex', flexDirection:'column', gap:12, transition:'all .2s' }}>
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
      <div style={{ fontSize:13, fontWeight:600, color:C.textMuted }}>{label}</div>
      {icon && <div style={{ width:34, height:34, borderRadius:9, background:color+'18', display:'flex', alignItems:'center', justifyContent:'center', color }}>{icon}</div>}
    </div>
    <div>
      <div style={{ fontSize:24, fontWeight:800, letterSpacing:'-.04em' }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:C.textMuted, marginTop:3 }}>{sub}</div>}
    </div>
  </div>
);

const BarLine = ({ value, color, height=6 }) => (
  <div style={{ width:'100%', height, borderRadius:9999, background:C.border, overflow:'hidden' }}>
    <div style={{ height:'100%', borderRadius:9999, width:`${Math.min(100,Math.max(0,value))}%`, background:color, transition:'width .6s cubic-bezier(.22,1,.36,1)' }}/>
  </div>
);

const CAT_COLOR = { needs:C.accent, wants:C.purple, investment:C.green };
const CAT_LABEL = { needs:'Needs', wants:'Wants', investment:'Investment' };

export default function Dashboard() {
  const { user }                 = useContext(AuthContext);
  const [projects, setProjects]  = useState([]);
  const [income,   setIncome]    = useState(() => Number(localStorage.getItem('bb_income')) || 5000);
  const [loading,  setLoading]   = useState(true);
  const name = user?.name?.split(' ')[0] || 'there';

  useEffect(() => {
    projectService.getProjects()
      .then(setProjects)
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  const saveIncome = (v) => { setIncome(v); localStorage.setItem('bb_income', v); };

  const totals = {
    needs:      projects.filter(p=>p.category==='needs').reduce((s,p)=>s+Number(p.amount),0),
    wants:      projects.filter(p=>p.category==='wants').reduce((s,p)=>s+Number(p.amount),0),
    investment: projects.filter(p=>p.category==='investment').reduce((s,p)=>s+Number(p.amount),0),
  };
  const totalSpent = totals.needs + totals.wants + totals.investment;
  const remaining  = income - totalSpent;
  const targets    = { needs:50, wants:30, investment:20 };
  const actual     = {
    needs:      income ? (totals.needs/income*100) : 0,
    wants:      income ? (totals.wants/income*100) : 0,
    investment: income ? (totals.investment/income*100) : 0,
  };

  const weekData = [0,1,2,3].map(w => ({
    label: ['3w ago','2w ago','Last wk','This wk'][w],
    spent: projects.filter(p => {
      if (!p.createdAt) return false;
      const diff = (new Date()-new Date(p.createdAt)) / 86400000;
      return diff >= w*7 && diff < (w+1)*7;
    }).reduce((s,p)=>s+Number(p.amount),0),
  }));

  return (
    <div style={{ flex:1, overflow:'auto' }}>
      <TopBar title="Dashboard" subtitle={`Welcome back, ${name} 👋`}/>

      <div style={{ padding:'22px 26px', display:'flex', flexDirection:'column', gap:20 }}>

        {/* Income input */}
        <div className="a-fadeUp" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700 }}>Monthly Income</div>
            <div style={{ fontSize:12, color:C.textMuted }}>Set your income to see 50/30/20 budget breakdown</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:15, fontWeight:700, color:C.textMuted }}>$</span>
            <input type="number" min="0" value={income} onChange={e=>saveIncome(Number(e.target.value))}
              style={{ background:C.surfaceEl, border:`1.5px solid ${C.border}`, borderRadius:10, padding:'8px 12px', color:C.text, fontSize:16, fontWeight:700, width:130, outline:'none' }}
              onFocus={e=>e.target.style.borderColor=C.accent}
              onBlur={e=>e.target.style.borderColor=C.border}/>
            <span style={{ fontSize:13, color:C.textMuted }}>/mo</span>
          </div>
        </div>

        {/* Stat tiles */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
          <StatTile label="Total Budget"  value={`$${income.toLocaleString()}`}     sub="monthly income"   color={C.accent} glowClass="glow-blue"   delay="1" icon={<Icon.dollar/>}/>
          <StatTile label="Total Spent"   value={`$${totalSpent.toLocaleString()}`} sub={`of $${income.toLocaleString()}`} color={C.amber}  glowClass="glow-amber"  delay="2" icon={<Icon.trending/>}/>
          <StatTile label="Remaining"     value={`${remaining<0?'-':''}$${Math.abs(remaining).toLocaleString()}`} sub={remaining<0?'⚠️ Over budget':'left this month'} color={remaining<0?C.red:C.green} glowClass="glow-green" delay="3" icon={<Icon.budget/>}/>
          <StatTile label="Projects"      value={projects.length} sub={`${projects.length===1?'project':'projects'} tracked`} color={C.purple} glowClass="glow-purple" delay="4" icon={<Icon.projects/>}/>
        </div>

        {/* 50/30/20 + Trend charts */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="a-fadeUp3" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'20px 22px' }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>50/30/20 Budget Rule</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:18 }}>Your actual vs recommended split</div>
            {loading
              ? <div style={{ display:'flex', justifyContent:'center', padding:30 }}><div className="spin" style={{ width:24, height:24, border:`2px solid ${C.border}`, borderTopColor:C.accent, borderRadius:'50%' }}/></div>
              : ['needs','wants','investment'].map(cat=>{
                  const pct=Math.round(actual[cat]), target=targets[cat], over=pct>target;
                  return (
                    <div key={cat} style={{ marginBottom:14 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:8, height:8, borderRadius:'50%', background:CAT_COLOR[cat] }}/>
                          <span style={{ fontSize:13, fontWeight:600 }}>{CAT_LABEL[cat]}</span>
                          <span style={{ fontSize:11, color:C.textMuted }}>target {target}%</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:13, fontWeight:700, color:CAT_COLOR[cat] }}>${totals[cat].toLocaleString()}</span>
                          <span style={{ fontSize:11, fontWeight:600, color:over?C.red:C.textMuted }}>{pct}%</span>
                        </div>
                      </div>
                      <BarLine value={pct} color={over?C.amber:CAT_COLOR[cat]}/>
                    </div>
                  );
                })
            }
          </div>

          <div className="a-fadeUp4" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'20px 22px' }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Spending by Week</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:20 }}>Based on your project dates</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weekData} margin={{ top:5, right:5, bottom:0, left:5 }}>
                <defs><linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent} stopOpacity={.2}/><stop offset="95%" stopColor={C.accent} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                <XAxis dataKey="label" tick={{ fill:C.textMuted, fontSize:11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:C.textMuted, fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`} width={44}/>
                <Tooltip contentStyle={TT} formatter={v=>[`$${v.toLocaleString()}`,'Spent']}/>
                <Area type="monotone" dataKey="spent" stroke={C.accent} strokeWidth={2} fill="url(#gw)" dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent projects */}
        {projects.length>0 && (
          <div className="a-fadeUp5" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16 }}>
            <div style={{ padding:'16px 20px', borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:15, fontWeight:700 }}>Recent Projects</div>
            </div>
            {projects.slice(0,5).map((p,i)=>{
              const color=CAT_COLOR[p.category]||C.accent, label=CAT_LABEL[p.category]||'Other';
              return (
                <div key={p._id} className="tr-hover" style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 20px', borderBottom:i<Math.min(projects.length-1,4)?`1px solid ${C.border}`:'none', transition:'background .15s', cursor:'pointer' }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:color+'18', display:'flex', alignItems:'center', justifyContent:'center', color, flexShrink:0, fontSize:16 }}>
                    {p.category==='needs'?'🏠':p.category==='wants'?'🛍️':'📈'}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600 }}>{p.title}</div>
                    {p.description && <div style={{ fontSize:12, color:C.textMuted }}>{p.description}</div>}
                  </div>
                  <Badge label={label} color={p.category==='needs'?'blue':p.category==='wants'?'purple':'green'}/>
                  <div style={{ fontSize:15, fontWeight:700, color }}>${Number(p.amount).toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Smart Advice */}
        <SmartAdvice projects={projects} income={income}/>

        {/* Empty state */}
        {!loading && projects.length===0 && (
          <div className="a-fadeUp" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'40px 24px', textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>📊</div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>No data yet</div>
            <div style={{ fontSize:13, color:C.textMuted }}>Go to <strong>Projects</strong> to add your first budget item and see your 50/30/20 breakdown here.</div>
          </div>
        )}
      </div>
    </div>
  );
}

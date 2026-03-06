// FILE: src/components/ui/SmartAdvice.jsx
// Drop this into: front-end/src/components/ui/SmartAdvice.jsx
//
// The "Get Advanced AI Advice" button calls YOUR Express backend at
// POST /api/advice  — if that endpoint doesn't exist yet it falls back
// to a richer rule-based message, so it always works either way.

import { useState } from 'react';
import { C } from '../styles/tokens';

const IcoSparkle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M9 1v3M9 14v3M1 9h3M14 9h3M3.2 3.2l2.1 2.1M12.7 12.7l2.1 2.1M3.2 14.8l2.1-2.1M12.7 5.3l2.1-2.1"/>
    <circle cx="9" cy="9" r="2.5" fill="currentColor" fillOpacity=".2"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8"/><polyline points="6,10 9,13 14,7"/>
  </svg>
);
const IcoWarn = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2L18 17H2z"/><line x1="10" y1="8" x2="10" y2="12"/><circle cx="10" cy="15.5" r=".8" fill="currentColor"/>
  </svg>
);
const IcoBulb = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2a6 6 0 016 6c0 2.5-1.5 4.5-3.5 5.5V15a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5v-1.5C5.5 12.5 4 10.5 4 8a6 6 0 016-6z"/>
    <line x1="7.5" y1="17.5" x2="12.5" y2="17.5"/>
  </svg>
);

const getRuleAdvice = (projects, income) => {
  if (!income || income <= 0) return { text: 'Set your monthly income above to get personalised financial advice.', type: 'info' };
  if (!projects.length)       return { text: 'Add your first project on the Projects page to start getting budget advice.', type: 'info' };
  const t = {
    needs:  projects.filter(p => p.category === 'needs').reduce((s, p) => s + Number(p.amount), 0),
    wants:  projects.filter(p => p.category === 'wants').reduce((s, p) => s + Number(p.amount), 0),
    invest: projects.filter(p => p.category === 'investment').reduce((s, p) => s + Number(p.amount), 0),
  };
  const np = (t.needs / income) * 100, wp = (t.wants / income) * 100, ip = (t.invest / income) * 100;
  if (np > 50) return { text: `Your Needs spending (${np.toFixed(1)}%) exceeds the 50% target. Look for ways to reduce fixed expenses.`, type: 'warn' };
  if (wp > 30) return { text: `Your Wants spending (${wp.toFixed(1)}%) exceeds the 30% target. Try the 30-day rule before non-essential purchases.`, type: 'warn' };
  if (ip < 20) return { text: `Your Savings are below 20% (currently ${ip.toFixed(1)}%). Increase investments for long-term stability.`, type: 'warn' };
  return { text: '✅ Excellent! Your finances align with the 50/30/20 rule. Keep building your investment portfolio!', type: 'good' };
};

const getFallback = (projects, income) => {
  const t = {
    needs:  projects.filter(p => p.category === 'needs').reduce((s, p) => s + Number(p.amount), 0),
    wants:  projects.filter(p => p.category === 'wants').reduce((s, p) => s + Number(p.amount), 0),
    invest: projects.filter(p => p.category === 'investment').reduce((s, p) => s + Number(p.amount), 0),
  };
  const remaining = income - t.needs - t.wants - t.invest;
  const tips = [];
  if (t.invest < income * 0.2) tips.push(`Automate savings: transfer $${Math.round(income * 0.2 - t.invest)} more/month into investments.`);
  if (t.wants  > income * 0.3) tips.push("Audit subscriptions — cancel anything unused in the last 3 months.");
  if (remaining > 0)           tips.push(`You have $${remaining.toLocaleString()} unallocated — assign it to an emergency fund or index fund.`);
  if (!tips.length)            tips.push("Consider diversifying: 60% index funds, 30% bonds, 10% high-yield savings.");
  return tips.join(' ');
};

const THEMES = {
  good: { bg: 'rgba(16,185,129,.08)',  border: 'rgba(16,185,129,.25)', color: C.green,  Ico: IcoCheck  },
  warn: { bg: 'rgba(245,158,11,.08)',  border: 'rgba(245,158,11,.25)', color: C.amber,  Ico: IcoWarn   },
  info: { bg: 'rgba(59,130,246,.08)',  border: 'rgba(59,130,246,.20)', color: C.accent, Ico: IcoBulb   },
  ai:   { bg: 'rgba(139,92,246,.08)', border: 'rgba(139,92,246,.25)', color: C.purple, Ico: IcoSparkle },
};

const SmartAdvice = ({ projects = [], income = 0 }) => {
  const [aiText,  setAiText]  = useState('');
  const [loading, setLoading] = useState(false);
  const [showAi,  setShowAi]  = useState(false);

  const rule   = getRuleAdvice(projects, income);
  const active = showAi && aiText ? { text: aiText, type: 'ai' } : rule;
  const theme  = THEMES[active.type] || THEMES.info;
  const Ico    = theme.Ico;
  const canAsk = income > 0 && !loading;

  const handleGetAI = async () => {
    setLoading(true); setShowAi(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/advice`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({
            income,
            needs:      projects.filter(p => p.category === 'needs').reduce((s, p) => s + Number(p.amount), 0),
            wants:      projects.filter(p => p.category === 'wants').reduce((s, p) => s + Number(p.amount), 0),
            investment: projects.filter(p => p.category === 'investment').reduce((s, p) => s + Number(p.amount), 0),
          }),
        }
      );
      if (!res.ok) throw new Error('no endpoint');
      const data = await res.json();
      setAiText(data.advice || data.message || 'No advice returned.');
      setShowAi(true);
    } catch {
      setAiText(getFallback(projects, income));
      setShowAi(true);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '16px 22px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(139,92,246,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.purple, flexShrink: 0 }}>
          <IcoSparkle size={16} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Smart Financial Advice</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>AI-powered insights based on your spending patterns</div>
        </div>
      </div>

      <div style={{ padding: '18px 22px' }}>
        <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: theme.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.color, flexShrink: 0 }}>
            <Ico />
          </div>
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 2 }}>
                {[85, 100, 65].map((w, i) => (
                  <div key={i} style={{ height: 12, borderRadius: 6, background: C.surfaceEl, width: `${w}%` }} />
                ))}
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Analysing your budget…</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: theme.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>
                  {showAi ? 'Advanced AI Advice' : 'Smart Advice'}
                </div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.65, margin: 0 }}>{active.text}</p>
              </>
            )}
          </div>
        </div>

        <button onClick={handleGetAI} disabled={!canAsk}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, border: 'none', background: !canAsk ? C.surfaceEl : 'linear-gradient(135deg,#6366F1,#8B5CF6)', color: !canAsk ? C.textMuted : '#fff', fontSize: 14, fontWeight: 600, cursor: !canAsk ? 'not-allowed' : 'pointer', transition: 'all .18s' }}
          onMouseEnter={e => { if (canAsk) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,.35)'; }}}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          {loading
            ? <><span className="spin" style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%' }} /> Analysing…</>
            : <><IcoSparkle size={14} /> Get Advanced AI Advice</>}
        </button>
        {income <= 0 && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 8 }}>Set your monthly income to unlock AI advice</div>}
      </div>
    </div>
  );
};

export default SmartAdvice;

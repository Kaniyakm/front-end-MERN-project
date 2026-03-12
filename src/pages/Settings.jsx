// FILE: src/pages/Settings.jsx
import { useState } from 'react';
import { useAuth }  from '../context/AuthContext';
import { TopBar }   from '../components/layout/Layout';
import { Avatar }   from '../components/ui/Atoms';
import { colors as C } from '../styles/tokens';

const Svg = ({ children, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icon = {
  user:    () => <Svg><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></Svg>,
  lock:    () => <Svg><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Svg>,
  bell:    () => <Svg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Svg>,
  trash:   () => <Svg><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></Svg>,
  check:   () => <Svg><polyline points="20 6 9 17 4 12"/></Svg>,
  palette: () => <Svg><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0c0 2-1.5 3-4 3s-4-1-4-3z"/></Svg>,
  shield:  () => <Svg><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>,
};

const Section = ({ title, icon, children }) => (
  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden' }}>
    <div style={{ padding:'16px 22px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:10 }}>
      <span style={{ color:C.accent }}>{icon}</span>
      <span style={{ fontSize:15, fontWeight:700 }}>{title}</span>
    </div>
    <div style={{ padding:'20px 22px', display:'flex', flexDirection:'column', gap:16 }}>
      {children}
    </div>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
    <label style={{ fontSize:12, fontWeight:600, color:C.textMuted, textTransform:'uppercase', letterSpacing:'.06em' }}>{label}</label>
    {children}
    {hint && <span style={{ fontSize:11, color:C.textFaint }}>{hint}</span>}
  </div>
);

const inp = { background:C.surfaceEl, border:`1.5px solid ${C.border}`, borderRadius:10, padding:'9px 12px', color:C.text, fontSize:14, outline:'none', width:'100%' };

const Toggle = ({ value, onChange, label, sub }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0' }}>
    <div>
      <div style={{ fontSize:14, fontWeight:600 }}>{label}</div>
      {sub && <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>{sub}</div>}
    </div>
    <div onClick={onChange} style={{ width:44, height:24, borderRadius:12, background:value?C.accent:C.border, cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left:value?22:3, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left .2s', boxShadow:'0 1px 4px rgba(0,0,0,.3)' }} />
    </div>
  </div>
);

export default function Settings() {
  const { user, logout } = useAuth();

  const [profile,  setProfile]  = useState({ name: user?.username || 'User', email: user?.email || '' });
  const [saved,    setSaved]    = useState(false);
  const [notifs,   setNotifs]   = useState({ budget: true, weekly: false, tips: true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearData = () => {
    if (!window.confirm('Clear all project data? This cannot be undone.')) return;
    localStorage.removeItem('bb_projects');
    localStorage.removeItem('bb_income');
    window.location.reload();
  };

  return (
    <div style={{ flex:1, overflow:'auto' }}>
      <TopBar title="Settings" subtitle="Manage your account and preferences" />

      <div style={{ padding:'22px 26px', display:'flex', flexDirection:'column', gap:18, maxWidth:720 }}>

        {/* Profile card */}
        <div className="a-fadeUp" style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:'24px 26px', display:'flex', alignItems:'center', gap:20 }}>
          <Avatar name={user?.username || 'User'} size={64} />
          <div>
            <div style={{ fontSize:18, fontWeight:800 }}>{user?.username || 'User'}</div>
            <div style={{ fontSize:13, color:C.textMuted, marginTop:3 }}>{user?.email || 'No email'}</div>
            <div style={{ marginTop:8, display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20, background:C.accentSoft, color:C.accent, fontSize:12, fontWeight:600 }}>
              Personal Plan
            </div>
          </div>
        </div>

        {/* Profile settings */}
        <Section title="Profile" icon={<Icon.user />}>
          <Field label="Display Name">
            <input style={inp} value={profile.name} onChange={e => setProfile(v=>({...v, name:e.target.value}))}
              onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
          </Field>
          <Field label="Email Address" hint="Used for account recovery only">
            <input style={inp} type="email" value={profile.email} onChange={e=>setProfile(v=>({...v,email:e.target.value}))}
              onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
          </Field>
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button onClick={handleSave} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 20px', borderRadius:10, border:'none', background:saved?C.green:C.accent, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', transition:'background .3s' }}>
              <Icon.check /> {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={<Icon.bell />}>
          <Toggle value={notifs.budget}  onChange={()=>setNotifs(v=>({...v,budget:!v.budget}))}   label="Budget Alerts"   sub="Notify when you exceed a category target" />
          <div style={{ height:1, background:C.border }} />
          <Toggle value={notifs.weekly}  onChange={()=>setNotifs(v=>({...v,weekly:!v.weekly}))}   label="Weekly Summary"  sub="Get a weekly breakdown of your spending" />
          <div style={{ height:1, background:C.border }} />
          <Toggle value={notifs.tips}    onChange={()=>setNotifs(v=>({...v,tips:!v.tips}))}       label="Finance Tips"    sub="Occasional tips to improve your budget" />
        </Section>

        {/* Security */}
        <Section title="Security" icon={<Icon.shield />}>
          <Field label="Current Password">
            <input style={inp} type="password" placeholder="••••••••"
              onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
          </Field>
          <Field label="New Password">
            <input style={inp} type="password" placeholder="••••••••"
              onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
          </Field>
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 20px', borderRadius:10, border:'none', background:C.accent, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}>
              <Icon.lock /> Update Password
            </button>
          </div>
        </Section>

        {/* Danger zone */}
        <Section title="Data" icon={<Icon.trash />}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600 }}>Clear All Project Data</div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>Permanently delete all your projects and budget data</div>
            </div>
            <button onClick={handleClearData} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:10, border:`1px solid ${C.redSoft}`, background:C.redSoft, color:C.red, fontSize:13, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
              <Icon.trash /> Clear Data
            </button>
          </div>
          <div style={{ height:1, background:C.border }} />
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600 }}>Sign Out</div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:2 }}>Sign out of your account on this device</div>
            </div>
            <button onClick={logout} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:10, border:`1px solid ${C.border}`, background:C.surfaceEl, color:C.textMuted, fontSize:13, fontWeight:600, cursor:'pointer' }}>
              Sign Out
            </button>
          </div>
        </Section>

      </div>
    </div>
  );
}

// src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = {
  accent:     '#3B82F6',
  accentSoft: 'rgba(59,130,246,0.15)',
  accentGlow: 'rgba(59,130,246,0.35)',
  border:     'rgba(255,255,255,0.08)',
  surfaceEl:  'rgba(255,255,255,0.06)',
  textMuted:  'rgba(255,255,255,0.45)',
  textFaint:  'rgba(255,255,255,0.25)',
};

const Svg = ({ children, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icon = {
  logo:   () => <Svg size={22}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></Svg>,
  user:   () => <Svg><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></Svg>,
  mail:   () => <Svg><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></Svg>,
  lock:   () => <Svg><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Svg>,
  eye:    () => <Svg><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>,
  eyeOff: () => <Svg><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></Svg>,
};

function InputField({ label, icon, type = 'text', placeholder, value, onChange, error, rightEl }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</label>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.surfaceEl, border: `1px solid ${error ? '#EF4444' : focused ? C.accent : C.border}`, borderRadius: 10, padding: '10px 14px', transition: 'border-color .2s' }}>
        {icon && <span style={{ color: focused ? C.accent : C.textMuted, display: 'flex', flexShrink: 0 }}>{icon}</span>}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: '#fff' }} />
        {rightEl && <span style={{ color: C.textMuted, display: 'flex', cursor: 'pointer', flexShrink: 0 }}>{rightEl}</span>}
      </div>
      {error && <span style={{ fontSize: 11, color: '#EF4444', paddingLeft: 2 }}>{error}</span>}
    </div>
  );
}

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode,     setMode]    = useState('login');
  const [username, setUsername]= useState('');       // backend field is "username"
  const [email,    setEmail]   = useState('');
  const [password, setPassword]= useState('');
  const [showPass, setShowPass]= useState(false);
  const [loading,  setLoading] = useState(false);
  const [errors,   setErrors]  = useState({});
  const [apiError, setApiError]= useState('');

  const validate = () => {
    const e = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email required';
    if (!password || password.length < 6)        e.password = 'Password must be 6+ characters';
    if (mode === 'register' && !username.trim()) e.username = 'Username is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ username, email, password });
      }
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0B0F1A 0%, #111520 60%, #0D1117 100%)' }}>
      <div style={{ position: 'absolute', top: '10%',    left: '15%',  width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)',  pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <div style={{ background: 'rgba(17,21,32,0.9)', backdropFilter: 'blur(24px)', border: `1px solid ${C.border}`, borderRadius: 20, padding: '36px 36px 32px', boxShadow: '0 32px 80px rgba(0,0,0,.6)' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accentSoft, border: `1px solid ${C.accentGlow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent }}>
              <Icon.logo />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em', color: '#fff' }}>Balance Blueprint</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Financial Management</div>
            </div>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 6, color: '#fff' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 24 }}>
            {mode === 'login' ? 'Sign in to manage your finances' : 'Start tracking your budget today'}
          </p>

          <div style={{ display: 'flex', background: C.surfaceEl, borderRadius: 10, padding: 3, marginBottom: 24 }}>
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); setApiError(''); }}
                style={{ flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: mode === m ? C.accent : 'transparent', color: mode === m ? '#fff' : C.textMuted, transition: 'all .2s' }}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'register' && (
              <InputField
                label="Username"
                icon={<Icon.user />}
                placeholder="alicekennedy"
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={errors.username}
              />
            )}
            <InputField label="Email address" icon={<Icon.mail />} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
            <InputField label="Password" icon={<Icon.lock />} type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} error={errors.password}
              rightEl={<span onClick={() => setShowPass(s => !s)}>{showPass ? <Icon.eyeOff /> : <Icon.eye />}</span>} />
          </div>

          {apiError && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 13, color: '#EF4444' }}>
              {apiError}
            </div>
          )}

          {mode === 'login' && !apiError && (
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button style={{ fontSize: 13, color: C.accent, background: 'none', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginTop: 22, padding: '13px', background: loading ? C.border : `linear-gradient(135deg, ${C.accent}, #6366F1)`, color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading
              ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />{mode === 'login' ? 'Signing in…' : 'Creating account…'}</>
              : mode === 'login' ? 'Sign In →' : 'Create Account →'
            }
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: C.textMuted, marginTop: 18 }}>
            By continuing you agree to our <span style={{ color: C.accent, cursor: 'pointer' }}>Terms of Service</span>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}



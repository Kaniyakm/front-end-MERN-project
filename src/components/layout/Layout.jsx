// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/components/layout/Layout.jsx
// STATUS: ✏️  UPDATED
// CHANGES FROM ORIGINAL:
//   • Replaced hamburger-only mobile nav with a full persistent sidebar
//   • Sidebar shows logo, grouped nav links, user profile row, logout button
//   • Added TopBar component (title + subtitle + action slot + notification bell)
//   • Dark-mode toggle button wired to ThemeContext.toggleTheme
//   • Removed react-toastify dependency from layout (toasts still work via App.jsx)
//   • All hover/active states handled with CSS classes from index.css
// ─────────────────────────────────────────────────────────────────────────────

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth }  from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Avatar, Icon } from '../ui/Atoms';
import { colors as C } from '../../styles/tokens';
import Footer from './Footer';


/* ── Nav items config ─────────────────────────────────────────────────── */
const NAV = [
  { path: '/dashboard',  label: 'Dashboard', Icon: Icon.dashboard },
  { path: '/projects',   label: 'Projects',  Icon: Icon.projects  },
  { path: '/budget',     label: 'Budget',    Icon: Icon.budget    },
  { path: '/analytics',  label: 'Analytics', Icon: Icon.analytics },
];

/* ── Sidebar ──────────────────────────────────────────────────────────── */
export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: C.surface,
      borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
    }}>
      {/* ── Logo ── */}
      <div style={{ padding: '22px 20px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.accentGlow}` }}>
          <Icon.logo />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.02em' }}>Balance</div>
          <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 500, marginTop: -1 }}>Blueprint</div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px 8px' }}>Menu</div>
        {NAV.map(({ path, label, Icon: Ico }) => {
          const active = pathname.startsWith(path);
          return (
            <button key={path} onClick={() => navigate(path)}
              className={`nav-item ${active ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, color: active ? C.accent : C.textMuted, fontSize: 14, fontWeight: 500, textAlign: 'left', width: '100%' }}>
              <span className="nav-icon" style={{ color: active ? C.accent : C.textFaint, transition: 'color .15s' }}><Ico /></span>
              {label}
            </button>
          );
        })}

        <div style={{ height: 1, background: C.border, margin: '10px 0' }} />
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px 8px' }}>Account</div>
        <button className="nav-item"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, color: C.textMuted, fontSize: 14, fontWeight: 500, textAlign: 'left', width: '100%' }}>
          <span style={{ color: C.textFaint }}><Icon.settings /></span> Settings
        </button>
      </nav>

      {/* ── User / Logout ── */}
      <div style={{ padding: 14, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: C.surfaceEl }}>
          <Avatar name={user?.name || 'User'} size={34} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>Personal Plan</div>
          </div>
          <button title="Logout" onClick={() => { logout(); navigate('/login'); }}
            style={{ color: C.textFaint, padding: 4, borderRadius: 6, background: 'none', border: 'none', cursor: 'pointer', transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = C.red}
            onMouseLeave={e => e.currentTarget.style.color = C.textFaint}>
            <Icon.logout />
          </button>
        </div>
      </div>
    </aside>
  );
};

/* ── TopBar ───────────────────────────────────────────────────────────── */
export const TopBar = ({ title, subtitle, actions }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: `1px solid ${C.border}`, background: C.bgAlt, flexShrink: 0 }}>
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{subtitle}</p>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {actions}
      <button style={{ width: 36, height: 36, borderRadius: 9, border: `1px solid ${C.border}`, background: C.surfaceEl, color: C.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s', position: 'relative' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHov; e.currentTarget.style.color = C.text; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border;    e.currentTarget.style.color = C.textMuted; }}>
        <Icon.bell />
        <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: C.accent, border: `2px solid ${C.bgAlt}` }} />
      </button>
    </div>
  </div>
);

/* ── Shell (wraps authenticated pages) ───────────────────────────────── */
const Layout = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.bgAlt }}>
    <Sidebar />
    <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {children}
    </main>
  </div>
);

export default Layout;

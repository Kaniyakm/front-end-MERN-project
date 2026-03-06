// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/routes/ProtectedRoute.jsx
// STATUS: ✏️  UPDATED
// CHANGES FROM ORIGINAL:
//   • Now reads isLoading from AuthContext — shows a centered spinner while
//     auth state is being rehydrated from sessionStorage on first render,
//     preventing a flash-redirect to /login on page refresh
//   • Wraps children in <Layout> (sidebar + topbar shell) automatically,
//     so individual page components don't need to import Layout themselves
// ─────────────────────────────────────────────────────────────────────────────

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import { colors as C } from '../styles/tokens';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Waiting for sessionStorage rehydration
  if (isLoading) return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="spin" style={{ width:32, height:32, border:`3px solid ${C.border}`, borderTopColor:C.accent, borderRadius:'50%' }} />
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return <Layout>{children}</Layout>;
}

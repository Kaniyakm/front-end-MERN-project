// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/main.jsx
// STATUS: ✏️  UPDATED
// CHANGES FROM ORIGINAL:
//   • Import path for index.css updated to './styles/index.css'
//     (CSS moved from src/ root to src/styles/ for organisation)
//   • StrictMode kept — helps catch double-render issues in dev
// ─────────────────────────────────────────────────────────────────────────────

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './styles/index.css';  // ✅ Updated path for CSS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>   {/* ✅ Required — wraps entire app so useAuth() works */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
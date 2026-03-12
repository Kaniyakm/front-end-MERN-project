// FILE: src/components/layout/Footer.jsx
import { colors as C } from '../../styles/tokens';

const Svg = ({ children, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const HeartIcon = () => (
  <Svg size={12}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={C.red} stroke={C.red}/>
  </Svg>
);

export default function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: '12px 26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      background: C.surface,
      flexWrap: 'wrap',
      gap: 8,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:C.textFaint }}>
        <span>© {new Date().getFullYear()} Balance Blueprint</span>
        <span style={{ color:C.border }}>·</span>
        <span>50/30/20 Rule</span>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:C.textMuted }}>
        <span>Built with</span>
        <HeartIcon />
        <span>by</span>
        <span style={{ fontWeight:700, color:C.accent, letterSpacing:'-.01em' }}>Kaniya Martin</span>
      </div>
    </footer>
  );
}
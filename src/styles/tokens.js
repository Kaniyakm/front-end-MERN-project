// FILE: src/styles/tokens.js
export const C = {
  bg:         '#07090D',
  bgAlt:      '#0C0F15',
  surface:    '#111520',
  surfaceHov: '#161B28',
  surfaceEl:  '#1A2030',
  border:     '#1E2535',
  borderHov:  '#2A3347',
  accent:     '#3B82F6',
  accentHov:  '#2563EB',
  accentGlow: 'rgba(59,130,246,0.20)',
  accentSoft: 'rgba(59,130,246,0.10)',
  green:      '#10B981',
  greenSoft:  'rgba(16,185,129,0.10)',
  amber:      '#F59E0B',
  amberSoft:  'rgba(245,158,11,0.10)',
  red:        '#EF4444',
  redSoft:    'rgba(239,68,68,0.10)',
  purple:     '#8B5CF6',
  purpleSoft: 'rgba(139,92,246,0.10)',
  pink:       '#EC4899',
  text:       '#E8EDF5',
  textMuted:  '#7B8599',
  textFaint:  '#3A4255',
};

// Alias so both `import { C }` and `import { colors as C }` work
export const colors = C;

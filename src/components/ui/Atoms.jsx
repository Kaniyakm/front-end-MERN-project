import React from "react";

/* -------------------------------------------------------------------------- */
/* AVATAR                                                                      */
/* -------------------------------------------------------------------------- */
export const Avatar = ({ name = "U", size = 32 }) => {
  const chars = name
    .trim()
    .split(" ")
    .map((w) => w[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hue = (name.charCodeAt(0) * 47) % 360;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `hsl(${hue}, 70%, 50%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: size * 0.4,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {chars}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* BUTTON                                                                      */
/* -------------------------------------------------------------------------- */
export const Btn = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  style = {},
}) => {
  const base = {
    padding: size === "sm" ? "6px 12px" : "10px 16px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: size === "sm" ? 13 : 14,
  };

  const variants = {
    primary: { background: "#6366F1", color: "white" },
    ghost:   { background: "transparent", color: "#6366F1" },
    danger:  { background: "#EF4444", color: "white" },
  };

  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* PROGRESS BAR                                                                */
/* -------------------------------------------------------------------------- */
export const Progress = ({ value = 0, color = "#6366F1", height = 6 }) => (
  <div
    style={{
      width: "100%",
      height,
      background: "rgba(255,255,255,0.08)",
      borderRadius: 4,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(100, value)}%`,
        height: "100%",
        background: color,
        borderRadius: 4,
        transition: "width 0.4s ease",
      }}
    />
  </div>
);

/* -------------------------------------------------------------------------- */
/* BADGE                                                                       */
/* -------------------------------------------------------------------------- */
export const Badge = ({
  label,
  children,
  color = "#6366F1",
  bg = "#EEF2FF",
  style = {},
}) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      color,
      background: bg,
      ...style,
    }}
  >
    {label ?? children}
  </span>
);

/* -------------------------------------------------------------------------- */
/* INPUT FIELD                                                                 */
/* -------------------------------------------------------------------------- */
export const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  icon,
  error,
  rightEl,
}) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: ".04em", textTransform: "uppercase" }}>
          {label}
        </label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${error ? "#EF4444" : focused ? "#3B82F6" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 10, padding: "10px 14px",
        transition: "border-color .2s",
      }}>
        {icon && (
          <span style={{ color: focused ? "#3B82F6" : "rgba(255,255,255,0.45)", display: "flex", flexShrink: 0 }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontSize: 14, color: "#fff",
          }}
        />
        {rightEl && (
          <span style={{ color: "rgba(255,255,255,0.45)", display: "flex", cursor: "pointer", flexShrink: 0 }}>
            {rightEl}
          </span>
        )}
      </div>
      {error && <span style={{ fontSize: 11, color: "#EF4444", paddingLeft: 2 }}>{error}</span>}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ICON SET — SVG-based, no external dependency                                */
/* -------------------------------------------------------------------------- */
const Svg = ({ children, size = 16 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const Icon = {
  /* nav */
  dashboard: () => <Svg><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Svg>,
  projects:  () => <Svg><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 7V5"/><path d="M16 7V5"/><path d="M3 11h18"/></Svg>,
  budget:    () => <Svg><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></Svg>,
  analytics: () => <Svg><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Svg>,
  settings:  () => <Svg><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></Svg>,
  logout:    () => <Svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Svg>,

  /* logo */
  logo:      () => <Svg size={20}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></Svg>,

  /* topbar */
  bell:      () => <Svg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Svg>,
  moon:      () => <Svg><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Svg>,
  sun:       () => <Svg><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Svg>,

  /* stat cards */
  dollar:    () => <Svg><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Svg>,
  trending:  () => <Svg><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></Svg>,
  chevronR:  () => <Svg size={14}><polyline points="9 18 15 12 9 6"/></Svg>,

  /* actions */
  plus:      () => <Svg><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  dots:      () => <Svg><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></Svg>,
  search:    () => <Svg><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>,
  edit:      () => <Svg><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Svg>,
  trash:     () => <Svg><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></Svg>,

  /* misc */
  user:      () => <Svg><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></Svg>,
  mail:      () => <Svg><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></Svg>,
  lock:      () => <Svg><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Svg>,
  eye:       () => <Svg><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>,
  eyeOff:    () => <Svg><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></Svg>,
};
import { useState } from "react";

/* ─── Minimal inline SVG icons ─── */
const icons = {
  search: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  trophy: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  ),
  barChart: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  ),
  fileText: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
  ),
  palette: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
  ),
  folder: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
  ),
  lightbulb: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
  ),
  helpCircle: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  target: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  pin: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
  ),
  pen: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
  ),
  anchor: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
  ),
  file: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  ),
  clipboard: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
  ),
  mousePointer: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>
  ),
  flask: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 9V3"/><path d="M14 9V3"/><path d="m10 9-5.4 8.1A2 2 0 0 0 6.3 20h11.4a2 2 0 0 0 1.7-2.9L14 9"/></svg>
  ),
  scale: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  ),
  users: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  shuffle: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
  ),
  megaphone: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
  ),
  trendingUp: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
  ),
  award: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  ),
  brain: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
  ),
  eye: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  refresh: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
  ),
  rocket: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
  ),
  x: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  cornerDownLeft: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>
  ),
  zap: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  flame: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
  ),
  user: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  chevronDown: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  chevronUp: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
  ),
};

/* ─── Data ─── */
const phaseSteps = [
  {
    id: "research",
    icon: icons.search,
    label: "Research",
    color: "#FF6B35",
    children: [
      { label: "Competitor Research", icon: icons.trophy },
      { label: "Market Research", icon: icons.barChart },
      { label: "Ad Copy Breakdowns", icon: icons.fileText },
      { label: "Creative Breakdowns", icon: icons.palette },
      { label: "Data Analysis", icon: icons.folder },
    ],
  },
  {
    id: "hypotheses",
    icon: icons.lightbulb,
    label: "Hypotheses",
    color: "#FFD700",
    children: [
      { label: "What to Test", icon: icons.helpCircle },
      { label: "Why It Matters", icon: icons.target },
      { label: "Expected Outcome", icon: icons.pin },
    ],
  },
  {
    id: "writing",
    icon: icons.pen,
    label: "Writing",
    color: "#4ECDC4",
    children: [
      { label: "Hooks & Angles", icon: icons.anchor },
      { label: "Scripts", icon: icons.file },
      { label: "Creative Briefs", icon: icons.clipboard },
      { label: "CTAs", icon: icons.mousePointer },
    ],
  },
  {
    id: "testing",
    icon: icons.flask,
    label: "Testing",
    color: "#A78BFA",
    children: [
      { label: "A/B Tests", icon: icons.scale },
      { label: "Audience Splits", icon: icons.users },
      { label: "Creative Variables", icon: icons.shuffle },
      { label: "Channel Strategy", icon: icons.megaphone },
    ],
  },
  {
    id: "results",
    icon: icons.trendingUp,
    label: "Results",
    color: "#34D399",
    children: [
      { label: "Performance Metrics", icon: icons.barChart },
      { label: "Winning Creatives", icon: icons.award },
      { label: "Key Learnings", icon: icons.brain },
      { label: "Audience Insights", icon: icons.eye },
    ],
  },
  {
    id: "optimization",
    icon: icons.refresh,
    label: "Optimization",
    color: "#F472B6",
    children: [
      { label: "Scale Winners", icon: icons.rocket },
      { label: "Kill Losers", icon: icons.x },
      { label: "Feed Back to Research", icon: icons.cornerDownLeft },
      { label: "Iterate & Improve", icon: icons.zap },
    ],
  },
];

const introCards = [
  { label: "What's the Hype?", icon: icons.flame, desc: "The creative opportunity" },
  { label: "Why Creative Strategy?", icon: icons.target, desc: "The competitive edge" },
  { label: "Who Is It For?", icon: icons.user, desc: "ICP & audience profiling" },
];

/* ─── Component ─── */
export default function CreativeStrategyFlow() {
  const [active, setActive] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        background: "#0c0c0c",
        minHeight: "100vh",
        padding: "48px 24px",
        color: "white",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandIn {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        .card { animation: fadeIn 0.3s ease forwards; }
        .step-card { transition: all 0.2s ease; }
        .step-card:hover { transform: translateY(-3px); }
        .child-list { animation: expandIn 0.3s ease forwards; overflow: hidden; }
      `}</style>

      {/* ─── Title ─── */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.4em",
            color: "#555",
            marginBottom: 10,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Framework
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            background: "linear-gradient(135deg, #fff 40%, #666)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          Creative Strategy
        </h1>
        <p style={{ fontSize: 14, color: "#444", marginTop: 10, fontWeight: 400 }}>
          Click any phase to explore its components
        </p>
      </div>

      {/* ─── Intro Cards ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {introCards.map((c) => (
          <div
            key={c.label}
            style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 10,
              padding: "18px 24px",
              minWidth: 180,
              textAlign: "center",
              transition: "border-color 0.2s ease",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6, color: "#888", display: "flex", justifyContent: "center" }}>
              {c.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd", letterSpacing: "0.01em" }}>
              {c.label}
            </div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 4, fontWeight: 400 }}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Connector ─── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(to bottom, transparent, #444)",
          }}
        />
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            color: "#444",
            textTransform: "uppercase",
            margin: "10px 0",
            fontWeight: 600,
          }}
        >
          The Process
        </div>
        <div
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(to bottom, #444, transparent)",
          }}
        />
      </div>

      {/* ─── Phase Steps ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))",
          gap: 14,
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        {phaseSteps.map((step, i) => {
          const isActive = active === step.id;
          return (
            <div
              key={step.id}
              className="card"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
            >
              {/* Step Card */}
              <div
                className="step-card"
                onClick={() => setActive(isActive ? null : step.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(isActive ? null : step.id);
                  }
                }}
                style={{
                  background: isActive ? "#181818" : "#111",
                  border: `1px solid ${isActive ? step.color + "66" : "#1c1c1c"}`,
                  borderTop: `3px solid ${step.color}`,
                  borderRadius: 10,
                  padding: "20px 14px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: isActive
                    ? `0 4px 24px ${step.color}18`
                    : "0 1px 3px rgba(0,0,0,0.3)",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 12,
                    fontSize: 10,
                    color: "#333",
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: 30,
                    marginBottom: 10,
                    color: isActive ? step.color : "#666",
                    display: "flex",
                    justifyContent: "center",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? step.color : "#bbb",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: "#333",
                    display: "flex",
                    justifyContent: "center",
                    transition: "transform 0.2s ease",
                    transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  {icons.chevronDown}
                </div>
              </div>

              {/* Expanded Children */}
              {isActive && (
                <div
                  className="child-list"
                  style={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {step.children.map((child, ci) => (
                    <div
                      key={child.label}
                      className="card"
                      style={{
                        background: "#131313",
                        border: "1px solid #1c1c1c",
                        borderLeft: `3px solid ${step.color}`,
                        borderRadius: 8,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        animationDelay: `${ci * 0.04}s`,
                        opacity: 0,
                      }}
                    >
                      <span style={{ fontSize: 15, color: step.color, display: "flex", flexShrink: 0 }}>
                        {child.icon}
                      </span>
                      <span style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>
                        {child.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── Loop Indicator ─── */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid #1c1c1c",
            borderRadius: 24,
            padding: "8px 20px",
            background: "#111",
          }}
        >
          <span style={{ fontSize: 16, color: "#555", display: "flex" }}>{icons.refresh}</span>
          <span style={{ color: "#444", fontSize: 12, fontWeight: 500 }}>
            Optimization feeds back into Research — the loop never stops
          </span>
        </div>
      </div>
    </div>
  );
}

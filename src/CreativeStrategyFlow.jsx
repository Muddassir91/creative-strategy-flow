import { useState, useEffect, useRef } from "react";

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
  arrowRight: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  check: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
};

/* ─── Scroll-triggered fade-in hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Animated counter ─── */
function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 1200;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Section wrapper with scroll animation ─── */
function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Data ─── */
const phaseSteps = [
  {
    id: "research",
    icon: icons.search,
    label: "Research",
    desc: "Gather intelligence on competitors, markets, and creative landscape",
    color: "#E8553D",
    lightBg: "#FEF2F0",
    children: [
      { label: "Competitor Research", icon: icons.trophy, desc: "Analyze top-performing competitor ads" },
      { label: "Market Research", icon: icons.barChart, desc: "Identify trends and audience behavior" },
      { label: "Ad Copy Breakdowns", icon: icons.fileText, desc: "Deconstruct winning ad copy patterns" },
      { label: "Creative Breakdowns", icon: icons.palette, desc: "Study visual and format trends" },
      { label: "Data Analysis", icon: icons.folder, desc: "Mine historical performance data" },
    ],
  },
  {
    id: "hypotheses",
    icon: icons.lightbulb,
    label: "Hypotheses",
    desc: "Form testable predictions based on research insights",
    color: "#D4A017",
    lightBg: "#FDF8E8",
    children: [
      { label: "What to Test", icon: icons.helpCircle, desc: "Define specific variables to test" },
      { label: "Why It Matters", icon: icons.target, desc: "Tie hypotheses to business goals" },
      { label: "Expected Outcome", icon: icons.pin, desc: "Predict results and set benchmarks" },
    ],
  },
  {
    id: "writing",
    icon: icons.pen,
    label: "Writing",
    desc: "Craft compelling copy and creative direction documents",
    color: "#2BA89E",
    lightBg: "#EDF9F8",
    children: [
      { label: "Hooks & Angles", icon: icons.anchor, desc: "Attention-grabbing openers" },
      { label: "Scripts", icon: icons.file, desc: "Video and audio scripts" },
      { label: "Creative Briefs", icon: icons.clipboard, desc: "Direction for designers and editors" },
      { label: "CTAs", icon: icons.mousePointer, desc: "Conversion-driving calls to action" },
    ],
  },
  {
    id: "testing",
    icon: icons.flask,
    label: "Testing",
    desc: "Execute structured experiments across channels and audiences",
    color: "#8B6FD6",
    lightBg: "#F3F0FD",
    children: [
      { label: "A/B Tests", icon: icons.scale, desc: "Head-to-head creative comparisons" },
      { label: "Audience Splits", icon: icons.users, desc: "Segment targeting experiments" },
      { label: "Creative Variables", icon: icons.shuffle, desc: "Isolate format, copy, and visual variables" },
      { label: "Channel Strategy", icon: icons.megaphone, desc: "Platform-specific test plans" },
    ],
  },
  {
    id: "results",
    icon: icons.trendingUp,
    label: "Results",
    desc: "Measure outcomes and extract actionable insights",
    color: "#1FA87A",
    lightBg: "#EDFAF4",
    children: [
      { label: "Performance Metrics", icon: icons.barChart, desc: "CTR, ROAS, CPA, and more" },
      { label: "Winning Creatives", icon: icons.award, desc: "Identify top performers" },
      { label: "Key Learnings", icon: icons.brain, desc: "Document what worked and why" },
      { label: "Audience Insights", icon: icons.eye, desc: "Understand segment behavior" },
    ],
  },
  {
    id: "optimization",
    icon: icons.refresh,
    label: "Optimization",
    desc: "Scale winners, cut losers, and restart the cycle",
    color: "#D64D8A",
    lightBg: "#FDF0F5",
    children: [
      { label: "Scale Winners", icon: icons.rocket, desc: "Increase budget on proven creatives" },
      { label: "Kill Losers", icon: icons.x, desc: "Quickly cut underperformers" },
      { label: "Feed Back to Research", icon: icons.cornerDownLeft, desc: "Insights inform next research phase" },
      { label: "Iterate & Improve", icon: icons.zap, desc: "Continuous creative refinement" },
    ],
  },
];

const introCards = [
  {
    label: "The Opportunity",
    icon: icons.flame,
    desc: "Creative is the #1 lever for paid media performance. The best brands treat it as a system, not a guess.",
    color: "#E8553D",
    bg: "#FEF2F0",
  },
  {
    label: "The Edge",
    icon: icons.target,
    desc: "A structured creative strategy compounds over time. Every test adds to your knowledge base and sharpens your instinct.",
    color: "#2BA89E",
    bg: "#EDF9F8",
  },
  {
    label: "The Audience",
    icon: icons.user,
    desc: "For growth marketers, creative strategists, and performance teams who want a repeatable process for winning ads.",
    color: "#8B6FD6",
    bg: "#F3F0FD",
  },
];

const stats = [
  { value: 56, suffix: "%", label: "of ad performance is driven by creative" },
  { value: 3, suffix: "x", label: "ROAS lift from structured testing" },
  { value: 80, suffix: "%", label: "of top brands use creative frameworks" },
];

/* ─── Component ─── */
export default function CreativeStrategyFlow() {
  const [active, setActive] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        background: "#fafafa",
        minHeight: "100vh",
        color: "#1a1a2e",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes drawLine {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .step-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .child-item {
          animation: slideIn 0.35s ease forwards;
          opacity: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .child-item:hover {
          transform: translateX(4px);
        }
        .intro-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .intro-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: scale(1.03);
        }
      `}</style>

      {/* ─── Hero ─── */}
      <div
        style={{
          background: "linear-gradient(135deg, #fff 0%, #f0f4ff 50%, #faf0ff 100%)",
          padding: "72px 24px 56px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative grid dots */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.3,
          backgroundImage: "radial-gradient(circle, #c0c0c0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              letterSpacing: "0.35em",
              color: "#8B6FD6",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 16,
              padding: "6px 16px",
              background: "#F3F0FD",
              borderRadius: 20,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            Framework
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #1a1a2e 0%, #8B6FD6 60%, #E8553D 100%)",
              backgroundSize: "200% auto",
              animation: loaded ? "shimmer 4s linear infinite" : "none",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 16px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            Creative Strategy
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "#666",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
              fontWeight: 400,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s ease 0.35s",
            }}
          >
            A repeatable, data-driven process for producing high-performing creative at scale.
            Click any phase below to explore.
          </p>
        </div>
      </div>

      {/* ─── Stats Bar ─── */}
      <FadeSection>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            maxWidth: 800,
            margin: "-28px auto 0",
            padding: "0 24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              border: "1px solid #eee",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-card"
                style={{
                  flex: 1,
                  padding: "24px 20px",
                  textAlign: "center",
                  borderRight: i < stats.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, color: "#1a1a2e", letterSpacing: "-1px" }}>
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 4, fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ─── Intro Cards ─── */}
      <div style={{ padding: "56px 24px 0", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px", margin: "0 0 8px" }}>
              Why This Matters
            </h2>
            <p style={{ fontSize: 14, color: "#888" }}>The foundation of every winning creative team</p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {introCards.map((c, i) => (
            <FadeSection key={c.label} delay={i * 0.1}>
              <div
                className="intro-card"
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                }} />
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    color: c.color,
                    marginBottom: 16,
                  }}
                >
                  {c.icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                  {c.desc}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>

      {/* ─── Process Connector ─── */}
      <FadeSection style={{ padding: "48px 24px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #ccc)" }} />
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.4em",
              color: "#999",
              textTransform: "uppercase",
              margin: "12px 0",
              fontWeight: 700,
              padding: "6px 20px",
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #eee",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            The Process
          </div>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #ccc, transparent)" }} />
        </div>
      </FadeSection>

      {/* ─── Phase Steps ─── */}
      <div style={{ padding: "16px 24px 0", maxWidth: 1160, margin: "0 auto" }}>
        {/* Horizontal flow indicator */}
        <FadeSection>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 28 }}>
            {phaseSteps.map((step, i) => (
              <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: active === step.id ? step.color : "#ddd",
                    transition: "all 0.4s ease",
                    boxShadow: active === step.id ? `0 0 12px ${step.color}44` : "none",
                  }}
                />
                {i < phaseSteps.length - 1 && (
                  <div style={{ width: 32, height: 2, background: "#e8e8e8", borderRadius: 1 }} />
                )}
              </div>
            ))}
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))",
            gap: 16,
          }}
        >
          {phaseSteps.map((step, i) => {
            const isActive = active === step.id;
            const isHovered = hoveredStep === step.id;
            return (
              <FadeSection key={step.id} delay={i * 0.08}>
                <div>
                  {/* Step Card */}
                  <div
                    className="step-card"
                    onClick={() => setActive(isActive ? null : step.id)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(isActive ? null : step.id);
                      }
                    }}
                    style={{
                      background: isActive ? step.lightBg : "#fff",
                      border: `1px solid ${isActive ? step.color + "44" : isHovered ? step.color + "33" : "#e8e8e8"}`,
                      borderRadius: 14,
                      padding: "24px 16px 18px",
                      textAlign: "center",
                      cursor: "pointer",
                      position: "relative",
                      boxShadow: isActive
                        ? `0 8px 32px ${step.color}14`
                        : "0 2px 8px rgba(0,0,0,0.03)",
                      outline: "none",
                      overflow: "hidden",
                    }}
                  >
                    {/* Colored top bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: step.color,
                      opacity: isActive || isHovered ? 1 : 0.4,
                      transition: "opacity 0.3s ease",
                    }} />

                    <div
                      style={{
                        position: "absolute", top: 12, left: 14,
                        fontSize: 10, color: "#bbb", fontWeight: 700,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: isActive ? `${step.color}18` : "#f5f5f7",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 12px", fontSize: 24,
                        color: isActive ? step.color : "#888",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {step.icon}
                    </div>

                    <div
                      style={{
                        fontSize: 15, fontWeight: 700,
                        color: isActive ? step.color : "#333",
                        transition: "color 0.3s ease",
                        marginBottom: 6,
                      }}
                    >
                      {step.label}
                    </div>

                    <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5, minHeight: 32 }}>
                      {step.desc}
                    </div>

                    <div
                      style={{
                        marginTop: 12, fontSize: 13, color: "#bbb",
                        display: "flex", justifyContent: "center",
                        transition: "transform 0.3s ease, color 0.3s ease",
                        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      {icons.chevronDown}
                    </div>
                  </div>

                  {/* Expanded Children */}
                  {isActive && (
                    <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                      {step.children.map((child, ci) => (
                        <div
                          key={child.label}
                          className="child-item"
                          style={{
                            background: "#fff",
                            border: "1px solid #eee",
                            borderLeft: `3px solid ${step.color}`,
                            borderRadius: 10,
                            padding: "12px 14px",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            animationDelay: `${ci * 0.06}s`,
                            cursor: "default",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16, color: step.color, display: "flex", flexShrink: 0,
                              marginTop: 1,
                              width: 32, height: 32, borderRadius: 8,
                              background: step.lightBg,
                              alignItems: "center", justifyContent: "center",
                            }}
                          >
                            {child.icon}
                          </span>
                          <div>
                            <span style={{ fontSize: 13, color: "#333", fontWeight: 600, display: "block" }}>
                              {child.label}
                            </span>
                            <span style={{ fontSize: 11, color: "#999", marginTop: 2, display: "block", lineHeight: 1.4 }}>
                              {child.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeSection>
            );
          })}
        </div>
      </div>

      {/* ─── Loop Indicator ─── */}
      <FadeSection style={{ padding: "48px 24px 20px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              border: "1px solid #e0e0e0", borderRadius: 28,
              padding: "12px 28px", background: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: 18, color: "#8B6FD6", display: "flex", animation: "pulse 2s ease-in-out infinite" }}>
              {icons.refresh}
            </span>
            <span style={{ color: "#666", fontSize: 13, fontWeight: 500 }}>
              Optimization feeds back into Research — the loop never stops
            </span>
          </div>
        </div>
      </FadeSection>

      {/* ─── Footer ─── */}
      <div style={{ textAlign: "center", padding: "24px 24px 48px" }}>
        <p style={{ fontSize: 11, color: "#bbb" }}>
          Creative Strategy Framework
        </p>
      </div>
    </div>
  );
}

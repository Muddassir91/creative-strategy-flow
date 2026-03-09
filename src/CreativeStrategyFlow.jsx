import { useState, useEffect, useRef } from "react";

/* ─── SVG Icons ─── */
const icons = {
  search: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  trophy: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  barChart: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  fileText: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  palette: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  folder: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  lightbulb: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  helpCircle: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  target: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  pin: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>,
  pen: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  anchor: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>,
  file: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  clipboard: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  mousePointer: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>,
  flask: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 9V3"/><path d="M14 9V3"/><path d="m10 9-5.4 8.1A2 2 0 0 0 6.3 20h11.4a2 2 0 0 0 1.7-2.9L14 9"/></svg>,
  scale: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  users: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  shuffle: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  megaphone: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  trendingUp: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  award: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  brain: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  eye: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  refresh: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  rocket: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  x: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  cornerDownLeft: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>,
  zap: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  flame: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  user: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  chevronDown: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  alertTriangle: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  check: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowRight: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  quote: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>,
};

/* ─── Utility hooks ─── */
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

function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Reusable components ─── */
const colors = {
  research: { main: "#E8553D", light: "#FEF2F0" },
  hypotheses: { main: "#D4A017", light: "#FDF8E8" },
  writing: { main: "#2BA89E", light: "#EDF9F8" },
  testing: { main: "#8B6FD6", light: "#F3F0FD" },
  results: { main: "#1FA87A", light: "#EDFAF4" },
  optimization: { main: "#D64D8A", light: "#FDF0F5" },
};

function Callout({ color = "#8B6FD6", bg = "#F3F0FD", icon, children }) {
  return (
    <div style={{ background: bg, border: `1px solid ${color}33`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start", margin: "16px 0" }}>
      <span style={{ color, fontSize: 18, flexShrink: 0, marginTop: 1, display: "flex" }}>{icon}</span>
      <div style={{ fontSize: 13, color: "#444", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "16px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ textAlign: "left", padding: "10px 14px", background: "#f5f5f7", color: "#333", fontWeight: 700, borderBottom: "2px solid #e0e0e0", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "10px 14px", borderBottom: "1px solid #eee", color: ci === 0 ? "#333" : "#666", fontWeight: ci === 0 ? 600 : 400, lineHeight: 1.5 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items, color = "#8B6FD6" }) {
  return (
    <ul style={{ margin: "12px 0", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#555", lineHeight: 1.6 }}>
          <span style={{ color, fontSize: 12, marginTop: 4, flexShrink: 0, display: "flex" }}>{icons.arrowRight}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }) {
  return <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px", letterSpacing: "-0.2px" }}>{children}</h4>;
}

function Paragraph({ children }) {
  return <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: "8px 0" }}>{children}</p>;
}

/* ─── Phase content from transcript ─── */
const phaseContent = {
  research: () => (
    <>
      <Callout color="#E8553D" bg="#FEF2F0" icon={icons.alertTriangle}>
        <strong>Start here. Do not skip to solutions.</strong> You are collecting data, not forming opinions. Stay objective. One data point is noise. Patterns across many data points are signal.
      </Callout>

      <SectionHeading>Identify the Problem</SectionHeading>
      <Paragraph>The founder usually tells you directly, or you spot the indicators yourself. Either way, do not jump to conclusions yet. This is just your first observation.</Paragraph>
      <BulletList color="#E8553D" items={[
        "High ad frequency",
        "Dropping CTR",
        "Rising CPA",
        "Declining engagement",
      ]} />

      <SectionHeading>Competitor Research</SectionHeading>
      <Paragraph>Pull ads from Facebook Ads Library. Download or transcribe content worth analyzing. Look for patterns across a wide sample — not what one competitor did once.</Paragraph>
      <Callout color="#E8553D" bg="#FEF2F0" icon={icons.lightbulb}>
        When you find a competitor creative you want to use, you have three options: <strong>copy it directly</strong>, do the <strong>complete opposite</strong>, or <strong>morph it into your own version</strong>. All three are valid. All three are analogy-based thinking. The more competitors in your sample, the more reliable your pattern recognition.
      </Callout>

      <SectionHeading>Audience & Market Research (Social Listening)</SectionHeading>
      <Paragraph>Go directly to your audience. Reddit, comment sections, reviews, DMs. Collect:</Paragraph>
      <BulletList color="#E8553D" items={[
        "Direct quotes in their exact words",
        "Pain points that come up repeatedly",
        "Desired outcomes",
        "Objections",
        "Slang and phrases that appear across multiple conversations",
      ]} />
      <Callout color="#D4A017" bg="#FDF8E8" icon={icons.target}>
        If a phrase shows up dozens of times across different people, it belongs in your copy. If it shows up once, it doesn't.
      </Callout>

      <SectionHeading>Collect Everything Objectively</SectionHeading>
      <Paragraph>Paste it all into a Google Doc or Notion. Competitor ads, audience quotes, transcriptions, screenshots. No editorializing. Just collecting.</Paragraph>
    </>
  ),

  hypotheses: () => (
    <>
      <SectionHeading>SWOT Analysis of Your Data</SectionHeading>
      <Paragraph>Apply this to each meaningful piece of data you collected — whether that's a competitor ad, an audience quote, or a creative concept.</Paragraph>
      <Table
        headers={["Element", "Question to Answer"]}
        rows={[
          ["Strengths", "What is compelling about this? What makes you think it could work?"],
          ["Weaknesses", "Why might this not work? What are its limitations for your client?"],
          ["Opportunities", "Where exactly would you use this? Paid, organic, email? What format? What funnel stage?"],
          ["Threats", "What could go wrong? What are the risks of using this?"],
        ]}
      />
      <Paragraph>By the end of this step you will have a clear enough picture to form a hypothesis.</Paragraph>

      <SectionHeading>Forming Your Hypothesis</SectionHeading>
      <Paragraph>A hypothesis is one sentence. It combines what you observed into a testable direction.</Paragraph>
      <Callout color="#D4A017" bg="#FDF8E8" icon={icons.lightbulb}>
        <strong>Formula:</strong> Problem identified + suspected root cause + proposed test
      </Callout>
      <div style={{ background: "#f8f8fa", border: "1px solid #e8e8e8", borderRadius: 10, padding: "16px 18px", margin: "12px 0", fontSize: 13, color: "#444", lineHeight: 1.7, fontStyle: "italic" }}>
        "This brand is experiencing creative fatigue due to repetitive ad formats. We will test whether introducing social proof ads as a new creative category improves CTR and reduces CPA within 30 days."
      </div>
      <Paragraph>It is not a promise. It is a direction. If it is wrong, you find out fast and adjust.</Paragraph>
    </>
  ),

  writing: () => (
    <>
      <SectionHeading>Pre-Testing Phase: Project Creation</SectionHeading>
      <Paragraph>Before anything goes live, build the infrastructure to test cleanly. Answer these questions before touching any creative:</Paragraph>
      <BulletList color="#2BA89E" items={[
        "How many creatives are needed to test this meaningfully?",
        "When do you need them?",
        "Where will you test — paid, organic, or both?",
        "What does the campaign structure look like?",
        "What are your creative references for each piece? Collect them and describe what you'd take from each one.",
      ]} />

      <SectionHeading>Project Management</SectionHeading>
      <Callout color="#E8553D" bg="#FEF2F0" icon={icons.alertTriangle}>
        This is where most people fall apart. Everything needs to be explicit.
      </Callout>
      <BulletList color="#2BA89E" items={[
        "Timeline: What happens in what order, and by when?",
        "Tool: Notion, Slack, Google Docs. Pick one. Everything lives there.",
        "People involved: Who is on this project?",
        "Who does what: No assumptions. Write it down.",
        "Realistic deadlines: If something cannot be done at full quality in one week, either extend the timeline or cut the scope.",
      ]} />
      <Paragraph>Drop the high-production video and do a founder selfie video instead. Scope management is part of the job.</Paragraph>

      <SectionHeading>Scripts</SectionHeading>
      <Paragraph>Write from your VOC research. The language should come from the audience, not the brand. Every hook, every line should reflect something real you pulled from your observations.</Paragraph>

      <SectionHeading>Creative Briefs</SectionHeading>
      <Paragraph>One brief per creative. A brief tells whoever is producing the content exactly what the output should be. Each brief includes:</Paragraph>
      <BulletList color="#2BA89E" items={[
        "The hook",
        "The concept",
        "The reference inspiration",
        "The tone",
        "The desired outcome",
        "The format",
        "Any specific visual or structural direction",
      ]} />
      <Callout color="#2BA89E" bg="#EDF9F8" icon={icons.check}>
        Briefs remove ambiguity and make production faster and more accurate.
      </Callout>
    </>
  ),

  testing: () => (
    <>
      <SectionHeading>Execute the Test</SectionHeading>
      <Paragraph>Publish. Run the ads or post the content. Give it enough runway to gather directional data.</Paragraph>
      <Callout color="#8B6FD6" bg="#F3F0FD" icon={icons.alertTriangle}>
        <strong>You are not optimizing yet.</strong> You are watching whether your hypothesis holds. Do not make changes prematurely. Let the data collect.
      </Callout>
      <Paragraph>This phase is about discipline. The urge to tweak mid-test is strong — resist it. Clean data requires controlled conditions.</Paragraph>

      <SectionHeading>What to Monitor</SectionHeading>
      <BulletList color="#8B6FD6" items={[
        "Is the hypothesis direction holding?",
        "Are metrics moving in the predicted direction?",
        "Is there enough volume for statistical confidence?",
        "Are there any external factors contaminating the data?",
      ]} />
    </>
  ),

  results: () => (
    <>
      <SectionHeading>Read the Outcome</SectionHeading>
      <Paragraph>There are only two outcomes:</Paragraph>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "16px 0" }}>
        <div style={{ background: "#EDFAF4", border: "1px solid #1FA87A33", borderRadius: 10, padding: "18px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ color: "#1FA87A", fontSize: 18, display: "flex" }}>{icons.check}</span>
            <strong style={{ color: "#1FA87A", fontSize: 14 }}>Winner</strong>
          </div>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>Metrics moved in the right direction. Your hypothesis was correct. You now have a validated creative direction to scale.</p>
        </div>
        <div style={{ background: "#FDF0F5", border: "1px solid #D64D8A33", borderRadius: 10, padding: "18px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ color: "#D64D8A", fontSize: 18, display: "flex" }}>{icons.x}</span>
            <strong style={{ color: "#D64D8A", fontSize: 14 }}>Loser</strong>
          </div>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>Metrics did not move. The problem persists. This is not failure — this is data. The hypothesis was wrong, and now you know.</p>
        </div>
      </div>

      <SectionHeading>Key Metrics to Evaluate</SectionHeading>
      <BulletList color="#1FA87A" items={[
        "CTR (Click-Through Rate) — did people engage?",
        "CPA (Cost Per Acquisition) — did efficiency improve?",
        "ROAS (Return on Ad Spend) — did revenue improve?",
        "Engagement rate — did organic content resonate?",
        "Frequency — is the same ad being shown less repetitively?",
      ]} />
    </>
  ),

  optimization: () => (
    <>
      <SectionHeading>If Your Hypothesis Was Correct</SectionHeading>
      <BulletList color="#D64D8A" items={[
        "Double down on the specific formats, hooks, and angles that performed best",
        "Build a long-term content plan from the winning direction",
        "Plan for how to keep that format fresh so it doesn't fatigue the same way the old one did",
      ]} />

      <SectionHeading>If Your Hypothesis Was Wrong</SectionHeading>
      <Callout color="#D64D8A" bg="#FDF0F5" icon={icons.cornerDownLeft}>
        Go back to Step 1. Collect new observations. Re-examine what you missed. Form a new hypothesis. Test again. <strong>This is not failure. This is how the process works.</strong>
      </Callout>

      <div style={{ background: "#f8f8fa", border: "1px solid #e0e0e0", borderRadius: 12, padding: "20px", margin: "20px 0", textAlign: "center" }}>
        <div style={{ fontSize: 16, color: "#8B6FD6", display: "flex", justifyContent: "center", marginBottom: 10, animation: "pulse 2s ease-in-out infinite" }}>{icons.refresh}</div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#333", margin: "0 0 4px" }}>The loop never stops</p>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Optimization always feeds back into Research. Every cycle sharpens your instincts and compounds your results.</p>
      </div>
    </>
  ),
};

/* ─── Phase data ─── */
const phaseSteps = [
  { id: "research", icon: icons.search, label: "Research", step: "Step 1", stepLabel: "Observations", desc: "Collect data objectively. Do not form opinions yet.", color: colors.research.main, lightBg: colors.research.light },
  { id: "hypotheses", icon: icons.lightbulb, label: "Hypotheses", step: "Step 2–3", stepLabel: "SWOT + Hypothesis", desc: "Analyze what you found, then form one testable direction.", color: colors.hypotheses.main, lightBg: colors.hypotheses.light },
  { id: "writing", icon: icons.pen, label: "Writing", step: "Step 4–5", stepLabel: "Planning + Scripts", desc: "Build the infrastructure and write from your research.", color: colors.writing.main, lightBg: colors.writing.light },
  { id: "testing", icon: icons.flask, label: "Testing", step: "Step 6", stepLabel: "Execute", desc: "Publish and let the data collect. Do not optimize yet.", color: colors.testing.main, lightBg: colors.testing.light },
  { id: "results", icon: icons.trendingUp, label: "Results", step: "Step 7", stepLabel: "Winner or Loser", desc: "Measure the outcome against your hypothesis.", color: colors.results.main, lightBg: colors.results.light },
  { id: "optimization", icon: icons.refresh, label: "Optimization", step: "Step 8", stepLabel: "Scale or Restart", desc: "Double down on winners or loop back to research.", color: colors.optimization.main, lightBg: colors.optimization.light },
];

/* ─── Main Component ─── */
export default function CreativeStrategyFlow() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeIntro, setActiveIntro] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const detailRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    if (activePhase && detailRef.current) {
      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [activePhase]);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif", background: "#fafafa", minHeight: "100vh", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .step-card { transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94); }
        .step-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .intro-card { transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94); cursor: pointer; }
        .intro-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
        .detail-panel { animation: scaleIn 0.35s ease forwards; }
      `}</style>

      {/* ─── Hero ─── */}
      <div style={{ background: "linear-gradient(135deg, #fff 0%, #f0f4ff 50%, #faf0ff 100%)", padding: "72px 24px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.3, backgroundImage: "radial-gradient(circle, #c0c0c0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", fontSize: 11, letterSpacing: "0.35em", color: "#8B6FD6", textTransform: "uppercase", fontWeight: 700, marginBottom: 16, padding: "6px 16px", background: "#F3F0FD", borderRadius: 20, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s ease 0.1s" }}>
            A Beginner's Guide
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.1, background: "linear-gradient(135deg, #1a1a2e 0%, #8B6FD6 60%, #E8553D 100%)", backgroundSize: "200% auto", animation: loaded ? "shimmer 4s linear infinite" : "none", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 16px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            Creative Strategy
          </h1>
          <p style={{ fontSize: 17, color: "#666", maxWidth: 560, margin: "0 auto", lineHeight: 1.6, fontWeight: 400, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s ease 0.35s" }}>
            A repeatable, data-driven process for producing high-performing creative at scale. This is the scientific method applied to marketing.
          </p>
        </div>
      </div>

      {/* ─── Quote ─── */}
      <FadeSection>
        <div style={{ maxWidth: 680, margin: "-24px auto 0", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #eee", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ color: "#8B6FD6", fontSize: 28, flexShrink: 0, opacity: 0.5, display: "flex" }}>{icons.quote}</span>
            <div>
              <p style={{ fontSize: 15, color: "#333", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 8px" }}>
                "Rookies flex creative strategy skills on socials. OGs know it's basic marketing."
              </p>
              <p style={{ fontSize: 12, color: "#999", margin: 0, fontWeight: 600 }}>-- Muddassir</p>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ─── Intro Cards (expandable) ─── */}
      <div style={{ padding: "56px 24px 0", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px", margin: "0 0 8px" }}>Before You Start</h2>
            <p style={{ fontSize: 14, color: "#888" }}>Click each card to learn more</p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {/* Card 1: What's the Hype */}
          <FadeSection delay={0}>
            <div className="intro-card" onClick={() => setActiveIntro(activeIntro === "hype" ? null : "hype")} style={{ background: "#fff", border: `1px solid ${activeIntro === "hype" ? "#E8553D44" : "#eee"}`, borderRadius: 14, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #E8553D, #E8553D88)" }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEF2F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#E8553D", marginBottom: 16 }}>{icons.flame}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>What's the Hype?</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>Creative strategy is not new. OGs were already doing it. The trend is new, the skill is not.</div>
              <div style={{ fontSize: 12, color: "#bbb", marginTop: 12, display: "flex", justifyContent: "center", transition: "transform 0.3s", transform: activeIntro === "hype" ? "rotate(180deg)" : "rotate(0)" }}>{icons.chevronDown}</div>
            </div>
            {activeIntro === "hype" && (
              <div className="detail-panel" style={{ background: "#fff", border: "1px solid #eee", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "24px", marginTop: -8 }}>
                <SectionHeading>Why It Exploded Recently</SectionHeading>
                <BulletList color="#E8553D" items={[
                  "AI pushed operators into strategy roles. Writers and media buyers used to execute instructions. Now AI handles execution, and humans are forced into decision-making.",
                  "Content demand is at an all-time high. Shrinking attention spans mean brands need constant presence. Volume is now a survival strategy, not a nice-to-have.",
                  "Hormozi changed the playbook. He proved algorithms don't reward quality — they reward volume and time-on-platform. Every brand followed.",
                  "Creative fatigue is now a real crisis. Facebook keeps showing the same ad to the same people. Costs rise, sales drop, and someone needs to fix it systematically.",
                ]} />
              </div>
            )}
          </FadeSection>

          {/* Card 2: Why Should You Care */}
          <FadeSection delay={0.1}>
            <div className="intro-card" onClick={() => setActiveIntro(activeIntro === "care" ? null : "care")} style={{ background: "#fff", border: `1px solid ${activeIntro === "care" ? "#2BA89E44" : "#eee"}`, borderRadius: 14, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2BA89E, #2BA89E88)" }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EDF9F8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#2BA89E", marginBottom: 16 }}>{icons.target}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Why Should You Care?</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>The single closest vertical upgrade available to anyone in a marketing or operational role.</div>
              <div style={{ fontSize: 12, color: "#bbb", marginTop: 12, display: "flex", justifyContent: "center", transition: "transform 0.3s", transform: activeIntro === "care" ? "rotate(180deg)" : "rotate(0)" }}>{icons.chevronDown}</div>
            </div>
            {activeIntro === "care" && (
              <div className="detail-panel" style={{ background: "#fff", border: "1px solid #eee", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "24px", marginTop: -8 }}>
                <Paragraph>This applies to anyone creating content for cold traffic or unaware audiences, paid or organic. You don't replace your current skills — you put a system and decision-making layer on top of them.</Paragraph>
                <Callout color="#2BA89E" bg="#EDF9F8" icon={icons.arrowRight}>
                  <strong>The difference:</strong> An operator executes instructions. A strategist owns the problem, the process, and the outcome.
                </Callout>
                <Table
                  headers={["Role", "Why It Transfers"]}
                  rows={[
                    ["Copywriter", "Scripts, briefs, and VOC research are already in your toolkit"],
                    ["Media Buyer", "You already know what works at the ad level"],
                    ["Video Editor", "Your production knowledge expands what creative solutions you can see"],
                    ["Any Operational Marketer", "You know the mechanics — you just need the system"],
                  ]}
                />
              </div>
            )}
          </FadeSection>

          {/* Card 3: Who Is It For */}
          <FadeSection delay={0.2}>
            <div className="intro-card" onClick={() => setActiveIntro(activeIntro === "who" ? null : "who")} style={{ background: "#fff", border: `1px solid ${activeIntro === "who" ? "#8B6FD644" : "#eee"}`, borderRadius: 14, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #8B6FD6, #8B6FD688)" }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F3F0FD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#8B6FD6", marginBottom: 16 }}>{icons.user}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Who Needs This?</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>Small businesses generally don't. The demand is at scale — once content volume is high enough that someone needs to own it end to end.</div>
              <div style={{ fontSize: 12, color: "#bbb", marginTop: 12, display: "flex", justifyContent: "center", transition: "transform 0.3s", transform: activeIntro === "who" ? "rotate(180deg)" : "rotate(0)" }}>{icons.chevronDown}</div>
            </div>
            {activeIntro === "who" && (
              <div className="detail-panel" style={{ background: "#fff", border: "1px solid #eee", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "24px", marginTop: -8 }}>
                <Paragraph>Background doesn't matter as much as the experience of getting results for clients. You cannot start at strategy with zero marketing experience. The more operational wins you have, the faster this clicks.</Paragraph>
                <SectionHeading>Who Needs a Creative Strategist?</SectionHeading>
                <Table
                  headers={["Business Type", "Threshold"]}
                  rows={[
                    ["Ecommerce brands", "$50K to $100K+ per month"],
                    ["Coaches", "$100K+ per month"],
                    ["SaaS businesses", "Running consistent paid + organic simultaneously"],
                  ]}
                />
                <SectionHeading>The Problems They Solve</SectionHeading>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "12px 0" }}>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#E8553D", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Paid Ads</p>
                    <BulletList color="#E8553D" items={["Rising ad costs", "Rising cost per lead", "Poor lead quality", "Creative fatigue (the big one)", "Declining sales"]} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#8B6FD6", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Organic</p>
                    <BulletList color="#8B6FD6" items={["Low engagement", "Content activity with no sales"]} />
                  </div>
                </div>
                <Callout color="#D4A017" bg="#FDF8E8" icon={icons.lightbulb}>
                  Founders rarely use marketing jargon. They say "our ads aren't working" not "we're experiencing creative fatigue." Learning to translate their language into a diagnosable problem — and using their words back at them — is one of the most underrated skills in this work. This is Voice of Customer data applied to sales, not just copy.
                </Callout>
              </div>
            )}
          </FadeSection>
        </div>
      </div>

      {/* ─── Process Connector ─── */}
      <FadeSection style={{ padding: "48px 24px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #ccc)" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#999", textTransform: "uppercase", margin: "12px 0", fontWeight: 700, padding: "6px 20px", background: "#fff", borderRadius: 20, border: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            The Process
          </div>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #ccc, transparent)" }} />
        </div>
      </FadeSection>

      {/* ─── Phase Steps (horizontal flow indicator) ─── */}
      <div style={{ padding: "16px 24px 0", maxWidth: 1160, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 28 }}>
            {phaseSteps.map((step, i) => (
              <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: activePhase === step.id ? step.color : "#ddd", transition: "all 0.4s ease", boxShadow: activePhase === step.id ? `0 0 12px ${step.color}44` : "none" }} />
                {i < phaseSteps.length - 1 && <div style={{ width: 32, height: 2, background: "#e8e8e8", borderRadius: 1 }} />}
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Phase cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))", gap: 16 }}>
          {phaseSteps.map((step, i) => {
            const isActive = activePhase === step.id;
            const isHovered = hoveredStep === step.id;
            return (
              <FadeSection key={step.id} delay={i * 0.08}>
                <div
                  className="step-card"
                  onClick={() => setActivePhase(isActive ? null : step.id)}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActivePhase(isActive ? null : step.id); } }}
                  style={{
                    background: isActive ? step.lightBg : "#fff",
                    border: `1px solid ${isActive ? step.color + "44" : isHovered ? step.color + "33" : "#e8e8e8"}`,
                    borderRadius: 14, padding: "24px 16px 18px", textAlign: "center", cursor: "pointer",
                    position: "relative", outline: "none", overflow: "hidden",
                    boxShadow: isActive ? `0 8px 32px ${step.color}14` : "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: step.color, opacity: isActive || isHovered ? 1 : 0.4, transition: "opacity 0.3s ease" }} />
                  <div style={{ position: "absolute", top: 12, left: 14, fontSize: 10, color: "#bbb", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: isActive ? `${step.color}18` : "#f5f5f7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 24, color: isActive ? step.color : "#888", transition: "all 0.3s ease" }}>
                    {step.icon}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? step.color : "#333", transition: "color 0.3s ease", marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{step.step}</div>
                  <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5, minHeight: 32 }}>{step.desc}</div>
                  <div style={{ marginTop: 10, fontSize: 13, color: "#bbb", display: "flex", justifyContent: "center", transition: "transform 0.3s", transform: isActive ? "rotate(180deg)" : "rotate(0)" }}>{icons.chevronDown}</div>
                </div>
              </FadeSection>
            );
          })}
        </div>

        {/* ─── Expanded Detail Panel ─── */}
        {activePhase && (
          <div ref={detailRef} className="detail-panel" style={{ marginTop: 24, background: "#fff", border: `1px solid ${phaseSteps.find(s => s.id === activePhase).color}33`, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.05)" }}>
            {(() => {
              const step = phaseSteps.find(s => s.id === activePhase);
              return (
                <>
                  <div style={{ background: step.lightBg, padding: "20px 28px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${step.color}22` }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: step.color, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                      {step.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>{step.label}</div>
                      <div style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{step.step}: {step.stepLabel}</div>
                    </div>
                    <button onClick={() => setActivePhase(null)} style={{ marginLeft: "auto", background: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#999", display: "flex", fontSize: 14 }}>{icons.x}</button>
                  </div>
                  <div style={{ padding: "24px 28px 32px" }}>
                    {phaseContent[activePhase]()}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* ─── Loop Indicator ─── */}
      <FadeSection style={{ padding: "48px 24px 20px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, border: "1px solid #e0e0e0", borderRadius: 28, padding: "12px 28px", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 18, color: "#8B6FD6", display: "flex", animation: "pulse 2s ease-in-out infinite" }}>{icons.refresh}</span>
            <span style={{ color: "#666", fontSize: 13, fontWeight: 500 }}>Optimization feeds back into Research — the loop never stops</span>
          </div>
        </div>
      </FadeSection>

      {/* ─── Loom ─── */}
      <FadeSection style={{ padding: "16px 24px 0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <a href="https://www.loom.com/share/15b87bb6aa0d444884600b75727a6528" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "14px 24px", color: "#333", textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "box-shadow 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#625DF5"/><polygon points="8,6 15,10 8,14" fill="#fff"/></svg>
            Watch the full walkthrough on Loom
          </a>
        </div>
      </FadeSection>

      {/* ─── Footer ─── */}
      <div style={{ textAlign: "center", padding: "32px 24px 48px" }}>
        <p style={{ fontSize: 11, color: "#bbb" }}>Creative Strategy Framework</p>
      </div>
    </div>
  );
}

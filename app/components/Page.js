"use client"
import { useState, useEffect, useRef } from "react";

/* ─── Icons ──────────────────────────────────────────────────── */
const BillingIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>
  </svg>
);
const MattersIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const TasksIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const DocsIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
  </svg>
);

/* ─── RAF float hook ─────────────────────────────────────────── */
function useFloat(amp, speed, phase) {
  const [y, setY] = useState(0);
  const raf = useRef();
  useEffect(() => {
    const tick = (t) => { setY(Math.sin(t * speed + phase) * amp); raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [amp, speed, phase]);
  return y;
}

/* ─── Pill card ──────────────────────────────────────────────── */
function Pill({ bg, shadow, rot, amp, speed, phase, icon: Icon, label, style, textColor = "#fff" }) {
  const floatY = useFloat(amp, speed, phase);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute", ...style,
        transform: `translateY(${floatY + (hovered ? -8 : 0)}px) rotate(${rot}deg) scale(${hovered ? 1.06 : 1})`,
        willChange: "transform",
        background: bg,
        borderRadius: 60,
        padding: "13px 26px",
        display: "flex", alignItems: "center", gap: 10,
        color: textColor, fontWeight: 700, fontSize: 18,
        whiteSpace: "nowrap",
        boxShadow: hovered
          ? shadow + ", 0 28px 60px rgba(0,0,0,0.18)"
          : shadow,
        fontFamily: "inherit",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        cursor: "default",
      }}
    >
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30,
        background: "rgba(255,255,255,0.15)", borderRadius: 8, color: textColor,
        transition: "transform 0.25s ease",
        transform: hovered ? "rotate(-8deg) scale(1.1)" : "rotate(0deg) scale(1)",
      }}>
        <Icon size={17} />
      </span>
      {label}
    </div>
  );
}

/* ─── Portal card (glassmorphism) ────────────────────────────── */
function PortalCard({ rot, amp, speed, phase, style, dark }) {
  const floatY = useFloat(amp, speed, phase);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute", ...style,
        transform: `translateY(${floatY + (hovered ? -8 : 0)}px) rotate(${rot}deg) scale(${hovered ? 1.04 : 1})`,
        willChange: "transform",
        background: dark ? "rgba(30,45,66,0.55)" : "rgba(232,234,246,0.5)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 18,
        padding: "11px 15px",
        display: "flex", alignItems: "center", gap: 12,
        minWidth: 240,
        boxShadow: hovered
          ? (dark ? "0 28px 60px rgba(0,0,0,0.6)" : "0 28px 60px rgba(100,120,180,0.3)")
          : (dark ? "0 16px 40px rgba(0,0,0,0.45)" : "0 16px 40px rgba(100,120,180,0.18)"),
        border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.75)"}`,
        fontFamily: "inherit",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        cursor: "default",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="John Doe"
          style={{ width: 42, height: 42, borderRadius: "50%", display: "block", objectFit: "cover", border: "2.5px solid rgba(255,255,255,0.85)" }}
        />
        <span style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, background: "#22c55e", borderRadius: "50%", border: "2px solid white", display: "block" }} />
      </div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: dark ? "#e2e8f0" : "#334155", margin: 0 }}>John Doe – Portal</p>
        <p style={{ fontSize: 10, color: dark ? "#94a3b8" : "#64748b", margin: "3px 0 2px", lineHeight: 1.4, maxWidth: 155 }}>
          Hey! Could you please review a document for me?
        </p>
        <p style={{ fontSize: 9, color: dark ? "#64748b" : "#94a3b8", margin: 0 }}>MIE-223 · 31 min ago</p>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  const fade = (d = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(18px)",
    transition: `opacity .6s ${d}s ease, transform .6s ${d}s ease`,
  });

  const bg    = dark ? "#0b1220" : "#f0f4fb";
  const blobC = dark ? "rgba(180,200,255,0.06)" : "rgba(196,210,240,0.55)";

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: bg, height: "100vh", transition: "background .4s", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link:hover { color: #2563eb !important; }
        .btn-primary {
          background: #2563eb; color: #fff; border: none; border-radius: 999px;
          padding: 11px 24px; font-weight: 700; font-size: 14px; cursor: pointer;
          font-family: inherit; box-shadow: 0 8px 24px rgba(37,99,235,.38);
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(37,99,235,.5); background: #1d4ed8; }
        .btn-primary:active { transform: scale(0.97); }
        .btn-secondary {
          background: transparent; border-radius: 999px; padding: 10px 24px;
          font-weight: 500; font-size: 14px; cursor: pointer; font-family: inherit;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .btn-secondary:hover { transform: translateY(-2px); opacity: 0.75; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ maxWidth: 1280, width: "100%", margin: "0 auto", padding: "14px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: dark ? "#e2e8f0" : "#0f172a", letterSpacing: "-0.5px" }}>⚖️ Praava</span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Product", "Solutions", "Pricing"].map(n => (
            <a key={n} href="#" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: dark ? "#94a3b8" : "#4b5563", textDecoration: "none", transition: "color 0.2s" }}>{n}</a>
          ))}
          <button onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 48px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 16 }}>

        {/* Headline + subtext + CTA */}
        <div style={{ maxWidth: 580, marginBottom: 6 }}>
          <div style={fade(0)}>
            <h1 style={{ fontSize: "clamp(30px,3.6vw,50px)", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 12 }}>
              <span style={{ fontWeight: 300, color: dark ? "#7a9abf" : "#5a7295" }}>A single platform to </span>
              <span style={{ fontWeight: 800, color: dark ? "#e2e8f0" : "#0f172a" }}>manage</span>
              <span style={{ fontWeight: 300, color: dark ? "#7a9abf" : "#5a7295" }}> every part of your </span>
              <span style={{ fontWeight: 800, color: "#2563eb" }}>legal work</span>
            </h1>
          </div>
          <p style={{ fontSize: 14, color: "#3b82f6", lineHeight: 1.65, maxWidth: 400, marginBottom: 18, ...fade(0.1) }}>
            Track matters, coordinate schedules, manage clients, centralize documents, and handle communication – all in one system.
          </p>
          <div style={{ display: "flex", gap: 12, ...fade(0.2) }}>
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary" style={{ border: `1.5px solid ${dark ? "#334155" : "#dde3ef"}`, color: dark ? "#94a3b8" : "#4b5563" }}>
              Watch Demo →
            </button>
          </div>
        </div>

        {/* ── CARDS CANVAS ── */}
        <div style={{ position: "relative", height: 320, flexShrink: 0 }}>

          {/* Blobs */}
          <div style={{ position: "absolute", top: 0,    right: 0,  width: 175, height: 95,  borderRadius: 26, background: blobC }} />
          <div style={{ position: "absolute", top: 105,  right: 0,  width: 140, height: 78,  borderRadius: 22, background: blobC }} />
          <div style={{ position: "absolute", top: 130,  left: 22,  width: 80,  height: 110, borderRadius: 50, background: blobC }} />
          <div style={{ position: "absolute", bottom: 8, left: 45,  width: 190, height: 60,  borderRadius: 18, background: blobC }} />

          {/* Billing */}
          <Pill
            bg="linear-gradient(135deg,#2f6ff0,#1a50c8)"
            shadow="0 18px 44px rgba(37,99,235,0.45)"
            rot={-8} amp={9} speed={0.0008} phase={0}
            icon={BillingIcon} label="Billing"
            style={{ top: 18, right: 50 }}
          />

          {/* Matters */}
          <Pill
            bg="linear-gradient(135deg,#f97316,#e05e00)"
            shadow="0 18px 44px rgba(249,115,22,0.45)"
            rot={-8} amp={11} speed={0.00065} phase={1.5}
            icon={MattersIcon} label="Matters"
            style={{ top: 138, left: 60 }}
          />

          {/* Portal card — glassmorphism */}
          <PortalCard
            rot={2} amp={8} speed={0.0009} phase={0.9}
            style={{ top: 148, right: 95 }}
            dark={dark}
          />

          {/* Tasks */}
          <Pill
            bg="linear-gradient(135deg,#252d4a,#161d35)"
            shadow="0 18px 44px rgba(20,25,60,0.45)"
            textColor="#f97316"
            rot={1} amp={10} speed={0.001} phase={2.5}
            icon={TasksIcon} label="Tasks"
            style={{ bottom: 28, left: "34%" }}
          />

          {/* Documents */}
          <Pill
            bg="linear-gradient(135deg,#2d2f45,#1a1c2e)"
            shadow="0 18px 44px rgba(20,22,45,0.5)"
            textColor="#f97316"
            rot={-5} amp={10} speed={0.00075} phase={3.2}
            icon={DocsIcon} label="Documents"
            style={{ bottom: 16, right: 28 }}
          />
        </div>
      </div>
    </div>
  );
}

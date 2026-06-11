"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { CVData, defaultCVData } from "@/types/cv";
import { THEMES, CATEGORIES, Theme, Cat } from "@/lib/themes";
import InfoPersonnelles from "@/components/form/InfoPersonnelles";
import Competences from "@/components/form/Competences";
import Experiences from "@/components/form/Experiences";
import Formations from "@/components/form/Formations";
import CVResult from "@/components/CVResult";
import AuthModal from "@/components/AuthModal";
import SplashScreen from "@/components/SplashScreen";
import { useLang, LangToggle } from "@/lib/i18n";

/* ─── Form steps ─────────────────────────────────────────────────────────── */

const HOW_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <path d="M12 16l-4-4h2.5V4h3v8H16l-4 4z" /><path d="M4 20h16" />
  </svg>,
];

const TESTIMONIAL_VISUALS = [
  { init: "L", bg: "#FEE2E2", fg: "#DC2626", stars: 5 },
  { init: "A", bg: "#DBEAFE", fg: "#1D4ED8", stars: 5 },
  { init: "G", bg: "#D1FAE5", fg: "#065F46", stars: 5 },
];

/* ─── Mini theme preview ─────────────────────────────────────────────────── */

function ThemeMiniPreview({ theme }: { theme: Theme }) {
  const { c, layout, id } = theme;
  const W = 200, H = 267;

  const isGrad = c.sidebar.startsWith("linear-gradient");
  const gColors = isGrad ? (c.sidebar.match(/#[0-9a-fA-F]{6}/g) ?? [c.accent]) : [];
  const gId = `g_${id}`;
  const sbFill = isGrad ? `url(#${gId})` : c.sidebar;
  const avId = `av_${id}`;

  const GDef = isGrad ? (
    <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={gColors[0]} />
      <stop offset="100%" stopColor={gColors[1] ?? gColors[0] ?? c.accent} />
    </linearGradient>
  ) : null;

  const R = (x: number, y: number, w: number, h: number, fill: string, op = 1, rx = 1) => (
    <rect x={x} y={y} width={Math.max(0, w)} height={Math.max(0, h)} rx={rx} fill={fill} opacity={op} />
  );

  const Sec = (x: number, y: number, w: number) => (
    <g>
      <rect x={x} y={y}     width={w} height={4}   rx={1}   fill={c.text}   opacity={0.82} />
      <rect x={x} y={y + 5} width={w} height={0.8} rx={0.4} fill={c.accent} opacity={0.55} />
    </g>
  );

  const Av = (cx: number, cy: number, r: number, col: string) => (
    <g>
      <circle cx={cx + 1.5} cy={cy + 2.5} r={r + 1}   fill="rgba(0,0,0,0.22)" />
      <circle cx={cx}       cy={cy}        r={r + 2}   fill="white" />
      <circle cx={cx}       cy={cy}        r={r}        fill={col} opacity={0.1} />
      <circle cx={cx}       cy={cy - r * 0.22} r={r * 0.42} fill={col} opacity={0.75} clipPath={`url(#${avId})`} />
      <ellipse cx={cx} cy={cy + r * 0.76} rx={r * 0.72} ry={r * 0.46} fill={col} opacity={0.58} clipPath={`url(#${avId})`} />
    </g>
  );

  if (layout === "sidebar") {
    const sw = 65, mx = sw + 8, mw = W - mx - 8;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <defs>{GDef}<clipPath id={avId}><circle cx={32} cy={38} r={20} /></clipPath></defs>
        <rect x={0} y={0} width={W} height={H} fill={c.bg} />
        <rect x={0} y={0} width={sw} height={H} fill={sbFill} />
        {Av(32, 38, 20, c.sidebarText)}
        {R(8, 65, 50, 5,   c.sidebarText, 0.9,  1.5)}
        {R(8, 74, 36, 3,   c.sidebarText, 0.58, 1)}
        <rect x={8} y={81} width={50} height={0.6} fill={c.sidebarText} opacity={0.2} />
        {R(8, 86, 32, 3,   c.sidebarText, 0.55, 1)}
        {R(8, 92, 47, 2,   c.sidebarText, 0.42, 1)}
        {R(8, 96, 37, 2,   c.sidebarText, 0.35, 1)}
        {R(8, 100, 44, 2,  c.sidebarText, 0.3,  1)}
        <rect x={8} y={107} width={50} height={0.6} fill={c.sidebarText} opacity={0.2} />
        {R(8, 112, 32, 3,  c.sidebarText, 0.55, 1)}
        {R(8, 118, 50, 3.5, c.sidebarText, 0.1,  1.5)}
        {R(8, 118, 40, 3.5, c.accent, 0.65, 1.5)}
        {R(8, 124, 50, 3.5, c.sidebarText, 0.1,  1.5)}
        {R(8, 124, 45, 3.5, c.accent, 0.55, 1.5)}
        {R(8, 130, 50, 3.5, c.sidebarText, 0.1,  1.5)}
        {R(8, 130, 28, 3.5, c.accent, 0.45, 1.5)}
        {R(mx, 10, 104, 9, c.text, 0.95, 2)}
        {R(mx, 23,  76, 5, c.accent, 0.9, 1.5)}
        <rect x={mx} y={33} width={mw} height={0.7} fill={c.border} opacity={0.9} />
        {Sec(mx, 38, 58)}
        {R(mx, 46, mw,          2.5, c.sub, 0.52, 1)}
        {R(mx, 51, mw * 0.82,   2,   c.sub, 0.42, 1)}
        {R(mx, 55, mw * 0.95,   2,   c.sub, 0.36, 1)}
        {R(mx, 59, mw * 0.62,   2,   c.sub, 0.28, 1)}
        <rect x={mx} y={65} width={mw} height={0.7} fill={c.border} opacity={0.7} />
        {Sec(mx, 70, 50)}
        {R(mx, 78, mw,          2.5, c.sub, 0.5,  1)}
        {R(mx, 83, mw * 0.75,   2,   c.sub, 0.42, 1)}
        {R(mx, 89, 65, 2.5, c.text, 0.56, 1)}
        {R(mx, 94, mw,          2,   c.sub, 0.38, 1)}
        {R(mx, 98, mw * 0.7,    2,   c.sub, 0.3,  1)}
        <rect x={mx} y={104} width={mw} height={0.7} fill={c.border} opacity={0.7} />
        {Sec(mx, 109, 62)}
        {R(mx, 117, mw * 0.88,  2.5, c.sub, 0.5,  1)}
        {R(mx, 122, mw * 0.68,  2,   c.sub, 0.42, 1)}
        {R(mx, 126, mw * 0.80,  2,   c.sub, 0.35, 1)}
      </svg>
    );
  }

  if (layout === "header") {
    const hh = 70, lcw = 70, mx = lcw + 8, mw = W - mx - 8;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <defs>{GDef}<clipPath id={avId}><circle cx={28} cy={35} r={19} /></clipPath></defs>
        <rect x={0} y={0} width={W} height={H} fill={c.bg} />
        <rect x={0} y={0} width={W} height={hh} fill={sbFill} />
        {Av(28, 35, 19, c.sidebarText)}
        {R(55, 18, 102, 9, c.sidebarText, 0.94, 2)}
        {R(55, 31,  74, 5, c.sidebarText, 0.62, 1.5)}
        {R(55, 40,  56, 3, c.sidebarText, 0.45, 1)}
        <rect x={lcw} y={hh} width={0.7} height={H - hh} fill={c.border} opacity={0.7} />
        {Sec(8, hh + 8, 46)}
        {R(8, hh + 16, 57, 2.5, c.sub, 0.5,  1)}
        {R(8, hh + 21, 46, 2,   c.sub, 0.42, 1)}
        {R(8, hh + 25, 53, 2,   c.sub, 0.36, 1)}
        {R(8, hh + 29, 38, 2,   c.sub, 0.28, 1)}
        {R(8, hh + 37, 54, 3.5, c.sub, 0.1,  1.5)}
        {R(8, hh + 37, 42, 3.5, c.accent, 0.62, 1.5)}
        {R(8, hh + 43, 54, 3.5, c.sub, 0.1,  1.5)}
        {R(8, hh + 43, 48, 3.5, c.accent, 0.52, 1.5)}
        {R(8, hh + 49, 54, 3.5, c.sub, 0.1,  1.5)}
        {R(8, hh + 49, 30, 3.5, c.accent, 0.42, 1.5)}
        {Sec(mx, hh + 8, 54)}
        {R(mx, hh + 16, mw,         2.5, c.sub, 0.52, 1)}
        {R(mx, hh + 21, mw * 0.85,  2,   c.sub, 0.42, 1)}
        {R(mx, hh + 25, mw * 0.95,  2,   c.sub, 0.36, 1)}
        {R(mx, hh + 29, mw * 0.65,  2,   c.sub, 0.28, 1)}
        {R(mx, hh + 35, 66, 2.5, c.text, 0.56, 1)}
        {R(mx, hh + 40, mw,         2,   c.sub, 0.42, 1)}
        {R(mx, hh + 44, mw * 0.8,   2,   c.sub, 0.34, 1)}
        {Sec(mx, hh + 52, 46)}
        {R(mx, hh + 60, mw,         2.5, c.sub, 0.5,  1)}
        {R(mx, hh + 65, mw * 0.72,  2,   c.sub, 0.42, 1)}
        {R(mx, hh + 69, mw * 0.84,  2,   c.sub, 0.35, 1)}
      </svg>
    );
  }

  if (layout === "geometric") {
    const hh = 64, lcw = 68, mx = lcw + 8, mw = W - mx - 8;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <defs>{GDef}<clipPath id={avId}><circle cx={30} cy={32} r={19} /></clipPath></defs>
        <rect x={0} y={0} width={W} height={H} fill={c.bg} />
        <rect x={0} y={0} width={W} height={hh} fill={sbFill} />
        <circle cx={W - 18} cy={10} r={22} fill={c.accent} opacity={0.22} />
        <circle cx={W - 4}  cy={30} r={15} fill={c.accent} opacity={0.16} />
        <circle cx={W - 32} cy={60} r={10} fill="white"    opacity={0.12} />
        <circle cx={W - 50} cy={5}  r={6}  fill={c.accent} opacity={0.14} />
        {Av(30, 32, 19, c.sidebarText)}
        {R(57, 16, 92, 9, c.sidebarText, 0.94, 2)}
        {R(57, 29, 70, 5, c.sidebarText, 0.62, 1.5)}
        {R(57, 38, 54, 3, c.sidebarText, 0.45, 1)}
        <rect x={lcw} y={hh} width={0.7} height={H - hh} fill={c.border} opacity={0.7} />
        {Sec(8, hh + 8, 46)}
        {R(8, hh + 16, 56, 2.5, c.sub, 0.5,  1)}
        {R(8, hh + 21, 44, 2,   c.sub, 0.42, 1)}
        {R(8, hh + 25, 52, 2,   c.sub, 0.36, 1)}
        {R(8, hh + 32, 44, 3,   c.accent, 0.72, 1)}
        {R(8, hh + 38, 54, 3.5, c.sub, 0.1,  1.5)}
        {R(8, hh + 38, 40, 3.5, c.accent, 0.6,  1.5)}
        {R(8, hh + 44, 54, 3.5, c.sub, 0.1,  1.5)}
        {R(8, hh + 44, 47, 3.5, c.accent, 0.5,  1.5)}
        {R(8, hh + 50, 54, 3.5, c.sub, 0.1,  1.5)}
        {R(8, hh + 50, 30, 3.5, c.accent, 0.42, 1.5)}
        {Sec(mx, hh + 8, 54)}
        {R(mx, hh + 16, mw,        2.5, c.sub, 0.52, 1)}
        {R(mx, hh + 21, mw * 0.88, 2,   c.sub, 0.42, 1)}
        {R(mx, hh + 25, mw * 0.97, 2,   c.sub, 0.36, 1)}
        {R(mx, hh + 29, mw * 0.68, 2,   c.sub, 0.28, 1)}
        {R(mx, hh + 35, 64, 2.5, c.text, 0.56, 1)}
        {R(mx, hh + 40, mw,        2,   c.sub, 0.42, 1)}
        {R(mx, hh + 44, mw * 0.78, 2,   c.sub, 0.34, 1)}
        {Sec(mx, hh + 52, 48)}
        {R(mx, hh + 60, mw,        2.5, c.sub, 0.5,  1)}
        {R(mx, hh + 65, mw * 0.76, 2,   c.sub, 0.42, 1)}
        {R(mx, hh + 69, mw * 0.87, 2,   c.sub, 0.35, 1)}
      </svg>
    );
  }

  if (layout === "minimal") {
    const cx = W / 2;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <defs>{GDef}<clipPath id={avId}><circle cx={cx} cy={28} r={19} /></clipPath></defs>
        <rect x={0} y={0} width={W} height={H} fill={c.bg} />
        {Av(cx, 28, 19, c.text)}
        {R(cx - 54, 54, 108, 9, c.text, 0.95, 2)}
        {R(cx - 40,  67, 80,  5, c.text,   0.62, 1.5)}
        {R(cx - 30,  76, 60,  3.5, c.accent, 0.85, 1)}
        <rect x={20} y={85} width={W - 40} height={0.7} fill={c.border} opacity={0.8} />
        <g>
          {R(cx - 34, 91, 68, 4, c.text, 0.82, 1)}
          <rect x={cx - 34} y={96} width={68} height={0.8} fill={c.accent} opacity={0.55} />
        </g>
        {R(20, 100, W - 40,          2.5, c.sub, 0.52, 1)}
        {R(20, 105, (W - 40) * 0.88,  2,  c.sub, 0.42, 1)}
        {R(20, 109, (W - 40) * 0.97,  2,  c.sub, 0.36, 1)}
        {R(20, 113, (W - 40) * 0.65,  2,  c.sub, 0.28, 1)}
        <rect x={20} y={119} width={W - 40} height={0.7} fill={c.border} opacity={0.7} />
        <g>
          {R(cx - 30, 125, 60, 4, c.text, 0.82, 1)}
          <rect x={cx - 30} y={130} width={60} height={0.8} fill={c.accent} opacity={0.55} />
        </g>
        {R(20, 134, W - 40,          2.5, c.sub, 0.5,  1)}
        {R(20, 139, (W - 40) * 0.82,  2,  c.sub, 0.42, 1)}
        {R(20, 143, (W - 40) * 0.72,  2,  c.sub, 0.35, 1)}
        <rect x={20} y={149} width={W - 40} height={0.7} fill={c.border} opacity={0.7} />
        <g>
          {R(cx - 36, 155, 72, 4, c.text, 0.82, 1)}
          <rect x={cx - 36} y={160} width={72} height={0.8} fill={c.accent} opacity={0.55} />
        </g>
        {R(20, 164, W - 40,          2.5, c.sub, 0.5,  1)}
        {R(20, 169, (W - 40) * 0.78,  2,  c.sub, 0.42, 1)}
        {R(20, 173, (W - 40) * 0.92,  2,  c.sub, 0.34, 1)}
      </svg>
    );
  }

  if (layout === "strip") {
    const avCX = 26, avCY = 43;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <defs>{GDef}<clipPath id={avId}><circle cx={avCX} cy={avCY} r={19} /></clipPath></defs>
        <rect x={0} y={0} width={W} height={H} fill={c.bg} />
        <rect x={0} y={0} width={W} height={9} fill={sbFill} />
        <rect x={0} y={9} width={3.5} height={62} fill={c.accent} opacity={0.78} />
        {Av(avCX, avCY, 19, c.accent)}
        {R(54, 18, 107, 9, c.text, 0.95, 2)}
        {R(54, 31,  82, 5, c.accent, 0.9, 1.5)}
        {R(54, 40,  66, 3, c.sub,   0.52, 1)}
        <rect x={10} y={70} width={W - 20} height={0.7} fill={c.border} opacity={0.8} />
        {Sec(10, 76, 58)}
        {R(10, 84, W - 20,          2.5, c.sub, 0.52, 1)}
        {R(10, 89, (W - 20) * 0.85, 2,   c.sub, 0.42, 1)}
        {R(10, 93, (W - 20) * 0.94, 2,   c.sub, 0.36, 1)}
        {R(10, 97, (W - 20) * 0.68, 2,   c.sub, 0.28, 1)}
        {R(10, 103, 66, 2.5, c.text, 0.56, 1)}
        {R(10, 108, W - 20,          2,   c.sub, 0.42, 1)}
        {R(10, 112, (W - 20) * 0.78, 2,   c.sub, 0.34, 1)}
        <rect x={10} y={118} width={W - 20} height={0.7} fill={c.border} opacity={0.7} />
        {Sec(10, 124, 52)}
        {R(10, 132, W - 20,          2.5, c.sub, 0.5,  1)}
        {R(10, 137, (W - 20) * 0.76, 2,   c.sub, 0.42, 1)}
        {R(10, 141, (W - 20) * 0.88, 2,   c.sub, 0.36, 1)}
        {R(10, 145, (W - 20) * 0.62, 2,   c.sub, 0.28, 1)}
      </svg>
    );
  }

  // timeline
  const hh = 56, tlX = 20;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>{GDef}<clipPath id={avId}><circle cx={25} cy={27} r={17} /></clipPath></defs>
      <rect x={0} y={0} width={W} height={H} fill={c.bg} />
      <rect x={0} y={0} width={W} height={hh} fill={sbFill} />
      {Av(25, 27, 17, c.sidebarText)}
      {R(50, 12, 102, 9, c.sidebarText, 0.94, 2)}
      {R(50, 25,  74, 5, c.sidebarText, 0.62, 1.5)}
      {R(50, 34,  56, 3, c.sidebarText, 0.45, 1)}
      <rect x={tlX} y={hh + 8} width={1.5} height={H - hh - 14} fill={c.accent} opacity={0.4} />
      {[0, 1, 2, 3].map((i) => {
        const y = hh + 10 + i * 40;
        const titleW = [80, 62, 90, 66][i] ?? 74;
        const line1W = W - tlX - 18;
        const line2W = [line1W * 0.82, line1W * 0.68, line1W * 0.90, line1W * 0.6][i] ?? line1W * 0.75;
        return (
          <g key={i}>
            <circle cx={tlX + 0.75} cy={y + 4} r={4.5} fill={c.bg} stroke={c.accent} strokeWidth={1.5} opacity={0.95} />
            {R(tlX + 13, y,      titleW, 4.5, c.text,  0.78, 1.5)}
            {R(tlX + 13, y + 7,  45,     2.5, c.accent, 0.62, 1)}
            {R(tlX + 13, y + 12, line1W, 2,   c.sub,   0.46, 1)}
            {R(tlX + 13, y + 16, line2W, 2,   c.sub,   0.36, 1)}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Theme card ─────────────────────────────────────────────────────────── */

function ThemeCard({ theme, selected, onSelect, layoutLabel }: { theme: Theme; selected: boolean; onSelect: () => void; layoutLabel: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-full text-left focus:outline-none transition-all duration-200 ${
        selected ? "scale-[1.04]" : hovered ? "scale-[1.02]" : ""
      }`}
    >
      <div
        className="w-full rounded-xl overflow-hidden mb-2 transition-all duration-200 relative"
        style={{
          aspectRatio: "3/4",
          boxShadow: selected
            ? `0 0 0 3px ${theme.c.accent}, 0 16px 40px rgba(0,0,0,0.22)`
            : hovered
            ? `0 0 0 2px ${theme.c.accent}90, 0 10px 28px rgba(0,0,0,0.16)`
            : "0 2px 10px rgba(0,0,0,0.09)",
        }}
      >
        <ThemeMiniPreview theme={theme} />
        {hovered && !selected && (
          <div
            className="absolute inset-0 flex items-end p-2.5 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 52%)" }}
          >
            <span
              className="text-white text-[11px] font-bold leading-tight px-2 py-0.5 rounded-full"
              style={{ background: `${theme.c.accent}cc` }}
            >
              {theme.name}
            </span>
          </div>
        )}
        {selected && (
          <div
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center shadow-lg pointer-events-none"
            style={{ background: theme.c.accent }}
          >
            <svg viewBox="0 0 12 12" className="w-3 h-3">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        )}
      </div>
      <div className="px-0.5">
        <p
          className="text-[12px] font-bold leading-tight truncate transition-colors"
          style={{ color: selected ? theme.c.accent : hovered ? "#111827" : "#374151" }}
        >
          {theme.name}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{layoutLabel}</p>
      </div>
    </button>
  );
}

/* ─── Landing helpers ───────────────────────────────────────────────────── */

function StatCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let cur = 0;
    const steps = 50, inc = end / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= end) { setN(end); clearInterval(t); }
      else setN(Math.round(cur));
    }, 28);
    return () => clearInterval(t);
  }, [end]);
  return (
    <div className="flex flex-col items-center gap-1.5 px-3 sm:px-8 py-4">
      <span className="text-3xl sm:text-4xl lg:text-5xl font-black" style={{ color:"#1B3CC1" }}>
        {n}<span style={{ fontSize:"0.72em" }}>{suffix}</span>
      </span>
      <span className="text-xs sm:text-sm font-medium text-center" style={{ color:"#6B7280" }}>{label}</span>
    </div>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      {Array.from({ length:5 }).map((_,i) => (
        <svg key={i} viewBox="0 0 20 20" style={{ width:16, height:16 }}>
          <path fill={i < n ? "#F59E0B" : "#E5E7EB"} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function HeroCVPreview() {
  const ACC = "#1B3CC1";
  const ACC2 = "#818CF8";
  const SB = "linear-gradient(160deg,#1B3CC1 0%,#4F46E5 100%)";

  return (
    <div style={{ width:"min(270px,calc(100vw - 80px))", borderRadius:14, overflow:"hidden", fontFamily:"sans-serif",
      boxShadow:"0 32px 80px rgba(27,60,193,0.28), 0 0 0 1px rgba(0,0,0,0.06)" }}>
      <div style={{ display:"flex", background:"#fff", minHeight:365 }}>

        {/* ── Sidebar ── */}
        <div style={{ width:90, background:SB, padding:"16px 8px 20px", display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
          {/* Avatar */}
          <div style={{ width:50, height:50, borderRadius:"50%", background:"rgba(255,255,255,0.18)",
            border:"2.5px solid rgba(255,255,255,0.65)", display:"flex", alignItems:"center",
            justifyContent:"center", marginBottom:7, flexShrink:0 }}>
            <span style={{ color:"#fff", fontWeight:900, fontSize:14, letterSpacing:-0.5 }}>MD</span>
          </div>
          {/* Name + title */}
          <div style={{ width:62, height:4.5, background:"rgba(255,255,255,0.92)", borderRadius:2, marginBottom:4 }} />
          <div style={{ width:46, height:3,   background:"rgba(255,255,255,0.58)", borderRadius:2, marginBottom:12 }} />

          {/* Divider */}
          <div style={{ width:68, height:0.8, background:"rgba(255,255,255,0.22)", marginBottom:9 }} />

          {/* Contact label */}
          <div style={{ width:42, height:2.5, background:"rgba(255,255,255,0.88)", borderRadius:1, marginBottom:6 }} />
          {[54, 62, 48].map((w, i) => (
            <div key={i} style={{ width:w, height:2, background:"rgba(255,255,255,0.38)", borderRadius:1, marginBottom:3.5 }} />
          ))}

          {/* Divider */}
          <div style={{ width:68, height:0.8, background:"rgba(255,255,255,0.22)", margin:"10px 0 9px" }} />

          {/* Compétences label */}
          <div style={{ width:50, height:2.5, background:"rgba(255,255,255,0.88)", borderRadius:1, marginBottom:7 }} />
          {[[68,58],[68,46],[68,54],[68,38]].map(([tot,fill],i) => (
            <div key={i} style={{ width:tot, height:3.5, background:"rgba(255,255,255,0.14)", borderRadius:2, marginBottom:5, position:"relative" }}>
              <div style={{ position:"absolute", left:0, top:0, width:fill, height:3.5, background:"rgba(255,255,255,0.78)", borderRadius:2 }} />
            </div>
          ))}

          {/* Divider */}
          <div style={{ width:68, height:0.8, background:"rgba(255,255,255,0.22)", margin:"10px 0 9px" }} />

          {/* Langues label */}
          <div style={{ width:40, height:2.5, background:"rgba(255,255,255,0.88)", borderRadius:1, marginBottom:7 }} />
          {[[68,68],[68,50]].map(([tot,fill],i) => (
            <div key={i} style={{ width:tot, height:3.5, background:"rgba(255,255,255,0.14)", borderRadius:2, marginBottom:5, position:"relative" }}>
              <div style={{ position:"absolute", left:0, top:0, width:fill, height:3.5, background:"rgba(255,255,255,0.78)", borderRadius:2 }} />
            </div>
          ))}
        </div>

        {/* ── Main content ── */}
        <div style={{ flex:1, padding:"14px 11px 14px 12px" }}>
          {/* Name + job */}
          <div style={{ height:9, width:112, background:"#111827", borderRadius:3, marginBottom:4, opacity:0.93 }} />
          <div style={{ height:4.5, width:82, background:ACC, borderRadius:2, marginBottom:3, opacity:0.72 }} />
          <div style={{ height:2.5, width:98, background:"#9CA3AF", borderRadius:1.5, marginBottom:10, opacity:0.5 }} />

          <div style={{ height:0.8, background:"#E5E7EB", marginBottom:8 }} />

          {/* Section: Expérience */}
          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:5 }}>
            <div style={{ width:3, height:10, background:ACC, borderRadius:1.5 }} />
            <div style={{ height:3.5, width:54, background:"#1F2937", borderRadius:1.5, opacity:0.87 }} />
          </div>
          {/* Job 1 */}
          <div style={{ height:3, width:76, background:"#374151", borderRadius:1.5, marginBottom:2.5, opacity:0.8 }} />
          <div style={{ height:2.5, width:60, background:ACC2, borderRadius:1.5, marginBottom:3, opacity:0.65 }} />
          {[116, 98, 110].map((w,i) => (
            <div key={i} style={{ height:2, width:w, background:"#9CA3AF", borderRadius:1, marginBottom:2.5, opacity:0.44-i*0.05 }} />
          ))}
          {/* Job 2 */}
          <div style={{ height:3, width:68, background:"#374151", borderRadius:1.5, marginBottom:2.5, marginTop:6, opacity:0.78 }} />
          <div style={{ height:2.5, width:56, background:ACC2, borderRadius:1.5, marginBottom:3, opacity:0.65 }} />
          {[108, 88].map((w,i) => (
            <div key={i} style={{ height:2, width:w, background:"#9CA3AF", borderRadius:1, marginBottom:2.5, opacity:0.4-i*0.05 }} />
          ))}

          <div style={{ height:0.8, background:"#E5E7EB", margin:"8px 0" }} />

          {/* Section: Formation */}
          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:5 }}>
            <div style={{ width:3, height:10, background:ACC, borderRadius:1.5 }} />
            <div style={{ height:3.5, width:46, background:"#1F2937", borderRadius:1.5, opacity:0.87 }} />
          </div>
          <div style={{ height:3, width:84, background:"#374151", borderRadius:1.5, marginBottom:2.5, opacity:0.78 }} />
          <div style={{ height:2.5, width:62, background:ACC2, borderRadius:1.5, marginBottom:3, opacity:0.65 }} />
          {[102, 84].map((w,i) => (
            <div key={i} style={{ height:2, width:w, background:"#9CA3AF", borderRadius:1, marginBottom:2.5, opacity:0.4-i*0.05 }} />
          ))}

          <div style={{ height:0.8, background:"#E5E7EB", margin:"8px 0" }} />

          {/* Section: Centres d'intérêt */}
          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:5 }}>
            <div style={{ width:3, height:10, background:ACC, borderRadius:1.5 }} />
            <div style={{ height:3.5, width:66, background:"#1F2937", borderRadius:1.5, opacity:0.87 }} />
          </div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {[38, 50, 44, 36].map((w,i) => (
              <div key={i} style={{ height:12, width:w, background:"#EEF2FF", borderRadius:4,
                border:"1px solid #C7D2FE", flexShrink:0 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page component ─────────────────────────────────────────────────────── */

export default function HomePage() {
  const { t } = useLang();
  const STEPS = [
    { id: "infos",       label: t.steps[0] },
    { id: "experiences", label: t.steps[1] },
    { id: "formations",  label: t.steps[2] },
    { id: "competences", label: t.steps[3] },
  ];

  const [cvData,          setCVData]          = useState<CVData>(defaultCVData);
  const [currentStep,     setCurrentStep]     = useState(0);
  const [enrichedCV,      setEnrichedCV]      = useState<CVData | null>(null);
  const [isLoading,       setIsLoading]       = useState(false);
  const [error,           setError]           = useState<string | null>(null);
  const [user,            setUser]            = useState<User | null>(null);
  const [showAuth,        setShowAuth]        = useState(false);
  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const [showForm,        setShowForm]        = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("horizon");
  const [themeSelectCat,  setThemeSelectCat]  = useState<Cat>("moderne");
  const [splashDone,      setSplashDone]      = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [cvCount,         setCvCount]         = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data }) => setUser(data.session?.user ?? null))
      .catch(() => setUser(null));

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) setShowAuth(false);
      });
      subscription = data.subscription;
    } catch {
      // auth unavailable — site stays functional without login
    }

    // Fetch community CV count
    (async () => {
      try {
        const { data } = await supabase.from("stats").select("value").eq("key", "cv_generated").single();
        if (data) setCvCount(data.value as number);
      } catch {}
    })();

    // Track page visit (once per session)
    if (!sessionStorage.getItem("visit_tracked")) {
      sessionStorage.setItem("visit_tracked", "1");
      (async () => { try { await supabase.from("page_views").insert({}); } catch {} })();
    }

    return () => { try { subscription?.unsubscribe(); } catch {} };
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [showThemeSelect, showForm, enrichedCV]);

  if (!splashDone) return <SplashScreen onDone={() => setSplashDone(true)} />;

  const updateCVData = (partial: Partial<CVData>) =>
    setCVData(prev => ({ ...prev, ...partial }));

  const isLastStep = currentStep === STEPS.length - 1;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur serveur");
      }
      setEnrichedCV(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsLoading(false);
    }
  };

  const goToThemeSelect = () => {
    setCurrentStep(0);
    setEnrichedCV(null);
    setError(null);
    setShowThemeSelect(true);
    setShowForm(false);
  };

  const selectThemeAndContinue = (themeId: string) => {
    setSelectedThemeId(themeId);
    setShowThemeSelect(false);
    setShowForm(true);
  };

  const backToThemeSelect = () => {
    setShowForm(false);
    setEnrichedCV(null);
    setShowThemeSelect(true);
  };

  /* ════════════════════════════════════════════════════════════════
     LANDING PAGE
  ════════════════════════════════════════════════════════════════ */
  if (!showThemeSelect && !showForm && !enrichedCV) {
    return (
      <div className="min-h-screen bg-white font-sans">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-gray-100" style={{ backdropFilter:"blur(8px)", background:"rgba(255,255,255,0.93)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <span className="text-lg font-black tracking-tight text-gray-900">
              CV<span style={{ color:"#1B3CC1" }}>-DSS</span>
            </span>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-3">
              <LangToggle />
              {user ? (
                <>
                  <span className="text-sm text-gray-600">
                    {t.hello}{" "}
                    <span className="font-semibold text-gray-900">
                      {user.user_metadata?.prenom ?? user.email?.split("@")[0]}
                    </span>
                  </span>
                  <button type="button" onClick={() => supabase.auth.signOut().catch(() => setUser(null))}
                    className="px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-colors">
                    {t.signout}
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setShowAuth(true)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  {t.signin}
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-100 px-4 py-4 bg-white flex items-center justify-between gap-3">
              <LangToggle />
              {user ? (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-gray-600 truncate">
                    {t.hello}{" "}
                    <span className="font-semibold text-gray-900">
                      {user.user_metadata?.prenom ?? user.email?.split("@")[0]}
                    </span>
                  </span>
                  <button type="button" onClick={() => supabase.auth.signOut().catch(() => setUser(null))}
                    className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-colors flex-shrink-0">
                    {t.signout}
                  </button>
                </div>
              ) : (
                <button type="button"
                  onClick={() => { setShowAuth(true); setMobileMenuOpen(false); }}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-full flex-shrink-0"
                  style={{ background: "#1B3CC1" }}>
                  {t.signin}
                </button>
              )}
            </div>
          )}
        </header>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{ background:"linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 60%,#EDE9FE 100%)" }} className="overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex-1 max-w-xl">
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6" style={{ background:"#E8F0FE", color:"#1B3CC1" }}>
                <span style={{ color:"#22C55E" }}>✓</span>
                {t.hero_badge}
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                {t.hero_title1}{" "}
                <span style={{ color:"#1B3CC1" }}>{t.hero_title2}</span>
              </h1>
              <ol className="space-y-3 mb-8">
                {t.hero_steps.map((step, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ background:"#1B3CC1" }}>{i + 1}</span>
                    <span className="text-gray-700 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={goToThemeSelect}
                  className="px-7 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:scale-[1.03] active:scale-100"
                  style={{ background:"#1B3CC1", boxShadow:"0 8px 24px rgba(27,60,193,0.35)" }}>
                  {t.hero_cta_primary}
                </button>
                <button type="button" onClick={goToThemeSelect}
                  className="px-7 py-3.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  {t.hero_cta_secondary}
                </button>
              </div>
            </div>
            <div className="relative flex-shrink-0 flex items-center justify-center w-full max-w-[340px] mx-auto lg:mx-0"
              style={{ height:"clamp(260px,60vw,420px)" }}>
              <div className="absolute" style={{ width:200, height:260, background:"#1B3CC1", borderRadius:10, transform:"rotate(-7deg)", top:16, left:-8, zIndex:0, opacity:0.18 }} />
              <div className="absolute" style={{ width:170, height:80,  background:"#E8C848", borderRadius:6, transform:"rotate(5deg)",   bottom:24, right:-12, zIndex:0, opacity:0.7 }} />
              <div className="absolute" style={{ width:52, height:52, background:"#93AEFF", borderRadius:"50%", top:-12, right:36, zIndex:0, opacity:0.55 }} />
              <div className="absolute" style={{ width:28, height:28, background:"#FCA5A5", borderRadius:"50%", bottom:60, left:4, zIndex:0, opacity:0.45 }} />
              <div className="photo-float relative" style={{ zIndex:10, width:"clamp(180px,48vw,252px)", height:"clamp(180px,48vw,252px)", borderRadius:"50%", overflow:"hidden", boxShadow:"0 0 0 5px #fff, 0 0 0 9px #1B3CC1, 0 28px 70px rgba(27,60,193,0.35)" }}>
                <Image src="/photo.png" alt="Photo de profil" width={252} height={252} priority style={{ objectFit:"cover", objectPosition:"top center", width:"100%", height:"100%", display:"block" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <section className="border-y border-gray-100">
          <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 divide-x divide-gray-100">
            <StatCounter end={3}   suffix=" min" label={t.stat1_label} />
            <StatCounter end={70}  suffix=""     label={t.stat2_label} />
            <StatCounter end={100} suffix="%"    label={t.stat3_label} />
          </div>
          <div className="border-t border-gray-100 py-3 text-center">
            {cvCount !== null ? (
              <span className="text-sm font-semibold text-gray-600">
                <span className="font-black" style={{ color: "#1B3CC1" }}>
                  {cvCount.toLocaleString("fr-FR")}
                </span>
                {" "}{t.community_label}
              </span>
            ) : (
              <span className="text-sm text-gray-300">— {t.community_label}</span>
            )}
          </div>
        </section>

        {/* ── Avant / Après ────────────────────────────────────────────── */}
        <section className="py-20" style={{ background:"#FAFAFA" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color:"#1B3CC1" }}>{t.ba_tagline}</p>
              <h2 className="text-3xl font-black text-gray-900">{t.ba_title}</h2>
              <p className="text-sm text-gray-500 mt-3 max-w-sm mx-auto">{t.ba_subtitle}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ background:"#FEE2E2", color:"#DC2626" }}>{t.ba_before}</span>
                <div style={{ width:240, background:"#fff", border:"1px solid #E5E7EB", borderRadius:8, padding:"16px 14px", fontFamily:"Georgia,serif", boxShadow:"0 2px 8px rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#111", marginBottom:2 }}>Martin DUPONT</div>
                  <div style={{ fontSize:10, color:"#555", marginBottom:10 }}>martin.dupont@email.com | 06 12 34 56 78</div>
                  <div style={{ fontSize:10, fontWeight:700, color:"#111", borderBottom:"1px solid #aaa", paddingBottom:2, marginBottom:5 }}>EXPÉRIENCE</div>
                  {["Responsable commercial · 2019–2023", "Technicien support · 2016–2019"].map((t2, i) => (
                    <div key={i} style={{ fontSize:9, color:"#333", marginBottom:3.5 }}>{t2}</div>
                  ))}
                  <div style={{ fontSize:10, fontWeight:700, color:"#111", borderBottom:"1px solid #aaa", paddingBottom:2, margin:"8px 0 5px" }}>FORMATION</div>
                  <div style={{ fontSize:9, color:"#333", marginBottom:8 }}>BTS Technico-commercial · 2016</div>
                  <div style={{ fontSize:10, fontWeight:700, color:"#111", borderBottom:"1px solid #aaa", paddingBottom:2, margin:"8px 0 5px" }}>COMPÉTENCES</div>
                  <div style={{ fontSize:9, color:"#333" }}>Excel, Word, CRM, Vente, Négociation</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 48 24" style={{ width:48, height:24 }} className="rotate-90 md:rotate-0" fill="none">
                  <path d="M2 12h40M34 4l8 8-8 8" stroke="#1B3CC1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-bold" style={{ color:"#1B3CC1" }}>{t.ba_label}</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ background:"#DCFCE7", color:"#16A34A" }}>{t.ba_after}</span>
                <HeroCVPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ── Comment ça marche ────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color:"#1B3CC1" }}>{t.how_tagline}</p>
              <h2 className="text-3xl font-black text-gray-900">{t.how_title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.how_steps.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                  <span className="text-[10px] font-black tracking-widest mb-4" style={{ color:"#1B3CC1", opacity:0.4 }}>0{idx + 1}</span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background:"#EEF2FF", color:"#1B3CC1" }}>{HOW_ICONS[idx]}</div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  {idx < 2 && (
                    <div className="md:hidden mt-5">
                      <svg viewBox="0 0 16 24" style={{ width:16, height:24 }} fill="none" stroke="#C7D2FE" strokeWidth={2}>
                        <path d="M8 2v20M2 16l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button type="button" onClick={goToThemeSelect}
                className="px-8 py-4 text-sm font-black text-white rounded-xl transition-all hover:scale-[1.03]"
                style={{ background:"#1B3CC1", boxShadow:"0 8px 24px rgba(27,60,193,0.3)" }}>
                {t.how_cta}
              </button>
            </div>
          </div>
        </section>

        {/* ── Témoignages ──────────────────────────────────────────────── */}
        <section className="py-20" style={{ background:"#F8FAFF" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color:"#1B3CC1" }}>{t.testi_tagline}</p>
              <h2 className="text-3xl font-black text-gray-900">{t.testi_title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIAL_VISUALS.map((vis, i) => {
                const testi = t.testimonials[i];
                return (
                  <div key={testi.name} className="bg-white rounded-2xl p-6 flex flex-col gap-4" style={{ boxShadow:"0 4px 20px rgba(0,0,0,0.07)", border:"1px solid #F0F4FF" }}>
                    <Stars n={vis.stars} />
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">&ldquo;{testi.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0" style={{ background:vis.bg, color:vis.fg }}>
                        {vis.init}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{testi.name}</p>
                        <p className="text-xs text-gray-400">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Notre histoire ───────────────────────────────────────────── */}
        <section className="py-20" style={{ background:"#FFFBF5" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color:"#1B3CC1" }}>{t.story_tagline}</p>
              <h2 className="text-3xl font-black text-gray-900">{t.story_title}</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div style={{ width:110, height:110, borderRadius:"50%", overflow:"hidden", boxShadow:"0 8px 32px rgba(27,60,193,0.18), 0 0 0 4px #fff, 0 0 0 6px #E0E7FF" }}>
                      <Image src="/photo.png" alt="Bruno De Sousa" width={110} height={110} style={{ objectFit:"cover", width:"100%", height:"100%", display:"block" }} />
                    </div>
                    <span className="text-xs font-bold text-gray-500">Bruno De Sousa</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <svg viewBox="0 0 40 28" style={{ width:36, height:26, marginBottom:12, opacity:0.18 }} fill="#1B3CC1">
                  <path d="M0 28V17.6C0 7.87 6.08 2.27 18.24 0l1.92 3.84C14.08 5.12 11.2 8.27 10.56 13.6H18V28H0zm22 0V17.6C22 7.87 28.08 2.27 40.24 0l1.76 3.84C35.84 5.12 33.2 8.27 32.56 13.6H40V28H22z" />
                </svg>
                <p className="text-base text-gray-700 leading-relaxed mb-6" style={{ fontStyle:"italic" }}>
                  {t.story_quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background:"linear-gradient(90deg,#C7D2FE,transparent)" }} />
                  <span className="text-sm font-bold" style={{ color:"#1B3CC1" }}>{t.story_author}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA finale ───────────────────────────────────────────────── */}
        <section className="py-20" style={{ background:"linear-gradient(135deg,#1B3CC1 0%,#4F46E5 50%,#7C3AED 100%)" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              {t.cta_title}
            </h2>
            <p className="text-sm mb-10" style={{ color:"rgba(255,255,255,0.75)" }}>
              {t.cta_sub}
            </p>
            <button type="button" onClick={goToThemeSelect}
              className="px-10 py-4 text-base font-black rounded-2xl transition-all hover:scale-[1.04]"
              style={{ background:"#fff", color:"#1B3CC1", boxShadow:"0 8px 32px rgba(0,0,0,0.25)" }}>
              {t.cta_button}
            </button>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="py-12" style={{ background:"#0F172A" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <span className="text-lg font-black text-white tracking-tight">
                  CV<span style={{ color:"#818CF8" }}>-DSS</span>
                </span>
                <p className="text-xs mt-3 leading-relaxed" style={{ color:"rgba(255,255,255,0.4)" }}>
                  {t.footer_tagline}
                </p>
                <div className="flex gap-3 mt-5">
                  <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:"rgba(255,255,255,0.08)" }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color:"rgba(255,255,255,0.5)" }}>
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:"rgba(255,255,255,0.08)" }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color:"rgba(255,255,255,0.5)" }}>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:"rgba(255,255,255,0.35)" }}>{t.footer_produit}</p>
                {t.footer_produit_links.map(l => (
                  <button key={l} type="button" onClick={goToThemeSelect} className="block text-sm mb-2.5 text-left" style={{ color:"rgba(255,255,255,0.55)" }}>
                    {l}
                  </button>
                ))}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:"rgba(255,255,255,0.35)" }}>{t.footer_legal}</p>
                {[
                  { label: t.lang_fr === "FR" ? "Mentions légales" : "Legal notice",            href: "/mentions-legales" },
                  { label: t.lang_fr === "FR" ? "Politique de confidentialité" : "Privacy policy", href: "/mentions-legales" },
                  { label: "CGU",                          href: "/cgu" },
                  { label: t.footer_contact_col,           href: "mailto:cvdss.contact@gmail.com" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="block text-sm mb-2.5" style={{ color:"rgba(255,255,255,0.55)" }}>{label}</a>
                ))}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:"rgba(255,255,255,0.35)" }}>{t.footer_contact_col}</p>
                <p className="text-sm mb-2" style={{ color:"rgba(255,255,255,0.55)" }}>{t.footer_question}</p>
                <a href="mailto:cvdss.contact@gmail.com" className="text-sm font-semibold" style={{ color:"#818CF8" }}>
                  cvdss.contact@gmail.com
                </a>
                <a
                  href="https://www.paypal.me/brdst10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                  style={{ background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.55)", border:"1px solid rgba(255,255,255,0.10)" }}
                >
                  ☕ Soutenir le projet
                </a>
                <div className="mt-3">
                  <button type="button" onClick={goToThemeSelect}
                    className="w-full px-4 py-2.5 text-xs font-black text-white rounded-xl"
                    style={{ background:"#1B3CC1" }}>
                    {t.footer_cta_btn}
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor:"rgba(255,255,255,0.08)" }}>
              <p className="text-xs" style={{ color:"rgba(255,255,255,0.3)" }}>{t.footer_copyright}</p>
              <p className="text-xs" style={{ color:"rgba(255,255,255,0.2)" }}>{t.footer_made}</p>
            </div>
            <p className="text-center text-[11px] mt-4" style={{ color:"rgba(255,255,255,0.18)" }}>
              {t.footer_created}
            </p>
          </div>
        </footer>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     SÉLECTION DE THÈME
  ════════════════════════════════════════════════════════════════ */
  if (showThemeSelect) {
    const visibleThemes = THEMES.filter(th => th.cat === themeSelectCat);
    return (
      <div className="min-h-screen" style={{ background: "#F8FAFF" }}>
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <button type="button" onClick={() => setShowThemeSelect(false)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.back}
            </button>
            <span className="text-lg font-black tracking-tight text-gray-900">
              CV<span style={{ color: "#1B3CC1" }}>-DSS</span>
            </span>
            {/* Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <LangToggle />
              <div className="flex gap-1">
                <div className="w-6 h-1.5 rounded-full" style={{ background: "#1B3CC1" }} />
                <div className="w-6 h-1.5 rounded-full bg-gray-200" />
              </div>
              <span className="text-xs font-semibold text-gray-400">1 / 2</span>
            </div>
            {/* Mobile hamburger */}
            <button
              type="button"
              className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-100 px-4 py-3 bg-white flex items-center gap-3">
              <LangToggle />
              <div className="flex gap-1 ml-auto">
                <div className="w-6 h-1.5 rounded-full" style={{ background: "#1B3CC1" }} />
                <div className="w-6 h-1.5 rounded-full bg-gray-200" />
              </div>
              <span className="text-xs font-semibold text-gray-400">1 / 2</span>
            </div>
          )}
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] mb-2" style={{ color: "#1B3CC1" }}>{t.ts_step}</p>
            <h1 className="text-3xl font-black text-gray-900 mb-2">{t.ts_title}</h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">{t.ts_subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat.key} type="button" onClick={() => setThemeSelectCat(cat.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  themeSelectCat === cat.key
                    ? "text-white border-transparent shadow-md"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
                }`}
                style={themeSelectCat === cat.key ? { background: "#1B3CC1" } : {}}>
                {cat.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-black ${themeSelectCat === cat.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleThemes.map(theme => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                selected={selectedThemeId === theme.id}
                onSelect={() => setSelectedThemeId(theme.id)}
                layoutLabel={t.layout_labels[theme.layout as keyof typeof t.layout_labels] ?? theme.layout}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => selectThemeAndContinue(selectedThemeId)}
              className="flex items-center gap-2 px-8 py-4 text-base font-black text-white rounded-2xl transition-all hover:scale-[1.03] shadow-xl"
              style={{ background: "linear-gradient(135deg,#1B3CC1,#6366f1)", boxShadow: "0 8px 32px rgba(27,60,193,0.35)" }}>
              {t.ts_continue} {THEMES.find(th => th.id === selectedThemeId)?.name ?? ""}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">{t.ts_hint}</p>
        </main>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     FORMULAIRE 4 ÉTAPES + RÉSULTAT
  ════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 40%,#FAF5FF 100%)" }}>

      <header className="border-b border-indigo-100/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button type="button" onClick={enrichedCV ? () => { setEnrichedCV(null); setCurrentStep(0); } : backToThemeSelect}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {enrichedCV ? t.form_back_result : t.form_back}
          </button>

          <span className="text-sm font-black tracking-tight text-gray-900">
            CV<span style={{ color: "#1B3CC1" }}>-DSS</span>
          </span>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <LangToggle />
            {!enrichedCV && (
              <>
                <div className="flex gap-1">
                  <div className="w-6 h-1.5 rounded-full" style={{ background: "#1B3CC1" }} />
                  <div className="w-6 h-1.5 rounded-full" style={{ background: "#1B3CC1" }} />
                </div>
                <span className="text-xs font-semibold text-indigo-400">{currentStep + 1} / {STEPS.length}</span>
              </>
            )}
          </div>
          {/* Mobile: show step only, hamburger for lang */}
          <div className="flex sm:hidden items-center gap-2">
            {!enrichedCV && (
              <span className="text-xs font-semibold text-indigo-400">{currentStep + 1} / {STEPS.length}</span>
            )}
            <button
              type="button"
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-indigo-100/60 px-4 py-3 bg-white/90 flex justify-center">
            <LangToggle />
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">

        {!enrichedCV && (
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
              style={{ background: THEMES.find(th => th.id === selectedThemeId)?.swatch, border: "2px solid rgba(0,0,0,0.1)" }} />
            <span className="text-xs text-gray-500 font-medium">
              {t.theme_selected} : <span className="font-bold text-gray-700">{THEMES.find(th => th.id === selectedThemeId)?.name}</span>
            </span>
            <button type="button" onClick={backToThemeSelect}
              className="ml-auto text-[11px] font-bold underline underline-offset-2 text-indigo-500 hover:text-indigo-700 transition-colors">
              {t.theme_change}
            </button>
          </div>
        )}

        {enrichedCV ? (
          <CVResult
            cv={enrichedCV}
            initialThemeId={selectedThemeId}
            onEdit={(data) => { setCVData(data); setCurrentStep(0); setEnrichedCV(null); }}
          />
        ) : (
          <>
            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-start justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-px bg-indigo-100 z-0 mx-8" />
                {STEPS.map((step, index) => (
                  <button key={step.id} type="button" onClick={() => setCurrentStep(index)}
                    className="relative z-10 flex flex-col items-center gap-2 focus:outline-none">
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      index < currentStep
                        ? "text-white shadow-md shadow-indigo-300"
                        : index === currentStep
                        ? "bg-white text-indigo-600 border-2 border-indigo-500 shadow-lg shadow-indigo-200"
                        : "bg-white text-gray-300 border-2 border-gray-200"
                    }`}
                      style={index < currentStep ? { background: "linear-gradient(135deg,#6366f1,#a855f7)" } : {}}>
                      {index < currentStep ? "✓" : index + 1}
                    </span>
                    <span className={`text-[11px] font-semibold hidden sm:block transition-colors ${
                      index <= currentStep ? "text-indigo-600" : "text-gray-300"
                    }`}>{step.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width:`${((currentStep + 1) / STEPS.length) * 100}%`, background:"linear-gradient(90deg,#6366f1,#a855f7)" }} />
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-6"
              style={{ boxShadow: "0 8px 40px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.04)" }}>
              {currentStep === 0 && <InfoPersonnelles data={cvData} onChange={updateCVData} />}
              {currentStep === 1 && <Experiences     data={cvData} onChange={updateCVData} />}
              {currentStep === 2 && <Formations      data={cvData} onChange={updateCVData} />}
              {currentStep === 3 && <Competences     data={cvData} onChange={updateCVData} />}

              <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                <button type="button" onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                  disabled={currentStep === 0}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  {t.prev}
                </button>

                {isLastStep ? (
                  <button type="button" onClick={handleSubmit} disabled={isLoading}
                    className="px-7 py-2.5 text-sm font-bold text-white rounded-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background:"linear-gradient(135deg,#6366f1,#a855f7)", boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>
                    {isLoading ? t.generating : t.generate}
                  </button>
                ) : (
                  <button type="button" onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
                    className="px-7 py-2.5 text-sm font-bold text-white rounded-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-100"
                    style={{ background:"linear-gradient(135deg,#6366f1,#a855f7)", boxShadow:"0 4px 16px rgba(99,102,241,0.3)" }}>
                    {t.next}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">{error}</div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

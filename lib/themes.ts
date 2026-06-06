/* ─── Theme data — partagé entre CVResult et la sélection de thème ─────────── */

export interface TC {
  sidebar: string;
  sidebarText: string;
  sidebarSub: string;
  accent: string;
  accentLight: string;
  bg: string;
  text: string;
  sub: string;
  border: string;
}

export type Layout = "sidebar" | "header" | "geometric" | "minimal" | "strip" | "timeline";
export type Sep    = "line" | "dots" | "dash" | "double" | "gradient" | "diamond";
export type Cat    = "moderne" | "corporate" | "creatif" | "minimaliste" | "elegant" | "tech" | "nature";

export interface Theme {
  id: string;
  name: string;
  cat: Cat;
  swatch: string;
  layout: Layout;
  c: TC;
  sep: Sep;
}

export const THEMES: Theme[] = [
  // ════ MODERNE ════
  { id:"horizon",   name:"Horizon",      cat:"moderne", swatch:"#4F46E5", layout:"sidebar",   sep:"gradient",
    c:{ sidebar:"#4F46E5", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#818CF8", accentLight:"#EEF2FF", bg:"#fff",    text:"#111827", sub:"#6B7280", border:"#E5E7EB" }},
  { id:"zenith",    name:"Zénith",       cat:"moderne", swatch:"#EC4899", layout:"geometric", sep:"dots",
    c:{ sidebar:"#EC4899", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#F472B6", accentLight:"#FDF2F8", bg:"#fff",    text:"#1F2937", sub:"#6B7280", border:"#FCE7F3" }},
  { id:"flux",      name:"Flux",         cat:"moderne", swatch:"#334155", layout:"sidebar",   sep:"line",
    c:{ sidebar:"#334155", sidebarText:"#F8FAFC", sidebarSub:"rgba(248,250,252,0.5)", accent:"#38BDF8", accentLight:"#F0F9FF", bg:"#F8FAFC", text:"#0F172A", sub:"#475569", border:"#E2E8F0" }},
  { id:"pulse",     name:"Pulse",        cat:"moderne", swatch:"#F97316", layout:"geometric", sep:"gradient",
    c:{ sidebar:"#EA580C", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#F97316", accentLight:"#FFF7ED", bg:"#fff",    text:"#1C1917", sub:"#78716C", border:"#FED7AA" }},
  { id:"aura",      name:"Aura",         cat:"moderne", swatch:"#7C3AED", layout:"sidebar",   sep:"double",
    c:{ sidebar:"#7C3AED", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#A78BFA", accentLight:"#EDE9FE", bg:"#fff",    text:"#1E1B4B", sub:"#4B5563", border:"#DDD6FE" }},
  { id:"eclat",     name:"Éclat",        cat:"moderne", swatch:"#0891B2", layout:"strip",     sep:"dots",
    c:{ sidebar:"#0891B2", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#06B6D4", accentLight:"#ECFEFF", bg:"#fff",    text:"#164E63", sub:"#0E7490", border:"#A5F3FC" }},
  { id:"strato",    name:"Strato",       cat:"moderne", swatch:"#0F172A", layout:"geometric", sep:"diamond",
    c:{ sidebar:"#0F172A", sidebarText:"#E2E8F0", sidebarSub:"rgba(226,232,240,0.5)", accent:"#60A5FA", accentLight:"#EFF6FF", bg:"#fff",    text:"#0F172A", sub:"#64748B", border:"#E2E8F0" }},
  { id:"solstice",  name:"Solstice",     cat:"moderne", swatch:"#D97706", layout:"sidebar",   sep:"gradient",
    c:{ sidebar:"#92400E", sidebarText:"#FEF3C7", sidebarSub:"rgba(254,243,199,0.5)", accent:"#F59E0B", accentLight:"#FFFBEB", bg:"#fff",    text:"#1C1917", sub:"#78716C", border:"#FDE68A" }},
  { id:"pastel",    name:"Pastel",       cat:"moderne", swatch:"#A78BFA", layout:"strip",     sep:"dots",
    c:{ sidebar:"#C4B5FD", sidebarText:"#4C1D95", sidebarSub:"rgba(76,29,149,0.5)",   accent:"#7C3AED", accentLight:"#F5F3FF", bg:"#FAFAFA", text:"#2E1065", sub:"#7C3AED", border:"#DDD6FE" }},
  { id:"fusion",    name:"Fusion",       cat:"moderne", swatch:"#0D9488", layout:"geometric", sep:"line",
    c:{ sidebar:"#0D9488", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#14B8A6", accentLight:"#F0FDFA", bg:"#fff",    text:"#134E4A", sub:"#0F766E", border:"#99F6E4" }},

  // ════ CORPORATE ════
  { id:"prestige",  name:"Prestige",     cat:"corporate", swatch:"#1E3A5F", layout:"header",   sep:"line",
    c:{ sidebar:"#1E3A5F", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.6)", accent:"#2B5BA8", accentLight:"#EFF6FF", bg:"#fff",    text:"#1E293B", sub:"#475569", border:"#CBD5E1" }},
  { id:"titan",     name:"Titan",        cat:"corporate", swatch:"#374151", layout:"header",   sep:"double",
    c:{ sidebar:"#1F2937", sidebarText:"#F9FAFB", sidebarSub:"rgba(249,250,251,0.5)", accent:"#6B7280", accentLight:"#F3F4F6", bg:"#F9FAFB", text:"#111827", sub:"#4B5563", border:"#D1D5DB" }},
  { id:"meridian",  name:"Méridian",     cat:"corporate", swatch:"#6B1C2E", layout:"sidebar",  sep:"line",
    c:{ sidebar:"#6B1C2E", sidebarText:"#FEE2E2", sidebarSub:"rgba(254,226,226,0.5)", accent:"#9F1239", accentLight:"#FFF1F2", bg:"#fff",    text:"#1C1917", sub:"#44403C", border:"#FCA5A5" }},
  { id:"atlas",     name:"Atlas",        cat:"corporate", swatch:"#0C2340", layout:"header",   sep:"gradient",
    c:{ sidebar:"#0C2340", sidebarText:"#E0E7FF", sidebarSub:"rgba(224,231,255,0.5)", accent:"#3B82F6", accentLight:"#EFF6FF", bg:"#fff",    text:"#0F172A", sub:"#334155", border:"#BFDBFE" }},
  { id:"vanguard",  name:"Vanguard",     cat:"corporate", swatch:"#134E4A", layout:"sidebar",  sep:"double",
    c:{ sidebar:"#134E4A", sidebarText:"#CCFBF1", sidebarSub:"rgba(204,251,241,0.5)", accent:"#0F766E", accentLight:"#F0FDFA", bg:"#fff",    text:"#1C1917", sub:"#0F766E", border:"#99F6E4" }},
  { id:"sovereign", name:"Sovereign",    cat:"corporate", swatch:"#111827", layout:"header",   sep:"diamond",
    c:{ sidebar:"#111827", sidebarText:"#F3F4F6", sidebarSub:"rgba(243,244,246,0.5)", accent:"#6B7280", accentLight:"#F9FAFB", bg:"#F9FAFB", text:"#111827", sub:"#374151", border:"#D1D5DB" }},
  { id:"premier",   name:"Premier",      cat:"corporate", swatch:"#1E40AF", layout:"sidebar",  sep:"line",
    c:{ sidebar:"#1E40AF", sidebarText:"#EFF6FF", sidebarSub:"rgba(239,246,255,0.5)", accent:"#3B82F6", accentLight:"#DBEAFE", bg:"#fff",    text:"#1E3A5F", sub:"#1D4ED8", border:"#BFDBFE" }},
  { id:"fortis",    name:"Fortis",       cat:"corporate", swatch:"#4C0519", layout:"header",   sep:"gradient",
    c:{ sidebar:"#4C0519", sidebarText:"#FFE4E6", sidebarSub:"rgba(255,228,230,0.5)", accent:"#BE123C", accentLight:"#FFF1F2", bg:"#fff",    text:"#1C1917", sub:"#44403C", border:"#FECDD3" }},
  { id:"nexus",     name:"Nexus",        cat:"corporate", swatch:"#292524", layout:"sidebar",  sep:"dots",
    c:{ sidebar:"#1C1917", sidebarText:"#E7E5E4", sidebarSub:"rgba(231,229,228,0.5)", accent:"#78716C", accentLight:"#F5F5F4", bg:"#fff",    text:"#1C1917", sub:"#57534E", border:"#E7E5E4" }},
  { id:"consul",    name:"Consul",       cat:"corporate", swatch:"#172554", layout:"sidebar",  sep:"line",
    c:{ sidebar:"#172554", sidebarText:"#DBEAFE", sidebarSub:"rgba(219,234,254,0.5)", accent:"#1D4ED8", accentLight:"#EFF6FF", bg:"#F8FAFC", text:"#0F172A", sub:"#1E3A5F", border:"#BFDBFE" }},

  // ════ CRÉATIF ════
  { id:"kaleido",   name:"Kaléidoscope", cat:"creatif", swatch:"#7C3AED", layout:"geometric", sep:"dots",
    c:{ sidebar:"linear-gradient(135deg,#7C3AED,#EC4899)", sidebarText:"#fff", sidebarSub:"rgba(255,255,255,0.55)", accent:"#A855F7", accentLight:"#F5F3FF", bg:"#fff", text:"#1E1B4B", sub:"#4C1D95", border:"#DDD6FE" }},
  { id:"prisme",    name:"Prisme",       cat:"creatif", swatch:"#F97316", layout:"strip",     sep:"gradient",
    c:{ sidebar:"#F97316", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#EA580C", accentLight:"#FFF7ED", bg:"#fff",    text:"#1C1917", sub:"#78716C", border:"#FED7AA" }},
  { id:"vibrato",   name:"Vibrato",      cat:"creatif", swatch:"#DB2777", layout:"geometric", sep:"dots",
    c:{ sidebar:"#DB2777", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#EC4899", accentLight:"#FDF2F8", bg:"#fff",    text:"#500724", sub:"#9D174D", border:"#FBCFE8" }},
  { id:"mosaique",  name:"Mosaïque",     cat:"creatif", swatch:"#6D28D9", layout:"sidebar",   sep:"diamond",
    c:{ sidebar:"#2E1065", sidebarText:"#E9D5FF", sidebarSub:"rgba(233,213,255,0.55)", accent:"#7C3AED", accentLight:"#F5F3FF", bg:"#FAFAFA", text:"#1E1B4B", sub:"#4C1D95", border:"#DDD6FE" }},
  { id:"canvas",    name:"Canvas",       cat:"creatif", swatch:"#DC2626", layout:"strip",     sep:"dots",
    c:{ sidebar:"#DC2626", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#EF4444", accentLight:"#FEF2F2", bg:"#FFFBF0", text:"#1C1917", sub:"#78716C", border:"#FECACA" }},
  { id:"splash",    name:"Splash",       cat:"creatif", swatch:"#0E7490", layout:"geometric", sep:"gradient",
    c:{ sidebar:"#0E7490", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#06B6D4", accentLight:"#ECFEFF", bg:"#F0FDFA", text:"#0C4A6E", sub:"#0369A1", border:"#A5F3FC" }},
  { id:"studio",    name:"Studio",       cat:"creatif", swatch:"#CA8A04", layout:"sidebar",   sep:"double",
    c:{ sidebar:"#1C1917", sidebarText:"#FEF08A", sidebarSub:"rgba(254,240,138,0.55)", accent:"#EAB308", accentLight:"#FEFCE8", bg:"#fff",    text:"#1C1917", sub:"#44403C", border:"#FEF08A" }},
  { id:"pixel",     name:"Pixel",        cat:"creatif", swatch:"#16A34A", layout:"strip",     sep:"dots",
    c:{ sidebar:"#14532D", sidebarText:"#86EFAC", sidebarSub:"rgba(134,239,172,0.55)", accent:"#16A34A", accentLight:"#F0FDF4", bg:"#fff",    text:"#1C1917", sub:"#166534", border:"#BBF7D0" }},
  { id:"palette",   name:"Palette",      cat:"creatif", swatch:"#F43F5E", layout:"geometric", sep:"diamond",
    c:{ sidebar:"#F43F5E", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#FB7185", accentLight:"#FFF1F2", bg:"#fff",    text:"#0F172A", sub:"#475569", border:"#FECDD3" }},
  { id:"vortex",    name:"Vortex",       cat:"creatif", swatch:"#581C87", layout:"header",    sep:"gradient",
    c:{ sidebar:"linear-gradient(135deg,#1E1B4B,#581C87)", sidebarText:"#E9D5FF", sidebarSub:"rgba(233,213,255,0.55)", accent:"#A855F7", accentLight:"#F5F3FF", bg:"#fff", text:"#2E1065", sub:"#6D28D9", border:"#DDD6FE" }},

  // ════ MINIMALISTE ════
  { id:"blanc",     name:"Blanc",        cat:"minimaliste", swatch:"#F9FAFB", layout:"minimal", sep:"line",
    c:{ sidebar:"#F9FAFB", sidebarText:"#111827", sidebarSub:"#6B7280", accent:"#374151", accentLight:"#F3F4F6", bg:"#fff",    text:"#111827", sub:"#6B7280", border:"#F3F4F6" }},
  { id:"craie",     name:"Craie",        cat:"minimaliste", swatch:"#E5E7EB", layout:"minimal", sep:"dots",
    c:{ sidebar:"#E5E7EB", sidebarText:"#374151", sidebarSub:"#9CA3AF", accent:"#6B7280", accentLight:"#F3F4F6", bg:"#FAFAFA", text:"#111827", sub:"#6B7280", border:"#E5E7EB" }},
  { id:"cendre",    name:"Cendre",       cat:"minimaliste", swatch:"#9CA3AF", layout:"minimal", sep:"dash",
    c:{ sidebar:"#6B7280", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.6)", accent:"#374151", accentLight:"#F3F4F6", bg:"#fff",    text:"#111827", sub:"#6B7280", border:"#D1D5DB" }},
  { id:"ardoise",   name:"Ardoise",      cat:"minimaliste", swatch:"#334155", layout:"minimal", sep:"line",
    c:{ sidebar:"#1E293B", sidebarText:"#F1F5F9", sidebarSub:"rgba(241,245,249,0.6)", accent:"#64748B", accentLight:"#F1F5F9", bg:"#F8FAFC", text:"#0F172A", sub:"#475569", border:"#CBD5E1" }},
  { id:"ivoire",    name:"Ivoire",       cat:"minimaliste", swatch:"#EDE8D8", layout:"minimal", sep:"gradient",
    c:{ sidebar:"#F5F0E8", sidebarText:"#44403C", sidebarSub:"rgba(68,64,60,0.5)",   accent:"#78716C", accentLight:"#FAFAF9", bg:"#FAF9F6", text:"#1C1917", sub:"#78716C", border:"#E7E5E4" }},
  { id:"graphite",  name:"Graphite",     cat:"minimaliste", swatch:"#27272A", layout:"minimal", sep:"double",
    c:{ sidebar:"#1C1917", sidebarText:"#E7E5E4", sidebarSub:"rgba(231,229,228,0.5)", accent:"#D6D3D1", accentLight:"#F5F5F4", bg:"#fff",    text:"#1C1917", sub:"#57534E", border:"#E7E5E4" }},
  { id:"parchemin", name:"Parchemin",    cat:"minimaliste", swatch:"#D9C49A", layout:"minimal", sep:"line",
    c:{ sidebar:"#EDE0C4", sidebarText:"#5C4A2A", sidebarSub:"rgba(92,74,42,0.5)",  accent:"#92400E", accentLight:"#FFFBEB", bg:"#FEFCE8", text:"#3B2F0E", sub:"#78716C", border:"#E7D5A8" }},
  { id:"lineaire",  name:"Linéaire",     cat:"minimaliste", swatch:"#D1D5DB", layout:"minimal", sep:"dash",
    c:{ sidebar:"#F9FAFB", sidebarText:"#6B7280", sidebarSub:"rgba(107,114,128,0.6)", accent:"#374151", accentLight:"#F3F4F6", bg:"#fff",    text:"#374151", sub:"#9CA3AF", border:"#D1D5DB" }},
  { id:"mono",      name:"Mono",         cat:"minimaliste", swatch:"#000000", layout:"minimal", sep:"line",
    c:{ sidebar:"#000",    sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)", accent:"#000",    accentLight:"#F3F4F6", bg:"#fff",    text:"#000",    sub:"#6B7280", border:"#000" }},
  { id:"zero",      name:"Zéro",         cat:"minimaliste", swatch:"#E0E7FF", layout:"minimal", sep:"dots",
    c:{ sidebar:"#fff",    sidebarText:"#9CA3AF", sidebarSub:"rgba(156,163,175,0.5)", accent:"#C7D2FE", accentLight:"#F5F3FF", bg:"#fff",    text:"#374151", sub:"#9CA3AF", border:"#E5E7EB" }},

  // ════ ÉLÉGANT ════
  { id:"versailles",name:"Versailles",   cat:"elegant", swatch:"#D4AF37", layout:"header",   sep:"diamond",
    c:{ sidebar:"#0D0D0D", sidebarText:"#D4AF37", sidebarSub:"rgba(212,175,55,0.6)",   accent:"#D4AF37", accentLight:"#FBF6E6", bg:"#fff",    text:"#1C1917", sub:"#78716C", border:"#D4AF3740" }},
  { id:"baroque",   name:"Baroque",      cat:"elegant", swatch:"#7C2D12", layout:"sidebar",  sep:"diamond",
    c:{ sidebar:"#3B0A0A", sidebarText:"#FDE8D0", sidebarSub:"rgba(253,232,208,0.55)", accent:"#C2410C", accentLight:"#FFF7ED", bg:"#FFF9F4", text:"#1C1917", sub:"#78716C", border:"#FED7AA" }},
  { id:"opera",     name:"Opéra",        cat:"elegant", swatch:"#B45309", layout:"geometric", sep:"double",
    c:{ sidebar:"#18181B", sidebarText:"#F5F5F4", sidebarSub:"rgba(245,245,244,0.55)", accent:"#D97706", accentLight:"#FFFBEB", bg:"#fff",    text:"#18181B", sub:"#52525B", border:"#FDE68A" }},
  { id:"velours",   name:"Velours",      cat:"elegant", swatch:"#4A1D96", layout:"header",   sep:"diamond",
    c:{ sidebar:"#1E0433", sidebarText:"#DDD6FE", sidebarSub:"rgba(221,214,254,0.55)", accent:"#A78BFA", accentLight:"#F5F3FF", bg:"#fff",    text:"#1E0433", sub:"#4C1D95", border:"#C4B5FD" }},
  { id:"palais",    name:"Palais",       cat:"elegant", swatch:"#CBD5E1", layout:"sidebar",  sep:"gradient",
    c:{ sidebar:"#0F172A", sidebarText:"#CBD5E1", sidebarSub:"rgba(203,213,225,0.55)", accent:"#94A3B8", accentLight:"#F1F5F9", bg:"#fff",    text:"#0F172A", sub:"#475569", border:"#94A3B8" }},
  { id:"chateau",   name:"Château",      cat:"elegant", swatch:"#881337", layout:"header",   sep:"line",
    c:{ sidebar:"#881337", sidebarText:"#FFF1F2", sidebarSub:"rgba(255,241,242,0.55)", accent:"#BE123C", accentLight:"#FFF1F2", bg:"#FFFCF8", text:"#1C1917", sub:"#44403C", border:"#FECDD3" }},
  { id:"marquise",  name:"Marquise",     cat:"elegant", swatch:"#C9748F", layout:"sidebar",  sep:"dots",
    c:{ sidebar:"#7C3049", sidebarText:"#FCE7F3", sidebarSub:"rgba(252,231,243,0.55)", accent:"#D4A0B0", accentLight:"#FDF2F8", bg:"#FFF9FA", text:"#1C1917", sub:"#78716C", border:"#FBCFE8" }},
  { id:"saphir",    name:"Saphir",       cat:"elegant", swatch:"#1E3A8A", layout:"header",   sep:"diamond",
    c:{ sidebar:"#0C1F5C", sidebarText:"#E0E7FF", sidebarSub:"rgba(224,231,255,0.55)", accent:"#6366F1", accentLight:"#EEF2FF", bg:"#fff",    text:"#0F172A", sub:"#334155", border:"#C7D2FE" }},
  { id:"emeraude",  name:"Émeraude",     cat:"elegant", swatch:"#064E3B", layout:"sidebar",  sep:"gradient",
    c:{ sidebar:"#022C22", sidebarText:"#D1FAE5", sidebarSub:"rgba(209,250,229,0.55)", accent:"#10B981", accentLight:"#ECFDF5", bg:"#F8FFFE", text:"#022C22", sub:"#065F46", border:"#A7F3D0" }},
  { id:"diamant",   name:"Diamant",      cat:"elegant", swatch:"#94A3B8", layout:"header",   sep:"double",
    c:{ sidebar:"#0A0A0A", sidebarText:"#E2E8F0", sidebarSub:"rgba(226,232,240,0.55)", accent:"#94A3B8", accentLight:"#F8FAFC", bg:"#fff",    text:"#0A0A0A", sub:"#475569", border:"#CBD5E1" }},

  // ════ TECH ════
  { id:"matrix",    name:"Matrix",       cat:"tech", swatch:"#22C55E", layout:"header",   sep:"dash",
    c:{ sidebar:"#0A1A0A", sidebarText:"#22C55E", sidebarSub:"rgba(34,197,94,0.5)",    accent:"#4ADE80", accentLight:"#052E16", bg:"#0D0D0D", text:"#86EFAC", sub:"#4ADE80", border:"#14532D" }},
  { id:"cyberpunk", name:"Cyberpunk",    cat:"tech", swatch:"#EAB308", layout:"timeline", sep:"line",
    c:{ sidebar:"#09090B", sidebarText:"#FDE047", sidebarSub:"rgba(253,224,71,0.5)",   accent:"#EAB308", accentLight:"#1C1800", bg:"#09090B", text:"#F4F4F5", sub:"#A1A1AA", border:"#3F3F46" }},
  { id:"midnight",  name:"Midnight",     cat:"tech", swatch:"#0EA5E9", layout:"header",   sep:"gradient",
    c:{ sidebar:"#020617", sidebarText:"#BAE6FD", sidebarSub:"rgba(186,230,253,0.5)",  accent:"#0EA5E9", accentLight:"#0F172A", bg:"#0F172A", text:"#E2E8F0", sub:"#94A3B8", border:"#1E3A5F" }},
  { id:"plasma",    name:"Plasma",       cat:"tech", swatch:"#D946EF", layout:"timeline", sep:"dots",
    c:{ sidebar:"#0A0011", sidebarText:"#F0ABFC", sidebarSub:"rgba(240,171,252,0.5)",  accent:"#D946EF", accentLight:"#1A0020", bg:"#0A0011", text:"#F0ABFC", sub:"#C084FC", border:"#4A044E" }},
  { id:"carbon",    name:"Carbon",       cat:"tech", swatch:"#F97316", layout:"header",   sep:"line",
    c:{ sidebar:"#09090B", sidebarText:"#E4E4E7", sidebarSub:"rgba(228,228,231,0.5)",  accent:"#F97316", accentLight:"#1C1412", bg:"#18181B", text:"#E4E4E7", sub:"#A1A1AA", border:"#3F3F46" }},
  { id:"stealth",   name:"Stealth",      cat:"tech", swatch:"#E4E4E7", layout:"header",   sep:"dash",
    c:{ sidebar:"#09090B", sidebarText:"#F4F4F5", sidebarSub:"rgba(244,244,245,0.5)",  accent:"#E4E4E7", accentLight:"#18181B", bg:"#09090B", text:"#E4E4E7", sub:"#71717A", border:"#27272A" }},
  { id:"hacker",    name:"Hacker",       cat:"tech", swatch:"#4ADE80", layout:"sidebar",  sep:"dash",
    c:{ sidebar:"#052E16", sidebarText:"#BBF7D0", sidebarSub:"rgba(187,247,208,0.5)",  accent:"#4ADE80", accentLight:"#052E16", bg:"#0A0A0A", text:"#86EFAC", sub:"#4ADE80", border:"#14532D" }},
  { id:"quantum",   name:"Quantum",      cat:"tech", swatch:"#8B5CF6", layout:"header",   sep:"gradient",
    c:{ sidebar:"#020420", sidebarText:"#C4B5FD", sidebarSub:"rgba(196,181,253,0.5)",  accent:"#8B5CF6", accentLight:"#0D0026", bg:"#0B0020", text:"#C4B5FD", sub:"#7C3AED", border:"#2E1065" }},
  { id:"binary",    name:"Binary",       cat:"tech", swatch:"#71717A", layout:"timeline", sep:"double",
    c:{ sidebar:"#000",    sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.5)",   accent:"#71717A", accentLight:"#111",    bg:"#000",    text:"#fff",    sub:"#9CA3AF", border:"#374151" }},
  { id:"circuit",   name:"Circuit",      cat:"tech", swatch:"#38BDF8", layout:"header",   sep:"dots",
    c:{ sidebar:"#03070C", sidebarText:"#7DD3FC", sidebarSub:"rgba(125,211,252,0.5)",  accent:"#38BDF8", accentLight:"#082032", bg:"#040F1A", text:"#BAE6FD", sub:"#7DD3FC", border:"#0C4A6E" }},

  // ════ NATURE ════
  { id:"foret",     name:"Forêt",        cat:"nature", swatch:"#166534", layout:"sidebar",  sep:"gradient",
    c:{ sidebar:"#14532D", sidebarText:"#D1FAE5", sidebarSub:"rgba(209,250,229,0.55)", accent:"#16A34A", accentLight:"#F0FDF4", bg:"#FAFFF8", text:"#14532D", sub:"#166534", border:"#BBF7D0" }},
  { id:"prairie",   name:"Prairie",      cat:"nature", swatch:"#86EFAC", layout:"strip",    sep:"line",
    c:{ sidebar:"#4ADE80", sidebarText:"#14532D", sidebarSub:"rgba(20,83,45,0.55)",    accent:"#22C55E", accentLight:"#DCFCE7", bg:"#F0FDF4", text:"#14532D", sub:"#166534", border:"#BBF7D0" }},
  { id:"bambou",    name:"Bambou",       cat:"nature", swatch:"#A3B899", layout:"sidebar",  sep:"line",
    c:{ sidebar:"#D9E8D5", sidebarText:"#1A3A1A", sidebarSub:"rgba(26,58,26,0.55)",   accent:"#5B8C5A", accentLight:"#EDF4EC", bg:"#F8FBF7", text:"#1A3A1A", sub:"#4A6A4A", border:"#C0D9BC" }},
  { id:"terra",     name:"Terra",        cat:"nature", swatch:"#92400E", layout:"header",   sep:"dots",
    c:{ sidebar:"#78350F", sidebarText:"#FEF3C7", sidebarSub:"rgba(254,243,199,0.55)", accent:"#B45309", accentLight:"#FFFBEB", bg:"#FEFCE8", text:"#1C1917", sub:"#78716C", border:"#FDE68A" }},
  { id:"ocean",     name:"Océan",        cat:"nature", swatch:"#0369A1", layout:"sidebar",  sep:"dots",
    c:{ sidebar:"#0C4A6E", sidebarText:"#BAE6FD", sidebarSub:"rgba(186,230,253,0.55)", accent:"#0369A1", accentLight:"#F0F9FF", bg:"#F8FBFF", text:"#0C2B42", sub:"#075985", border:"#BAE6FD" }},
  { id:"aurore",    name:"Aurore",       cat:"nature", swatch:"#F59E0B", layout:"strip",    sep:"gradient",
    c:{ sidebar:"#F59E0B", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#F97316", accentLight:"#FFF7ED", bg:"#FFFAF0", text:"#431407", sub:"#92400E", border:"#FED7AA" }},
  { id:"lavande",   name:"Lavande",      cat:"nature", swatch:"#8B5CF6", layout:"sidebar",  sep:"dots",
    c:{ sidebar:"#EDE9FE", sidebarText:"#4C1D95", sidebarSub:"rgba(76,29,149,0.55)",  accent:"#7C3AED", accentLight:"#F5F3FF", bg:"#FAFAF9", text:"#2E1065", sub:"#6D28D9", border:"#DDD6FE" }},
  { id:"mousse",    name:"Mousse",       cat:"nature", swatch:"#4D7C5F", layout:"sidebar",  sep:"gradient",
    c:{ sidebar:"#2D4A38", sidebarText:"#C8DFC8", sidebarSub:"rgba(200,223,200,0.55)", accent:"#4D7C5F", accentLight:"#EBF5EB", bg:"#F5FAF5", text:"#1A3028", sub:"#4A6A50", border:"#A8C9A8" }},
  { id:"sahara",    name:"Sahara",       cat:"nature", swatch:"#D4A96A", layout:"strip",    sep:"line",
    c:{ sidebar:"#D4A96A", sidebarText:"#fff",    sidebarSub:"rgba(255,255,255,0.55)", accent:"#B07D3C", accentLight:"#FDF8F0", bg:"#FDF8F0", text:"#3B2A10", sub:"#78610C", border:"#E8C98A" }},
  { id:"alpine",    name:"Alpine",       cat:"nature", swatch:"#64748B", layout:"header",   sep:"line",
    c:{ sidebar:"#334155", sidebarText:"#E2E8F0", sidebarSub:"rgba(226,232,240,0.55)", accent:"#64748B", accentLight:"#F1F5F9", bg:"#F8FAFC", text:"#0F172A", sub:"#475569", border:"#CBD5E1" }},
];

export const CATEGORIES: { key: Cat; label: string; count: number }[] = [
  { key:"moderne",     label:"Moderne",     count:10 },
  { key:"corporate",   label:"Corporate",   count:10 },
  { key:"creatif",     label:"Créatif",     count:10 },
  { key:"minimaliste", label:"Minimaliste", count:10 },
  { key:"elegant",     label:"Élégant",     count:10 },
  { key:"tech",        label:"Tech",        count:10 },
  { key:"nature",      label:"Nature",      count:10 },
];

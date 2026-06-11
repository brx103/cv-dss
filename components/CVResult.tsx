"use client";

import { useRef, useState, useCallback } from "react";
import { CVData } from "@/types/cv";
import { THEMES, CATEGORIES, Theme, Layout, Sep, Cat, TC } from "@/lib/themes";

/* ─── Date utils ─────────────────────────────────────────────────────────── */

function formatDate(v: string): string {
  if (!v) return "";
  const [y, m] = v.split("-");
  if (!y || !m) return v;
  return new Date(+y, +m - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}
function formatPeriod(d: string, f: string): string {
  const a = formatDate(d), b = f ? formatDate(f) : "En cours";
  return a ? `${a} — ${b}` : b;
}
function formatBirth(v: string): string {
  if (!v) return "";
  const [y, m, d] = v.split("-");
  if (!y || !m || !d) return v;
  return new Date(+y, +m - 1, +d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

interface InfoItem { icon: React.ReactNode; text: string }
function extras(cv: CVData): InfoItem[] {
  const r: InfoItem[] = [];
  if (cv.dateNaissance) r.push({ icon: <ICalendar />, text: `Né(e) le ${formatBirth(cv.dateNaissance)}` });
  if (cv.nationalite) r.push({ icon: <IFlag />, text: cv.nationalite });
  if (cv.situationFamiliale) r.push({ icon: <IHeart />, text: cv.situationFamiliale });
  if ((cv.permis ?? []).length > 0) r.push({ icon: <ICar />, text: `Permis ${cv.permis!.join(", ")}` });
  if (cv.disponibilite) r.push({ icon: <IClock />, text: `Dispo. : ${cv.disponibilite}` });
  if (cv.mobilite) r.push({ icon: <IMap />, text: `Mobilité : ${cv.mobilite}` });
  if (cv.linkedin) r.push({ icon: <ILinkedin />, text: cv.linkedin.replace(/^https?:\/\//i, "") });
  if (cv.portfolio) r.push({ icon: <ILink />, text: cv.portfolio.replace(/^https?:\/\//i, "") });
  return r;
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */

const IEmail = ({ c }: { c?: string }) => (
  <svg className={`w-3 h-3 ${c ?? ""}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const IPhone = ({ c }: { c?: string }) => (
  <svg className={`w-3 h-3 ${c ?? ""}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const ILocation = ({ c }: { c?: string }) => (
  <svg className={`w-3 h-3 ${c ?? ""}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const IUser = ({ c }: { c?: string }) => (
  <svg className="w-10 h-10" style={{ fill: c ?? "rgba(255,255,255,0.2)" }} viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);
const ICalendar = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const IFlag = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2z" /></svg>);
const IHeart = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>);
const ICar = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>);
const IClock = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const IMap = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>);
const ILinkedin = () => (<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
const ILink = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>);

/* ─── PhotoButton ─────────────────────────────────────────────────────────── */

function PhotoButton({ photo, onClick, size, border }: {
  photo: string | null; onClick: () => void; size: string; border: string; placeholder?: string;
}) {
  if (!photo) return null;
  return (
    <button type="button" onClick={onClick} className="relative group focus:outline-none flex-shrink-0 rounded-full">
      <div className={`${size} rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105`} style={{ border }}>
        <img src={photo} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
        <span className="text-[9px] font-bold tracking-widest" style={{ color: "#ffffff" }}>PHOTO</span>
      </div>
    </button>
  );
}

/* ─── Separator Component ─────────────────────────────────────────────────── */

function SepLine({ type, color }: { type: Sep; color: string }) {
  if (type === "line")     return <div className="h-px w-full" style={{ background: color }} />;
  if (type === "dots")     return <div className="flex gap-1.5 items-center py-0.5">{[...Array(6)].map((_,i)=><span key={i} className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />)}</div>;
  if (type === "dash")     return <div className="w-full h-0 border-t border-dashed" style={{ borderColor: color }} />;
  if (type === "double")   return <div className="space-y-[3px]"><div className="h-px" style={{ background: color }} /><div className="h-px opacity-30" style={{ background: color }} /></div>;
  if (type === "gradient") return <div className="h-px" style={{ background: `linear-gradient(to right,${color} 0%,transparent 100%)` }} />;
  if (type === "diamond")  return <div className="flex items-center gap-2"><div className="flex-1 h-px opacity-40" style={{ background: color }} /><div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: color }} /><div className="flex-1 h-px opacity-40" style={{ background: color }} /></div>;
  return null;
}

/* ─── Layout labels ──────────────────────────────────────────────────────── */

const LANG = {
  fr: {
    addPhoto:    "Ajouter une photo",
    contact:     "Contact",
    profil:      "Profil",
    profilPro:   "Profil professionnel",
    experiences: "Expériences professionnelles",
    expShort:    "Expériences",
    formation:   "Formation",
    competences: "Compétences",
    skills:      "Compétences",
    infos:       "Infos",
    cv:          "Curriculum Vitae",
  },
  en: {
    addPhoto:    "Add a photo",
    contact:     "Contact",
    profil:      "Profile",
    profilPro:   "Professional Profile",
    experiences: "Professional Experience",
    expShort:    "Experience",
    formation:   "Education",
    competences: "Skills",
    skills:      "Skills",
    infos:       "Info",
    cv:          "Curriculum Vitae",
  },
} as const;
type Lang = "fr" | "en";

/* ─── Layout Props ────────────────────────────────────────────────────────── */

interface LP { cv: CVData; photo: string | null; onPhotoClick: () => void; theme: Theme; lang: Lang }

/* ─── Layout: Sidebar ─────────────────────────────────────────────────────── */

function LayoutSidebar({ cv, photo, onPhotoClick, theme, lang }: LP) {
  const { c, sep } = theme;
  const l = LANG[lang];
  return (
    <div className="flex flex-col sm:flex-row print:flex-row rounded-2xl overflow-hidden shadow-2xl" style={{ border:`1px solid ${c.border}` }}>
      <div className="w-full sm:w-56 print:w-56 flex-shrink-0 flex flex-col p-5 sm:p-7 gap-5 sm:gap-6" style={{ background: c.sidebar }}>
        <div className="flex flex-col items-center gap-2 pt-1">
          <PhotoButton photo={photo} onClick={onPhotoClick} size="w-24 h-24" border={`3px solid ${c.accent}50`} />
        </div>
        <SepLine type={sep} color={`${c.sidebarText}20`} />
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: c.sidebarSub }}>{l.contact}</p>
          <div className="space-y-2.5">
            {cv.email && <div className="flex items-start gap-2"><span style={{ color:c.accent }} className="flex-shrink-0 mt-0.5"><IEmail /></span><span className="text-[11px] break-all leading-snug" style={{ color:c.sidebarText }}>{cv.email}</span></div>}
            {cv.telephone && <div className="flex items-start gap-2"><span style={{ color:c.accent }} className="flex-shrink-0 mt-0.5"><IPhone /></span><span className="text-[11px]" style={{ color:c.sidebarText }}>{cv.telephone}</span></div>}
            {cv.ville && <div className="flex items-start gap-2"><span style={{ color:c.accent }} className="flex-shrink-0 mt-0.5"><ILocation /></span><span className="text-[11px]" style={{ color:c.sidebarText }}>{cv.ville}</span></div>}
            {extras(cv).map((item,i)=>(
              <div key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5" style={{ color:c.accent }}>{item.icon}</span>
                <span className="text-[11px] break-all leading-snug" style={{ color:c.sidebarText }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        {(cv.competences??[]).length>0 && (
          <div>
            <SepLine type={sep} color={`${c.sidebarText}20`} />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] mt-4 mb-3" style={{ color:c.sidebarSub }}>{l.competences}</p>
            <div className="space-y-2">
              {cv.competences.map(s=>(
                <div key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:c.accent }} />
                  <span className="text-[11px]" style={{ color:c.sidebarText }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 px-5 py-5 sm:px-9 sm:py-8 flex flex-col gap-5" style={{ background:c.bg }}>
        <div className="pb-4">
          <h2 className="text-[1.5rem] sm:text-[2rem] print:text-[2rem] font-black leading-tight" style={{ color:c.text }}>
            {cv.prenom} <span className="font-light" style={{ color:c.accent }}>{cv.nom}</span>
          </h2>
          {cv.titre && <p className="text-sm font-semibold mt-1 tracking-wide" style={{ color:c.accent }}>{cv.titre}</p>}
          <div className="mt-3"><SepLine type={sep} color={c.border} /></div>
        </div>
        {cv.resume && (
          <section>
            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] mb-2" style={{ color:c.accent }}>{l.profil}</h4>
            <p className="text-[12.5px] leading-relaxed" style={{ color:c.sub }}>{cv.resume}</p>
            <div className="mt-3"><SepLine type={sep} color={c.border} /></div>
          </section>
        )}
        {cv.experiences.length>0 && (
          <section>
            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] mb-3" style={{ color:c.accent }}>{l.experiences}</h4>
            <div className="space-y-4">
              {cv.experiences.map(exp=>(
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="text-[13px] font-bold" style={{ color:c.text }}>{exp.poste}</span>
                    <span className="text-[10px]" style={{ color:c.sub }}>{formatPeriod(exp.dateDebut,exp.dateFin)}</span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wide mt-0.5" style={{ color:c.accent }}>{exp.entreprise}</p>
                  {exp.description && <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color:c.sub }}>{exp.description}</p>}
                </div>
              ))}
            </div>
            <div className="mt-3"><SepLine type={sep} color={c.border} /></div>
          </section>
        )}
        {cv.formations.length>0 && (
          <section>
            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] mb-3" style={{ color:c.accent }}>{l.formation}</h4>
            <div className="space-y-3">
              {cv.formations.map(f=>(
                <div key={f.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="text-[13px] font-bold" style={{ color:c.text }}>{f.diplome}</span>
                    {f.annee && <span className="text-[10px]" style={{ color:c.sub }}>{f.annee}</span>}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wide mt-0.5" style={{ color:c.accent }}>{f.etablissement}</p>
                  {f.description && <p className="text-[12px]" style={{ color:c.sub }}>{f.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ─── Layout: Header ─────────────────────────────────────────────────────── */

function LayoutHeader({ cv, photo, onPhotoClick, theme, lang }: LP) {
  const { c, sep } = theme;
  const l = LANG[lang];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border:`1px solid ${c.border}` }}>
      <div className="px-5 py-5 sm:px-10 sm:py-8 flex flex-wrap items-center gap-5 sm:gap-8" style={{ background:c.sidebar }}>
        <div className="relative flex-shrink-0">
          <div className="absolute rounded-full pointer-events-none" style={{ inset:"-4px", border:`2px solid ${c.accent}`, opacity:0.4 }} />
          <PhotoButton photo={photo} onClick={onPhotoClick} size="w-28 h-28" border={`2.5px solid ${c.accent}`} placeholder="rgba(255,255,255,0.2)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[1.6rem] sm:text-[2.4rem] print:text-[2.4rem] font-black leading-none tracking-tight" style={{ color:c.sidebarText }}>
            {cv.prenom} <span className="font-thin" style={{ color:c.accent }}>{cv.nom.toUpperCase()}</span>
          </h2>
          {cv.titre && <p className="text-sm italic mt-2 font-medium" style={{ color:c.accent }}>{cv.titre}</p>}
          <div className="mt-3 h-px w-20" style={{ background:`${c.accent}50` }} />
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
            {cv.email && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}><IEmail />{cv.email}</span>}
            {cv.telephone && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}><IPhone />{cv.telephone}</span>}
            {cv.ville && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}><ILocation />{cv.ville}</span>}
            {extras(cv).map((item,i)=>(
              <span key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}>
                <span style={{ color:`${c.accent}99` }}>{item.icon}</span>{item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row print:flex-row" style={{ background:c.bg }}>
        <div className="w-full sm:w-60 print:w-60 flex-shrink-0 px-5 py-5 sm:px-7 sm:py-7 flex flex-col gap-5 sm:gap-7" style={{ borderRight:`1px solid ${c.border}` }}>
          {(cv.competences??[]).length>0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-[2px]" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.competences}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cv.competences.map(s=>(
                  <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded" style={{ background:c.accentLight, color:c.accent, border:`1px solid ${c.border}` }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {cv.formations.length>0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-[2px]" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.formation}</h4>
              </div>
              <div className="space-y-4">
                {cv.formations.map(f=>(
                  <div key={f.id} className="border-l-[2px] pl-3" style={{ borderColor:`${c.accent}50` }}>
                    <p className="text-[12px] font-bold" style={{ color:c.text }}>{f.diplome}</p>
                    <p className="text-[11px] font-semibold" style={{ color:c.accent }}>{f.etablissement}</p>
                    {f.annee && <p className="text-[10px]" style={{ color:c.sub }}>{f.annee}</p>}
                    {f.description && <p className="text-[10px]" style={{ color:c.sub }}>{f.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 px-5 py-5 sm:px-8 sm:py-7 flex flex-col gap-5 sm:gap-6">
          {cv.resume && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-[2px]" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.profilPro}</h4>
              </div>
              <p className="text-[12.5px] leading-relaxed italic" style={{ color:c.sub }}>{cv.resume}</p>
              <div className="mt-4"><SepLine type={sep} color={c.border} /></div>
            </section>
          )}
          {cv.experiences.length>0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3.5 h-[2px]" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.experiences}</h4>
              </div>
              <div className="space-y-5">
                {cv.experiences.map(exp=>(
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-28 flex-shrink-0 text-right pt-0.5">
                      <p className="text-[10px] leading-snug" style={{ color:c.sub }}>{formatPeriod(exp.dateDebut,exp.dateFin)}</p>
                    </div>
                    <div className="flex flex-col items-center flex-shrink-0 pt-1">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:c.accent }} />
                      <span className="w-px flex-1 mt-1" style={{ background:c.border }} />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-[13px] font-bold" style={{ color:c.text }}>{exp.poste}</p>
                      <p className="text-[11px] font-bold uppercase tracking-wide mt-0.5" style={{ color:c.accent }}>{exp.entreprise}</p>
                      {exp.description && <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color:c.sub }}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Layout: Geometric ──────────────────────────────────────────────────── */

function LayoutGeometric({ cv, photo, onPhotoClick, theme, lang }: LP) {
  const { c, sep } = theme;
  const l = LANG[lang];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border:`1px solid ${c.border}`, background:c.bg }}>
      <div className="relative overflow-hidden px-5 sm:px-10 pt-5 sm:pt-8 pb-4 sm:pb-5" style={{ background:c.sidebar }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background:`${c.accent}15` }} />
        <div className="absolute top-6 right-20 w-32 h-32 rounded-full pointer-events-none" style={{ background:`${c.accent}10` }} />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none" style={{ background:`${c.accent}10` }} />
        <div className="relative flex items-end justify-between gap-6 z-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-2" style={{ color:c.accent }}>{l.cv}</p>
            <h2 className="text-[2rem] sm:text-[3.2rem] print:text-[3.2rem] font-black leading-none tracking-tight" style={{ color:c.sidebarText }}>{cv.prenom}</h2>
            <h2 className="text-[2rem] sm:text-[3.2rem] print:text-[3.2rem] font-thin leading-none tracking-widest -mt-1" style={{ color:c.accent }}>{cv.nom.toUpperCase()}</h2>
            {cv.titre && <p className="text-sm italic font-medium mt-2" style={{ color:`${c.sidebarText}80` }}>{cv.titre}</p>}
            <div className="mt-3 h-[3px] w-10 rounded-full" style={{ background:c.accent }} />
          </div>
          <div className="relative flex-shrink-0 mb-2">
            <div className="absolute rounded-full pointer-events-none" style={{ inset:"-10px", border:`1.5px dashed ${c.accent}`, opacity:0.3 }} />
            <div className="absolute rounded-full pointer-events-none" style={{ inset:"-4px", background:`${c.accent}20` }} />
            <PhotoButton photo={photo} onClick={onPhotoClick} size="w-28 h-28" border={`3px solid ${c.accent}`} placeholder="rgba(255,255,255,0.2)" />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 relative z-10">
          {cv.email && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:`${c.sidebarText}70` }}><span style={{ color:c.accent }}><IEmail /></span>{cv.email}</span>}
          {cv.telephone && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:`${c.sidebarText}70` }}><IPhone />{cv.telephone}</span>}
          {cv.ville && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:`${c.sidebarText}70` }}><ILocation />{cv.ville}</span>}
          {extras(cv).map((item,i)=>(
            <span key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color:`${c.sidebarText}70` }}>
              <span style={{ color:c.accent }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row print:flex-row" style={{ borderTop:`1px solid ${c.border}` }}>
        <div className="w-full sm:w-56 print:w-56 flex-shrink-0 px-5 py-5 sm:px-7 sm:py-7 flex flex-col gap-5 sm:gap-6" style={{ borderRight:`1px solid ${c.border}` }}>
          {(cv.competences??[]).length>0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-[2px] rounded-full" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.accent }}>{l.competences}</h4>
              </div>
              <div className="flex flex-col gap-1.5">
                {cv.competences.map(s=>(
                  <span key={s} className="text-[11px] font-medium px-2.5 py-1 rounded-md" style={{ background:c.accentLight, color:c.accent }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {cv.formations.length>0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-[2px] rounded-full" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.accent }}>{l.formation}</h4>
              </div>
              <div className="space-y-4">
                {cv.formations.map(f=>(
                  <div key={f.id}>
                    {f.annee && <p className="text-[10px] font-black mb-0.5" style={{ color:c.accent }}>{f.annee}</p>}
                    <p className="text-[12px] font-bold" style={{ color:c.text }}>{f.diplome}</p>
                    <p className="text-[11px]" style={{ color:c.sub }}>{f.etablissement}</p>
                    {f.description && <p className="text-[10px] mt-0.5" style={{ color:c.sub }}>{f.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 px-5 py-5 sm:px-8 sm:py-7 flex flex-col gap-5 sm:gap-6">
          {cv.resume && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-[2px] rounded-full" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.accent }}>{l.profil}</h4>
              </div>
              <p className="text-[12.5px] leading-relaxed border-l-[2px] pl-3.5" style={{ color:c.sub, borderColor:`${c.accent}40` }}>{cv.resume}</p>
            </section>
          )}
          {cv.experiences.length>0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-[2px] rounded-full" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.accent }}>{l.expShort}</h4>
              </div>
              <div className="space-y-5">
                {cv.experiences.map((exp,i)=>(
                  <div key={exp.id} className="relative pl-4">
                    <span className="absolute left-0 top-[7px] w-2 h-2 rounded-full" style={{ background:c.accent }} />
                    {i<cv.experiences.length-1 && <span className="absolute left-[3px] top-4 w-px bottom-[-20px] opacity-20" style={{ background:c.accent }} />}
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5">
                      <span className="text-[13px] font-bold" style={{ color:c.text }}>{exp.poste}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background:c.accentLight, color:c.accent }}>{formatPeriod(exp.dateDebut,exp.dateFin)}</span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color:c.accent }}>{exp.entreprise}</p>
                    {exp.description && <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color:c.sub }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Layout: Minimal ────────────────────────────────────────────────────── */

function LayoutMinimal({ cv, photo, onPhotoClick, theme, lang }: LP) {
  const { c, sep } = theme;
  const l = LANG[lang];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border:`1px solid ${c.border}`, background:c.bg }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-12 py-6 sm:py-10">
        <div className="flex items-start justify-between gap-6 mb-7">
          <div>
            <h2 className="text-[1.7rem] sm:text-[2.6rem] print:text-[2.6rem] font-thin leading-none tracking-widest" style={{ color:c.text }}>{cv.prenom.toUpperCase()}</h2>
            <h2 className="text-[1.7rem] sm:text-[2.6rem] print:text-[2.6rem] font-black leading-none tracking-tight -mt-1" style={{ color:c.text }}>{cv.nom.toUpperCase()}</h2>
            {cv.titre && <p className="text-xs italic mt-3 tracking-wider" style={{ color:c.sub }}>{cv.titre}</p>}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
              {cv.email && <span className="text-[11px]" style={{ color:c.sub }}>{cv.email}</span>}
              {cv.telephone && <span className="text-[11px]" style={{ color:c.sub }}>{cv.telephone}</span>}
              {cv.ville && <span className="text-[11px]" style={{ color:c.sub }}>{cv.ville}</span>}
              {extras(cv).map((item,i)=>(
                <span key={i} className="flex items-center gap-1 text-[11px]" style={{ color:c.sub }}>
                  <span style={{ color:`${c.sub}80` }}>{item.icon}</span>{item.text}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex-shrink-0 mt-1">
            <div className="absolute inset-0 rounded-full translate-x-1 translate-y-1" style={{ background:c.border }} />
            <PhotoButton photo={photo} onClick={onPhotoClick} size="w-20 h-20" border={`1.5px solid ${c.border}`} placeholder="text-gray-300" />
          </div>
        </div>
        <div className="mb-6"><SepLine type={sep} color={c.border} /></div>
        {cv.resume && (
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.sub }}>{l.profil}</span>
              <div className="flex-1 h-px" style={{ background:c.border }} />
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color:c.sub }}>{cv.resume}</p>
          </section>
        )}
        {cv.experiences.length>0 && (
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.sub }}>{l.expShort}</span>
              <div className="flex-1 h-px" style={{ background:c.border }} />
            </div>
            <div className="space-y-5">
              {cv.experiences.map(exp=>(
                <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] print:grid-cols-[7rem_1fr] gap-3 sm:gap-4">
                  <div className="text-right pt-0.5">
                    <p className="text-[10px] leading-snug" style={{ color:c.sub }}>{formatPeriod(exp.dateDebut,exp.dateFin)}</p>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold" style={{ color:c.text }}>{exp.poste}</p>
                    <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color:c.accent }}>{exp.entreprise}</p>
                    {exp.description && <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color:c.sub }}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {cv.formations.length>0 && (
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.sub }}>{l.formation}</span>
              <div className="flex-1 h-px" style={{ background:c.border }} />
            </div>
            <div className="space-y-4">
              {cv.formations.map(f=>(
                <div key={f.id} className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] print:grid-cols-[7rem_1fr] gap-3 sm:gap-4">
                  <div className="text-right pt-0.5">
                    {f.annee && <p className="text-[10px]" style={{ color:c.sub }}>{f.annee}</p>}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold" style={{ color:c.text }}>{f.diplome}</p>
                    <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color:c.accent }}>{f.etablissement}</p>
                    {f.description && <p className="text-[11px] mt-0.5" style={{ color:c.sub }}>{f.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {(cv.competences??[]).length>0 && (
          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.sub }}>{l.competences}</span>
              <div className="flex-1 h-px" style={{ background:c.border }} />
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color:c.sub }}>{cv.competences.join("  ·  ")}</p>
          </section>
        )}
      </div>
    </div>
  );
}

/* ─── Layout: Strip ──────────────────────────────────────────────────────── */

function LayoutStrip({ cv, photo, onPhotoClick, theme, lang }: LP) {
  const { c, sep } = theme;
  const l = LANG[lang];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border:`1px solid ${c.border}`, background:c.bg }}>
      <div className="h-2" style={{ background:c.sidebar }} />
      <div className="px-5 sm:px-10 pt-5 sm:pt-7 pb-4 sm:pb-5" style={{ background:c.bg }}>
        <div className="flex items-center justify-between gap-6 mb-3">
          <div className="flex-1">
            <h2 className="text-[1.6rem] sm:text-[2.4rem] print:text-[2.4rem] font-black leading-none" style={{ color:c.text }}>
              {cv.prenom} <span className="font-light" style={{ color:c.accent }}>{cv.nom}</span>
            </h2>
            {cv.titre && <p className="text-sm font-semibold mt-1.5 tracking-wide" style={{ color:c.accent }}>{cv.titre}</p>}
          </div>
          <PhotoButton photo={photo} onClick={onPhotoClick} size="w-20 h-20" border={`3px solid ${c.accent}50`} placeholder="text-gray-300" />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
          {cv.email && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sub }}><span style={{ color:c.accent }}><IEmail /></span>{cv.email}</span>}
          {cv.telephone && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sub }}><IPhone />{cv.telephone}</span>}
          {cv.ville && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sub }}><ILocation />{cv.ville}</span>}
          {extras(cv).map((item,i)=>(
            <span key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sub }}>
              <span style={{ color:c.accent }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
        <div className="mt-4"><SepLine type={sep} color={c.border} /></div>
      </div>
      <div className="px-5 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row print:flex-row gap-5 sm:gap-8">
        <div className="flex-1 flex flex-col gap-5">
          {cv.resume && (
            <section>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-4 rounded-sm flex-shrink-0" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.profil}</h4>
              </div>
              <p className="text-[12.5px] leading-relaxed" style={{ color:c.sub }}>{cv.resume}</p>
            </section>
          )}
          {cv.experiences.length>0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 rounded-sm flex-shrink-0" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.expShort}</h4>
              </div>
              <div className="space-y-4">
                {cv.experiences.map(exp=>(
                  <div key={exp.id}>
                    <div className="flex flex-wrap justify-between gap-1">
                      <span className="text-[13px] font-bold" style={{ color:c.text }}>{exp.poste}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:c.accentLight, color:c.accent }}>{formatPeriod(exp.dateDebut,exp.dateFin)}</span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wide mt-0.5" style={{ color:c.accent }}>{exp.entreprise}</p>
                    {exp.description && <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color:c.sub }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          {cv.formations.length>0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 rounded-sm flex-shrink-0" style={{ background:c.accent }} />
                <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.formation}</h4>
              </div>
              <div className="space-y-3">
                {cv.formations.map(f=>(
                  <div key={f.id}>
                    <div className="flex flex-wrap justify-between gap-1">
                      <span className="text-[13px] font-bold" style={{ color:c.text }}>{f.diplome}</span>
                      {f.annee && <span className="text-[10px]" style={{ color:c.sub }}>{f.annee}</span>}
                    </div>
                    <p className="text-[11px] font-bold mt-0.5" style={{ color:c.accent }}>{f.etablissement}</p>
                    {f.description && <p className="text-[12px]" style={{ color:c.sub }}>{f.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        {(cv.competences??[]).length>0 && (
          <div className="w-full sm:w-44 print:w-44 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-4 rounded-sm flex-shrink-0" style={{ background:c.accent }} />
              <h4 className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:c.text }}>{l.competences}</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cv.competences.map(s=>(
                <span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background:c.accentLight, color:c.accent }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Layout: Timeline ───────────────────────────────────────────────────── */

function LayoutTimeline({ cv, photo, onPhotoClick, theme, lang }: LP) {
  const { c, sep } = theme;
  const l = LANG[lang];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border:`1px solid ${c.border}` }}>
      <div className="px-5 sm:px-10 py-5 sm:py-7 flex flex-wrap items-center gap-5 sm:gap-7" style={{ background:c.sidebar }}>
        <PhotoButton photo={photo} onClick={onPhotoClick} size="w-24 h-24" border={`2px solid ${c.accent}`} placeholder="rgba(255,255,255,0.2)" />
        <div className="flex-1">
          <h2 className="text-[1.5rem] sm:text-[2.2rem] print:text-[2.2rem] font-black leading-none" style={{ color:c.sidebarText }}>
            {cv.prenom} <span className="font-thin" style={{ color:c.accent }}>{cv.nom}</span>
          </h2>
          {cv.titre && <p className="text-sm mt-1.5 font-medium" style={{ color:`${c.accent}cc` }}>{cv.titre}</p>}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {cv.email && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}><IEmail />{cv.email}</span>}
            {cv.telephone && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}><IPhone />{cv.telephone}</span>}
            {cv.ville && <span className="flex items-center gap-1.5 text-[11px]" style={{ color:c.sidebarSub }}><ILocation />{cv.ville}</span>}
          </div>
        </div>
        {(cv.competences??[]).length>0 && (
          <div className="flex-shrink-0 max-w-[160px]">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color:c.sidebarSub }}>{l.skills}</p>
            <div className="flex flex-wrap gap-1.5">
              {cv.competences.slice(0,8).map(s=>(
                <span key={s} className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background:`${c.accent}30`, color:c.sidebarText }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-8 flex flex-col sm:flex-row print:flex-row gap-5 sm:gap-8" style={{ background:c.bg }}>
        <div className="flex-1 flex flex-col gap-6">
          {cv.resume && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.accent }}>{l.profil}</span>
                <div className="flex-1 h-px" style={{ background:c.border }} />
              </div>
              <p className="text-[12.5px] leading-relaxed border-l-2 pl-3" style={{ color:c.sub, borderColor:c.accent }}>{cv.resume}</p>
            </section>
          )}
          {cv.experiences.length>0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.accent }}>{l.expShort}</span>
                <div className="flex-1 h-px" style={{ background:c.border }} />
              </div>
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-0 bottom-0 w-px" style={{ background:`${c.accent}40` }} />
                <div className="space-y-6">
                  {cv.experiences.map(exp=>(
                    <div key={exp.id} className="relative">
                      <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ background:c.bg, borderColor:c.accent }} />
                      <div className="flex flex-wrap justify-between gap-1 mb-0.5">
                        <span className="text-[13px] font-bold" style={{ color:c.text }}>{exp.poste}</span>
                        <span className="text-[10px] font-mono" style={{ color:c.accent }}>{formatPeriod(exp.dateDebut,exp.dateFin)}</span>
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color:c.accent }}>{exp.entreprise}</p>
                      {exp.description && <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color:c.sub }}>{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
        {cv.formations.length>0 && (
          <div className="w-full sm:w-52 print:w-52 flex-shrink-0 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.accent }}>{l.formation}</span>
              <div className="flex-1 h-px" style={{ background:c.border }} />
            </div>
            {cv.formations.map(f=>(
              <div key={f.id} className="pl-3 border-l-2" style={{ borderColor:c.accent }}>
                <p className="text-[12px] font-bold" style={{ color:c.text }}>{f.diplome}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color:c.accent }}>{f.etablissement}</p>
                {f.annee && <p className="text-[10px] mt-0.5" style={{ color:c.sub }}>{f.annee}</p>}
                {f.description && <p className="text-[10px]" style={{ color:c.sub }}>{f.description}</p>}
              </div>
            ))}
            {extras(cv).length>0 && (
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color:c.accent }}>{l.infos}</span>
                  <div className="flex-1 h-px" style={{ background:c.border }} />
                </div>
                {extras(cv).map((item,i)=>(
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="flex-shrink-0 mt-0.5" style={{ color:c.accent }}>{item.icon}</span>
                    <span className="text-[11px]" style={{ color:c.sub }}>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── HTML entity cleaner ────────────────────────────────────────────────── */

function cleanText(s: string): string {
  return s
    .replace(/&#39;/g,  "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g,  "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&nbsp;/g, " ");
}

function cleanCV(cv: CVData): CVData {
  const c = (s: string) => cleanText(s);
  const co = (s?: string) => s !== undefined ? cleanText(s) : s;
  return {
    ...cv,
    nom:               c(cv.nom),
    prenom:            c(cv.prenom),
    email:             c(cv.email),
    telephone:         c(cv.telephone),
    ville:             c(cv.ville),
    titre:             c(cv.titre),
    resume:            c(cv.resume),
    nationalite:       co(cv.nationalite),
    situationFamiliale:co(cv.situationFamiliale),
    linkedin:          co(cv.linkedin),
    portfolio:         co(cv.portfolio),
    disponibilite:     co(cv.disponibilite),
    mobilite:          co(cv.mobilite),
    competences: cv.competences.map(cleanText),
    experiences: cv.experiences.map(e => ({
      ...e,
      poste:       c(e.poste),
      entreprise:  c(e.entreprise),
      description: c(e.description),
    })),
    formations: cv.formations.map(f => ({
      ...f,
      diplome:       c(f.diplome),
      etablissement: c(f.etablissement),
      description:   c(f.description),
    })),
  };
}

/* ─── Layout Map ─────────────────────────────────────────────────────────── */

const LAYOUT_MAP: Record<Layout, React.FC<LP>> = {
  sidebar:   LayoutSidebar,
  header:    LayoutHeader,
  geometric: LayoutGeometric,
  minimal:   LayoutMinimal,
  strip:     LayoutStrip,
  timeline:  LayoutTimeline,
};

/* ─── Main Component ─────────────────────────────────────────────────────── */

interface Props { cv: CVData; onEdit: (data: CVData) => void; initialThemeId?: string }

export default function CVResult({ cv, onEdit, initialThemeId }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [themeId, setThemeId] = useState(initialThemeId ?? "horizon");
  const [activeCat, setActiveCat] = useState<Cat>(
    THEMES.find(t => t.id === (initialThemeId ?? "horizon"))?.cat ?? "moderne"
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const activeTheme = THEMES.find(t => t.id === themeId) ?? THEMES[0];
  const catThemes = THEMES.filter(t => t.cat === activeCat);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedCV,  setTranslatedCV]  = useState<CVData | null>(null);
  const [isEnglish,     setIsEnglish]     = useState(false);
  const [pdfLoading,    setPdfLoading]    = useState(false);

  const downloadPDF = useCallback(async () => {
    const el = document.getElementById("cv-preview");
    if (!el) return;
    setPdfLoading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Clone + resolve all computed colors to rgb (corrige oklch/oklab de Tailwind 4)
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.cssText = `position:absolute;left:-9999px;top:0;width:${el.offsetWidth}px;height:auto`;
      document.body.appendChild(clone);
      [clone, ...Array.from(clone.querySelectorAll<HTMLElement>("*"))].forEach(node => {
        const cs = window.getComputedStyle(node);
        node.style.color           = cs.color;
        node.style.backgroundColor = cs.backgroundColor;
        node.style.borderColor     = cs.borderColor;
      });

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      document.body.removeChild(clone);

      const pdf   = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW  = 210;
      const pdfH  = 297;
      const ratio = canvas.height / canvas.width;
      const totalH = pdfW * ratio;

      if (totalH <= pdfH) {
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pdfW, totalH);
      } else {
        const pageCanvas = document.createElement("canvas");
        const ctx        = pageCanvas.getContext("2d")!;
        pageCanvas.width = canvas.width;
        const pageHpx    = Math.round(canvas.width * (pdfH / pdfW));
        let y = 0, first = true;
        while (y < canvas.height) {
          if (!first) pdf.addPage();
          const sliceH = Math.min(pageHpx, canvas.height - y);
          pageCanvas.height = sliceH;
          ctx.clearRect(0, 0, pageCanvas.width, sliceH);
          ctx.drawImage(canvas, 0, y, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
          pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pdfW, (sliceH / canvas.width) * pdfW);
          y += pageHpx;
          first = false;
        }
      }

      const name = [cv.prenom, cv.nom].filter(Boolean).join("-") || "CV";
      pdf.save(`${name}.pdf`);
    } catch (err) {
      console.error("Erreur PDF:", err);
    } finally {
      setPdfLoading(false);
    }
  }, [cv]);

  const translateCV = useCallback(async () => {
    if (translatedCV) { setIsEnglish(true); return; }
    setIsTranslating(true);
    try {
      const res = await fetch("/api/translate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cv),
      });
      if (!res.ok) throw new Error("Erreur traduction");
      const data = await res.json() as CVData;
      setTranslatedCV(data);
      setIsEnglish(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  }, [cv, translatedCV]);

  const displayCV = cleanCV((isEnglish && translatedCV) ? translatedCV : cv);
  const ActiveLayout = LAYOUT_MAP[activeTheme.layout];

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Edit button */}
        <button type="button" onClick={() => onEdit(cv)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
          </svg>
          Modifier
        </button>

        {/* Photo button */}
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {photo ? "Changer la photo" : "Ajouter une photo"}
        </button>

        {/* Translate toggle */}
        {isEnglish ? (
          <button type="button" onClick={() => setIsEnglish(false)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all border"
            style={{ background:"#1B3CC1", color:"#fff", borderColor:"#1B3CC1" }}>
            <span className="text-base leading-none">🇫🇷</span>
            Retour FR
          </button>
        ) : (
          <button type="button" onClick={translateCV} disabled={isTranslating}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-700 transition-all disabled:opacity-60 disabled:cursor-wait">
            {isTranslating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" style={{ opacity:0.25 }} />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" style={{ opacity:0.75 }} />
                </svg>
                Traduction…
              </>
            ) : (
              <>
                <span className="text-base leading-none">🇬🇧</span>
                Traduire EN
              </>
            )}
          </button>
        )}

        {/* EN badge */}
        {isEnglish && (
          <span className="px-2 py-1 rounded-lg text-[11px] font-black tracking-widest" style={{ background:"#DBEAFE", color:"#1D4ED8" }}>
            EN
          </span>
        )}

        {/* PDF button — pushed right */}
        <div className="ml-auto">
          <button type="button" onClick={downloadPDF} disabled={pdfLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:opacity-90 disabled:opacity-60 disabled:cursor-wait disabled:scale-100"
            style={{ background:"linear-gradient(135deg,#6366f1,#a855f7)" }}>
            {pdfLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" style={{ opacity:0.25 }} />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" style={{ opacity:0.75 }} />
                </svg>
                Génération…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Télécharger PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Theme selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(cat => (
            <button key={cat.key} type="button" onClick={() => setActiveCat(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeCat === cat.key
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ background: activeTheme.swatch, border:"1.5px solid rgba(0,0,0,0.12)" }} />
          <span className="text-xs font-semibold text-gray-700">{activeTheme.name}</span>
          <span className="text-xs text-gray-400">— {CATEGORIES.find(c=>c.key===activeTheme.cat)?.label}</span>
        </div>
        <div className="grid grid-cols-10 gap-1.5">
          {catThemes.map(t => (
            <button key={t.id} type="button" onClick={() => setThemeId(t.id)} title={t.name}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                themeId === t.id ? "bg-gray-100 ring-2 ring-gray-900 ring-offset-1" : "hover:bg-gray-50"
              }`}>
              <div className="w-6 h-6 rounded-full shadow-sm" style={{ background: t.swatch, border:"2px solid rgba(0,0,0,0.08)" }} />
              <span className="text-[8.5px] font-medium text-gray-500 text-center leading-tight w-full truncate">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Donation banner */}
      <a
        href="https://www.paypal.me/brdst10"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition-all hover:opacity-80 group no-print"
        style={{
          background: "linear-gradient(135deg,#FFFBEB,#FEF3C7)",
          border: "1px solid #FDE68A",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">☕</span>
          <div>
            <p className="font-semibold text-amber-900 text-sm leading-tight">Ce CV vous a aidé ?</p>
            <p className="text-amber-700/70 text-xs mt-0.5">Offrez-moi un café — ça prend 30 secondes !</p>
          </div>
        </div>
        <span
          className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all group-hover:scale-105"
          style={{ background:"#F59E0B", color:"#fff" }}
        >
          Soutenir →
        </span>
      </a>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      <div className="overflow-x-hidden">
        <div id="cv-preview" style={{ height: "auto" }}>
          <ActiveLayout cv={displayCV} photo={photo} onPhotoClick={() => fileRef.current?.click()} theme={activeTheme} lang={isEnglish ? "en" : "fr"} />
        </div>
      </div>
    </div>
  );
}

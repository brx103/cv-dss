"use client";

import { useRef, useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import { useLang } from "@/lib/i18n";

interface Props {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
}

// ── Job title suggestions ────────────────────────────────────────────────────
interface MetierEntry { label: string; category: string }

const METIERS: MetierEntry[] = [
  { label: "Maçon", category: "BTP" }, { label: "Maçon-coffreur", category: "BTP" },
  { label: "Électricien", category: "BTP" }, { label: "Électricien du Bâtiment", category: "BTP" },
  { label: "Plombier", category: "BTP" }, { label: "Plombier-Chauffagiste", category: "BTP" },
  { label: "Peintre en Bâtiment", category: "BTP" }, { label: "Carreleur", category: "BTP" },
  { label: "Menuisier", category: "BTP" }, { label: "Charpentier", category: "BTP" },
  { label: "Couvreur", category: "BTP" }, { label: "Soudeur", category: "BTP" },
  { label: "Conducteur de Travaux", category: "BTP" }, { label: "Chef de Chantier", category: "BTP" },
  { label: "Technicien de Maintenance", category: "BTP" }, { label: "Grutier", category: "BTP" },
  { label: "Conducteur d'Engins", category: "BTP" }, { label: "Plaquiste", category: "BTP" },
  { label: "Infirmier", category: "Santé" }, { label: "Infirmière", category: "Santé" },
  { label: "Aide-Soignant", category: "Santé" }, { label: "Auxiliaire de Vie", category: "Santé" },
  { label: "Aide à Domicile", category: "Santé" }, { label: "Médecin Généraliste", category: "Santé" },
  { label: "Pharmacien", category: "Santé" }, { label: "Kinésithérapeute", category: "Santé" },
  { label: "Psychologue", category: "Santé" }, { label: "Sage-Femme", category: "Santé" },
  { label: "Ambulancier", category: "Santé" }, { label: "Éducateur Spécialisé", category: "Santé" },
  { label: "Assistant Social", category: "Santé" }, { label: "Auxiliaire de Puériculture", category: "Santé" },
  { label: "Vendeur", category: "Commerce" }, { label: "Conseiller de Vente", category: "Commerce" },
  { label: "Commercial", category: "Commerce" }, { label: "Responsable Commercial", category: "Commerce" },
  { label: "Chargé de Clientèle", category: "Commerce" }, { label: "Téléconseiller", category: "Commerce" },
  { label: "Caissier", category: "Commerce" }, { label: "Responsable de Rayon", category: "Commerce" },
  { label: "Manager de Magasin", category: "Commerce" }, { label: "Négociateur Immobilier", category: "Commerce" },
  { label: "Business Developer", category: "Commerce" }, { label: "Technico-Commercial", category: "Commerce" },
  { label: "Chauffeur", category: "Transport" }, { label: "Chauffeur-Livreur", category: "Transport" },
  { label: "Chauffeur PL", category: "Transport" }, { label: "Chauffeur SPL", category: "Transport" },
  { label: "Chauffeur VTC", category: "Transport" }, { label: "Livreur", category: "Transport" },
  { label: "Préparateur de Commandes", category: "Transport" }, { label: "Magasinier", category: "Transport" },
  { label: "Cariste", category: "Transport" }, { label: "Responsable Logistique", category: "Transport" },
  { label: "Serveur", category: "Restauration" }, { label: "Chef de Rang", category: "Restauration" },
  { label: "Barman", category: "Restauration" }, { label: "Cuisinier", category: "Restauration" },
  { label: "Chef Cuisinier", category: "Restauration" }, { label: "Pâtissier", category: "Restauration" },
  { label: "Boulanger", category: "Restauration" }, { label: "Réceptionniste", category: "Restauration" },
  { label: "Employé Polyvalent Restauration", category: "Restauration" },
  { label: "Développeur Full Stack", category: "Informatique" }, { label: "Développeur Frontend", category: "Informatique" },
  { label: "Développeur Backend", category: "Informatique" }, { label: "Développeur Web", category: "Informatique" },
  { label: "Développeur Mobile", category: "Informatique" }, { label: "Ingénieur Logiciel", category: "Informatique" },
  { label: "Ingénieur DevOps", category: "Informatique" }, { label: "Data Scientist", category: "Informatique" },
  { label: "Data Analyst", category: "Informatique" }, { label: "UX Designer", category: "Informatique" },
  { label: "Product Manager", category: "Informatique" }, { label: "Chef de Projet IT", category: "Informatique" },
  { label: "Secrétaire", category: "Administratif" }, { label: "Assistant Administratif", category: "Administratif" },
  { label: "Assistant de Direction", category: "Administratif" }, { label: "Office Manager", category: "Administratif" },
  { label: "Comptable", category: "Administratif" }, { label: "Expert-Comptable", category: "Administratif" },
  { label: "Contrôleur de Gestion", category: "Administratif" }, { label: "Gestionnaire de Paie", category: "Administratif" },
  { label: "Juriste", category: "Administratif" }, { label: "Responsable Administratif", category: "Administratif" },
  { label: "Responsable RH", category: "RH" }, { label: "Chargé de Recrutement", category: "RH" },
  { label: "DRH", category: "RH" }, { label: "Assistant RH", category: "RH" },
  { label: "Agent de Sécurité", category: "Sécurité" }, { label: "Vigile", category: "Sécurité" },
  { label: "Agent SSIAP", category: "Sécurité" }, { label: "Chef de Poste Sécurité", category: "Sécurité" },
  { label: "Agent d'Entretien", category: "Nettoyage" }, { label: "Technicien de Surface", category: "Nettoyage" },
  { label: "Enseignant", category: "Éducation" }, { label: "Professeur", category: "Éducation" },
  { label: "Formateur", category: "Éducation" }, { label: "Animateur", category: "Éducation" },
  { label: "ATSEM", category: "Éducation" }, { label: "Éducateur de Jeunes Enfants", category: "Éducation" },
  { label: "Chargé de Marketing", category: "Marketing" }, { label: "Responsable Marketing", category: "Marketing" },
  { label: "Community Manager", category: "Marketing" }, { label: "Graphiste", category: "Marketing" },
  { label: "Opérateur de Production", category: "Industrie" }, { label: "Technicien Qualité", category: "Industrie" },
  { label: "Responsable Qualité", category: "Industrie" }, { label: "Mécanicien Automobile", category: "Industrie" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "BTP": "bg-orange-50 text-orange-600", "Santé": "bg-red-50 text-red-500",
  "Commerce": "bg-amber-50 text-amber-600", "Transport": "bg-cyan-50 text-cyan-600",
  "Restauration": "bg-yellow-50 text-yellow-700", "Informatique": "bg-indigo-50 text-indigo-600",
  "Administratif": "bg-slate-100 text-slate-600", "RH": "bg-pink-50 text-pink-600",
  "Sécurité": "bg-zinc-100 text-zinc-600", "Nettoyage": "bg-teal-50 text-teal-600",
  "Éducation": "bg-violet-50 text-violet-600", "Marketing": "bg-fuchsia-50 text-fuchsia-600",
  "Industrie": "bg-lime-50 text-lime-700",
};

// ── City suggestions ─────────────────────────────────────────────────────────
const VILLES = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille", "Nantes",
  "Strasbourg", "Montpellier", "Rennes", "Reims", "Le Havre", "Saint-Étienne",
  "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne", "Clermont-Ferrand",
  "Le Mans", "Aix-en-Provence", "Brest", "Tours", "Amiens", "Limoges", "Annecy",
  "Perpignan", "Metz", "Besançon", "Orléans", "Rouen", "Mulhouse", "Caen", "Nancy",
  "Troyes", "Avignon", "Nice", "Cannes", "Versailles", "Pau", "Chambéry",
  "Bayonne", "Lorient", "Quimper", "Valence", "Poitiers", "La Rochelle",
  "Dunkerque", "Créteil", "Antibes", "Montauban", "Béziers", "Ajaccio",
  "La Réunion", "Martinique", "Guadeloupe", "Nouvelle-Calédonie",
];

// ── Nationalités ─────────────────────────────────────────────────────────────
const NATIONALITES = [
  "Française", "Algérienne", "Marocaine", "Tunisienne", "Espagnole", "Italienne",
  "Portugaise", "Roumaine", "Belge", "Britannique", "Allemande", "Polonaise",
  "Sénégalaise", "Malienne", "Ivoirienne", "Camerounaise", "Congolaise", "Guinéenne",
  "Mauritanienne", "Burkinabée", "Togolaise", "Béninoise", "Nigériane", "Gabonaise",
  "Malgache", "Comorienne", "Haïtienne", "Chinoise", "Vietnamienne", "Cambodgienne",
  "Turque", "Syrienne", "Libanaise", "Égyptienne", "Pakistanaise", "Indienne",
  "Sri Lankaise", "Afghane", "Iranienne", "Brésilienne", "Colombienne", "Chilienne",
  "Péruvienne", "Mexicaine", "Américaine", "Canadienne", "Suisse", "Néerlandaise",
  "Suédoise", "Danoise", "Norvégienne", "Finlandaise", "Grecque", "Hongroise",
  "Tchèque", "Russe", "Ukrainienne", "Serbe", "Croate", "Albanaise",
];

// ── Input classes ────────────────────────────────────────────────────────────
const inputClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 bg-white";

const selectClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all bg-white text-gray-700 appearance-none";

const textareaClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 resize-none bg-white";

// ── City autocomplete ────────────────────────────────────────────────────────
function CityAutocomplete({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = value.trim() ? VILLES.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 8) : [];

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setHi(-1); } };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const select = (v: string) => { onChange(v); setOpen(false); setHi(-1); };

  return (
    <div ref={ref} className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300 z-10">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </span>
      <input type="text" value={value} autoComplete="off" placeholder={placeholder} className={inputClass}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setHi(-1); }}
        onFocus={() => { if (filtered.length > 0) setOpen(true); }}
        onKeyDown={(e) => {
          if (!open || !filtered.length) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, filtered.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
          else if (e.key === "Enter" && hi >= 0) { e.preventDefault(); select(filtered[hi]); }
          else if (e.key === "Escape") { setOpen(false); setHi(-1); }
        }}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden max-h-52 overflow-y-auto">
          {filtered.map((item, i) => {
            const idx = item.toLowerCase().indexOf(value.toLowerCase());
            return (
              <li key={item} onMouseDown={() => select(item)} onMouseEnter={() => setHi(i)}
                className={`px-4 py-2.5 text-sm cursor-pointer ${i === hi ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                {idx === -1 ? item : <>{item.slice(0, idx)}<span className="font-semibold text-indigo-600">{item.slice(idx, idx + value.length)}</span>{item.slice(idx + value.length)}</>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Job title autocomplete ───────────────────────────────────────────────────
function JobAutocomplete({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = value.trim() ? METIERS.filter((m) => m.label.toLowerCase().includes(value.toLowerCase())).slice(0, 10) : [];

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setHi(-1); } };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const select = (v: string) => { onChange(v); setOpen(false); setHi(-1); };

  return (
    <div ref={ref} className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300 z-10">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </span>
      <input type="text" value={value} autoComplete="off" placeholder={placeholder} className={inputClass}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setHi(-1); }}
        onFocus={() => { if (filtered.length > 0) setOpen(true); }}
        onKeyDown={(e) => {
          if (!open || !filtered.length) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, filtered.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
          else if (e.key === "Enter" && hi >= 0) { e.preventDefault(); select(filtered[hi].label); }
          else if (e.key === "Escape") { setOpen(false); setHi(-1); }
        }}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
          {filtered.map((item, i) => {
            const idx = item.label.toLowerCase().indexOf(value.toLowerCase());
            const cc = CATEGORY_COLORS[item.category] ?? "bg-gray-100 text-gray-500";
            return (
              <li key={item.label} onMouseDown={() => select(item.label)} onMouseEnter={() => setHi(i)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer gap-3 ${i === hi ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
                <span className={i === hi ? "text-indigo-700 font-medium" : "text-gray-700"}>
                  {idx === -1 ? item.label : <>{item.label.slice(0, idx)}<span className="font-semibold text-indigo-600">{item.label.slice(idx, idx + value.length)}</span>{item.label.slice(idx + value.length)}</>}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${cc}`}>{item.category}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Section heading helper ───────────────────────────────────────────────────
function SectionHeading({ icon, title, gradientFrom = "#6366f1", gradientTo = "#a855f7" }: {
  icon: React.ReactNode; title: string; gradientFrom?: string; gradientTo?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg,${gradientFrom},${gradientTo})` }}>
        <span className="text-white">{icon}</span>
      </div>
      <div>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <div className="h-0.5 w-16 rounded-full mt-0.5"
          style={{ background: `linear-gradient(90deg,${gradientFrom},${gradientTo})` }} />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
const PERMIS_OPTIONS = ["AM", "A1", "A2", "A", "B1", "B", "C1", "C", "D1", "D", "BE", "C1E", "CE", "D1E", "DE", "Véhiculé(e)"];

export default function InfoPersonnelles({ data, onChange }: Props) {
  const { t } = useLang();
  const permis = data.permis ?? [];

  const togglePermis = (val: string) => {
    const next = permis.includes(val) ? permis.filter((p) => p !== val) : [...permis, val];
    onChange({ permis: next });
  };

  return (
    <div className="space-y-8">

      {/* ══ Section 1 ══ */}
      <section className="space-y-6">
        <SectionHeading
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          title={t.ip_section1}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_prenom} <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input type="text" value={data.prenom} onChange={(e) => onChange({ prenom: e.target.value })} placeholder="Jean" className={inputClass} />
            </div>
          </div>

          {/* Last name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_nom} <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input type="text" value={data.nom} onChange={(e) => onChange({ nom: e.target.value })} placeholder="Dupont" className={inputClass} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_email} <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <input type="email" value={data.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="jean.dupont@email.com" className={inputClass} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_telephone}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <input type="tel" value={data.telephone} onChange={(e) => onChange({ telephone: e.target.value })} placeholder="+33 6 12 34 56 78" className={inputClass} />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_ville}</label>
            <CityAutocomplete value={data.ville} onChange={(v) => onChange({ ville: v })} placeholder={t.ip_city_placeholder} />
          </div>

          {/* Job title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_titre}</label>
            <JobAutocomplete value={data.titre} onChange={(v) => onChange({ titre: v })} placeholder={t.ip_job_placeholder} />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {t.ip_resume}{" "}
            <span className="text-gray-400 font-normal text-xs">{t.ip_resume_hint}</span>
          </label>
          <textarea value={data.resume} onChange={(e) => onChange({ resume: e.target.value })} rows={3}
            placeholder={t.ip_resume_placeholder}
            className={textareaClass} />
        </div>
      </section>

      {/* ══ Section 2 ══ */}
      <section className="space-y-6">
        <SectionHeading
          gradientFrom="#8b5cf6"
          gradientTo="#ec4899"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          title={t.ip_section2}
        />

        <p className="text-sm text-gray-400 -mt-2">{t.ip_optional}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Birth date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_birth}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              <input type="date" value={data.dateNaissance ?? ""} onChange={(e) => onChange({ dateNaissance: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_nationalite}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
              </span>
              <select value={data.nationalite ?? ""} onChange={(e) => onChange({ nationalite: e.target.value })} className={selectClass}>
                <option value="">{t.ip_select}</option>
                {NATIONALITES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* Marital status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_famille}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </span>
              <select value={data.situationFamiliale ?? ""} onChange={(e) => onChange({ situationFamiliale: e.target.value })} className={selectClass}>
                <option value="">{t.ip_select}</option>
                {t.ip_familles.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_dispo}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <select value={data.disponibilite ?? ""} onChange={(e) => onChange({ disponibilite: e.target.value })} className={selectClass}>
                <option value="">{t.ip_select}</option>
                {t.ip_dispos.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Mobility */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_mobilite}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </span>
              <select value={data.mobilite ?? ""} onChange={(e) => onChange({ mobilite: e.target.value })} className={selectClass}>
                <option value="">{t.ip_select}</option>
                {t.ip_mobilites.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_linkedin}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </span>
              <input type="text" value={data.linkedin ?? ""} onChange={(e) => onChange({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/jean-dupont" className={inputClass} />
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.ip_portfolio}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </span>
              <input type="text" value={data.portfolio ?? ""} onChange={(e) => onChange({ portfolio: e.target.value })}
                placeholder="monportfolio.fr" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Driving licence */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">{t.ip_permis}</label>
          <div className="flex flex-wrap gap-2">
            {PERMIS_OPTIONS.map((p) => {
              const checked = permis.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePermis(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    checked
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-indigo-200 hover:text-indigo-500"
                  }`}
                >
                  {checked && (
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mr-1.5 mb-0.5" />
                  )}
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

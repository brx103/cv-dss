"use client";

import { useRef, useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import { useLang } from "@/lib/i18n";

interface Props {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
}

// ── 300+ compétences, tous secteurs ─────────────────────────────────────────
interface SkillEntry { label: string; category: string }

const COMPETENCES_LIST: SkillEntry[] = [
  // Bureautique & Outils Office
  { label: "Microsoft Word", category: "Bureautique" },
  { label: "Microsoft Excel", category: "Bureautique" },
  { label: "Microsoft PowerPoint", category: "Bureautique" },
  { label: "Microsoft Outlook", category: "Bureautique" },
  { label: "Microsoft Teams", category: "Bureautique" },
  { label: "Google Sheets", category: "Bureautique" },
  { label: "Google Docs", category: "Bureautique" },
  { label: "Google Slides", category: "Bureautique" },
  { label: "LibreOffice", category: "Bureautique" },
  { label: "Tableaux croisés dynamiques", category: "Bureautique" },
  { label: "Publipostage", category: "Bureautique" },
  { label: "Saisie de données", category: "Bureautique" },
  { label: "Traitement de texte", category: "Bureautique" },

  // Design & Créatif
  { label: "Adobe Photoshop", category: "Design" },
  { label: "Adobe Illustrator", category: "Design" },
  { label: "Adobe InDesign", category: "Design" },
  { label: "Adobe Premiere Pro", category: "Design" },
  { label: "Adobe After Effects", category: "Design" },
  { label: "Figma", category: "Design" },
  { label: "Canva", category: "Design" },
  { label: "Sketch", category: "Design" },
  { label: "DaVinci Resolve", category: "Design" },
  { label: "UI/UX Design", category: "Design" },
  { label: "Maquettage", category: "Design" },
  { label: "Identité visuelle", category: "Design" },
  { label: "Motion Design", category: "Design" },
  { label: "Retouche photo", category: "Design" },

  // Informatique & Dev
  { label: "Python", category: "Informatique" },
  { label: "JavaScript", category: "Informatique" },
  { label: "TypeScript", category: "Informatique" },
  { label: "React", category: "Informatique" },
  { label: "React Native", category: "Informatique" },
  { label: "Next.js", category: "Informatique" },
  { label: "Node.js", category: "Informatique" },
  { label: "PHP", category: "Informatique" },
  { label: "Java", category: "Informatique" },
  { label: "C#", category: "Informatique" },
  { label: "C++", category: "Informatique" },
  { label: "SQL", category: "Informatique" },
  { label: "MySQL", category: "Informatique" },
  { label: "PostgreSQL", category: "Informatique" },
  { label: "MongoDB", category: "Informatique" },
  { label: "Docker", category: "Informatique" },
  { label: "Git", category: "Informatique" },
  { label: "Linux", category: "Informatique" },
  { label: "AWS", category: "Informatique" },
  { label: "Azure", category: "Informatique" },
  { label: "API REST", category: "Informatique" },
  { label: "WordPress", category: "Informatique" },
  { label: "Cybersécurité", category: "Informatique" },
  { label: "Automatisation", category: "Informatique" },
  { label: "Machine Learning", category: "Informatique" },
  { label: "Power BI", category: "Informatique" },
  { label: "Tableau", category: "Informatique" },

  // Langues
  { label: "Anglais courant", category: "Langues" },
  { label: "Anglais professionnel", category: "Langues" },
  { label: "Anglais bilingue", category: "Langues" },
  { label: "Espagnol", category: "Langues" },
  { label: "Espagnol courant", category: "Langues" },
  { label: "Arabe", category: "Langues" },
  { label: "Arabe courant", category: "Langues" },
  { label: "Portugais", category: "Langues" },
  { label: "Italien", category: "Langues" },
  { label: "Allemand", category: "Langues" },
  { label: "Chinois mandarin", category: "Langues" },
  { label: "Russe", category: "Langues" },
  { label: "Néerlandais", category: "Langues" },
  { label: "Turc", category: "Langues" },
  { label: "FLE (Français Langue Étrangère)", category: "Langues" },

  // Soft skills
  { label: "Travail en équipe", category: "Savoir-être" },
  { label: "Communication", category: "Savoir-être" },
  { label: "Ponctualité", category: "Savoir-être" },
  { label: "Autonomie", category: "Savoir-être" },
  { label: "Rigueur", category: "Savoir-être" },
  { label: "Adaptabilité", category: "Savoir-être" },
  { label: "Sens de l'organisation", category: "Savoir-être" },
  { label: "Leadership", category: "Savoir-être" },
  { label: "Gestion du stress", category: "Savoir-être" },
  { label: "Sens du service", category: "Savoir-être" },
  { label: "Réactivité", category: "Savoir-être" },
  { label: "Force de proposition", category: "Savoir-être" },
  { label: "Esprit d'initiative", category: "Savoir-être" },
  { label: "Empathie", category: "Savoir-être" },
  { label: "Diplomatie", category: "Savoir-être" },
  { label: "Gestion des priorités", category: "Savoir-être" },
  { label: "Esprit d'équipe", category: "Savoir-être" },
  { label: "Polyvalence", category: "Savoir-être" },
  { label: "Discrétion", category: "Savoir-être" },
  { label: "Sens des responsabilités", category: "Savoir-être" },

  // Commerce & Vente
  { label: "Vente", category: "Commerce" },
  { label: "Négociation commerciale", category: "Commerce" },
  { label: "Prospection", category: "Commerce" },
  { label: "Prospection téléphonique", category: "Commerce" },
  { label: "Fidélisation client", category: "Commerce" },
  { label: "Service client", category: "Commerce" },
  { label: "Relation client", category: "Commerce" },
  { label: "CRM (Salesforce)", category: "Commerce" },
  { label: "CRM (HubSpot)", category: "Commerce" },
  { label: "Gestion des réclamations", category: "Commerce" },
  { label: "Encaissement", category: "Commerce" },
  { label: "Merchandising", category: "Commerce" },
  { label: "Animation de rayon", category: "Commerce" },
  { label: "Techniques de vente", category: "Commerce" },
  { label: "Appels d'offres", category: "Commerce" },
  { label: "Reporting commercial", category: "Commerce" },

  // Gestion & Administration
  { label: "Comptabilité générale", category: "Gestion" },
  { label: "Comptabilité fournisseurs", category: "Gestion" },
  { label: "Comptabilité clients", category: "Gestion" },
  { label: "Facturation", category: "Gestion" },
  { label: "Gestion de la paie", category: "Gestion" },
  { label: "Déclarations fiscales", category: "Gestion" },
  { label: "Gestion budgétaire", category: "Gestion" },
  { label: "Logiciel SAGE", category: "Gestion" },
  { label: "Logiciel CEGID", category: "Gestion" },
  { label: "ERP (SAP)", category: "Gestion" },
  { label: "Rédaction administrative", category: "Gestion" },
  { label: "Gestion des agendas", category: "Gestion" },
  { label: "Organisation de réunions", category: "Gestion" },
  { label: "Accueil physique et téléphonique", category: "Gestion" },
  { label: "Archivage", category: "Gestion" },

  // BTP & Artisanat
  { label: "Peinture en bâtiment", category: "BTP" },
  { label: "Maçonnerie", category: "BTP" },
  { label: "Électricité du bâtiment", category: "BTP" },
  { label: "Plomberie", category: "BTP" },
  { label: "Soudure", category: "BTP" },
  { label: "Soudure TIG", category: "BTP" },
  { label: "Soudure MIG/MAG", category: "BTP" },
  { label: "Menuiserie", category: "BTP" },
  { label: "Carrelage", category: "BTP" },
  { label: "Charpente", category: "BTP" },
  { label: "Couverture", category: "BTP" },
  { label: "Plâtrerie", category: "BTP" },
  { label: "Lecture de plans", category: "BTP" },
  { label: "AutoCAD", category: "BTP" },
  { label: "Habilitation électrique B1V", category: "BTP" },
  { label: "Habilitation électrique BR", category: "BTP" },
  { label: "Travaux en hauteur", category: "BTP" },
  { label: "Échafaudage", category: "BTP" },
  { label: "Coffrages", category: "BTP" },
  { label: "Béton armé", category: "BTP" },
  { label: "VMC / climatisation", category: "BTP" },

  // Transport & Logistique
  { label: "Permis B", category: "Transport" },
  { label: "Permis C", category: "Transport" },
  { label: "Permis CE", category: "Transport" },
  { label: "Permis D (bus)", category: "Transport" },
  { label: "FIMO / FCO", category: "Transport" },
  { label: "ADR (matières dangereuses)", category: "Transport" },
  { label: "CACES 1", category: "Transport" },
  { label: "CACES 3", category: "Transport" },
  { label: "CACES 5", category: "Transport" },
  { label: "CACES R489", category: "Transport" },
  { label: "Conduite de chariot élévateur", category: "Transport" },
  { label: "Gestion de stock", category: "Transport" },
  { label: "Préparation de commandes", category: "Transport" },
  { label: "WMS (logiciel entrepôt)", category: "Transport" },
  { label: "Logistique inverse", category: "Transport" },
  { label: "Livraison en tournée", category: "Transport" },

  // Restauration & Hôtellerie
  { label: "HACCP", category: "Restauration" },
  { label: "Service en salle", category: "Restauration" },
  { label: "Service au plateau", category: "Restauration" },
  { label: "Prise de commandes", category: "Restauration" },
  { label: "Encaissement restauration", category: "Restauration" },
  { label: "Préparation de boissons", category: "Restauration" },
  { label: "Cocktails / mixologie", category: "Restauration" },
  { label: "Cuisine française", category: "Restauration" },
  { label: "Cuisine du monde", category: "Restauration" },
  { label: "Pâtisserie", category: "Restauration" },
  { label: "Boulangerie", category: "Restauration" },
  { label: "Découpe viande", category: "Restauration" },
  { label: "Hygiène alimentaire", category: "Restauration" },
  { label: "Logiciel de caisse", category: "Restauration" },
  { label: "Accueil clients", category: "Restauration" },
  { label: "Check-in / Check-out", category: "Restauration" },
  { label: "Gestion des réservations", category: "Restauration" },

  // Santé & Social
  { label: "Soins infirmiers", category: "Santé" },
  { label: "Prise en charge des patients", category: "Santé" },
  { label: "Nursing", category: "Santé" },
  { label: "Aide à la toilette", category: "Santé" },
  { label: "Aide aux repas", category: "Santé" },
  { label: "Manutention des patients", category: "Santé" },
  { label: "Préparation des médicaments", category: "Santé" },
  { label: "Dossier patient informatisé", category: "Santé" },
  { label: "Premiers secours (PSC1)", category: "Santé" },
  { label: "Premiers secours (SST)", category: "Santé" },
  { label: "Bilan de santé", category: "Santé" },
  { label: "Accompagnement social", category: "Santé" },

  // Sécurité
  { label: "SSIAP 1", category: "Sécurité" },
  { label: "SSIAP 2", category: "Sécurité" },
  { label: "CQP Agent de Prévention", category: "Sécurité" },
  { label: "Rondes de surveillance", category: "Sécurité" },
  { label: "Gestion des accès", category: "Sécurité" },
  { label: "Contrôle d'accès", category: "Sécurité" },
  { label: "Vidéosurveillance", category: "Sécurité" },
  { label: "Gestion des situations d'urgence", category: "Sécurité" },
  { label: "Rédaction de rapports", category: "Sécurité" },

  // Nettoyage
  { label: "Nettoyage des locaux", category: "Nettoyage" },
  { label: "Techniques de nettoyage", category: "Nettoyage" },
  { label: "Utilisation de machines de nettoyage", category: "Nettoyage" },
  { label: "Produits d'entretien", category: "Nettoyage" },
  { label: "Bio-nettoyage", category: "Nettoyage" },
  { label: "Nettoyage haute pression", category: "Nettoyage" },

  // Gestion de projet
  { label: "Gestion de projet", category: "Management" },
  { label: "Méthode Agile", category: "Management" },
  { label: "Méthode Scrum", category: "Management" },
  { label: "Méthode KANBAN", category: "Management" },
  { label: "Jira", category: "Management" },
  { label: "Trello", category: "Management" },
  { label: "Notion", category: "Management" },
  { label: "Asana", category: "Management" },
  { label: "Management d'équipe", category: "Management" },
  { label: "Gestion de planning", category: "Management" },
  { label: "Conduite du changement", category: "Management" },
  { label: "Animation de réunions", category: "Management" },
  { label: "Coaching", category: "Management" },
  { label: "Recrutement", category: "Management" },

  // Marketing & Communication
  { label: "SEO / Référencement", category: "Marketing" },
  { label: "Google Ads", category: "Marketing" },
  { label: "Facebook Ads", category: "Marketing" },
  { label: "Emailing / Mailchimp", category: "Marketing" },
  { label: "Réseaux sociaux", category: "Marketing" },
  { label: "Content marketing", category: "Marketing" },
  { label: "Rédaction web", category: "Marketing" },
  { label: "Analyse de données marketing", category: "Marketing" },
  { label: "Google Analytics", category: "Marketing" },
  { label: "Relations presse", category: "Marketing" },
  { label: "Organisation d'événements", category: "Marketing" },

  // Industrie
  { label: "Contrôle qualité", category: "Industrie" },
  { label: "Lean Manufacturing", category: "Industrie" },
  { label: "5S", category: "Industrie" },
  { label: "AMDEC", category: "Industrie" },
  { label: "Maintenance préventive", category: "Industrie" },
  { label: "Maintenance corrective", category: "Industrie" },
  { label: "GMAO", category: "Industrie" },
  { label: "Lecture de schémas électriques", category: "Industrie" },
  { label: "Métrologie", category: "Industrie" },
  { label: "Normes ISO 9001", category: "Industrie" },
  { label: "Normes ISO 14001", category: "Industrie" },
];

// ── Category badge colours ───────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "Bureautique": "bg-sky-50 text-sky-600",
  "Design":      "bg-pink-50 text-pink-600",
  "Informatique":"bg-indigo-50 text-indigo-600",
  "Langues":     "bg-emerald-50 text-emerald-600",
  "Savoir-être": "bg-violet-50 text-violet-600",
  "Commerce":    "bg-amber-50 text-amber-600",
  "Gestion":     "bg-slate-100 text-slate-600",
  "BTP":         "bg-orange-50 text-orange-600",
  "Transport":   "bg-cyan-50 text-cyan-600",
  "Restauration":"bg-yellow-50 text-yellow-700",
  "Santé":       "bg-red-50 text-red-500",
  "Sécurité":    "bg-zinc-100 text-zinc-600",
  "Nettoyage":   "bg-teal-50 text-teal-600",
  "Management":  "bg-blue-50 text-blue-600",
  "Marketing":   "bg-fuchsia-50 text-fuchsia-600",
  "Industrie":   "bg-lime-50 text-lime-700",
};

export default function Competences({ data, onChange }: Props) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered =
    input.trim().length === 0
      ? []
      : COMPETENCES_LIST.filter(
          (s) =>
            s.label.toLowerCase().includes(input.toLowerCase()) &&
            !data.competences.includes(s.label)
        ).slice(0, 8);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addCompetence = (value?: string) => {
    const trimmed = (value ?? input).trim();
    if (!trimmed || data.competences.includes(trimmed)) return;
    onChange({ competences: [...data.competences, trimmed] });
    setInput("");
    setOpen(false);
    setHighlighted(-1);
  };

  const removeCompetence = (comp: string) => {
    onChange({ competences: data.competences.filter((c) => c !== comp) });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlighted >= 0 && filtered[highlighted]) {
        addCompetence(filtered[highlighted].label);
      } else {
        addCompetence();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  return (
    <section className="space-y-6">
      {/* Section heading */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-800">Compétences</h2>
          <div className="h-0.5 w-16 rounded-full mt-0.5" style={{ background: "linear-gradient(90deg,#6366f1,#a855f7)" }} />
        </div>
      </div>

      <p className="text-sm text-gray-400 -mt-2">
        Tapez pour voir des suggestions, ou entrez votre propre compétence.
      </p>

      {/* Input row */}
      <div ref={containerRef} className="relative flex gap-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300 z-10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <input
            type="text"
            value={input}
            autoComplete="off"
            onChange={(e) => {
              setInput(e.target.value);
              setOpen(true);
              setHighlighted(-1);
            }}
            onFocus={() => { if (filtered.length > 0) setOpen(true); }}
            onKeyDown={handleKeyDown}
            placeholder="Excel, Permis B, HACCP, Travail en équipe..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 bg-white opacity-100"
          />

          {/* Dropdown */}
          {open && filtered.length > 0 && (
            <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto">
              {filtered.map((item, i) => {
                const idx = item.label.toLowerCase().indexOf(input.toLowerCase());
                const catColor = CATEGORY_COLORS[item.category] ?? "bg-gray-100 text-gray-500";
                return (
                  <li
                    key={item.label}
                    onMouseDown={() => addCompetence(item.label)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors gap-3 ${
                      i === highlighted ? "bg-indigo-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className={i === highlighted ? "text-indigo-700 font-medium" : "text-gray-700"}>
                      {idx === -1 ? item.label : (
                        <>
                          {item.label.slice(0, idx)}
                          <span className="font-semibold text-indigo-600">
                            {item.label.slice(idx, idx + input.length)}
                          </span>
                          {item.label.slice(idx + input.length)}
                        </>
                      )}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${catColor}`}>
                      {item.category}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={() => addCompetence()}
          className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all hover:scale-[1.03] hover:opacity-90 flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
        >
          Ajouter
        </button>
      </div>

      {/* Tags */}
      {data.competences.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.competences.map((comp) => (
            <span
              key={comp}
              className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {comp}
              <button
                type="button"
                onClick={() => removeCompetence(comp)}
                className="text-indigo-300 hover:text-indigo-600 focus:outline-none transition-colors"
                aria-label={`Supprimer ${comp}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {data.competences.length === 0 && (
        <div className="text-center py-6 text-gray-300 text-sm">
          Aucune compétence ajoutée — commencez par vos points forts !
        </div>
      )}
    </section>
  );
}

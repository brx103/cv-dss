"use client";

import { CVData, Experience } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { useLang } from "@/lib/i18n";

interface Props {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
}

const inputClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 bg-white opacity-100";

const monthInputClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all bg-white opacity-100";

const textareaClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 resize-none bg-white opacity-100";

function ExperienceCard({
  exp,
  index,
  onUpdate,
  onRemove,
}: {
  exp: Experience;
  index: number;
  onUpdate: (updated: Experience) => void;
  onRemove: () => void;
}) {
  const { t } = useLang();
  const field = (key: keyof Experience, value: string) =>
    onUpdate({ ...exp, [key]: value });

  return (
    <div className="border border-indigo-100 rounded-2xl p-5 space-y-4 bg-gradient-to-br from-white to-indigo-50/30">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">
          {t.exp_card} #{index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {t.exp_delete}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Position */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.exp_poste}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="text"
              value={exp.poste}
              onChange={(e) => field("poste", e.target.value)}
              placeholder={t.exp_poste_placeholder}
              className={inputClass}
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.exp_entreprise}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            <input
              type="text"
              value={exp.entreprise}
              onChange={(e) => field("entreprise", e.target.value)}
              placeholder={t.exp_entreprise_placeholder}
              className={inputClass}
            />
          </div>
        </div>

        {/* Start date */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.exp_date_debut}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="month"
              value={exp.dateDebut}
              onChange={(e) => field("dateDebut", e.target.value)}
              className={monthInputClass}
            />
          </div>
        </div>

        {/* End date */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            {t.exp_date_fin}{" "}
            <span className="text-gray-400 font-normal">{t.exp_date_fin_hint}</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-indigo-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="month"
              value={exp.dateFin}
              onChange={(e) => field("dateFin", e.target.value)}
              className={monthInputClass}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          {t.exp_description}{" "}
          <span className="text-gray-400 font-normal">{t.exp_description_hint}</span>
        </label>
        <textarea
          value={exp.description}
          onChange={(e) => field("description", e.target.value)}
          rows={3}
          placeholder={t.exp_desc_placeholder}
          className={textareaClass}
        />
      </div>
    </div>
  );
}

export default function Experiences({ data, onChange }: Props) {
  const addExperience = () => {
    const newExp: Experience = {
      id: uuidv4(),
      poste: "",
      entreprise: "",
      dateDebut: "",
      dateFin: "",
      description: "",
    };
    onChange({ experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (updated: Experience) => {
    onChange({
      experiences: data.experiences.map((e) => (e.id === updated.id ? updated : e)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({ experiences: data.experiences.filter((e) => e.id !== id) });
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-800">Expériences professionnelles</h2>
          <div className="h-0.5 w-16 rounded-full mt-0.5" style={{ background: "linear-gradient(90deg,#6366f1,#a855f7)" }} />
        </div>
      </div>

      <div className="space-y-4">
        {data.experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            index={i}
            onUpdate={updateExperience}
            onRemove={() => removeExperience(exp.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="w-full border-2 border-dashed border-indigo-200 rounded-2xl py-3.5 text-sm font-medium text-indigo-500 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une expérience
      </button>
    </section>
  );
}

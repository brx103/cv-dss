"use client";

import { CVData, Formation } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { useLang } from "@/lib/i18n";

interface Props {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
}

const inputClass =
  "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 bg-white opacity-100";

const textareaClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 shadow-sm hover:border-indigo-200 transition-all placeholder:text-gray-300 resize-none bg-white opacity-100";

function FormationCard({
  formation,
  index,
  onUpdate,
  onRemove,
}: {
  formation: Formation;
  index: number;
  onUpdate: (updated: Formation) => void;
  onRemove: () => void;
}) {
  const field = (key: keyof Formation, value: string) =>
    onUpdate({ ...formation, [key]: value });

  return (
    <div className="border border-indigo-100 rounded-2xl p-5 space-y-4 bg-gradient-to-br from-white to-purple-50/30">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
          Formation #{index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Supprimer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Diplôme */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Diplôme</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </span>
            <input
              type="text"
              value={formation.diplome}
              onChange={(e) => field("diplome", e.target.value)}
              placeholder="Master, Licence, BTS, MBA..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Établissement */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Établissement</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            <input
              type="text"
              value={formation.etablissement}
              onChange={(e) => field("etablissement", e.target.value)}
              placeholder="HEC Paris, Polytechnique, Dauphine..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Année */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Année d'obtention</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="number"
              value={formation.annee}
              onChange={(e) => field("annee", e.target.value)}
              placeholder="2022"
              min="1950"
              max="2099"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Description{" "}
          <span className="text-gray-400 font-normal">(optionnel)</span>
        </label>
        <textarea
          value={formation.description}
          onChange={(e) => field("description", e.target.value)}
          rows={2}
          placeholder="Spécialisation, mention, mémoire, projets marquants..."
          className={textareaClass}
        />
      </div>
    </div>
  );
}

export default function Formations({ data, onChange }: Props) {
  const addFormation = () => {
    const newFormation: Formation = {
      id: uuidv4(),
      diplome: "",
      etablissement: "",
      annee: "",
      description: "",
    };
    onChange({ formations: [...data.formations, newFormation] });
  };

  const updateFormation = (updated: Formation) => {
    onChange({
      formations: data.formations.map((f) => (f.id === updated.id ? updated : f)),
    });
  };

  const removeFormation = (id: string) => {
    onChange({ formations: data.formations.filter((f) => f.id !== id) });
  };

  return (
    <section className="space-y-6">
      {/* Section heading */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#a855f7,#6366f1)" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-800">Formation</h2>
          <div className="h-0.5 w-16 rounded-full mt-0.5" style={{ background: "linear-gradient(90deg,#a855f7,#6366f1)" }} />
        </div>
      </div>

      <div className="space-y-4">
        {data.formations.map((formation, i) => (
          <FormationCard
            key={formation.id}
            formation={formation}
            index={i}
            onUpdate={updateFormation}
            onRemove={() => removeFormation(formation.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addFormation}
        className="w-full border-2 border-dashed border-purple-200 rounded-2xl py-3.5 text-sm font-medium text-purple-500 hover:border-purple-400 hover:bg-purple-50/50 hover:text-purple-600 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une formation
      </button>
    </section>
  );
}

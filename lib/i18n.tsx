"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { fr } from "@/locales/fr";
import { en } from "@/locales/en";
import type { Translations } from "@/locales/fr";

type Lang = "fr" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangCtx>({
  lang: "fr",
  setLang: () => {},
  t: fr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  const setLang = (l: Lang) => {
    setLangState(l);
  };

  const t = lang === "en" ? en : fr;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangCtx {
  return useContext(LangContext);
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border transition-all hover:scale-105"
      style={{
        background: lang === "en" ? "#1B3CC1" : "transparent",
        color: lang === "en" ? "#fff" : "#374151",
        borderColor: lang === "en" ? "#1B3CC1" : "#D1D5DB",
      }}
    >
      <span style={{ fontSize: 14 }}>{lang === "fr" ? "🇫🇷" : "🇬🇧"}</span>
      {lang === "fr" ? "FR" : "EN"}
    </button>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  onClose: () => void;
}

type Mode = "login" | "signup";

export default function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const reset = () => { setError(""); setSuccess(""); };

  const switchMode = (m: Mode) => { setMode(m); reset(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    reset();

    try {
      if (mode === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) { setError(err.message); setLoading(false); return; }
        onClose();
      } else {
        if (!prenom.trim()) { setError("Le prénom est requis."); setLoading(false); return; }
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { prenom: prenom.trim(), nom: nom.trim() } },
        });
        if (err) { setError(err.message); setLoading(false); return; }
        setSuccess("Compte créé ! Vérifiez votre email pour confirmer votre inscription.");
      }
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    }

    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 transition-all placeholder:text-gray-300 bg-white";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* ── En-tête ── */}
        <div className="px-8 pt-8 pb-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span className="text-xl font-black tracking-tight text-gray-900">
            CV<span style={{ color: "#1B3CC1" }}>-DSS</span>
          </span>
          <p className="text-sm text-gray-400 mt-1">
            {mode === "login" ? "Bon retour parmi nous !" : "Créez votre compte gratuit"}
          </p>

          {/* Tabs */}
          <div className="flex mt-5 p-1 bg-gray-100 rounded-xl">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  mode === m ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Formulaire ── */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-3">

          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Prénom *</label>
                <input
                  type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Jean" required className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nom</label>
                <input
                  type="text" value={nom} onChange={(e) => setNom(e.target.value)}
                  placeholder="Dupont" className={inputClass}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@email.com" required className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Mot de passe *</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "signup" ? "8 caractères minimum" : "••••••••"}
              required minLength={mode === "signup" ? 8 : undefined}
              className={inputClass}
            />
          </div>

          {/* Error / Success */}
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}
          {success && (
            <div className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 mt-1"
            style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {mode === "login" ? "Connexion…" : "Création…"}
              </span>
            ) : (
              mode === "login" ? "Se connecter" : "Créer mon compte"
            )}
          </button>

          <p className="text-center text-xs text-gray-400 pt-1">
            {mode === "login" ? (
              <>Pas encore de compte ?{" "}
                <button type="button" onClick={() => switchMode("signup")}
                  className="text-indigo-600 font-semibold hover:underline">
                  Créer un compte
                </button>
              </>
            ) : (
              <>Déjà inscrit ?{" "}
                <button type="button" onClick={() => switchMode("login")}
                  className="text-indigo-600 font-semibold hover:underline">
                  Se connecter
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

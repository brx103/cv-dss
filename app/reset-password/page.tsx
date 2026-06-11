"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Step = "loading" | "form" | "success" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep]         = useState<Step>("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    // Supabase puts tokens in the URL hash: #access_token=...&refresh_token=...&type=recovery
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken  = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type         = params.get("type");

    if (!accessToken || !refreshToken || type !== "recovery") {
      setStep("invalid");
      return;
    }

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error: err }) => {
        if (err) { setStep("invalid"); }
        else      { setStep("form"); }
      })
      .catch(() => setStep("invalid"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) { setError(err.message); setLoading(false); return; }
      setStep("success");
      setTimeout(() => router.replace("/"), 2500);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300/30 focus:border-indigo-400 transition-all placeholder:text-gray-300 bg-white";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 60%,#EDE9FE 100%)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <span className="text-xl font-black tracking-tight text-gray-900">
            CV<span style={{ color: "#1B3CC1" }}>-DSS</span>
          </span>
          <p className="text-sm text-gray-400 mt-1">Réinitialisation du mot de passe</p>
        </div>

        <div className="px-8 pb-8">

          {/* Loading */}
          {step === "loading" && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-8 h-8 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin" />
              <p className="text-sm text-gray-400">Vérification du lien…</p>
            </div>
          )}

          {/* Invalid token */}
          {step === "invalid" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#FEE2E2" }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#DC2626" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Lien invalide ou expiré</p>
                <p className="text-xs text-gray-400 mt-1">Ce lien a déjà été utilisé ou n&apos;est plus valide.</p>
              </div>
              <button
                type="button"
                onClick={() => router.replace("/")}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#1B3CC1" }}
              >
                Retour à l&apos;accueil
              </button>
            </div>
          )}

          {/* Form */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Nouveau mot de passe *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8 caractères minimum"
                  required
                  minLength={8}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Confirmer le mot de passe *
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={inputClass}
                />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                  {error}
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
                    Mise à jour…
                  </span>
                ) : (
                  "Enregistrer le nouveau mot de passe"
                )}
              </button>
            </form>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#DCFCE7" }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#16A34A" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Mot de passe mis à jour !</p>
                <p className="text-xs text-gray-400 mt-1">Redirection en cours…</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

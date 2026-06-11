"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "desousabruno64@gmail.com";

interface AdminStats {
  cvCount: number;
  userCount: number;
  visitsToday: number;
  dailyViews: { date: string; count: number }[];
}

function BarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const W = 480, H = 140, pad = 32, barW = 40, gap = 12;
  const totalW = data.length * (barW + gap) - gap;
  const startX = (W - totalW) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H + pad}`} className="w-full" style={{ maxWidth: W }}>
      {data.map((d, i) => {
        const barH = Math.max(4, Math.round(((d.count) / max) * H));
        const x = startX + i * (barW + gap);
        const y = H - barH;
        const label = new Date(d.date + "T12:00:00Z").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });
        return (
          <g key={d.date}>
            <rect x={x} y={y} width={barW} height={barH} rx={6}
              fill={i === data.length - 1 ? "#1B3CC1" : "#C7D2FE"} />
            <text x={x + barW / 2} y={y - 5} textAnchor="middle"
              fontSize={10} fill="#6B7280" fontWeight={i === data.length - 1 ? "700" : "400"}>
              {d.count > 0 ? d.count : ""}
            </text>
            <text x={x + barW / 2} y={H + 20} textAnchor="middle"
              fontSize={9} fill="#9CA3AF">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-black" style={{ color: "#1B3CC1" }}>
        {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      console.log("User email:", user?.email);

      if (user?.email !== ADMIN_EMAIL) {
        router.replace("/");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });

      if (!res.ok) {
        setError("Erreur lors du chargement des statistiques.");
        setLoading(false);
        return;
      }

      setStats(await res.json());
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Vérification des accès…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95" style={{ backdropFilter: "blur(8px)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black tracking-tight text-gray-900">
              CV<span style={{ color: "#1B3CC1" }}>-DSS</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black text-white" style={{ background: "#1B3CC1" }}>
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{ADMIN_EMAIL}</span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut().then(() => router.replace("/"))}
              className="px-4 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-black text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-sm text-gray-400 mb-8">Statistiques en temps réel de CV-DSS</p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard label="CV générés" value={stats.cvCount} sub="total depuis le lancement" />
          <StatCard label="Utilisateurs inscrits" value={stats.userCount} sub="comptes créés" />
          <StatCard label="Visites aujourd'hui" value={stats.visitsToday} sub="pages vues ce jour" />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 className="text-sm font-black text-gray-900 mb-1">Visites par jour</h2>
          <p className="text-xs text-gray-400 mb-6">7 derniers jours — aujourd&apos;hui en bleu foncé</p>
          <BarChart data={stats.dailyViews} />
        </div>
      </main>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const totalMs = 1500;
    let raf: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / totalMs) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setFadingOut(true);
          setTimeout(onDone, 450);
        }, 120);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0F1F6B 0%, #1B3CC1 35%, #4F46E5 65%, #7C3AED 100%)",
        transition: fadingOut ? "opacity 0.45s ease" : undefined,
        opacity: fadingOut ? 0 : 1,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "-10%", left: "-10%", width: "50vw", height: "50vw", maxWidth: 400, maxHeight: 400,
          background: "radial-gradient(circle, rgba(199,210,254,0.18), transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "-10%", right: "-10%", width: "55vw", height: "55vw", maxWidth: 440, maxHeight: 440,
          background: "radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="splash-logo flex flex-col items-center gap-4 mb-12">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.20)",
          }}
        >
          <svg viewBox="0 0 36 44" className="w-9 h-11" fill="none">
            <rect x="2" y="0" width="32" height="44" rx="4" fill="rgba(255,255,255,0.12)" />
            <rect x="7" y="6" width="14" height="3.5" rx="1.5" fill="white" opacity="0.92" />
            <rect x="7" y="12" width="22" height="2" rx="1" fill="white" opacity="0.55" />
            <rect x="7" y="16" width="17" height="2" rx="1" fill="white" opacity="0.45" />
            <rect x="7" y="21" width="20" height="2" rx="1" fill="white" opacity="0.40" />
            <rect x="7" y="26" width="15" height="2" rx="1" fill="white" opacity="0.35" />
            <rect x="7" y="31" width="22" height="2" rx="1" fill="white" opacity="0.30" />
            <rect x="7" y="37" width="13" height="2" rx="1" fill="white" opacity="0.25" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-5xl font-black text-white tracking-tight leading-none">
            CV<span style={{ color: "#E8C848" }}>-DSS</span>
          </p>
          <p className="text-white/45 text-[11px] font-semibold tracking-[0.35em] uppercase mt-2.5">
            CV professionnel en 3 minutes
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="splash-logo flex flex-col items-center gap-3" style={{ animationDelay: "0.12s" }}>
        <div className="w-48 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #818CF8, #C084FC)",
              transition: "width 0.05s linear",
              boxShadow: "0 0 6px rgba(129,140,248,0.7)",
            }}
          />
        </div>
        <p className="text-white/30 text-xs font-mono tabular-nums">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

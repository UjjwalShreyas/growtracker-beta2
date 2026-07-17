"use client";

import React from "react";

interface Skiper23Props {
  onClick?: () => void;
  label?: string;
}

export function Skiper23({ onClick, label = "Recipes" }: Skiper23Props) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden group rounded-2xl px-8 py-3 font-black text-white uppercase tracking-widest text-sm transition-all"
      style={{
        background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
        boxShadow: "0 10px 20px -10px rgba(78, 205, 196, 0.5)",
        border: "none",
      }}
    >
      <span className="relative z-10">{label}</span>
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          transform: "skewX(-20deg)"
        }}
      />
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%) skewX(-20deg);
          }
        }
      `}</style>
    </button>
  );
}

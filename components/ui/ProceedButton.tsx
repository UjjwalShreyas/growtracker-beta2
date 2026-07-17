"use client";

import React from "react";

interface ProceedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ProceedButton({ children, className = "", ...props }: ProceedButtonProps) {
  return (
    <>
      <style>{`
        .proceed-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 28px;
          height: 48px;
          border: none;
          border-radius: 12px;
          background: #16a34a;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.15s, background 0.2s;
          width: 100%;
        }

        .proceed-btn:hover {
          background: #15803d;
        }

        .proceed-btn:active {
          transform: scale(0.97);
        }

        .proceed-btn:disabled {
          background: #a3a3a3;
          cursor: not-allowed;
          transform: none;
        }

        .proceed-btn svg {
          width: 18px;
          height: 18px;
        }
      `}</style>

      <button className={`proceed-btn ${className}`} {...props}>
        <span>{children}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </>
  );
}

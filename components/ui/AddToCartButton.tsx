"use client";

import React, { useState } from "react";

interface AddToCartButtonProps {
  isAdded: boolean;
  onClick: () => void;
}

export function AddToCartButton({ isAdded, onClick }: AddToCartButtonProps) {
  const [spin, setSpin] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpin(true);
    onClick();
    setTimeout(() => setSpin(false), 350);
  };

  return (
    <>
      <style>{`
        .toggle-cart-btn {
          width: 40px;
          height: 40px;
          border: 2px solid #1A1118;
          border-radius: 12px;
          background: #1A1118;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, box-shadow 0.2s, background-color 0.2s;
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.15);
          padding: 0;
          outline: none;
        }

        .toggle-cart-btn:hover {
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.25);
          transform: translateY(-1px);
        }

        .toggle-cart-btn:active {
          transform: scale(0.93);
        }

        .toggle-cart-btn.added-state {
          background: #fff;
          border: 2px solid #16a34a;
          box-shadow: 2px 2px 0px rgba(22, 163, 74, 0.15);
        }

        .toggle-cart-btn.added-state:hover {
          box-shadow: 3px 3px 0px rgba(22, 163, 74, 0.25);
        }

        .toggle-cart-btn.added-state svg {
          color: #16a34a;
        }

        .toggle-cart-btn svg {
          width: 18px;
          height: 18px;
          color: #e2e8f0;
          display: block;
        }

        @keyframes spinIn {
          from { transform: rotate(-90deg) scale(0.4); opacity: 0; }
          to   { transform: rotate(0deg) scale(1); opacity: 1; }
        }

        .spin-anim {
          animation: spinIn 0.35s cubic-bezier(0, 0, 0, 1.5) forwards;
        }
      `}</style>

      <button
        className={`toggle-cart-btn ${isAdded ? "added-state" : ""}`}
        onClick={handleToggle}
        aria-label="Add to cart"
      >
        <div className={spin ? "spin-anim" : ""}>
          {isAdded ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          )}
        </div>
      </button>
    </>
  );
}

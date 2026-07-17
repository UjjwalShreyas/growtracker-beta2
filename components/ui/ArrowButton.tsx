"use client";

// ArrowButton — animated button from Uiverse.io by satyamchaudharydev
// Customized to fit growtracker's brutalist ink aesthetic

import React from "react";

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function ArrowButton({
  children,
  fullWidth = true,
  className = "",
  ...props
}: ArrowButtonProps) {
  return (
    <>
      <button
        className={`uiverse-arrow-btn ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        <span>{children}</span>
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>

      <style jsx>{`
        /* From Uiverse.io by satyamchaudharydev */
        .uiverse-arrow-btn {
          --primary-color: #1A1118;
          --secondary-color: #fff;
          --hover-color: #2D1D29;
          --arrow-width: 12px;
          --arrow-stroke: 2px;
          box-sizing: border-box;
          border: 2px solid #1A1118;
          border-radius: 14px;
          color: var(--secondary-color);
          padding: 0.85em 1.5em;
          background: var(--primary-color);
          display: flex;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          align-items: center;
          justify-content: center;
          gap: 0.6em;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 3px 3px 0px #1A1118;
        }

        .uiverse-arrow-btn .arrow-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .uiverse-arrow-btn .arrow {
          margin-top: 1px;
          width: var(--arrow-width);
          background: var(--primary-color);
          height: var(--arrow-stroke);
          position: relative;
          transition: 0.2s;
        }

        .uiverse-arrow-btn .arrow::before {
          content: "";
          box-sizing: border-box;
          position: absolute;
          border: solid var(--secondary-color);
          border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
          display: inline-block;
          top: -3px;
          right: 3px;
          transition: 0.2s;
          padding: 3px;
          transform: rotate(-45deg);
        }

        .uiverse-arrow-btn:hover {
          background-color: var(--hover-color);
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #1A1118;
        }

        .uiverse-arrow-btn:hover .arrow {
          background: var(--secondary-color);
        }

        .uiverse-arrow-btn:hover .arrow:before {
          right: 0;
        }

        .uiverse-arrow-btn:active {
          transform: translateY(1px);
          box-shadow: 1px 1px 0px #1A1118;
        }
      `}</style>
    </>
  );
}

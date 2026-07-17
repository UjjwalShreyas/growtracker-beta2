"use client";

import React, { useState } from "react";

interface UiverseScanButtonProps {
  onClick?: () => void;
  label?: string;
  isScanningExternally?: boolean;
  disabled?: boolean;
}

export function UiverseScanButton({ onClick, label = "Scan", isScanningExternally = false, disabled = false }: UiverseScanButtonProps) {
  const [localScanning, setLocalScanning] = useState(false);

  const handleBtnClick = (e: React.MouseEvent) => {
    if (localScanning || isScanningExternally || disabled) return;
    if (onClick) {
      onClick();
    }
  };

  const isScanning = localScanning || isScanningExternally;

  return (
    <>
      <style>{`
        .scan-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 28px;
          height: 48px;
          border: 2px solid #1A1118;
          border-radius: 12px;
          background: #1A1118;
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 4px 4px 0px #1A1118;
          transition: transform 0.15s, background-color 0.2s, box-shadow 0.15s;
        }

        .scan-btn:hover {
          background: #2D1F2A;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #1A1118;
        }

        .scan-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #1A1118;
        }

        .scan-btn:disabled {
          background: #7A6070;
          border-color: #7A6070;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .scan-btn svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s;
        }

        .scan-btn:hover svg {
          transform: scale(1.1);
        }

        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #22d3ee, transparent);
          top: -3px;
          opacity: 0;
        }

        .scan-btn.scanning {
          background: #0e7490 !important;
          border-color: #0891b2 !important;
          box-shadow: none !important;
          transform: none !important;
          cursor: wait;
        }

        .scan-btn.scanning .scan-line {
          animation: sweep 1.2s ease-in-out infinite;
        }

        @keyframes sweep {
          0%   { top: -3px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 3px); opacity: 0; }
        }
      `}</style>

      <button
        className={`scan-btn ${isScanning ? "scanning" : ""}`}
        onClick={handleBtnClick}
        disabled={disabled}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
          <line x1="7" y1="12" x2="17" y2="12" />
        </svg>
        <span>{isScanning ? "Scanning..." : label}</span>
        <div className="scan-line"></div>
      </button>
    </>
  );
}

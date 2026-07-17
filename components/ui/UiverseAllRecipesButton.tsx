"use client";

import React from "react";

interface UiverseAllRecipesButtonProps {
  onClick?: () => void;
  label?: string;
}

export function UiverseAllRecipesButton({ onClick, label = "All Recipes" }: UiverseAllRecipesButtonProps) {
  return (
    <>
      <style>{`
        .btn-dhananjoy {
          border: none;
          color: #fff;
          background-image: linear-gradient(30deg, #0400ff, #4ce3f7);
          border-radius: 20px;
          background-size: 100% auto;
          font-family: inherit;
          font-weight: 800;
          font-size: 15px;
          padding: 0.8em 1.8em;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 15px rgba(4, 0, 255, 0.2);
        }

        .btn-dhananjoy:hover {
          background-position: right center;
          background-size: 200% auto;
          -webkit-animation: pulse512 1.5s infinite;
          animation: pulse512 1.5s infinite;
        }

        @keyframes pulse512 {
          0% {
            box-shadow: 0 0 0 0 rgba(5, 186, 218, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(5, 186, 218, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(5, 186, 218, 0);
          }
        }
      `}</style>
      <button className="btn-dhananjoy" onClick={onClick}>
        {label}
      </button>
    </>
  );
}

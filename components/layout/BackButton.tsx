"use client";

// BackButton — animated back navigation with Uiverse-inspired hover effect.
// Adapted from Uiverse.io by cybrejon — uses a left-pointing arrow SVG
// with a lift + glow hover and press-down active state.

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
}

export function BackButton({ href, onClick }: BackButtonProps = {}) {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };


  return (
    <>
      <button
        onClick={handleBack}
        className="back-btn"
        aria-label="Go back"
      >
        ←
      </button>

      <style jsx>{`
        .back-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          font-size: 1.1rem;
          font-weight: 900;
          color: #1A1118;
          background: rgba(26, 17, 24, 0.06);
          border: 1.5px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: none;
        }

        .back-btn:hover {
          border-color: rgba(26, 17, 24, 0.35);
          background: linear-gradient(
            to bottom,
            rgba(26, 17, 24, 0.04),
            rgba(26, 17, 24, 0.08),
            rgba(26, 17, 24, 0.12)
          );
          box-shadow: 0 4px 0px rgba(26, 17, 24, 0.25);
          transform: translateY(-4px);
          color: #1A1118;
        }

        .back-btn:active {
          transform: translateY(2px);
          box-shadow: none;
          background: rgba(26, 17, 24, 0.1);
          border-color: rgba(26, 17, 24, 0.2);
        }


      `}</style>
    </>
  );
}
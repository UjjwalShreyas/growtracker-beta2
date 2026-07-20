"use client";

// Scan page — 3-step flow: upload → AI scan (fake) → review + confirm.
// All "AI detection" is mocked. TODO: replace setTimeout with real Vision API.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import UploadDropzone from "@/components/scan/UploadDropzone";
import DetectedItemRow from "@/components/scan/DetectedItemRow";
import LoadingState from "@/components/ui/LoadingState";
import { usePantry } from "@/lib/hooks/usePantry";
import { DetectedItem } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { BackButton } from "@/components/layout/BackButton";

type Step = "upload" | "scanning" | "review";

export default function ScanPage() {
  const router = useRouter();
  const { items, addItems, consumeItems } = usePantry();
  const { t } = useLanguage();

  const [step, setStep]                   = useState<Step>("upload");
  const [preview, setPreview]             = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [scanMode, setScanMode]           = useState<"grocery" | "meal" | "medicine">("grocery");

  // Meal scan outputs:
  const [mealName, setMealName] = useState("AI Smart Curry Plate");
  const [macros, setMacros] = useState({ calories: 340, protein: 12, carbs: 42, fat: 10 });
  const [consumedIngredients, setConsumedIngredients] = useState<{ id: string; item_name: string; quantity: number; unit: string }[]>([]);

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const [scanError, setScanError] = useState<string | null>(null);

  const handleStartScan = async () => {
    if (!preview) return;
    setStep("scanning");
    setScanError(null);

    if (scanMode === "grocery" || scanMode === "medicine") {
      try {
        const endpoint = scanMode === "medicine" ? "/api/detect-medicines" : "/api/detect-groceries";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: preview }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Detection failed");
        }

        const detected: DetectedItem[] = (data.items || []).map((item: {
          item_name: string;
          quantity: string;
          category: string;
          expiry_date?: string;
        }) => ({
          id: uuidv4(),
          item_name: item.item_name,
          quantity: item.quantity,
          category: item.category,
          expiry_date: item.expiry_date,
          expiry_predicted: true,
        }));

        setDetectedItems(detected);
        setStep("review");
     } catch (err) {
        console.error(err);
        setScanError("Scan service is busy right now — please wait a moment and try again.");
        setStep("upload");
      }
    } else {
      try {
        const res = await fetch("/api/detect-meal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: preview }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Detection failed");
        }

        setMealName(data.mealName || "Unknown Dish");
        setMacros(data.macros || { calories: 0, protein: 0, carbs: 0, fat: 0 });
        setConsumedIngredients(
          (data.ingredients || []).map((ing: { item_name: string; quantity: number; unit: string }) => ({
            id: uuidv4(),
            item_name: ing.item_name,
            quantity: ing.quantity,
            unit: ing.unit,
          }))
        );
        setStep("review");
      } catch (err) {
        console.error(err);
        setScanError("Couldn't analyze that meal photo. Try a clearer picture.");
        setStep("upload");
      }
    }
  };

  const handleChange = (id: string, field: "item_name" | "quantity" | "expiry_date", value: string) =>
    setDetectedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value, ...(field === "expiry_date" ? { expiry_predicted: false } : {}) }
          : item
      )
    );

  const handleDelete = (id: string) =>
    setDetectedItems((prev) => prev.filter((item) => item.id !== id));

  const handleConfirm = () => {
    if (!detectedItems.length) return;
    const now = new Date().toISOString();
    addItems(
      detectedItems.map((d) => ({
        id: uuidv4(),
        item_name: d.item_name,
        quantity: d.quantity,
        category: d.category,
        added_at: now,
        expiry_date: d.expiry_date,
      }))
    );
    router.push("/dashboard#my-cart");
  };

  const handleMealIngredientQtyChange = (id: string, amount: number) => {
    setConsumedIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id ? { ...ing, quantity: Math.max(0.1, parseFloat((ing.quantity + amount).toFixed(1))) } : ing
      )
    );
  };

  const handleMealIngredientDelete = (id: string) => {
    setConsumedIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleConfirmMeal = () => {
    if (!consumedIngredients.length) return;
    consumeItems(consumedIngredients.map((i) => ({ item_name: i.item_name, quantity: i.quantity })));
    router.push("/dashboard#my-cart");
  };

  const steps: Step[] = ["upload", "scanning", "review"];

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="mb-4">
        <BackButton
          onClick={() => {
            if (step === "review") {
              setStep("upload");
              setPreview(null);
            } else {
              router.push("/dashboard#my-cart");
            }
          }}
        />
      </div>

      {/* ── Step progress ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-7 anim-fade-up">
        {steps.map((s, i) => {
          const done    = steps.indexOf(step) > i;
          const current = step === s;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done    ? "bg-green-100 text-green-700" :
                  current ? "text-white shadow-[0_2px_8px_rgba(22,101,52,0.35)]" :
                            "bg-gray-100 text-gray-400"
                }`}
                style={current ? { background: "var(--green-mid)" } : undefined}
              >
                {done ? "✓" : i + 1}
              </div>
              {i < 2 && <div className={`h-px w-8 transition-colors duration-500 ${done ? "bg-green-300" : "bg-gray-200"}`} />}
            </div>
          );
        })}
        <span className="ml-1 text-xs font-semibold" style={{ color: "var(--muted)" }}>
          {step === "upload" ? t.scanStepUpload : step === "scanning" ? t.scanStepScanning : t.scanStepReview}
        </span>
      </div>

      {/* ── Mode Switcher ─────────────────────────────────────── */}
      {step === "upload" && (
        <div className="flex bg-gray-105 p-1 rounded-xl border-2 border-[#1A1118] shadow-[3px_3px_0px_#1A1118] mb-6">
          <button
            onClick={() => setScanMode("grocery")}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
              scanMode === "grocery"
                ? "bg-[#1A1118] text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            🛒 {t.scanModeGrocery}
          </button>
          <button
            onClick={() => setScanMode("meal")}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
              scanMode === "meal"
                ? "bg-[#1A1118] text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            🍽️ {t.scanModeMeal}
          </button>
          <button
            onClick={() => setScanMode("medicine")}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
              scanMode === "medicine"
                ? "bg-[#1A1118] text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            💊 {t.scanModeMedicine}
          </button>
        </div>
      )}

      {/* ── Step 1: Upload ──────────────────────────────────────── */}
      {step === "upload" && (
        <div className="flex flex-col gap-5 anim-fade-up">
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              {scanMode === "grocery" ? t.scanTitle : scanMode === "medicine" ? t.scanMedicineTitle : t.scanMealTitle}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              {scanMode === "grocery" ? t.scanPickPhotoDesc : scanMode === "medicine" ? t.scanMedicineDesc : t.scanMealDesc}
            </p>
          </div>
          <UploadDropzone onFileSelected={handleFileSelected} preview={preview} />
          {scanError && (
            <div className="p-3 rounded-lg text-xs font-bold text-center" style={{ background: "#FEE2E2", color: "#991B1B", border: "1.5px solid #991B1B" }}>
              {scanError}
            </div>
          )}
          <div className="w-full flex justify-center mt-2">
            <style>{`
              .green-scan-btn {
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
              .green-scan-btn:hover { background: #15803d; }
              .green-scan-btn:active { transform: scale(0.97); }
              .green-scan-btn:disabled {
                background: #a3a3a3;
                cursor: not-allowed;
                transform: none;
              }
              .green-scan-btn svg { width: 18px; height: 18px; }
            `}</style>
            <button
              onClick={handleStartScan}
              disabled={!preview}
              className="green-scan-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                <line x1="7" y1="12" x2="17" y2="12" />
              </svg>
              <span>{preview ? t.scanScanPhotoBtn : t.scanPickFirstBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Scanning ────────────────────────────────────── */}
      {step === "scanning" && (
        <div className="flex flex-col gap-5 anim-fade-in">
          {preview && (
            <div className="relative w-full rounded-2xl max-h-48 overflow-hidden border-2 border-[#1A1118] shadow-[4px_4px_0px_#1A1118]">
              <style>{`
                .laser-line {
                  position: absolute;
                  left: 0;
                  right: 0;
                  height: 4px;
                  background: linear-gradient(90deg, transparent, #22d3ee, #fe53bb, #22d3ee, transparent);
                  box-shadow: 0 0 12px #22d3ee;
                  top: 0;
                  animation: laser-sweep 1.8s ease-in-out infinite;
                }
                @keyframes laser-sweep {
                  0% { top: 0%; opacity: 0.3; }
                  50% { top: 100%; opacity: 1; }
                  100% { top: 0%; opacity: 0.3; }
                }
              `}</style>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Scanning" className="w-full object-cover max-h-48 opacity-80" />
              <div className="laser-line"></div>
            </div>
          )}
          <LoadingState message={scanMode === "grocery" ? t.scanScanningMsg : t.scanMealScanningMsg} />
        </div>
      )}

      {/* ── Step 3: Review ──────────────────────────────────────── */}
      {step === "review" && (
        <div className="flex flex-col gap-4 anim-fade-up">
          {scanMode === "grocery" || scanMode === "medicine" ? (
            <>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">
                  {scanMode === "medicine" ? "Review Detected Medicines 💊" : t.scanReviewTitle}
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {scanMode === "medicine"
                    ? "Check extracted expiry dates and status before adding to your cabinet."
                    : t.scanReviewDesc}
                </p>
              </div>

              {detectedItems.length === 0 ? (
                <div className="card rounded-2xl p-6 text-center border border-amber-100 bg-amber-50">
                  <p className="text-amber-700 font-medium text-sm">{t.scanAllRemovedMsg}</p>
                  <button
                    onClick={() => { setStep("upload"); setPreview(null); }}
                    className="btn btn-ghost rounded-lg px-4 py-1.5 text-sm mt-3 text-amber-700"
                  >
                    {t.scanTryAnotherPhoto}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {detectedItems.map((item) => (
                    <DetectedItemRow
                      key={item.id}
                      item={item}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}

              {detectedItems.length > 0 && (
                <div className="w-full">
                  <style>{`
                    .green-pill-btn {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 100%;
                      height: 48px;
                      background: #14532d;
                      color: #ffffff;
                      font-size: 15px;
                      font-weight: 700;
                      border: none;
                      border-radius: 9999px;
                      cursor: pointer;
                      transition: transform 0.15s, background-color 0.2s, box-shadow 0.2s;
                      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .green-pill-btn:hover {
                      background: #166534;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }
                    .green-pill-btn:active {
                      transform: scale(0.97);
                    }
                  `}</style>
                  <button
                    id="scan-confirm-btn"
                    onClick={handleConfirm}
                    className="green-pill-btn"
                  >
                    {t.scanConfirmBtn(detectedItems.length)}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">{t.scanMealReviewTitle}</h1>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {t.scanMealReviewDesc}
                </p>
              </div>

              {/* Meal card & macros */}
              <div className="card rounded-2xl p-4 border-2 border-[#1A1118] bg-emerald-50/30 shadow-[3px_3px_0px_#1a1118]">
                <h2 className="text-lg font-black text-gray-900 mb-1">🍽️ {mealName}</h2>
                
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <div className="bg-white p-2 rounded-xl border-2 border-[#1A1118] text-center">
                    <div className="text-[9px] text-gray-400 uppercase font-black">{t.scanNutrientsCalories}</div>
                    <div className="text-xs font-black text-gray-800 mt-0.5">{macros.calories}</div>
                    <div className="text-[8px] text-gray-400">kcal</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border-2 border-[#1A1118] text-center">
                    <div className="text-[9px] text-gray-400 uppercase font-black">{t.scanNutrientsProtein}</div>
                    <div className="text-xs font-black text-gray-800 mt-0.5">{macros.protein}g</div>
                    <div className="w-full bg-gray-150 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (macros.protein / 25) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border-2 border-[#1A1118] text-center">
                    <div className="text-[9px] text-gray-400 uppercase font-black">{t.scanNutrientsCarbs}</div>
                    <div className="text-xs font-black text-gray-800 mt-0.5">{macros.carbs}g</div>
                    <div className="w-full bg-gray-150 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, (macros.carbs / 80) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border-2 border-[#1A1118] text-center">
                    <div className="text-[9px] text-gray-400 uppercase font-black">{t.scanNutrientsFat}</div>
                    <div className="text-xs font-black text-gray-800 mt-0.5">{macros.fat}g</div>
                    <div className="w-full bg-gray-150 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${Math.min(100, (macros.fat / 30) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Consumed list */}
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                  Ingredients Eaten
                </h3>
                {consumedIngredients.length === 0 ? (
                  <div className="card rounded-2xl p-6 text-center border border-amber-100 bg-amber-50">
                    <p className="text-amber-700 font-medium text-sm">{t.scanAllRemovedMsg}</p>
                    <button
                      onClick={() => { setStep("upload"); setPreview(null); }}
                      className="btn btn-ghost rounded-lg px-4 py-1.5 text-sm mt-3 text-amber-700"
                    >
                      {t.scanTryAnotherPhoto}
                    </button>
                  </div>
                ) : (
                  consumedIngredients.map((ing) => (
                    <div
                      key={ing.id}
                      className="flex items-center gap-3 p-3 bg-white border-2 border-[#1A1118] rounded-xl shadow-[2px_2px_0px_rgba(26,17,24,0.15)]"
                    >
                      <span className="text-sm font-black text-gray-800 flex-1">{ing.item_name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMealIngredientQtyChange(ing.id, -0.5)}
                          className="w-7 h-7 flex items-center justify-center font-bold bg-gray-100 border border-[#1A1118] hover:bg-gray-200 rounded-lg text-xs transition-all"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-gray-700 w-14 text-center">
                          {ing.quantity} {ing.unit}
                        </span>
                        <button
                          onClick={() => handleMealIngredientQtyChange(ing.id, 0.5)}
                          className="w-7 h-7 flex items-center justify-center font-bold bg-gray-100 border border-[#1A1118] hover:bg-gray-200 rounded-lg text-xs transition-all"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleMealIngredientDelete(ing.id)}
                        className="w-7 h-7 flex items-center justify-center text-red-500 border border-[#1A1118] hover:bg-red-50 rounded-lg transition-all text-xs font-black ml-1"
                        aria-label="Remove ingredient"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {consumedIngredients.length > 0 && (
                <div className="w-full mt-2">
                  <style>{`
                    .green-pill-btn {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 100%;
                      height: 48px;
                      background: #14532d;
                      color: #ffffff;
                      font-size: 15px;
                      font-weight: 700;
                      border: none;
                      border-radius: 9999px;
                      cursor: pointer;
                      transition: transform 0.15s, background-color 0.2s, box-shadow 0.2s;
                      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .green-pill-btn:hover {
                      background: #166534;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }
                    .green-pill-btn:active {
                      transform: scale(0.97);
                    }
                  `}</style>
                  <button
                    onClick={handleConfirmMeal}
                    className="green-pill-btn"
                  >
                    ✓ {t.scanMealConfirmBtn}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

// UploadDropzone — drag-and-drop or click-to-upload area for grocery photos.
// Shows an image preview once the user selects a file.
// Props:
//   onFileSelected: (file: File) => void — called when a valid image file is chosen
//   preview?: string | null              — data URL for showing image preview

import { useRef, useState } from "react";

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  preview?: string | null;
}

export default function UploadDropzone({ onFileSelected, preview }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP…)");
      return;
    }
    setError(null);
    onFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // If a file has been selected, show the image preview instead of the dropzone
  if (preview) {
    return (
      <div className="w-full rounded-2xl overflow-hidden border-2 border-green-300 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt="Selected grocery photo preview"
          className="w-full object-cover max-h-72"
        />
        <p className="text-center text-xs text-gray-500 py-2 bg-green-50">
          📸 Photo selected — ready to scan
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload grocery photo — click or drag and drop"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-4 text-center cursor-pointer transition-all select-none ${
          isDragging
            ? "border-green-500 bg-green-50 scale-[1.01]"
            : "border-gray-300 bg-white hover:border-green-400 hover:bg-green-50"
        } focus:outline-none focus:ring-2 focus:ring-green-400`}
      >
        <span className="text-5xl">📷</span>
        <div>
          <p className="font-semibold text-gray-700">Drop your grocery photo here</p>
          <p className="text-sm text-gray-400 mt-1">
            or tap to browse · camera supported on mobile
          </p>
        </div>
        <span className="text-xs text-gray-300">JPG · PNG · WEBP · up to 10 MB</span>
      </div>

      {/* Hidden file input — capture="environment" opens the rear camera on mobile */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Inline validation error */}
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
    </div>
  );
}

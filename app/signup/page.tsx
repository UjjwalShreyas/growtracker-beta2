"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/hooks/useAuth";
import { BackButton } from "@/components/layout/BackButton";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function SignupPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !name.trim()) {
      setError("Please fill in your name, email, and password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setSubmitting(true);
    const { error } = await signUp(email, password, name);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "#FDF8F0" }}>
      <div className="w-full max-w-sm">
        <div className="mb-4">
          <BackButton />
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.jpg" alt="growtracker logo" className="w-16 h-16 object-contain rounded-full mx-auto mb-2" />
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "#1A1118", letterSpacing: "-0.04em" }}
          >
            {t.signupTitle}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#7A6070" }}>
            {t.signupSubtitle}
          </p>
        </div>

        {error && (
          <div
            className="mb-4 p-3 rounded-lg text-xs font-bold text-center"
            style={{ background: "#FEE2E2", color: "#991B1B", border: "1.5px solid #991B1B" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold mb-1"
              style={{ color: "#1A1118" }}
            >
              {t.signupNameLabel}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm outline-none rounded-lg"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF6EE",
                color: "#1A1118",
              }}
              placeholder={t.signupNamePlaceholder}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-1"
              style={{ color: "#1A1118" }}
            >
              {t.signupEmailLabel}
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm outline-none rounded-lg"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF6EE",
                color: "#1A1118",
              }}
              placeholder={t.signupEmailPlaceholder}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold mb-1"
              style={{ color: "#1A1118" }}
            >
              {t.signupPasswordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm outline-none rounded-lg"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF6EE",
                color: "#1A1118",
              }}
              placeholder={t.signupPasswordPlaceholder}
            />
          </div>

          <div className="pt-2">
            <ArrowButton type="submit" disabled={submitting}>
              {submitting ? "..." : t.signupButton}
            </ArrowButton>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-xs font-bold text-black/40 uppercase tracking-wider">OR</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <button
            type="button"
            onClick={() => alert("Google sign-in coming soon!")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-bold transition hover:opacity-90"
            style={{ background: "#FFFFFF", color: "#1A1118", border: "2px solid #1A1118", boxShadow: "3px 3px 0px #1A1118" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-6" style={{ color: "#7A6070" }}>
          {t.signupHasAccount}{" "}
          <Link
            href="/login"
            className="font-bold underline"
            style={{ color: "#1A1118" }}
          >
            {t.navSignIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
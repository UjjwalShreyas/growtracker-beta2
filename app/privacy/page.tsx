import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FDF8F0", color: "#1A1118" }}>
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition" style={{ background: "#F1E8D9", color: "#1A1118" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-6 text-base leading-relaxed" style={{ color: "#5a4a3a" }}>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-black">1. Information We Collect</h2>
          <p>
            At growtracker, developed under the Osmania Technology Business Incubator (OU Idea Labs Foundation), 
            we collect information you provide directly to us when you create an account, upload pantry items, 
            or interact with our Smart Kitchen Helper services. This may include your name, email address, and 
            details regarding the items in your pantry.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services. Specifically, 
            we use your data to help track your pantry inventory, generate recipes tailored to your ingredients, 
            and send you expiration alerts.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">4. Sharing of Information</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share information 
            only with trusted service providers who assist us in operating our platform, under strict 
            confidentiality agreements.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the Osmania 
            Technology Business Incubator portal.
          </p>
        </div>
      </main>
    </div>
  );
}

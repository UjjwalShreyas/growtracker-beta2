import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function TermsAndConditionsPage() {
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
        <h1 className="text-3xl sm:text-4xl font-black mb-8 tracking-tight">Terms and Conditions</h1>
        
        <div className="space-y-6 text-base leading-relaxed" style={{ color: "#5a4a3a" }}>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-black">1. Acceptance of Terms</h2>
          <p>
            By accessing and using growtracker, a project supported by the Osmania Technology Business Incubator 
            (OU Idea Labs Foundation), you accept and agree to be bound by the terms and provisions of this agreement. 
            If you do not agree to abide by these terms, please do not use this service.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">2. Description of Service</h2>
          <p>
            growtracker provides users with a platform to track pantry inventory, receive expiration notifications, 
            and get AI-driven recipe suggestions based on available ingredients.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">3. User Conduct</h2>
          <p>
            You agree to use our services only for lawful purposes. You are prohibited from violating or attempting 
            to violate the security of the application, including accessing data not intended for your account.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">4. Intellectual Property</h2>
          <p>
            All content, features, and functionality of growtracker, including but not limited to the design, text, 
            graphics, and logos, are the exclusive property of growtracker and its licensors.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">5. Disclaimer of Warranties</h2>
          <p>
            The service is provided on an "as is" and "as available" basis without any warranties of any kind, 
            either express or implied.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any significant changes 
            by updating the date at the top of this page.
          </p>
        </div>
      </main>
    </div>
  );
}

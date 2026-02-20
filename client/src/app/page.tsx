"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center px-10 md:px-16 py-24 bg-white">
        <div className="flex flex-col items-center gap-6 text-center w-full">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
            Verify Academic Certificates with Confidence
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-600 max-w-2xl">
            Upload a certificate and instantly validate its authenticity through
            structured data extraction and secure institutional record matching.
          </p>

          {/* Features */}
          <div className="w-full max-w-xl space-y-4 my-8 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 shrink-0" />
              <p className="text-gray-800">
                Automated data extraction from PDF and image documents
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 shrink-0" />
              <p className="text-gray-800">
                Multi-layer verification against registered institutions
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 shrink-0" />
              <p className="text-gray-800">
                Clear confidence score with validation breakdown
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push("/verify")}
            className="px-8 py-4 rounded-md w-full max-w-sm bg-black text-white hover:bg-black/80 transition font-semibold text-lg"
          >
            Start Verification
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-16">
          <p>Built by Stratify Minds</p>
          <p className="mt-1">Certify AI · Academic Credential Verification</p>
        </div>
      </main>
    </div>
  );
}

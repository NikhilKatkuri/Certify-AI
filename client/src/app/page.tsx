"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">Certify AI</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#team"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#contact"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Authenticity Validator for{" "}
              <span className="text-blue-600">Academia</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered digital Academic Credential Verification System that
              validates academic certificates using AI-assisted analysis and
              secure record matching.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  router.push("/verify");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
              >
                Try Verification
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Problem We Solve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Educational institutions, employers, and public agencies currently
              lack standardized, fast, and reliable mechanisms to verify
              academic credentials.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                Current Challenges
              </h3>
              <ul className="text-red-700 space-y-2">
                <li>
                  • Academic certificate verification is fragmented and manual
                </li>
                <li>• No common verification standard across institutions</li>
                <li>
                  • Fake, altered, or forged certificates often pass initial
                  screening
                </li>
                <li>
                  • Existing digital records are isolated and inaccessible
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Our Solution Impact
              </h3>
              <ul className="text-green-700 space-y-2">
                <li>• Fast, reliable, scalable validation system</li>
                <li>• AI-assisted analysis with confidence scoring</li>
                <li>• Compatible with digital and paper certificates</li>
                <li>
                  • Supports SDG 4 & 16 (Quality Education & Strong
                  Institutions)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Product Cards */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600">
              Advanced AI-powered verification system with comprehensive
              analysis
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                OCR Data Extraction
              </h3>
              <p className="text-gray-600">
                Advanced Tesseract OCR technology extracts key details from
                certificates with high accuracy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Certificate Classification
              </h3>
              <p className="text-gray-600">
                AI classifies certificate types: degrees, memos, courses, and
                skill certifications.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Issuer Verification
              </h3>
              <p className="text-gray-600">
                Verifies issuer authenticity, structure validation, and
                authenticity signals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confidence Scoring
              </h3>
              <p className="text-gray-600">
                Produces confidence-based authenticity scores instead of binary
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Architecture
            </h2>
            <p className="text-lg text-gray-600">
              Built with modern, scalable technologies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Frontend
              </h3>
              <div className="space-y-2 text-gray-600">
                <div>Next.js</div>
                <div>Cloudinary</div>
                <div>Firebase Authentication</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Backend
              </h3>
              <div className="space-y-2 text-gray-600">
                <div>Node.js & Express</div>
                <div>MongoDB</div>
                <div>Role-based Access Control</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Processing
              </h3>
              <div className="space-y-2 text-gray-600">
                <div>Tesseract OCR</div>
                <div>Ollama (Development)</div>
                <div>Gemini API (Production)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Team Stratify Minds
            </h2>
            <p className="text-lg text-gray-600">
              Passionate 2nd year students from Computer Science Department
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">KN</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Katkuri Nikhil
              </h3>
              <p className="text-gray-600 text-sm">2nd yr CSD</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">JJ</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Juturu Joshitha
              </h3>
              <p className="text-gray-600 text-sm">2nd yr CSM</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">KG</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Kurma Ganesh
              </h3>
              <p className="text-gray-600 text-sm">2nd yr CSD</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">KD</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Konda Deekshita
              </h3>
              <p className="text-gray-600 text-sm">2nd yr CSD</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Previous achievements: Smart India Hackathon, Forst Lab (Top-9)
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold mb-4">Certify AI</div>
              <p className="text-gray-400 mb-4">
                Revolutionizing academic credential verification with AI-powered
                authenticity validation. Supporting SDG 4 (Quality Education)
                and SDG 16 (Peace, Justice & Strong Institutions).
              </p>
              <p className="text-gray-400 text-sm">
                HACK YOUR PATH 7.0 - Theme: Open Innovation
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>OCR Data Extraction</li>
                <li>Certificate Classification</li>
                <li>Issuer Verification</li>
                <li>Confidence Scoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>Team: Stratify Minds</p>
                <p>Hackathon: HYP 7.0</p>
                <p>Theme: Open Innovation</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 Certify AI by Stratify Minds. Built for HACK YOUR PATH
              7.0.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

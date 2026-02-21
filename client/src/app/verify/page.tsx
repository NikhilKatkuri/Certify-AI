"use client";

import { useSuper } from "@/provider/Super";
import { Upload } from "lucide-react";
import ProgressLoader from "@/components/ProgressLoader";

export default function Verfiy() {
  const {
    fileInputRef,
    onFileChange,
    handleClick,
    file,
    processImage,
    isProcessing,
    progressSteps,
    score,
    verificationResult,
    getRiskLevel,
    error,
  } = useSuper();

  return (
    <>
      <ProgressLoader
        steps={progressSteps}
        showWhen={isProcessing}
        title="Processing Certificate"
        subtitle="Please wait while we verify your certificate..."
      />

      <div className="flex min-h-screen font-sans items-center justify-center bg-zinc-50 dark:bg-black">
        <main className="flex min-h-screen w-full max-w-2xl flex-col items-center justify-between py-32 px-10 md:px-16 bg-white dark:bg-black sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
            <h1 className="max-w-xs text-3xl  font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Please choose a file to verify your certificate
            </h1>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              onChange={onFileChange}
              type="file"
              accept="image/*"
              className="hidden"
            />

            {/* Upload Button */}
            <button
              onClick={handleClick}
              disabled={isProcessing}
              className="flex flex-col cursor-pointer px-4 lg:px-10 bg-black/5 w-full rounded-xl py-12 items-center text-center justify-center hover:bg-black/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="p-2 rounded-full border border-gray-500 dark:border-gray-600">
                <Upload size={20} className="text-black dark:text-white" />
              </div>

              <h1 className="my-3 font-semibold text-2xl">
                Certificate Verification
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload your certificate image to verify its authenticity using
                AI-powered OCR technology
              </p>

              {file && (
                <p className="mt-3 text-sm text-green-600">
                  Selected: {file.name}
                </p>
              )}
            </button>

            {/* Process Button */}
            <div className="w-full">
              <button
                onClick={processImage}
                disabled={!file || isProcessing}
                className="px-6 py-4 rounded-md cursor-pointer w-full bg-black text-white dark:text-black dark:bg-white hover:bg-black/80 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
              >
                {isProcessing ? "Processing..." : "Process File"}
              </button>
            </div>

            {/* Results Display */}
            {verificationResult && !isProcessing && (
              <div className="w-full mt-6 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                    Verification Complete
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Certificate analysis results
                  </p>
                </div>

                {/* Confidence Score Display */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Confidence Score
                    </span>
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {score === 0 ? "N/A" : `${score}%`}
                    </span>
                  </div>

                  {/* Progress bar for confidence */}
                  {score > 0 && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          score < 40
                            ? "bg-red-600"
                            : score < 70
                              ? "bg-yellow-500"
                              : "bg-green-600"
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Risk Level Badge */}
                  <div className="flex justify-center mt-3">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold text-sm ${getRiskLevel(score).color}`}
                    >
                      {getRiskLevel(score).label}
                    </div>
                  </div>

                  {/* Manual Verification Warning */}
                  {score === 0 && error && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800 font-medium">
                        {error}
                      </p>
                      <p className="text-xs text-amber-700 mt-2">
                        The system was unable to complete automatic
                        verification. Please review the certificate manually or
                        contact support.
                      </p>
                    </div>
                  )}
                </div>

                {/* Verification Details */}
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {verificationResult.issuing_organization && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Institution:
                      </span>
                      <span className="font-medium text-black dark:text-white">
                        {verificationResult.issuing_organization}
                      </span>
                    </div>
                  )}
                  {verificationResult.student_name && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Student:
                      </span>
                      <span className="font-medium text-black dark:text-white">
                        {verificationResult.student_name}
                      </span>
                    </div>
                  )}
                  {verificationResult.course_name && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Course:
                      </span>
                      <span className="font-medium text-black dark:text-white">
                        {verificationResult.course_name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

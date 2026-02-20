"use client";

import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ProgressStep {
  id: string;
  label: string;
  status: "pending" | "running" | "completed" | "error";
  message?: string;
}

interface ProgressLoaderProps {
  steps: ProgressStep[];
  title?: string;
  subtitle?: string;
  showWhen?: boolean;
}

export default function ProgressLoader({
  steps,
  title = "Processing Certificate",
  subtitle = "Please wait while we verify your certificate...",
  showWhen = true,
}: ProgressLoaderProps) {
  if (!showWhen) return null;

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalSteps = steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {completedCount}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 transition"
            >
              {/* Icon */}
              <div className="flex-shrink-0 pt-1">
                {step.status === "completed" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {step.status === "running" && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
                {step.status === "pending" && (
                  <Clock className="w-5 h-5 text-gray-400" />
                )}
                {step.status === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <p
                  className={`text-sm font-semibold ${
                    step.status === "completed"
                      ? "text-green-700 dark:text-green-400"
                      : step.status === "running"
                        ? "text-black dark:text-white"
                        : step.status === "error"
                          ? "text-red-700 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                {step.message && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {step.message}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              {step.status === "running" && (
                <span className="text-xs font-semibold text-black dark:text-white flex-shrink-0">
                  Running...
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Do not refresh or close this window
          </p>
        </div>
      </div>
    </div>
  );
}

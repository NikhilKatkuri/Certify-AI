"use client";

import { useSuper } from "@/provider/Super";
import { Upload } from "lucide-react";
export default function Home() {
  const { fileInputRef, onFileChange, handleClick, file, processImage } =
    useSuper();

  return (
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
            className="flex flex-col cursor-pointer px-4 lg:px-10 bg-black/5 w-full rounded-xl py-12 items-center text-center justify-center hover:bg-black/10 transition"
          >
            <div className="p-2 rounded-full border border-gray-500">
              <Upload size={20} />
            </div>

            <h1 className="my-3 font-semibold text-2xl">
              Certificate Verification
            </h1>

            <p className="text-sm text-gray-500">
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
              className="px-6 py-4 rounded-md cursor-pointer w-full bg-black text-white hover:bg-black/80 transition"
            >
              Process File
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

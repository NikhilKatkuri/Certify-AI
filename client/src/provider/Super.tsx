"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  ChangeEvent,
  useEffect,
} from "react";
import Tesseract from "tesseract.js";
import axios from "axios";

interface SuperContextType {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  processImage: () => Promise<void>;
}

const SuperContext = createContext<SuperContextType | undefined>(undefined);

export const SuperProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const processImage = async () => {
    if (!file) {
      console.log("Please select a file first.");
      return;
    }

    try {
      console.log("Processing file:", file.name);

      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      });

      console.log("Extracted text:", text);
      console.log("OCR Complete! Check console for extracted text.");
      getVerificationResult(text);
    } catch (error) {
      console.error("OCR Error:", error);
      console.log("Error processing image.");
    }
  };

  const getVerificationResult = async (extractedText: string) => {
    const backendURL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    try {
      const format = await axios.post(`${backendURL}/api/v1/challenge/data`, {
        message: extractedText,
        type: "format",
      });
      if (!format) {
        console.log("No response from server.");
        return;
      }
      console.log(
        JSON.stringify(format.data)
          .replaceAll("\\n", "\n")
          .replaceAll('\\"', '"'),
      );
    } catch (error) {
      console.error("Verification Error:", error);
      console.log("Error verifying certificate.");
    }
  };

  return (
    <SuperContext.Provider
      value={{
        file,
        setFile,
        fileInputRef,
        onFileChange,
        handleClick,
        processImage,
      }}
    >
      {children}
    </SuperContext.Provider>
  );
};

export const useSuper = () => {
  const context = useContext(SuperContext);
  if (!context) throw new Error("useSuper must be used within SuperProvider");
  return context;
};

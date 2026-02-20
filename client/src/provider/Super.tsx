"use client";

// React Imports
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  ChangeEvent,
} from "react";

// External Libraries
import Tesseract from "tesseract.js";
import axios from "axios";

// ============================================================================
// Types & Constants
// ============================================================================

interface SuperContextType {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  processImage: () => Promise<void>;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const OCR_LANGUAGE = "eng";
const VERIFICATION_ENDPOINT = "/api/v1/challenge/data";

// ============================================================================
// Context Creation
// ============================================================================

const SuperContext = createContext<SuperContextType | undefined>(undefined);

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Format and parse API response
 */
const formatApiResponse = (response: string): string => {
  return response.replaceAll("\\n", "\n").replaceAll('\\"', '"');
};

/**
 * Send extracted text to backend for verification
 */
const getVerificationResult = async (extractedText: string): Promise<void> => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}${VERIFICATION_ENDPOINT}`,
      {
        message: extractedText,
        type: "format",
      },
    );

    if (!response.data) {
      console.warn("No response from verification server");
      return;
    }

    const formattedResult = formatApiResponse(JSON.stringify(response.data));
    console.log("Verification Result:", formattedResult);
  } catch (error) {
    console.error("Verification Error:", error);
    throw new Error("Failed to verify certificate");
  }
};

/**
 * Extract text from image using OCR
 */
const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const result = await Tesseract.recognize(file, OCR_LANGUAGE, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text from image");
  }
};

// ============================================================================
// Provider Component
// ============================================================================

export const SuperProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection
   */
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFile(files && files.length > 0 ? files[0] : null);
  };

  /**
   * Trigger file input click
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Process uploaded image: OCR -> Verification
   */
  const processImage = async () => {
    if (!file) {
      console.warn("No file selected");
      return;
    }

    try {
      console.log("Processing file:", file.name);

      // Step 1: Extract text from image
      const extractedText = await extractTextFromImage(file);
      console.log("Text extracted successfully");

      // Step 2: Verify with backend
      await getVerificationResult(extractedText);
    } catch (error) {
      console.error("Processing Error:", error);
    }
  };

  // =========================================================================
  // Context Value
  // =========================================================================

  const contextValue: SuperContextType = {
    file,
    setFile,
    fileInputRef,
    onFileChange,
    handleClick,
    processImage,
  };

  return (
    <SuperContext.Provider value={contextValue}>
      {children}
    </SuperContext.Provider>
  );
};

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * Hook to use SuperContext
 */
export const useSuper = () => {
  const context = useContext(SuperContext);
  if (!context) {
    throw new Error("useSuper must be used within SuperProvider");
  }
  return context;
};

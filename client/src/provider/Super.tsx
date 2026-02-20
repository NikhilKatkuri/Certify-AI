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
import { Course, Student, University } from "@/types/db.types";

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
  score: number;
  isProcessing: boolean;
  verificationResult: VerificationResult | null;
  error: string | null;
}

interface VerificationResult {
  document_type?: string;
  issuing_organization?: string;
  organization_type?: string;
  student_name?: string;
  roll_number?: string;
  registration_number?: string;
  course_name?: string;
  degree_name?: string;
  issue_date?: string;
  completion_date?: string;
  grade_or_score?: string;
  certificate_id?: string;
  signatory_name?: string;
  signatory_title?: string;
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
  const [score, setScore] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
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
      setError("No file selected");
      console.warn("No file selected");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log("Processing file:", file.name);

      // Step 1: Extract text from image
      const extractedText = await extractTextFromImage(file);
      console.log("Text extracted successfully");

      // Step 2: Verify with backend
      await getVerificationResult(extractedText);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Processing failed";
      setError(errorMessage);
      console.error("Processing Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * get university
   */
  const getUniversity = async (
    universityName: string,
  ): Promise<University | null> => {
    if (!universityName || universityName.trim() === "") {
      return null;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}${VERIFICATION_ENDPOINT}/university`,
        {
          input: universityName,
        },
      );
      const exists = response.data.exists;
      if (exists) {
        return response.data.university as University;
      }
      console.warn("University not found:", universityName);
      return null;
    } catch (error) {
      console.error("Get University Error:", error);
      return null;
    }
  };

  /**
   * get student
   */
  const getStudent = async ({
    uid,
    name,
  }: {
    uid: string;
    name: string;
  }): Promise<Student | null> => {
    if (!uid || !name || name.trim() === "") {
      return null;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}${VERIFICATION_ENDPOINT}/student`,
        {
          uid: uid,
          name: name,
        },
      );
      const exists = response.data.exists;
      if (exists) {
        return response.data.student as Student;
      }
      console.warn("Student not found:", name);
      return null;
    } catch (error) {
      console.error("Get Student Error:", error);
      return null;
    }
  };

  /**
   * get course
   */
  const getCourse = async ({
    uid,
    sid,
    name,
  }: {
    uid: string;
    sid: string;
    name: string;
  }): Promise<Course | null> => {
    if (!uid || !sid || !name || name.trim() === "") {
      return null;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}${VERIFICATION_ENDPOINT}/course`,
        {
          uid: uid,
          sid: sid,
          courseName: name,
        },
      );

      const exists = response.data.exists;
      if (exists) {
        return response.data.course as Course;
      }

      console.warn("Course not found:", name);
      return null;
    } catch (error) {
      console.error("Get Course Error:", error);
      return null;
    }
  };

  /**
   * Send extracted text to backend for verification
   */

  const getVerificationResult = async (
    extractedText: string,
  ): Promise<number> => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}${VERIFICATION_ENDPOINT}`,
        {
          message: extractedText,
          type: "format",
        },
      );

      if (!response.data) {
        throw new Error("No response from verification server");
      }

      let verificationData = response.data;

      // If response has a 'result' field with string, parse it
      if (typeof verificationData.result === "string") {
        verificationData = JSON.parse(verificationData.result);
      }

      let currentScore = 100;
      setVerificationResult(verificationData);

      // Check university
      const university = await getUniversity(
        verificationData.issuing_organization || "",
      );

      if (!university) {
        currentScore -= 20;
        setError("University not recognized by system");
      }

      // Check student
      const student = await getStudent({
        uid: university?.uid || "",
        name: verificationData.student_name || "",
      });

      if (!student) {
        currentScore -= 20;
        setError("Student not found in university records");
      }

      // Check course
      const course = await getCourse({
        uid: university?.uid || "",
        sid: student?.sid || "",
        name: verificationData.course_name || "",
      });

      if (!course) {
        currentScore -= 20;
        setError("Course not found in student's enrollment");
      }

      setScore(currentScore);
      console.log("Verification Result:", verificationData);
      console.log("Final Score:", currentScore);

      return currentScore;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to verify certificate";
      setError(errorMessage);
      console.error("Verification Error:", err);
      throw new Error(errorMessage);
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
    score,
    isProcessing,
    verificationResult,
    error,
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

"use client";

import { useState, useCallback } from "react";
import { analysisAPI } from "@/lib/api";
import type { AnalysisResult } from "@/lib/api";

interface UseAnalysisReturn {
  analyzing: boolean;
  progress: number;
  result: AnalysisResult | null;
  error: string | null;
  analyzeImage: (file: File) => Promise<void>;
  reset: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = useCallback(async (file: File) => {
    setAnalyzing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      // Simulate progress steps
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const formData = new FormData();
      formData.append("image", file);

      const { data } = await analysisAPI.uploadImage(formData);
      clearInterval(progressInterval);
      setProgress(100);
      setResult(data.analysis);
    } catch (err: any) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnalyzing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return { analyzing, progress, result, error, analyzeImage, reset };
}

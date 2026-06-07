"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Camera, ScanFace, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAnalysis } from "@/hooks/useAnalysis";
import AnalysisResults from "./AnalysisResults";

export default function FaceScanner() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { analyzing, progress, result, error, analyzeImage, reset } = useAnalysis();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleAnalyze = async () => {
    if (file) await analyzeImage(file);
  };

  const handleReset = () => {
    setPreview(null);
    setFile(null);
    reset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card glass glow className="p-8 md:p-12">
              {!preview ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? "border-glow-purple bg-glow-purple/5"
                      : "border-white/20 hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={{ y: isDragActive ? -10 : 0 }}
                    className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-glow-purple/20 to-glow-pink/20 mb-6"
                  >
                    <Upload className="h-10 w-10 text-glow-purple" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {isDragActive ? "Drop your photo here" : "Upload Your Photo"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag & drop or click to select a clear selfie
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      Clear face visible
                    </span>
                    <span>•</span>
                    <span>Good lighting</span>
                    <span>•</span>
                    <span>Max 10MB</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-w-md mx-auto rounded-2xl object-cover"
                    />
                    {analyzing && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="scan-overlay absolute inset-0 face-scan-line" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="glass-strong rounded-2xl p-6 text-center">
                            <ScanFace className="h-12 w-12 text-glow-purple mx-auto mb-3 animate-pulse" />
                            <p className="text-lg font-semibold text-white">AI Analyzing...</p>
                            <div className="mt-3 w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-glow-purple to-glow-pink"
                                animate={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{Math.round(progress)}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleReset}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {!analyzing && (
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={handleReset}>
                        Change Photo
                      </Button>
                      <Button variant="glow" onClick={handleAnalyze} className="gap-2">
                        <ScanFace className="h-5 w-5" />
                        Start Analysis
                      </Button>
                    </div>
                  )}

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ) : (
          <AnalysisResults result={result} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
}

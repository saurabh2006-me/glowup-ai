import { Metadata } from "next";
import FaceScanner from "@/components/analysis/FaceScanner";
import Navbar from "@/components/landing/Navbar";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Face Analysis - GlowUp AI",
  description: "Upload your photo for AI-powered facial analysis and personalized recommendations.",
};

export default function AnalysisPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-glow-purple/30 bg-glow-purple/10 px-4 py-1.5 text-sm font-medium text-glow-purple mb-4">
              <Sparkles className="h-4 w-4" />
              AI Analysis
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Analyze Your <span className="text-gradient">Face</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Upload a clear selfie and let our AI analyze your facial features, skin quality, and overall attractiveness.
            </p>
          </div>
          <FaceScanner />
        </div>
      </div>
    </main>
  );
}

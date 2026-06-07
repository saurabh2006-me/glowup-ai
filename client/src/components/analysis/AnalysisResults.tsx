"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  RotateCcw,
  Sparkles,
  Eye,
  Smile,
  Scissors,
  Droplets,
  Sun,
  Moon,
  Dumbbell,
  Palette,
  ChevronRight,
  Star,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getScoreColor, getScoreBg, getScoreGradient } from "@/lib/utils";
import { ANALYSIS_CATEGORIES } from "@/lib/constants";
import type { AnalysisResult } from "@/lib/api";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  overall: <Star className="h-5 w-5" />,
  symmetry: <Sparkles className="h-5 w-5" />,
  skin: <Droplets className="h-5 w-5" />,
  eyes: <Eye className="h-5 w-5" />,
  jawline: <Sparkles className="h-5 w-5" />,
  hair: <Scissors className="h-5 w-5" />,
  smile: <Smile className="h-5 w-5" />,
  confidence: <TrendingUp className="h-5 w-5" />,
  grooming: <Sparkles className="h-5 w-5" />,
};

export default function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const reportRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: Sparkles },
    { id: "details", label: "Details", icon: Eye },
    { id: "recommendations", label: "Recommendations", icon: TrendingUp },
    { id: "plan", label: "Daily Plan", icon: Sun },
  ];

  const handleExport = async () => {
    // PDF export logic would go here
    alert("PDF export feature - integrate with jspdf");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My GlowUp AI Analysis",
        text: `I scored ${result.overallScore}/10 on GlowUp AI!`,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      ref={reportRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Analysis Results</h2>
          <p className="text-muted-foreground">Generated on {new Date(result.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card glass glow className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Score Circle */}
          <div className="relative">
            <svg className="w-40 h-40 -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 70 * (1 - result.overallScore / 10),
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-5xl font-bold text-gradient"
              >
                {result.overallScore.toFixed(1)}
              </motion.span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 space-y-4">
            <div>
              <Badge variant="glow" className="mb-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Glow Score
              </Badge>
              <h3 className="text-2xl font-bold text-white">
                {result.overallScore >= 8
                  ? "Outstanding!"
                  : result.overallScore >= 6
                  ? "Looking Good"
                  : result.overallScore >= 4
                  ? "Room to Improve"
                  : "Let's Get Started"}
              </h3>
              <p className="text-muted-foreground mt-1">
                Your face shape is <span className="text-white font-medium">{result.faceShape}</span> with{" "}
                <span className="text-white font-medium">{result.skinTone}</span> skin tone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-xl p-3 border ${getScoreBg(result.skin)}`}>
                <p className="text-xs text-muted-foreground">Skin Quality</p>
                <p className={`text-lg font-bold ${getScoreColor(result.skin)}`}>{result.skin}/10</p>
              </div>
              <div className={`rounded-xl p-3 border ${getScoreBg(result.symmetry)}`}>
                <p className="text-xs text-muted-foreground">Symmetry</p>
                <p className={`text-lg font-bold ${getScoreColor(result.symmetry)}`}>{result.symmetry}/10</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-glow-purple to-glow-pink text-white"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ANALYSIS_CATEGORIES.filter((c) => c.key !== "overall").map((cat, i) => {
            const score = (result as any)[cat.key] || 0;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card glass className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${getScoreGradient(score)} flex items-center justify-center text-white`}>
                        {categoryIcons[cat.key]}
                      </div>
                      <span className="font-medium text-white">{cat.label}</span>
                    </div>
                    <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
                  </div>
                  <Progress value={score} max={10} variant="gradient" size="sm" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {score >= 8
                      ? "Excellent - Keep it up!"
                      : score >= 6
                      ? "Good - Small improvements possible"
                      : score >= 4
                      ? "Average - Focus area identified"
                      : "Needs attention - See recommendations"}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {activeTab === "details" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-glow-cyan" />
              Skin Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-muted-foreground">Acne Level</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      result.acneLevel === "Clear"
                        ? "success"
                        : result.acneLevel === "Mild"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {result.acneLevel}
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-muted-foreground">Dark Circles</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      result.darkCircles === "None"
                        ? "success"
                        : result.darkCircles === "Mild"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {result.darkCircles}
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-muted-foreground">Skin Tone</p>
                <p className="text-white font-medium mt-1">{result.skinTone}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-muted-foreground">Face Shape</p>
                <p className="text-white font-medium mt-1">{result.faceShape}</p>
              </div>
            </div>
          </Card>

          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-glow-amber" />
              Areas to Focus On
            </h3>
            <div className="space-y-3">
              {Object.entries({
                symmetry: result.symmetry,
                skin: result.skin,
                eyes: result.eyes,
                jawline: result.jawline,
                hair: result.hair,
                smile: result.smile,
                confidence: result.confidence,
                grooming: result.grooming,
              })
                .sort(([, a], [, b]) => a - b)
                .slice(0, 3)
                .map(([key, score]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${score < 5 ? "bg-red-400" : score < 7 ? "bg-amber-400" : "bg-emerald-400"}`} />
                    <span className="capitalize text-white flex-1">{key}</span>
                    <Badge variant={score < 5 ? "danger" : score < 7 ? "warning" : "success"}>
                      {score}/10
                    </Badge>
                  </div>
                ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === "recommendations" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {result.recommendations?.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card glass className="p-5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    rec.priority === "high"
                      ? "bg-red-500/20 text-red-400"
                      : rec.priority === "medium"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{rec.title}</h4>
                      <Badge
                        variant={
                          rec.priority === "high"
                            ? "danger"
                            : rec.priority === "medium"
                            ? "warning"
                            : "success"
                        }
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <p className="text-xs text-glow-purple mt-1">{rec.category}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )) || (
            <Card glass className="p-8 text-center">
              <Sparkles className="h-12 w-12 text-glow-purple mx-auto mb-4" />
              <p className="text-muted-foreground">No recommendations available. Try analyzing again.</p>
            </Card>
          )}
        </motion.div>
      )}

      {activeTab === "plan" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5 text-glow-amber" />
              Morning Routine
            </h3>
            <div className="space-y-3">
              {[
                "Cleanse face with gentle cleanser",
                "Apply vitamin C serum",
                "Moisturize with SPF 30+",
                "Style hair appropriately",
                "Practice power posing (2 min)",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="h-6 w-6 rounded-full bg-glow-amber/20 flex items-center justify-center text-glow-amber text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-white">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Moon className="h-5 w-5 text-glow-purple" />
              Evening Routine
            </h3>
            <div className="space-y-3">
              {[
                "Double cleanse (oil + water based)",
                "Apply retinol or niacinamide",
                "Eye cream for dark circles",
                "Night moisturizer",
                "Sleep 7-8 hours",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="h-6 w-6 rounded-full bg-glow-purple/20 flex items-center justify-center text-glow-purple text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-white">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-glow-pink" />
              Weekly Goals
            </h3>
            <div className="space-y-3">
              {[
                "3x gym sessions (focus on posture)",
                "2x cardio for face fat reduction",
                "1x facial massage routine",
                "Track water intake (3L daily)",
                "Limit sugar and processed foods",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="h-6 w-6 rounded-full bg-glow-pink/20 flex items-center justify-center text-glow-pink text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-white">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

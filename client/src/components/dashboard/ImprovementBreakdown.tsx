"use client";

import { motion } from "framer-motion";
import { Target, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getScoreColor, getScoreGradient } from "@/lib/utils";

const improvements = [
  { category: "Skin Quality", current: 7.5, previous: 6.8, target: 9.0 },
  { category: "Face Symmetry", current: 7.2, previous: 7.0, target: 8.5 },
  { category: "Eye Area", current: 6.8, previous: 6.5, target: 8.0 },
  { category: "Jawline", current: 7.0, previous: 6.2, target: 8.5 },
  { category: "Hair Health", current: 7.8, previous: 7.5, target: 9.0 },
  { category: "Confidence", current: 8.0, previous: 7.2, target: 9.5 },
];

export default function ImprovementBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card glass className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-glow-pink" />
            Improvement Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 space-y-5">
          {improvements.map((item, i) => {
            const progress = (item.current / item.target) * 100;
            const improvement = item.current - item.previous;
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white">{item.category}</span>
                  <div className="flex items-center gap-2">
                    {improvement > 0 && (
                      <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                        <ArrowUpRight className="h-3 w-3" />
                        +{improvement.toFixed(1)}
                      </span>
                    )}
                    <span className={`text-sm font-bold ${getScoreColor(item.current)}`}>
                      {item.current}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={progress} max={100} variant="gradient" size="sm" />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-white/50"
                    style={{ left: `${(item.previous / item.target) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Previous: {item.previous}</span>
                  <span className="text-xs text-muted-foreground">Target: {item.target}</span>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

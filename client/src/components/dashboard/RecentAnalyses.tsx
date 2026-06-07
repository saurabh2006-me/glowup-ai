"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getScoreColor } from "@/lib/utils";

const recentAnalyses = [
  { id: "1", date: "2026-05-17", score: 7.4, change: +0.2, image: "/api/placeholder/80/80" },
  { id: "2", date: "2026-05-10", score: 7.2, change: +0.3, image: "/api/placeholder/80/80" },
  { id: "3", date: "2026-05-03", score: 6.9, change: +0.1, image: "/api/placeholder/80/80" },
  { id: "4", date: "2026-04-26", score: 6.8, change: -0.1, image: "/api/placeholder/80/80" },
];

export default function RecentAnalyses() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card glass className="p-6">
        <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-glow-cyan" />
            Recent Analyses
          </CardTitle>
          <button className="text-sm text-glow-purple hover:text-glow-pink transition-colors flex items-center gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="px-0 pb-0 space-y-4">
          {recentAnalyses.map((analysis, i) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-glow-purple/30 to-glow-pink/30 flex items-center justify-center shrink-0">
                <span className={`text-lg font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  Analysis #{analysis.id}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(analysis.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className={`h-4 w-4 ${analysis.change > 0 ? "text-emerald-400" : "text-red-400"}`} />
                <span className={`text-sm font-medium ${analysis.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {analysis.change > 0 ? "+" : ""}{analysis.change}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

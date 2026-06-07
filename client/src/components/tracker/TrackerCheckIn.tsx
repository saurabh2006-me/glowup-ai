"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Camera, Flame, Trophy, Droplets, Sun, Dumbbell, Moon, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DAILY_TASKS } from "@/lib/constants";

const taskIcons: Record<string, React.ReactNode> = {
  water: <Droplets className="h-4 w-4" />,
  skincare: <Sun className="h-4 w-4" />,
  exercise: <Dumbbell className="h-4 w-4" />,
  sleep: <Moon className="h-4 w-4" />,
  grooming: <Sparkles className="h-4 w-4" />,
  sunscreen: <Sun className="h-4 w-4" />,
  posture: <Heart className="h-4 w-4" />,
  meditation: <Sparkles className="h-4 w-4" />,
};

const taskColors: Record<string, string> = {
  water: "from-cyan-500 to-blue-500",
  skincare: "from-amber-500 to-orange-500",
  exercise: "from-red-500 to-pink-500",
  sleep: "from-purple-500 to-indigo-500",
  grooming: "from-emerald-500 to-teal-500",
  sunscreen: "from-yellow-500 to-amber-500",
  posture: "from-pink-500 to-rose-500",
  meditation: "from-violet-500 to-purple-500",
};

export default function TrackerCheckIn() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streak, setStreak] = useState(12);
  const [showCelebration, setShowCelebration] = useState(false);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newTasks = prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];

      if (newTasks.length === DAILY_TASKS.length && prev.length !== DAILY_TASKS.length) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      return newTasks;
    });
  };

  const progress = (completedTasks.length / DAILY_TASKS.length) * 100;
  const totalPoints = completedTasks.reduce((sum, id) => {
    const task = DAILY_TASKS.find((t) => t.id === id);
    return sum + (task?.points || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="glass-strong rounded-3xl p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
              >
                <Trophy className="h-16 w-16 text-glow-amber mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gradient">All Tasks Complete!</h3>
                <p className="text-muted-foreground mt-2">Amazing work today! Keep the streak alive.</p>
                <div className="mt-4 text-3xl font-bold text-glow-amber">+{totalPoints} pts</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass glow className="p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Today's Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedTasks.length} of {DAILY_TASKS.length} tasks completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">{streak}</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
          </div>
          <Progress value={progress} max={100} variant="glow" size="lg" showValue />
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Daily Goal</span>
            <span className="text-glow-purple font-medium">{totalPoints} / 110 points</span>
          </div>
        </Card>

        <Card glass className="p-5 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-glow-amber to-orange-500 flex items-center justify-center mb-3">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-semibold text-white">Progress Photo</h4>
          <p className="text-xs text-muted-foreground text-center mt-1 mb-3">
            Take a daily selfie to track changes
          </p>
          <Button variant="outline" size="sm" className="gap-2">
            <Camera className="h-4 w-4" />
            Upload
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DAILY_TASKS.map((task, i) => {
          const isCompleted = completedTasks.includes(task.id);
          return (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleTask(task.id)}
              className={`relative p-5 rounded-2xl border transition-all duration-300 text-left ${
                isCompleted
                  ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
                  : "glass hover:bg-white/10 border-white/10"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${taskColors[task.id]} flex items-center justify-center text-white`}>
                  {taskIcons[task.id]}
                </div>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-white/30"
                }`}>
                  {isCompleted && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
              <h4 className={`font-medium text-sm ${isCompleted ? "text-emerald-400 line-through" : "text-white"}`}>
                {task.label}
              </h4>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={isCompleted ? "success" : "outline"} className="text-xs">
                  +{task.points} pts
                </Badge>
                <span className="text-xs text-muted-foreground capitalize">{task.category}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <Card glass className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-glow-purple" />
            Today's Improvement Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Hydration Boost",
                tip: "Drink a glass of water right after waking up to kickstart metabolism and reduce puffiness.",
                icon: <Droplets className="h-5 w-5 text-cyan-400" />,
              },
              {
                title: "Posture Power",
                tip: "Set a timer every 30 minutes to check your posture. Shoulders back, chin up!",
                icon: <Heart className="h-5 w-5 text-pink-400" />,
              },
              {
                title: "Skin Glow Secret",
                tip: "Apply sunscreen even on cloudy days. UV rays penetrate clouds and cause premature aging.",
                icon: <Sun className="h-5 w-5 text-amber-400" />,
              },
              {
                title: "Confidence Hack",
                tip: "Practice the 'power pose' for 2 minutes before important moments. It boosts testosterone and reduces cortisol.",
                icon: <Sparkles className="h-5 w-5 text-purple-400" />,
              },
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex gap-3 p-4 rounded-xl bg-white/5"
              >
                <div className="shrink-0 mt-0.5">{tip.icon}</div>
                <div>
                  <h5 className="font-medium text-white text-sm">{tip.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tip.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

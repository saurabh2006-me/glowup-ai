"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import TrackerCheckIn from "@/components/tracker/TrackerCheckIn";
import StreakCalendar from "@/components/tracker/StreakCalendar";

export default function TrackerPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-glow-amber to-orange-500 flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Daily Tracker</h1>
                <p className="text-sm text-muted-foreground">Build habits, track progress, glow up daily</p>
              </div>
            </div>
          </motion.div>

          <TrackerCheckIn />

          <div className="mt-6">
            <StreakCalendar />
          </div>
        </div>
      </div>
    </main>
  );
}

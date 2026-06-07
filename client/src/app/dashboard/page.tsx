"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ProgressChart from "@/components/dashboard/ProgressChart";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import ImprovementBreakdown from "@/components/dashboard/ImprovementBreakdown";

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-glow-purple to-glow-pink flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Track your glow-up journey</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <DashboardStats />

          {/* Charts & Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <ProgressChart />
            </div>
            <div>
              <RecentAnalyses />
            </div>
          </div>

          <div className="mt-6">
            <ImprovementBreakdown />
          </div>
        </div>
      </div>
    </main>
  );
}

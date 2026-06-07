"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Award, Flame, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  improved?: boolean;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

function StatCard({ title, value, change, improved, icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card glass className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {change && (
              <div className={`flex items-center gap-1 mt-1 text-sm ${improved ? "text-emerald-400" : "text-red-400"}`}>
                {improved ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {change}
              </div>
            )}
          </div>
          <div className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center text-white`}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Current Score"
        value="7.4"
        change="+0.8 this week"
        improved={true}
        icon={<Activity className="h-5 w-5" />}
        color="bg-gradient-to-br from-glow-purple to-glow-pink"
        delay={0}
      />
      <StatCard
        title="Best Score"
        value="8.1"
        change="Achieved 3 days ago"
        icon={<Award className="h-5 w-5" />}
        color="bg-gradient-to-br from-amber-500 to-orange-500"
        delay={0.1}
      />
      <StatCard
        title="Current Streak"
        value="12 days"
        change="Personal best!"
        improved={true}
        icon={<Flame className="h-5 w-5" />}
        color="bg-gradient-to-br from-red-500 to-pink-500"
        delay={0.2}
      />
      <StatCard
        title="Total Analyses"
        value="24"
        change="+3 this month"
        improved={true}
        icon={<BarChart3 className="h-5 w-5" />}
        color="bg-gradient-to-br from-emerald-500 to-teal-500"
        delay={0.3}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Flame, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const generateCalendarData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const day = date.getDate();
    const isToday = i === 0;
    const checkedIn = Math.random() > 0.3 || isToday;
    const allTasks = checkedIn && Math.random() > 0.4;
    data.push({ day, checkedIn, allTasks, isToday });
  }
  return data;
};

export default function StreakCalendar() {
  const calendarData = generateCalendarData();
  const streak = 12;
  const totalCheckins = calendarData.filter((d) => d.checkedIn).length;

  return (
    <Card glass className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            Check-in Calendar
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              <span className="text-white font-bold">{totalCheckins}</span>/30 days
            </span>
            <span className="text-orange-400 font-bold flex items-center gap-1">
              <Flame className="h-4 w-4" />
              {streak} streak
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-10 gap-2">
          {calendarData.map((day, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                day.isToday
                  ? "ring-2 ring-glow-purple bg-glow-purple/30 text-white"
                  : day.allTasks
                  ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/30 text-emerald-400"
                  : day.checkedIn
                  ? "bg-white/10 text-white/70"
                  : "bg-white/5 text-white/30"
              }`}
              title={day.isToday ? "Today" : day.checkedIn ? "Checked in" : "Missed"}
            >
              {day.allTasks ? <Check className="h-3 w-3" /> : day.day}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-gradient-to-br from-emerald-500/30 to-teal-500/30" />
            <span>All tasks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-white/10" />
            <span>Partial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-white/5" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded ring-1 ring-glow-purple bg-glow-purple/30" />
            <span>Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

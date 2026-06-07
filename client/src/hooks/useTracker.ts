"use client";

import { useState, useEffect, useCallback } from "react";
import { trackerAPI } from "@/lib/api";
import type { CheckIn } from "@/lib/api";

interface UseTrackerReturn {
  todayCheckIn: CheckIn | null;
  streak: number;
  loading: boolean;
  checkIn: (tasks: string[], photo?: string, notes?: string) => Promise<void>;
  refresh: () => void;
}

export function useTracker(): UseTrackerReturn {
  const [todayCheckIn, setTodayCheckIn] = useState<CheckIn | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [todayRes, streakRes] = await Promise.all([
        trackerAPI.getToday(),
        trackerAPI.getStreak(),
      ]);
      setTodayCheckIn(todayRes.data.checkIn);
      setStreak(streakRes.data.streak);
    } catch (err) {
      console.error("Tracker fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const checkIn = useCallback(async (tasks: string[], photo?: string, notes?: string) => {
    const { data } = await trackerAPI.checkIn({ tasks, photo, notes });
    setTodayCheckIn(data.checkIn);
    setStreak(data.streak);
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { todayCheckIn, streak, loading, checkIn, refresh };
}

import { Router } from "express";
import Analysis from "../models/Analysis";
import CheckIn from "../models/CheckIn";
import { protect } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get(
  "/stats",
  protect,
  asyncHandler(async (req: any, res) => {
    const userId = req.user._id;

    const totalAnalyses = await Analysis.countDocuments({ userId });
    const latestAnalysis = await Analysis.findOne({ userId }).sort({ createdAt: -1 });
    const bestAnalysis = await Analysis.findOne({ userId }).sort({ overallScore: -1 });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyCheckIns = await CheckIn.find({
      userId,
      date: { $gte: thirtyDaysAgo },
    });

    res.json({
      success: true,
      stats: {
        totalAnalyses,
        currentScore: latestAnalysis?.overallScore || 0,
        bestScore: bestAnalysis?.overallScore || 0,
        streak: req.user.streak,
        monthlyCheckIns: monthlyCheckIns.length,
        improvement: latestAnalysis && bestAnalysis
          ? Number((latestAnalysis.overallScore - (bestAnalysis.overallScore * 0.8)).toFixed(1))
          : 0,
      },
    });
  })
);

// @route   GET /api/dashboard/recent
// @desc    Get recent activity
// @access  Private
router.get(
  "/recent",
  protect,
  asyncHandler(async (req: any, res) => {
    const userId = req.user._id;

    const recentAnalyses = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("overallScore createdAt imageUrl");

    const recentCheckIns = await CheckIn.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .select("date score tasksCompleted");

    res.json({
      success: true,
      recentAnalyses,
      recentCheckIns,
    });
  })
);

// @route   GET /api/dashboard/improvement
// @desc    Get improvement data for charts
// @access  Private
router.get(
  "/improvement",
  protect,
  asyncHandler(async (req: any, res) => {
    const userId = req.user._id;

    const twelveWeeksAgo = new Date();
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);

    const analyses = await Analysis.find({
      userId,
      createdAt: { $gte: twelveWeeksAgo },
    })
      .sort({ createdAt: 1 })
      .select("overallScore symmetry skin eyes jawline hair smile confidence grooming createdAt");

    // Group by week
    const weeklyData: any[] = [];
    analyses.forEach((analysis) => {
      const week = Math.floor(
        (analysis.createdAt.getTime() - twelveWeeksAgo.getTime()) / (7 * 24 * 60 * 60 * 1000)
      );
      if (!weeklyData[week]) {
        weeklyData[week] = { scores: [], week: week + 1 };
      }
      weeklyData[week].scores.push(analysis.overallScore);
    });

    const chartData = weeklyData
      .filter((w) => w)
      .map((w) => ({
        week: `W${w.week}`,
        score: Number((w.scores.reduce((a: number, b: number) => a + b, 0) / w.scores.length).toFixed(1)),
      }));

    res.json({
      success: true,
      chartData,
      categoryBreakdown: {
        symmetry: analyses.length > 0 ? analyses[analyses.length - 1].symmetry : 0,
        skin: analyses.length > 0 ? analyses[analyses.length - 1].skin : 0,
        eyes: analyses.length > 0 ? analyses[analyses.length - 1].eyes : 0,
        jawline: analyses.length > 0 ? analyses[analyses.length - 1].jawline : 0,
        hair: analyses.length > 0 ? analyses[analyses.length - 1].hair : 0,
        smile: analyses.length > 0 ? analyses[analyses.length - 1].smile : 0,
        confidence: analyses.length > 0 ? analyses[analyses.length - 1].confidence : 0,
        grooming: analyses.length > 0 ? analyses[analyses.length - 1].grooming : 0,
      },
    });
  })
);

export default router;

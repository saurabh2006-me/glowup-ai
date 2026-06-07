import { Router } from "express";
import CheckIn from "../models/CheckIn";
import User from "../models/User";
import { protect } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// @route   GET /api/tracker/today
// @desc    Get today's check-in
// @access  Private
router.get(
  "/today",
  protect,
  asyncHandler(async (req: any, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = await CheckIn.findOne({
      userId: req.user._id,
      date: today,
    });

    res.json({
      success: true,
      checkIn: checkIn || null,
    });
  })
);

// @route   POST /api/tracker/checkin
// @desc    Submit daily check-in
// @access  Private
router.post(
  "/checkin",
  protect,
  asyncHandler(async (req: any, res) => {
    const { tasks, photo, notes } = req.body;
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate score
    const taskPoints: Record<string, number> = {
      water: 10,
      skincare: 15,
      exercise: 20,
      sleep: 15,
      grooming: 10,
      sunscreen: 10,
      posture: 10,
      meditation: 10,
    };

    const score = tasks.reduce((sum: number, taskId: string) => {
      return sum + (taskPoints[taskId] || 0);
    }, 0);

    // Upsert check-in
    const checkIn = await CheckIn.findOneAndUpdate(
      { userId, date: today },
      {
        tasksCompleted: tasks,
        totalTasks: 8,
        photo,
        notes,
        score,
      },
      { upsert: true, new: true }
    );

    // Update streak
    const user = await User.findById(userId);
    let newStreak = user?.streak || 0;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayCheckIn = await CheckIn.findOne({
      userId,
      date: yesterday,
    });

    if (yesterdayCheckIn || newStreak === 0) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    await User.findByIdAndUpdate(userId, {
      streak: newStreak,
      lastCheckIn: today,
    });

    res.json({
      success: true,
      checkIn,
      streak: newStreak,
      pointsEarned: score,
    });
  })
);

// @route   GET /api/tracker/streak
// @desc    Get current streak
// @access  Private
router.get(
  "/streak",
  protect,
  asyncHandler(async (req: any, res) => {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      streak: user?.streak || 0,
      lastCheckIn: user?.lastCheckIn,
    });
  })
);

// @route   GET /api/tracker/history
// @desc    Get check-in history
// @access  Private
router.get(
  "/history",
  protect,
  asyncHandler(async (req: any, res) => {
    const { range = "30" } = req.query;
    const days = parseInt(range as string);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const history = await CheckIn.find({
      userId: req.user._id,
      date: { $gte: startDate },
    }).sort({ date: -1 });

    res.json({
      success: true,
      history,
    });
  })
);

// @route   GET /api/tracker/progress
// @desc    Get overall progress stats
// @access  Private
router.get(
  "/progress",
  protect,
  asyncHandler(async (req: any, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const checkIns = await CheckIn.find({
      userId: req.user._id,
      date: { $gte: thirtyDaysAgo },
    });

    const totalTasks = checkIns.reduce((sum, ci) => sum + ci.totalTasks, 0);
    const completedTasks = checkIns.reduce((sum, ci) => sum + ci.tasksCompleted.length, 0);
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.json({
      success: true,
      stats: {
        totalCheckIns: checkIns.length,
        completionRate: Math.round(completionRate),
        averageScore: checkIns.length > 0
          ? Math.round(checkIns.reduce((sum, ci) => sum + ci.score, 0) / checkIns.length)
          : 0,
        currentStreak: req.user.streak,
      },
    });
  })
);

export default router;

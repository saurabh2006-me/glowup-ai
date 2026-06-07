import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { protect } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// Generate JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists with this email" });
      return;
    }

    // Create user
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        streak: user.streak,
        totalAnalyses: user.totalAnalyses,
        bestScore: user.bestScore,
      },
    });
  })
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please provide email and password" });
      return;
    }

    // Find user with password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        streak: user.streak,
        totalAnalyses: user.totalAnalyses,
        bestScore: user.bestScore,
      },
    });
  })
);

// @route   POST /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.post(
  "/google",
  asyncHandler(async (req, res) => {
    const { token, name, email, avatar, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
        googleId,
        password: undefined,
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        streak: user.streak,
        totalAnalyses: user.totalAnalyses,
        bestScore: user.bestScore,
      },
    });
  })
);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req: any, res) => {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
        plan: user?.plan,
        streak: user?.streak,
        totalAnalyses: user?.totalAnalyses,
        bestScore: user?.bestScore,
        createdAt: user?.createdAt,
      },
    });
  })
);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  protect,
  asyncHandler(async (req: any, res) => {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    res.json({
      success: true,
      user: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
        plan: user?.plan,
      },
    });
  })
);

export default router;

import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import Analysis from "../models/Analysis";
import User from "../models/User";
import { protect } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// AI Analysis simulation function
const simulateAnalysis = (imageUrl: string) => {
  // In production, this would use face-api.js, TensorFlow.js, or call an AI service
  const scores = {
    overallScore: Number((Math.random() * 3 + 5).toFixed(1)),
    symmetry: Number((Math.random() * 3 + 5).toFixed(1)),
    skin: Number((Math.random() * 3 + 5).toFixed(1)),
    eyes: Number((Math.random() * 3 + 5).toFixed(1)),
    jawline: Number((Math.random() * 3 + 5).toFixed(1)),
    hair: Number((Math.random() * 3 + 5).toFixed(1)),
    smile: Number((Math.random() * 3 + 5).toFixed(1)),
    confidence: Number((Math.random() * 3 + 5).toFixed(1)),
    grooming: Number((Math.random() * 3 + 5).toFixed(1)),
  };

  const skinTones = ["Very Fair", "Fair", "Light", "Medium", "Olive", "Tan", "Dark", "Very Dark"];
  const faceShapes = ["Oval", "Round", "Square", "Rectangular", "Heart", "Diamond", "Triangle"];
  const acneLevels = ["Clear", "Mild", "Moderate", "Severe"];
  const darkCircleLevels = ["None", "Mild", "Moderate", "Severe"];

  const recommendations = [
    {
      category: "Skincare",
      title: "Improve Skin Hydration",
      description: "Your skin quality score suggests you could benefit from a more consistent moisturizing routine. Try using a hyaluronic acid serum twice daily.",
      priority: scores.skin < 6 ? "high" : "medium" as "high" | "medium" | "low",
    },
    {
      category: "Grooming",
      title: "Optimize Facial Hair",
      description: "Based on your face shape, a short beard or stubble would complement your jawline well. Consider trimming to 3-5mm for best results.",
      priority: "medium" as "high" | "medium" | "low",
    },
    {
      category: "Fitness",
      title: "Jawline Definition",
      description: "Incorporate neck curls and chin lifts into your daily routine. Also consider reducing overall body fat percentage through cardio.",
      priority: scores.jawline < 6 ? "high" : "medium" as "high" | "medium" | "low",
    },
    {
      category: "Sleep",
      title: "Reduce Dark Circles",
      description: "Your eye area analysis shows mild dark circles. Aim for 7-9 hours of sleep and try a caffeine-based eye cream in the morning.",
      priority: "medium" as "high" | "medium" | "low",
    },
    {
      category: "Confidence",
      title: "Power Posing Practice",
      description: "Practice standing tall with shoulders back for 2 minutes before important events. This boosts testosterone and reduces cortisol levels.",
      priority: "low" as "high" | "medium" | "low",
    },
  ];

  return {
    ...scores,
    imageUrl,
    skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
    faceShape: faceShapes[Math.floor(Math.random() * faceShapes.length)],
    acneLevel: acneLevels[Math.floor(Math.random() * acneLevels.length)],
    darkCircles: darkCircleLevels[Math.floor(Math.random() * darkCircleLevels.length)],
    recommendations,
  };
};

// @route   POST /api/analysis/upload
// @desc    Upload image and analyze face
// @access  Private

router.post(
  "/upload",
  upload.single("image"),
  asyncHandler(async (req: any, res) => {
    if (!req.file) {
      res.status(400).json({ message: "Please upload an image" });
      return;
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "glowup_ai/analyses", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // Run AI analysis
    const analysisData = simulateAnalysis(imageUrl);

    // Temporary: Skip database save during testing
console.log("Analysis generated:", analysisData);

    res.status(201).json({
  success: true,
  analysis: analysisData,
});
  })
);

// @route   GET /api/analysis/history
// @desc    Get user's analysis history
// @access  Private
router.get(
  "/history",
  protect,
  asyncHandler(async (req: any, res) => {
    const analyses = await Analysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: analyses.length,
      analyses,
    });
  })
);

// @route   GET /api/analysis/:id
// @desc    Get single analysis by ID
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req: any, res) => {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      res.status(404).json({ message: "Analysis not found" });
      return;
    }

    res.json({
      success: true,
      analysis,
    });
  })
);

// @route   DELETE /api/analysis/:id
// @desc    Delete an analysis
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req: any, res) => {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      res.status(404).json({ message: "Analysis not found" });
      return;
    }

    // Delete from Cloudinary
    try {
      const publicId = analysis.imageUrl.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`glowup_ai/analyses/${publicId}`);
      }
    } catch (err) {
      console.error("Cloudinary delete error:", err);
    }

    res.json({ success: true, message: "Analysis deleted" });
  })
);

export default router;

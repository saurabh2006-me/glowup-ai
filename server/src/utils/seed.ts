import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Analysis from "../models/Analysis";
import CheckIn from "../models/CheckIn";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/glowup_ai");
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Analysis.deleteMany({});
    await CheckIn.deleteMany({});

    // Create demo user
    const demoUser = await User.create({
      name: "Demo User",
      email: "demo@glowup.ai",
      password: "demo123456",
      plan: "pro",
      streak: 12,
      totalAnalyses: 24,
      bestScore: 8.1,
    });

    console.log("Demo user created:", demoUser.email);

    // Create sample analyses
    const analyses = [];
    for (let i = 0; i < 12; i++) {
      const baseScore = 5.2 + i * 0.2;
      analyses.push({
        userId: demoUser._id,
        imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        overallScore: Number(baseScore.toFixed(1)),
        symmetry: Number((Math.random() * 3 + 5).toFixed(1)),
        skin: Number((Math.random() * 3 + 5).toFixed(1)),
        eyes: Number((Math.random() * 3 + 5).toFixed(1)),
        jawline: Number((Math.random() * 3 + 5).toFixed(1)),
        hair: Number((Math.random() * 3 + 5).toFixed(1)),
        smile: Number((Math.random() * 3 + 5).toFixed(1)),
        confidence: Number((Math.random() * 3 + 5).toFixed(1)),
        grooming: Number((Math.random() * 3 + 5).toFixed(1)),
        skinTone: ["Fair", "Medium", "Olive", "Tan"][Math.floor(Math.random() * 4)],
        faceShape: ["Oval", "Round", "Square", "Rectangular"][Math.floor(Math.random() * 4)],
        acneLevel: ["Clear", "Mild", "Moderate"][Math.floor(Math.random() * 3)],
        darkCircles: ["None", "Mild", "Moderate"][Math.floor(Math.random() * 3)],
        recommendations: [
          {
            category: "Skincare",
            title: "Improve Skin Hydration",
            description: "Use hyaluronic acid serum twice daily.",
            priority: "high" as "high" | "medium" | "low",
          },
        ],
        createdAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000),
      });
    }

    await Analysis.insertMany(analyses);
    console.log("Sample analyses created");

    // Create sample check-ins
    const checkIns = [];
    for (let i = 0; i < 30; i++) {
      const tasks = ["water", "skincare", "exercise", "sleep", "grooming"];
      if (Math.random() > 0.3) {
        checkIns.push({
          userId: demoUser._id,
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          tasksCompleted: tasks.slice(0, Math.floor(Math.random() * tasks.length) + 1),
          totalTasks: 8,
          score: Math.floor(Math.random() * 60) + 40,
        });
      }
    }

    await CheckIn.insertMany(checkIns);
    console.log("Sample check-ins created");

    console.log("\n✅ Database seeded successfully!");
    console.log("Demo credentials: demo@glowup.ai / demo123456");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();

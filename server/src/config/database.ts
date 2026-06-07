import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/glowup_ai";

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Attempting to reconnect...");
});

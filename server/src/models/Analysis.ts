import mongoose, { Schema, Document } from "mongoose";

export interface IRecommendation {
  category: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  overallScore: number;
  symmetry: number;
  skin: number;
  eyes: number;
  jawline: number;
  hair: number;
  smile: number;
  confidence: number;
  grooming: number;
  skinTone: string;
  faceShape: string;
  acneLevel: string;
  darkCircles: string;
  recommendations: IRecommendation[];
  createdAt: Date;
}

const RecommendationSchema = new Schema<IRecommendation>({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
});

const AnalysisSchema = new Schema<IAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    overallScore: { type: Number, min: 1, max: 10, required: true },
    symmetry: { type: Number, min: 1, max: 10, default: 5 },
    skin: { type: Number, min: 1, max: 10, default: 5 },
    eyes: { type: Number, min: 1, max: 10, default: 5 },
    jawline: { type: Number, min: 1, max: 10, default: 5 },
    hair: { type: Number, min: 1, max: 10, default: 5 },
    smile: { type: Number, min: 1, max: 10, default: 5 },
    confidence: { type: Number, min: 1, max: 10, default: 5 },
    grooming: { type: Number, min: 1, max: 10, default: 5 },
    skinTone: { type: String, default: "Medium" },
    faceShape: { type: String, default: "Oval" },
    acneLevel: { type: String, default: "Mild" },
    darkCircles: { type: String, default: "Mild" },
    recommendations: [RecommendationSchema],
  },
  { timestamps: true }
);

// Index for faster queries
AnalysisSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IAnalysis>("Analysis", AnalysisSchema);

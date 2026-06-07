export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "pro" | "elite";
  createdAt: string;
  streak: number;
  totalAnalyses: number;
  bestScore: number;
}

export interface AnalysisResult {
  _id: string;
  userId: string;
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
  recommendations: Recommendation[];
  createdAt: string;
}

export interface Recommendation {
  category: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface CheckIn {
  _id: string;
  date: string;
  tasksCompleted: string[];
  totalTasks: number;
  photo?: string;
  notes?: string;
  score: number;
}

export interface ChatMessage {
  _id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

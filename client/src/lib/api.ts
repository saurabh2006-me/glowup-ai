import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  googleLogin: (token: string) =>
    api.post("/auth/google", { token }),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data: Partial<User>) => api.put("/auth/profile", data),
};

// Analysis APIs
export const analysisAPI = {
  uploadImage: (formData: FormData) =>
    api.post("/analysis/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getAnalysis: (id: string) => api.get(`/analysis/${id}`),
  getHistory: () => api.get("/analysis/history"),
  deleteAnalysis: (id: string) => api.delete(`/analysis/${id}`),
};

// Tracker APIs
export const trackerAPI = {
  getToday: () => api.get("/tracker/today"),
  checkIn: (data: { tasks: string[]; photo?: string; notes?: string }) =>
    api.post("/tracker/checkin", data),
  getStreak: () => api.get("/tracker/streak"),
  getHistory: (range?: string) =>
    api.get(`/tracker/history${range ? `?range=${range}` : ""}`),
  getProgress: () => api.get("/tracker/progress"),
};

// Chat APIs
export const chatAPI = {
  sendMessage: (message: string, context?: string) =>
    api.post("/chat/message", { message, context }),
  getHistory: () => api.get("/chat/history"),
  clearHistory: () => api.delete("/chat/history"),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getRecent: () => api.get("/dashboard/recent"),
  getImprovement: () => api.get("/dashboard/improvement"),
};

// Types
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

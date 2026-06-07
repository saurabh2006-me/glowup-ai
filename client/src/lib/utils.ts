import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function getScoreColor(score: number): string {
  if (score >= 8) return "text-emerald-400";
  if (score >= 6) return "text-amber-400";
  if (score >= 4) return "text-orange-400";
  return "text-red-400";
}

export function getScoreBg(score: number): string {
  if (score >= 8) return "bg-emerald-500/20 border-emerald-500/30";
  if (score >= 6) return "bg-amber-500/20 border-amber-500/30";
  if (score >= 4) return "bg-orange-500/20 border-orange-500/30";
  return "bg-red-500/20 border-red-500/30";
}

export function getScoreGradient(score: number): string {
  if (score >= 8) return "from-emerald-500 to-teal-400";
  if (score >= 6) return "from-amber-500 to-yellow-400";
  if (score >= 4) return "from-orange-500 to-amber-400";
  return "from-red-500 to-orange-400";
}

export function calculateImprovement(
  current: number,
  previous: number
): { percentage: number; improved: boolean } {
  const diff = current - previous;
  const percentage = previous > 0 ? (diff / previous) * 100 : 0;
  return { percentage: Math.abs(percentage), improved: diff > 0 };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export const skinToneColors = [
  { name: "Very Fair", hex: "#F5D0C5", undertone: "Cool" },
  { name: "Fair", hex: "#E8C4B8", undertone: "Cool/Neutral" },
  { name: "Light", hex: "#D4A574", undertone: "Neutral" },
  { name: "Medium", hex: "#C68642", undertone: "Warm" },
  { name: "Olive", hex: "#8D5524", undertone: "Warm/Neutral" },
  { name: "Tan", hex: "#7B4B2A", undertone: "Warm" },
  { name: "Dark", hex: "#5C3A1E", undertone: "Warm" },
  { name: "Very Dark", hex: "#3D2314", undertone: "Warm" },
];

export const colorSeasons = {
  spring: ["Coral", "Peach", "Golden Yellow", "Warm Green", "Turquoise"],
  summer: ["Lavender", "Powder Blue", "Rose Pink", "Soft Grey", "Mint"],
  autumn: ["Rust", "Olive", "Mustard", "Burgundy", "Chocolate"],
  winter: ["Royal Blue", "Emerald", "Fuchsia", "Black", "White"],
};

export function getColorSeason(skinTone: string): keyof typeof colorSeasons {
  const tone = skinTone.toLowerCase();
  if (tone.includes("fair") || tone.includes("light")) return "summer";
  if (tone.includes("olive") || tone.includes("medium")) return "autumn";
  if (tone.includes("dark") || tone.includes("tan")) return "winter";
  return "spring";
}

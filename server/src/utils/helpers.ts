/**
 * Utility helper functions for the server
 */

export const generateRandomScore = (min = 4, max = 9): number => {
  return Number((Math.random() * (max - min) + min).toFixed(1));
};

export const getScoreCategory = (score: number): string => {
  if (score >= 8) return "Excellent";
  if (score >= 6.5) return "Good";
  if (score >= 5) return "Average";
  return "Needs Improvement";
};

export const calculateImprovement = (
  current: number,
  previous: number
): { percentage: number; direction: "up" | "down" | "same" } => {
  const diff = current - previous;
  const percentage = previous > 0 ? Math.abs((diff / previous) * 100) : 0;
  return {
    percentage: Number(percentage.toFixed(1)),
    direction: diff > 0 ? "up" : diff < 0 ? "down" : "same",
  };
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

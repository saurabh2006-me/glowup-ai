"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Simulated chart using canvas
export default function ProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Sample data - score over 12 weeks
    const data = [5.2, 5.4, 5.8, 6.1, 6.3, 6.5, 6.8, 7.0, 7.2, 7.3, 7.5, 7.4];
    const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw area under curve
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.3)");
    gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    data.forEach((score, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - ((score / 10) * chartHeight);
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = "#8B5CF6";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    data.forEach((score, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - ((score / 10) * chartHeight);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    data.forEach((score, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - ((score / 10) * chartHeight);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0f";
      ctx.fill();
      ctx.strokeStyle = "#EC4899";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw labels
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    labels.forEach((label, i) => {
      const x = padding + (chartWidth / (labels.length - 1)) * i;
      ctx.fillText(label, x, height - 15);
    });

    // Y-axis labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = 10 - i * 2;
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(value.toString(), padding - 10, y + 4);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card glass className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg">Score Progress</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <canvas
            ref={canvasRef}
            className="w-full h-64"
            style={{ width: "100%", height: "256px" }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

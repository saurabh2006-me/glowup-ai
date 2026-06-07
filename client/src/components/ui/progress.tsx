"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "gradient" | "glow";
  showValue?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, size = "default", variant = "default", showValue = false, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);

    const sizes = {
      sm: "h-1.5",
      default: "h-2.5",
      lg: "h-4",
    };

    const variants = {
      default: "bg-primary",
      gradient: "bg-gradient-to-r from-glow-purple via-glow-pink to-glow-cyan",
      glow: "bg-gradient-to-r from-glow-purple to-glow-pink shadow-[0_0_10px_rgba(139,92,246,0.5)]",
    };

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div className={cn("overflow-hidden rounded-full bg-white/10", sizes[size])}>
          <motion.div
            className={cn("h-full rounded-full", variants[variant])}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        {showValue && (
          <span className="absolute right-0 -top-6 text-xs font-medium text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "default" | "md" | "lg" | "xl";
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "default", ...props }, ref) => {
    const sizes = {
      sm: "h-8 w-8 text-xs",
      default: "h-10 w-10 text-sm",
      md: "h-12 w-12 text-base",
      lg: "h-16 w-16 text-lg",
      xl: "h-24 w-24 text-2xl",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full ring-2 ring-glow-purple/30",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-glow-purple to-glow-pink font-semibold text-white">
            {fallback?.slice(0, 2).toUpperCase() || "?"}
          </span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

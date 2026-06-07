import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GlowUp AI - Upgrade Your Looks with AI",
  description:
    "AI-powered facial attractiveness analysis, skincare recommendations, grooming tips, and personalized daily improvement plans.",
  keywords: [
    "AI",
    "facial analysis",
    "skincare",
    "grooming",
    "attractiveness",
    "self-improvement",
    "beauty",
    "confidence",
  ],
  openGraph: {
    title: "GlowUp AI - Upgrade Your Looks with AI",
    description: "Transform your appearance with AI-powered analysis and personalized recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1a1a2e",
                color: "#fff",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#1a1a2e",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#1a1a2e",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

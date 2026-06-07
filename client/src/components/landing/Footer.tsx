"use client";

import Link from "next/link";
import { Sparkles, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-glow-purple to-glow-pink">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">GlowUp AI</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered facial analysis and personalized self-improvement platform.
            </p>
            <div className="mt-4 flex gap-3">
              {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Analysis", "Dashboard", "Tracker", "Chat"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Cookies", "Licenses"],
            },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-white mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 GlowUp AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with AI for humans who want to glow up.
          </p>
        </div>
      </div>
    </footer>
  );
}

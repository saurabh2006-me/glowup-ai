"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-glow-cyan to-blue-500 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Your personal beauty & wellness consultant</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass glow-border rounded-2xl p-6"
          >
            <ChatInterface />
          </motion.div>
        </div>
      </div>
    </main>
  );
}

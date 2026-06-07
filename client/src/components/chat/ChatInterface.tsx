"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, Trash2, Wand2, Heart, Sun, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: <Wand2 className="h-4 w-4" />, text: "Best skincare routine for oily skin?" },
  { icon: <Heart className="h-4 w-4" />, text: "How to reduce dark circles?" },
  { icon: <Sun className="h-4 w-4" />, text: "What hairstyle suits a round face?" },
  { icon: <Dumbbell className="h-4 w-4" />, text: "Exercises for better jawline?" },
];

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hello! I'm your AI GlowUp Assistant. I can help you with skincare, grooming, fitness, and confidence tips. What would you like to know today?",
    timestamp: new Date(),
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "Best skincare routine for oily skin?":
          "For oily skin, I recommend: 1) Cleanser with salicylic acid (AM & PM), 2) Niacinamide serum to regulate oil, 3) Lightweight gel moisturizer, 4) Non-comedogenic SPF 50. Avoid over-washing as it triggers more oil production!",
        "How to reduce dark circles?":
          "Dark circles can be reduced by: 1) Getting 7-9 hours of quality sleep, 2) Using caffeine eye cream, 3) Cold compress for 10 min daily, 4) Staying hydrated (3L water), 5) Reducing salt intake. Vitamin K and retinol eye creams also help significantly.",
        "What hairstyle suits a round face?":
          "For round faces, aim to add height and angles: 1) Pompadour or quiff for volume on top, 2) Side-swept undercut to create angles, 3) Avoid buzz cuts or rounded styles, 4) Textured crop with height, 5) Keep sides shorter than top to elongate the face.",
        "Exercises for better jawline?":
          "Try these jawline exercises: 1) Chin lifts - tilt head back, push lower jaw forward (hold 10s, 15 reps), 2) Neck curls - lie down, lift head slightly (10 reps), 3) Tongue press - press tongue to roof of mouth while humming, 4) Chewing sugar-free gum for 30 min daily, 5) Overall body fat reduction through cardio.",
      };

      const responseText =
        responses[text] ||
        "That's a great question! Based on your profile and current analysis, I'd recommend focusing on consistent daily habits. For personalized advice, make sure to complete your daily check-ins and regular face analyses. Would you like specific tips on skincare, grooming, or fitness?";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className="shrink-0">
                {message.role === "assistant" ? (
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-glow-purple to-glow-pink flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <Avatar fallback="You" size="sm" />
                )}
              </div>
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-glow-purple/20 to-glow-pink/20 border-glow-purple/30"
                    : "glass"
                }`}
              >
                <p className="text-sm leading-relaxed text-white">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-glow-purple to-glow-pink flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <Card className="glass p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-glow-purple" />
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            </Card>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mt-4 mb-4"
        >
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt.text)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 hover:text-white transition-all"
            >
              {prompt.icon}
              {prompt.text}
            </button>
          ))}
        </motion.div>
      )}

      <div className="mt-4 flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about skincare, grooming, fitness..."
            className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-glow-purple/50 transition-all"
          />
        </div>
        <Button
          variant="glow"
          size="icon"
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="h-12 w-12 shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={clearChat}
          className="h-12 w-12 shrink-0"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

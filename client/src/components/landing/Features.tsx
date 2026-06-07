"use client";

import { motion } from "framer-motion";
import { ScanFace, Sparkles, Wand2, TrendingUp, MessageCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  ScanFace: <ScanFace className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Wand2: <Wand2 className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  MessageCircle: <MessageCircle className="h-6 w-6" />,
  Clock: <Clock className="h-6 w-6" />,
};

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-glow-purple font-medium text-sm uppercase tracking-wider">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Everything You Need to <span className="text-gradient">Glow Up</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
            Our comprehensive suite of AI-powered tools helps you understand, track, and improve every aspect of your appearance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover glass className="h-full group">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {iconMap[feature.icon]}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

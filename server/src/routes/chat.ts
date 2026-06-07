import { Router } from "express";
import ChatMessage from "../models/ChatMessage";
import { protect } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// @route   POST /api/chat/message
// @desc    Send a message to AI assistant
// @access  Private
router.post(
  "/message",
  protect,
  asyncHandler(async (req: any, res) => {
    const { message, context } = req.body;
    const userId = req.user._id;

    if (!message) {
      res.status(400).json({ message: "Message is required" });
      return;
    }

    // Save user message
    await ChatMessage.create({
      userId,
      role: "user",
      content: message,
    });

    // In production, integrate with OpenAI API here
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({...});

    // Simulated AI response
    const responses = [
      "Based on your skin type, I recommend using a gentle cleanser with salicylic acid twice daily.",
      "For better jawline definition, try chin lifts and neck curls daily. Also focus on overall body fat reduction.",
      "Your current routine looks good! Consider adding a vitamin C serum in the morning for extra glow.",
      "For dark circles, ensure 7-9 hours of sleep and use a caffeine eye cream. Cold compresses also help.",
      "A textured crop or pompadour would suit your face shape well. Avoid styles that are too rounded.",
    ];

    const aiResponse = responses[Math.floor(Math.random() * responses.length)];

    // Save AI response
    const aiMessage = await ChatMessage.create({
      userId,
      role: "assistant",
      content: aiResponse,
    });

    res.json({
      success: true,
      message: aiMessage,
    });
  })
);

// @route   GET /api/chat/history
// @desc    Get chat history
// @access  Private
router.get(
  "/history",
  protect,
  asyncHandler(async (req: any, res) => {
    const messages = await ChatMessage.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      messages: messages.reverse(),
    });
  })
);

// @route   DELETE /api/chat/history
// @desc    Clear chat history
// @access  Private
router.delete(
  "/history",
  protect,
  asyncHandler(async (req: any, res) => {
    await ChatMessage.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: "Chat history cleared" });
  })
);

export default router;

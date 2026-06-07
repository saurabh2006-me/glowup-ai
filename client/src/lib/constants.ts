export const APP_NAME = "GlowUp AI";
export const APP_TAGLINE = "Upgrade Your Looks with AI";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Analysis", href: "/analysis" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tracker", href: "/tracker" },
  { name: "Chat", href: "/chat" },
];

export const FEATURES = [
  {
    title: "AI Face Analysis",
    description: "Advanced facial recognition analyzes 50+ facial features for comprehensive attractiveness scoring.",
    icon: "ScanFace",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Skin Analysis",
    description: "Detect acne, dark circles, skin texture, and tone with AI-powered dermatological insights.",
    icon: "Sparkles",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Personalized Recommendations",
    description: "Get tailored skincare routines, hairstyle suggestions, and grooming tips based on your unique features.",
    icon: "Wand2",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Daily Glow-Up Tracker",
    description: "Track your daily progress with streaks, improvement graphs, and personalized daily tasks.",
    icon: "TrendingUp",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "AI Chat Assistant",
    description: "24/7 AI beauty consultant for skincare, grooming, fitness, and confidence advice.",
    icon: "MessageCircle",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Transformation Timeline",
    description: "Visualize your glow-up journey with before/after comparisons and milestone celebrations.",
    icon: "Clock",
    color: "from-red-500 to-pink-500",
  },
];

export const TESTIMONIALS = [
  {
    name: "Alex Chen",
    role: "Software Engineer",
    avatar: "AC",
    rating: 5,
    text: "GlowUp AI completely changed my skincare routine. My skin has never looked better, and the confidence boost is incredible!",
    improvement: "+2.3 points",
  },
  {
    name: "Marcus Johnson",
    role: "Marketing Manager",
    avatar: "MJ",
    rating: 5,
    text: "The AI recommendations for my beard style and hair were spot on. I've received so many compliments since I started using this app.",
    improvement: "+1.8 points",
  },
  {
    name: "Ryan Park",
    role: "College Student",
    avatar: "RP",
    rating: 5,
    text: "The daily tracker keeps me motivated. Seeing my progress over time is the best motivation to stick with my routine.",
    improvement: "+3.1 points",
  },
  {
    name: "David Kim",
    role: "Fitness Coach",
    avatar: "DK",
    rating: 5,
    text: "As a fitness coach, I recommend GlowUp AI to all my clients. The holistic approach to appearance improvement is unmatched.",
    improvement: "+2.7 points",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with basic AI analysis",
    features: [
      "1 face analysis per week",
      "Basic attractiveness score",
      "Skin quality overview",
      "General recommendations",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 9.99,
    period: "month",
    description: "Unlock full AI potential",
    features: [
      "Unlimited face analyses",
      "Detailed 50+ feature breakdown",
      "Personalized skincare routine",
      "AI chat assistant (unlimited)",
      "Daily tracker & streaks",
      "Progress reports & PDF export",
      "Before/after comparisons",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Elite",
    price: 19.99,
    period: "month",
    description: "For serious glow-up enthusiasts",
    features: [
      "Everything in Pro",
      "Weekly AI video consultations",
      "Personalized product recommendations",
      "1-on-1 grooming expert access",
      "Custom transformation timeline",
      "Family account (up to 4)",
      "API access",
      "White-label reports",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

export const FAQ_ITEMS = [
  {
    question: "How accurate is the AI face analysis?",
    answer:
      "Our AI uses state-of-the-art computer vision models trained on millions of facial images. The analysis is highly accurate for facial symmetry, skin quality, and feature proportions. Results are meant as guidance for self-improvement, not medical diagnosis.",
  },
  {
    question: "Is my photo data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption for all uploads. Your photos are processed securely and never shared with third parties. You can delete your data at any time from your account settings.",
  },
  {
    question: "Can I use GlowUp AI on mobile?",
    answer:
      "Yes! GlowUp AI is fully responsive and works beautifully on iOS and Android devices. We also have a native mobile app coming soon with camera integration for instant analysis.",
  },
  {
    question: "What does the attractiveness score mean?",
    answer:
      "The score (1-10) represents a composite of facial symmetry, skin health, feature proportions, grooming, and overall presentation. It's based on widely studied aesthetic principles and is meant to track your personal improvement over time.",
  },
  {
    question: "How often should I do a new analysis?",
    answer:
      "We recommend weekly analyses to track meaningful progress. Daily changes are usually too subtle to measure, while monthly gaps might miss important trends in your improvement journey.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your Pro or Elite subscription at any time with no cancellation fees. You'll continue to have access until the end of your billing period.",
  },
];

export const ANALYSIS_CATEGORIES = [
  { key: "overall", label: "Overall Score", weight: 1, maxScore: 10 },
  { key: "symmetry", label: "Face Symmetry", weight: 0.15, maxScore: 10 },
  { key: "skin", label: "Skin Quality", weight: 0.2, maxScore: 10 },
  { key: "eyes", label: "Eye Area", weight: 0.12, maxScore: 10 },
  { key: "jawline", label: "Jawline", weight: 0.1, maxScore: 10 },
  { key: "hair", label: "Hair Health", weight: 0.1, maxScore: 10 },
  { key: "smile", label: "Smile", weight: 0.08, maxScore: 10 },
  { key: "confidence", label: "Confidence Look", weight: 0.15, maxScore: 10 },
  { key: "grooming", label: "Grooming", weight: 0.1, maxScore: 10 },
];

export const DAILY_TASKS = [
  { id: "water", label: "Drink 8 glasses of water", category: "health", points: 10 },
  { id: "skincare", label: "Complete morning skincare routine", category: "skincare", points: 15 },
  { id: "exercise", label: "30 min exercise/workout", category: "fitness", points: 20 },
  { id: "sleep", label: "Get 7-8 hours of sleep", category: "health", points: 15 },
  { id: "grooming", label: "Grooming & hygiene routine", category: "grooming", points: 10 },
  { id: "sunscreen", label: "Apply sunscreen", category: "skincare", points: 10 },
  { id: "posture", label: "Practice good posture (check 3x)", category: "confidence", points: 10 },
  { id: "meditation", label: "10 min meditation/mindfulness", category: "confidence", points: 10 },
];

export const BEARD_STYLES = [
  { name: "Clean Shaven", bestFor: ["Oval", "Square"], maintenance: "Low" },
  { name: "Stubble", bestFor: ["All"], maintenance: "Low" },
  { name: "Short Beard", bestFor: ["Round", "Oval"], maintenance: "Medium" },
  { name: "Full Beard", bestFor: ["Oval", "Rectangular"], maintenance: "High" },
  { name: "Goatee", bestFor: ["Round", "Square"], maintenance: "Medium" },
  { name: "Van Dyke", bestFor: ["Round", "Oval"], maintenance: "Medium" },
  { name: "Anchor", bestFor: ["Square", "Oval"], maintenance: "High" },
  { name: "Circle Beard", bestFor: ["Oval", "Diamond"], maintenance: "Medium" },
];

export const HAIRSTYLES = [
  { name: "Crew Cut", bestFor: ["Oval", "Square"], faceShape: "All" },
  { name: "Undercut", bestFor: ["Oval", "Round"], faceShape: "Oval" },
  { name: "Pompadour", bestFor: ["Oval", "Rectangular"], faceShape: "Oval" },
  { name: "Buzz Cut", bestFor: ["Oval", "Square"], faceShape: "All" },
  { name: "Side Part", bestFor: ["Oval", "Round", "Square"], faceShape: "Oval" },
  { name: "Quiff", bestFor: ["Oval", "Round"], faceShape: "Oval" },
  { name: "Textured Crop", bestFor: ["Oval", "Round", "Diamond"], faceShape: "Round" },
  { name: "Slick Back", bestFor: ["Oval", "Rectangular"], faceShape: "Oval" },
  { name: "Fade", bestFor: ["All"], faceShape: "All" },
  { name: "Long Waves", bestFor: ["Oval", "Rectangular"], faceShape: "Oval" },
];

# GlowUp AI

AI-powered facial attractiveness analysis, skincare recommendations, grooming tips, and personalized daily improvement plans.

## Features

- **AI Face Analysis** - Upload a selfie and get detailed analysis of 50+ facial features
- **Skin Analysis** - Detect acne, dark circles, skin texture, and tone
- **Personalized Recommendations** - Tailored skincare, hairstyle, beard, and fitness advice
- **Daily Glow-Up Tracker** - Check-in system with streaks, progress graphs, and daily tasks
- **AI Chat Assistant** - 24/7 beauty and wellness consultant
- **Dashboard** - Analytics, progress charts, improvement breakdown
- **Transformation Timeline** - Before/after comparisons and milestones

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Chart.js
- face-api.js
- react-dropzone

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image storage)
- OpenAI API (chat assistant)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- OpenAI API key (optional, for chat)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/glowup-ai.git
cd glowup-ai
```

2. Install dependencies
```bash
npm run install:all
```

3. Set up environment variables

**Client** (`client/.env`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=glowup_uploads
```

**Server** (`server/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/glowup_ai
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start development servers
```bash
npm run dev
```

This starts both the Next.js frontend (port 3000) and Express backend (port 5000).

### Build for Production

```bash
npm run build
```

## Project Structure

```
glowup-ai/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   │   ├── landing/   # Landing page sections
│   │   │   ├── analysis/  # Face analysis components
│   │   │   ├── dashboard/ # Dashboard components
│   │   │   ├── tracker/   # Daily tracker components
│   │   │   ├── chat/      # Chat interface
│   │   │   └── ui/        # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities & API
│   │   ├── context/       # React contexts
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
│
├── server/                # Express backend
│   └── src/
│       ├── config/        # Database config
│       ├── controllers/   # Route controllers
│       ├── middleware/    # Auth, error handling, upload
│       ├── models/        # Mongoose models
│       ├── routes/        # API routes
│       ├── services/      # Business logic
│       └── utils/         # Helpers
│
└── package.json           # Root workspace config
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/profile` - Get profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Analysis
- `POST /api/analysis/upload` - Upload & analyze image (protected)
- `GET /api/analysis/history` - Get analysis history (protected)
- `GET /api/analysis/:id` - Get single analysis (protected)
- `DELETE /api/analysis/:id` - Delete analysis (protected)

### Tracker
- `GET /api/tracker/today` - Get today's check-in (protected)
- `POST /api/tracker/checkin` - Submit check-in (protected)
- `GET /api/tracker/streak` - Get streak (protected)
- `GET /api/tracker/history` - Get history (protected)
- `GET /api/tracker/progress` - Get progress stats (protected)

### Chat
- `POST /api/chat/message` - Send message (protected)
- `GET /api/chat/history` - Get chat history (protected)
- `DELETE /api/chat/history` - Clear history (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get stats (protected)
- `GET /api/dashboard/recent` - Get recent activity (protected)
- `GET /api/dashboard/improvement` - Get improvement data (protected)

## AI Integration

The current implementation uses simulated AI analysis. To integrate real AI:

1. **Face Analysis**: Integrate face-api.js or a cloud vision API (Google Vision, AWS Rekognition)
2. **Chat Assistant**: Connect to OpenAI GPT-4 API in `server/src/routes/chat.ts`
3. **Recommendations**: Use OpenAI API with structured prompts based on analysis results

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CLOUDINARY_*` | Cloudinary credentials | Yes |
| `OPENAI_API_KEY` | OpenAI API key | No |
| `GOOGLE_CLIENT_*` | Google OAuth credentials | No |

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

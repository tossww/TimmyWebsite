# Timmy the Turtle Website 🐢

A delightful interactive website dedicated to Timmy the turtle from Jelly Cat, featuring a chat interface where users can have conversations with Timmy.

## Features

- **Interactive Chat Interface**: Chat with Timmy the turtle in real-time
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Animated Elements**: Smooth animations and visual feedback
- **Context-Aware Responses**: Timmy responds intelligently to different topics
- **Modern Tech Stack**: Built with Next.js, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AI API key (optional - see AI Setup below)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd TimmyWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Set up AI integration (optional):
```bash
cp env.example .env.local
# Edit .env.local and add your AI API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### AI Setup

The website uses real AI to generate Timmy's responses. You can choose from several AI providers:

#### Option 1: OpenAI (Recommended)
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to `.env.local`: `OPENAI_API_KEY=your_key_here`
3. Uncomment the OpenAI function in `app/api/chat/route.ts`

#### Option 2: Anthropic Claude
1. Get an API key from [Anthropic](https://console.anthropic.com/)
2. Add to `.env.local`: `ANTHROPIC_API_KEY=your_key_here`
3. Uncomment the Claude function in `app/api/chat/route.ts`

#### Option 3: Google Gemini
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local`: `GEMINI_API_KEY=your_key_here`
3. Uncomment the Gemini function in `app/api/chat/route.ts`

#### Option 4: No API Key
If no API key is provided, the app will use enhanced fallback responses that are still intelligent and contextual.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main chat page
├── public/              # Static assets
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vercel.json          # Vercel deployment config
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Deploy!

## Customization

### Adding New Responses

Edit the `timmyResponses` array in `app/page.tsx` to add new responses:

```typescript
const timmyResponses = [
  "Your new response here! 🐢",
  // ... existing responses
]
```

### Styling

The website uses custom Tailwind colors defined in `tailwind.config.js`:

- `turtle-green`: #4ade80
- `turtle-dark`: #166534
- `ocean-blue`: #0ea5e9
- `sand-beige`: #fef3c7

### Chat Logic

The chat functionality is currently using simple response generation. To integrate with an AI service:

1. Replace the `generateTimmyResponse` function in `app/page.tsx`
2. Add your AI service API calls
3. Handle the responses accordingly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## About Timmy

Timmy the turtle is a beloved character from Jelly Cat, known for being friendly, curious, and always ready for an adventure! This website brings Timmy to life in a digital format where users can interact and chat with him.

---

Made with 💚 for Timmy the Turtle from Jelly Cat

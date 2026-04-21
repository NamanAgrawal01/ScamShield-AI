# ScamShield AI 🛡️

ScamShield AI is a premium, full-stack scam detection application built with Next.js 14. It leverages the power of Groq (LLAMA-3.3-70B) for text analysis and Google Safe Browsing API for URL threat detection.

## Features
- **AI Text Analysis**: Detects urgency, impersonation, and fraud patterns in messages.
- **URL Safety Check**: Automatically scans links against Google's global threat database.
- **Confidence Scoring**: Real-time percentage indicating the likelihood of a scam.
- **Red Flag Identification**: Lists specific suspicious elements found in the input.
- **Premium UI**: Modern dark theme with glassmorphism and smooth animations.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI Engine**: Groq API (LLAMA-3.3-70B-versatile)
- **Security**: Google Safe Browsing API

## Getting Started

### 1. Clone the repository
```bash
# If you have the repo
cd ScamShield
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add your API keys:
```env
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_SAFE_BROWSING_API_KEY=your_google_safe_browsing_api_key_here
```
*   Get Groq API Key: [console.groq.com](https://console.groq.com)
*   Get Google Safe Browsing API Key: [console.cloud.google.com](https://console.cloud.google.com)

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `/app/api/analyze`: Main endpoint for combined AI and URL analysis.
- `/app/api/check-url`: Dedicated endpoint for checking specific URLs.
- `/components`: Modular UI components (AnalyzeForm, ResultCard, etc.).

## License
MIT

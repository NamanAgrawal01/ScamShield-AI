'use client';
import { useState, useEffect } from 'react';

const scamNews = [
  "🚨 NEW: Fake 'RBI Prize' WhatsApp messages circulating in Mumbai.",
  "⚠️ TRENDING: Electricity bill suspension SMS is a confirmed phishing tactic.",
  "🛡️ TIP: No real bank will ever ask for your OTP over a phone call.",
  "🌍 GLOBAL: Increase in AI-generated deepfake voice scams reported this week.",
  "📱 MOBILE: Malware disguised as official Tax apps found on unofficial stores.",
  "💎 SECURITY: ScamShield AI successfully decoded 1,200+ new phishing variants."
];

export default function NewsTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % scamNews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[var(--ink)] text-white/80 py-2.5 overflow-hidden border-b border-white/10 relative z-50">
      <div className="max-w-[660px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 w-full">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-red-600 px-2 py-0.5 rounded text-white animate-pulse">
            LIVE INTEL
          </span>
          <div className="text-[11px] font-medium tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-right-4 duration-1000 italic" key={index}>
            {scamNews[index]}
          </div>
        </div>
      </div>
    </div>
  );
}

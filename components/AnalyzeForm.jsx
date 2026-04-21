'use client';
import { useState } from 'react';

const msgs = [
  "Congratulations! You've won a brand new iPhone 15 Pro. You are our lucky winner selected from 1 million users! Click here to claim your prize before it expires in 2 hours: bit.ly/claim-prize-now123",
  "URGENT: Your bank account has been suspended due to suspicious activity detected. Verify your identity immediately at secure-bank-verify.com or lose permanent access within 24 hours. Do NOT ignore this.",
  "This is the Income Tax Department. You owe Rs.15,200 in unpaid taxes for FY 2023-24. Failure to pay within 6 hours will result in immediate arrest. Call 9876543210 now to resolve.",
  "Hello, I came across your profile and would like to offer you a flexible work-from-home opportunity. Earn Rs.50,000/month with just 2 hours of daily work. No experience needed. Reply to know more.",
  "Your KYC verification has expired as per new RBI guidelines. Your UPI and bank account will be blocked within 24 hours if not updated. Update now: kyc-update-portal.in/verify"
];

const labels = ["🎁 Fake Prize", "🏦 Bank Alert", "📋 Tax Scam", "💼 Job Offer", "⚠️ KYC Expired"];

export default function AnalyzeForm({ onAnalyze, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onAnalyze(message);
    }
  };

  const fill = (i) => {
    setMessage(msgs[i]);
  };

  return (
    <div className="card-base p-8 paper-shadow">
      <form onSubmit={handleSubmit}>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--ink3)] mb-2.5">
          Your message
        </label>
        <div className="relative mb-5">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste suspicious message, email, or link here..."
            className="w-full min-h-[160px] bg-[var(--bg2)] border border-[var(--border2)] rounded-xl p-4 text-sm leading-relaxed text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] focus:ring-4 focus:ring-[var(--ink)]/5 transition-all outline-none resize-none"
          />
          <div className="absolute bottom-3 right-4 text-[11px] text-[var(--ink3)]">
            {message.length} chars
          </div>
        </div>

        <div className="h-[1px] bg-[var(--border)] my-5"></div>

        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink3)] mb-2.5">
          Try an example
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {labels.map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => fill(i)}
              className="text-[12px] font-medium bg-[var(--bg2)] border border-[var(--border2)] rounded-lg px-3 py-1.5 text-[var(--ink2)] hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-all cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`w-full p-4 rounded-xl font-syne font-bold text-base transition-all flex items-center justify-center gap-2 ${
            isLoading || !message.trim()
            ? 'bg-[var(--bg2)] text-[var(--ink3)] cursor-not-allowed'
            : 'bg-[var(--ink)] text-white hover:bg-[#2c2926] active:scale-[0.99]'
          }`}
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-black/15 border-t-[var(--ink2)] rounded-full animate-spin"></div>
          )}
          <span>{isLoading ? 'Scanning...' : 'Analyze this message →'}</span>
        </button>
      </form>
    </div>
  );
}

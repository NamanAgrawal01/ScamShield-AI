'use client';
import { useState } from 'react';

const msgs = [
  "Congratulations! You've won a brand new iPhone 15 Pro. You are our lucky winner selected from 1 million users! Click here to claim your prize before it expires in 2 hours: bit.ly/claim-prize-now123",
  "URGENT: Your bank account has been suspended due to suspicious activity detected. Verify your identity immediately at secure-bank-verify.com or lose permanent access within 24 hours. Do NOT ignore this.",
  "This is the Income Tax Department. You owe Rs.15,200 in unpaid taxes for FY 2023-24. Failure to pay within 6 hours will result in immediate arrest. Call 9876543210 now to resolve.",
  "Hello, I came across your profile and would like to offer you a flexible work-from-home opportunity. Earn Rs.50,000/month with just 2 hours of daily work. No experience needed. Reply to know more.",
  "Your KYC verification has expired as per new RBI guidelines. Your UPI and bank account will be blocked within 24 hours if not updated. Update now: kyc-update-portal.in/verify"
];

const labels = ["🎁 Lucky Winner", "🏦 Bank Suspended", "⚖️ Tax Threat", "💼 High Pay Job", "🆔 KYC Update"];

export default function AnalyzeForm({ onAnalyze, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onAnalyze(message);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-[2.5rem] glass-shadow relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--ink)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <label className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--ink3)]">
            Intelligence Input
          </label>
          <div className="text-[10px] font-black text-[var(--ink3)] uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded">
            {message.length} Chars Detected
          </div>
        </div>

        <div className="relative mb-8">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste suspicious text, email content, or URLs here..."
            className="w-full min-h-[220px] bg-white/70 border border-[var(--border2)] rounded-[2rem] p-7 text-[16px] leading-[1.6] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] focus:ring-8 focus:ring-[var(--ink)]/5 transition-all outline-none resize-none shadow-inner italic font-medium"
          />
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none border border-black/5"></div>
        </div>

        <div className="mb-10">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--ink3)] mb-4 ml-2">Quick Neural Samples</div>
          <div className="flex flex-wrap gap-2.5">
            {labels.map((label, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMessage(msgs[i])}
                className="text-[12px] font-bold bg-white/60 border border-white rounded-2xl px-5 py-2.5 text-[var(--ink2)] hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`w-full p-6 rounded-[2rem] font-syne font-black text-[14px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group relative overflow-hidden ${
            isLoading || !message.trim()
            ? 'bg-black/10 text-[var(--ink3)] cursor-not-allowed'
            : 'bg-[var(--ink)] text-white hover:bg-black shadow-2xl hover:scale-[1.01] active:scale-[0.98]'
          }`}
        >
          <div className="relative z-10 flex items-center gap-4">
            {isLoading && (
              <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
            )}
            <span>{isLoading ? 'Neural Analysis in Progress...' : 'Initialize Analysis Scan'}</span>
            {!isLoading && <span className="text-2xl group-hover:translate-x-2 transition-transform">🛰️</span>}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>
      </form>
    </div>
  );
}

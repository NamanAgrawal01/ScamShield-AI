'use client';
import { useState, useEffect } from 'react';

const logs = [
  "Initializing neural pathways...",
  "Decrypting semantic urgency...",
  "Analyzing impersonation patterns...",
  "Cross-referencing Safe Browsing DB...",
  "Scanning for embedded malicious links...",
  "Evaluating social engineering risk...",
  "Verifying domain reputation...",
  "Finalizing forensic verdict..."
];

export default function LoadingSpinner() {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-16 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
      <div className="relative w-24 h-24 mb-10">
        <div className="absolute inset-0 border-4 border-[var(--ink)] opacity-10 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-[var(--ink)] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-bounce">
          🔍
        </div>
      </div>
      
      <div className="w-full max-w-[320px] bg-[var(--ink)]/5 border border-[var(--ink)]/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ink3)]">Neural Terminal v4</span>
        </div>
        <div className="font-mono text-[11px] text-[var(--ink2)] leading-relaxed h-12 overflow-hidden italic">
          <span className="text-[var(--ink3)] mr-2">root@scamshield_hq:~$</span>
          <span key={logIndex} className="animate-in slide-in-from-bottom-2 duration-300">
            {logs[logIndex]}
          </span>
        </div>
        
        <div className="mt-6 h-1 w-full bg-[var(--ink)]/10 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--ink)] animate-[shimmer_3s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

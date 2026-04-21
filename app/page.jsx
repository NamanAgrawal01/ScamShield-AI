'use client';
import { useState, useEffect } from 'react';
import AnalyzeForm from '@/components/AnalyzeForm';
import ResultCard from '@/components/ResultCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import HistoryList from '@/components/HistoryList';
import ScamLibrary from '@/components/ScamLibrary';
import { analyzeMessageLocally } from '@/utils/analyzer';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('scamshield_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
  }, []);

  const handleAnalyze = async (message) => {
    if (loading) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Call the local analyzer (Browser-side)
      const data = await analyzeMessageLocally(message);

      setResult(data);
      
      // Save to history
      const newHistoryItem = {
        ...data,
        message,
        timestamp: new Date().toISOString()
      };
      
      const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      localStorage.setItem('scamshield_history', JSON.stringify(updatedHistory));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('scamshield_history');
  };

  return (
    <div className="relative max-w-[660px] mx-auto px-6 pb-20">
      
      {/* NAV */}
      <nav className="flex items-center justify-between py-7 mb-12 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--ink)] rounded-xl flex items-center justify-center text-xl shadow-lg">
            🛡️
          </div>
          <div>
            <div className="font-syne font-bold text-[17px] tracking-tight leading-none text-[var(--ink)] mb-0.5">ScamShield AI</div>
            <div className="text-[11px] font-normal text-[var(--ink3)]">Fraud detection engine</div>
          </div>
        </div>
        <div className="text-[11px] font-medium text-[var(--ink3)] bg-[var(--surface2)] border border-[var(--border)] rounded-full px-3.5 py-1.5 tracking-wider">
          Free · No signup
        </div>
      </nav>

      {/* HERO */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-[11px] font-medium uppercase tracking-[1.5px] text-[var(--ink3)]">
          <div className="w-6 h-[1px] bg-[var(--ink3)]"></div>
          AI-powered scam detection
        </div>
        <h1 className="font-syne font-extrabold text-[clamp(2rem,7vw,3.25rem)] leading-[1.08] tracking-[-0.04em] text-[var(--ink)] mb-4">
          Is this message<br />
          <em className="italic font-bold text-[var(--ink3)] not-italic">legit or a scam?</em>
        </h1>
        <p className="text-[15px] text-[var(--ink3)] leading-relaxed max-w-[460px] font-light">
          Paste any suspicious text, email, or WhatsApp message. Our AI checks it against known scam patterns in seconds — completely free.
        </p>
      </div>

      {/* Action Content */}
      <div className="space-y-6">
        <AnalyzeForm onAnalyze={handleAnalyze} isLoading={loading} />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="p-6 rounded-2xl bg-[var(--tomato-bg)] border border-[var(--tomato-b)] text-[var(--tomato)] text-center font-medium animate-in fade-in zoom-in duration-300">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <ResultCard 
            result={result} 
            onAgain={() => { setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          />
        )}

        {!loading && !result && (
          <HistoryList 
            history={history} 
            onSelect={(item) => { setResult(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            onClear={clearHistory} 
          />
        )}

        <ScamLibrary />
      </div>

      {/* FOOTER */}
      <footer className="mt-20 text-center">
        <p className="text-[12px] text-[var(--ink3)] leading-relaxed">
          Powered by Groq (LLaMA 3.3) · Google Safe Browsing · 100% free, no account needed
        </p>
        <div className="flex justify-center gap-2 mt-4 opacity-20">
          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[var(--ink)]"></div>)}
        </div>
      </footer>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import AnalyzeForm from '@/components/AnalyzeForm';
import ResultCard from '@/components/ResultCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import HistoryList from '@/components/HistoryList';
import ScamLibrary from '@/components/ScamLibrary';
import NewsTicker from '@/components/NewsTicker';
import ReportingPortal from '@/components/ReportingPortal';
import { analyzeMessageLocally } from '@/utils/analyzer';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

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
      const data = await analyzeMessageLocally(message);
      setResult(data);
      
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
    <div className="relative min-h-screen">
      <NewsTicker />
      <div className="relative max-w-[660px] mx-auto px-6 pb-20">
        
        {/* NAV */}
        <nav className="flex items-center justify-between py-7 mb-12 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-[var(--ink)] rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:rotate-12 transition-all">
              🛡️
            </div>
            <div>
              <div className="font-syne font-bold text-[17px] tracking-tight leading-none text-[var(--ink)] mb-0.5">ScamShield AI</div>
              <div className="text-[11px] font-normal text-[var(--ink3)]">Phase 4 Intelligence Hub</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-emerald-600 animate-pulse">
              ● System Online
            </div>
            <div className="text-[11px] font-medium text-[var(--ink3)] bg-[var(--surface2)] border border-[var(--border)] rounded-full px-3.5 py-1.5 tracking-wider">
              100% Free
            </div>
          </div>
        </nav>

        {/* HERO */}
        <div className="mb-14 relative">
          <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--border)] to-transparent hidden xl:block"></div>
          <div className="flex items-center gap-2 mb-5 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink3)]">
            <div className="w-3 h-3 rounded-full border-2 border-[var(--ink3)] animate-ping"></div>
            Neural Pattern Recognition
          </div>
          <h1 className="font-syne font-extrabold text-[clamp(2.5rem,8vw,3.75rem)] leading-[0.95] tracking-[-0.05em] text-[var(--ink)] mb-6">
            Identify Scams<br />
            <em className="italic font-black text-[var(--ink3)] not-italic decoration-[var(--tomato)] underline decoration-4 underline-offset-8">with Certainty.</em>
          </h1>
          <p className="text-[16px] text-[var(--ink3)] leading-relaxed max-w-[480px] font-light">
            Armed with global fraud intelligence, our AI decodes phishing attempts, fake alerts, and malicious domains in real-time.
          </p>
        </div>

        {/* Action Content */}
        <div className="space-y-10">
          <AnalyzeForm onAnalyze={handleAnalyze} isLoading={loading} />

          {loading && <LoadingSpinner />}

          {error && (
            <div className="p-8 rounded-[2rem] bg-[var(--tomato-bg)] border border-[var(--tomato-b)] text-[var(--tomato)] text-center font-black animate-in fade-in zoom-in duration-300 shadow-xl">
              ⚠️ SYSTEM ERROR: {error}
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
          
          <ReportingPortal />
        </div>

        {/* FOOTER */}
        <footer className="mt-32 text-center py-10 border-t border-[var(--border)]">
          <div className="flex justify-center gap-4 mb-6 opacity-30">
            {['AI', 'TLS', 'P2P'].map(t => <span key={t} className="text-[9px] font-black tracking-widest uppercase border px-2 py-1 rounded">{t}</span>)}
          </div>
          <p className="text-[12px] text-[var(--ink3)] leading-relaxed font-medium uppercase tracking-[0.1em]">
            Neural Defense v4.2.1 • Built for Global Protection
          </p>
          <div className="flex justify-center gap-3 mt-6">
            {[1, 2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[var(--ink)] opacity-10"></div>)}
          </div>
        </footer>
      </div>
    </div>
  );
}

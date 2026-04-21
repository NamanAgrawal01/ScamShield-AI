'use client';
import { useState, useEffect } from 'react';

export default function ResultCard({ result, onAgain }) {
  const { verdict, confidence, redFlags, explanation, scamType, urlResult } = result;
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const config = {
    SCAM: {
      class: 'scam bg-[var(--tomato-bg)] border-[var(--tomato-b)] text-[var(--tomato)]',
      icon: '🚨',
      label: 'Warning',
      title: 'Scam Detected',
      bar: 'bg-[var(--tomato)]',
      glow: 'shadow-[0_0_50px_-12px_rgba(192,57,43,0.3)]'
    },
    SUSPICIOUS: {
      class: 'susp bg-[var(--amber-bg)] border-[var(--amber-b)] text-[var(--amber)]',
      icon: '⚠️',
      label: 'Caution',
      title: 'Looks Suspicious',
      bar: 'bg-[var(--amber)]',
      glow: 'shadow-[0_0_50px_-12px_rgba(180,83,9,0.3)]'
    },
    SAFE: {
      class: 'safe bg-[var(--forest-bg)] border-[var(--forest-b)] text-[var(--forest)]',
      icon: '✅',
      label: 'All clear',
      title: 'Looks Safe',
      bar: 'bg-[var(--forest)]',
      glow: 'shadow-[0_0_50px_-12px_rgba(22,101,52,0.3)]'
    }
  };

  const style = config[verdict] || config.SUSPICIOUS;

  const copyReport = () => {
    const reportText = `Neural Analysis Report\nVerdict: ${verdict}\nConfidence: ${confidence}%\nDetails: ${explanation}`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakBriefing = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const text = `The assessment is ${verdict}. ${explanation}. We found ${redFlags?.length || 0} warning signs.`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.95;
      msg.pitch = 1.1;
      msg.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => {
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, []);

  return (
    <div className={`w-full rounded-[25px] p-8 border animate-in fade-in slide-in-from-bottom-6 duration-700 overflow-hidden relative ${style.class} ${style.glow}`}>
      
      {/* Neural Background Sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite] pointer-events-none"></div>

      {/* Header */}
      <div className={`flex items-start gap-4 mb-7 pb-6 border-b ${
        verdict === 'SCAM' ? 'border-[var(--tomato-b)]' : 
        verdict === 'SAFE' ? 'border-[var(--forest-b)]' : 
        'border-[var(--amber-b)]'
      }`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border animate-pulse ${
          verdict === 'SCAM' ? 'bg-[var(--tomato)]/[0.08] border-[var(--tomato-b)]' : 
          verdict === 'SAFE' ? 'bg-[var(--forest)]/[0.08] border-[var(--forest-b)]' : 
          'bg-[var(--amber)]/[0.08] border-[var(--amber-b)]'
        }`}>
          {style.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="font-syne text-[11px] font-bold uppercase tracking-[2px] mb-1 opacity-70">
              System Assessment
            </div>
            <button 
              onClick={speakBriefing}
              className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-black text-white scale-110' : 'bg-black/5 hover:bg-black/10'}`}
              title="Voice Briefing"
            >
              {isSpeaking ? '🛑' : '🔊'}
            </button>
          </div>
          <h2 className="font-syne text-3xl font-black tracking-tighter text-[var(--ink)] mb-2 italic">
            {style.title}
          </h2>
          <div className={`inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1 rounded-lg border uppercase tracking-wider ${
            verdict === 'SCAM' ? 'bg-[var(--tomato)]/[0.1] border-[var(--tomato-b)] text-[var(--tomato)]' : 
            verdict === 'SAFE' ? 'bg-[var(--forest)]/[0.1] border-[var(--forest-b)] text-[var(--forest)]' : 
            'bg-[var(--amber)]/[0.1] border-[var(--amber-b)] text-[var(--amber)]'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
            {scamType || 'Unknown Intent'}
          </div>
        </div>
      </div>

      {/* Confidence Hud */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-[var(--ink3)]">Neural Certainty</span>
          <span className={`font-syne text-2xl font-black tracking-tighter ${style.text}`}>
            {confidence}%
          </span>
        </div>
        <div className="h-2 bg-black/10 rounded-full overflow-hidden p-0.5 border border-white/20">
          <div 
            className={`h-full rounded-full transition-all duration-[1.5s] cubic-bezier(.4,0,.2,1) ${style.bar}`} 
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Details Sections */}
      <div className="space-y-6">
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-5 border border-white/40 shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ink3)] mb-3">Expert Explanation</div>
          <p className="text-[15px] leading-relaxed text-[var(--ink2)] font-medium">
            {explanation}
          </p>
        </div>

        {redFlags && redFlags.length > 0 && (
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ink3)] mb-4">Neural Warning Flags</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {redFlags.map((flag, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/60 rounded-xl p-3 text-[12px] font-bold text-[var(--ink2)] border border-white/50 shadow-sm group hover:scale-[1.02] transition-transform">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${style.bar}`} />
                  {flag}
                </div>
              ))}
            </div>
          </div>
        )}

        {urlResult && (
          <div className={`flex items-center gap-3 p-4 rounded-xl text-[14px] font-bold border-2 shadow-lg animate-bounce duration-[3s] ${
            urlResult === 'MALICIOUS' 
            ? 'bg-red-500/10 border-red-500/20 text-red-700' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700'
          }`}>
            <span className="text-xl">{urlResult === 'MALICIOUS' ? '☣️' : '🛡️'}</span>
            <span>{urlResult === 'MALICIOUS' ? 'BLACK-LISTED DOMAIN DETECTED' : 'DOMAIN VERIFIED AS SAFE'}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-black/5">
          <button 
            onClick={copyReport}
            className="flex-1 p-4 bg-white/70 border border-[var(--border2)] rounded-2xl text-[12px] font-black uppercase tracking-widest text-[var(--ink2)] hover:bg-white hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all flex items-center justify-center gap-2 group"
          >
            <span>{copied ? '✅ COPIED' : '📤 EXPORT EVIDENCE'}</span>
          </button>
          <button 
            onClick={onAgain}
            className="flex-1 p-4 bg-[var(--ink)] border border-[var(--ink)] rounded-2xl text-[12px] font-black uppercase tracking-widest text-white hover:bg-[#2c2926] shadow-xl shadow-black/20 transition-all active:scale-95"
          >
            ← NEW SCAN
          </button>
        </div>
      </div>
    </div>
  );
}

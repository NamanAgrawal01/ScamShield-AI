'use client';
import { useState, useEffect } from 'react';

export default function ResultCard({ result, onAgain }) {
  const { verdict, confidence, redFlags, explanation, scamType, urlResult } = result;
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [forensicId, setForensicId] = useState('');

  useEffect(() => {
    setForensicId(`SHIELD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, []);

  const config = {
    SCAM: {
      class: 'scam bg-[var(--tomato-bg)] border-[var(--tomato-b)] text-[var(--tomato)]',
      icon: '🚨',
      label: 'Critical Alert',
      title: 'Scam Detected',
      bar: 'bg-[var(--tomato)]',
      glow: 'shadow-[0_0_80px_-20px_rgba(192,57,43,0.4)]'
    },
    SUSPICIOUS: {
      class: 'susp bg-[var(--amber-bg)] border-[var(--amber-b)] text-[var(--amber)]',
      icon: '⚠️',
      label: 'Neural Drift',
      title: 'Looks Suspicious',
      bar: 'bg-[var(--amber)]',
      glow: 'shadow-[0_0_80px_-20px_rgba(180,83,9,0.4)]'
    },
    SAFE: {
      class: 'safe bg-[var(--forest-bg)] border-[var(--forest-b)] text-[var(--forest)]',
      icon: '🛡️',
      label: 'Verified Safe',
      title: 'Clear of Risk',
      bar: 'bg-[var(--forest)]',
      glow: 'shadow-[0_0_80px_-20px_rgba(22,101,52,0.4)]'
    }
  };

  const style = config[verdict] || config.SUSPICIOUS;

  const metrics = [
    { label: 'Urgency', value: verdict === 'SCAM' ? 95 : verdict === 'SAFE' ? 5 : 65 },
    { label: 'Deception', value: verdict === 'SCAM' ? 88 : verdict === 'SAFE' ? 10 : 45 },
    { label: 'Risk Factor', value: verdict === 'SCAM' ? 99 : verdict === 'SAFE' ? 2 : 75 }
  ];

  const speakBriefing = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const text = `The assessment is ${verdict}. ${explanation}. We found ${redFlags?.length || 0} warning signs. Forensic ID: ${forensicId}`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.95;
      msg.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className={`w-full rounded-[3rem] p-12 border-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 overflow-hidden relative ${style.class} ${style.glow}`}>
      
      {/* HUD Accents */}
      <div className="absolute top-0 right-0 p-8 flex flex-col items-end gap-2 opacity-30 select-none">
        <div className="text-[10px] font-mono tracking-tighter">SEC_PROTOCOL_V4.2</div>
        <div className="text-[10px] font-mono tracking-tighter">ENCRYPTION_ACTIVE</div>
      </div>

      <div className="neural-sweep"></div>
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16 border-b border-black/5 pb-10">
        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl animate-bounce duration-[5s] border-b-4 ${
          verdict === 'SCAM' ? 'bg-[var(--tomato)] text-white border-black/20' : 
          verdict === 'SAFE' ? 'bg-[var(--forest)] text-white border-black/20' : 
          'bg-[var(--amber)] text-white border-black/20'
        }`}>
          {style.icon}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.4em] mb-3 opacity-60">
                Audit Result: {forensicId}
              </div>
              <h2 className="font-syne text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tighter text-[var(--ink)] italic leading-none">
                {style.title}
              </h2>
            </div>
            <button 
              onClick={speakBriefing}
              className={`w-14 h-14 rounded-full transition-all shadow-xl flex items-center justify-center text-2xl ${isSpeaking ? 'bg-black text-white scale-110 animate-pulse' : 'bg-white/80 hover:bg-black/5 backdrop-blur-md'}`}
            >
              {isSpeaking ? '🛑' : '🔊'}
            </button>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-5 py-2 rounded-2xl bg-black/5 text-[10px] font-black uppercase tracking-widest">{scamType || 'General Threat'}</span>
            <span className="px-5 py-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 text-[10px] font-black uppercase tracking-widest">Neural Confidence: {confidence}%</span>
          </div>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/30 glass-shadow group hover:bg-white/40 transition-all">
            <div className="text-[10px] font-black uppercase tracking-widest text-[var(--ink3)] mb-5">{m.label} Radar</div>
            <div className="flex flex-col gap-4">
              <span className={`font-syne text-4xl font-black italic tracking-tighter ${
                m.value > 70 ? 'text-[var(--tomato)]' : m.value > 30 ? 'text-[var(--amber)]' : 'text-[var(--forest)]'
              }`}>
                {m.value}%
              </span>
              <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-[3s] delay-[${i * 300}ms] ${
                    m.value > 70 ? 'bg-[var(--tomato)]' : m.value > 30 ? 'bg-[var(--amber)]' : 'bg-[var(--forest)]'
                  }`}
                  style={{ width: `${m.value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-sm flex flex-col gap-4 group hover:-translate-y-1 transition-transform">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ink3)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border border-[var(--ink3)]"></span>
            Decoded Intent
          </div>
          <p className="text-[18px] leading-relaxed text-[var(--ink)] font-bold italic opacity-90">
            "{explanation}"
          </p>
        </div>

        <div className="bg-black/5 rounded-[2.5rem] p-8 border border-black/5 flex flex-col gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--ink3)]">Digital Markers Discovered</div>
          <div className="space-y-3">
            {redFlags && redFlags.length > 0 ? redFlags.map((flag, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl text-[12px] font-extrabold text-[var(--ink2)] border border-white/20 shadow-sm">
                <div className={`w-3 h-3 rounded-full shrink-0 ${style.bar}`} />
                {flag}
              </div>
            )) : <div className="text-[12px] font-bold text-[var(--ink3)] italic">No surface-level red flags detected.</div>}
          </div>
        </div>
      </div>

      {/* URL Analysis Block */}
      {urlResult && (
        <div className={`mb-16 p-10 rounded-[3rem] border-4 shadow-2xl relative overflow-hidden group ${
          urlResult === 'MALICIOUS' 
          ? 'bg-red-500/10 border-red-500/20 text-red-950' 
          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-950'
        }`}>
          <div className="relative z-10">
            <div className="text-[11px] font-black uppercase tracking-[0.5em] mb-4 opacity-50 italic">Protocol: SSL_GSB_ACTIVE</div>
            <div className="text-3xl font-black italic tracking-tighter leading-none mb-3">
              {urlResult === 'MALICIOUS' ? '☣️ DOMAIN INFECTED / BLACKLISTED' : '🛡️ DOMAIN SOURCE VERIFIED SAFE'}
            </div>
            <div className="text-[14px] font-bold opacity-70">Cross-referenced with Google Safe Browsing Threat Index.</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 blur-sm translate-x-1/4 translate-y-1/4 select-none pointer-events-none">
             <span className="text-[12rem]">{urlResult === 'MALICIOUS' ? '☣️' : '🔒'}</span>
          </div>
        </div>
      )}

      {/* Final Action Hub */}
      <div className="flex flex-col sm:flex-row gap-5 p-5 bg-black/5 rounded-[3.5rem] border border-black/5">
        <button 
          onClick={() => {
            const report = `FORENSIC AUDIT: ${forensicId}\nVERDICT: ${verdict}\nExplanation: ${explanation}`;
            navigator.clipboard.writeText(report);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex-1 p-6 bg-white border-2 border-white rounded-[3rem] text-[12px] font-black uppercase tracking-[0.3em] text-[var(--ink)] hover:bg-white hover:shadow-3xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">📋</span>
          <span>{copied ? 'Audit Copied' : 'Copy Audit Report'}</span>
        </button>
        <button 
          onClick={onAgain}
          className="flex-1 p-6 bg-[var(--ink)] text-white rounded-[3rem] text-[12px] font-black uppercase tracking-[0.3em] hover:bg-black hover:shadow-3xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group"
        >
          <span className="text-2xl group-active:rotate-[360deg] transition-all">🔄</span>
          New Intelligence Scan
        </button>
      </div>
    </div>
  );
}

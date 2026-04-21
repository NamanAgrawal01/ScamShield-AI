'use client';
import { useState } from 'react';

export default function ResultCard({ result, onAgain }) {
  const { verdict, confidence, redFlags, explanation, scamType, urlResult } = result;
  const [copied, setCopied] = useState(false);

  const config = {
    SCAM: {
      class: 'scam bg-[var(--tomato-bg)] border-[var(--tomato-b)] text-[var(--tomato)]',
      icon: '🚨',
      label: 'Warning',
      title: 'Scam Detected',
      bar: 'bg-[var(--tomato)]'
    },
    SUSPICIOUS: {
      class: 'susp bg-[var(--amber-bg)] border-[var(--amber-b)] text-[var(--amber)]',
      icon: '⚠️',
      label: 'Caution',
      title: 'Looks Suspicious',
      bar: 'bg-[var(--amber)]'
    },
    SAFE: {
      class: 'safe bg-[var(--forest-bg)] border-[var(--forest-b)] text-[var(--forest)]',
      icon: '✅',
      label: 'All clear',
      title: 'Looks Safe',
      bar: 'bg-[var(--forest)]'
    }
  };

  const style = config[verdict] || config.SUSPICIOUS;

  const copyReport = () => {
    const reportText = `ScamShield AI Analysis\nVerdict: ${verdict}\nConfidence: ${confidence}%\nDetails: ${explanation}`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full rounded-[20px] p-8 border animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden ${style.class}`}>
      {/* Header */}
      <div className={`flex items-start gap-4 mb-7 pb-6 border-b ${
        verdict === 'SCAM' ? 'border-[var(--tomato-b)]' : 
        verdict === 'SAFE' ? 'border-[var(--forest-b)]' : 
        'border-[var(--amber-b)]'
      }`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${
          verdict === 'SCAM' ? 'bg-[var(--tomato)]/[0.08] border-[var(--tomato-b)]' : 
          verdict === 'SAFE' ? 'bg-[var(--forest)]/[0.08] border-[var(--forest-b)]' : 
          'bg-[var(--amber)]/[0.08] border-[var(--amber-b)]'
        }`}>
          {style.icon}
        </div>
        <div>
          <div className="font-syne text-[11px] font-bold uppercase tracking-[1.5px] mb-1">
            {style.label}
          </div>
          <h2 className="font-syne text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-2">
            {style.title}
          </h2>
          <div className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${
            verdict === 'SCAM' ? 'bg-[var(--tomato)]/[0.1] border-[var(--tomato-b)] text-[var(--tomato)]' : 
            verdict === 'SAFE' ? 'bg-[var(--forest)]/[0.1] border-[var(--forest-b)] text-[var(--forest)]' : 
            'bg-[var(--amber)]/[0.1] border-[var(--amber-b)] text-[var(--amber)]'
          }`}>
            {scamType || 'General Analysis'}
          </div>
        </div>
      </div>

      {/* Confidence */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--ink3)]">Confidence score</span>
          <span className={`font-syne text-xl font-extrabold tracking-tight ${style.text}`}>
            {confidence}%
          </span>
        </div>
        <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${style.bar}`} 
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Flags */}
      {redFlags && redFlags.length > 0 && (
        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink3)] mb-3">Red flags found</div>
          <div className="flex flex-col gap-2">
            {redFlags.map((flag, i) => (
              <div key={i} className={`flex items-start gap-2.5 bg-white rounded-xl p-3 text-[13px] leading-relaxed text-[var(--ink2)] border ${
                verdict === 'SCAM' ? 'border-[var(--tomato-b)]' : 
                verdict === 'SAFE' ? 'border-[var(--forest-b)]' : 
                'border-[var(--amber-b)]'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${style.bar}`} />
                {flag}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink3)] mb-3">What our AI found</div>
        <div className={`bg-white rounded-xl p-4.5 text-[14px] leading-relaxed text-[var(--ink2)] font-light border ${
          verdict === 'SCAM' ? 'border-[var(--tomato-b)]' : 
          verdict === 'SAFE' ? 'border-[var(--forest-b)]' : 
          'border-[var(--amber-b)]'
        }`}>
          {explanation}
        </div>
      </div>

      {/* URL Badge */}
      {urlResult && (
        <div className={`flex items-center gap-2.5 p-3 rounded-xl text-[13px] font-medium mb-6 border ${
          urlResult === 'MALICIOUS' 
          ? 'bg-[var(--tomato)]/[0.07] border-[var(--tomato-b)] text-[var(--tomato)]' 
          : 'bg-[var(--forest)]/[0.07] border-[var(--forest-b)] text-[var(--forest)]'
        }`}>
          {urlResult === 'MALICIOUS' ? '❌ Malicious URL — flagged by Google Safe Browsing' : '✅ URL verified safe by Google Safe Browsing'}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2.5 mt-4">
        <button 
          onClick={copyReport}
          className="flex-1 p-3 bg-white border border-[var(--border2)] rounded-xl text-[13px] font-medium text-[var(--ink2)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all cursor-pointer"
        >
          {copied ? '✅ Copied' : '📤 Share result'}
        </button>
        <button 
          onClick={onAgain}
          className="flex-1 p-3 bg-[var(--ink)] border border-[var(--ink)] rounded-xl text-[13px] font-medium text-white hover:bg-[#2c2926] transition-all cursor-pointer"
        >
          ← Analyze another
        </button>
      </div>
    </div>
  );
}

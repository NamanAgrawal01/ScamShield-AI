'use client';

export default function HistoryList({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  return (
    <div className="w-full mt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex items-center justify-between mb-10 px-4">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink3)] mb-2">Operation Logs</div>
          <h2 className="font-syne text-3xl font-black italic tracking-tighter text-[var(--ink)]">Recent <span className="text-[var(--ink3)] underline decoration-dotted decoration-[var(--border2)] underline-offset-8">Intercepts</span></h2>
        </div>
        <button 
          onClick={onClear}
          className="text-[10px] font-black uppercase tracking-widest text-[var(--tomato)] bg-[var(--tomato-bg)] border border-[var(--tomato-b)] px-5 py-2.5 rounded-2xl hover:bg-[var(--tomato)] hover:text-white transition-all active:scale-95 shadow-sm"
        >
          Wipe Terminal Logs
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.map((item, i) => (
          <div 
            key={i} 
            onClick={() => onSelect(item)}
            className="group flex items-center justify-between p-7 rounded-[2.5rem] border border-[var(--border)] bg-white/40 backdrop-blur-md hover:bg-white hover:border-[var(--ink)] hover:shadow-2xl transition-all cursor-pointer paper-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner border-2 ${
                item.verdict === 'SCAM' ? 'bg-[var(--tomato-bg)] border-[var(--tomato-b)]' : 
                item.verdict === 'SAFE' ? 'bg-[var(--forest-bg)] border-[var(--forest-b)]' : 
                'bg-[var(--amber-bg)] border-[var(--amber-b)]'
              }`}>
                {item.verdict === 'SCAM' ? '🚨' : item.verdict === 'SAFE' ? '🛡️' : '⚠️'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    item.verdict === 'SCAM' ? 'text-[var(--tomato)]' : 
                    item.verdict === 'SAFE' ? 'text-[var(--forest)]' : 
                    'text-[var(--amber)]'
                  }`}>
                    {item.verdict} DETECTED
                  </span>
                  <span className="text-[10px] text-[var(--ink3)] font-mono opacity-60">ID: SCR_{i}293</span>
                </div>
                <p className="text-[15px] font-medium text-[var(--ink)] truncate italic pr-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  "{item.message}"
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
              <span className="text-[11px] font-black text-[var(--ink2)] tracking-tighter italic">NEURAL CONFIDENCE: {item.confidence}%</span>
              <span className="text-[9px] font-bold text-[var(--ink3)] uppercase tracking-widest opacity-50">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all text-xl">
              🔍
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

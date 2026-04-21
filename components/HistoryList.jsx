'use client';

export default function HistoryList({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  return (
    <div className="w-full mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-6">
        <h3 className="text-[11px] font-bold text-[var(--ink3)] uppercase tracking-[1.5px] flex items-center">
          <span className="mr-2">🕒</span> Recent History
        </h3>
        <button 
          onClick={onClear}
          className="text-[10px] text-[var(--ink3)] hover:text-[var(--tomato)] transition-colors uppercase font-bold tracking-wider"
        >
          Clear Logs
        </button>
      </div>
      
      <div className="grid gap-3">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="flex items-center justify-between p-4 px-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface2)] hover:border-[var(--border2)] transition-all duration-200 group text-left paper-shadow"
          >
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[13px] text-[var(--ink2)] font-medium truncate pr-4 italic">
                "{item.message}"
              </span>
              <span className="text-[10px] text-[var(--ink3)] font-bold uppercase mt-1 tracking-wider">
                {new Date(item.timestamp).toLocaleDateString()} • {item.scamType || 'General'}
              </span>
            </div>
            <div className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-wider ${
              item.verdict === 'SCAM' ? 'border-[var(--tomato-b)] text-[var(--tomato)]' : 
              item.verdict === 'SAFE' ? 'border-[var(--forest-b)] text-[var(--forest)]' : 
              'border-[var(--amber-b)] text-[var(--amber)]'
            }`}>
              {item.verdict}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const portals = [
  {
    name: "National Cyber Crime Portal (India)",
    url: "https://cybercrime.gov.in",
    desc: "Official government portal for reporting all types of cyber fraud."
  },
  {
    name: "Google Safe Browsing Report",
    url: "https://safebrowsing.google.com/safebrowsing/report_phish/",
    desc: "Report phishing links to protect other users globally."
  }
];

export default function ReportingPortal() {
  return (
    <div className="w-full mt-24 py-16 border-t border-[var(--border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--tomato)]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="mb-10 text-center md:text-left">
        <div className="text-[11px] font-black text-[var(--tomato)] uppercase tracking-[0.3em] mb-4">Immediate Action Required?</div>
        <h2 className="font-syne text-4xl font-extrabold text-[var(--ink)] tracking-tighter">Take Down <em className="text-[var(--ink3)] font-black">Scammers</em></h2>
        <p className="text-[15px] text-[var(--ink3)] mt-4 max-w-lg font-light leading-relaxed">If you've confirmed a message is a scam, don't just delete it. Report it to the authorities to help prevent others from falling victim.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {portals.map((p, i) => (
          <a 
            key={i} 
            href={p.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row md:items-center justify-between p-7 rounded-[2rem] border border-[var(--border)] bg-white hover:bg-[var(--surface2)] hover:border-[var(--ink)] transition-all paper-shadow active:scale-[0.98]"
          >
            <div className="flex-1">
              <h3 className="font-syne text-xl font-bold text-[var(--ink)] mb-1 group-hover:text-[var(--tomato)] transition-colors">{p.name}</h3>
              <p className="text-[13px] text-[var(--ink3)] font-light">{p.desc}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--ink2)]">
              Report Now <span className="text-xl group-hover:translate-x-2 transition-transform">➡️</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

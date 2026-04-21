const tactics = [
  {
    title: "Phishing",
    icon: "🎣",
    desc: "Deceptive messages designed to steal credentials by mimicking banks or government services."
  },
  {
    title: "Smishing",
    icon: "📱",
    desc: "SMS-based scams claiming urgent account issues, fake winnings, or missed deliveries."
  },
  {
    title: "Social Engineering",
    icon: "🎭",
    desc: "Manipulative tactics used to gain your trust and extract sensitive data or money."
  },
  {
    title: "Payment Scams",
    icon: "💸",
    desc: "Impersonating vendors or officials to redirect payments to fraudulent accounts."
  }
];

export default function ScamLibrary() {
  return (
    <div className="w-full mt-24 py-16 border-t border-[var(--border)]">
      <div className="mb-12">
        <div className="text-[11px] font-bold text-[var(--ink3)] uppercase tracking-[1.5px] mb-3">Knowledge Base</div>
        <h2 className="font-syne text-3xl font-extrabold text-[var(--ink)] tracking-tight">Scam Defense <em className="text-[var(--ink3)] font-bold">Encyclopedia</em></h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tactics.map((t, i) => (
          <div key={i} className="p-7 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface2)] transition-all paper-shadow group">
            <div className="text-3xl mb-5 group-hover:scale-110 transition-transform origin-left">{t.icon}</div>
            <h3 className="font-syne text-lg font-bold text-[var(--ink)] mb-2.5">{t.title}</h3>
            <p className="text-[14px] text-[var(--ink3)] leading-relaxed font-light">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const examples = [
  "Congratulations! You've won an iPhone 15. Click here to claim: bit.ly/win-prize-now",
  "URGENT: Your bank account has been suspended. Verify immediately or lose access.",
  "This is the Income Tax Department. You owe Rs.15,000. Pay now to avoid arrest.",
  "Hi, I saw your profile and want to offer you a work-from-home job. Earn 50k monthly.",
  "Your KYC is expired. Update now or your UPI will be blocked within 24 hours."
];

export default function ExampleMessages({ onSelect }) {
  return (
    <div className="w-full space-y-3 mt-8">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Try an example</h3>
      <div className="grid gap-2">
        {examples.map((msg, index) => (
          <button
            key={index}
            onClick={() => onSelect(msg)}
            className="text-left p-3 text-sm rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-200 group truncate"
          >
            <span className="text-blue-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            {msg}
          </button>
        ))}
      </div>
    </div>
  );
}

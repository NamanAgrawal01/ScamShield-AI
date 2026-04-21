export default function LoadingSpinner() {
  return (
    <div className="py-16 text-center animate-in fade-in duration-500">
      <span className="text-5xl block mb-5 animate-bounce">🔍</span>
      <div className="text-sm text-[var(--ink3)] font-light leading-relaxed">
        <b className="font-medium text-[var(--ink2)] block mb-1">Scanning for patterns...</b>
        Checking against known scam databases
      </div>
    </div>
  );
}

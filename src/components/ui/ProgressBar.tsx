interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ completed, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        {label && <span className="font-medium text-indigo-100">{label}</span>}
        <span className="ml-auto text-[#aab4cc]/50">
          {completed}/{total} ({pct}%)
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-indigo-950/50">
        <div
          className="h-full rounded-full bg-[#293452] transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

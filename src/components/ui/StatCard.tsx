import { type ElementType, type ReactNode, isValidElement } from 'react';

interface StatCardProps {
  icon: ElementType | ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ icon: Icon, label, value, color = 'purple' }: StatCardProps) {
  const colorMap: Record<string, { icon: string; bg: string; glow: string }> = {
    purple: { icon: 'text-violet-400', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/5' },
    blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/5' },
    red: { icon: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/5' },
    amber: { icon: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/5' },
    green: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/5' },
    emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/5' },
  };
  const c = colorMap[color] || colorMap.purple;

  const isComponent = typeof Icon === 'function' ||
    (typeof Icon === 'object' && Icon !== null && !isValidElement(Icon));

  return (
    <div className={`flex items-center gap-4 rounded-xl border border-indigo-800/30 bg-[#1a1730] p-5 shadow-lg ${c.glow}`}>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
        {isComponent ? <Icon className={`h-6 w-6 ${c.icon}`} /> : Icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-indigo-300/50">{label}</p>
      </div>
    </div>
  );
}

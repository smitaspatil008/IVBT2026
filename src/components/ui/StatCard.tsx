import { isValidElement, type ReactNode } from 'react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }> | ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ icon, label, value, color = 'purple' }: StatCardProps) {
  const colorMap: Record<string, { icon: string; bg: string; glow: string }> = {
    purple: { icon: 'text-violet-400', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/5' },
    blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/5' },
    red: { icon: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/5' },
    amber: { icon: 'text-[#ff167a]', bg: 'bg-pink-600/10', glow: 'shadow-pink-600/5' },
    orange: { icon: 'text-[#ff167a]', bg: 'bg-[#ff167a]/10', glow: 'shadow-[#ff167a]/5' },
    pink: { icon: 'text-[#ff167a]', bg: 'bg-[#ff167a]/10', glow: 'shadow-[#ff167a]/5' },
    yellow: { icon: 'text-[#ffc857]', bg: 'bg-[#ffc857]/10', glow: 'shadow-yellow-500/5' },
    green: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/5' },
    emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/5' },
  };
  const c = colorMap[color] || colorMap.purple;

  if (isValidElement(icon)) {
    return (
      <div className={`flex items-center gap-4 rounded-xl border border-[#293452]/30 bg-[#111a35] p-5 shadow-lg ${c.glow}`}>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-[#aab4cc]/50">{label}</p>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComp = icon as any;

  return (
    <div className={`flex items-center gap-4 rounded-xl border border-[#293452]/30 bg-[#111a35] p-5 shadow-lg ${c.glow}`}>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
        <IconComp className={`h-6 w-6 ${c.icon}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-[#aab4cc]/50">{label}</p>
      </div>
    </div>
  );
}

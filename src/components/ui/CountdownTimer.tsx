import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units: { key: keyof TimeLeft; short: string }[] = [
    { key: 'days', short: 'Days' },
    { key: 'hours', short: 'Hrs' },
    { key: 'minutes', short: 'Min' },
    { key: 'seconds', short: 'Sec' },
  ];

  return (
    <div className="text-center rounded-2xl border border-[#1e1b4b]/30 bg-[#12102a] p-8">
      {label && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-300/50">
          {label}
        </p>
      )}
      <div className="flex justify-center gap-4">
        {units.map(({ key, short }) => (
          <div
            key={key}
            className="flex flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-b from-[#1e1b4b] to-[#1e1b4b] shadow-lg shadow-[#1e1b4b]/50 md:h-20 md:w-20">
              <span className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                {String(timeLeft[key]).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-indigo-400/50">
              {short}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

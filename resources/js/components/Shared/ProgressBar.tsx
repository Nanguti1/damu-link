import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'rose' | 'teal' | 'green' | 'amber';
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const colorClasses = {
  rose: 'bg-gradient-to-r from-rose-500 to-rose-600',
  teal: 'bg-gradient-to-r from-teal-500 to-teal-600',
  green: 'bg-gradient-to-r from-green-500 to-green-600',
  amber: 'bg-gradient-to-r from-amber-500 to-amber-600',
};

export default function ProgressBar({ current, total, size = 'md', showLabel = true, color = 'rose' }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            {current} / {total} Pints
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-bold">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${sizeClass}`}>
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatisticCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  color?: 'rose' | 'teal' | 'green' | 'amber';
}

const colorClasses = {
  rose: {
    bg: 'bg-rose-100 dark:bg-rose-900/20',
    text: 'text-rose-600 dark:text-rose-500',
    glow: 'shadow-rose-500/20',
    gradient: 'from-rose-500/10',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-900/20',
    text: 'text-teal-600 dark:text-teal-500',
    glow: 'shadow-teal-500/20',
    gradient: 'from-teal-500/10',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-500',
    glow: 'shadow-green-500/20',
    gradient: 'from-green-500/10',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-500',
    glow: 'shadow-amber-500/20',
    gradient: 'from-amber-500/10',
  },
};

export default function StatisticCard({ icon: Icon, value, label, color = 'rose' }: StatisticCardProps) {
  const classes = colorClasses[color];

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${classes.gradient} to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
      <div className="relative backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300">
        <div className={`inline-flex p-3 rounded-xl ${classes.bg} ${classes.text} mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <p className={`text-3xl font-bold ${classes.text} tabular-nums`}>
            {value.toLocaleString()}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

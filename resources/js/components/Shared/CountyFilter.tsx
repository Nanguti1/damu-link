import React from 'react';
import { MapPin } from 'lucide-react';
import { KENYA_COUNTIES } from '@/types';

interface CountyFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CountyFilter({ value, onChange, className = '' }: CountyFilterProps) {
  return (
    <div className={`relative ${className}`}>
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
      >
        <option value="">All Counties</option>
        {KENYA_COUNTIES.map((county) => (
          <option key={county} value={county}>
            {county}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

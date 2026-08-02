import React from 'react';
import { Droplet } from 'lucide-react';
import { BLOOD_TYPES, BloodType } from '@/types';

interface BloodTypeFilterProps {
  value: BloodType | '';
  onChange: (value: BloodType | '') => void;
  className?: string;
}

export default function BloodTypeFilter({ value, onChange, className = '' }: BloodTypeFilterProps) {
  return (
    <div className={`relative ${className}`}>
      <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BloodType | '')}
        className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
      >
        <option value="">All Blood Types</option>
        {BLOOD_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
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

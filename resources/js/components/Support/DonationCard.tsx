import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import GlassCard from '@/components/Shared/GlassCard';

interface DonationCardProps {
  amount: number;
  selected: boolean;
  onSelect: () => void;
}

export default function DonationCard({ amount, selected, onSelect }: DonationCardProps) {
  return (
    <GlassCard
      className={`p-6 cursor-pointer transition-all ${
        selected 
          ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/10' 
          : 'hover:border-rose-300 dark:hover:border-rose-700'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            selected 
              ? 'bg-rose-100 dark:bg-rose-900/30' 
              : 'bg-slate-100 dark:bg-slate-800'
          }`}>
            <Smartphone className="h-5 w-5 text-rose-600 dark:text-rose-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              KES {amount.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              M-Pesa
            </p>
          </div>
        </div>
        {selected && (
          <div className="p-2 bg-rose-600 rounded-full">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
    </GlassCard>
  );
}

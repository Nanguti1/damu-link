import React from 'react';
import { Droplet } from 'lucide-react';
import { BloodType } from '@/types';

interface BloodBadgeProps {
  bloodType: BloodType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
};

export default function BloodBadge({ bloodType, size = 'md', showIcon = true }: BloodBadgeProps) {
  return (
    <div className={`inline-flex items-center space-x-1.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full font-bold ${sizeClasses[size]} shadow-lg shadow-rose-500/25`}>
      {showIcon && <Droplet className="h-3 w-3" />}
      <span>{bloodType}</span>
    </div>
  );
}

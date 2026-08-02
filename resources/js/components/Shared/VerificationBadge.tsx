import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  verified: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
};

export default function VerificationBadge({ verified, size = 'md' }: VerificationBadgeProps) {
  if (!verified) {
    return null;
  }

  const sizeClass = sizeClasses[size];

  return (
    <div className={`inline-flex items-center space-x-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium ${sizeClass} shadow-lg shadow-teal-500/25`}>
      <ShieldCheck className="h-3 w-3" />
      <span>Verified</span>
    </div>
  );
}

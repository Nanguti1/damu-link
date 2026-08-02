import React from 'react';

interface EmergencyPulseProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

export default function EmergencyPulse({ size = 'md' }: EmergencyPulseProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div className="relative inline-flex">
      <div className={`${sizeClass} bg-rose-600 rounded-full animate-ping absolute`} />
      <div className={`${sizeClass} bg-rose-600 rounded-full relative`} />
    </div>
  );
}

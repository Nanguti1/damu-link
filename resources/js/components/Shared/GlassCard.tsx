import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const hoverClass = hover ? 'hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1' : '';

  return (
    <div className={`backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl transition-all duration-300 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}

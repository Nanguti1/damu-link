import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export default function LoadingSkeleton({ className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
  );
}

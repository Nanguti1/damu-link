import React from 'react';
import { BloodAppealStatus, DonationClaimStatus } from '@/types';

interface StatusBadgeProps {
  status: BloodAppealStatus | DonationClaimStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  pending_verification: {
    label: 'Pending Verification',
    bg: 'bg-amber-100 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-500',
    border: 'border-amber-200 dark:border-amber-800',
  },
  verified: {
    label: 'Verified',
    bg: 'bg-teal-100 dark:bg-teal-900/20',
    text: 'text-teal-700 dark:text-teal-500',
    border: 'border-teal-200 dark:border-teal-800',
  },
  expired: {
    label: 'Expired',
    bg: 'bg-slate-100 dark:bg-slate-900/20',
    text: 'text-slate-700 dark:text-slate-500',
    border: 'border-slate-200 dark:border-slate-800',
  },
  fulfilled: {
    label: 'Fulfilled',
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-500',
    border: 'border-green-200 dark:border-green-800',
  },
  reserved: {
    label: 'Reserved',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-500',
    border: 'border-blue-200 dark:border-blue-800',
  },
  arrived: {
    label: 'Arrived',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-500',
    border: 'border-purple-200 dark:border-purple-800',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-500',
    border: 'border-red-200 dark:border-red-800',
  },
  completed: {
    label: 'Completed',
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-500',
    border: 'border-green-200 dark:border-green-800',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig];
  const sizeClass = sizeClasses[size];

  if (!config) {
    return null;
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClass}`}>
      {config.label}
    </span>
  );
}

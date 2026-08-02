import React from 'react';
import { Link } from '@inertiajs/react';
import { BloodAppeal } from '@/types';
import { MapPin, Clock, Phone, Download, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/Shared/GlassCard';
import BloodBadge from '@/components/Shared/BloodBadge';
import StatusBadge from '@/components/Shared/StatusBadge';
import ProgressBar from '@/components/Shared/ProgressBar';
import EmergencyPulse from '@/components/Shared/EmergencyPulse';
import VerificationBadge from '@/components/Shared/VerificationBadge';

interface AppealCardProps {
  appeal: BloodAppeal;
}

export default function AppealCard({ appeal }: AppealCardProps) {
  const isUrgent = appeal.status === 'verified' && appeal.pints_secured < appeal.pints_required;
  const timeAgo = new Date(appeal.created_at).toLocaleString();

  return (
    <GlassCard className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {isUrgent && <EmergencyPulse />}
            <StatusBadge status={appeal.status} size="sm" />
            {appeal.status === 'verified' && <VerificationBadge verified size="sm" />}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {appeal.hospital?.name}
          </h3>
        </div>
        <BloodBadge bloodType={appeal.blood_type} size="sm" />
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
        <MapPin className="h-4 w-4" />
        <span>{appeal.hospital?.county}, {appeal.hospital?.sub_county}</span>
      </div>

      {/* Patient Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-slate-600 dark:text-slate-400">
          <span className="font-medium">Patient:</span> {appeal.patient_initials}
        </div>
        <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
          <Clock className="h-4 w-4" />
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar
        current={appeal.pints_secured}
        total={appeal.pints_required}
        size="md"
        color={isUrgent ? 'rose' : 'teal'}
      />

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-2">
        {appeal.status === 'verified' && appeal.pints_secured < appeal.pints_required && (
          <Link
            href={`/appeals/${appeal.id}`}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-medium text-center"
          >
            Claim a Pint
          </Link>
        )}
        <Link
          href={`/appeals/${appeal.id}`}
          className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-medium text-center"
        >
          View Details
        </Link>
        <button
          className="p-2.5 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
          title="Download WhatsApp Flyer"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>

      {/* Anti-Scam Warning */}
      <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 dark:text-amber-400">
          Never send money. DamuLink donations are always free. Report suspicious requests.
        </p>
      </div>
    </GlassCard>
  );
}

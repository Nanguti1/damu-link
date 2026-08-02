import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Phone, Clock, Droplet, ShieldCheck, AlertTriangle } from 'lucide-react';
import { BloodAppeal } from '@/types';
import GlassCard from '@/components/Shared/GlassCard';
import BloodBadge from '@/components/Shared/BloodBadge';
import StatusBadge from '@/components/Shared/StatusBadge';
import ProgressBar from '@/components/Shared/ProgressBar';
import VerificationBadge from '@/components/Shared/VerificationBadge';
import EmergencyPulse from '@/components/Shared/EmergencyPulse';

interface ShowAppealProps {
  appeal: BloodAppeal;
}

export default function ShowAppeal({ appeal }: ShowAppealProps) {
  const isUrgent = appeal.status === 'verified' && appeal.pints_secured < appeal.pints_required;
  const timeAgo = new Date(appeal.created_at).toLocaleString();
  const remainingPints = appeal.pints_required - appeal.pints_secured;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            {isUrgent && <EmergencyPulse />}
            <StatusBadge status={appeal.status} />
            {appeal.status === 'verified' && <VerificationBadge verified />}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Blood Appeal Details
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hospital Information */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Hospital Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Hospital Name</p>
                  <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">
                    {appeal.hospital?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  <span>{appeal.hospital?.county}, {appeal.hospital?.sub_county}</span>
                </div>
              </div>
            </GlassCard>

            {/* Patient Information */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Patient Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Patient Initials</p>
                  <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">
                    {appeal.patient_initials}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Blood Type</p>
                  <BloodBadge bloodType={appeal.blood_type} />
                </div>
              </div>
            </GlassCard>

            {/* Donation Progress */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Donation Progress
              </h2>
              <ProgressBar
                current={appeal.pints_secured}
                total={appeal.pints_required}
                size="lg"
                color={isUrgent ? 'rose' : 'teal'}
              />
              <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-200 dark:border-rose-800">
                <div className="flex items-center space-x-2">
                  <Droplet className="h-5 w-5 text-rose-600 dark:text-rose-500" />
                  <p className="text-rose-800 dark:text-rose-400 font-medium">
                    {remainingPints} pint{remainingPints !== 1 ? 's' : ''} still needed
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Contact Information */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  <span>{appeal.contact_phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>Posted {timeAgo}</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Take Action
              </h2>
              {appeal.status === 'verified' && appeal.pints_secured < appeal.pints_required ? (
                <div className="space-y-3">
                  <Link
                    href={`/donation-claims/create?appeal_id=${appeal.id}`}
                    className="w-full px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-semibold text-center block"
                  >
                    Claim a Pint
                  </Link>
                  <button className="w-full px-6 py-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/30 transition-all font-semibold flex items-center justify-center space-x-2">
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShieldCheck className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">
                    {appeal.status === 'fulfilled' 
                      ? 'This appeal has been fulfilled.' 
                      : appeal.status === 'expired'
                      ? 'This appeal has expired.'
                      : 'This appeal is not yet accepting donations.'}
                  </p>
                </div>
              )}
            </GlassCard>

            {/* Anti-Scam Warning */}
            <GlassCard className="p-6 border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">
                    Anti-Scam Warning
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-500">
                    Never send money to anyone for blood donations. DamuLink donations are always free. 
                    Report any suspicious requests immediately.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Verification Status */}
            {appeal.status === 'verified' && (
              <GlassCard className="p-6 border-teal-200 dark:border-teal-800">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="h-5 w-5 text-teal-600 dark:text-teal-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-teal-800 dark:text-teal-400 mb-2">
                      Verified Appeal
                    </h3>
                    <p className="text-sm text-teal-700 dark:text-teal-500">
                      This appeal has been verified by our team and the hospital information is confirmed.
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

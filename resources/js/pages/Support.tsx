import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Smartphone, Server, Activity, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { SupportMetrics, DONATION_PRESETS } from '@/types';
import GlassCard from '@/components/Shared/GlassCard';
import StatisticCard from '@/components/Shared/StatisticCard';
import DonationCard from '@/components/Support/DonationCard';

interface SupportProps {
  metrics: SupportMetrics;
}

export default function Support({ metrics }: SupportProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showStkModal, setShowStkModal] = useState(false);
  const [stkStatus, setStkStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleDonate = (amount: number) => {
    setSelectedAmount(amount);
    setShowStkModal(true);
    setStkStatus('processing');
    
    // Simulate STK Push
    setTimeout(() => {
      setStkStatus('success');
    }, 3000);
  };

  const handleCustomDonate = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      handleDonate(amount);
    }
  };

  const statusConfig = {
    operational: { color: 'green', label: 'Operational' },
    degraded: { color: 'amber', label: 'Degraded' },
    down: { color: 'rose', label: 'Down' },
  };

  const healthConfig = {
    healthy: { color: 'green', label: 'Healthy' },
    warning: { color: 'amber', label: 'Warning' },
    critical: { color: 'rose', label: 'Critical' },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-900/20 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-rose-600 dark:text-rose-500" />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-400">
              Support Our Mission
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Support DamuLink
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your support helps us save lives by keeping the platform running and reaching more Kenyans in need.
          </p>
        </div>

        {/* Infrastructure Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Platform Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatisticCard
              icon={DollarSign}
              value={metrics.api_costs}
              label="Monthly API Costs (KES)"
              color="rose"
            />
            <StatisticCard
              icon={Smartphone}
              value={metrics.monthly_sms_usage}
              label="Monthly SMS Usage"
              color="teal"
            />
            <StatisticCard
              icon={Server}
              value={metrics.server_health === 'healthy' ? 100 : metrics.server_health === 'warning' ? 75 : 25}
              label="Server Health"
              color={healthConfig[metrics.server_health].color === 'green' ? 'green' : healthConfig[metrics.server_health].color === 'amber' ? 'amber' : 'rose'}
            />
            <StatisticCard
              icon={Activity}
              value={metrics.monthly_donations}
              label="Monthly Donations (KES)"
              color="green"
            />
          </div>
        </div>

        {/* Detailed Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Infrastructure Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">API Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusConfig[metrics.infrastructure_status].color === 'green'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500'
                    : statusConfig[metrics.infrastructure_status].color === 'amber'
                    ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500'
                    : 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-500'
                }`}>
                  {statusConfig[metrics.infrastructure_status].label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Server Health</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  healthConfig[metrics.server_health].color === 'green'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500'
                    : healthConfig[metrics.server_health].color === 'amber'
                    ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500'
                    : 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-500'
                }`}>
                  {healthConfig[metrics.server_health].label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">SMS Service</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500">
                  Operational
                </span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Monthly Costs Breakdown
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">API Services</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">KES {(metrics.api_costs * 0.4).toFixed(0)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">SMS Notifications</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">KES {(metrics.api_costs * 0.35).toFixed(0)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Server Infrastructure</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">KES {(metrics.api_costs * 0.25).toFixed(0)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Donation Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Support Us with M-Pesa
          </h2>
          <GlassCard className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {DONATION_PRESETS.map((preset) => (
                <DonationCard
                  key={preset.amount}
                  amount={preset.amount}
                  selected={selectedAmount === preset.amount}
                  onSelect={() => handleDonate(preset.amount)}
                />
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Custom Amount (KES)
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
                    placeholder="Enter custom amount"
                    min="10"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleCustomDonate}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-semibold"
                  >
                    Donate Custom Amount
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Impact Information */}
        <GlassCard className="p-8 border-green-200 dark:border-green-800">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <Heart className="h-6 w-6 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Your Impact
              </h3>
              <p className="text-green-700 dark:text-green-500 mb-4">
                Every donation helps us send more SMS alerts, maintain our servers, and ultimately save more lives. 
                KES 100 helps us send approximately 50 emergency SMS notifications to potential donors.
              </p>
              <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>100% of donations go to platform operations</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* STK Push Modal */}
      {showStkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="p-8 max-w-md w-full">
            {stkStatus === 'processing' && (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 border-4 border-rose-200 dark:border-rose-800 border-t-rose-600 rounded-full animate-spin mx-auto" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Processing STK Push
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Check your phone for the M-Pesa STK Push prompt to complete your donation of KES {selectedAmount?.toLocaleString()}.
                </p>
              </div>
            )}

            {stkStatus === 'success' && (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Donation Successful!
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Thank you for your generous donation of KES {selectedAmount?.toLocaleString()}. Your support helps save lives.
                </p>
                <button
                  onClick={() => {
                    setShowStkModal(false);
                    setStkStatus('idle');
                    setSelectedAmount(null);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-semibold"
                >
                  Close
                </button>
              </div>
            )}

            {stkStatus === 'error' && (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="h-8 w-8 text-rose-600 dark:text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Donation Failed
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Something went wrong with the STK Push. Please try again or contact support.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setStkStatus('processing')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-semibold"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => {
                      setShowStkModal(false);
                      setStkStatus('idle');
                      setSelectedAmount(null);
                    }}
                    className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}

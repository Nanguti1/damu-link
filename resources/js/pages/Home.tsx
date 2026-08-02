import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Activity, Users, Bed, ArrowRight, Shield, Bell, Zap } from 'lucide-react';
import { BloodAppeal, Statistics, BloodAppealFilters, BloodType, BloodAppealStatus } from '@/types';
import StatisticCard from '@/components/Shared/StatisticCard';
import AppealCard from '@/components/Appeal/AppealCard';
import SearchInput from '@/components/Shared/SearchInput';
import CountyFilter from '@/components/Shared/CountyFilter';
import BloodTypeFilter from '@/components/Shared/BloodTypeFilter';
import GlassCard from '@/components/Shared/GlassCard';

interface HomeProps {
  statistics: Statistics;
  appeals: BloodAppeal[];
}

export default function Home({ statistics, appeals }: HomeProps) {
  const [filters, setFilters] = useState<BloodAppealFilters>({
    county: '',
    blood_type: '',
    status: 'verified',
    search: '',
  });

  const filteredAppeals = appeals.filter((appeal) => {
    if (filters.county && appeal.hospital?.county !== filters.county) return false;
    if (filters.blood_type && appeal.blood_type !== filters.blood_type) return false;
    if (filters.status && appeal.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        appeal.hospital?.name.toLowerCase().includes(searchLower) ||
        appeal.patient_initials.toLowerCase().includes(searchLower) ||
        appeal.hospital?.county.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-teal-500/10 to-rose-500/10" />
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.04]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-900/20 px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-rose-600 dark:text-rose-500" />
              <span className="text-sm font-medium text-rose-700 dark:text-rose-400">
                Emergency Blood Connection Platform
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 max-w-4xl mx-auto leading-tight">
              Saving Lives Through{' '}
              <span className="bg-gradient-to-r from-rose-600 to-teal-600 dark:from-rose-500 dark:to-teal-500 bg-clip-text text-transparent">
                Faster Blood Connections
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Connect with blood donors across Kenya in real-time. Every second counts when lives are on the line.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/appeals/create"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-2xl hover:shadow-xl hover:shadow-rose-500/25 transition-all font-semibold text-lg flex items-center justify-center space-x-2 group"
              >
                <span>Create Appeal</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/donors/register"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold text-lg"
              >
                Register as Donor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatisticCard
              icon={Activity}
              value={statistics.active_appeals}
              label="Active Appeals"
              color="rose"
            />
            <StatisticCard
              icon={Users}
              value={statistics.registered_donors}
              label="Registered Donors"
              color="teal"
            />
            <StatisticCard
              icon={Heart}
              value={statistics.lives_saved}
              label="Lives Saved"
              color="green"
            />
            <StatisticCard
              icon={Bed}
              value={statistics.open_icu_beds}
              label="Open ICU Beds"
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Emergency Filter Board */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SearchInput
                value={filters.search}
                onChange={(value) => setFilters({ ...filters, search: value })}
                placeholder="Search appeals..."
              />
              <CountyFilter
                value={filters.county}
                onChange={(value) => setFilters({ ...filters, county: value })}
              />
              <BloodTypeFilter
                value={filters.blood_type}
                onChange={(value) => setFilters({ ...filters, blood_type: value })}
              />
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as BloodAppealStatus })}
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="expired">Expired</option>
                <option value="fulfilled">Fulfilled</option>
              </select>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Live Appeals Feed */}
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Live Blood Appeals
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Urgent requests needing immediate response
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live Updates</span>
            </div>
          </div>

          {filteredAppeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppeals.map((appeal) => (
                <AppealCard key={appeal.id} appeal={appeal} />
              ))}
            </div>
          ) : (
            <GlassCard className="p-12 text-center">
              <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No appeals found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your filters or check back later for new appeals.
              </p>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why DamuLink?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built for speed, reliability, and impact when every second matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center">
              <div className="inline-flex p-4 bg-rose-100 dark:bg-rose-900/20 rounded-2xl mb-6">
                <Zap className="h-8 w-8 text-rose-600 dark:text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Instant Matching
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our algorithm instantly matches blood requests with compatible donors in your area.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="inline-flex p-4 bg-teal-100 dark:bg-teal-900/20 rounded-2xl mb-6">
                <Shield className="h-8 w-8 text-teal-600 dark:text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Verified Network
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                All hospitals and donors are verified to ensure safety and reliability.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-900/20 rounded-2xl mb-6">
                <Bell className="h-8 w-8 text-amber-600 dark:text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Real-time Alerts
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get instant SMS notifications when your blood type is needed nearby.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}

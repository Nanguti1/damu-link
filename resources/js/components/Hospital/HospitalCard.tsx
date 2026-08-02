import React from 'react';
import { Hospital } from '@/types';
import { MapPin, Bed, Activity } from 'lucide-react';
import GlassCard from '@/components/Shared/GlassCard';

interface HospitalCardProps {
  hospital: Hospital;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const bedPercentage = hospital.total_icu_beds > 0 
    ? (hospital.available_icu_beds / hospital.total_icu_beds) * 100 
    : 0;

  return (
    <GlassCard className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          {hospital.name}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <MapPin className="h-4 w-4" />
          <span>{hospital.county}, {hospital.sub_county}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
            <Bed className="h-4 w-4 text-teal-600 dark:text-teal-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {hospital.available_icu_beds}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Available Beds</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
            <Activity className="h-4 w-4 text-rose-600 dark:text-rose-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {hospital.total_icu_beds}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Total Beds</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Bed Availability</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            {Math.round(bedPercentage)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              bedPercentage > 50 
                ? 'bg-gradient-to-r from-teal-500 to-teal-600' 
                : bedPercentage > 20 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                : 'bg-gradient-to-r from-rose-500 to-rose-600'
            }`}
            style={{ width: `${bedPercentage}%` }}
          />
        </div>
      </div>
    </GlassCard>
  );
}

import React from 'react';
import { DonorRegistry } from '@/types';
import { MapPin, Droplet, Phone, User } from 'lucide-react';
import GlassCard from '@/components/Shared/GlassCard';
import BloodBadge from '@/components/Shared/BloodBadge';
import StatusBadge from '@/components/Shared/StatusBadge';

interface DonorCardProps {
  donor: DonorRegistry;
}

export default function DonorCard({ donor }: DonorCardProps) {
  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-full">
            <User className="h-5 w-5 text-rose-600 dark:text-rose-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {donor.user?.name || 'Anonymous Donor'}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <StatusBadge 
                status={donor.is_active ? 'verified' : 'expired'} 
                size="sm" 
              />
            </div>
          </div>
        </div>
        <BloodBadge bloodType={donor.blood_type} size="sm" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <MapPin className="h-4 w-4" />
          <span>{donor.county}, {donor.sub_county}</span>
        </div>
        {donor.phone_number && (
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Phone className="h-4 w-4" />
            <span>{donor.phone_number}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <Droplet className="h-4 w-4" />
          <span>Blood Type: {donor.blood_type}</span>
        </div>
      </div>
    </GlassCard>
  );
}

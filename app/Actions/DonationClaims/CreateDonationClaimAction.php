<?php

namespace App\Actions\DonationClaims;

use App\Exceptions\DuplicateDonationClaimException;
use App\Exceptions\InactiveDonorException;
use App\Exceptions\InvalidDonationClaimException;
use App\Models\BloodAppeal;
use App\Models\DonationClaim;
use App\Models\DonorRegistry;
use Illuminate\Support\Facades\DB;

class CreateDonationClaimAction
{
    public function execute(BloodAppeal $appeal, DonorRegistry $donor): DonationClaim
    {
        return DB::transaction(function () use ($appeal, $donor) {
            $appeal = $appeal->lockForUpdate();
            $donor = $donor->lockForUpdate();

            if ($appeal->status !== 'verified') {
                throw new InvalidDonationClaimException('Appeal must be verified to create a donation claim.');
            }

            if (!$donor->is_active) {
                throw new InactiveDonorException();
            }

            if ($appeal->status === 'fulfilled') {
                throw new InvalidDonationClaimException('Appeal has already been fulfilled.');
            }

            if ($appeal->status === 'expired') {
                throw new InvalidDonationClaimException('Appeal has expired.');
            }

            $existingClaim = DonationClaim::where('blood_appeal_id', $appeal->id)
                ->where('donor_registry_id', $donor->id)
                ->exists();

            if ($existingClaim) {
                throw new DuplicateDonationClaimException();
            }

            return DonationClaim::create([
                'blood_appeal_id' => $appeal->id,
                'donor_registry_id' => $donor->id,
                'expires_at' => now()->addHours(2),
                'status' => 'reserved',
            ]);
        });
    }
}

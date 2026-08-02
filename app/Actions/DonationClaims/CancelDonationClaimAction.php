<?php

namespace App\Actions\DonationClaims;

use App\Models\DonationClaim;

class CancelDonationClaimAction
{
    public function execute(DonationClaim $claim): DonationClaim
    {
        $claim->update(['status' => 'cancelled']);

        return $claim->fresh();
    }
}

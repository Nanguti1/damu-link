<?php

namespace App\Actions\DonationClaims;

use App\Models\DonationClaim;

class ArriveDonationCenterAction
{
    public function execute(DonationClaim $claim): DonationClaim
    {
        $claim->update(['status' => 'arrived']);

        return $claim->fresh();
    }
}

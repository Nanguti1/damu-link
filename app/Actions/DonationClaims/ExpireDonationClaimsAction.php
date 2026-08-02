<?php

namespace App\Actions\DonationClaims;

use App\Models\DonationClaim;
use Illuminate\Support\Facades\DB;

class ExpireDonationClaimsAction
{
    public function execute(): int
    {
        return DB::transaction(function () {
            return DonationClaim::where('status', 'reserved')
                ->where('expires_at', '<', now())
                ->update(['status' => 'expired']);
        });
    }
}

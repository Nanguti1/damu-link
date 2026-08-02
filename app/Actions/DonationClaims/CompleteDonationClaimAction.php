<?php

namespace App\Actions\DonationClaims;

use App\Actions\BloodAppeals\UpdatePintsSecuredAction;
use App\Models\DonationClaim;
use Illuminate\Support\Facades\DB;

class CompleteDonationClaimAction
{
    public function __construct(
        private UpdatePintsSecuredAction $updatePintsSecuredAction
    ) {}

    public function execute(DonationClaim $claim): DonationClaim
    {
        return DB::transaction(function () use ($claim) {
            $claim->update(['status' => 'completed']);

            $this->updatePintsSecuredAction->execute(
                $claim->bloodAppeal,
                1
            );

            return $claim->fresh();
        });
    }
}

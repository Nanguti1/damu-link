<?php

namespace App\Services;

use App\Actions\BloodAppeals\FulfillBloodAppealAction;
use App\Actions\BloodAppeals\UpdatePintsSecuredAction;
use App\Actions\DonationClaims\CompleteDonationClaimAction;
use App\Models\BloodAppeal;
use App\Models\DonationClaim;
use Illuminate\Support\Facades\DB;

class BloodAppealService
{
    public function __construct(
        private CompleteDonationClaimAction $completeDonationClaimAction,
        private UpdatePintsSecuredAction $updatePintsSecuredAction,
        private FulfillBloodAppealAction $fulfillBloodAppealAction
    ) {}

    /**
     * Complete a donation claim and handle related appeal updates
     */
    public function completeDonationClaim(DonationClaim $claim): DonationClaim
    {
        return DB::transaction(function () use ($claim) {
            $completedClaim = $this->completeDonationClaimAction->execute($claim);

            $appeal = $claim->bloodAppeal->fresh();

            if ($appeal->pints_secured >= $appeal->pints_required && $appeal->status !== 'fulfilled') {
                $this->fulfillBloodAppealAction->execute($appeal);
            }

            return $completedClaim;
        });
    }

    /**
     * Update secured pints for an appeal and auto-fulfill if complete
     */
    public function updateSecuredPints(BloodAppeal $appeal, int $additionalPints): BloodAppeal
    {
        return DB::transaction(function () use ($appeal, $additionalPints) {
            $updatedAppeal = $this->updatePintsSecuredAction->execute($appeal, $additionalPints);

            if ($updatedAppeal->status === 'fulfilled') {
                return $updatedAppeal;
            }

            return $updatedAppeal;
        });
    }
}

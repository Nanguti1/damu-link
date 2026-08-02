<?php

namespace App\Actions\BloodAppeals;

use App\Exceptions\AppealAlreadyVerifiedException;
use App\Models\BloodAppeal;

class VerifyBloodAppealAction
{
    public function execute(BloodAppeal $appeal): BloodAppeal
    {
        if ($appeal->status === 'verified') {
            throw new AppealAlreadyVerifiedException();
        }

        $appeal->update(['status' => 'verified']);

        return $appeal->fresh();
    }
}

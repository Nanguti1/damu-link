<?php

namespace App\Actions\BloodAppeals;

use App\Models\BloodAppeal;

class ExpireBloodAppealAction
{
    public function execute(BloodAppeal $appeal): BloodAppeal
    {
        if ($appeal->status === 'fulfilled') {
            return $appeal;
        }

        $appeal->update(['status' => 'expired']);

        return $appeal->fresh();
    }
}

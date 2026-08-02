<?php

namespace App\Actions\BloodAppeals;

use App\Exceptions\AppealAlreadyFulfilledException;
use App\Models\BloodAppeal;

class FulfillBloodAppealAction
{
    public function execute(BloodAppeal $appeal): BloodAppeal
    {
        if ($appeal->status === 'fulfilled') {
            throw new AppealAlreadyFulfilledException();
        }

        if ($appeal->pints_secured < $appeal->pints_required) {
            throw new \InvalidArgumentException('Cannot fulfill appeal: secured pints do not meet required pints.');
        }

        $appeal->update(['status' => 'fulfilled']);

        return $appeal->fresh();
    }
}

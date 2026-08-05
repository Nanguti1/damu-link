<?php

namespace App\Actions\BloodAppeals;

use App\Models\BloodAppeal;
use Illuminate\Support\Facades\DB;

class UpdatePintsSecuredAction
{
    public function execute(BloodAppeal $appeal, int $additionalPints): BloodAppeal
    {
        return DB::transaction(function () use ($appeal, $additionalPints) {
            $appeal = BloodAppeal::query()->whereKey($appeal)->lockForUpdate()->firstOrFail();

            $newTotal = $appeal->pints_secured + $additionalPints;

            if ($newTotal > $appeal->pints_required) {
                throw new \InvalidArgumentException('Cannot exceed required pints.');
            }

            $appeal->update(['pints_secured' => $newTotal]);

            if ($newTotal === $appeal->pints_required) {
                $appeal->update(['status' => 'fulfilled']);
            }

            return $appeal->fresh();
        });
    }
}

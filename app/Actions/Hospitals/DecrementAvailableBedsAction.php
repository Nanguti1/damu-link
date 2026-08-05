<?php

namespace App\Actions\Hospitals;

use App\Exceptions\HospitalCapacityException;
use App\Models\Hospital;
use Illuminate\Support\Facades\DB;

class DecrementAvailableBedsAction
{
    public function execute(Hospital $hospital, int $decrement): Hospital
    {
        return DB::transaction(function () use ($hospital, $decrement) {
            $hospital = Hospital::query()->whereKey($hospital)->lockForUpdate()->firstOrFail();

            $newAvailable = $hospital->available_icu_beds - $decrement;

            if ($newAvailable < 0) {
                throw new HospitalCapacityException('Available ICU beds cannot be negative.');
            }

            $hospital->update(['available_icu_beds' => $newAvailable]);

            return $hospital->fresh();
        });
    }
}

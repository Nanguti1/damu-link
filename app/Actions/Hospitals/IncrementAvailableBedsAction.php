<?php

namespace App\Actions\Hospitals;

use App\Exceptions\HospitalCapacityException;
use App\Models\Hospital;
use Illuminate\Support\Facades\DB;

class IncrementAvailableBedsAction
{
    public function execute(Hospital $hospital, int $increment): Hospital
    {
        return DB::transaction(function () use ($hospital, $increment) {
            $hospital = $hospital->lockForUpdate();

            $newAvailable = $hospital->available_icu_beds + $increment;

            if ($newAvailable > $hospital->total_icu_beds) {
                throw new HospitalCapacityException('Cannot increment beyond total ICU bed capacity.');
            }

            if ($newAvailable < 0) {
                throw new HospitalCapacityException('Available ICU beds cannot be negative.');
            }

            $hospital->update(['available_icu_beds' => $newAvailable]);

            return $hospital->fresh();
        });
    }
}

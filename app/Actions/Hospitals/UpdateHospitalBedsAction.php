<?php

namespace App\Actions\Hospitals;

use App\Exceptions\HospitalCapacityException;
use App\Models\Hospital;
use Illuminate\Support\Facades\DB;

class UpdateHospitalBedsAction
{
    public function execute(Hospital $hospital, int $totalBeds, int $availableBeds): Hospital
    {
        return DB::transaction(function () use ($hospital, $totalBeds, $availableBeds) {
            $hospital = Hospital::query()->whereKey($hospital)->lockForUpdate()->firstOrFail();

            if ($availableBeds > $totalBeds) {
                throw new HospitalCapacityException('Available ICU beds cannot exceed total ICU beds.');
            }

            if ($availableBeds < 0) {
                throw new HospitalCapacityException('Available ICU beds cannot be negative.');
            }

            if ($totalBeds < 0) {
                throw new HospitalCapacityException('Total ICU beds cannot be negative.');
            }

            $hospital->update([
                'total_icu_beds' => $totalBeds,
                'available_icu_beds' => $availableBeds,
            ]);

            return $hospital->fresh();
        });
    }
}

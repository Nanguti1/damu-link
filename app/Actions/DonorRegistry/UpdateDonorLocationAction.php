<?php

namespace App\Actions\DonorRegistry;

use App\Models\DonorRegistry;

class UpdateDonorLocationAction
{
    public function execute(DonorRegistry $donor, string $county, string $subCounty): DonorRegistry
    {
        $donor->update([
            'county' => $county,
            'sub_county' => $subCounty,
        ]);

        return $donor->fresh();
    }
}

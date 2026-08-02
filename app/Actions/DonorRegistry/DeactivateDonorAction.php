<?php

namespace App\Actions\DonorRegistry;

use App\Models\DonorRegistry;

class DeactivateDonorAction
{
    public function execute(DonorRegistry $donor): DonorRegistry
    {
        $donor->update(['is_active' => false]);

        return $donor->fresh();
    }
}

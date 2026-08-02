<?php

namespace App\Actions\DonorRegistry;

use App\Models\DonorRegistry;

class ActivateDonorAction
{
    public function execute(DonorRegistry $donor): DonorRegistry
    {
        $donor->update(['is_active' => true]);

        return $donor->fresh();
    }
}

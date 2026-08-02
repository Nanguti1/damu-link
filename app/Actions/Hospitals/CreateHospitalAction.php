<?php

namespace App\Actions\Hospitals;

use App\Models\Hospital;

class CreateHospitalAction
{
    public function execute(array $data): Hospital
    {
        return Hospital::create([
            'name' => $data['name'],
            'county' => $data['county'],
            'sub_county' => $data['sub_county'],
            'total_icu_beds' => $data['total_icu_beds'] ?? 0,
            'available_icu_beds' => $data['available_icu_beds'] ?? 0,
        ]);
    }
}

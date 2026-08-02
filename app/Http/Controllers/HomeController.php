<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $statistics = [
            'active_appeals' => 12,
            'registered_donors' => 2847,
            'lives_saved' => 156,
            'open_icu_beds' => 23,
        ];

        $appeals = [
            [
                'id' => 1,
                'patient_initials' => 'JD',
                'blood_type' => 'A+',
                'status' => 'verified',
                'urgency_level' => 'critical',
                'created_at' => now()->subHours(2)->toDateTimeString(),
                'hospital' => [
                    'id' => 1,
                    'name' => 'Kenyatta National Hospital',
                    'county' => 'Nairobi',
                ],
            ],
            [
                'id' => 2,
                'patient_initials' => 'SM',
                'blood_type' => 'O-',
                'status' => 'verified',
                'urgency_level' => 'urgent',
                'created_at' => now()->subHours(5)->toDateTimeString(),
                'hospital' => [
                    'id' => 2,
                    'name' => 'Moi Teaching and Referral Hospital',
                    'county' => 'Uasin Gishu',
                ],
            ],
            [
                'id' => 3,
                'patient_initials' => 'AK',
                'blood_type' => 'B+',
                'status' => 'verified',
                'urgency_level' => 'moderate',
                'created_at' => now()->subHours(8)->toDateTimeString(),
                'hospital' => [
                    'id' => 3,
                    'name' => 'Mombasa County Hospital',
                    'county' => 'Mombasa',
                ],
            ],
        ];

        return Inertia::render('Home', [
            'statistics' => $statistics,
            'appeals' => $appeals,
        ]);
    }
}

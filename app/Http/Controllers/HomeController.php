<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $statistics = [
            'active_appeals' => \App\Models\BloodAppeal::whereIn('status', ['pending_verification', 'verified'])->count(),
            'registered_donors' => \App\Models\DonorRegistry::count(),
            'lives_saved' => \App\Models\BloodAppeal::where('status', 'fulfilled')->sum('pints_secured'),
            'open_icu_beds' => \App\Models\Hospital::sum('available_icu_beds'),
        ];

        $appeals = \App\Models\BloodAppeal::with('hospital')
            ->latest()
            ->limit(12)
            ->get();

        return Inertia::render('Home', [
            'statistics' => $statistics,
            'appeals' => $appeals,
        ]);
    }
}

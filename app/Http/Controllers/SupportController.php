<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function index()
    {
        $metrics = [
            'api_costs' => 45000,
            'monthly_sms_usage' => 12500,
            'server_health' => 'healthy',
            'infrastructure_status' => 'operational',
            'monthly_donations' => 28500,
        ];

        return Inertia::render('Support', [
            'metrics' => $metrics,
        ]);
    }
}

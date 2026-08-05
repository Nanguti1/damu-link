<?php

namespace App\Http\Controllers;

use App\Actions\DonationClaims\ArriveDonationCenterAction;
use App\Actions\DonationClaims\CancelDonationClaimAction;
use App\Actions\DonationClaims\CompleteDonationClaimAction;
use App\Actions\DonationClaims\CreateDonationClaimAction;
use App\Models\BloodAppeal;
use App\Models\DonationClaim;
use App\Models\DonorRegistry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DonationClaimController extends Controller
{
    public function store(Request $request, BloodAppeal $appeal, CreateDonationClaimAction $action): RedirectResponse
    {
        Gate::authorize('create', DonationClaim::class);

        $donor = DonorRegistry::where('user_id', $request->user()->id)->first();

        if (! $donor) {
            return to_route('donors.register')->with('toast', [
                'type' => 'error',
                'message' => 'Register as a donor before claiming a pint.',
            ]);
        }

        $action->execute($appeal, $donor);

        return back()->with('toast', ['type' => 'success', 'message' => 'Donation claim reserved for 2 hours.']);
    }

    public function arrive(DonationClaim $claim, ArriveDonationCenterAction $action): RedirectResponse
    {
        Gate::authorize('arrive', $claim);
        $action->execute($claim);

        return back()->with('toast', ['type' => 'success', 'message' => 'Arrival confirmed.']);
    }

    public function cancel(DonationClaim $claim, CancelDonationClaimAction $action): RedirectResponse
    {
        Gate::authorize('cancel', $claim);
        $action->execute($claim);

        return back()->with('toast', ['type' => 'success', 'message' => 'Claim cancelled.']);
    }

    public function complete(DonationClaim $claim, CompleteDonationClaimAction $action): RedirectResponse
    {
        Gate::authorize('complete', $claim);
        $action->execute($claim);

        return back()->with('toast', ['type' => 'success', 'message' => 'Donation completed.']);
    }
}

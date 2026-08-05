<?php

namespace App\Http\Controllers;

use App\Actions\DonorRegistry\ActivateDonorAction;
use App\Actions\DonorRegistry\DeactivateDonorAction;
use App\Actions\DonorRegistry\RegisterDonorAction;
use App\Actions\DonorRegistry\UpdateDonorLocationAction;
use App\Http\Requests\RegisterDonorRequest;
use App\Http\Requests\UpdateDonorLocationRequest;
use App\Models\DonorRegistry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;

class DonorRegistryController extends Controller
{
    public function store(RegisterDonorRequest $request, RegisterDonorAction $action): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()?->id;

        $action->execute($data);

        return to_route('home')->with('toast', ['type' => 'success', 'message' => 'You are now registered as a donor.']);
    }

    public function updateLocation(DonorRegistry $donor, UpdateDonorLocationRequest $request, UpdateDonorLocationAction $action): RedirectResponse
    {
        Gate::authorize('update', $donor);
        $action->execute($donor, $request->string('county')->toString(), $request->string('sub_county')->toString());

        return back()->with('toast', ['type' => 'success', 'message' => 'Donor location updated.']);
    }

    public function activate(DonorRegistry $donor, ActivateDonorAction $action): RedirectResponse
    {
        Gate::authorize('activate', $donor);
        $action->execute($donor);

        return back()->with('toast', ['type' => 'success', 'message' => 'Donor activated.']);
    }

    public function deactivate(DonorRegistry $donor, DeactivateDonorAction $action): RedirectResponse
    {
        Gate::authorize('deactivate', $donor);
        $action->execute($donor);

        return back()->with('toast', ['type' => 'success', 'message' => 'Donor deactivated.']);
    }
}

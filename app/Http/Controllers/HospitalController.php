<?php

namespace App\Http\Controllers;

use App\Actions\Hospitals\CreateHospitalAction;
use App\Actions\Hospitals\DecrementAvailableBedsAction;
use App\Actions\Hospitals\IncrementAvailableBedsAction;
use App\Actions\Hospitals\UpdateHospitalBedsAction;
use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\UpdateAvailableBedsRequest;
use App\Http\Requests\UpdateHospitalBedsRequest;
use App\Models\Hospital;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class HospitalController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('viewAny', Hospital::class);

        return Inertia::render('Hospitals/Index', [
            'hospitals' => Hospital::orderBy('name')->get(),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Hospital::class);

        return Inertia::render('Hospitals/Create');
    }

    public function store(StoreHospitalRequest $request, CreateHospitalAction $action): RedirectResponse
    {
        Gate::authorize('create', Hospital::class);
        $hospital = $action->execute($request->validated());

        return to_route('hospitals.index')->with('toast', ['type' => 'success', 'message' => "{$hospital->name} created."]);
    }

    public function edit(Hospital $hospital): Response
    {
        Gate::authorize('update', $hospital);

        return Inertia::render('Hospitals/Edit', ['hospital' => $hospital]);
    }

    public function update(Hospital $hospital, StoreHospitalRequest $request): RedirectResponse
    {
        Gate::authorize('update', $hospital);
        $hospital->update($request->validated());

        return to_route('hospitals.index')->with('toast', ['type' => 'success', 'message' => 'Hospital updated.']);
    }

    public function destroy(Hospital $hospital): RedirectResponse
    {
        Gate::authorize('delete', $hospital);
        $hospital->delete();

        return to_route('hospitals.index')->with('toast', ['type' => 'success', 'message' => 'Hospital deleted.']);
    }

    public function updateBeds(Hospital $hospital, UpdateHospitalBedsRequest $request, UpdateHospitalBedsAction $action): RedirectResponse
    {
        Gate::authorize('update', $hospital);
        $action->execute($hospital, $request->integer('total_icu_beds'), $request->integer('available_icu_beds'));

        return back()->with('toast', ['type' => 'success', 'message' => 'ICU beds updated.']);
    }

    public function incrementBeds(Hospital $hospital, UpdateAvailableBedsRequest $request, IncrementAvailableBedsAction $action): RedirectResponse
    {
        Gate::authorize('update', $hospital);
        $action->execute($hospital, $request->integer('increment'));

        return back()->with('toast', ['type' => 'success', 'message' => 'Available ICU beds increased.']);
    }

    public function decrementBeds(Hospital $hospital, UpdateAvailableBedsRequest $request, DecrementAvailableBedsAction $action): RedirectResponse
    {
        Gate::authorize('update', $hospital);
        $action->execute($hospital, $request->integer('increment'));

        return back()->with('toast', ['type' => 'success', 'message' => 'Available ICU beds decreased.']);
    }
}

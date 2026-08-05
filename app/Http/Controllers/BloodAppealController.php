<?php

namespace App\Http\Controllers;

use App\Actions\BloodAppeals\CreateBloodAppealAction;
use App\Actions\BloodAppeals\ExpireBloodAppealAction;
use App\Actions\BloodAppeals\FulfillBloodAppealAction;
use App\Actions\BloodAppeals\UpdatePintsSecuredAction;
use App\Actions\BloodAppeals\VerifyBloodAppealAction;
use App\Http\Requests\StoreBloodAppealRequest;
use App\Http\Requests\UpdatePintsSecuredRequest;
use App\Models\BloodAppeal;
use App\Models\Hospital;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BloodAppealController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'statistics' => [
                'active_appeals' => BloodAppeal::whereIn('status', ['pending_verification', 'verified'])->count(),
                'registered_donors' => \App\Models\DonorRegistry::count(),
                'lives_saved' => BloodAppeal::where('status', 'fulfilled')->sum('pints_secured'),
                'open_icu_beds' => Hospital::sum('available_icu_beds'),
            ],
            'appeals' => BloodAppeal::with('hospital')
                ->latest()
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Appeals/Create', [
            'hospitals' => Hospital::query()
                ->orderBy('name')
                ->get(['id', 'name', 'county', 'sub_county']),
        ]);
    }

    public function store(StoreBloodAppealRequest $request, CreateBloodAppealAction $action): RedirectResponse
    {
        Gate::authorize('create', BloodAppeal::class);

        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        if ($request->hasFile('verification_document')) {
            $validated['verification_document_path'] = $request->file('verification_document')->store('appeal-verifications', 'local');
        }

        $appeal = $action->execute($validated);

        return to_route('appeals.show', $appeal)->with('toast', [
            'type' => 'success',
            'message' => 'Blood appeal submitted for verification.',
        ]);
    }

    public function show(BloodAppeal $appeal): Response
    {
        return Inertia::render('Appeals/Show', [
            'appeal' => $appeal->load('hospital', 'donationClaims'),
        ]);
    }

    public function verify(BloodAppeal $appeal, VerifyBloodAppealAction $action): RedirectResponse
    {
        Gate::authorize('verify', $appeal);
        $action->execute($appeal);

        return back()->with('toast', ['type' => 'success', 'message' => 'Appeal verified.']);
    }

    public function fulfill(BloodAppeal $appeal, FulfillBloodAppealAction $action): RedirectResponse
    {
        Gate::authorize('fulfill', $appeal);
        $action->execute($appeal);

        return back()->with('toast', ['type' => 'success', 'message' => 'Appeal fulfilled.']);
    }

    public function updatePints(BloodAppeal $appeal, UpdatePintsSecuredRequest $request, UpdatePintsSecuredAction $action): RedirectResponse
    {
        Gate::authorize('fulfill', $appeal);
        $action->execute($appeal, $request->integer('additional_pints'));

        return back()->with('toast', ['type' => 'success', 'message' => 'Pints secured updated.']);
    }

    public function expire(BloodAppeal $appeal, ExpireBloodAppealAction $action): RedirectResponse
    {
        Gate::authorize('fulfill', $appeal);
        $action->execute($appeal);

        return back()->with('toast', ['type' => 'success', 'message' => 'Appeal expired.']);
    }
}
